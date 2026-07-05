import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1];
const RED = "#dd2316";
const TEXT = "#ece8e3";
const SECOND = "#8a857f";
const DIM = "#4f4a45";

const LINES = [
  { t: "[ ok ]", m: "kernel", ms: 4 },
  { t: "[ ok ]", m: "mounting  /work  /about  /uni-verse", ms: 37 },
  { t: "[ ok ]", m: "neural weights loaded", ms: 218 },
  { t: "[ ok ]", m: "uplink established", ms: 19 },
  { t: "[ ok ]", m: "interface ready", ms: 11 },
];

// Counts up to `target` ms in real time when a step appears.
function MsCounter({ target }) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? target : 0);
  useEffect(() => {
    if (reduce) {
      setV(target);
      return undefined;
    }
    let raf;
    let start;
    const dur = 260 + target * 0.7;
    const step = (t) => {
      if (start === undefined) start = t;
      const p = Math.min(1, (t - start) / dur);
      setV(Math.round(p * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, reduce]);
  return (
    <span className="tabular-nums" style={{ color: SECOND }}>
      {v}ms
    </span>
  );
}

// One-time boot overlay (per browser session). Skippable, reduced-motion aware.
export default function BootSequence() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => {
    try {
      return sessionStorage.getItem("nipun.booted") !== "1";
    } catch {
      return true;
    }
  });
  const [count, setCount] = useState(0);
  const [pct, setPct] = useState(0);
  const done = useRef(false);

  const finish = () => {
    if (done.current) return;
    done.current = true;
    try {
      sessionStorage.setItem("nipun.booted", "1");
    } catch {
      /* ignore */
    }
    setShow(false);
  };

  useEffect(() => {
    if (!show) return undefined;
    if (reduce) {
      finish();
      return undefined;
    }
    const li = setInterval(
      () =>
        setCount((c) => {
          const n = c + 1;
          if (n >= LINES.length) clearInterval(li);
          return n;
        }),
      380
    );
    const pi = setInterval(() => setPct((p) => Math.min(100, p + 3)), 90);
    const end = setTimeout(finish, 4200);
    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      clearInterval(li);
      clearInterval(pi);
      clearTimeout(end);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, reduce]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col overflow-hidden px-6 py-7 sm:px-12 sm:py-10"
          style={{ backgroundColor: "#000", fontFamily: "'JetBrains Mono', monospace" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <img
            src="/images/overlay.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            style={{ mixBlendMode: "screen", opacity: 0.28 }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(120% 100% at 30% 30%, transparent 45%, rgba(0,0,0,0.74) 100%)" }}
          />

          {/* Boot log streams from the top-left, like a real console */}
          <div className="relative max-w-2xl">
            <div className="mb-6 flex items-baseline gap-2.5">
              <span className="text-2xl" style={{ color: RED }}>✶</span>
              <span className="text-2xl" style={{ color: TEXT, letterSpacing: "0.01em" }}>nipun.os</span>
              <span className="text-sm" style={{ color: DIM }}>v1.0.0</span>
            </div>

            <p className="mb-4 text-sm" style={{ color: SECOND }}>
              initializing
              <span className="term-caret" style={{ color: RED }}>_</span>
            </p>

            <div className="space-y-2 text-sm">
              {LINES.slice(0, count).map((l, i) => (
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="flex items-baseline gap-3"
                >
                  <span style={{ color: RED, width: "3.2rem", display: "inline-block" }}>{l.t}</span>
                  <span className="flex-1" style={{ color: SECOND }}>{l.m}</span>
                  <MsCounter target={l.ms} />
                </motion.div>
              ))}
              {count >= LINES.length && pct >= 100 && (
                <motion.p
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="pt-1"
                  style={{ color: TEXT }}
                >
                  nipun.os ready
                </motion.p>
              )}
            </div>
          </div>

          {/* Progress pinned to the bottom */}
          <div className="relative mt-auto max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="flex gap-[3px]">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span
                    key={i}
                    style={{ width: 7, height: 12, backgroundColor: i < Math.round((pct / 100) * 16) ? RED : "rgba(255,255,255,0.08)" }}
                  />
                ))}
              </div>
              <span className="text-[12px] tabular-nums" style={{ color: TEXT }}>{pct}%</span>
            </div>
            <p className="mt-3 text-[11px]" style={{ color: DIM }}>press any key to skip</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
