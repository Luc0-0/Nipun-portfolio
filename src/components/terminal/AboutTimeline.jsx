import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Code, SealCheck, Brain, Briefcase, Flag } from "@phosphor-icons/react";
import { hoverTick } from "./sound";

const RED = "#dd2316";
const RED_HI = "#ff3324";
const TEXT = "#ece8e3";
const BODY = "#b9b3ac";
const DIM = "#6b655f";
const EASE = [0.23, 1, 0.32, 1];

const TYPES = {
  education: { I: GraduationCap, label: "EDUCATION" },
  skill: { I: Code, label: "SKILL" },
  certification: { I: SealCheck, label: "CERTIFICATION" },
  project: { I: Brain, label: "PROJECT" },
  experience: { I: Briefcase, label: "EXPERIENCE" },
  milestone: { I: Flag, label: "MILESTONE" },
};

const ENTRIES = [
  { year: "2021", type: "education", file: "10th-grade.edu", title: "10th Grade — Kendriya Vidyalaya, Delhi", desc: "Completed 10th standard with a strong foundation in mathematics and science. First exposure to logical thinking and problem-solving." },
  { year: "2022", type: "skill", file: "python.init", title: "Python Programming Begins", desc: "Started learning Python at Kendriya Vidyalaya. The first lines of code marked the beginning of the journey." },
  { year: "2022", type: "education", file: "12th-grade.edu", title: "12th Grade — Kendriya Vidyalaya, Kannur", desc: "Completed 12th standard, Science stream. Developed a real interest in computer science and technology." },
  { year: "2022", type: "education", file: "btech.enroll", title: "B.E. AI & Data Science", desc: "Enrolled at Kathir College of Engineering (Anna University). Four years combining computer science fundamentals with specialized AI coursework." },
  { year: "2024", type: "certification", file: "ibm-ai-dev.cert", title: "IBM AI Developer Certified", desc: "Completed the IBM AI Developer Professional Certificate: a 10-course specialization across software engineering, Python, AI concepts, and production deployment." },
  { year: "2025", type: "experience", file: "amypo.intern", title: "Full-Stack Developer Intern (MERN) — Amypo Technologies", desc: "Jun–Sep 2025. Built responsive web-app features end to end on the MERN stack in an Agile sprint team; designed REST APIs connecting React front ends to MongoDB." },
  { year: "2026", type: "certification", file: "genai-academy.cert", title: "Google Gen AI Academy APAC — Cohort 1", desc: "Jan–Apr 2026. Built PRAGATI for the Academy hackathon: a self-assembling agentic system on Google ADK, MCP, AlloyDB and Vertex AI, deployed live on Cloud Run." },
  { year: "2026", type: "project", file: "serenity.proj", title: "Serenity — Mental Health AI Capstone", desc: "Production multimodal mental-health assistant: four-tier memory, fine-tuned XLM-RoBERTa emotion classifier at 81.3% accuracy, 95% safety recall on crisis detection. Paper submitted to ICRAIA 2025." },
  { year: "2026", type: "experience", file: "impress-ai.intern", title: "AI Workflow Automation Engineer Intern — impress.ai", desc: "May 2026 → present. Company-wide LLM + RAG workflow automation, reusable AI skills for internal teams, and an embedding-based candidate recommendation system." },
  { year: "2026", type: "milestone", file: "graduation.exe", title: "Expected Graduation", desc: "Graduating with a B.E. in AI & Data Science. Current GPA 8.24/10. Ready to contribute to the AI industry.", current: true },
];

