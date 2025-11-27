import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDgynDaDH8x13_3-uwPgiw_ZuU8mJFa-Y8';

async function testGemini() {
  try {
    console.log('🧪 Testing Gemini API...');
    console.log('API Key:', API_KEY ? '✅ Present' : '❌ Missing');
    
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    console.log('🔌 Initializing model: gemini-1.5-flash...');
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });
    
    console.log('📨 Sending test message...');
    const result = await model.generateContent('Say hello in one sentence');
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ SUCCESS! Response:', text);
    console.log('\n🎉 Your Gemini API is working correctly!');
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    console.error('Details:', error);
    
    if (error.message.includes('API_KEY')) {
      console.error('💡 Issue: Invalid API key');
    } else if (error.message.includes('404')) {
      console.error('💡 Issue: Model not found or endpoint error');
    } else if (error.message.includes('403')) {
      console.error('💡 Issue: API not enabled or quota exceeded');
    } else if (error.message.includes('network')) {
      console.error('💡 Issue: Network connection problem');
    }
  }
}

testGemini();
