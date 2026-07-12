import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const RED = "#dd2316";
const TEXT = "#ece8e3";
const SECOND = "#8a857f";
const DIM = "#5a544e";
const BORDER_RED = "rgba(221,35,22,0.35)";
const EASE = [0.23, 1, 0.32, 1];
const CSS_EASE = "cubic-bezier(0.23,1,0.32,1)";
const TOUR_TEST = true; // TODO testing: show tour every reload; set false to persist-dismiss
const KEY = "nipun.tour.v1";

const ROWS = ["work", "about", "skills", "contact"];
const ROW_TOP = [10, 40, 70, 100]; // internal to the menu panel
const CURSOR_ROW_Y = [79, 109, 139, 169]; // mock coords over each row

export default function OnboardingDemo() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: 262, y: 16 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [hi, setHi] = useState(-1);
  const [clicking, setClicking] = useState(false);
  const [typed, setTyped] = useState("");
  const [manual, setManual] = useState(false);
  const manualRef = useRef(false);

  // gate: wait for the boot sequence to finish
  useEffect(() => {
    let seen = true;
    try {
      seen = localStorage.getItem(KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen && !TOUR_TEST) return undefined;
    let t;
    const start = () => {
      t = setTimeout(() => setOpen(true), 500);
    };
    if (typeof window !== "undefined" && window.__nipunBooted) {
      start();
      return () => clearTimeout(t);
    }
    const onBooted = () => start();
    window.addEventListener("nipun:booted", onBooted, { once: true });
    return () => {
      window.removeEventListener("nipun:booted", onBooted);
      clearTimeout(t);
    };
  }, []);

  // deterministic demo loop (css transitions, never stalls)
  useEffect(() => {
    if (!open) return undefined;
    if (reduce) {
      setTyped("/");
      setMenuOpen(true);
      setHi(0);
      return undefined;
    }
    let stopped = false;
    const ids = [];
    const at = (ms, fn) =>
      ids.push(
        setTimeout(() => {
          if (!stopped && !manualRef.current) fn();
        }, ms)
      );
    const force = (ms, fn) => ids.push(setTimeout(() => !stopped && fn(), ms));
    const run = () => {
      manualRef.current = false;
      setManual(false);
      setMenuOpen(false);
      setHi(-1);
      setClicking(false);
      setTyped("");
      setCursor({ x: 262, y: 16 });
      at(360, () => setCursor({ x: 150, y: 196 }));
      at(1150, () => setClicking(true));
      at(1340, () => {
        setClicking(false);
        setTyped("/");
      });
      at(1580, () => {
        setMenuOpen(true);
        setHi(0);
        setCursor({ x: 120, y: CURSOR_ROW_Y[0] });
      });
      at(2180, () => {
        setHi(1);
        setCursor({ x: 120, y: CURSOR_ROW_Y[1] });
      });
      at(2780, () => {
        setHi(2);
        setCursor({ x: 120, y: CURSOR_ROW_Y[2] });
      });
      at(3380, () => {
        setHi(3);
        setCursor({ x: 120, y: CURSOR_ROW_Y[3] });
      });
      force(4600, () => (manualRef.current ? force(1600, run) : run()));
    };
    run();
    return () => {
      stopped = true;
      ids.forEach(clearTimeout);
    };
  }, [open, reduce]);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const hoverRow = (i) => {
    manualRef.current = true;
    setManual(true);
    setMenuOpen(true);
    setHi(i);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center px-5"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(7px)", WebkitBackdropFilter: "blur(7px)", fontFamily: "'JetBrains Mono', monospace" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          onClick={close}
        >
          <motion.div
            className="relative w-full max-w-[400px] rounded-lg border p-5"
            style={{ borderColor: BORDER_RED, backgroundColor: "#050505", boxShadow: "0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(221,35,22,0.12)" }}
            initial={reduce ? false : { opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em]" style={{ color: RED }}>
              ▸ how to get around
            </p>

            {/* mock hero window */}
            <div className="relative h-[236px] overflow-hidden rounded-md border" style={{ borderColor: "rgba(236,232,227,0.1)", background: "linear-gradient(180deg,#0a0a0a,#000)" }}>
              {/* blurred hero content behind */}
              <div className="absolute inset-x-0 top-0 px-4 pt-4" style={{ filter: "blur(1.4px)", opacity: 0.4 }} aria-hidden="true">
                <div className="mb-2 flex gap-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <span key={i} style={{ width: 12, height: 12, background: RED, opacity: 0.85 - i * 0.06 }} />
                  ))}
                </div>
                <div className="mt-3 h-2 w-3/4 rounded" style={{ background: "rgba(236,232,227,0.22)" }} />
                <div className="mt-2 h-2 w-1/2 rounded" style={{ background: "rgba(236,232,227,0.14)" }} />
              </div>

              {/* menu panel */}
              <div
                className="absolute inset-x-2 rounded-md border"
                style={{
                  top: 56,
                  bottom: 44,
                  borderColor: BORDER_RED,
                  backgroundColor: "rgba(4,4,4,0.97)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(10px)",
                  transition: `opacity 0.32s ${CSS_EASE}, transform 0.32s ${CSS_EASE}`,
                  pointerEvents: menuOpen ? "auto" : "none",
                }}
                onMouseLeave={() => {
                  manualRef.current = false;
                  setManual(false);
                }}
              >
                {/* moving highlight */}
                <div
                  className="absolute inset-x-1.5 rounded"
                  style={{
                    height: 26,
                    top: hi >= 0 ? ROW_TOP[hi] : 10,
                    opacity: hi >= 0 ? 1 : 0,
                    background: "rgba(221,35,22,0.18)",
                    border: "1px solid rgba(221,35,22,0.5)",
                    transition: `top 0.28s ${CSS_EASE}, opacity 0.2s ${CSS_EASE}`,
                  }}
                />
                {ROWS.map((label, i) => (
                  <button
                    key={label}
                    type="button"
                    onMouseEnter={() => hoverRow(i)}
                    tabIndex={-1}
                    className="absolute left-1.5 right-1.5 flex items-center gap-2 rounded px-1.5 text-[13px]"
                    style={{ top: ROW_TOP[i], height: 26, color: hi === i ? RED : TEXT }}
                  >
                    <span style={{ color: RED }}>▸</span>
                    {label}
                  </button>
                ))}
              </div>

              {/* highlighted command bar */}
              <div className="absolute inset-x-2 bottom-2">
                <div className="flex items-center gap-2 rounded-md border px-2.5 py-2 text-[12px]" style={{ borderColor: RED, backgroundColor: "rgba(221,35,22,0.06)", boxShadow: "0 0 18px rgba(221,35,22,0.22)", color: SECOND }}>
                  <span style={{ color: RED }}>❯</span>
                  {typed ? (
                    <span style={{ color: TEXT }}>
                      {typed}
                      <span className="term-caret" style={{ color: RED }}>▌</span>
                    </span>
                  ) : (
                    <span>type / or ask anything</span>
                  )}
                </div>
              </div>

              {/* click ripple */}
              {!reduce && (
                <div
                  className="pointer-events-none absolute rounded-full"
                  style={{
                    width: 34,
                    height: 34,
                    left: 133,
                    top: 179,
                    border: `2px solid ${RED}`,
                    opacity: clicking ? 0.9 : 0,
                    transform: clicking ? "scale(1.7)" : "scale(0.4)",
                    transition: clicking ? `transform 0.35s ease-out, opacity 0.35s ease-out` : "opacity 0.2s",
                  }}
                />
              )}

              {/* animated cursor */}
              {!reduce && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute left-0 top-0 z-10"
                  style={{
                    transform: `translate(${cursor.x}px, ${cursor.y}px) scale(${clicking ? 0.82 : 1})`,
                    transition: `transform 0.55s ${CSS_EASE}`,
                    opacity: manual ? 0 : 1,
                    filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.85))",
                  }}
                >
                  <path d="M4 2 L4 18 L8.5 13.5 L11.5 20 L14 19 L11 12.5 L17 12.5 Z" fill={TEXT} stroke="#000" strokeWidth="1" />
                </svg>
              )}
            </div>

            <p className="mt-4 text-[13px] leading-relaxed" style={{ color: "#c9c4bd" }}>
              This bar at the bottom is your controller. Press <kbd className="rounded border px-1 text-[11px]" style={{ borderColor: BORDER_RED, color: RED }}>/</kbd> or click it to open the menu and jump to any page, or just ask a question about my work. The wheel in the center switches pages too.
            </p>

            <div className="mt-4 flex items-center justify-between">
              <button onClick={close} className="cursor-pointer text-[11px]" style={{ color: DIM }}>
                skip
              </button>
              <button
                onClick={close}
                className="cursor-pointer rounded px-3.5 py-1.5 text-[12px] font-medium text-white transition-all duration-150 hover:brightness-110 active:translate-y-px"
                style={{ backgroundColor: "#d31f12", boxShadow: "0 2px 0 #6e0f06" }}
              >
                got it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
