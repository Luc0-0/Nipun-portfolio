import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const FEATURED_PROJECTS = [
  {
    id: 1,
    title: "Samarth",
    subtitle: "AI + Gov Data | 2024–2025",
    description: "Indian Government Data Q/A System. Web platform that retrieves, cleans, and structures domain information from Indian government datasets. Supports natural-language Q/A using embeddings and retrieval pipelines.",
    image: "/images/Signature Project/Samarth.png",
    tags: ["NLP", "FastAPI", "Embeddings", "RAG", "React"],
    liveUrl: "https://samarth-two.vercel.app/",
    codeUrl: "https://github.com/Luc0-0/Samarth",
    year: "2024-2025",
    category: "AI/ML"
  },
  {
    id: 2,
    title: "Elevated Notes",
    subtitle: "AI Tools | 2024",
    description: "Intelligent Note System with Summaries & Semantic Search. Modern note-taking application with AI-driven summaries, rewrite tools, key-point extraction, and semantic search backed by embeddings and transformers.",
    image: "/images/Signature Project/Elevated Notes.png",
    tags: ["React", "FastAPI", "Embeddings", "Transformers", "AI"],
    liveUrl: "https://6000-firebase-studio-1755792191232.cluster-y3k7ko3fang56qzieg3trwgyfg.cloudworkstations.dev/",
    codeUrl: "https://github.com/Luc0-0/Smart-notes-by-Nipun",
    year: "2024",
    category: "AI/ML"
  },
  {
    id: 7,
    title: "XLNet Emotion Classifier",
    subtitle: "AI Research | 2025",
    description: "Fine-tuned XLNet for emotion classification. Achieved 87% accuracy with detailed training diagnostics and confusion matrix analysis.",
    image: "/images/Signature Project/Xlnet-emotion-classifier.png",
    tags: ["XLNet", "Transformers", "NLP", "PyTorch"],
    liveUrl: null,
    codeUrl: "https://github.com/Luc0-0/xlnet-emotion-classifier",
    year: "2025",
    category: "AI/ML"
  },
  {
    id: 5,
    title: "Fake News Classification NLP",
    subtitle: "AI Research | 2025",
    description: "Standardized binary classification pipeline comparing Logistic Regression and Linear SVM (~87% acc) using TF-IDF features for interpretable fake news detection.",
    image: "/images/Signature Project/Fake News Classification NLP.png",
    tags: ["Python", "NLP", "Scikit-learn", "TF-IDF", "AI"],
    liveUrl: null,
    codeUrl: "https://github.com/Luc0-0/Fake-News-Classification-NLP",
    year: "2025",
    category: "AI/ML"
  },
  {
    id: 3,
    title: "Task Manager Pro",
    subtitle: "Full-Stack | 2024",
    description: "Production Task Management System. Full-stack MERN application supporting tasks, metrics, authentication, and collaborative workflows. JWT auth, protected APIs, real-time updates, and metrics dashboard.",
    image: "/images/Signature Project/Task manager pro.png",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    liveUrl: "https://task-manager-pro-are3-drab.vercel.app",
    codeUrl: "https://github.com/Luc0-0/Task-manager-pro",
    year: "2024",
    category: "Web Development"
  },
  {
    id: 4,
    title: "Portfolio Platform",
    subtitle: "Web Development | 2024–2025",
    description: "High-Performance Developer Portfolio. React 19 SPA with 3D visuals, AI chatbot, and live GitHub integration. Built with optimized code splitting, lazy loading, and premium UI. Lighthouse: 98/100.",
    image: "/images/Signature Project/Portfolio (1).png",
    tags: ["React", "Three.js", "Gemini AI", "Tailwind", "Vite"],
    liveUrl: "https://www.nipun.space",
    codeUrl: "https://github.com/Luc0-0/Nipun-portfolio",
    year: "2024-2025",
    category: "Web Development"
  }
];

