// src/pages/AboutPage.jsx
// Detailed About page

import React from 'react';
import { Link } from 'react-router-dom';
import TextReveal from '../components/TextReveal';
import TiltCard from '../components/TiltCard';

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 pb-12" style={{ background: 'linear-gradient(to bottom, #000011, #000033)' }}>
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors duration-300 mb-8"
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <TextReveal>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100">
              About Me
            </h1>
            <p className="text-xl text-gray-300">
              Passionate developer with expertise in modern web technologies and AI integration
            </p>
          </div>
        </TextReveal>

        {/* Detailed Content */}
        <div className="space-y-8">
          <TextReveal delay={200}>
            <TiltCard className="bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">My Journey</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm a passionate full-stack developer with a deep fascination for artificial intelligence and modern web technologies. 
                My journey began with curiosity about how things work behind the scenes, which led me to explore programming and eventually 
                specialize in creating innovative digital solutions.
              </p>
              <p className="text-gray-300 leading-relaxed">
                With experience spanning from frontend frameworks like React to backend technologies and AI integration, 
                I enjoy building applications that not only solve real-world problems but also provide exceptional user experiences.
              </p>
            </TiltCard>
          </TextReveal>

          <TextReveal delay={400}>
            <TiltCard className="bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">Technical Expertise</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-amber-300 mb-3">Frontend Development</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• React.js & Next.js</li>
                    <li>• TypeScript & JavaScript</li>
                    <li>• Tailwind CSS & Styled Components</li>
                    <li>• Three.js & WebGL</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-300 mb-3">Backend & AI</h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• Node.js & Python</li>
                    <li>• Machine Learning & AI</li>
                    <li>• Database Design</li>
                    <li>• API Development</li>
                  </ul>
                </div>
              </div>
            </TiltCard>
          </TextReveal>
        </div>
      </div>
    </div>
  );
}