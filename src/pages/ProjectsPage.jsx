// src/pages/ProjectsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import TextReveal from '../components/TextReveal';
import TiltCard from '../components/TiltCard';

const PROJECTS = [
  {
    title: 'Featured Project Alpha',
    description: 'A revolutionary web application that combines AI with intuitive user experience.',
    tech: ['React', 'AI Integration', 'Real-time'],
    features: ['Real-time AI chat', 'Dynamic UI generation', 'Voice commands'],
    status: 'In Development'
  },
  {
    title: 'Project Beta',
    description: 'Mobile-first application with advanced data visualization and analytics.',
    tech: ['Mobile', 'Data Viz', 'Analytics'],
    features: ['Interactive charts', 'Real-time data', 'Mobile optimization'],
    status: 'Beta Testing'
  },
  {
    title: 'Project Gamma',
    description: 'Enterprise solution with scalable architecture and microservices.',
    tech: ['Enterprise', 'Scalability', 'Microservices'],
    features: ['Microservice architecture', 'Load balancing', 'Auto-scaling'],
    status: 'Production'
  }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen pt-20 pb-12 relative z-10" style={{ background: 'linear-gradient(to bottom, #000011, #000033)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-amber-400/30 rounded-lg text-amber-300 hover:text-amber-200 hover:bg-white/20 hover:border-amber-400/50 transition-all duration-300 mb-8">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>

        <TextReveal>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100">
              Featured Projects
            </h1>
            <p className="text-xl text-gray-300">Projects I've built using modern tech and good design</p>
          </div>
        </TextReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, idx) => (
            <TextReveal key={idx} delay={idx * 200}>
              <TiltCard className="bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-6 h-full">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-white">{project.title}</h2>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'Production' ? 'bg-green-500/20 text-green-300' :
                      project.status === 'Beta Testing' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-blue-500/20 text-blue-300'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
                  
                  <div>
                    <h3 className="text-amber-300 font-medium mb-2">Key Features</h3>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {project.features.map((feature, i) => (
                        <li key={i}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-2 py-1 text-xs bg-amber-500/10 text-amber-200 rounded-full border border-amber-500/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full px-4 py-2 bg-white/10 border border-amber-400/20 rounded-lg hover:bg-amber-500/10 hover:border-amber-400/40 transition-all duration-300 text-sm">
                    View Details
                  </button>
                </div>
              </TiltCard>
            </TextReveal>
          ))}
        </div>
      </div>
    </div>
  );
}