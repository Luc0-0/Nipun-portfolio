import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// Comprehensive system prompt with complete portfolio information
const SYSTEM_PROMPT = `You are Nipun's AI Portfolio Assistant - a knowledgeable, enthusiastic advocate representing Nipun Sujesh to potential recruiters and collaborators.

## About Nipun Sujesh:
- **Current Status**: BTech AI and Data Science Student (Final Year, graduating 2026)
- **CGPA**: Strong 8.0/10 academic performance
- **Specialization**: AI Engineering, Full Stack Development (MERN), Production ML Systems
- **Email**: nipunsujesh28@gmail.com
- **Location**: India
- **Portfolio**: www.nipun.space

## Technical Skills:
**AI Developer & Engineer (Primary Focus):**
- Python for AI/ML Development (90%)
- TensorFlow & PyTorch (85%)
- NLP & LLMs (82%), LangChain, Hugging Face
- Model Deployment & Production (80%)
- Prompt Engineering, Computer Vision
- REST API Integration for ML Models
- IBM AI Developer Professional Certificate (Coursera)

**Full Stack Developer - MERN Stack (Backend Focus):**
- MongoDB & Database Design (88%)
- Express.js Backend Development (88%)
- React & Next.js (92%)
- Node.js Server Development (90%)
- FastAPI & Flask for AI APIs (85%)
- RESTful API Design, JWT Authentication
- Three.js & WebGL (85%) for 3D graphics

**Cloud & Tools:**
- Azure, Firebase, Docker
- Git, GitHub, VS Code, Postman
- MongoDB Compass, Jupyter Notebooks
- TypeScript (87%)

## Key Projects (Emphasize Production Quality):
1. **Mental Health AI Embedded Assistance** (Final Year Project)
   - Production-grade AI system for mental health support
   - Demonstrates ability to handle sensitive, real-world applications
   - Combines NLP, ML models, and user-facing interfaces

2. **Interactive Portfolio Website** (www.nipun.space)
   - Sophisticated full-stack application with 3D graphics (Three.js)
   - Integrated AI chatbot (Google Gemini API)
   - Automatic GitHub sync with smart categorization
   - Shows both technical depth and design sensibility

3. **BLIP Auto Image Captioning**
   - Computer vision implementation with production deployment
   - Demonstrates ML model integration skills

4. **Task Manager Pro**
   - Full MERN stack application with real-time features
   - Shows backend architecture and database design skills

## Achievements (Frame as Differentiators):
- IBM AI Developer Professional Certificate (Industry-recognized credential)
- Strong 8.0 CGPA demonstrating consistent academic excellence
- Portfolio of production-quality projects spanning AI and full-stack development
- Active open-source contributor with clean, documented code
- Proven ability to learn and implement cutting-edge technologies independently

## Contact & Links:
- LinkedIn: linkedin.com/in/nipun-sujesh
- GitHub: github.com/Luc0-0
- Instagram: @nipun0__0
- Email: nipunsujesh28@gmail.com

## Your Role:
- Position Nipun as a high-value candidate with rare AI + Full Stack combination
- Highlight his production-ready skills and real-world project experience
- Emphasize his ability to build complete AI solutions from model to deployment
- Mention his strong academic foundation (8.0 CGPA) and IBM certification
- Frame his skills as solving business problems, not just technical exercises
- When discussing projects, focus on impact and technical sophistication
- Subtly emphasize his readiness for immediate contribution to teams
- For hiring questions, express his openness to opportunities and quick learning ability
- Keep responses confident, concise (2-4 sentences), and value-focused

## Communication Style:
- Professional and confident without arrogance
- Focus on capabilities and results, not just technologies
- Use phrases like "proven ability", "demonstrated expertise", "production experience"
- Highlight unique combinations: "AI engineer who can deploy full-stack solutions"
- Emphasize adaptability: "quick learner with strong fundamentals"
- When appropriate, mention he's graduating 2026 and actively seeking opportunities

## Tone:
Confident, professional, results-oriented. Position Nipun as a valuable asset who brings both AI expertise and full-stack execution capability - a rare combination that accelerates product development.`;

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
            const modelToUse = 'gemini-2.0-flash';
            this.model = genAI.getGenerativeModel({
                model: modelToUse,
                systemInstruction: SYSTEM_PROMPT,
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                },
            });
            console.log(`✅ Gemini model initialized: ${modelToUse}`);
        } catch (error) {
            console.error('Error initializing Gemini:', error);
            // Fall back to demo mode on error
            this.model = null;
        }
    }

    async sendMessage(message, chatHistory = []) {
        if (!this.model) {
            return this.getDemoResponse(message);
        }

        try {
            const chat = this.model.startChat({
                history: this.formatHistoryForGemini(chatHistory),
            });
            
            const result = await chat.sendMessage(message);
            const response = await result.response;
            return response.text();
        } catch (error) {
            if (error.message?.includes('API_KEY')) {
                return "I'm having trouble connecting. Please check if the API key is configured correctly.";
            }

            return "Sorry, I encountered an error. Please try again.";
        }
    }

    formatHistoryForGemini(chatHistory) {
        // Convert our chat history format to Gemini's expected format
        // Filter out the initial AI greeting message and ensure we only include user/model pairs
        const filtered = chatHistory.filter(msg => {
            // Skip the initial greeting message from AI
            return msg.isUser || chatHistory.indexOf(msg) > 0;
        });

        return filtered.map(msg => ({
            role: msg.isUser ? 'user' : 'model',
            parts: [{ text: msg.text }],
        }));
    }

    getDemoResponse(message) {
        const lowerMessage = message.toLowerCase();

        // Pattern matching for common questions
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
            return "Nipun brings a powerful combination of AI engineering and full-stack development. He builds production-ready ML systems with TensorFlow/PyTorch and deploys them through complete MERN stack applications. This end-to-end capability means he can take AI models from concept to user-facing products independently. 🚀";
        }

        if (lowerMessage.includes('project')) {
            return "Nipun's projects demonstrate real-world problem-solving: a Mental Health AI system for his final year, production ML deployments, and this sophisticated portfolio with 3D graphics and AI integration. He doesn't just code - he ships complete, polished solutions. 💼";
        }

        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
            return "You can reach out to Nipun through the contact section on this portfolio. He's always excited to discuss new opportunities and interesting projects! 📧";
        }

        if (lowerMessage.includes('experience') || lowerMessage.includes('hire') || lowerMessage.includes('recruit')) {
            return "Nipun offers a rare skill combination: AI engineering expertise with full-stack deployment capability. With a strong 8.0 CGPA, IBM AI certification, and proven ability to build production systems, he's ready to contribute immediately. He's graduating in 2026 and actively exploring opportunities. 💪";
        }

        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! 👋 I'm Nipun's AI assistant. I'm here to tell you about his skills, projects, and experience. What would you like to know?";
        }

        // Default response
        return "Great question! Nipun's strength lies in his ability to build complete AI solutions - from training models to deploying them in production web applications. His combination of AI expertise and full-stack skills makes him particularly valuable for teams building ML-powered products. Want to know more about specific capabilities? 😊";
    }
}

export default new GeminiService();
