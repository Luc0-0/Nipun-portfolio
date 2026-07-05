import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Trophy, Article, Stack, Medal, SealCheck, CaretDown, ArrowUpRight } from "@phosphor-icons/react";
import TerminalShell from "../components/terminal/TerminalShell";
import { hoverTick, toggle } from "../components/terminal/sound";

const RED = "#dd2316";
const RED_HI = "#ff3324";
const TEXT = "#ece8e3";
const BODY = "#b9b3ac";
const DIM = "#6b655f";
const FAINT = "#4f4a45";
const EASE = [0.23, 1, 0.32, 1];

const STATS = [
  { k: "GPA", v: "8.24", s: "/ 10 · B.E. AI & DS" },
  { k: "SHIPPED", v: "15+", s: "projects, agents to CV" },
  { k: "RESEARCH", v: "1", s: "paper submitted · ICRAIA" },
];

const WINS = [
  { I: Trophy, year: "2026", tag: "cohort 1", title: "Google Gen AI Academy APAC", desc: "Selected for cohort 1 (Jan–Apr 2026). Built PRAGATI for the Academy hackathon: a self-assembling agentic system on Google ADK, MCP, AlloyDB and Vertex AI, deployed live on Cloud Run.", hot: true, img: "/images/achievements/genai-academy.png" },
  { I: Article, year: "2025", tag: "research", title: "Paper — ICRAIA 2025", desc: "Serenity, a multimodal mental-health assistant: four-tier memory, fine-tuned XLM-RoBERTa at 81.3% emotion accuracy, 95% safety recall on crisis detection. Submitted." },
  { I: Stack, year: "2022→", tag: "builder", title: "15+ Shipped Projects", desc: "AI agents, computer vision, NLP and RAG pipelines. From hackathon builds to production deploys with real users." },
  { I: Medal, year: "school", tag: "2nd place", title: "Maths Olympiad — Delhi Zonal", desc: "Early proof the pattern-matching engine boots fine under pressure." },
];

const A = "/images/achievements/";
const IBM_COURSES = [
  { n: "Introduction to Artificial Intelligence", img: A + "intro-ai.png" },
  { n: "Python for Data Science, AI & Development", img: A + "python-ds.png" },
  { n: "Generative AI Prompt Engineering", img: A + "prompt-eng.png" },
  { n: "Developing AI Applications with Python and Flask", img: A + "flask-apps.png" },
  { n: "Building Generative AI Powered Applications", img: A + "genai-apps.png" },
  { n: "Introduction to Software Engineering", img: A + "intro-se.png" },
  { n: "Introduction to HTML, CSS, and JavaScript", img: A + "html-css-js.png" },
];

const CERTS = [
  { title: "IBM AI Developer Professional Certificate", issuer: "IBM · Coursera", year: "2025", courses: IBM_COURSES, img: A + "ibm-ai-dev.png" },
  { title: "Microsoft Azure AI Fundamentals", issuer: "Microsoft", year: "2025" },
  { title: "Python for Data Science, AI & Development", issuer: "IBM", year: "2025", img: A + "python-ds.png" },
  { title: "Generative AI Prompt Engineering", issuer: "IBM", year: "2025", img: A + "prompt-eng.png" },
];

function useImgOk(src) {
  const [ok, setOk] = useState(true);
  return [ok && !!src, () => setOk(false)];
}

function Corners() {
  const c = { position: "absolute", width: 10, height: 10, borderColor: RED_HI, opacity: 0 };
  return (
    <>
      <span aria-hidden="true" className="transition-opacity duration-200 group-hover:opacity-70" style={{ ...c, top: 6, left: 6, borderTop: "1.5px solid", borderLeft: "1.5px solid" }} />
      <span aria-hidden="true" className="transition-opacity duration-200 group-hover:opacity-70" style={{ ...c, top: 6, right: 6, borderTop: "1.5px solid", borderRight: "1.5px solid" }} />
      <span aria-hidden="true" className="transition-opacity duration-200 group-hover:opacity-70" style={{ ...c, bottom: 6, left: 6, borderBottom: "1.5px solid", borderLeft: "1.5px solid" }} />
      <span aria-hidden="true" className="transition-opacity duration-200 group-hover:opacity-70" style={{ ...c, bottom: 6, right: 6, borderBottom: "1.5px solid", borderRight: "1.5px solid" }} />
    </>
  );
}

