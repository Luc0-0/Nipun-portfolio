import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const RED = "#dd2316";
const MUTE = "#6b655f";
const clamp = (v) => Math.min(1, Math.max(0, v));

export default function ScrollProgress() {
  const location = useLocation();
  const [p, setP] = useState(0);
  const [scrollable, setScrollable] = useState(false);
  const scrollerRef = useRef(null);
  const computeRef = useRef(() => {});

  useEffect(() => {
    // pages scroll an inner overflow-y-auto container, not the window
    const compute = () => {
      const el = scrollerRef.current;
      if (el && el !== window) {
        const max = el.scrollHeight - el.clientHeight;
        setScrollable(max > 48);
        setP(max > 0 ? clamp(el.scrollTop / max) : 0);
      } else {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrollable(max > 48);
        setP(max > 0 ? clamp(window.scrollY / max) : 0);
      }
    };
    computeRef.current = compute;

    const detach = () => {
      const cur = scrollerRef.current;
      if (cur && cur !== window) cur.removeEventListener("scroll", compute);
      else window.removeEventListener("scroll", compute);
    };

    const pick = () => {
      detach();
      let best = null;
      let bestMax = 48;
      document.querySelectorAll(".overflow-y-auto").forEach((node) => {
        const max = node.scrollHeight - node.clientHeight;
        if (max > bestMax) {
          best = node;
          bestMax = max;
        }
      });
      const winMax = document.documentElement.scrollHeight - window.innerHeight;
      if (!best && winMax > bestMax) best = window;
      scrollerRef.current = best;
      if (best && best !== window) best.addEventListener("scroll", compute, { passive: true });
      else if (best === window) window.addEventListener("scroll", compute, { passive: true });
      compute();
    };

    pick();
    window.addEventListener("resize", pick);
    let ro;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => compute());
      ro.observe(document.body);
    }
    const t1 = setTimeout(pick, 220);
    const t2 = setTimeout(pick, 650);
    return () => {
      detach();
      window.removeEventListener("resize", pick);
      if (ro) ro.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [location.pathname]);

  if (!scrollable) return null;
  const pct = Math.round(p * 100);
  const hintOpacity = clamp((0.06 - p) / 0.06);

  return (
    <>
    {/* center-bottom initial cue: content continues below the fold */}
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-[6.25rem] z-40 flex justify-center sm:bottom-16"
      style={{ opacity: hintOpacity, transition: "opacity 0.35s ease" }}
    >
      <div className="flex flex-col items-center gap-1.5">
        <span className="text-[10px] uppercase tracking-[0.28em]" style={{ color: MUTE, fontFamily: "'JetBrains Mono', monospace" }}>
          scroll
        </span>
        <span className="scroll-bob text-[14px]" style={{ color: RED, textShadow: `0 0 10px ${RED}` }}>▼</span>
      </div>
    </div>

    <div aria-hidden="true" className="pointer-events-none fixed right-2.5 top-1/2 z-40 h-[52vh] -translate-y-1/2 sm:right-3.5">
      {/* track */}
      <div className="relative h-full w-[3px] rounded-full" style={{ background: "rgba(236,232,227,0.1)", boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.4)" }}>
        {/* fill */}
        <div
          className="absolute left-0 top-0 w-full rounded-full"
          style={{
            height: `${p * 100}%`,
            background: `linear-gradient(180deg, rgba(221,35,22,0.5), ${RED})`,
            boxShadow: `0 0 10px ${RED}`,
            transition: "height 0.08s linear",
          }}
        />
        {/* tip marker */}
        <div
          className="absolute left-1/2 h-[7px] w-[7px] -translate-x-1/2 rounded-full"
          style={{
            top: `calc(${p * 100}% - 3.5px)`,
            background: "#ff6a5c",
            boxShadow: `0 0 8px ${RED}, 0 0 2px #fff`,
            transition: "top 0.08s linear",
          }}
        />
      </div>

      {/* percentage */}
      <div
        className="absolute right-full top-0 mr-2 hidden text-[9px] tabular-nums sm:block"
        style={{ color: MUTE, fontFamily: "'JetBrains Mono', monospace" }}
      >
        {pct}%
      </div>
    </div>
    </>
  );
}
