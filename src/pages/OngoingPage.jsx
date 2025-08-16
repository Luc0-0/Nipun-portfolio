// src/pages/OngoingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import TextReveal from '../components/TextReveal';
import TiltCard from '../components/TiltCard';

export default function OngoingPage() {
  return (
    <div className="min-h-screen pt-20 pb-12" style={{ background: 'linear-gradient(to bottom, #000011, #000033)' }}>
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors duration-300 mb-8">
          ← Back to Home
        </Link>

        <TextReveal>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100">
              Ongoing Research
            </h1>
            <p className="text-xl text-gray-300">Currently exploring cutting-edge technologies and innovative solutions</p>
          </div>
        </TextReveal>

        <div className="space-y-8">
          <TextReveal delay={200}>
            <TiltCard className="bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">AI-Powered Web Applications</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Researching the integration of large language models into web applications for enhanced user experiences. 
                Exploring real-time AI assistance, automated content generation, and intelligent user interfaces.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm bg-amber-500/10 text-amber-200 rounded-full border border-amber-500/20">OpenAI API</span>
                <span className="px-3 py-1 text-sm bg-amber-500/10 text-amber-200 rounded-full border border-amber-500/20">React</span>
                <span className="px-3 py-1 text-sm bg-amber-500/10 text-amber-200 rounded-full border border-amber-500/20">WebSockets</span>
              </div>
            </TiltCard>
          </TextReveal>

          <TextReveal delay={400}>
            <TiltCard className="bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">3D Web Experiences</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Developing immersive 3D web experiences using Three.js and WebGL. Focus on performance optimization 
                and creating engaging interactive environments for portfolio and commercial applications.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm bg-amber-500/10 text-amber-200 rounded-full border border-amber-500/20">Three.js</span>
                <span className="px-3 py-1 text-sm bg-amber-500/10 text-amber-200 rounded-full border border-amber-500/20">WebGL</span>
                <span className="px-3 py-1 text-sm bg-amber-500/10 text-amber-200 rounded-full border border-amber-500/20">GLSL</span>
              </div>
            </TiltCard>
          </TextReveal>
        </div>
      </div>
    </div>
  );
}