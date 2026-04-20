const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');

const mongoUri = process.env.MONGODB_URI;
const dbName = 'vizionary';
const collectionName = 'leads';

const requestMap = new Map();

function checkRateLimit(ip) {
    const now = Date.now();
    const limit = requestMap.get(ip) || [];
    const recentRequests = limit.filter(time => now - time < 60000);
    
    if (recentRequests.length >= 5) return false;
    
    recentRequests.push(now);
    requestMap.set(ip, recentRequests);
    return true;
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function sanitize(str) {
    return str.trim().slice(0, 500);
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if (!checkRateLimit(clientIp)) {
        return res.status(429).json({ error: 'Demasiadas solicitudes. Intenta en 1 minuto.' });
    }

    try {
        const { nombre, email, url, objetivo } = req.body;

        if (!nombre || !email || !objetivo) {
            return res.status(400).json({ error: 'Campos requeridos: nombre, email, objetivo' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ error: 'Email inválido' });
        }

        const leadData = {
            nombre: sanitize(nombre),
            email: sanitize(email),
            url: sanitize(url || ''),
            objetivo: sanitize(objetivo),
            fecha: new Date().toISOString(),
            ip: clientIp,
            origen: 'vizionary-landing'
        };

        const client = new MongoClient(mongoUri);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const result = await collection.insertOne(leadData);

        if (process.env.ZAPIER_WEBHOOK_URL) {
            fetch(process.env.ZAPIER_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(leadData)
            }).catch(err => console.error('Error Zapier:', err));
        }

        if (process.env.SMTP_USER && process.env.SMTP_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS
                }
            });

            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: '✅ Solicitud Recibida - Vizionary',
                html: `
                    <h2>¡Gracias por tu interés en Vizionary!</h2>
                    <p>Hemos recibido tu solicitud de análisis.</p>
                    <p><strong>Objetivo:</strong> ${objetivo}</p>
                    <p>Nos pondremos en contacto en las próximas 24 horas.</p>
                    <p>Saludos,<br>Equipo Vizionary</p>
                `
            });
        }

        await client.close();

        res.status(200).json({
            success: true,
            message: 'Lead capturado exitosamente',
            leadId: result.insertedId
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al procesar solicitud', details: error.message });
    }
};