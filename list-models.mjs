import { GoogleGenerativeAI } from '@google/generative-ai';

// NOTE: Do NOT hardcode API keys in source. Use environment variables instead.
// Replace this with `process.env.GEMINI_API_KEY` or run the script with
// `GEMINI_API_KEY=your_key node list-models.mjs` for local testing.
const API_KEY = process.env.GEMINI_API_KEY || 'YOUR_API_KEY_HERE';

async function listModels() {
  try {
    console.log('📋 Listing available models...\n');
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Try to list models
    const models = await genAI.listModels();
    
    console.log('✅ Available models:');
    for await (const model of models) {
      console.log(`   - ${model.name} (supported methods: ${model.supportedGenerationMethods.join(', ')})`);
    }
    
  } catch (error) {
    console.error('❌ Error listing models:', error.message);
    console.log('\n💡 If listModels is not supported, here are the known working models:');
    console.log('   - gemini-2.0-flash (latest, recommended)');
    console.log('   - gemini-1.5-pro');
    console.log('   - gemini-1.5-flash');
    console.log('   - gemini-pro');
  }
}

listModels();
