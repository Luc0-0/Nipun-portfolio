import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TerminalShell from "../components/terminal/TerminalShell";
import { hoverTick, confirm } from "../components/terminal/sound";
import { useVisited } from "../components/terminal/useVisited";
import { PROJECT_DETAILS } from "../components/terminal/projectData";
import { POSTS } from "../data/writing";

const RED = "#dd2316";
const RED_HI = "#ff3324";
const TEXT = "#ece8e3";
const BODY = "#b9b3ac";
const DIM = "#6b655f";
const FAINT = "#4f4a45";
const EASE = [0.23, 1, 0.32, 1];
const LINE = "rgba(221,35,22,0.4)";

const BUS_Y = 76;

const CHIPS = [
  { id: "home", x: 6, y: 14, route: "/", label: "HOME", sub: "terminal hero", note: "boot sequence runs once per session. pixel wordmark, live clock, ascii portrait." },
  { id: "work", x: 27, y: 14, route: "/work", label: "WORK", sub: "11 modules", note: "infinite card strip, drag or scroll. every project opens a file-view doc with interactive diagrams.", pins: Object.entries(PROJECT_DETAILS).map(([s, p]) => ({ to: `/work/${s}`, t: p.title })) },
  { id: "about", x: 48, y: 14, route: "/about", label: "ABOUT", sub: "system monitor", note: "ascii fluid that speaks, htop telemetry, draggable mind map, boot-log timeline." },
  { id: "skills", x: 69, y: 14, route: "/skills", label: "SKILLS", sub: "radar", note: "26 skills across 6 sectors on one radar. click a sector to zoom." },
  { id: "services", x: 16, y: 42, route: "/services", label: "SERVICES", sub: "for hire", note: "web, ai apps, rag chatbots. the brief form lands straight in the boss's inbox.", pins: [{ to: "/services", t: "web" }, { to: "/services", t: "ai apps" }, { to: "/services", t: "automation" }] },
  { id: "writing", x: 37, y: 42, route: "/writing", label: "WRITING", sub: "5 posts", note: "notes from building: memory systems, agents, production rag, mcp.", pins: POSTS.map((p) => ({ to: `/writing/${p.slug}`, t: p.title })) },
  { id: "achievements", x: 58, y: 42, route: "/achievements", label: "ACHIEVEMENTS", sub: "unlocked", note: "gen ai academy cohort 1, ibm ai developer, icraia paper. all verifiable." },
  { id: "opensource", x: 80, y: 38, route: "/opensource", label: "OPEN SOURCE", sub: "public code", note: "godprofile mcp server + nlp-from-scratch notebooks." },
  { id: "contact", x: 80, y: 56, route: "/contact", label: "CONTACT", sub: "open a channel", note: "compose straight to inbox. email, github, linkedin, resume." },
];

const NOTES = [
  { x: 6, y: 62, text: "sounds: webaudio synth,\nzero samples", to: [30, BUS_Y] },
  { x: 62, y: 90, text: "rag: 91 chunks · bm25 + embeddings\n· rrf · answers only from site data", to: [57.5, 89] },
  { x: 34, y: 62, text: "cursor: aim reticle · css only", to: [40, BUS_Y] },
  { x: 6, y: 90, text: "stack: react 19 · vite · vercel\n· ollama cloud · gemini embeddings", to: [22, BUS_Y + 6] },
];
const COLS = ["1", "2", "3", "4", "5"];
const ROWS_L = ["A", "B", "C", "D"];

