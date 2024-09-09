require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const OpenAI = require('openai'); // Use OpenAI SDK

// Initialize express app
const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// Configure OpenAI API client using OpenAI v4.x.x
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Use your OpenAI API key from .env
});

// Route to interact with OpenAI API
app.post('/generate-text', async (req, res) => {
    const { prompt } = req.body; // Get prompt from the request body

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        // For chat-based models like 'gpt-3.5-turbo' or 'gpt-4'
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // You can switch to 'gpt-4' if available
            messages: [{ role: 'user', content: prompt }],
        });

        // Return the generated text back to the client
        res.json({ response: response.choices[0].message.content.trim() });
    } catch (error) {
        console.error('Error with OpenAI API:', error);
        res.status(500).json({ error: 'Failed to generate text' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