function Entry({ e, reduce }) {
  const { I, label } = TYPES[e.type];
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.5, ease: EASE }}
      onMouseEnter={hoverTick}
      className="relative flex items-start gap-0 pb-8"
    >
      <div className="relative z-10 shrink-0">
        <div
          className="grid h-9 w-9 place-items-center rounded-md border"
          style={{
            borderColor: e.current ? RED_HI : "rgba(221,35,22,0.5)",
            backgroundColor: e.current ? "rgba(28,8,6,0.95)" : "rgba(8,8,8,0.95)",
            boxShadow: e.current ? "0 0 22px rgba(221,35,22,0.5)" : "0 0 12px rgba(221,35,22,0.18)",
          }}
        >
          <I size={17} weight="bold" style={{ color: e.current ? RED_HI : RED }} />
        </div>
      </div>

      <div className="mt-[18px] h-px w-5 shrink-0" style={{ background: "rgba(221,35,22,0.4)" }} />

      <div
        className="group relative flex-1 overflow-hidden rounded-md border p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(221,35,22,0.7)] hover:shadow-[0_0_26px_rgba(221,35,22,0.16)]"
        style={{ borderColor: e.current ? "rgba(255,51,36,0.6)" : "rgba(221,35,22,0.22)", backgroundColor: "rgba(10,8,8,0.55)", backdropFilter: "blur(2px)" }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 top-1 select-none leading-none"
          style={{ fontFamily: "'Jersey 25', monospace", fontSize: "5.5rem", color: "rgba(221,35,22,0.06)" }}
        >
          {e.year}
        </span>
        <div className="pointer-events-none absolute inset-0" style={{ background: "repeating-linear-gradient(transparent 0 3px, rgba(0,0,0,0.18) 3px 4px)", opacity: 0.4 }} />

        <div className="relative">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-2 font-mono text-[11px]" style={{ color: DIM }}>
              <span style={{ color: e.current ? RED_HI : RED }}>●</span>
              {e.file}
            </span>
            <span className="rounded-sm border px-1.5 py-0.5 font-mono text-[9px] tracking-[0.14em]" style={{ borderColor: "rgba(236,232,227,0.16)", color: DIM }}>{label}</span>
          </div>
          <div className="mb-1 flex items-center gap-3">
            <span className="font-mono text-sm tabular-nums" style={{ color: e.current ? RED_HI : RED }}>{e.year}</span>
            {e.current && <span className="font-mono text-[10px] tracking-[0.14em]" style={{ color: RED_HI }}>● now</span>}
          </div>
          <h3 className="text-[15px] font-medium transition-colors duration-200 group-hover:text-white" style={{ color: TEXT }}>{e.title}</h3>
          <p className="mt-1 max-w-[58ch] text-[13px] leading-relaxed" style={{ color: BODY }}>{e.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutTimeline() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const railH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="mx-auto w-full max-w-[1040px] px-5 py-16 sm:px-10">
      <div className="mb-12">
        <p className="font-mono text-sm" style={{ color: RED }}>&gt; ~/timeline<span className="term-caret">_</span></p>
        <p className="mt-1 font-mono text-sm" style={{ color: DIM }}>the path so far · 2021 → now</p>
      </div>

      <div ref={ref} className="relative">
        <div aria-hidden="true" className="absolute left-[17px] top-2 bottom-2 z-0 w-px" style={{ background: "rgba(221,35,22,0.14)" }} />
        <motion.div
          aria-hidden="true"
          className="absolute left-[17px] top-2 z-0 w-px"
          style={{ height: reduce ? "100%" : railH, background: "linear-gradient(rgba(221,35,22,0.85), rgba(221,35,22,0.25))" }}
        />
        {ENTRIES.map((e, i) => (
          <Entry key={i} e={e} reduce={reduce} />
        ))}
        <div className="relative z-10 flex items-center gap-5">
          <div className="grid h-9 w-9 shrink-0 place-items-center">
            <span className="h-2 w-2 rounded-full" style={{ background: RED, boxShadow: `0 0 10px ${RED}` }} />
          </div>
          <p className="font-mono text-xs" style={{ color: DIM }}>the next commit is unwritten<span className="term-caret" style={{ color: RED }}>_</span></p>
        </div>
      </div>
    </div>
  );
}
