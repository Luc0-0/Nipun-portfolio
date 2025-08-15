// src/components/Sections.jsx
// Content sections with clean container layout

import React from 'react';
import TextReveal from './TextReveal';
import TiltCard from './TiltCard';

const SECTIONS = [
  { 
    id: 'about', 
    title: 'About Me', 
    description: 'Passionate developer with expertise in modern web technologies and AI integration.',
    skills: ['React', 'Node.js', 'Python', 'AI/ML'],
    color: '#f5c36b'
  },
  { 
    id: 'ongoing', 
    title: 'Ongoing Research', 
    description: 'Currently exploring cutting-edge technologies and innovative solutions.',
    skills: ['Research', 'Innovation', 'Prototyping'],
    color: '#4a90e2'
  },
  { 
    id: 'ai-skills', 
    title: 'AI Skills', 
    description: 'Advanced knowledge in artificial intelligence and machine learning frameworks.',
    skills: ['TensorFlow', 'PyTorch', 'OpenAI', 'Computer Vision'],
    color: '#e74c3c'
  },
  { 
    id: 'web-skills', 
    title: 'Web Development', 
    description: 'Full-stack development with modern frameworks and best practices.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
    color: '#2ecc71'
  },
  { 
    id: 'project1', 
    title: 'Featured Project Alpha', 
    description: 'A revolutionary web application that combines AI with intuitive user experience.',
    skills: ['React', 'AI Integration', 'Real-time'],
    color: '#9b59b6'
  },
  { 
    id: 'project2', 
    title: 'Project Beta', 
    description: 'Mobile-first application with advanced data visualization and analytics.',
    skills: ['Mobile', 'Data Viz', 'Analytics'],
    color: '#f39c12'
  },
  { 
    id: 'project3', 
    title: 'Project Gamma', 
    description: 'Enterprise solution with scalable architecture and microservices.',
    skills: ['Enterprise', 'Scalability', 'Microservices'],
    color: '#1abc9c'
  },
  { 
    id: 'miniprojects', 
    title: 'Mini Projects', 
    description: 'Collection of experimental projects and proof-of-concepts.',
    skills: ['Experiments', 'POCs', 'Innovation'],
    color: '#e67e22'
  },
  { 
    id: 'services', 
    title: 'Services', 
    description: 'Professional development services and consulting offerings.',
    skills: ['Consulting', 'Development', 'Strategy'],
    color: '#34495e'
  },
  { 
    id: 'contact', 
    title: 'Get In Touch', 
    description: 'Ready to collaborate? Let\'s discuss your next project.',
    skills: ['Collaboration', 'Communication', 'Partnership'],
    color: '#c0392b'
  },
];

export default function Sections() {
  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-6 space-y-20">
        {SECTIONS.map((section, idx) => (
          <section 
            id={section.id} 
            key={section.id} 
            className="group"
          >
            {/* Enhanced Container with motion effects */}
            <TextReveal delay={idx * 100}>
              <TiltCard className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/5 hover:border-cyan-400/40 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-cyan-400/20 group-hover:scale-[1.02] group-hover:-translate-y-2" intensity={5}>
              
              {/* Enhanced section number with hover effects */}
              <div 
                className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 cursor-pointer"
                style={{ 
                  background: `linear-gradient(135deg, ${section.color}, ${section.color}80)`,
                  boxShadow: `0 0 20px ${section.color}40`
                }}
                title={`Section ${idx + 1}: ${section.title}`}
              >
                <span className="group-hover:animate-pulse">{String(idx + 1).padStart(2, '0')}</span>
              </div>
              
              {/* Floating particles on hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${10 + i * 20}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: '3s'
                    }}
                  />
                ))}
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                
                {/* Content - Left side */}
                <div className="lg:col-span-2 space-y-6">
                  <header className="group-hover:translate-x-2 transition-transform duration-500">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-gray-300 group-hover:from-cyan-200 group-hover:via-white group-hover:to-cyan-200 transition-all duration-700">
                      {section.title}
                    </h2>
                    
                    <p className="text-lg text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-500">
                      {section.description}
                    </p>
                  </header>

                  {/* Enhanced skills tags with stagger animation */}
                  <div className="flex flex-wrap gap-2">
                    {section.skills.map((skill, skillIdx) => (
                      <span
                        key={skillIdx}
                        className="px-3 py-1 text-sm bg-gradient-to-r from-cyan-500/10 to-purple-500/10 text-cyan-300 rounded-full border border-cyan-500/20 hover:from-cyan-500/20 hover:to-purple-500/20 hover:border-cyan-400/40 hover:scale-110 transition-all duration-300 cursor-pointer group-hover:animate-pulse"
                        style={{
                          animationDelay: `${skillIdx * 0.1}s`
                        }}
                        title={`Expertise in ${skill}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Enhanced action buttons with motion */}
                  <div className="flex flex-wrap gap-4 pt-4 group-hover:translate-x-1 transition-transform duration-500">
                    <button className="relative px-6 py-3 bg-white/10 border border-white/20 rounded-lg hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 hover:border-cyan-400/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300 overflow-hidden group/btn" data-magnetic data-ripple>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                      <span className="relative">View Details</span>
                    </button>
                    
                    {section.id === 'contact' ? (
                      <a
                        href="mailto:contact@nipunsujesh.com"
                        className="relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-purple-500 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25 focus:outline-none focus:ring-2 focus:ring-cyan-300 transition-all duration-300 overflow-hidden group/btn"
                        data-magnetic
                        data-ripple
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                        <span className="relative">Send Message</span>
                      </a>
                    ) : (
                      <a
                        href="#contact"
                        className="relative px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-700 text-white font-medium rounded-lg hover:from-purple-500 hover:to-blue-600 hover:scale-105 hover:shadow-lg hover:shadow-purple-400/25 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 overflow-hidden group/btn"
                        data-magnetic
                        data-ripple
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                        <span className="relative">Discuss This</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Enhanced image placeholder with motion */}
                <div className="lg:col-span-1 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform duration-700">
                  <div className="relative rounded-xl overflow-hidden border border-white/20 bg-gradient-to-br from-white/5 to-transparent hover:border-cyan-400/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-1">
                    <div className="aspect-[4/3] flex items-center justify-center" style={{ 
                      background: `linear-gradient(135deg, ${section.color}20, ${section.color}10)` 
                    }}>
                      <div className="text-center group-hover:scale-110 transition-transform duration-500">
                        <div 
                          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl group-hover:animate-bounce"
                          style={{ 
                            background: `linear-gradient(135deg, ${section.color}, ${section.color}80)`,
                            boxShadow: `0 0 20px ${section.color}40`
                          }}
                        >
                          🎨
                        </div>
                        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          dragon_{idx + 1}.jpg placeholder
                        </p>
                      </div>
                    </div>
                    
                    {/* Enhanced glow effect */}
                    <div 
                      className="absolute -inset-2 rounded-xl blur-lg opacity-0 group-hover:opacity-60 transition-all duration-700 -z-10"
                      style={{ 
                        background: `linear-gradient(135deg, ${section.color}60, cyan40)` 
                      }}
                    />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>
                </div>
                
              </div>
              </TiltCard>
            </TextReveal>
          </section>
        ))}
      </div>
    </div>
  );
}