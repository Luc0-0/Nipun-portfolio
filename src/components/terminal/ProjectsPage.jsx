import React, { useEffect, useRef } from "react";
import TerminalShell from "./TerminalShell";
import { blip, hoverTick, confirm } from "./sound";
import { useNavigate } from "react-router-dom";

const RED = "#dd2316";
const TEXT = "#ece8e3";
const SECOND = "#8a857f";

let dragged = false; // suppresses card-click right after a drag
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Tag → border treatment + accent (kept in the red→gray family for palette unity).
const TAGS = {
  CURRENT: { label: "CURRENT", color: "#6f9e80", border: "1px solid rgba(111,158,128,0.6)" },
  PRODUCTION: { label: "PRODUCTION", color: "#dd2316", border: "1px solid rgba(221,35,22,0.85)" },
  BUILT: { label: "BUILT", color: "#c2554a", border: "1px dashed rgba(221,35,22,0.45)" },
  EXPERIMENT: { label: "EXPERIMENT", color: "#8a857f", border: "1px dotted rgba(140,133,127,0.4)" },
};

// Real projects, classified (sourced from github.com/Luc0-0).
const PROJECTS = [
  { title: "Uni-Verse", tag: "CURRENT", year: "2026", stack: "Next.js · Supabase", desc: "An honest, on-the-record platform for college life. Verified student voices, kept public.", tags: ["Next.js", "Supabase", "Realtime"], img: "/images/uni-verse.png" },
  { title: "Serenity", tag: "PRODUCTION", year: "2025", stack: "Python · React · Docker", desc: "Multi-modal mental-health system. Local LLM via Ollama, real-time mood analysis, guided sessions.", tags: ["LLM/Ollama", "React", "Docker", "FastAPI"], img: "/images/Serenity.png" },
  { title: "Pragati", tag: "PRODUCTION", year: "2026", stack: "ADK · AlloyDB · Gemini", desc: "Self-assembling health intelligence: MCP tools generated at runtime from a live database schema.", tags: ["MCP", "Gemini", "AlloyDB", "Agents"], img: "/images/Pragati.png" },
  { title: "Guardia", tag: "PRODUCTION", year: "2026", stack: "YOLOv8-pose · Python · Android", desc: "Real-time fall detection for elderly & solo-living safety. Pose estimation + multi-signal heuristics, auto SMS/WhatsApp alerts, 91% accuracy.", tags: ["YOLOv8", "Pose", "CV", "Android"], img: "/images/Guardia.png" },
  { title: "Samarth", tag: "PRODUCTION", year: "2025", stack: "Python · FastAPI", desc: "NL Q&A over Indian agriculture data; live data.gov.in API + retrieval. Production deploy.", tags: ["NLP", "RAG", "FastAPI"], img: "/images/Samarth.png" },
  { title: "GodProfile", tag: "BUILT", year: "2026", stack: "Python · MCP", desc: "MCP server with 16 tools that turns markdown into animated, glassmorphic GitHub profiles.", tags: ["MCP", "Python", "Automation"], img: "/images/godprofile.png" },
  { title: "Smart Notes", tag: "BUILT", year: "2026", stack: "TypeScript", desc: "AI-assisted note app focused on fast recall and clean editing.", tags: ["TypeScript", "AI", "Notes"], img: "/images/Smartnotes.png" },
  { title: "StudyPath", tag: "BUILT", year: "2025", stack: "JavaScript", desc: "Generates milestone-based learning paths, visualized as an interactive graph.", tags: ["React", "Graph", "Full-stack"], img: "/images/Studypath.png" },
  { title: "Task Manager Pro", tag: "BUILT", year: "2025", stack: "MERN", desc: "Full-stack MERN app: JWT auth, real-time updates, normalized data model.", tags: ["React", "Node", "MongoDB", "JWT"], img: "/images/Taskmanager.png" },
  { title: "XLNet Emotion", tag: "BUILT", year: "2026", stack: "PyTorch", desc: "Fine-tuned XLNet for multi-class emotion classification; structured preprocessing + eval, 87% acc.", tags: ["NLP", "XLNet", "PyTorch"], img: "/images/xlnet.png" },
  { title: "Fake News Classifier", tag: "BUILT", year: "2026", stack: "scikit-learn", desc: "Classical NLP baseline: BoW features, LogReg vs Linear SVM with standard metrics.", tags: ["NLP", "SVM", "TF-IDF"], img: "/images/Fakenews.png" },
  { title: "BLIP Captioning", tag: "EXPERIMENT", year: "2025", stack: "Python", desc: "BLIP image captioning that parses a URL and captions every image on the page.", tags: ["CV", "BLIP", "Transformers"] },
  { title: "AI Audio Analyzer", tag: "EXPERIMENT", year: "2025", stack: "Python", desc: "Audio processing and ML-based analysis pipeline.", tags: ["Audio", "ML", "DSP"] },
  { title: "IBM GPT Voice", tag: "EXPERIMENT", year: "2025", stack: "JS · Watson", desc: "Voice assistant: IBM Watson STT/TTS integrated with a GPT layer.", tags: ["Speech", "Watson", "GPT"] },
  { title: "BertQA Bot", tag: "EXPERIMENT", year: "2026", stack: "Python", desc: "BERT-based extractive question answering.", tags: ["NLP", "BERT", "QA"] },
  { title: "Azure Image Analysis", tag: "EXPERIMENT", year: "2025", stack: "Python · Azure", desc: "Image analysis via Azure Cognitive Services.", tags: ["CV", "Azure"] },
  { title: "smarttimer", tag: "EXPERIMENT", year: "2025", stack: "Python · PyPI", desc: "Zero-dependency timing utilities: context managers, decorators, memory profiling.", tags: ["Python", "DX", "Library"] },
  { title: "NeuroFlow", tag: "EXPERIMENT", year: "2025", stack: "Python", desc: "Visualizes simple Python functions (early WIP).", tags: ["Viz", "Python"] },
  { title: "Cat/Dog CNN", tag: "EXPERIMENT", year: "2025", stack: "Python", desc: "Convolutional image classifier (cat vs dog).", tags: ["CV", "CNN"] },
];