function Chip({ c, hovered, setHovered, visited, go, reduce, i }) {
  const on = hovered === c.id;
  const seen = visited.has(c.route);
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE, delay: 0.1 + i * 0.05 }}
      className="absolute -translate-x-1/2"
      style={{ left: `${c.x + 6}%`, top: `${c.y}%`, opacity: hovered && !on ? 0.45 : 1, transition: "opacity 0.2s" }}
    >
      <button
        onClick={() => go(c.route)}
        onPointerEnter={() => {
          setHovered(c.id);
          hoverTick();
        }}
        onPointerLeave={() => setHovered(null)}
        className="block cursor-pointer border px-4 py-2.5 text-left transition-all duration-200"
        style={{
          borderColor: on ? RED_HI : LINE,
          backgroundColor: on ? "rgba(26,7,5,0.95)" : "rgba(8,8,8,0.92)",
          boxShadow: on ? "0 0 22px rgba(221,35,22,0.35)" : "none",
          minWidth: 120,
        }}
      >
        <span className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-[11px] tracking-[0.16em]" style={{ color: on ? RED_HI : RED }}>{c.label}</span>
          {seen && <span className="font-mono text-[10px]" style={{ color: "#6f9e80" }}>✓</span>}
        </span>
        <span className="mt-0.5 block font-mono text-[9px]" style={{ color: DIM }}>{c.sub}</span>
      </button>
      {c.pins && (
        <div className="mt-1 flex max-w-[180px] flex-wrap gap-1">
          {c.pins.map((p, j) => (
            <button
              key={p.t + j}
              title={p.t}
              onClick={() => go(p.to)}
              onPointerEnter={hoverTick}
              className="h-2 w-2 cursor-pointer rounded-[1px] border transition-colors duration-150 hover:bg-[#ff3324]"
              style={{ borderColor: LINE, backgroundColor: visited.has(p.to) ? "rgba(111,158,128,0.7)" : "rgba(221,35,22,0.25)" }}
              aria-label={p.t}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function MapPage() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const { visited } = useVisited();
  const [hovered, setHovered] = useState(null);

  const go = (route) => {
    confirm();
    navigate(route);
  };
  const active = CHIPS.find((c) => c.id === hovered);

  return (
    <TerminalShell path="~/map" subtitle="site blueprint" quiet>
      <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto w-full max-w-[1400px] px-5 py-8 sm:px-10">
          <div className="mb-4">
            <p className="font-mono text-sm" style={{ color: RED }}>&gt; ~/map<span className="term-caret">_</span></p>
            <p className="mt-1 font-mono text-sm" style={{ color: DIM }}>the site, documenting itself · hover a module · click to enter</p>
          </div>

          {/* blueprint sheet — desktop */}
          <div className="relative hidden h-[76vh] w-full border lg:block" style={{ borderColor: "rgba(221,35,22,0.3)" }}>
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {CHIPS.map((c) => {
                const on = hovered === c.id;
                return (
                  <g key={c.id}>
                    <line x1={c.x + 6} y1={c.y + 10} x2={c.x + 6} y2={BUS_Y} stroke={on ? RED_HI : RED} strokeWidth={on ? 1.8 : 1} strokeOpacity={on ? 1 : 0.5} strokeDasharray="4 3" vectorEffect="non-scaling-stroke" style={{ transition: "stroke 0.2s, stroke-opacity 0.2s" }} />
                    <circle cx={c.x + 6} cy={BUS_Y} r="0.45" fill={on ? RED_HI : RED} opacity={on ? 1 : 0.7} />
                  </g>
                );
              })}
              <line x1="3" y1={BUS_Y} x2="97" y2={BUS_Y} stroke={RED} strokeWidth="2.4" vectorEffect="non-scaling-stroke" strokeOpacity="0.85" />
              <line x1="3" y1={BUS_Y + 1.6} x2="97" y2={BUS_Y + 1.6} stroke={RED} strokeWidth="1" vectorEffect="non-scaling-stroke" strokeOpacity="0.3" />
              <line x1="57.5" y1={BUS_Y} x2="57.5" y2="86" stroke={RED_HI} strokeWidth="1.4" vectorEffect="non-scaling-stroke" strokeDasharray="3 2.5" />
              {NOTES.map((n, i) => (
                <line key={i} x1={n.x + 3} y1={n.y + 1.5} x2={n.to[0]} y2={n.to[1]} stroke={RED} strokeWidth="0.8" strokeOpacity="0.35" strokeDasharray="2.5 3" vectorEffect="non-scaling-stroke" />
              ))}
              {COLS.map((c, i) => {
                const x = 3 + ((97 - 3) / 5) * (i + 0.5);
                return (
                  <g key={c}>
                    <line x1={x} y1="0" x2={x} y2="1.6" stroke={LINE} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <line x1={x} y1="98.4" x2={x} y2="100" stroke={LINE} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  </g>
                );
              })}
              {ROWS_L.map((r, i) => {
                const y = ((100 / 4) * (i + 0.5));
                return (
                  <g key={r}>
                    <line x1="0" y1={y} x2="1" y2={y} stroke={LINE} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <line x1="99" y1={y} x2="100" y2={y} stroke={LINE} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  </g>
                );
              })}
            </svg>

            {COLS.map((c, i) => (
              <span key={c} className="absolute -translate-x-1/2 font-mono text-[9px]" style={{ left: `${3 + ((97 - 3) / 5) * (i + 0.5)}%`, top: "0.4%", color: FAINT }}>{c}</span>
            ))}
            {ROWS_L.map((r, i) => (
              <span key={r} className="absolute -translate-y-1/2 font-mono text-[9px]" style={{ left: "1.2%", top: `${(100 / 4) * (i + 0.5)}%`, color: FAINT }}>{r}</span>
            ))}

            <span className="absolute font-mono text-[10px] tracking-[0.2em]" style={{ left: "4%", top: `${BUS_Y - 4}%`, color: RED }}>
              CMD BUS /
            </span>

            {CHIPS.map((c, i) => (
              <Chip key={c.id} c={c} i={i} hovered={hovered} setHovered={setHovered} visited={visited} go={go} reduce={reduce} />
            ))}

            {/* lucbot daemon */}
            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -translate-x-1/2 border px-4 py-2 text-center"
              style={{ left: "57.5%", top: "87%", borderColor: RED_HI, backgroundColor: "rgba(26,7,5,0.95)", boxShadow: "0 0 24px rgba(221,35,22,0.3)" }}
            >
              <span className="font-mono text-[11px] tracking-[0.16em]" style={{ color: RED_HI }}>LUCBOT<span className="term-pulse ml-1.5">●</span></span>
              <span className="block font-mono text-[9px]" style={{ color: DIM }}>daemon · answers from every module</span>
            </motion.div>

            {NOTES.map((n, i) => (
              <p key={i} className="absolute whitespace-pre font-mono text-[10px] leading-relaxed" style={{ left: `${n.x}%`, top: `${n.y}%`, color: FAINT }}>
                {n.text}
              </p>
            ))}

            {/* notes readout */}
            <div className="absolute border px-4 py-3" style={{ left: "4%", top: "30%", width: "19%", borderColor: "rgba(236,232,227,0.14)", backgroundColor: "rgba(6,6,6,0.9)" }}>
              <p className="mb-1.5 font-mono text-[9px] tracking-[0.2em]" style={{ color: RED }}>NOTES</p>
              <p className="font-mono text-[11px] leading-relaxed" style={{ color: active ? BODY : FAINT }}>
                {active ? active.note : "hover a module to read its annotation. green pins = visited."}
              </p>
            </div>

            {/* title block */}
            <div className="absolute bottom-0 right-0 border-l border-t font-mono text-[9px]" style={{ borderColor: "rgba(221,35,22,0.35)", backgroundColor: "rgba(6,6,6,0.95)" }}>
              <div className="grid grid-cols-[auto_auto] gap-x-5 gap-y-1 px-4 py-2.5" style={{ color: DIM }}>
                <span style={{ color: RED }}>NIPUN.OS — SITE BLUEPRINT</span><span>SHEET 1/1</span>
                <span>DRAWN: NIPUN</span><span>CHECKED: LUCBOT</span>
                <span>REV 2.0 · 2026.07</span><span>SCALE 1:1</span>
              </div>
            </div>
          </div>

          {/* mobile legend */}
          <div className="space-y-2.5 pb-10 lg:hidden">
            {CHIPS.map((c) => (
              <button
                key={c.id}
                onClick={() => go(c.route)}
                className="flex w-full cursor-pointer items-baseline gap-3 border px-4 py-3 text-left"
                style={{ borderColor: LINE, backgroundColor: "rgba(8,8,8,0.9)" }}
              >
                <span className="font-mono text-[11px] tracking-[0.14em]" style={{ color: RED }}>{c.label}</span>
                <span className="min-w-0 flex-1 truncate font-mono text-[10px]" style={{ color: DIM }}>{c.note}</span>
                {visited.has(c.route) && <span className="font-mono text-[10px]" style={{ color: "#6f9e80" }}>✓</span>}
              </button>
            ))}
            <div className="border px-4 py-2.5 font-mono text-[9px]" style={{ borderColor: "rgba(221,35,22,0.35)", color: DIM }}>
              <span style={{ color: RED }}>NIPUN.OS — SITE BLUEPRINT</span> · SHEET 1/1 · DRAWN: NIPUN · CHECKED: LUCBOT
            </div>
          </div>
        </div>
      </div>
    </TerminalShell>
  );
}
