const { MongoClient } = require('mongodb');

const mongoUri = process.env.MONGODB_URI;
const dbName = 'vizionary';
const collectionName = 'leads';
const apiKey = process.env.API_KEY;

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Método no permitido' });
    }

    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.replace('Bearer ', '');

        if (!token || token !== apiKey) {
            return res.status(401).json({ error: 'No autorizado' });
        }

        const client = new MongoClient(mongoUri);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const leads = await collection
            .find({})
            .sort({ fecha: -1 })
            .limit(100)
            .toArray();

        await client.close();

        res.status(200).json({
            success: true,
            total: leads.length,
            leads: leads
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error al obtener leads' });
    }
};