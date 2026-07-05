import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import TerminalShell from "../components/terminal/TerminalShell";
import { hoverTick, confirm } from "../components/terminal/sound";
import { POSTS, readTime } from "../data/writing";

const RED = "#dd2316";
const RED_HI = "#ff3324";
const TEXT = "#ece8e3";
const BODY = "#b9b3ac";
const DIM = "#6b655f";
const FAINT = "#4f4a45";
const EASE = [0.23, 1, 0.32, 1];

const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "2-digit" });

function Tags({ tags }) {
  return (
    <span className="flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span key={t} className="rounded-sm border px-1.5 py-0.5 font-mono text-[9px]" style={{ borderColor: "rgba(236,232,227,0.14)", color: DIM }}>{t}</span>
      ))}
    </span>
  );
}

function Featured({ p, go, reduce }) {
  return (
    <motion.button
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE, delay: 0.05 }}
      onClick={() => go(p)}
      onMouseEnter={hoverTick}
      className="group relative mb-12 block w-full cursor-pointer overflow-hidden rounded-md border px-7 py-8 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_36px_rgba(221,35,22,0.2)] sm:px-10 sm:py-10"
      style={{ borderColor: "rgba(255,51,36,0.45)", backgroundColor: "rgba(12,8,8,0.6)", backdropFilter: "blur(2px)" }}
    >
      <span aria-hidden="true" className="pointer-events-none absolute -right-4 -top-6 select-none leading-none" style={{ fontFamily: "'Jersey 25', monospace", fontSize: "11rem", color: "rgba(221,35,22,0.07)" }}>
        {String(new Date(p.date).getFullYear()).slice(2)}'
      </span>
      <div className="pointer-events-none absolute inset-0" style={{ background: "repeating-linear-gradient(transparent 0 3px, rgba(0,0,0,0.15) 3px 4px)", opacity: 0.4 }} />
      <div className="relative">
        <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[11px]">
          <span className="rounded-sm border px-2 py-0.5 tracking-[0.14em]" style={{ borderColor: RED_HI, color: RED_HI }}>[ latest ]</span>
          <span className="tabular-nums" style={{ color: RED }}>{fmt(p.date)}</span>
          <span style={{ color: FAINT }}>·</span>
          <span style={{ color: DIM }}>{readTime(p)} min read</span>
        </div>
        <h2 className="mb-3 max-w-[24ch] text-2xl font-medium leading-tight transition-colors duration-200 group-hover:text-white sm:text-4xl" style={{ color: TEXT }}>
          {p.title}
        </h2>
        <p className="mb-5 max-w-[52ch] text-sm leading-relaxed sm:text-[15px]" style={{ color: BODY }}>{p.summary}</p>
        <div className="flex items-center justify-between">
          <Tags tags={p.tags} />
          <span className="inline-flex items-center gap-2 font-mono text-xs transition-all duration-200 group-hover:gap-3" style={{ color: RED_HI }}>
            read <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function Row({ p, i, go, reduce }) {
  return (
    <motion.button
      initial={reduce ? false : { opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
      onClick={() => go(p)}
      onMouseEnter={hoverTick}
      className="group flex w-full cursor-pointer items-baseline gap-5 border-b px-2 py-6 text-left transition-colors duration-200 hover:bg-[rgba(221,35,22,0.045)] sm:gap-8 sm:px-4"
      style={{ borderColor: "rgba(236,232,227,0.09)" }}
    >
      <span className="w-10 shrink-0 text-right leading-none transition-colors duration-200 group-hover:text-[#ff3324]" style={{ fontFamily: "'Jersey 25', monospace", fontSize: "2rem", color: "rgba(236,232,227,0.18)" }}>
        {String(i + 2).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-1">
        <span className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px]">
          <span className="tabular-nums" style={{ color: RED }}>{fmt(p.date)}</span>
          <span style={{ color: FAINT }}>·</span>
          <span style={{ color: DIM }}>{readTime(p)} min</span>
        </span>
        <span className="block text-base font-medium leading-snug transition-colors duration-200 group-hover:text-white sm:text-lg" style={{ color: TEXT }}>
          {p.title}
        </span>
        <span className="mt-1 block max-w-[58ch] text-[13px] leading-relaxed" style={{ color: BODY }}>{p.summary}</span>
      </span>
      <span className="hidden shrink-0 flex-col items-end gap-2 sm:flex">
        <Tags tags={p.tags} />
        <ArrowRight size={15} className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" style={{ color: RED_HI }} />
      </span>
    </motion.button>
  );
}

export default function WritingPage() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  const [latest, ...rest] = posts;

  const go = (p) => {
    confirm();
    navigate(`/writing/${p.slug}`);
  };

  return (
    <TerminalShell path="~/writing" subtitle="notes and posts" quiet>
      <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto w-full max-w-[1000px] px-5 py-10 sm:px-10">
          <div className="mb-10">
            <h1 className="leading-none" style={{ fontFamily: "'Jersey 25', monospace", fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", color: RED, letterSpacing: "0.02em", textShadow: "0 0 26px rgba(221,35,22,0.35)" }}>
              WRITING<span className="term-caret">_</span>
            </h1>
            <p className="mt-2 font-mono text-sm" style={{ color: DIM }}>&gt; ls ~/writing · {posts.length} posts · things i learned by building</p>
          </div>

          <Featured p={latest} go={go} reduce={reduce} />

          <p className="mb-2 px-2 font-mono text-[11px] tracking-[0.2em] sm:px-4" style={{ color: RED }}>ARCHIVE</p>
          <div className="border-t pb-12" style={{ borderColor: "rgba(236,232,227,0.09)" }}>
            {rest.map((p, i) => (
              <Row key={p.slug} p={p} i={i} go={go} reduce={reduce} />
            ))}
          </div>
        </div>
      </div>
    </TerminalShell>
  );
}