function WinCard({ w, i, reduce }) {
  const [imgOk, imgFail] = useImgOk(w.img);
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: EASE, delay: i * 0.07 }}
      onMouseEnter={hoverTick}
      className="group relative flex flex-col overflow-hidden rounded-md border transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(221,35,22,0.2)]"
      style={{ borderColor: w.hot ? "rgba(255,51,36,0.55)" : "rgba(221,35,22,0.22)", backgroundColor: "rgba(10,8,8,0.55)", backdropFilter: "blur(2px)" }}
    >
      <span aria-hidden="true" className="pointer-events-none absolute -right-3 top-2 select-none leading-none" style={{ fontFamily: "'Jersey 25', monospace", fontSize: "5rem", color: "rgba(221,35,22,0.07)" }}>
        {w.year}
      </span>
      <div className="pointer-events-none absolute inset-0" style={{ background: "repeating-linear-gradient(transparent 0 3px, rgba(0,0,0,0.14) 3px 4px)", opacity: 0.4 }} />
      <Corners />
      <div className="relative flex-1 px-6 py-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border" style={{ borderColor: w.hot ? RED_HI : "rgba(221,35,22,0.5)", backgroundColor: "rgba(20,6,5,0.85)", boxShadow: w.hot ? "0 0 20px rgba(221,35,22,0.45)" : "none" }}>
            <w.I size={20} weight="fill" style={{ color: w.hot ? RED_HI : RED }} />
          </span>
          <span className="rounded-sm border px-2 py-1 font-mono text-[10px] tracking-[0.14em]" style={{ borderColor: w.hot ? "rgba(255,51,36,0.6)" : "rgba(236,232,227,0.16)", color: w.hot ? RED_HI : DIM }}>
            [ {w.tag} · {w.year} ]
          </span>
        </div>
        <h3 className="mb-2 text-base font-medium leading-snug transition-colors duration-200 group-hover:text-white" style={{ color: TEXT }}>{w.title}</h3>
        <p className="text-[13px] leading-relaxed" style={{ color: BODY }}>{w.desc}</p>
        {imgOk && (
          <>
            <button
              onClick={() => {
                toggle();
                setOpen((o) => !o);
              }}
              onMouseEnter={hoverTick}
              className="mt-3 flex cursor-pointer items-center gap-1.5 font-mono text-[10px] tracking-wide transition-colors duration-200 hover:text-[#ece8e3]"
              style={{ color: FAINT }}
            >
              {open ? "hide certificate" : "view certificate"}
              <CaretDown size={12} style={{ color: RED, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.25s" }} />
            </button>
            <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
              <div className="min-h-0 overflow-hidden">
                <img src={w.img} alt={`${w.title} certificate`} loading="lazy" onError={imgFail} className="mt-3 max-h-72 rounded-sm border object-contain" style={{ borderColor: "rgba(221,35,22,0.25)" }} />
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

function CertRow({ c, i, reduce }) {
  const [open, setOpen] = useState(false);
  const [imgOk, imgFail] = useImgOk(c.img);
  const expandable = !!c.courses || imgOk;
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
      className="overflow-hidden rounded-sm border transition-colors duration-200 hover:border-[rgba(221,35,22,0.55)]"
      style={{ borderColor: "rgba(236,232,227,0.12)", backgroundColor: "rgba(8,8,8,0.5)" }}
    >
      <button
        onClick={() => {
          if (expandable) {
            toggle();
            setOpen((o) => !o);
          }
        }}
        onMouseEnter={hoverTick}
        className={`flex w-full items-center gap-4 px-5 py-4 text-left ${expandable ? "cursor-pointer" : "cursor-default"}`}
      >
        <SealCheck size={18} weight="fill" style={{ color: RED }} className="shrink-0" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm" style={{ color: TEXT }}>{c.title}</span>
          <span className="mt-0.5 block font-mono text-[11px]" style={{ color: DIM }}>{c.issuer} · {c.year}</span>
        </span>
        {expandable && (
          <span className="flex shrink-0 items-center gap-2 font-mono text-[10px]" style={{ color: FAINT }}>
            {c.courses ? `${c.courses.length} courses` : "view"}
            <CaretDown size={13} style={{ color: RED, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.25s" }} />
          </span>
        )}
      </button>
      {expandable && (
        <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
          <div className="min-h-0 overflow-hidden">
            <div className="border-t px-5 py-4" style={{ borderColor: "rgba(236,232,227,0.08)" }}>
              {imgOk && (
                <img src={c.img} alt={`${c.title} certificate`} loading="lazy" onError={imgFail} className="mb-4 max-h-64 rounded-sm border object-contain" style={{ borderColor: "rgba(221,35,22,0.25)" }} />
              )}
              {c.courses && (
                <ul className="space-y-2">
                  {c.courses.map((co) => (
                    <li key={co.n} className="flex items-center gap-2.5 font-mono text-[12px]" style={{ color: BODY }}>
                      <span style={{ color: RED }}>›</span>
                      <span className="min-w-0 flex-1 truncate">{co.n}</span>
                      {co.img && (
                        <a href={co.img} target="_blank" rel="noreferrer" onMouseEnter={hoverTick} className="shrink-0 border-b border-transparent text-[10px] transition-colors duration-200 hover:border-[rgba(221,35,22,0.6)] hover:text-[#ece8e3]" style={{ color: FAINT }}>
                          view cert
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function AchievementsPage() {
  const reduce = useReducedMotion();
  return (
    <TerminalShell path="~/achievements" subtitle="certs and wins" quiet>
      <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-10 sm:px-10">
          <div className="mb-10">
            <h1 className="leading-none" style={{ fontFamily: "'Jersey 25', monospace", fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", color: RED, letterSpacing: "0.02em", textShadow: "0 0 26px rgba(221,35,22,0.35)" }}>
              UNLOCKED<span className="term-caret">_</span>
            </h1>
            <p className="mt-2 font-mono text-sm" style={{ color: DIM }}>&gt; ~/achievements · all real, all verifiable</p>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="mb-14 grid gap-px overflow-hidden rounded-md border sm:grid-cols-3"
            style={{ borderColor: "rgba(221,35,22,0.25)", backgroundColor: "rgba(221,35,22,0.12)" }}
          >
            {STATS.map((s) => (
              <div key={s.k} className="px-6 py-5" style={{ backgroundColor: "rgba(6,6,6,0.92)" }}>
                <p className="mb-1 font-mono text-[9px] tracking-[0.2em]" style={{ color: RED }}>{s.k}</p>
                <p className="leading-none" style={{ fontFamily: "'Jersey 25', monospace", fontSize: "2.2rem", color: TEXT }}>{s.v}</p>
                <p className="mt-1 font-mono text-[11px]" style={{ color: DIM }}>{s.s}</p>
              </div>
            ))}
          </motion.div>

          <p className="mb-5 font-mono text-[11px] tracking-[0.2em]" style={{ color: RED }}>WINS</p>
          <div className="mb-14 grid gap-5 sm:grid-cols-2">
            {WINS.map((w, i) => (
              <WinCard key={w.title} w={w} i={i} reduce={reduce} />
            ))}
          </div>

          <p className="mb-5 font-mono text-[11px] tracking-[0.2em]" style={{ color: RED }}>CERTIFICATIONS</p>
          <div className="mb-10 space-y-3">
            {CERTS.map((c, i) => (
              <CertRow key={c.title} c={c} i={i} reduce={reduce} />
            ))}
          </div>

          <a
            href="https://www.linkedin.com/in/nipun-sujesh"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={hoverTick}
            className="group inline-flex items-center gap-2 pb-10 font-mono text-xs transition-colors duration-200"
            style={{ color: DIM }}
          >
            <span className="border-b border-transparent transition-colors duration-200 group-hover:border-[rgba(221,35,22,0.6)] group-hover:text-[#ece8e3]">verify on linkedin</span>
            <ArrowUpRight size={13} style={{ color: RED }} />
          </a>
        </div>
      </div>
    </TerminalShell>
  );
}
