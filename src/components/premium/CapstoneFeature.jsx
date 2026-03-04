import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

function AnimatedCounter({ value, inView }) {
  const [count, setCount] = useState(0);
  const target = parseInt(value);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <>{count}</>;
}

export default function CapstoneFeature() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const navigate = useNavigate();

  return (
    <section ref={ref} className="section-container py-16">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="group relative rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-secondary)] hover:border-[var(--color-accent)]/30 transition-all duration-500"
        style={{ boxShadow: "0 0 60px rgba(212, 168, 83, 0.08), var(--shadow-card)" }}
        whileHover={{ boxShadow: "0 0 80px rgba(212, 168, 83, 0.15), var(--shadow-elevated)" }}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)" }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <div
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: "radial-gradient(circle, rgba(212,168,83,0.04) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-8 p-8 md:p-12">
          <div className="flex-1 min-w-0">
            <motion.div 
              className="flex items-center gap-3 mb-5"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.span
                className="text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full border"
                style={{
                  color: "var(--color-accent)",
                  borderColor: "var(--color-accent)",
                  background: "var(--color-accent-muted)",
                  letterSpacing: "3px",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(212, 168, 83, 0.3)" }}
              >
                Featured Capstone
              </motion.span>
              <span className="text-[10px] text-[var(--color-text-muted)] tracking-widest uppercase">
                BTech AI &amp; DS · 2025
              </span>
            </motion.div>

            <motion.h2
              className="text-display font-display mb-3 leading-tight bg-gradient-to-r from-[var(--color-text-primary)] via-[var(--color-accent)] to-[var(--color-text-primary)] bg-clip-text text-transparent bg-[length:200%_100%] group-hover:animate-[shimmer_3s_ease-in-out_infinite]"
              style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-1px" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Serenity
            </motion.h2>

            <motion.p
              className="text-[var(--color-text-secondary)] mb-6 leading-relaxed"
              style={{ maxWidth: "560px", fontSize: "clamp(14px, 1.5vw, 16px)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              A multi-modal mental health assistant with a four-tier persistent memory
              system, real-time emotion detection, and crisis-safe response logic.
              Deployed across Vercel, Railway, and Supabase.
            </motion.p>

            <motion.div 
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {[
                "4-Tier Memory System",
                "Crisis Detection",
                "XLNet · 88% Accuracy",
                "Live in Production",
              ].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] bg-[var(--color-bg-tertiary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            <motion.div 
              className="flex gap-6"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {[
                { value: "4", label: "Memory Tiers" },
                { value: "12", label: "Pipeline Steps" },
                { value: "10", label: "DB Tables" },
              ].map((s, i) => (
                <motion.div 
                  key={s.label} 
                  className="text-center group/stat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                >
                  <p
                    className="font-display text-[var(--color-accent)] font-bold leading-none mb-1 group-hover/stat:text-gradient-gold transition-all"
                    style={{ fontSize: "clamp(20px, 3vw, 32px)" }}
                  >
                    <AnimatedCounter value={s.value} inView={inView} />
                  </p>
                  <p className="text-[10px] text-[var(--color-text-muted)] uppercase tracking-wider whitespace-nowrap group-hover/stat:text-[var(--color-accent)] transition-colors">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-6 flex-shrink-0">
            <motion.div
              className="rounded-xl border border-[var(--color-border)] overflow-hidden flex-shrink-0"
              style={{ width: "380px" }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <div className="bg-[var(--color-bg-elevated)] h-8 flex items-center px-3 gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-[10px] text-[var(--color-text-muted)] ml-2">serenity.nipun.space</span>
              </div>
              <div style={{ height: "240px", overflow: "hidden", position: "relative" }}>
                <iframe
                  src="https://serenity.nipun.space"
                  title="Serenity Live Preview"
                  style={{
                    border: "none",
                    pointerEvents: "none",
                    width: "160%",
                    height: "160%",
                    transform: "scale(0.625)",
                    transformOrigin: "top left",
                    overflow: "hidden"
                  }}
                />
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-wrap gap-3 w-full lg:justify-end"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <motion.button
                onClick={() => navigate("/serenity")}
                className="btn-primary relative overflow-hidden"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="relative z-10">View Case Study →</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-hover)] to-[var(--color-accent)]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
              <motion.a
                href="https://serenity.nipun.space"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group/btn relative overflow-hidden"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="relative z-10 flex items-center gap-1">
                  Live Demo 
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    ↗
                  </motion.span>
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,83,0.3), transparent)" }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </motion.div>
    </section>
  );
}
