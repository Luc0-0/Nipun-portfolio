import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { blip, confirm } from "./sound";

const RED = "#dd2316";
const TEXT = "#ece8e3";
const SECOND = "#8a857f";
const DIM = "#4f4a45";
const EASE = "cubic-bezier(0.23,1,0.32,1)";

// order interleaves long/short labels so no two short words sit adjacent
const ITEMS = [
  { label: "skills", to: "/skills" },
  { label: "home", to: "/" },
  { label: "services", to: "/services" },
  { label: "work", to: "/work" },
  { label: "writing", to: "/writing" },
  { label: "about", to: "/about" },
  { label: "contact", to: "/contact" },
];

const routeIndex = (path) => {
  let best = 0;
  let bestLen = -1;
  ITEMS.forEach((it, i) => {
    const match = it.to === "/" ? path === "/" : path === it.to || path.startsWith(it.to + "/");
    if (match && it.to.length > bestLen) {
      best = i;
      bestLen = it.to.length;
    }
  });
  return best;
};

export default function VerticalNav() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();
  const current = useMemo(() => routeIndex(location.pathname), [location.pathname]);
  const isHome = location.pathname === "/";
  const [sel, setSel] = useState(current);
  const [hot, setHot] = useState(false);
  const navRef = useRef(null);
  const btnRefs = useRef([]);

  useEffect(() => {
    setSel(current);
  }, [current]);

  useEffect(() => {
    if (!isHome) return undefined;
    const el = navRef.current;
    if (!el) return undefined;
    let locked = false;
    let unlockId;
    const onWheel = (e) => {
      e.preventDefault();
      if (locked || Math.abs(e.deltaY) < 6) return;
      locked = true;
      const dir = e.deltaY > 0 ? 1 : -1;
      const len = ITEMS.length;
      setSel((s) => (s + dir + len) % len);
      blip();
      unlockId = setTimeout(() => {
        locked = false;
      }, 240);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(unlockId);
    };
  }, [isHome]);

  const go = (it) => {
    confirm();
    navigate(it.to);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const dir = e.key === "ArrowDown" ? 1 : -1;
      const len = ITEMS.length;
      const n = (sel + dir + len) % len;
      blip();
      setSel(n);
      btnRefs.current[n]?.focus({ preventScroll: true });
    }
  };

  if (!isHome) return null;

  return (
    <nav
      ref={navRef}
      aria-label="Site navigation"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      className="fixed left-1/2 top-[40%] z-40 hidden -translate-x-1/2 -translate-y-1/2 select-none lg:block"
      style={{ opacity: hot ? 1 : 0.72, transition: `opacity 0.4s ${EASE}` }}
    >
      {/* soft scrim so the wheel stays legible over page content without competing */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 300,
          height: 380,
          zIndex: -1,
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.4) 45%, transparent 72%)",
          opacity: hot ? 0.95 : 0.5,
          transition: `opacity 0.4s ${EASE}`,
        }}
      />
      {/* scroll affordance */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[11px]" style={{ top: -18, color: hot ? SECOND : DIM }}>⌃</div>
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[11px]" style={{ bottom: -18, color: hot ? SECOND : DIM }}>⌄</div>

      <div style={{ perspective: 620 }}>
        <ul className="relative m-0 h-[260px] w-[140px] list-none p-0" style={{ transformStyle: "preserve-3d" }}>
          {ITEMS.map((it, i) => {
            const len = ITEMS.length;
            let off = i - sel;
            if (off > len / 2) off -= len;
            if (off < -len / 2) off += len;
            const abs = Math.abs(off);
            const isSel = off === 0;
            const SP = 46;
            const transform = reduce
              ? `translate(-50%, calc(-50% + ${off * 32}px))`
              : `translate(-50%, calc(-50% + ${off * SP}px)) translateZ(${-abs * 48}px) rotateX(${off * -20}deg)`;
            return (
              <li
                key={it.to}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform,
                  transformOrigin: "center center",
                  opacity: abs > 2 ? 0 : isSel ? 1 : Math.max(0.42, 1 - abs * 0.24),
                  transition: reduce ? "none" : `transform 0.45s ${EASE}, opacity 0.35s ${EASE}`,
                  pointerEvents: abs > 2 ? "none" : "auto",
                }}
              >
                <button
                  ref={(el) => (btnRefs.current[i] = el)}
                  onClick={() => go(it)}
                  onFocus={() => setSel(i)}
                  aria-current={i === current ? "page" : undefined}
                  className="relative block whitespace-nowrap px-3 py-1 text-center outline-none transition-colors duration-200 focus:outline-none focus-visible:outline-none"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontVariantCaps: "all-small-caps",
                    fontSize: isSel ? 21 : 16,
                    lineHeight: 1,
                    letterSpacing: "0.14em",
                    color: isSel ? RED : SECOND,
                    fontWeight: isSel ? 600 : 500,
                    textShadow: isSel ? `0 0 14px rgba(221,35,22,0.55)` : "none",
                  }}
                >
                  {it.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="mt-1 pl-2 text-[9.5px] uppercase tracking-[0.2em]"
        style={{ color: DIM, opacity: hot ? 1 : 0, transition: `opacity 0.3s ${EASE}`, fontFamily: "'JetBrains Mono', monospace" }}
      >
        scroll · click
      </div>
    </nav>
  );
}
