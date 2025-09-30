// src/pages/CertificationsPage.jsx
// Dedicated certifications page showing all certifications

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TextReveal from '../components/TextReveal';
import TiltCard from '../components/TiltCard';
import CinematicText from '../components/CinematicText';
import PDFThumbnail from '../components/PDFThumbnail';

const ALL_CERTIFICATIONS = [
  {
    id: 'ibm-ai-developer',
    title: 'IBM AI Developer Professional Certificate',
    issuer: 'IBM - Coursera',
    date: '2025',
    description: 'Comprehensive professional certification program covering AI development, machine learning implementation, and practical AI application development. This is my flagship certification representing expertise in IBM AI technologies.',
    skills: ['AI Development', 'IBM Watson', 'Machine Learning', 'Professional Skills', 'AI Applications'],
    certificateUrl: '/images/certifications/Coursera Professional Certificate IBM AI Developer.pdf',
    isMain: true,
    hasImage: true,
    badge: '🏆'
  },
  {
    id: 'intro-ai',
    title: 'Introduction to Artificial Intelligence',
    issuer: 'IBM - Coursera',
    date: '2025',
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
    date: '2025',
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
    date: '2025',
    description: 'Advanced course on prompt engineering for generative AI models, including best practices for creating effective prompts and optimizing AI interactions.',
    skills: ['Generative AI', 'Prompt Engineering', 'AI Optimization', 'Natural Language Processing'],
    certificateUrl: '/images/certifications/Coursera 2 Generative AI Prompt Engineering.pdf',
    hasImage: true,
    badge: '✨'
  },
  {
    id: 'ai-applications',
    title: 'Developing AI Applications with Python and Flask',
    issuer: 'IBM - Coursera',
    date: '2025',
    description: 'Hands-on development of AI applications using Python and Flask framework, covering deployment, API development, and production-ready AI solutions.',
    skills: ['Python', 'Flask', 'AI Applications', 'Web Development', 'API Development'],
    certificateUrl: '/images/certifications/Coursera 6 Developing Ai Applications WIth Python and Flask.pdf',
    hasImage: true,
    badge: '🚀'
  },
  {
    id: 'generative-ai-apps',
    title: 'Building Generative AI Powered Applications',
    issuer: 'IBM - Coursera',
    date: '2025',
    description: 'Advanced course on building production-ready applications powered by generative AI, including integration, optimization, and deployment strategies.',
    skills: ['Generative AI', 'Application Development', 'AI Integration', 'Production Deployment'],
    certificateUrl: '/images/certifications/Coursera 7 Building Generative AI powered Application.pdf',
    hasImage: true,
    badge: '⚡'
  },
  {
    id: 'software-engineering',
    title: 'Introduction to Software Engineering',
    issuer: 'IBM - Coursera',
    date: '2025',
    description: 'Fundamental principles of software engineering including design patterns, development methodologies, and best practices for scalable software development.',
    skills: ['Software Engineering', 'Design Patterns', 'Development Methodologies', 'Best Practices'],
    certificateUrl: '/images/certifications/Coursera 1 Introduction To software engineering.pdf',
    hasImage: true,
    badge: '⚙️'
  },
  {
    id: 'web-development',
    title: 'Introduction to HTML, CSS, and JavaScript',
    issuer: 'IBM - Coursera',
    date: '2025',
    description: 'Comprehensive introduction to web development fundamentals including HTML structure, CSS styling, and JavaScript programming for interactive web applications.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Web Development', 'Frontend'],
    certificateUrl: '/images/certifications/Coursera 3 Intro To HTML CSS and JS.pdf',
    hasImage: true,
    badge: '🌐'
  }
];

