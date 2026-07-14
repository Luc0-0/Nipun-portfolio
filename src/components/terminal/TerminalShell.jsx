import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, House } from "@phosphor-icons/react";
import { hoverTick, back as backSnd, blip } from "./sound";
import { useSEO } from "./useSEO";

const EASE = [0.23, 1, 0.32, 1];
const RED = "#dd2316";
const TEXT = "#ece8e3";
const DIM = "#4f4a45";

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleTimeString("en-GB", { hour12: false, timeZone: "Asia/Kolkata" });
}

// Page chrome shared across non-hero routes: bg + grid + overlay + topbar.
// The global CommandBar (mounted in main.jsx) provides the bottom nav.
export default function TerminalShell({ path = "~/", subtitle, quiet = false, children }) {
  const reduce = useReducedMotion();
  const time = useClock();
  const navigate = useNavigate();
  const gridRef = useRef(null);
  useSEO();

  const onPointerMove = (e) => {
    if (reduce) return;
    const el = gridRef.current;
    if (el) {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    }
  };

  return (
    <section
      className="relative flex h-[100dvh] w-full flex-col overflow-hidden"
      style={{ backgroundColor: "#000", color: TEXT, fontFamily: "'JetBrains Mono', monospace", "--color-accent": RED }}
      onMouseMove={onPointerMove}
    >
      {/* Blueprint grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(170,160,155,0.05) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(170,160,155,0.05) 1px, transparent 1px)",
            "linear-gradient(rgba(170,160,155,0.028) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(170,160,155,0.028) 1px, transparent 1px)",
            ...(quiet ? [] : ["radial-gradient(rgba(221,35,22,0.11) 0.6px, transparent 0.7px)"]),
          ].join(", "),
          backgroundSize: quiet ? "24px 24px, 24px 24px, 8px 8px, 8px 8px" : "24px 24px, 24px 24px, 8px 8px, 8px 8px, 2px 2px",
        }}
      />
      {/* Cursor-reactive grid (desktop only; useless + too bright on touch) */}
      <div
        ref={gridRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 hidden sm:block"
        style={{
          backgroundImage:
            "linear-gradient(rgba(221,35,22,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(221,35,22,0.55) 1px, transparent 1px)",
          backgroundSize: "13px 13px",
          opacity: 0.5,
          WebkitMaskImage: "radial-gradient(170px circle at var(--mx, -200px) var(--my, -200px), #000 0%, rgba(0,0,0,0.5) 45%, transparent 68%)",
          maskImage: "radial-gradient(170px circle at var(--mx, -200px) var(--my, -200px), #000 0%, rgba(0,0,0,0.5) 45%, transparent 68%)",
        }}
      />
      {/* Red corruption overlay + vignette */}
      {!quiet && (
        <img
          src="/images/overlay.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 hidden h-full w-full object-cover sm:block"
          style={{ mixBlendMode: "screen", opacity: 0.3, filter: "blur(1.2px)" }}
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: "radial-gradient(120% 100% at 50% 40%, transparent 58%, rgba(0,0,0,0.6) 100%)" }}
      />

      {/* Top bar */}
      <motion.header
        initial={reduce ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="relative z-50 flex shrink-0 items-baseline justify-between px-4 py-2.5 text-[11px] sm:px-6"
        style={{ color: "#ffffff", textShadow: "0 1px 3px rgba(0,0,0,0.9)", backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", borderBottom: "1px solid rgba(236,232,227,0.08)" }}
      >
        <span className="flex items-center gap-2">
          <button
            onClick={() => {
              backSnd();
              navigate(-1);
            }}
            onMouseEnter={hoverTick}
            aria-label="Go back"
            className="grid h-8 w-8 cursor-pointer place-items-center rounded-sm border transition-colors duration-200 hover:border-[rgba(221,35,22,0.7)] sm:h-6 sm:w-6"
            style={{ borderColor: "rgba(236,232,227,0.14)", color: "#b9b3ac" }}
          >
            <ArrowLeft size={13} />
          </button>
          <button
            onClick={() => {
              blip(700, 0.05, 0.03);
              navigate("/");
            }}
            onMouseEnter={hoverTick}
            aria-label="Go home"
            className="mr-1 grid h-8 w-8 cursor-pointer place-items-center rounded-sm border transition-colors duration-200 hover:border-[rgba(221,35,22,0.7)] sm:h-6 sm:w-6"
            style={{ borderColor: "rgba(236,232,227,0.14)", color: "#b9b3ac" }}
          >
            <House size={13} />
          </button>
          <span style={{ color: RED }}>✶</span>
          <span>{path}</span>
          {subtitle && <span className="hidden sm:inline" style={{ color: DIM }}>· {subtitle}</span>}
        </span>
        <span className="flex items-center gap-3">
          <span style={{ color: RED }}>◉</span>
          <span className="tabular-nums">{time}</span>
          <span style={{ color: DIM }}>|</span>
          <span>online</span>
        </span>
      </motion.header>

      {/* Page body (pb clears the fixed CommandBar) */}
      <div className="relative z-30 flex min-h-0 flex-1 flex-col pb-14">{children}</div>
    </section>
  );
}
