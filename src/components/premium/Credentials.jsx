import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CERTIFICATIONS = [
  {
    id: 'ibm-ai',
    title: "IBM AI Developer",
    issuer: "IBM via Coursera",
    year: "2025",
    badge: "🏆",
    isPrimary: true,
    description: "Professional Certificate covering AI development, machine learning, and production deployment."
  },
  {
    id: 'react-meta',
    title: "React Developer",
    issuer: "Meta",
    year: "2025",
    badge: "⚛️",
    isPrimary: false,
    description: "Modern React development including hooks, state management, and component architecture."
  },
  {
    id: 'python-prof',
    title: "Python Proficiency",
    issuer: "Industry Certification",
    year: "2025",
    badge: "🐍",
    isPrimary: false,
    description: "Advanced Python programming for data science, AI, and web development."
  },
  {
    id: 'gen-ai',
    title: "Generative AI",
    issuer: "IBM via Coursera",
    year: "2025",
    badge: "✨",
    isPrimary: false,
    description: "Prompt engineering and building applications with generative AI models."
  }
];

export default function Credentials() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-primary)] via-[var(--color-bg-secondary)] to-[var(--color-bg-primary)]" />
      
      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-caption text-[var(--color-accent)] mb-4 block tracking-widest">
            CREDENTIALS
          </span>
          <h2 className="text-display-md text-display text-[var(--color-text-primary)] mb-6">
            Professional Certifications
          </h2>
          <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Industry-recognized certifications validating expertise in AI development, 
            programming, and modern web technologies.
          </p>
        </motion.div>

        {/* Primary Certification - Featured */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="glass-card p-8 md:p-10 border-[var(--color-accent)]/20 hover:border-[var(--color-accent)]/40 transition-all">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Badge */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 flex items-center justify-center text-4xl flex-shrink-0">
                🏆
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-heading-lg text-heading text-[var(--color-text-primary)]">
                    IBM AI Developer Professional Certificate
                  </h3>
                  <span className="px-3 py-1 text-xs font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full border border-[var(--color-accent)]/20">
                    Featured
                  </span>
                </div>
                <p className="text-sm text-[var(--color-text-muted)] mb-3">
                  IBM via Coursera • 2025
                </p>
                <p className="text-body-sm text-[var(--color-text-secondary)]">
                  Comprehensive 8-course program covering software engineering fundamentals, Python programming, 
                  AI concepts, generative AI, and production deployment of AI applications.
                </p>
              </div>

              {/* Action */}
              <div className="flex-shrink-0">
                <motion.a
                  href="/images/certifications/Coursera Professional Certificate IBM AI Developer.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>View Certificate</span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Certifications Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {CERTIFICATIONS.filter(c => !c.isPrimary).map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="glass-card p-6 group hover:border-[var(--color-accent)]/30 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-tertiary)] flex items-center justify-center text-2xl group-hover:bg-[var(--color-accent)]/10 transition-colors">
                  {cert.badge}
                </div>
                <div className="flex-1">
                  <h4 className="text-[var(--color-text-primary)] font-medium mb-1">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {cert.issuer} • {cert.year}
                  </p>
                </div>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {cert.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#/certifications"
            className="inline-flex items-center gap-2 text-[var(--color-accent)] hover:text-[var(--color-text-primary)] transition-colors group"
          >
            <span>View All 8 Certifications</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
