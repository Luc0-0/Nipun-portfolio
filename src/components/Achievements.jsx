// src/components/Achievements.jsx
// Achievements and Certificates section

import React from 'react';
import TextReveal from './TextReveal';
import TiltCard from './TiltCard';
import TextRevealAnimation from './TextRevealAnimation';

const ACHIEVEMENTS = [
  {
    id: 'cert-1',
    title: 'Introduction to Artificial Intelligence',
    issuer: 'IBM - Coursera',
    date: '2024',
    description: 'Comprehensive introduction to AI concepts, machine learning fundamentals, and practical applications.',
    skills: ['Artificial Intelligence', 'Machine Learning', 'IBM'],
    certificateUrl: '/images/Coursera IAI.pdf',
    thumbnailImage: '/images/iAI.png',
    hasImage: true
  },
  {
    id: 'cert-2', 
    title: 'React Advanced Patterns',
    issuer: 'Meta',
    date: '2023',
    description: 'Advanced React development patterns and performance optimization techniques.',
    skills: ['React', 'Performance', 'Patterns'],
    hasImage: false
  },
  {
    id: 'cert-3',
    title: 'Machine Learning Specialist',
    issuer: 'Google Cloud',
    date: '2023', 
    description: 'Comprehensive ML engineering and deployment on Google Cloud Platform.',
    skills: ['Machine Learning', 'GCP', 'AI'],
    hasImage: false
  },
  {
    id: 'cert-4',
    title: 'Full Stack Development',
    issuer: 'freeCodeCamp',
    date: '2022',
    description: 'Complete full-stack web development certification covering modern frameworks.',
    skills: ['Full Stack', 'JavaScript', 'Node.js'],
    hasImage: false
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 bg-gradient-to-b from-transparent to-black/20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <TextReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-amber-100">
              Achievements & Certificates
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Professional certifications and achievements that validate my expertise
            </p>
          </div>
        </TextReveal>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {ACHIEVEMENTS.map((achievement, idx) => (
            <TextReveal key={achievement.id} delay={idx * 100}>
              <TiltCard className="group relative bg-white/90 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-amber-400/20 rounded-2xl p-8 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-amber-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-800/30 shadow-lg shadow-gray-600/20 dark:hover:shadow-amber-400/20 dark:shadow-amber-400/20" intensity={1.5}>
                
                {/* Certificate Number Badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-all duration-300 bg-gradient-to-br from-amber-800 to-amber-900">
                  <span className="group-hover:animate-pulse">{String(idx + 1).padStart(2, '0')}</span>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(2)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
                      style={{
                        left: `${30 + i * 40}%`,
                        top: `${20 + i * 30}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: '2s'
                      }}
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  
                  {/* Certificate Image/Thumbnail - Full Width */}
                  <div className="w-full">
                    <div className="w-full h-32 rounded-lg border border-amber-400/30 bg-gradient-to-br from-amber-500/10 to-transparent overflow-hidden group-hover:border-amber-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-400/20 cursor-pointer"
                         onClick={() => achievement.certificateUrl && window.open(achievement.certificateUrl, '_blank')}>
                      {achievement.thumbnailImage ? (
                        <img 
                          src={achievement.thumbnailImage} 
                          alt={achievement.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-lg bg-gradient-to-br from-amber-500 to-amber-600 group-hover:shadow-lg group-hover:shadow-amber-400/50">
                              {achievement.hasImage ? '📜' : '🏆'}
                            </div>
                            <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                              {achievement.hasImage ? 'View PDF' : 'Coming Soon'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-gray-800 dark:group-hover:text-amber-100 transition-colors duration-300">
                        {achievement.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300">
                        <span>{achievement.issuer}</span>
                        <span>•</span>
                        <span>{achievement.date}</span>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors duration-300">
                      {achievement.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 stagger-children">
                      {achievement.skills.map((skill, skillIdx) => (
                        <span
                          key={skillIdx}
                          className="px-2 py-1 text-xs bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-200 rounded-full border border-amber-300 dark:border-amber-500/20 hover:bg-amber-200 dark:hover:bg-amber-500/20 hover:border-amber-400 dark:hover:border-amber-400/40 transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Verify/View Button */}
                    <button 
                      onClick={() => achievement.certificateUrl && window.open(achievement.certificateUrl, '_blank')}
                      className="text-sm px-4 py-2 bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-amber-400/20 rounded-lg hover:bg-gray-200 dark:hover:bg-amber-500/10 hover:border-gray-400 dark:hover:border-amber-400/40 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 text-gray-900 dark:text-white"
                      disabled={!achievement.certificateUrl}
                    >
                      {achievement.certificateUrl ? 'View Certificate' : 'Verify Certificate'}
                    </button>
                  </div>
                </div>

                {/* Subtle glow effect */}
                <div className="absolute -inset-2 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500 -z-10 bg-gradient-to-br from-amber-400/30 to-amber-600/10" />
              </TiltCard>
            </TextReveal>
          ))}
        </div>
      </div>
    </section>
  );
}