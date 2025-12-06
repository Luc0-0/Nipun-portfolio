import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navigation from '../components/premium/Navigation';
import Footer from '../components/premium/Footer';

const TIMELINE = [
  {
    year: '2020',
    title: '10th Grade',
    institution: 'Kendriya Vidyalaya, Delhi',
    description: 'Completed secondary education with focus on mathematics and science.',
    type: 'education'
  },
  {
    year: '2022',
    title: '12th Grade',
    institution: 'Kendriya Vidyalaya, Kannur',
    description: 'Completed higher secondary education in Science stream.',
    type: 'education'
  },
  {
    year: '2022',
    title: 'BTech Enrollment',
    institution: 'Kathir College of Engineering',
    description: 'Enrolled in BTech Artificial Intelligence and Data Science program.',
    type: 'education'
  },
  {
    year: '2024',
    title: 'IBM AI Developer Certification',
    institution: 'IBM via Coursera',
    description: 'Completed 8-course professional certificate covering AI development, Python, and production deployment.',
    type: 'certification'
  },
  {
    year: '2024',
    title: 'Mental Health AI Project',
    institution: 'Capstone Project',
    description: 'Initiated development of conversational AI system for mental wellness support.',
    type: 'project'
  },
  {
    year: '2026',
    title: 'Expected Graduation',
    institution: 'Kathir College of Engineering',
    description: 'BTech in AI & Data Science. Current CGPA: 8.0',
    type: 'education'
  }
];

const CERTIFICATIONS = [
  {
    category: 'Foundations',
    items: [
      {
        title: 'Python for Data Science, AI & Development',
        issuer: 'IBM via Coursera',
        year: '2024'
      },
      {
        title: 'Python Project for AI & Application Development',
        issuer: 'IBM via Coursera',
        year: '2024'
      }
    ]
  },
  {
    category: 'AI Engineering',
    items: [
      {
        title: 'Introduction to Artificial Intelligence (AI)',
        issuer: 'IBM via Coursera',
        year: '2024'
      },
      {
        title: 'Building Generative AI-Powered Applications',
        issuer: 'IBM via Coursera',
        year: '2024'
      },
      {
        title: 'Machine Learning with Python',
        issuer: 'IBM via Coursera',
        year: '2024'
      }
    ]
  },
  {
    category: 'Generative AI',
    items: [
      {
        title: 'Generative AI: Prompt Engineering Basics',
        issuer: 'IBM via Coursera',
        year: '2024'
      },
      {
        title: 'Generative AI: Enhance your Software Development Career',
        issuer: 'IBM via Coursera',
        year: '2024'
      }
    ]
  },
  {
    category: 'Web/Software Skills',
    items: [
      {
        title: 'React Developer',
        issuer: 'Meta',
        year: '2025'
      }
    ]
  }
];

export default function TimelineResumePage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/images/NIPUN SUJESH_compressed.pdf';
    link.download = 'Nipun_Sujesh_Resume.pdf';
    link.click();
  };

  return (
    <>
      <Navigation />
      <main className="relative z-10 pt-20">
        <section ref={sectionRef} className="py-32 relative">
          <div className="section-container">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <span className="text-caption text-[var(--color-accent)] mb-4 block tracking-widest">
                TIMELINE & RESUME
              </span>
              <h1 className="text-display-xl text-display text-[var(--color-text-primary)] mb-6">
                Professional Journey
              </h1>
              <p className="text-body-lg text-[var(--color-text-secondary)] max-w-3xl mb-8">
                Chronological progression of education, certifications, and project milestones.
              </p>
              <motion.button
                onClick={handleResumeDownload}
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Resume PDF</span>
              </motion.button>
            </motion.div>

            {/* Timeline */}
            <div className="mb-24">
              <h2 className="text-display-md text-display text-[var(--color-text-primary)] mb-12">
                Timeline
              </h2>
              <div className="relative max-w-4xl">
                {/* Vertical Line */}
                <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--color-border)]" />
                
                {TIMELINE.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative pl-16 pb-12"
                  >
                    {/* Node */}
                    <div className="absolute left-0 top-0 w-12 h-12 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-[var(--color-accent)] border-4 border-[var(--color-bg-primary)]" />
                    </div>
                    
                    {/* Content */}
                    <div className="glass-card p-6">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-heading-md text-heading text-[var(--color-text-primary)] mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-[var(--color-accent)] mb-2">
                            {item.institution}
                          </p>
                        </div>
                        <span className="text-sm text-[var(--color-text-muted)] font-mono whitespace-nowrap">
                          {item.year}
                        </span>
                      </div>
                      <p className="text-body-sm text-[var(--color-text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-display-md text-display text-[var(--color-text-primary)] mb-6">
                Certifications
              </h2>
              <p className="text-body-md text-[var(--color-text-secondary)] mb-12 max-w-3xl">
                Industry-recognized credentials validating expertise in AI development, 
                machine learning, and software engineering. Certification stack demonstrates 
                progression from foundations to production deployment.
              </p>

              <div className="space-y-12">
                {CERTIFICATIONS.map((category, catIndex) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.5 + catIndex * 0.1 }}
                  >
                    <h3 className="text-heading-lg text-heading text-[var(--color-text-primary)] mb-6">
                      {category.category}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.items.map((cert, certIndex) => (
                        <div
                          key={certIndex}
                          className="glass-card p-6 hover:border-[var(--color-accent)]/30 transition-all"
                        >
                          <h4 className="text-[var(--color-text-primary)] font-medium mb-2">
                            {cert.title}
                          </h4>
                          <p className="text-sm text-[var(--color-text-muted)]">
                            {cert.issuer} • {cert.year}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

