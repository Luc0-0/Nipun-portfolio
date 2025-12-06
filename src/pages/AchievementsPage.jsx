import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navigation from '../components/premium/Navigation';
import Footer from '../components/premium/Footer';

const ACHIEVEMENTS = [
  {
    id: 1,
    category: 'Academic Excellence',
    title: 'CGPA: 8.0',
    description: 'BTech in AI & Data Science with consistent academic performance',
    icon: '▪',
    year: '2022-2026'
  },
  {
    id: 2,
    category: 'Professional Recognition',
    title: 'IBM Certified AI Developer',
    description: 'Professional Certificate from IBM - Coursera specialization',
    icon: '▪',
    year: '2025'
  },
  {
    id: 3,
    category: 'Engineering Output',
    title: '10+ Production Projects',
    description: 'Full-stack AI systems deployed with real-world impact',
    icon: '▪',
    year: 'Ongoing'
  },
  {
    id: 4,
    category: 'Technical Skills',
    title: '8 Certifications',
    description: 'IBM certifications in AI, ML, Python, and Software Engineering',
    icon: '▪',
    year: '2024-2025'
  },
  {
    id: 5,
    category: 'System Architecture',
    title: 'RAG Pipeline Development',
    description: 'Built retrieval-augmented generation systems for government data Q&A',
    icon: '▪',
    year: '2025'
  },
  {
    id: 6,
    category: 'Full-Stack Development',
    title: 'Real-time Systems',
    description: 'WebSocket-based AI applications supporting 1000+ concurrent users',
    icon: '▪',
    year: '2024'
  }
];

const CERTIFICATIONS = [
  {
    id: 'ibm-ai',
    title: 'IBM AI Developer Professional Certificate',
    issuer: 'IBM - Coursera',
    date: '2025',
    badge: '★',
    highlight: true
  },
  {
    id: 'intro-ai',
    title: 'Introduction to Artificial Intelligence',
    issuer: 'IBM - Coursera',
    date: '2025',
    badge: '✓'
  },
  {
    id: 'python-ds',
    title: 'Python for Data Science, AI & Development',
    issuer: 'IBM - Coursera',
    date: '2025',
    badge: '✓'
  },
  {
    id: 'gen-ai',
    title: 'Generative AI Prompt Engineering',
    issuer: 'IBM - Coursera',
    date: '2025',
    badge: '✓'
  },
  {
    id: 'ai-apps',
    title: 'Developing AI Applications with Python and Flask',
    issuer: 'IBM - Coursera',
    date: '2025',
    badge: '✓'
  },
  {
    id: 'gen-ai-apps',
    title: 'Building Generative AI Powered Applications',
    issuer: 'IBM - Coursera',
    date: '2025',
    badge: '✓'
  },
  {
    id: 'software-eng',
    title: 'Introduction to Software Engineering',
    issuer: 'IBM - Coursera',
    date: '2025',
    badge: '✓'
  },
  {
    id: 'web-dev',
    title: 'Introduction to HTML, CSS, and JavaScript',
    issuer: 'IBM - Coursera',
    date: '2025',
    badge: '✓'
  }
];

function AchievementCard({ achievement, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass-card p-6 hover:border-[var(--color-accent)]/40 transition-all group"
    >
      <div className="flex gap-4">
        <div className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform">
          {achievement.icon}
        </div>
        <div className="flex-1">
          <div className="text-xs text-[var(--color-accent)] uppercase tracking-wider mb-1">
            {achievement.category}
          </div>
          <h3 className="text-heading-md text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
            {achievement.title}
          </h3>
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-3">
            {achievement.description}
          </p>
          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            {achievement.year}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function CertificationBadge({ cert, index }) {
  const badgeRef = useRef(null);
  const isInView = useInView(badgeRef, { once: true, margin: '-30px' });

  return (
    <motion.div
      ref={badgeRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className={`glass-card p-4 text-center hover:border-[var(--color-accent)]/40 transition-all group ${
        cert.highlight ? 'border-[var(--color-accent)]/30' : ''
      }`}
    >
      <div className={`text-3xl mb-2 group-hover:scale-125 transition-transform ${cert.highlight ? 'animate-pulse' : ''}`}>
        {cert.badge}
      </div>
      <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1 line-clamp-2">
        {cert.title}
      </h4>
      <p className="text-xs text-[var(--color-text-muted)] mb-2">
        {cert.issuer}
      </p>
      <span className="text-xs text-[var(--color-accent)] font-mono">
        {cert.date}
      </span>
    </motion.div>
  );
}

export default function AchievementsPage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <>
      <Navigation />
      <main className="relative z-10 pt-20">
        {/* Main Section */}
        <section ref={sectionRef} className="py-32 relative">
          <div className="section-container">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="mb-20"
            >
              <span className="text-caption text-[var(--color-accent)] mb-4 block tracking-widest">
                ACHIEVEMENTS & CERTIFICATIONS
              </span>
              <h1 className="text-display-xl text-display text-[var(--color-text-primary)] mb-6">
                Professional Recognition
              </h1>
              <p className="text-body-lg text-[var(--color-text-secondary)] max-w-3xl">
                A comprehensive overview of academic achievements, professional certifications, and engineering milestones demonstrating expertise in AI, ML, and full-stack development.
              </p>
            </motion.div>

            {/* Key Achievements Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-20"
            >
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-heading-lg text-[var(--color-text-primary)]">
                  Key Achievements
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-accent)]/50 to-transparent" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {ACHIEVEMENTS.map((achievement, index) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>

            {/* Certifications Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-heading-lg text-[var(--color-text-primary)]">
                  Professional Certifications
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-accent)]/50 to-transparent" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {CERTIFICATIONS.map((cert, index) => (
                  <CertificationBadge
                    key={cert.id}
                    cert={cert}
                    index={index}
                  />
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                {[
                  { label: 'CGPA', value: '8.0' },
                  { label: 'Certifications', value: '8' },
                  { label: 'Projects', value: '10+' },
                  { label: 'Years Active', value: '2022-2026' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.4 + idx * 0.05 }}
                    className="glass-card p-6 text-center"
                  >
                    <div className="text-3xl font-bold text-[var(--color-accent)] mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-[var(--color-text-muted)]">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass-card p-8 md:p-12 border-[var(--color-accent)]/20 text-center"
            >
              <h3 className="text-heading-lg text-[var(--color-text-primary)] mb-4">
                Let's Build Something Together
              </h3>
              <p className="text-body-md text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
                With a strong foundation in AI/ML, production systems, and full-stack development, I'm ready to contribute to meaningful projects.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.a
                  href="#/contact"
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Get In Touch</span>
                </motion.a>
                <motion.a
                  href="#/work"
                  className="btn-secondary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>View Projects</span>
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
