import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  {
    value: "8.0",
    label: "CGPA",
    description: "Academic Excellence"
  },
  {
    value: "IBM",
    label: "Certified",
    description: "AI Developer"
  },
  {
    value: "10+",
    label: "Projects",
    description: "Shipped & Deployed"
  },
  {
    value: "2026",
    label: "Graduation",
    description: "BTech AI & DS"
  }
];

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={sectionRef} className="py-32 relative">
      {/* Background Element */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-[600px] bg-gradient-to-r from-[var(--color-accent)]/5 to-transparent pointer-events-none" />

      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column - Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="text-caption text-[var(--color-accent)] mb-4 block tracking-widest"
            >
              ABOUT
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1.2, delay: 0.15, ease: "easeInOut" }}
              className="text-display-md text-display text-[var(--color-text-primary)] mb-8"
            >
              Engineering Focus
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
              className="space-y-6 text-body-lg text-[var(--color-text-secondary)]"
            >
              <p>
                Final-year BTech student in Artificial Intelligence and Data Science (Graduating 2026). 
                Focused on engineering AI systems built with structured data pipelines, transformer-based 
                NLP models, and maintainable full-stack infrastructure.
              </p>
              
              <p>
                Current capstone direction: applied conversational AI and retrieval workflows. 
                Strong foundation in building production-ready systems with practical constraints.
              </p>

              <p>
                <strong>Target Roles:</strong> AI Engineer • ML Engineer • Research Engineer<br/>
                Open to internships and full-time roles starting 2026.
              </p>
            </motion.div>

            {/* Education Timeline Mini */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1.2, delay: 0.45, ease: "easeInOut" }}
              className="mt-10 pt-10 border-t border-[var(--color-border)]"
            >
              <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-6 tracking-wide">
                EDUCATION
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 text-sm text-[var(--color-accent)] font-mono">2022</div>
                  <div>
                    <div className="text-[var(--color-text-primary)] font-medium">BTech in AI & Data Science</div>
                    <div className="text-sm text-[var(--color-text-muted)]">Kathir College of Engineering • CGPA: 8.0</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 text-sm text-[var(--color-text-muted)] font-mono">2022</div>
                  <div>
                    <div className="text-[var(--color-text-primary)] font-medium">12th Grade</div>
                    <div className="text-sm text-[var(--color-text-muted)]">Kendriya Vidyalaya, Kannur</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 text-sm text-[var(--color-text-muted)] font-mono">2020</div>
                  <div>
                    <div className="text-[var(--color-text-primary)] font-medium">10th Grade</div>
                    <div className="text-sm text-[var(--color-text-muted)]">Kendriya Vidyalaya, Delhi</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
            className="grid grid-cols-2 gap-4"
          >
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 1.2, delay: 0.45 + index * 0.12, ease: "easeInOut" }}
                className="glass-card p-6 md:p-8 group hover:border-[var(--color-accent)]/30"
              >
                <div className="text-3xl md:text-4xl font-display font-medium text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-[var(--color-text-muted)]">
                  {stat.description}
                </div>
              </motion.div>
            ))}

            {/* Additional Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 1.2, delay: 0.93, ease: "easeInOut" }}
              className="col-span-2 glass-card p-6 md:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[var(--color-text-primary)] font-medium mb-2">
                    Applied AI Research
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Building conversational AI and retrieval workflows. Focus on production systems 
                    with practical constraints, structured data pipelines, and maintainable inference.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