function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1.2, delay: index * 0.15, ease: "easeInOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="gallery-item w-[340px] md:w-[400px] lg:w-[450px] flex-shrink-0"
    >
      <div className="glass-card overflow-hidden h-full">
        {/* Project Image */}
        <div className="relative h-56 md:h-64 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] via-[var(--color-bg-primary)]/20 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="tag">{project.category}</span>
          </div>

          {/* Year */}
          <div className="absolute top-4 right-4">
            <span className="text-xs font-mono text-[var(--color-text-muted)]">{project.year}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title & Subtitle */}
          <div className="mb-4">
            <h3 className="text-heading-md text-heading text-[var(--color-text-primary)] mb-1">
              {project.title}
            </h3>
            <p className="text-sm text-[var(--color-accent)]">{project.subtitle}</p>
          </div>

          {/* Description */}
          <p className="text-body-sm text-[var(--color-text-secondary)] mb-6 line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-tertiary)] rounded"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-[var(--color-text-muted)]">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-primary text-center text-sm py-2.5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Live
            </motion.a>
            <motion.a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary px-4 py-2.5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectGallery() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const secondCardRef = useRef(null); // Track the second project card for mobile
  const fourthCardRef = useRef(null); // Track the fourth project card for desktop
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [showSwipeHint, setShowSwipeHint] = useState(true); // Show hint by default

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, []);

  // Track card visibility to hide swipe hint (2nd card for mobile, 4th card for desktop)
  useEffect(() => {
    const observers = [];

    // Mobile: hide when 2nd card is visible
    if (secondCardRef.current) {
      const mobileObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShowSwipeHint(false);
            }
          });
        },
        {
          root: null,
          threshold: 0.5,
        }
      );
      mobileObserver.observe(secondCardRef.current);
      observers.push({ ref: secondCardRef, observer: mobileObserver });
    }

    // Desktop: hide when 4th card is visible
    if (fourthCardRef.current) {
      const desktopObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setShowSwipeHint(false);
            }
          });
        },
        {
          root: null,
          threshold: 0.3, // Lower threshold for 4th card
        }
      );
      desktopObserver.observe(fourthCardRef.current);
      observers.push({ ref: fourthCardRef, observer: desktopObserver });
    }

    return () => {
      observers.forEach(({ ref, observer }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="work" ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-accent)]/5 to-transparent pointer-events-none" />

      <div className="section-container mb-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-caption text-[var(--color-accent)] mb-4 block tracking-widest">
              SIGNATURE PROJECTS
            </span>
            <h2 className="text-display-md text-display text-[var(--color-text-primary)]">
              Engineering Work
            </h2>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <motion.button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${canScrollLeft
                ? 'border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-muted)]'
                : 'border-[var(--color-border)] opacity-30 cursor-not-allowed'
                }`}
              whileHover={canScrollLeft ? { scale: 1.05 } : {}}
              whileTap={canScrollLeft ? { scale: 0.95 } : {}}
            >
              <svg className="w-5 h-5 text-[var(--color-text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${canScrollRight
                ? 'border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-muted)]'
                : 'border-[var(--color-border)] opacity-30 cursor-not-allowed'
                }`}
              whileHover={canScrollRight ? { scale: 1.05 } : {}}
              whileTap={canScrollRight ? { scale: 0.95 } : {}}
            >
              <svg className="w-5 h-5 text-[var(--color-text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </motion.div>

        {/* Project Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4"
        >
          <span className="text-sm text-[var(--color-text-muted)]">
            01 — 0{FEATURED_PROJECTS.length}
          </span>
        </motion.div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div
        ref={scrollContainerRef}
        className="gallery-scroll pl-6 md:pl-12 lg:pl-[calc((100vw-1200px)/2+1.5rem)] relative"
        style={{ scrollPaddingLeft: '1.5rem' }}
      >
        {FEATURED_PROJECTS.map((project, index) => {
          // Attach refs to track visibility
          let cardRef = null;
          if (index === 1) cardRef = secondCardRef; // 2nd card for mobile
          if (index === 3) cardRef = fourthCardRef; // 4th card for desktop

          // Show indicator on 1st card (mobile) or 3rd card (desktop)
          const showIndicator = index === 0 || index === 2;

          return (
            <div key={project.id} ref={cardRef} className="relative">
              <ProjectCard project={project} index={index} />

              {/* Swipe Hint */}
              {showIndicator && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: showSwipeHint ? 1 : 0,
                    pointerEvents: showSwipeHint ? 'auto' : 'none'
                  }}
                  transition={{ duration: 0.5 }}
                  className={`absolute bottom-8 right-8 z-10 ${index === 0 ? 'md:hidden' : 'hidden md:block'
                    }`}
                >
                  <div className="glass-card px-4 py-3 flex items-center gap-2 border border-[var(--color-accent)]/30">
                    <span className="text-xs text-[var(--color-accent)] font-medium tracking-wide">
                      Swipe
                    </span>
                    <div className="flex items-center">
                      <motion.svg
                        className="w-4 h-4 text-[var(--color-accent)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                      <motion.svg
                        className="w-4 h-4 text-[var(--color-accent)] -ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.15
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}

        {/* View All Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="gallery-item w-[280px] flex-shrink-0 pr-6"
        >
          <a
            href="#/work"
            className="h-full flex flex-col items-center justify-center glass-card p-8 text-center hover:bg-[var(--color-accent-muted)] transition-all group"
          >
            <div className="w-16 h-16 rounded-full border border-[var(--color-border)] group-hover:border-[var(--color-accent)] flex items-center justify-center mb-6 transition-all">
              <svg className="w-6 h-6 text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <span className="text-heading-md text-heading text-[var(--color-text-primary)] mb-2">View All Work</span>
            <span className="text-sm text-[var(--color-text-muted)]">See detailed project breakdowns</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