function CertificationCard({ certification, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="w-full"
    >
      <TiltCard 
        className={`group relative backdrop-blur-sm border rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 ${
          certification.isMain 
            ? 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-amber-300 dark:border-amber-400/40 hover:border-amber-400 dark:hover:border-amber-400/60 shadow-lg shadow-amber-200/30 dark:shadow-amber-400/20' 
            : 'bg-white/90 dark:bg-white/5 border-gray-200 dark:border-amber-400/20 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-amber-400/40 shadow-lg shadow-gray-600/20 dark:shadow-amber-400/20'
        }`}
        intensity={1.5}
      >
        {/* Main Certification Badge */}
        {certification.isMain && (
          <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-all duration-300 bg-gradient-to-br from-amber-600 to-yellow-600">
            <span className="group-hover:animate-pulse">⭐</span>
          </div>
        )}

        {/* Regular Certification Number */}
        {!certification.isMain && (
          <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-all duration-300 bg-gradient-to-br from-amber-800 to-amber-900">
            <span className="group-hover:animate-pulse">{String(index).padStart(2, '0')}</span>
          </div>
        )}

        {/* Floating particles for main certification */}
        {certification.isMain && (
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-amber-400 rounded-full animate-pulse"
                style={{
                  left: `${20 + i * 30}%`,
                  top: `${15 + i * 25}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
          </div>
        )}

        <div className="space-y-4">
          {/* Certificate PDF Thumbnail */}
          <div className="w-full">
            <PDFThumbnail
              pdfUrl={certification.certificateUrl}
              title={certification.title}
              fallbackIcon={certification.badge}
              showPreview={certification.certificateUrl}
            />
          </div>

          {/* Certificate Badge and Title */}
          <div className="flex items-start gap-4">
            <div className={`text-4xl ${certification.isMain ? 'animate-bounce' : ''}`}>
              {certification.badge}
            </div>
            <div className="flex-1">
              <h3 className={`text-xl font-bold mb-1 group-hover:text-gray-800 dark:group-hover:text-amber-100 transition-colors duration-300 ${
                certification.isMain ? 'text-amber-800 dark:text-amber-200' : 'text-gray-900 dark:text-white'
              }`}>
                {certification.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300">
                <span>{certification.issuer}</span>
                <span>•</span>
                <span>{certification.date}</span>
                {certification.isMain && (
                  <>
                    <span>•</span>
                    <span className="font-semibold text-amber-800 dark:text-amber-200">Main Certification</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors duration-300">
            {certification.description}
          </p>

          {/* Skills Tags */}
          <div className="flex flex-wrap gap-2">
            {certification.skills.map((skill, skillIdx) => (
              <span
                key={skillIdx}
                className={`px-2 py-1 text-xs rounded-full border transition-all duration-300 ${
                  certification.isMain 
                    ? 'bg-amber-200 dark:bg-amber-500/20 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-500/30 hover:bg-amber-300 dark:hover:bg-amber-500/30' 
                    : 'bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-500/20 hover:bg-amber-200 dark:hover:bg-amber-500/20'
                }`}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* View Certificate Button */}
          <button 
            onClick={() => certification.certificateUrl && window.open(certification.certificateUrl, '_blank')}
            className={`w-full text-sm px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all duration-300 ${
              certification.isMain 
                ? 'bg-amber-100 dark:bg-amber-500/20 border-amber-300 dark:border-amber-500/40 hover:bg-amber-200 dark:hover:bg-amber-500/30 hover:border-amber-400 dark:hover:border-amber-400/60 focus:ring-amber-500 text-amber-800 dark:text-amber-200' 
                : 'bg-gray-100 dark:bg-white/10 border-gray-300 dark:border-amber-400/20 hover:bg-gray-200 dark:hover:bg-amber-500/10 hover:border-gray-400 dark:hover:border-amber-400/40 focus:ring-amber-500 text-gray-900 dark:text-white'
            }`}
          >
            {certification.certificateUrl ? '📄 View Certificate' : '🔒 Verify Certificate'}
          </button>
        </div>

        {/* Special glow effect for main certification */}
        {certification.isMain && (
          <div className="absolute -inset-2 rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500 -z-10 bg-gradient-to-br from-amber-400/40 to-yellow-400/20" />
        )}
      </TiltCard>
    </motion.div>
  );
}

export default function CertificationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black">
      {/* Navigation Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-3 text-gray-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-semibold">Back to Portfolio</span>
            </Link>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {ALL_CERTIFICATIONS.length} Professional Certifications
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Page Header */}
        <TextReveal>
          <div className="text-center mb-16">
            <CinematicText
              variant="glow"
              className="text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
            >
              Professional Certifications
            </CinematicText>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive collection of IBM and industry certifications demonstrating expertise in AI, Data Science, and Software Development
            </p>
          </div>
        </TextReveal>

        {/* Main Certification Highlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-amber-800 dark:text-amber-200 mb-2">
              🏆 Featured Certification
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              My flagship professional certification
            </p>
          </div>
          <CertificationCard certification={ALL_CERTIFICATIONS[0]} index={1} />
        </motion.div>

        {/* All Certifications Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Complete Certification Portfolio
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              All {ALL_CERTIFICATIONS.length} professional certifications in chronological order
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {ALL_CERTIFICATIONS.map((certification, index) => (
              <CertificationCard 
                key={certification.id} 
                certification={certification} 
                index={index + 1} 
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-400/30"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Collaborate?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            These certifications represent my commitment to continuous learning and professional excellence in AI and Data Science.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-400 hover:to-amber-500 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Get In Touch
            </Link>
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              View Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
