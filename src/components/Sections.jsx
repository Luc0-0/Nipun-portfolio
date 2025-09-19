// src/components/Sections.jsx
// Content sections with clean container layout

import React from 'react';
import TextReveal from './TextReveal';
import TiltCard from './TiltCard';
import TextRevealAnimation from './TextRevealAnimation';

const SECTIONS = [
  {
    id: 'about',
    title: 'About Me',
    description: 'Final year AI and Data Science student passionate about machine learning, deep learning, and data analytics. Building expertise in Python, statistical modeling, and AI algorithms through academic projects and certifications.',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Statistics'],
    color: '#f5c36b'
  },
  {
    id: 'ongoing',
    title: 'Current Studies',
    description: 'Pursuing final year coursework in Advanced Machine Learning, Deep Neural Networks, and Big Data Analytics. Thesis project on NLP and exploring cutting-edge AI research.',
    skills: ['Academic Research', 'Thesis Work', 'Literature Review'],
    color: '#4a90e2'
  },
  {
    id: 'ai-skills',
    title: 'AI & ML Skills',
    description: 'Learning machine learning fundamentals through coursework and online certifications. Hands-on with Python, scikit-learn, pandas, and numpy. IBM AI certified.',
    skills: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
    color: '#e74c3c'
  },
  {
    id: 'web-skills',
    title: 'Technical Skills',
    description: 'Self-taught web development and data science skills. Familiar with Python, web technologies, and databases. Eager to apply these skills in real-world scenarios.',
    skills: ['Python', 'SQL', 'Data Visualization', 'Git'],
    color: '#2ecc71'
  },
  {
    id: 'project1',
    title: 'Academic Projects',
    description: 'Explore my university projects, including sentiment analysis and NLP using Python and scikit-learn. Click below to check out the academic project repos.',
    skills: ['NLP', 'Sentiment Analysis', 'Python'],
    color: '#9b59b6',
    category: 'academic'
  },
  {
    id: 'project2',
    title: 'Data Analyst Projects',
    description: 'Coursework and personal projects in data analysis, visualization, and statistics. Click below to check out the data analyst repos.',
    skills: ['Data Analysis', 'Visualization', 'Statistics'],
    color: '#f39c12',
    category: 'data-analyst'
  },
  {
    id: 'project3',
    title: 'Machine Learning Projects',
    description: 'Academic assignments and personal work building predictive models and exploring ML algorithms. Click below to check out the machine learning repos.',
    skills: ['Supervised Learning', 'Model Evaluation', 'Python'],
    color: '#1abc9c',
    category: 'machine-learning'
  },
  {
    id: 'miniprojects',
    title: 'Mini Projects',
    description: 'A collection of small, creative projects and experiments. Click below to check out my mini project repos.',
    skills: ['Practice Projects', 'Learning', 'Experimentation'],
    color: '#e67e22',
    category: 'mini-projects'
  },
  {
    id: 'learning',
    title: 'Learning Projects',
    description: 'Projects and exercises completed during coursework and self-study. Includes data cleaning scripts, basic ML implementations, and exploratory analysis notebooks. Click below to check out learning repos.',
    skills: ['Practice Projects', 'Learning', 'Experimentation'],
    color: '#e67e22',
    category: 'learning'
  },
  {
    id: 'services',
    title: 'Future Goals',
    description: 'Aspiring to work as a Data Scientist or ML Engineer after graduation. Interested in applying AI solutions to real-world problems and contributing to innovative projects.',
    skills: ['Career Goals', 'Learning Path', 'Growth Mindset'],
    color: '#34495e'
  },
  {
    id: 'contact',
    title: 'Connect With Me',
    description: 'Open to internship opportunities, collaborative projects, and networking with professionals in AI and Data Science. Let\'s connect and discuss the exciting possibilities!',
    skills: ['Networking', 'Opportunities', 'Collaboration'],
    color: '#c0392b',
    socials: [
      { name: 'GitHub', url: 'https://github.com/Luc0-0', icon: 'github' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nipun-sujesh', icon: 'linkedin' },
      { name: 'Instagram', url: 'https://instagram.com/nipun0__0', icon: 'instagram' }
    ]
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
              <TiltCard className="relative bg-white/90 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-amber-400/20 rounded-2xl p-8 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-amber-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-800/30 shadow-lg shadow-gray-600/20 dark:hover:shadow-amber-400/20 dark:shadow-amber-400/20" intensity={2}>
              
              {/* Enhanced section number with hover effects */}
              <div 
                className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-all duration-300 rotate-scroll"
                style={{ 
                  background: `linear-gradient(135deg, #92400e, #78350f)`,
                  boxShadow: `0 0 20px #92400e60`
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
                    className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse parallax-slow"
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
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-amber-100">
                      {section.title}
                    </h2>
                    
                    <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                      {section.description}
                    </p>
                  </header>

                  {/* Enhanced skills tags with stagger animation */}
                  <div className="flex flex-wrap gap-2 stagger-children">
                    {section.skills.map((skill, skillIdx) => (
                      <span
                        key={skillIdx}
                        className="px-3 py-1 text-sm bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-200 rounded-full border border-amber-300 dark:border-amber-500/20 hover:bg-amber-200 dark:hover:bg-amber-500/20 hover:border-amber-400 dark:hover:border-amber-400/40 transition-all duration-300"
                        title={`Expertise in ${skill}`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Enhanced action buttons with motion */}
                  <div className="flex flex-wrap gap-4 pt-4">
                    {section.category ? (
                      <a
                        href={`#/projects/${section.category}`}
                        className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 border border-amber-400/20 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 font-semibold shadow-lg hover:scale-105"
                      >
                        Check Out
                      </a>
                    ) : (
                      <button 
                        onClick={() => window.open(`/#/${section.id}`, '_blank')}
                        className="px-6 py-3 bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-amber-400/20 rounded-lg hover:bg-gray-200 dark:hover:bg-amber-500/10 hover:border-gray-400 dark:hover:border-amber-400/40 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 text-gray-900 dark:text-white constellation-point"
                      >
                        Know More
                      </button>
                    )}
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
                  
                  {/* Social Icons for Contact Section */}
                  {section.id === 'contact' && section.socials && (
                    <div className="flex gap-4 pt-6">
                      {section.socials.map((social) => (
                        <a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-white/10 border border-amber-400/20 rounded-lg flex items-center justify-center text-amber-300 hover:text-amber-200 hover:border-amber-400/40 hover:bg-amber-400/10 hover:scale-110 transition-all duration-300"
                          title={social.name}
                        >
                          {social.icon === 'github' && (
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          )}
                          {social.icon === 'linkedin' && (
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          )}
                          {social.icon === 'instagram' && (
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Enhanced image placeholder with subtle glow */}
                <div className="lg:col-span-1 group-hover:translate-x-1 transition-transform duration-300">
                  <div className="relative rounded-xl overflow-hidden border border-amber-400/20 bg-gradient-to-br from-amber-500/5 to-transparent hover:border-amber-400/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-400/30">
                    <div className="aspect-[4/3] flex items-center justify-center">
                      {(() => {
                        const images = [
                          { src: '/images/Nipun.webp', alt: 'Nipun Sujesh', style: { objectPosition: 'center 30%' } },
                          { src: '/images/Current Studies.jpg', alt: 'Current Studies' },
                          { src: '/images/Ai_ml_skills.jpg', alt: 'AI & ML Skills' },
                          { src: '/images/Technical_skills.jpg', alt: 'Technical Skills' },
                          { src: '/images/Academic_project.jpg', alt: 'Academic Projects' },
                          { src: '/images/Data_analysis.jpg', alt: 'Data Analyst Projects' },
                          { src: '/images/Machine_learning.jpg', alt: 'Machine Learning Projects' },
                          { src: '/images/Mini_projects.jpg', alt: 'Mini Projects' },
                          { src: '/images/Learning_projects.jpg', alt: 'Learning Projects' },
                          { src: '/images/future_goals.jpg', alt: 'Future Goals' },
                          { src: '/images/COntact_me.jpg', alt: 'Connect With Me' },
                        ];
                        const img = images[idx];
                        return img && img.src ? (
                          <img src={img.src} alt={img.alt} className="w-full h-full object-cover rounded-xl shadow-lg" style={img.style || {}} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl">No image</div>
                        );
                      })()}
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