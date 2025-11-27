import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDgynDaDH8x13_3-uwPgiw_ZuU8mJFa-Y8';

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