function ProjectCard({ p }) {
  const t = TAGS[p.tag] || TAGS.EXPERIMENT;
  const navigate = useNavigate();
  return (
    <div
      className={`group relative flex h-[66vh] w-[clamp(232px,22vw,300px)] shrink-0 cursor-pointer select-none flex-col overflow-hidden rounded-md p-4 transition-[transform,filter] duration-300 ease-out hover:-translate-y-2 hover:brightness-125 ${p.tag === "CURRENT" ? "mborder mborder-green" : p.tag === "PRODUCTION" ? "mborder mborder-red" : ""}`}
      style={{ border: t.border, backgroundColor: "rgba(8,8,8,0.85)" }}
      data-slug={slugify(p.title)}
      onMouseEnter={hoverTick}
      onClick={() => {
        if (dragged) return;
        confirm();
        navigate(`/work/${slugify(p.title)}`);
      }}
    >
      {/* header: tag + year */}
      <div className="flex items-center justify-between text-[10px]">
        <span className="tracking-widest" style={{ color: t.color, opacity: 0.9 }}>
          {p.tag === "CURRENT" && "● "}
          {t.label}
        </span>
        <span style={{ color: SECOND }}>{p.year}</span>
      </div>

      {/* thumbnail: custom image if present, else font/glitch letter */}
      {p.img ? (
        <div className="relative my-3 flex-1 overflow-hidden rounded-sm">
          <img src={p.img} alt={p.title} draggable="false" loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
        </div>
      ) : (
        <div
          className="relative my-3 flex flex-1 items-center justify-center overflow-hidden rounded-sm p-4"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            backgroundImage: "repeating-linear-gradient(90deg, rgba(221,35,22,0.10) 0 1px, transparent 1px 7px), repeating-linear-gradient(0deg, rgba(221,35,22,0.06) 0 1px, transparent 1px 7px)",
          }}
        >
          <span
            className="text-center"
            style={{ fontFamily: '"Jersey 25", monospace', fontSize: "clamp(1.7rem, 4.5vw, 2.6rem)", color: "rgba(221,35,22,0.72)", lineHeight: 1.05, textShadow: "2px 2px 0 rgba(0,0,0,0.55)" }}
          >
            {p.title}
          </span>
        </div>
      )}

      {/* meta */}
      <div className="shrink-0">
        <p className="text-[10px] tracking-widest" style={{ color: SECOND }}>{p.stack}</p>
        <h3 className="mt-1 text-lg" style={{ color: TEXT }}>{p.title}</h3>

        <p
          className="mt-2 max-h-0 overflow-hidden text-[12px] leading-relaxed opacity-0 transition-all duration-300 group-hover:max-h-32 group-hover:opacity-100"
          style={{ color: SECOND }}
        >
          {p.desc}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded border px-1.5 py-0.5 text-[9px]" style={{ borderColor: "rgba(221,35,22,0.3)", color: "#b8b3ac" }}>
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-3 text-[11px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ color: t.color }}>
          ↵ open
        </p>
      </div>
    </div>
  );
}

