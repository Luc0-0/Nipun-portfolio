import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const RED = "#dd2316";
const RED_HI = "#ff3324";
const TEXT = "#ece8e3";
const BODY = "#b9b3ac";
const DIM = "#6b655f";
const GREEN = "#6f9e80";
const EASE = [0.23, 1, 0.32, 1];

const START = Date.UTC(2022, 7, 1);

function useUptime() {
  const [ms, setMs] = useState(() => Date.now() - START);
  useEffect(() => {
    const id = setInterval(() => setMs(Date.now() - START), 1000);
    return () => clearInterval(id);
  }, []);
  const d = Math.floor(ms / 86400000);
  const h = Math.floor(ms / 3600000) % 24;
  const m = Math.floor(ms / 60000) % 60;
  return `${d}d ${h}h ${m}m`;
}

function Telemetry() {
  const uptime = useUptime();
  const cells = [
    { k: "SYSTEM UPTIME", v: uptime, s: "since first commit" },
    { k: "LOAD AVG", v: "0.74  0.60  0.48", s: "1m · 5m · 15m" },
    { k: "FOCUS", v: "deep work", s: "mode: enabled" },
    { k: "MEMORY", v: "6.2G / 16G", s: "brain allocation" },
    { k: "STACK", v: "Python · AI/ML · MERN", s: "primary cores" },
    { k: "LOCATION", v: "Kerala, IN", s: "IST +5:30" },
  ];
  return (
    <div
      className="sticky top-0 z-40 grid grid-cols-2 gap-x-6 gap-y-3 border-b px-5 py-3 sm:grid-cols-3 sm:px-10 lg:grid-cols-6"
      style={{ backgroundColor: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)", borderColor: "rgba(221,35,22,0.22)" }}
    >
      {cells.map((c) => (
        <div key={c.k}>
          <p className="text-[9px] tracking-[0.18em]" style={{ color: RED }}>{c.k}</p>
          <p className="truncate text-sm tabular-nums" style={{ color: TEXT }}>{c.v}</p>
          <p className="truncate text-[10px]" style={{ color: DIM }}>{c.s}</p>
        </div>
      ))}
    </div>
  );
}

const PROC = [
  { pid: "1101", name: "Uni-Verse Platform", tag: "product", run: true, cpu: 31 },
  { pid: "1102", name: "impress.ai — AI Workflow Automation", tag: "work", run: true, cpu: 22 },
  { pid: "1103", name: "Full-Stack Learning", tag: "dev", run: true, cpu: 16 },
  { pid: "1104", name: "Portfolio OS (nipun.os)", tag: "system", run: true, cpu: 9 },
  { pid: "1105", name: "Content & LinkedIn", tag: "growth", run: false, cpu: 4 },
  { pid: "1106", name: "DSA & Algorithms", tag: "core", run: false, cpu: 3 },
  { pid: "1107", name: "Reading & Research", tag: "knowledge", run: false, cpu: 2 },
  { pid: "1108", name: "Health & Fitness", tag: "lifestyle", run: false, cpu: 2 },
  { pid: "1109", name: "Chess & Strategy", tag: "mental", run: false, cpu: 1 },
  { pid: "1110", name: "Future Systems (ideas)", tag: "vault", run: false, cpu: 1 },
];

function Processes() {
  const reduce = useReducedMotion();
  return (
    <div>
      <h2 className="mb-4 text-xs tracking-[0.18em]" style={{ color: RED }}>
        RUNNING PROCESSES <span style={{ color: DIM }}>( what i'm working on )</span>
      </h2>
      <div className="grid grid-cols-[3rem_1fr_5.5rem_5rem_3rem] gap-x-3 border-b pb-1.5 text-[10px] tracking-wide sm:grid-cols-[3.5rem_1fr_6rem_6rem_8rem]" style={{ borderColor: "rgba(236,232,227,0.12)", color: DIM }}>
        <span>PID</span>
        <span>PROCESS</span>
        <span className="hidden sm:block">TAG</span>
        <span>STATE</span>
        <span className="text-right sm:text-left">CPU</span>
      </div>
      {PROC.map((p, i) => (
        <motion.div
          key={p.pid}
          initial={reduce ? false : { opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: EASE, delay: i * 0.03 }}
          className="grid grid-cols-[3rem_1fr_5.5rem_5rem_3rem] items-center gap-x-3 border-b py-2 text-xs sm:grid-cols-[3.5rem_1fr_6rem_6rem_8rem]"
          style={{ borderColor: "rgba(236,232,227,0.05)", color: p.run ? TEXT : DIM }}
        >
          <span className="tabular-nums" style={{ color: RED }}>{p.pid}</span>
          <span className="truncate">{p.name}</span>
          <span className="hidden text-[11px] sm:block" style={{ color: DIM }}>[ {p.tag} ]</span>
          <span className="flex items-center gap-1.5 text-[11px]">
            <span style={{ color: p.run ? RED_HI : "#3a3631" }}>●</span>
            {p.run ? "running" : "sleep"}
          </span>
          <span className="flex items-center gap-2">
            <span className="tabular-nums">{p.cpu}</span>
            <span className="hidden h-1 flex-1 overflow-hidden rounded-sm sm:block" style={{ background: "rgba(236,232,227,0.08)" }}>
              <motion.span
                className="block h-full"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: p.cpu / 35 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.03 }}
                style={{ transformOrigin: "left", background: RED }}
              />
            </span>
          </span>
        </motion.div>
      ))}
    </div>
  );
}

