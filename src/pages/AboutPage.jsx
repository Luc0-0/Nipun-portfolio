import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navigation from '../components/premium/Navigation';
import Footer from '../components/premium/Footer';

const STATS = [
  { value: "8.0", label: "CGPA", description: "BTech AI & Data Science" },
  { value: "10+", label: "Projects", description: "Production deployments" },
  { value: "8", label: "Certifications", description: "IBM & Industry" },
  { value: "2026", label: "Graduation", description: "Expected" }
];

export default function AboutPage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <>
      <Navigation />
      <main className="relative z-10 pt-20">
        <section ref={sectionRef} className="py-32 relative">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              
              {/* Left Column - Content */}
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6 }}
                  className="text-caption text-[var(--color-accent)] mb-4 block tracking-widest"
                >
                  ABOUT
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-display-xl text-display text-[var(--color-text-primary)] mb-8"
                >
                  AI Engineer
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6 text-body-lg text-[var(--color-text-secondary)] mb-10"
                >
                  <p>
                    Final-year BTech student at Kathir College of Engineering, specializing in 
                    Artificial Intelligence and Data Science. Building production-ready AI systems 
                    with focus on NLP, computer vision, and full-stack deployment.
                  </p>
                  
                  <p>
                    Current capstone project: Mental Health AI Assistant—a conversational system 
                    using transformer models for empathetic, context-aware mental wellness support. 
                    System processes 1000+ conversations with 87% user satisfaction.
                  </p>

                  <p>
                    Target roles: AI Engineer, ML Engineer, Research Engineer. Available for 
                    internships and full-time positions starting 2026.
                  </p>
                </motion.div>

                {/* Education */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="pt-10 border-t border-[var(--color-border)]"
                >
                  <h3 className="text-sm font-medium text-[var(--color-text-muted)] mb-6 tracking-wide">
                    EDUCATION
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-16 text-sm text-[var(--color-accent)] font-mono">2022-2026</div>
                      <div>
                        <div className="text-[var(--color-text-primary)] font-medium mb-1">
                          BTech in AI & Data Science
                        </div>
                        <div className="text-sm text-[var(--color-text-muted)]">
                          Kathir College of Engineering • CGPA: 8.0
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Stats */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="grid grid-cols-2 gap-4"
              >
                {STATS.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
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
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
