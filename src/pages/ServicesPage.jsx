// src/pages/ServicesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import TextReveal from '../components/TextReveal';
import TiltCard from '../components/TiltCard';

const SERVICES = [
  {
    title: 'Web Development',
    description: 'Custom web applications built with modern frameworks',
    features: ['React/Next.js Development', 'Responsive Design', 'Performance Optimization', 'SEO Implementation'],
    icon: '🌐',
    price: 'Starting at $2,000'
  },
  {
    title: 'AI Integration',
    description: 'Integrate AI capabilities into your existing applications',
    features: ['ChatGPT Integration', 'Custom AI Models', 'Data Analysis', 'Automation Solutions'],
    icon: '🤖',
    price: 'Starting at $3,000'
  },
  {
    title: 'Consulting',
    description: 'Technical consulting and architecture planning',
    features: ['System Architecture', 'Technology Stack Selection', 'Code Review', 'Performance Audit'],
    icon: '💡',
    price: '$150/hour'
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20 pb-12" style={{ background: 'linear-gradient(to bottom, #000011, #000033)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors duration-300 mb-8">
          ← Back to Home
        </Link>

        <TextReveal>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100">
              Services
            </h1>
            <p className="text-xl text-gray-300">Professional development services and consulting offerings</p>
          </div>
        </TextReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, idx) => (
            <TextReveal key={idx} delay={idx * 200}>
              <TiltCard className="bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-8 h-full">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-3xl mx-auto mb-4">
                      {service.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">{service.title}</h2>
                    <p className="text-gray-300 text-sm">{service.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-amber-300 font-medium mb-3">What's Included</h3>
                    <ul className="text-gray-300 text-sm space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t border-amber-400/20 pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-amber-300 mb-4">{service.price}</p>
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300">
                        Get Started
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </TextReveal>
          ))}
        </div>
      </div>
    </div>
  );
}