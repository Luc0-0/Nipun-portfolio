// src/components/Sections.jsx
// Content sections with clean container layout

import React from 'react';
import TextReveal from './TextReveal';
import TiltCard from './TiltCard';

const SECTIONS = [
  { 
    id: 'about', 
    title: 'About Me', 
    description: 'Final year AI and Data Science student passionate about machine learning, deep learning, and data analytics. Currently building expertise in Python, statistical modeling, and AI algorithms while working on academic projects and certifications.',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics'],
    color: '#f5c36b'
  },
  { 
    id: 'ongoing', 
    title: 'Current Studies', 
    description: 'Pursuing final year coursework in Advanced Machine Learning, Deep Neural Networks, and Big Data Analytics. Working on thesis project involving natural language processing and exploring cutting-edge AI research papers.',
    skills: ['Academic Research', 'Thesis Work', 'Literature Review'],
    color: '#4a90e2'
  },
  { 
    id: 'ai-skills', 
    title: 'AI & ML Skills', 
    description: 'Learning machine learning fundamentals through coursework and online certifications. Hands-on experience with Python libraries like scikit-learn, pandas, and numpy. IBM AI certified with practical knowledge of supervised and unsupervised learning.',
    skills: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    color: '#e74c3c'
  },
  { 
    id: 'web-skills', 
    title: 'Technical Skills', 
    description: 'Self-taught web development skills acquired through personal projects and online learning. Familiar with Python for data science, basic web technologies, and database fundamentals. Eager to apply these skills in real-world scenarios.',
    skills: ['Python', 'SQL', 'Data Visualization', 'Git'],
    color: '#2ecc71'
  },
  { 
    id: 'project1', 
    title: 'Academic Project Alpha', 
    description: 'University project focusing on sentiment analysis using natural language processing techniques. Implemented using Python and scikit-learn to analyze social media data and predict sentiment patterns.',
    skills: ['NLP', 'Sentiment Analysis', 'Python'],
    color: '#9b59b6'
  },
  { 
    id: 'project2', 
    title: 'Data Analysis Project', 
    description: 'Coursework project involving exploratory data analysis on a large dataset. Created visualizations and statistical insights using Python libraries to uncover meaningful patterns and trends.',
    skills: ['Data Analysis', 'Visualization', 'Statistics'],
    color: '#f39c12'
  },
  { 
    id: 'project3', 
    title: 'Machine Learning Model', 
    description: 'Academic assignment to build and evaluate a predictive model using supervised learning techniques. Implemented various algorithms and compared their performance on real-world datasets.',
    skills: ['Supervised Learning', 'Model Evaluation', 'Python'],
    color: '#1abc9c'
  },
  { 
    id: 'miniprojects', 
    title: 'Learning Projects', 
    description: 'Collection of small projects and exercises completed during coursework and self-study. Includes data cleaning scripts, basic ML implementations, and exploratory analysis notebooks.',
    skills: ['Practice Projects', 'Learning', 'Experimentation'],
    color: '#e67e22'
  },
  { 
    id: 'services', 
    title: 'Future Goals', 
    description: 'Aspiring to work as a Data Scientist or ML Engineer after graduation. Interested in applying AI solutions to real-world problems and contributing to innovative projects in the field of artificial intelligence.',
    skills: ['Career Goals', 'Learning Path', 'Growth Mindset'],
    color: '#34495e'
  },
  { 
    id: 'contact', 
    title: 'Connect With Me', 
    description: 'Open to internship opportunities, collaborative projects, and networking with professionals in AI and Data Science. Let\'s connect and discuss the exciting possibilities in artificial intelligence!',
    skills: ['Networking', 'Opportunities', 'Collaboration'],
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
              <TiltCard className="relative bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-8 hover:bg-white/10 hover:border-amber-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-400/20" intensity={2}>
              
              {/* Enhanced section number with hover effects */}
              <div 
                className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-all duration-300"
                style={{ 
                  background: `linear-gradient(135deg, #f59e0b, #d97706)`,
                  boxShadow: `0 0 20px #f59e0b40`
                }}
                title={`Section ${idx + 1}: ${section.title}`}
              >
                <span className="group-hover:animate-pulse">{String(idx + 1).padStart(2, '0')}</span>
              </div>
              
              {/* Floating particles on hover */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${10 + i * 20}%`,
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: '2s'
                    }}
                  />
                ))}
              </div>
              

              
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                
                {/* Content - Left side */}
                <div className="lg:col-span-2 space-y-6">
                  <header>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100">
                      {section.title}
                    </h2>
                    
                    <p className="text-lg text-gray-200 leading-relaxed">
                      {section.description}
                    </p>
                  </header>

                  {/* Enhanced skills tags with stagger animation */}
                  <div className="flex flex-wrap gap-2">
                    {section.skills.map((skill, skillIdx) => (
                      <span
                        key={skillIdx}
                        className="px-3 py-1 text-sm bg-amber-500/10 text-amber-200 rounded-full border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-400/40 transition-all duration-300"
                        title={`Expertise in ${skill}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Enhanced action buttons with motion */}
                  <div className="flex flex-wrap gap-4 pt-4">
                    <button 
                      onClick={() => window.open(`/#/${section.id}`, '_blank')}
                      className="px-6 py-3 bg-white/10 border border-amber-400/20 rounded-lg hover:bg-amber-500/10 hover:border-amber-400/40 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300"
                    >
                      Know More
                    </button>
                    
                    {section.id === 'contact' ? (
                      <a
                        href="mailto:nipunsujesh28@gmail.com"
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

                {/* Enhanced image placeholder with subtle glow */}
                <div className="lg:col-span-1 group-hover:translate-x-1 transition-transform duration-300">
                  <div className="relative rounded-xl overflow-hidden border border-amber-400/20 bg-gradient-to-br from-amber-500/5 to-transparent hover:border-amber-400/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-400/30">
                    <div className="aspect-[4/3] flex items-center justify-center">
                      <div className="text-center group-hover:scale-105 transition-transform duration-300">
                        <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl bg-gradient-to-br from-amber-500 to-amber-600 group-hover:shadow-lg group-hover:shadow-amber-400/50">
                          🎨
                        </div>
                        <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                          Coming Soon
                        </p>
                      </div>
                    </div>
                    
                    {/* Subtle glow effect */}
                    <div className="absolute -inset-2 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500 -z-10 bg-gradient-to-br from-amber-400/40 to-amber-600/20" />
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