import React, { useRef, useCallback, memo, useEffect, useState, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import HeroBackground from "./HeroBackground";
import HeroSpotlight from "./HeroSpotlight";

// ─── Scramble Text Hook ───────────────────────────────────────────────────────
const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#@$%&";

function useScrambleText(text, startDelay = 900) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    let intervalId;
    const totalFrames = 28;
    let frame = 0;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        frame++;
        const settled = Math.floor((frame / totalFrames) * text.length);
        setDisplay(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < settled) return char;
              return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
            })
            .join("")
        );
        if (frame >= totalFrames) {
          clearInterval(intervalId);
          setDisplay(text);
        }
      }, 48);
    }, startDelay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, startDelay]);

  return display;
}

// ─── Count-Up Hook ────────────────────────────────────────────────────────────
function useCountUp(end, duration = 1800, delay = 0, shouldStart = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    let rafId;

    const timer = setTimeout(() => {
      let startTime = null;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * end));
        if (progress < 1) rafId = requestAnimationFrame(animate);
      };
      rafId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [shouldStart, end, duration, delay]);

  return count;
}

// ─── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticButton({ children, className, onClick, href }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 350, damping: 20 });
  const springY = useSpring(y, { stiffness: 350, damping: 20 });

  const handleMouseMove = useCallback(
    (e) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      x.set((e.clientX - (rect.left + rect.width / 2)) * 0.28);
      y.set((e.clientY - (rect.top + rect.height / 2)) * 0.28);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        className={className}
        style={{ x: springX, y: springY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.96 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────
const RESUME_PATH = "/images/NIPUN SUJESH_compressed.pdf";
const RESUME_FILENAME = "Nipun_Sujesh_Resume.pdf";

const SKILLS = [
  "Python",
  "LangChain",
  "RAG Pipelines",
  "FastAPI",
  "React",
  "PyTorch",
  "OpenAI API",
  "Three.js",
  "GSAP",
  "Docker",
  "NLP",
  "LLMs",
  "Hugging Face",
  "PostgreSQL",
  "Node.js",
];

const FLOATING_BADGES = [
  {
    label: "NLP / LLMs",
    sub: "Expert",
    pos: "absolute -left-3 top-10",
    delay: 1.7,
    floatY: -7,
    floatDuration: 3.4,
  },
  {
    label: "RAG Pipelines",
    sub: "Builder",
    pos: "absolute -left-3 bottom-28",
    delay: 1.9,
    floatY: 7,
    floatDuration: 3.8,
  },
];

const NAME_CHARS = "Nipun Sujesh".split("");

// ─── Hero Component ───────────────────────────────────────────────────────────
const Hero = memo(() => {
  const [statsStarted, setStatsStarted] = useState(false);

  const scrambledTitle = useScrambleText("AI Engineer", 1100);
  const cgpaRaw = useCountUp(80, 1800, 0, statsStarted);
  const projects = useCountUp(10, 1600, 80, statsStarted);
  const certs = useCountUp(8, 1400, 160, statsStarted);

  // Start count-up timed to match when stats section fades in (delay 1.65s)
  useEffect(() => {
    const t = setTimeout(() => setStatsStarted(true), 1650);
    return () => clearTimeout(t);
  }, []);

  const handleResumeDownload = useCallback(() => {
    try {
      const link = document.createElement("a");
      link.href = RESUME_PATH;
      link.download = RESUME_FILENAME;
      link.click();
    } catch {
      window.open(RESUME_PATH, "_blank");
    }
  }, []);

  const marqueeItems = useMemo(() => [...SKILLS, ...SKILLS], []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ position: "relative", backgroundColor: "#0a0a0a", zIndex: 0 }}
    >
      {/* Layered background */}
      <HeroBackground />
      <div className="hero-dot-grid absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
      <div className="aurora-layer-1 absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
      <div className="aurora-layer-2 absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* Main content */}
      <div className="section-container relative py-32" style={{ zIndex: 10 }}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left column ── */}
          <div className="order-2 lg:order-1">

            {/* Available pill */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-accent-muted)] mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-xs font-medium tracking-wider uppercase text-[var(--color-text-secondary)]">
                Open to Opportunities
              </span>
            </motion.div>

            {/* Split-letter name reveal */}
            <div className="overflow-hidden mb-6">
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-[var(--color-text-primary)] whitespace-nowrap flex"
                aria-label="Nipun Sujesh"
              >
                {NAME_CHARS.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.35 + i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      display: "inline-block",
                      minWidth: char === " " ? "0.3em" : undefined,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Scramble title */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="font-mono text-xl md:text-2xl tracking-widest text-[var(--color-accent)] mb-8"
            >
              {scrambledTitle}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="text-body-lg text-[var(--color-text-secondary)] max-w-xl mb-6 leading-relaxed"
            >
              Delivering reliable AI systems with clean data flows, optimized
              inference, and maintainable full-stack integrations. Skilled in
              NLP, LLMs, RAG pipelines, and scalable deployments.
            </motion.p>

            {/* Proof points */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-2 mb-10"
            >
              {[
                "10+ production-ready projects",
                "8.0 CGPA  ·  IBM Certified AI Developer",
                "Building applied AI systems with practical constraints",
              ].map((text, i) => (
                <p
                  key={i}
                  className="text-sm text-[var(--color-text-muted)] flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                  {text}
                </p>
              ))}
            </motion.div>

            {/* Magnetic CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton href="#/work" className="btn-primary">
                <span>View Work</span>
              </MagneticButton>

              <MagneticButton onClick={handleResumeDownload} className="btn-secondary">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span>Resume</span>
              </MagneticButton>
            </motion.div>

            {/* Skills marquee ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35, duration: 0.8 }}
              className="relative mt-8 overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent, black 14%, black 86%, transparent)",
              }}
            >
              <div className="marquee-track flex gap-8 w-max py-2">
                {marqueeItems.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs font-mono tracking-widest text-[var(--color-text-muted)] uppercase whitespace-nowrap inline-flex items-center gap-2"
                  >
                    <span className="text-[var(--color-accent)] opacity-50">◆</span>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Lab hint */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="inline-block mt-6"
            >
              <motion.a
                href="#/lab"
                className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors relative"
              >
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-2 h-2 rounded-full bg-[var(--color-accent)]"
                />
                <span className="tracking-wide">Explore 3D Systems Lab</span>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-px rounded-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent"
                  animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    boxShadow: "0 0 8px rgba(212,168,83,0.6)",
                    transformOrigin: "left",
                  }}
                />
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.a>
            </motion.div>

            {/* Count-up stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.65 }}
              className="flex gap-8 mt-12 pt-8 border-t border-[var(--color-border)]"
            >
              <div>
                <div className="text-2xl font-display font-medium text-[var(--color-text-primary)] tabular-nums">
                  {(cgpaRaw / 10).toFixed(1)}
                </div>
                <div className="text-sm text-[var(--color-text-muted)]">CGPA</div>
              </div>
              <div>
                <div className="text-2xl font-display font-medium text-[var(--color-text-primary)] tabular-nums">
                  {projects}+
                </div>
                <div className="text-sm text-[var(--color-text-muted)]">Projects</div>
              </div>
              <div>
                <div className="text-2xl font-display font-medium text-[var(--color-text-primary)] tabular-nums">
                  {certs}
                </div>
                <div className="text-sm text-[var(--color-text-muted)]">Certifications</div>
              </div>
            </motion.div>
          </div>

          {/* ── Right column — portrait ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 flex justify-center lg:justify-start lg:pl-48 lg:-mt-20"
          >
            <div className="relative">
              <HeroSpotlight />

              {/* Decorative frames */}
              <div className="absolute -inset-4 border border-[var(--color-accent)]/20 rounded-2xl" />
              <div className="absolute -inset-8 border border-[var(--color-border)] rounded-3xl" />
              <div className="absolute -inset-12 bg-[var(--color-accent)]/5 rounded-full blur-3xl" />

              {/* Portrait — clip-path curtain reveal */}
              <div className="relative w-72 h-96 md:w-80 md:h-[420px] lg:w-96 lg:h-[500px] rounded-xl overflow-hidden bg-[var(--color-bg-tertiary)]">
                <motion.img
                  src="/images/Model.jpg"
                  alt="Nipun Sujesh - AI Engineer"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 20%" }}
                  initial={{ clipPath: "inset(0 0 100% 0)" }}
                  animate={{ clipPath: "inset(0 0 0% 0)" }}
                  transition={{
                    duration: 1.1,
                    delay: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onError={(e) => {
                    e.target.src = "/images/Nipun.webp";
                  }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)]/40 via-transparent to-transparent" />
              </div>

              {/* IBM Certified badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.0, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
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
                    <div className="text-xs text-[var(--color-text-muted)]">IBM Certified</div>
                    <div className="text-sm font-medium text-[var(--color-text-primary)]">
                      AI Developer
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating skill badges — desktop only */}
              {FLOATING_BADGES.map(({ label, sub, pos, delay, floatY, floatDuration }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.85, x: -10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
                  className={`${pos} glass-card px-3 py-2 hidden lg:block`}
                >
                  <motion.div
                    animate={{ y: [0, floatY, 0] }}
                    transition={{
                      duration: floatDuration,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                    <div>
                      <div className="text-xs font-medium text-[var(--color-text-primary)] whitespace-nowrap">
                        {label}
                      </div>
                      <div className="text-[10px] text-[var(--color-text-muted)]">{sub}</div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-[var(--color-accent)]/50 rounded-tl-lg" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-[var(--color-accent)]/50 rounded-br-lg" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1 }}
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

      {/* Spline watermark cover */}
      <div className="absolute bottom-8 right-8 w-24 h-8 bg-gradient-to-r from-transparent via-[var(--color-bg-primary)] to-[var(--color-bg-primary)] pointer-events-none z-20" />
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
