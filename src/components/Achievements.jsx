// src/components/Achievements.jsx
// Achievements and Certificates section

import React from 'react';
import { Link } from 'react-router-dom';
import TextReveal from './TextReveal';
import TiltCard from './TiltCard';
import TextRevealAnimation from './TextRevealAnimation';
import PDFThumbnail from './PDFThumbnail';

const ACHIEVEMENTS = [
  {
    id: 'ibm-ai-developer',
    title: 'IBM AI Developer Professional Certificate',
    issuer: 'IBM - Coursera',
    date: '2024',
    description: 'Comprehensive professional certification program covering AI development, machine learning implementation, and practical AI application development. This is my flagship certification representing expertise in IBM AI technologies.',
    skills: ['AI Development', 'IBM Watson', 'Machine Learning', 'Professional Skills'],
    certificateUrl: '/images/certifications/Coursera Professional Certificate IBM AI Developer.pdf',
    isMain: true,
    hasImage: true,
    badge: '🏆'
  },
  {
    id: 'intro-ai',
    title: 'Introduction to Artificial Intelligence',
    issuer: 'IBM - Coursera',
    date: '2024',
    description: 'Comprehensive introduction to AI concepts, machine learning fundamentals, and practical applications in real-world scenarios.',
    skills: ['Artificial Intelligence', 'Machine Learning', 'IBM Watson'],
    certificateUrl: '/images/certifications/Coursera 4 Introduction To Artificial Intelligence (AI).pdf',
    hasImage: true,
    badge: '🧠'
  },
  {
    id: 'python-data-science',
    title: 'Python for Data Science, AI & Development',
    issuer: 'IBM - Coursera',
    date: '2024',
    description: 'Master Python programming for data science, AI applications, and software development with hands-on projects and real-world applications.',
    skills: ['Python', 'Data Science', 'AI Development', 'Programming'],
    certificateUrl: '/images/certifications/Coursera 5 Python for Data Science, AI & Development.pdf',
    hasImage: true,
    badge: '🐍'
  },
  {
    id: 'generative-ai',
    title: 'Generative AI Prompt Engineering',
    issuer: 'IBM - Coursera',
    date: '2024',
    description: 'Advanced course on prompt engineering for generative AI models, including best practices for creating effective prompts and optimizing AI interactions.',
    skills: ['Generative AI', 'Prompt Engineering', 'AI Optimization'],
    certificateUrl: '/images/certifications/Coursera 2 Generative AI Prompt Engineering.pdf',
    hasImage: true,
    badge: '✨'
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
              <TiltCard className={`group relative backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl ${
                achievement.isMain 
                  ? 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-300 dark:border-amber-400/40 hover:border-amber-400 dark:hover:border-amber-400/60 shadow-lg shadow-amber-200/30 dark:shadow-amber-400/20' 
                  : 'bg-white/90 dark:bg-white/5 border-gray-200 dark:border-amber-400/20 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-amber-400/40 shadow-lg shadow-gray-600/20 dark:shadow-amber-400/20'
              }`} intensity={1.5}>
                
                {/* Certificate Badge */}
                {achievement.isMain ? (
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-all duration-300 bg-gradient-to-br from-amber-600 to-yellow-600">
                    <span className="group-hover:animate-pulse">⭐</span>
                  </div>
                ) : (
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-all duration-300 bg-gradient-to-br from-amber-800 to-amber-900">
                    <span className="group-hover:animate-pulse">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                )}

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(achievement.isMain ? 3 : 2)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${15 + i * 25}%`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: achievement.isMain ? '1.5s' : '2s'
                      }}
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  
                  {/* Certificate PDF Thumbnail */}
                  <div className="w-full">
                    <PDFThumbnail
                      pdfUrl={achievement.certificateUrl}
                      title={achievement.title}
                      fallbackIcon={achievement.badge || (achievement.hasImage ? '📜' : '🏆')}
                      showPreview={achievement.certificateUrl}
                    />
                  </div>

                  {/* Certificate Details */}
                  <div className="space-y-3">
                    <div>
                      <h3 className={`text-xl font-bold mb-1 group-hover:text-gray-800 dark:group-hover:text-amber-100 transition-colors duration-300 ${
                        achievement.isMain ? 'text-amber-800 dark:text-amber-200' : 'text-gray-900 dark:text-white'
                      }`}>
                        {achievement.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300">
                        <span>{achievement.issuer}</span>
                        <span>•</span>
                        <span>{achievement.date}</span>
                        {achievement.isMain && (
                          <>
                            <span>•</span>
                            <span className="font-semibold text-amber-800 dark:text-amber-200">Main Certification</span>
                          </>
                        )}
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
                          className={`px-2 py-1 text-xs rounded-full border transition-all duration-300 ${
                            achievement.isMain 
                              ? 'bg-amber-200 dark:bg-amber-500/20 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-500/30 hover:bg-amber-300 dark:hover:bg-amber-500/30' 
                              : 'bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-500/20 hover:bg-amber-200 dark:hover:bg-amber-500/20 hover:border-amber-400 dark:hover:border-amber-400/40'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Verify/View Button */}
                    <button 
                      onClick={() => achievement.certificateUrl && window.open(achievement.certificateUrl, '_blank')}
                      className={`text-sm px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 ${
                        achievement.isMain 
                          ? 'bg-amber-100 dark:bg-amber-500/20 border-amber-300 dark:border-amber-500/40 hover:bg-amber-200 dark:hover:bg-amber-500/30 hover:border-amber-400 dark:hover:border-amber-400/60 text-amber-800 dark:text-amber-200' 
                          : 'bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-amber-400/20 hover:bg-gray-200 dark:hover:bg-amber-500/10 hover:border-gray-400 dark:hover:border-amber-400/40 text-gray-900 dark:text-white'
                      }`}
                      disabled={!achievement.certificateUrl}
                    >
                      {achievement.certificateUrl ? '📄 View Certificate' : '🔒 Verify Certificate'}
                    </button>
                  </div>
                </div>

                {/* Subtle glow effect */}
                <div className={`absolute -inset-2 rounded-2xl blur-lg opacity-0 group-hover:opacity-20 transition-all duration-500 -z-10 ${
                  achievement.isMain 
                    ? 'bg-gradient-to-br from-amber-400/40 to-yellow-400/20' 
                    : 'bg-gradient-to-br from-amber-400/30 to-amber-600/10'
                }`} />
              </TiltCard>
            </TextReveal>
          ))}
        </div>

        {/* View All Certifications Button */}
        <TextReveal delay={400}>
          <div className="text-center mt-16">
            <Link
              to="/certifications"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-400 hover:to-amber-500 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              View All Certifications
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
              Explore my complete collection of {8} professional certifications
            </p>
          </div>
        </TextReveal>
      </div>
    </section>
  );
}