function ProjectsStrip() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const drag = useRef({ active: false, x: 0, left: 0 });
  const dirRef = useRef(0);
  const items = [...PROJECTS, ...PROJECTS, ...PROJECTS];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const unis = el.querySelectorAll('[data-slug="uni-verse"]');
    const u = unis[1] || unis[0];
    if (u) el.scrollLeft = u.offsetLeft - (el.clientWidth / 2 - u.offsetWidth / 2);
    else el.scrollLeft = el.scrollWidth / 3;
  }, []);

  useEffect(() => {
    let raf;
    const loop = () => {
      const el = ref.current;
      if (el && dirRef.current) el.scrollLeft += dirRef.current * 9;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const openCenter = () => {
    const el = ref.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = null;
    let bd = Infinity;
    el.querySelectorAll("[data-slug]").forEach((c) => {
      const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - center);
      if (d < bd) { bd = d; best = c; }
    });
    if (best) { confirm(); navigate(`/work/${best.dataset.slug}`); }
  };

  useEffect(() => {
    const onKey = (e) => {
      const a = document.activeElement;
      if (a && (a.tagName === "INPUT" || a.tagName === "TEXTAREA")) return;
      const el = ref.current;
      if (!el) return;
      if (e.key === "ArrowRight") { e.preventDefault(); el.scrollBy({ left: 320, behavior: "smooth" }); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); el.scrollBy({ left: -320, behavior: "smooth" }); }
      else if (e.key === "Enter") { e.preventDefault(); openCenter(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onEdge = (e) => {
    if (drag.current.active) { dirRef.current = 0; return; }
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    dirRef.current = x < 0.1 ? -((0.1 - x) / 0.1) : x > 0.9 ? (x - 0.9) / 0.1 : 0;
  };

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const w = el.scrollWidth / 3;
    if (el.scrollLeft <= 0) el.scrollLeft += w;
    else if (el.scrollLeft >= w * 2) el.scrollLeft -= w;
  };
  const onWheel = (e) => {
    const el = ref.current;
    if (el && Math.abs(e.deltaY) > Math.abs(e.deltaX)) el.scrollLeft += e.deltaY;
  };
  const onPointerDown = (e) => {
    dragged = false;
    drag.current = { active: true, x: e.clientX, left: ref.current.scrollLeft };
  };
  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 5) dragged = true;
    ref.current.scrollLeft = drag.current.left - dx;
  };
  const onPointerUp = () => {
    drag.current.active = false;
  };

  return (
    <div
      ref={ref}
      onScroll={onScroll}
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onMouseMove={onEdge}
      onMouseLeave={() => { dirRef.current = 0; }}
      className="flex h-full cursor-grab items-center gap-5 overflow-x-auto px-4 active:cursor-grabbing sm:px-6 [&::-webkit-scrollbar]:hidden"
      style={{ scrollbarWidth: "none" }}
    >
      {items.map((p, i) => (
        <ProjectCard key={i} p={p} />
      ))}
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <TerminalShell path="~/projects" subtitle="things I've shipped, and the hard parts">
      <div className="flex items-center gap-3 px-4 pb-3 pt-2 text-[11px] sm:px-6" style={{ color: SECOND }}>
        <span style={{ color: TAGS.PRODUCTION.color }}>● production</span>
        <span style={{ color: TAGS.BUILT.color }}>● built</span>
        <span style={{ color: TAGS.EXPERIMENT.color }}>● experiment</span>
        <span className="ml-auto hidden sm:inline">drag · scroll · hover</span>
      </div>
      <div className="min-h-0 flex-1">
        <ProjectsStrip />
      </div>
    </TerminalShell>
  );
}
