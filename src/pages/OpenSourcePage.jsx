import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Package, BookOpen, ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import TerminalShell from "../components/terminal/TerminalShell";
import { hoverTick } from "../components/terminal/sound";

const RED = "#dd2316";
const RED_HI = "#ff3324";
const TEXT = "#ece8e3";
const BODY = "#b9b3ac";
const DIM = "#6b655f";
const FAINT = "#4f4a45";
const EASE = [0.23, 1, 0.32, 1];

const REPOS = [
  {
    I: Package,
    name: "GodProfile",
    kind: "mcp server",
    desc: "An MCP server packed with 16 tools that turn a plain markdown README into an animated, glassmorphic GitHub profile. Point an agent at it and let it design your profile for you.",
    tech: ["Python", "MCP", "GitHub API"],
    url: "https://github.com/Luc0-0/GodProfile",
  },
  {
    I: BookOpen,
    name: "learning-nlp-from-scratch",
    kind: "learning resource",
    desc: "NLP fundamentals implemented from the ground up: Bag of Words, TF-IDF, LSA, and topic modeling in clear, step-by-step Jupyter notebooks. Written for people learning, not for people showing off.",
    tech: ["Python", "Jupyter", "scikit-learn"],
    url: "https://github.com/Luc0-0/learning-nlp-from-scratch",
  },
];

function RepoCard({ r, i, reduce }) {
  return (
    <motion.a
      href={r.url}
      target="_blank"
      rel="noreferrer"
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
      onMouseEnter={hoverTick}
      className="group relative block overflow-hidden rounded-md border px-7 py-7 transition-all duration-200 hover:-translate-y-1 hover:border-[rgba(255,51,36,0.6)] hover:shadow-[0_0_30px_rgba(221,35,22,0.18)]"
      style={{ borderColor: "rgba(221,35,22,0.25)", backgroundColor: "rgba(10,8,8,0.55)", backdropFilter: "blur(2px)" }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: "repeating-linear-gradient(transparent 0 3px, rgba(0,0,0,0.14) 3px 4px)", opacity: 0.4 }} />
      <div className="relative">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border" style={{ borderColor: "rgba(221,35,22,0.5)", backgroundColor: "rgba(20,6,5,0.85)" }}>
            <r.I size={20} weight="fill" style={{ color: RED }} />
          </span>
          <span className="rounded-sm border px-2 py-1 font-mono text-[10px] tracking-[0.14em]" style={{ borderColor: "rgba(236,232,227,0.16)", color: DIM }}>
            [ {r.kind} ]
          </span>
        </div>
        <h2 className="mb-2 flex items-center gap-2 font-mono text-lg transition-colors duration-200 group-hover:text-white" style={{ color: TEXT }}>
          {r.name}
          <ArrowUpRight size={16} className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" style={{ color: RED_HI }} />
        </h2>
        <p className="mb-5 max-w-[52ch] text-[13px] leading-relaxed" style={{ color: BODY }}>{r.desc}</p>
        <div className="flex flex-wrap items-center gap-1.5">
          {r.tech.map((t) => (
            <span key={t} className="rounded-sm border px-1.5 py-0.5 font-mono text-[9px]" style={{ borderColor: "rgba(236,232,227,0.14)", color: DIM }}>{t}</span>
          ))}
          <span className="ml-auto font-mono text-[11px]" style={{ color: FAINT }}>github.com/Luc0-0</span>
        </div>
      </div>
    </motion.a>
  );
}

export default function OpenSourcePage() {
  const reduce = useReducedMotion();
  return (
    <TerminalShell path="~/opensource" subtitle="public code" quiet>
      <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto w-full max-w-[1000px] px-5 py-10 sm:px-10">
          <div className="mb-10">
            <h1 className="leading-none" style={{ fontFamily: "'Jersey 25', monospace", fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", color: RED, letterSpacing: "0.02em", textShadow: "0 0 26px rgba(221,35,22,0.35)" }}>
              OPEN SOURCE<span className="term-caret">_</span>
            </h1>
            <p className="mt-2 font-mono text-sm" style={{ color: DIM }}>&gt; gh repos --public · tools and resources built for others to use</p>
          </div>

          <div className="mb-10 grid gap-5 sm:grid-cols-2">
            {REPOS.map((r, i) => (
              <RepoCard key={r.name} r={r} i={i} reduce={reduce} />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-12 font-mono text-xs" style={{ color: DIM }}>
            <span>project source lives with each project → <a href="/work" className="border-b border-transparent transition-colors duration-200 hover:border-[rgba(221,35,22,0.6)] hover:text-[#ece8e3]" style={{ color: BODY }}>~/work</a></span>
            <a href="https://github.com/Luc0-0" target="_blank" rel="noreferrer" onMouseEnter={hoverTick} className="group inline-flex items-center gap-2">
              <GithubLogo size={14} style={{ color: RED }} />
              <span className="border-b border-transparent transition-colors duration-200 group-hover:border-[rgba(221,35,22,0.6)] group-hover:text-[#ece8e3]">everything else on github</span>
              <ArrowUpRight size={12} style={{ color: RED }} />
            </a>
          </div>
        </div>
      </div>
    </TerminalShell>
  );
}
