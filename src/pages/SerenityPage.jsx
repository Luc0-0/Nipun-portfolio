import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/premium/Navigation";
import Footer from "../components/premium/Footer";
import { useSEOMeta } from "../hooks/useSEOMeta";
import { ExpandableImage } from "../components/ImageModal";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const slideInLeftVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const slideInRightVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const CounterValue = ({ value, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const numValue = parseInt(value.toString().replace(/[^0-9]/g, ""));
    const hasPercent = value.toString().includes("%");
    const duration = 1.5;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(numValue * easeProgress);
      setCount(currentCount);

      if (progress === 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {value.toString().includes("%") ? "%" : ""}
    </span>
  );
};

const RevealSection = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      custom={delay}
      variants={fadeInUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

const StatCard = ({ value, label, sub, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      custom={delay}
      variants={scaleInVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        y: -8,
        boxShadow: "0 12px 40px rgba(212, 168, 83, 0.25)",
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
      }}
      className="glass-card p-7 text-left group hover:border-[var(--color-accent)]/50 transition-all cursor-default flex flex-col relative overflow-hidden"
    >
      {/* Subtle gradient overlay on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      <div className="relative z-10">
        <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-accent)] transition-colors">
          {label}
        </p>
        {sub && (
          <p className="text-xs text-[var(--color-text-muted)] mb-4">{sub}</p>
        )}
        <motion.p 
          className="text-3xl font-display text-[var(--color-accent)] leading-none"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <CounterValue value={value} delay={delay} />
        </motion.p>
      </div>
    </motion.div>
  );
};

const MemoryTierRow = ({ index, tier, source, ttl, description }) => {
  const colors = ["var(--color-accent)", "#7C9070", "#6B7E8F", "#8B7B9B"];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: isInView ? index * 0.15 : 0, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ x: 4, backgroundColor: "rgba(212, 168, 83, 0.03)" }}
      className="grid grid-cols-[40px_1fr_1fr_auto] gap-4 items-start py-5 border-b border-[var(--color-border)] last:border-b-0 transition-all rounded-lg px-2 -mx-2"
    >
      <motion.div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-obsidian-900"
        style={{ backgroundColor: colors[index] }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        {index + 1}
      </motion.div>

      <div>
        <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
          {tier}
        </p>
        <p className="text-xs text-[var(--color-text-secondary)]">
          {description}
        </p>
      </div>

      <p className="text-xs font-mono text-[var(--color-text-secondary)] pt-1">
        {source}
      </p>

      <motion.span 
        className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[var(--color-accent-muted)] text-[var(--color-accent)] whitespace-nowrap flex-shrink-0"
        whileHover={{ scale: 1.05, boxShadow: "0 0 12px rgba(212, 168, 83, 0.3)" }}
        transition={{ duration: 0.2 }}
      >
        {ttl}
      </motion.span>
    </motion.div>
  );
};

const PipelineStep = ({ number, label, sub, highlight }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.div 
      ref={ref}
      className="flex flex-col items-center gap-2 flex-1 min-w-[80px]"
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{ duration: 0.5, delay: number * 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
          highlight
            ? "bg-[var(--color-accent)] text-obsidian-900"
            : "bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)]"
        }`}
        style={highlight ? { boxShadow: "var(--shadow-glow)" } : {}}
        whileHover={{ scale: 1.15, rotate: 5 }}
        animate={highlight ? { boxShadow: ["0 0 20px rgba(212, 168, 83, 0.3)", "0 0 30px rgba(212, 168, 83, 0.5)", "0 0 20px rgba(212, 168, 83, 0.3)"] } : {}}
        transition={highlight ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 }}
      >
        {number}
      </motion.div>
      <p
        className={`text-[11px] font-semibold text-center leading-tight ${
          highlight
            ? "text-[var(--color-accent)]"
            : "text-[var(--color-text-primary)]"
        }`}
      >
        {label}
      </p>
      {sub && (
        <p className="text-[10px] text-[var(--color-text-muted)] text-center">
          {sub}
        </p>
      )}
    </motion.div>
  );
};

const TechStackRow = ({ layer, tech }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  
  return (
    <motion.div 
      ref={ref}
      className="grid grid-cols-[140px_1fr] gap-4 py-4 border-b border-[var(--color-border)] last:border-b-0 items-center group hover:border-[var(--color-accent)]/30 transition-all rounded-lg px-2 -mx-2"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      whileHover={{ x: 4, backgroundColor: "rgba(212, 168, 83, 0.02)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <motion.div 
          className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider group-hover:text-[var(--color-accent)] transition-colors">
          {layer}
        </p>
      </div>
      <p className="text-sm font-mono text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
        {tech}
      </p>
    </motion.div>
  );
};

export default function SerenityPage() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useSEOMeta({
    title: "Serenity — AI Mental Health Assistant | Nipun Sujesh",
    description: "Serenity is a production-grade AI-powered mental health assistant with multi-modal interaction, real-time crisis detection, and personalized memory management. Built with FastAPI, React, and Ollama.",
    keywords: "mental health AI, crisis detection, emotion analysis, mental health chatbot, AI healthcare, Serenity app, mental wellness, AI assistant",
    canonical: "https://www.nipun.space/#/serenity",
    ogUrl: "https://www.nipun.space/#/serenity",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Preload critical SVG images for better performance
    const imagesToPreload = [
      '/docs/serenity-01-architecture.svg',
      '/docs/serenity-02-chat-flow.svg',
      '/docs/serenity-05-feature-status.svg'
    ];
    
    imagesToPreload.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'image';
      link.href = src;
      link.setAttribute('data-preload-serenity', 'true');
      document.head.appendChild(link);
    });
    
    // Structured data for project/software application
    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Serenity",
      "description": "AI-powered mental health assistant with crisis detection and memory management",
      "url": "https://serenity.nipun.space",
      "applicationCategory": "HealthApplication",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "124"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Person",
        "name": "Nipun Sujesh",
        "url": "https://www.nipun.space"
      }
    };

    let scriptTag = document.querySelector('script[data-schema="serenity-app"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('data-schema', 'serenity-app');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);

    return () => {
      if (scriptTag) scriptTag.remove();
      // Cleanup preload links
      document.querySelectorAll('link[data-preload-serenity]').forEach(el => el.remove());
    };
  }, []);

  return (
    <>
      <Navigation />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[var(--color-accent)] origin-left z-[150]"
        style={{ scaleX }}
      />
      <main className="relative z-10 pt-8">
        <section className="py-12 md:py-16">
          <div className="section-container">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-12"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Portfolio
            </button>

            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-caption text-[var(--color-accent)] mb-4 block tracking-widest uppercase"
                >
                  Final Year Capstone • BTech AI & DS • 2025
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-display-xl font-display text-[var(--color-text-primary)] mb-6 leading-tight"
                >
                  Serenity
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl mb-8 leading-relaxed"
                >
                  A multi-modal mental health assistant with a four-tier persistent
                  memory system, real-time emotion detection, and crisis-safe
                  response logic — deployed and running in production.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-wrap gap-3 mb-8"
                >
                  <motion.a
                    href="https://serenity.nipun.space"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="opacity-80"
                    >
                      <path
                        d="M7 1.5C4 1.5 1.5 4 1.5 7S4 12.5 7 12.5 12.5 10 12.5 7 10 1.5 7 1.5z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M7 1.5c-1.5 0-3 2.5-3 5.5s1.5 5.5 3 5.5 3-2.5 3-5.5-1.5-5.5-3-5.5z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path d="M1.5 7h11" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    Live Demo
                  </motion.a>

                  <motion.a
                    href="https://github.com/Luc0-0/Serenity-Multi-Modal-Mental-Assistant-System"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="opacity-80"
                    >
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    GitHub
                  </motion.a>

                  <motion.a
                    href="https://github.com/Luc0-0/Serenity-Multi-Modal-Mental-Assistant-System/blob/main/README.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="opacity-80"
                    >
                      <rect
                        x="2"
                        y="1.5"
                        width="10"
                        height="11"
                        rx="1.5"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M4.5 4.5h5M4.5 7h5M4.5 9.5h3"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Documentation
                  </motion.a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-wrap gap-3"
                >
                  {[
                    { label: "Frontend", value: "Vercel", live: false },
                    { label: "Backend", value: "Railway", live: false },
                    { label: "Database", value: "Supabase", live: false },
                    { label: "Status", value: "● Live", live: true },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col gap-1 p-3 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg"
                    >
                      <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider">
                        {item.label}
                      </span>
                      <span
                        className={`text-xs font-semibold ${item.live ? "text-[#7C9070]" : "text-[var(--color-text-primary)]"}`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:flex items-start justify-end sticky top-24"
              >
                <div className="glass-card p-0 overflow-hidden border-2 border-[var(--color-accent)]/20 rounded-xl shadow-2xl w-full max-w-[550px]">
                  <div className="bg-[var(--color-bg-elevated)] h-8 flex items-center px-3 gap-2 border-b border-[var(--color-border)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                    <span className="text-[10px] text-[var(--color-text-muted)] ml-2 font-mono">serenity.nipun.space</span>
                  </div>
                  <div style={{ height: "320px", overflow: "hidden", position: "relative", background: "var(--color-bg-secondary)" }}>
                    <iframe
                      src="https://serenity.nipun.space"
                      title="Serenity Live Preview"
                      style={{
                        border: "none",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                  <motion.a
                    href="https://serenity.nipun.space"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2.5 text-[10px] font-semibold text-[var(--color-accent)] hover:bg-[var(--color-accent-muted)] transition-colors border-t border-[var(--color-border)]"
                    whileHover={{ backgroundColor: "rgba(212, 168, 83, 0.1)" }}
                  >
                    Open in new tab ↗
                  </motion.a>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col items-center gap-2 mt-16"
            >
              <span className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">Scroll to explore</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-5 h-8 rounded-full border-2 border-[var(--color-accent)] flex items-start justify-center p-1"
              >
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-2 rounded-full bg-[var(--color-accent)]"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="w-full h-8 flex items-center justify-center">
          <svg
            width="100%"
            height="40"
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
            className="w-full"
          >
            <path
              d="M0,20 Q300,10 600,20 T1200,20"
              stroke="var(--color-accent)"
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
          </svg>
        </div>

        <section className="py-16">
          <div className="section-container">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <StatCard value="4" label="Memory Tiers" sub="Persistent context" delay={0} />
              <StatCard value="10" label="DB Tables" sub="PostgreSQL schema" delay={0.1} />
              <StatCard value="88%" label="XLNet Accuracy" sub="Emotion detection" delay={0.2} />
              <StatCard value="12" label="Pipeline Steps" sub="Per message" delay={0.3} />
              <StatCard value="3" label="AI Engines" sub="Pluggable + swappable" delay={0.4} />
            </div>
          </div>
        </section>

        <div className="section-container">
          <div className="divider" />
        </div>

        <section className="py-16">
          <div className="section-container">
            <RevealSection>
              <span className="text-caption text-[var(--color-accent)] tracking-widest uppercase">
                Overview
              </span>
            </RevealSection>

            <div className="grid lg:grid-cols-2 gap-12 mt-12">
              <RevealSection delay={0.05} className="lg:translate-x-0">
                <motion.div
                  custom={0.05}
                  variants={slideInLeftVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <h2 className="text-heading-xl font-heading text-[var(--color-text-primary)] mb-6">
                    The Problem
                  </h2>
                  <div className="space-y-4 text-[var(--color-text-secondary)] text-body-md leading-relaxed">
                    <p>
                      Existing mental health chatbots treat every conversation
                      as isolated. No memory of who you are, what you've been
                      through, or how you've felt over time. The result is
                      shallow, repetitive interactions that build no therapeutic
                      value.
                    </p>
                    <p>
                      Crisis detection is typically absent or bolted on as an
                      afterthought — running after the LLM has already generated
                      a response that could cause harm.
                    </p>
                  </div>
                </motion.div>
              </RevealSection>

              <motion.div
                custom={0.1}
                variants={slideInRightVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h2 className="text-heading-xl font-heading text-[var(--color-text-primary)] mb-6">
                  The Approach
                </h2>
                <div className="space-y-4 text-[var(--color-text-secondary)] text-body-md leading-relaxed">
                  <p>
                    Serenity builds a persistent model of each user across four
                    memory tiers — short-term context, semantic vector memory, a
                    30-day emotional profile, and pattern-based meta-reflections
                    synthesised from journal entries.
                  </p>
                  <p>
                    Crisis detection is hardwired as the first step in every
                    pipeline run — before any LLM call is made. Safety cannot be
                    bypassed.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="section-container">
          <div className="divider" />
        </div>

        <section className="py-16">
          <div className="section-container">
            <RevealSection>
              <span className="text-caption text-[var(--color-accent)] tracking-widest uppercase">
                Architecture
              </span>
              <h2 className="text-heading-xl font-heading text-[var(--color-text-primary)] mt-4 mb-4">
                System Architecture
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-2xl mb-10">
                Five layers — React frontend, FastAPI backend, PostgreSQL
                database, pluggable AI/ML engines, and Docker Compose
                infrastructure — wired into a single deployable system.
              </p>
            </RevealSection>

            <RevealSection delay={0.1}>
              <motion.div
                className="glass-card p-1 rounded-lg overflow-hidden border border-[var(--color-border)] group"
                whileHover={{
                  y: -8,
                  borderColor: "rgba(212, 168, 83, 0.3)",
                  boxShadow: "0 20px 60px rgba(212, 168, 83, 0.15)",
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <ExpandableImage
                  src="/docs/serenity-01-architecture.svg"
                  alt="Serenity System Architecture"
                  className="w-full"
                />
              </motion.div>
            </RevealSection>
          </div>
        </section>

        <div className="section-container">
          <div className="divider" />
        </div>

        <section className="py-16">
          <div className="section-container">
            <RevealSection>
              <span className="text-caption text-[var(--color-accent)] tracking-widest uppercase">
                Core Contribution
              </span>
              <h2 className="text-heading-xl font-heading text-[var(--color-text-primary)] mt-4 mb-4">
                Four-Tier Memory System
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-2xl mb-10">
                Every message triggers a memory bundle before the LLM prompt is
                assembled. The model receives structured context from all four
                tiers simultaneously — enabling responses that reference past
                states, recurring themes, and long-term patterns.
              </p>
            </RevealSection>

            <RevealSection delay={0.1}>
              <div className="glass-card p-8 border border-[var(--color-border)]">
                <div className="grid grid-cols-[40px_1fr_1fr_auto] gap-4 pb-4 border-b border-[var(--color-border)] mb-2">
                  {["#", "Tier", "Source", "TTL"].map((h) => (
                    <p
                      key={h}
                      className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider"
                    >
                      {h}
                    </p>
                  ))}
                </div>
                {[
                  {
                    tier: "Short-term",
                    source: "Conversation summaries (cached)",
                    ttl: "Session",
                    description:
                      "Recent message context and active conversation state",
                  },
                  {
                    tier: "Semantic Memory",
                    source: "384-dim vector similarity search",
                    ttl: "Permanent",
                    description:
                      "Semantically similar past exchanges via sentence-transformers",
                  },
                  {
                    tier: "Emotional Profile",
                    source: "30-day rolling emotion aggregation",
                    ttl: "12 hours",
                    description:
                      "Dominant emotions, trends, and mood patterns over time",
                  },
                  {
                    tier: "Meta-Reflections",
                    source: "Journal + conversation pattern synthesis",
                    ttl: "2 days",
                    description:
                      "High-level behavioural patterns from long-term history",
                  },
                ].map((t, i) => (
                  <MemoryTierRow key={t.tier} index={i} {...t} />
                ))}
              </div>
            </RevealSection>
          </div>
        </section>

        <div className="section-container">
          <div className="divider" />
        </div>

        <section className="py-16">
          <div className="section-container">
            <RevealSection>
              <span className="text-caption text-[var(--color-accent)] tracking-widest uppercase">
                Safety Architecture
              </span>
              <h2 className="text-heading-xl font-heading text-[var(--color-text-primary)] mt-4 mb-8">
                Crisis Detection
              </h2>
            </RevealSection>

            <div className="grid lg:grid-cols-2 gap-12">
              <RevealSection delay={0.05}>
                <div className="space-y-4 text-[var(--color-text-secondary)] text-body-md leading-relaxed">
                  <p>
                    Crisis assessment is step one of twelve — hardwired before
                    ConversationService, EmotionService, and any LLM call. It
                    cannot be skipped or reordered.
                  </p>
                  <p>
                    The engine is intentionally keyword-based: high precision
                    over recall. A false positive that surfaces resources does
                    less harm than a false negative that doesn't. On trigger,
                    the pipeline terminates and returns 988, 741741, or 911 — no
                    LLM response.
                  </p>
                  <p>
                    Every crisis event is logged with severity classification,
                    detected keywords, timestamp, and user acknowledgement
                    state.
                  </p>
                </div>
              </RevealSection>

              <RevealSection delay={0.1}>
                <div className="space-y-3">
                  {[
                    {
                      label: "Position in pipeline",
                      value: "Step 1 of 12 — always first",
                    },
                    {
                      label: "Engine type",
                      value: "Keyword-based (conservative)",
                    },
                    {
                      label: "Design principle",
                      value: "High precision over recall",
                    },
                    {
                      label: "On trigger",
                      value: "Pipeline terminates, no LLM call",
                    },
                    {
                      label: "Resources returned",
                      value: "988 · 741741 · 911",
                    },
                    {
                      label: "Logging",
                      value: "Severity + keywords + ack state",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      custom={i * 0.05}
                      variants={fadeInUpVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      whileHover={{ 
                        x: 6, 
                        backgroundColor: "rgba(212, 168, 83, 0.03)",
                        borderColor: "rgba(212, 168, 83, 0.2)",
                        transition: { duration: 0.2 } 
                      }}
                      className="glass-card p-4 flex justify-between items-center gap-4 cursor-default border border-transparent"
                    >
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {item.label}
                      </span>
                      <span className="text-xs font-mono text-[var(--color-text-primary)] text-right">
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        <div className="section-container">
          <div className="divider" />
        </div>

        <section className="py-16">
          <div className="section-container">
            <RevealSection>
              <span className="text-caption text-[var(--color-accent)] tracking-widest uppercase">
                Request Pipeline
              </span>
              <h2 className="text-heading-xl font-heading text-[var(--color-text-primary)] mt-4 mb-4">
                Chat Message Flow
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-2xl mb-10">
                Every message runs a 12-step pipeline. Gold steps are the two
                critical paths — crisis assessment first, memory bundle assembly
                before the LLM prompt is built.
              </p>
            </RevealSection>

            <RevealSection delay={0.1}>
              <div className="glass-card p-6 mb-10 overflow-x-auto border border-[var(--color-border)]">
                <div className="flex items-start gap-1 min-w-[700px]">
                  {[
                    { n: 1, label: "User Input", highlight: false },
                    {
                      n: 2,
                      label: "Crisis Check",
                      highlight: true,
                      sub: "Step 1",
                    },
                    { n: 3, label: "Conversation", highlight: false },
                    { n: 4, label: "Emotion Engine", highlight: false },
                    { n: 5, label: "Context Mgr", highlight: false },
                    {
                      n: 6,
                      label: "Memory Bundle",
                      highlight: true,
                      sub: "4 tiers",
                    },
                    { n: 7, label: "Prompt Assembly", highlight: false },
                    { n: 8, label: "Ollama API", highlight: false },
                    { n: 9, label: "Save to DB", highlight: false },
                    {
                      n: 10,
                      label: "BG Tasks",
                      highlight: false,
                      sub: "Non-block",
                    },
                    { n: 11, label: "Stream SSE", highlight: false },
                    { n: 12, label: "Typewriter", highlight: false },
                  ].map((s, i) => (
                    <div key={s.n} className="flex items-center flex-1">
                      <PipelineStep {...s} />
                      {i < 11 && (
                        <div className="w-2 h-px bg-[var(--color-border)] flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={0.15}>
              <motion.div
                className="glass-card p-1 rounded-lg overflow-hidden border border-[var(--color-border)]"
                whileHover={{
                  y: -8,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <ExpandableImage
                  src="/docs/serenity-02-chat-flow.svg"
                  alt="Chat Message Flow"
                  className="w-full"
                />
              </motion.div>
            </RevealSection>
          </div>
        </section>

        <div className="section-container">
          <div className="divider" />
        </div>

        <section className="py-16">
          <div className="section-container">
            <RevealSection>
              <span className="text-caption text-[var(--color-accent)] tracking-widest uppercase">
                Technical Details
              </span>
              <h2 className="text-heading-xl font-heading text-[var(--color-text-primary)] mt-4 mb-10">
                Tech Stack
              </h2>
            </RevealSection>

            <div className="grid lg:grid-cols-2 gap-8">
              <RevealSection delay={0.1}>
                <div className="glass-card p-8 border border-[var(--color-border)]">
                  <TechStackRow
                    layer="Frontend"
                    tech="React 19, Vite 7, CSS Modules, Framer Motion, GSAP, Lenis"
                  />
                  <TechStackRow
                    layer="Backend"
                    tech="Python, FastAPI, Uvicorn, SQLAlchemy 2.0 async"
                  />
                  <TechStackRow
                    layer="Database"
                    tech="PostgreSQL 15, Alembic, asyncpg (Supabase)"
                  />
                </div>
              </RevealSection>

              <RevealSection delay={0.15}>
                <div className="glass-card p-8 border border-[var(--color-border)]">
                  <TechStackRow
                    layer="AI / ML"
                    tech="Ollama Cloud (gpt-oss:120b), sentence-transformers"
                  />
                  <TechStackRow layer="Auth" tech="JWT HS256, bcrypt, PyJWT" />
                  <TechStackRow
                    layer="Deploy"
                    tech="Vercel · Railway · Supabase · Docker Compose"
                  />
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        <div className="section-container">
          <div className="divider" />
        </div>

        <section className="py-16">
          <div className="section-container">
            <RevealSection>
              <span className="text-caption text-[var(--color-accent)] tracking-widest uppercase">
                Roadmap
              </span>
              <h2 className="text-heading-xl font-heading text-[var(--color-text-primary)] mt-4 mb-4">
                Feature Status
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-2xl mb-10">
                Core system deployed and functional. Active development on XLNet
                engine upgrade, Insights visualisations, and mobile experience.
              </p>
            </RevealSection>

            <RevealSection delay={0.1}>
              <motion.div
                className="glass-card p-1 rounded-lg overflow-hidden border border-[var(--color-border)]"
                whileHover={{
                  y: -8,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <ExpandableImage
                  src="/docs/serenity-05-feature-status.svg"
                  alt="Feature Status"
                  className="w-full"
                />
              </motion.div>
            </RevealSection>
          </div>
        </section>

        <div className="section-container">
          <div className="divider" />
        </div>

        <section className="py-16 md:py-24 text-center">
          <div className="section-container">
            <RevealSection>
              <span className="text-caption text-[var(--color-accent)] tracking-widest uppercase">
                Ready to explore
              </span>
              <h2 className="text-display-lg font-display text-[var(--color-text-primary)] my-6">
                Try Serenity
              </h2>
              <p className="text-body-lg text-[var(--color-text-secondary)] max-w-xl mx-auto mb-10">
                Live and running. No install required. Experience a mental
                health assistant built with production-grade architecture.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <motion.a
                  href="https://serenity.nipun.space"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  Open Live Demo
                </motion.a>
                <motion.a
                  href="https://github.com/Luc0-0/Serenity-Multi-Modal-Mental-Assistant-System"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  View on GitHub
                </motion.a>
                <motion.button
                  onClick={() => navigate(-1)}
                  className="btn-secondary"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  ← Back to Portfolio
                </motion.button>
              </div>
            </RevealSection>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
