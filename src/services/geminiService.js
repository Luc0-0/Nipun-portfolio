import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// System prompt that defines the chatbot's personality and knowledge
const SYSTEM_PROMPT = `You are an AI assistant for Nipun's portfolio website. You are friendly, professional, and knowledgeable about Nipun's skills and projects.

Key information about Nipun:
- Full-stack developer with expertise in React, Node.js, and modern web technologies
- Passionate about creating beautiful, interactive user experiences
- Skilled in 3D graphics, animations, and creative web design
- Currently building innovative portfolio projects

Your role:
- Answer questions about Nipun's skills, experience, and projects
- Be encouraging and highlight Nipun's strengths
- Keep responses concise and engaging
- If you don't know something specific, be honest and suggest contacting Nipun directly

Tone: Professional yet friendly, enthusiastic about technology`;

class GeminiService {
    constructor() {
        this.model = null;
        this.chat = null;
        this.initialize();
    }

    initialize() {
        if (!genAI) {
            console.warn('Gemini API key not configured. Using demo mode.');
            return;
        }

        try {
            this.model = genAI.getGenerativeModel({
                model: 'gemini-pro',
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                },
            });
        } catch (error) {
            console.error('Error initializing Gemini:', error);
        }
    }

    async sendMessage(message, chatHistory = []) {
        // Demo mode responses if no API key
        if (!this.model) {
            return this.getDemoResponse(message);
        }

        try {
            // Start a new chat with history
            const chat = this.model.startChat({
                history: this.formatHistoryForGemini(chatHistory),
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 1024,
                },
            });

            // Send message with system context
            const contextualMessage = chatHistory.length === 0
                ? `${SYSTEM_PROMPT}\n\nUser: ${message}`
                : message;

            const result = await chat.sendMessage(contextualMessage);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Error sending message to Gemini:', error);

            if (error.message?.includes('API_KEY')) {
                return "I'm having trouble connecting. Please check if the API key is configured correctly.";
            }

            return "Sorry, I encountered an error. Please try again.";
        }
    }

    formatHistoryForGemini(chatHistory) {
        // Convert our chat history format to Gemini's expected format
        return chatHistory.map(msg => ({
            role: msg.isUser ? 'user' : 'model',
            parts: [{ text: msg.text }],
        }));
    }

    getDemoResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Pattern matching for common questions
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
            return "Nipun specializes in modern web development! His tech stack includes React, JavaScript, Node.js, Three.js for 3D graphics, and he's passionate about creating stunning user interfaces with advanced animations and interactions. 🚀";
        }

        if (lowerMessage.includes('project')) {
            return "Nipun has worked on several impressive projects including this interactive portfolio you're viewing right now! He focuses on creating unique, visually stunning web experiences with features like 3D graphics, advanced animations, and AI integration. 💼";
        }

        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
            return "You can reach out to Nipun through the contact section on this portfolio. He's always excited to discuss new opportunities and interesting projects! 📧";
        }

        if (lowerMessage.includes('experience')) {
            return "Nipun is a talented full-stack developer with strong expertise in creating interactive web applications. He combines technical skills with creative design to build memorable user experiences. 💪";
        }

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! 👋 I'm Nipun's AI assistant. I'm here to tell you about his skills, projects, and experience. What would you like to know?";
        }

        // Default response
        return "That's an interesting question! While I'd love to help, I recommend checking out the portfolio sections or reaching out to Nipun directly for more specific information. Is there anything else about his skills or projects I can help with? 😊";
    }
}

export default new GeminiService();