const SKILLS = [
  { n: "Python", v: 85 },
  { n: "JavaScript", v: 80 },
  { n: "React", v: 78 },
  { n: "Node / Express", v: 72 },
  { n: "MongoDB / SQL", v: 68 },
  { n: "AI / ML", v: 88 },
  { n: "System Design", v: 60 },
  { n: "UI / UX sense", v: 82 },
  { n: "Problem Solving", v: 90 },
  { n: "Adaptability", v: 82 },
];

function Skills() {
  const reduce = useReducedMotion();
  return (
    <div>
      <h2 className="mb-4 text-xs tracking-[0.18em]" style={{ color: RED }}>
        SKILLS v2.0 <span style={{ color: DIM }}>( self-rated )</span>
      </h2>
      <div className="space-y-2.5">
        {SKILLS.map((s, i) => (
          <div key={s.n} className="flex items-center gap-3">
            <span className="w-32 shrink-0 text-xs" style={{ color: BODY }}>{s.n}</span>
            <span className="h-2.5 flex-1 overflow-hidden rounded-sm" style={{ background: "rgba(236,232,227,0.07)" }}>
              <motion.span
                className="block h-full"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: s.v / 100 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.05 }}
                style={{ transformOrigin: "left", background: "repeating-linear-gradient(90deg, #dd2316 0 6px, rgba(221,35,22,0.25) 6px 8px)" }}
              />
            </span>
            <span className="w-8 text-right text-[11px] tabular-nums" style={{ color: DIM }}>{s.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const LOG = [
  { t: "boot", m: "nipun.os online · focus mode enabled" },
  { t: "proc", m: "uni-verse: priority raised to high" },
  { t: "sync", m: "impress.ai internship: tasks synced" },
  { t: "note", m: "rule: ship > iterate > impact" },
];

function SystemLog() {
  const reduce = useReducedMotion();
  return (
    <div className="rounded-md border p-4" style={{ borderColor: "rgba(236,232,227,0.12)", backgroundColor: "rgba(8,8,8,0.5)" }}>
      <h2 className="mb-3 text-xs tracking-[0.18em]" style={{ color: RED }}>SYSTEM LOG</h2>
      <div className="space-y-1.5 text-xs">
        {LOG.map((l, i) => (
          <motion.p
            key={i}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            style={{ color: BODY }}
          >
            <span style={{ color: DIM }}>[{l.t}]</span> {l.m}
          </motion.p>
        ))}
        <p className="text-xs" style={{ color: DIM }}>
          <span style={{ color: GREEN }}>›</span> awaiting next commit<span className="term-caret" style={{ color: RED }}>_</span>
        </p>
      </div>
    </div>
  );
}

function Identity() {
  return (
    <div className="rounded-md border p-4" style={{ borderColor: "rgba(221,35,22,0.28)", backgroundColor: "rgba(8,8,8,0.5)" }}>
      <h2 className="mb-3 text-xs tracking-[0.18em]" style={{ color: RED }}>IDENTITY.SYS</h2>
      <p className="text-lg" style={{ color: TEXT, fontFamily: "'Jersey 25', monospace", letterSpacing: "0.04em" }}>NIPUN</p>
      <p className="mb-2 text-xs" style={{ color: BODY }}>AI Engineer · Builder</p>
      <p className="text-[11px] leading-relaxed" style={{ color: DIM }}>Problem solver. Learner. Turns ideas into things that ship.</p>
      <p className="mt-3 text-[11px]" style={{ color: DIM }}>current.version: <span style={{ color: RED }}>becoming</span></p>
    </div>
  );
}

export default function AboutSystem() {
  return (
    <>
      <Telemetry />
      <div className="mx-auto w-full max-w-[1480px] px-5 py-12 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <div className="space-y-10">
            <Processes />
            <SystemLog />
          </div>
          <div className="space-y-8">
            <Skills />
            <Identity />
          </div>
        </div>
      </div>
    </>
  );
}
