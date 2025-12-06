import React, { useRef, useCallback, memo } from "react";
import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";

// Animation variants for reusability and maintainability
const fadeInUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: "easeInOut" },
};

const fadeInVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 1.2, ease: "easeInOut" },
};

const scaleInVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1.2, ease: "easeInOut" },
};

// Constants for better maintainability
const RESUME_PATH = "/images/NIPUN SUJESH_compressed.pdf";
const RESUME_FILENAME = "Nipun_Sujesh_Resume.pdf";
const ANIMATION_DELAYS = {
  name: 0.3,
  title: 0.5,
  description: 0.7,
  proof: 0.9,
  buttons: 1.1,
  stats: 1.3,
  portrait: 0.4,
  badge: 1.5,
  scrollIndicator: 1.5,
};

/**
 * Hero component - Premium landing section with animated content
 * Displays personal introduction, stats, and call-to-action buttons
 */
const Hero = memo(() => {
  const containerRef = useRef(null);

  // Memoized download handler for performance
  const handleResumeDownload = useCallback(() => {
    try {
      const link = document.createElement("a");
      link.href = RESUME_PATH;
      link.download = RESUME_FILENAME;
      link.click();
    } catch (error) {
      console.error("Failed to download resume:", error);
      // Fallback: open in new tab
      window.open(RESUME_PATH, "_blank");
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ position: "relative", backgroundColor: "#0a0a0a", zIndex: 0 }}
    >
      {/* Grain texture overlay */}
      <HeroBackground />

      {/* Main Content */}
      <div className="section-container relative z-10 py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            {/* Name - Single Line */}
            <motion.h1
              {...fadeInUpVariants}
              transition={{
                ...fadeInUpVariants.transition,
                delay: ANIMATION_DELAYS.name,
              }}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[var(--color-text-primary)] mb-6 whitespace-nowrap"
            >
              Nipun Sujesh
            </motion.h1>

            {/* Title */}
            <motion.p
              {...fadeInUpVariants}
              transition={{
                ...fadeInUpVariants.transition,
                delay: ANIMATION_DELAYS.title,
              }}
              className="text-heading-lg text-[var(--color-accent)] mb-8"
            >
              AI Engineer
            </motion.p>

            {/* Description */}
            <motion.p
              {...fadeInUpVariants}
              transition={{
                ...fadeInUpVariants.transition,
                delay: ANIMATION_DELAYS.description,
              }}
              className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl mb-6 leading-relaxed text-justify"
            >
              Delivering reliable AI systems with clean data flows, optimized
              inference, and maintainable full-stack integrations. Skilled in
              NLP, LLMs, RAG pipelines, and scalable deployments.
            </motion.p>

            {/* Proof Statements */}
            <motion.div
              {...fadeInUpVariants}
              transition={{
                ...fadeInUpVariants.transition,
                delay: ANIMATION_DELAYS.proof,
              }}
              className="space-y-2 mb-10"
            >
              <p className="text-sm text-[var(--color-text-muted)]">
                • 10+ production-ready projects
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                • 8.0 CGPA • IBM Certified AI Developer
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                • Building applied AI systems with practical constraints
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              {...fadeInUpVariants}
              transition={{
                ...fadeInUpVariants.transition,
                delay: ANIMATION_DELAYS.buttons,
              }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#/work"
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>View Work</span>
              </motion.a>

              <motion.a
                href="#/lab"
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Explore Lab</span>
              </motion.a>

              <motion.button
                onClick={handleResumeDownload}
                className="btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Resume</span>
              </motion.button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              {...fadeInVariants}
              transition={{
                ...fadeInVariants.transition,
                delay: ANIMATION_DELAYS.stats,
              }}
              className="flex gap-8 mt-12 pt-8 border-t border-[var(--color-border)]"
            >
              <div>
                <div className="text-2xl font-display font-medium text-[var(--color-text-primary)]">
                  8.0
                </div>
                <div className="text-sm text-[var(--color-text-muted)]">
                  CGPA
                </div>
              </div>
              <div>
                <div className="text-2xl font-display font-medium text-[var(--color-text-primary)]">
                  10+
                </div>
                <div className="text-sm text-[var(--color-text-muted)]">
                  Projects
                </div>
              </div>
              <div>
                <div className="text-2xl font-display font-medium text-[var(--color-text-primary)]">
                  8
                </div>
                <div className="text-sm text-[var(--color-text-muted)]">
                  Certifications
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Portrait */}
          <motion.div
            {...scaleInVariants}
            transition={{
              ...scaleInVariants.transition,
              delay: ANIMATION_DELAYS.portrait,
            }}
            className="order-1 lg:order-2 flex justify-center lg:justify-start lg:pl-48"
          >
            <div className="relative">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 border border-[var(--color-accent)]/20 rounded-2xl" />
              <div className="absolute -inset-8 border border-[var(--color-border)] rounded-3xl" />

              {/* Glow Effect */}
              <div className="absolute -inset-12 bg-[var(--color-accent)]/5 rounded-full blur-3xl" />

              {/* Image Container */}
              <div className="relative w-72 h-96 md:w-80 md:h-[420px] lg:w-96 lg:h-[500px] rounded-xl overflow-hidden bg-[var(--color-bg-tertiary)]">
                <img
                  src="/images/Model.jpg"
                  alt="Nipun Sujesh - AI Engineer"
                  className="w-full h-full object-cover object-top"
                  style={{ objectPosition: "center 20%" }}
                  onError={(e) => {
                    e.target.src = "/images/Nipun.webp"; // Fallback image
                    e.target.alt = "Fallback portrait";
                  }}
                  loading="lazy"
                />

                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/40 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 1.2,
                  delay: ANIMATION_DELAYS.badge,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 bottom-20 glass-card px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-[var(--color-accent)]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      IBM Certified
                    </div>
                    <div className="text-sm font-medium text-[var(--color-text-primary)]">
                      AI Developer
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Corner Accent */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-[var(--color-accent)]/50 rounded-tl-lg" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-[var(--color-accent)]/50 rounded-br-lg" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: ANIMATION_DELAYS.scrollIndicator }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border border-[var(--color-border)] flex justify-center pt-2"
        >
          <motion.div
            animate={{ opacity: [1, 0.3, 1], y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-[var(--color-accent)]"
          />
        </motion.div>
      </motion.div>

      {/* Spline Watermark Cover */}
      <div className="absolute bottom-8 right-8 w-24 h-8 bg-gradient-to-r from-transparent via-[var(--color-bg-primary)] to-[var(--color-bg-primary)] pointer-events-none z-20" />
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
