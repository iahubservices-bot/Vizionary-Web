// api/chat-agent.js
const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_KEY
});

const systemPrompt = `Eres un agente de atención al cliente experto de Vizionary, una agencia de automatización e IA para negocios ubicada en Perú.

Tu rol es:
1. Entender qué necesita el cliente
2. Explicar cómo Vizionary puede ayudar
3. Ser amable, profesional y directo
4. Ofrecer soluciones específicas según su problema

SERVICIOS:
- 🎨 UI/UX DESIGNER
- 🤖 AUTOMATIZACIÓN
- 📱 APLICATIVOS
- 📍 AEO/GEO/SEO

Ubicación: San Isidro, Lima, Perú
Email: ia.hubservices@gmail.com
WhatsApp: +51 975 729 647`;

const conversations = new Map();

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const { message, conversationId, leadData } = req.body;

        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Invalid message' });
        }

        if (!conversationId) {
            return res.status(400).json({ error: 'Conversation ID required' });
        }

        let history = conversations.get(conversationId) || [];

        history.push({ role: 'user', content: message });

        const response = await client.messages.create({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 500,
            system: systemPrompt,
            messages: history
        });

        const assistantMessage = response.content[0].text;
        history.push({ role: 'assistant', content: assistantMessage });

        if (history.length > 20) history = history.slice(-20);
        conversations.set(conversationId, history);

        return res.status(200).json({
            success: true,
            message: assistantMessage,
            conversationId: conversationId
        });

    } catch (error) {
        console.error('Chat Agent Error:', error);
        
        if (error.status === 401) {
            return res.status(401).json({ error: 'Invalid API Key' });
        }
        
        return res.status(500).json({
            success: false,
            error: 'Error processing message'
        });
    }
};
