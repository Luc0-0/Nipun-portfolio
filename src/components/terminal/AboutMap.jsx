import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { hoverTick, blip, confirm } from "./sound";

const RED = "#dd2316";
const RED_HI = "#ff3324";
const BODY = "#b9b3ac";
const DIM = "#6b655f";
const EASE = [0.23, 1, 0.32, 1];

const BRANCHES = [
  { id: "aiml", title: "AI / ML", x: 27, y: 21, items: ["LLMs & Agents", "RAG Pipelines", "Computer Vision", "NLP & Embeddings", "Model Fine-tuning"], leaves: ["LangChain", "PyTorch", "OpenAI", "ChromaDB"] },
  { id: "fullstack", title: "FULL-STACK", x: 73, y: 21, items: ["React / Next.js", "Node.js / Express", "MongoDB / Supabase", "Tailwind / Shadcn", "REST APIs"], leaves: ["TypeScript", "PostgreSQL", "Docker", "Vercel"] },
  { id: "projects", title: "PROJECTS", x: 15, y: 56, items: ["Uni-Verse", "Serenity", "Guardia", "Samarth", "and more..."], leaves: ["Production", "Open source", "Experiments", "Live"], link: "/work" },
  { id: "learning", title: "LEARNING", x: 85, y: 56, items: ["Deep Learning", "System Design", "ML Ops", "Algorithms", "Human Psychology"], leaves: ["Books", "Courses", "Papers", "Mentorship"] },
  { id: "beyond", title: "BEYOND CODE", x: 50, y: 88, items: ["Chess & Strategy", "Fitness & Health", "Stoicism", "Creativity", "Making Impact"], leaves: ["Focus", "Consistency", "Growth", "Purpose"] },
];

const partsOf = (bx, by) => {
  const mx = (50 + bx) / 2;
  const my = (50 + by) / 2;
  const dx = bx - 50;
  const dy = by - 50;
  const len = Math.hypot(dx, dy) || 1;
  const bow = 7;
  const cx = mx + (-dy / len) * bow;
  const cy = my + (dx / len) * bow;
  return { d: `M50 50 Q ${cx} ${cy} ${bx} ${by}`, cx, cy, bx, by };
};

const bez = (p, t) => {
  const u = 1 - t;
  return [u * u * 50 + 2 * u * t * p.cx + t * t * p.bx, u * u * 50 + 2 * u * t * p.cy + t * t * p.by];
};

function BranchPanel({ b, hovered, setHovered, onClick }) {
  const active = hovered === b.id;
  return (
    <div
      className={`w-[208px] rounded-md border p-3 transition-colors duration-200 ${b.link ? "cursor-pointer" : ""}`}
      style={{ borderColor: active ? RED_HI : "rgba(221,35,22,0.4)", backgroundColor: active ? "rgba(28,8,6,0.92)" : "rgba(8,8,8,0.85)", boxShadow: active ? "0 0 26px rgba(221,35,22,0.3)" : "none" }}
      onClick={onClick}
      onPointerEnter={() => {
        setHovered(b.id);
        hoverTick();
      }}
      onPointerLeave={() => setHovered(null)}
    >
      <p className="mb-2 text-xs tracking-[0.16em]" style={{ color: active ? RED_HI : RED }}>{b.title}</p>
      <ul className="mb-2.5 space-y-1">
        {b.items.map((it) => (
          <li key={it} className="flex items-center gap-1.5 text-[11px]" style={{ color: BODY }}>
            <span style={{ color: RED }}>›</span>
            {it}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1">
        {b.leaves.map((lf) => (
          <span key={lf} className="rounded-sm border px-1.5 py-0.5 text-[9px]" style={{ borderColor: "rgba(236,232,227,0.14)", color: DIM }}>{lf}</span>
        ))}
      </div>
      {b.link && <p className="mt-2 text-[10px]" style={{ color: DIM }}>open →</p>}
    </div>
  );
}

function Core() {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-1 text-[10px] tracking-[0.2em]" style={{ color: DIM }}>core.exe</p>
      <div className="rounded-md border px-7 py-4 text-center" style={{ borderColor: RED_HI, backgroundColor: "rgba(20,6,5,0.92)", boxShadow: "0 0 44px rgba(221,35,22,0.4)" }}>
        <p style={{ fontFamily: "'Jersey 25', monospace", fontSize: "clamp(2rem,3.4vw,3rem)", color: RED, letterSpacing: "0.04em", lineHeight: 1 }}>NIPUN</p>
        <p className="mt-1 text-[11px] tracking-[0.2em]" style={{ color: BODY }}>AI ENGINEER</p>
      </div>
    </div>
  );
}

export default function AboutMap() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  const hoveredRef = useRef(null);
  const mapRef = useRef(null);
  const nodeRefs = useRef(BRANCHES.map(() => null));
  const pathRefs = useRef(BRANCHES.map(() => null));
  const packRefs = useRef(BRANCHES.map(() => [null, null, null]));
  hoveredRef.current = hovered;

  useEffect(() => {
    let raf, last = 0;
    const loop = (ts) => {
      raf = requestAnimationFrame(loop);
      if (ts - last < 32) return;
      last = ts;
      const cont = mapRef.current;
      if (!cont) return;
      const cr = cont.getBoundingClientRect();
      const t0 = ts / 1000;
      const hov = hoveredRef.current;
      for (let i = 0; i < BRANCHES.length; i++) {
        const node = nodeRefs.current[i];
        if (!node) continue;
        const nr = node.getBoundingClientRect();
        const bx = ((nr.left + nr.width / 2 - cr.left) / cr.width) * 100;
        const by = ((nr.top + nr.height / 2 - cr.top) / cr.height) * 100;
        const p = partsOf(bx, by);
        const active = !hov || hov === BRANCHES[i].id;
        const path = pathRefs.current[i];
        if (path) {
          path.setAttribute("d", p.d);
          path.setAttribute("stroke", hov === BRANCHES[i].id ? RED_HI : RED);
          path.setAttribute("stroke-width", hov === BRANCHES[i].id ? 1.6 : 1);
          path.setAttribute("stroke-opacity", active ? 0.8 : 0.14);
        }
        if (!reduce) {
          for (let j = 0; j < 3; j++) {
            const el = packRefs.current[i][j];
            if (!el) continue;
            const t = (((t0 / (5 + i * 0.6) + i * 0.13 - j * 0.045) % 1) + 1) % 1;
            const [px, py] = bez(p, t);
            el.style.left = `${px}%`;
            el.style.top = `${py}%`;
            el.style.opacity = `${(j === 0 ? 0.95 : 0.4 - j * 0.12) * (active ? 1 : 0.2)}`;
          }
        }
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const go = (b) => {
    if (b.link) {
      confirm();
      navigate(b.link);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1480px] px-5 py-14 sm:px-10">
      <div className="mb-8">
        <p className="text-sm" style={{ color: RED }}>&gt; ~/about<span className="term-caret">_</span></p>
        <p className="mt-1 text-sm" style={{ color: DIM }}>a map of who i am, what i do, and where i'm headed. <span style={{ color: "#4f4a45" }}>drag the nodes.</span></p>
      </div>

      <div ref={mapRef} className="relative hidden h-[82vh] w-full lg:block">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[9, 15, 22].map((r) => (
            <circle key={r} cx="50" cy="50" r={r} fill="none" stroke={RED} strokeOpacity="0.07" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="2 5" />
          ))}
          {BRANCHES.map((b, i) => {
            const p = partsOf(b.x, b.y);
            return (
              <path
                key={b.id}
                ref={(el) => (pathRefs.current[i] = el)}
                d={p.d}
                fill="none"
                stroke={RED}
                strokeWidth={1}
                strokeOpacity={0.8}
                strokeDasharray="3 4"
                vectorEffect="non-scaling-stroke"
                style={reduce ? undefined : { animation: "mapdash 4.5s linear infinite" }}
              />
            );
          })}
        </svg>

        {!reduce &&
          BRANCHES.map((b, i) => (
            <React.Fragment key={`pk-${b.id}`}>
              {[0, 1, 2].map((j) => (
                <span
                  key={j}
                  ref={(el) => (packRefs.current[i][j] = el)}
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ width: j === 0 ? 6 : 4 - j, height: j === 0 ? 6 : 4 - j, background: RED_HI, boxShadow: `0 0 ${j === 0 ? 10 : 5}px ${RED_HI}` }}
                />
              ))}
            </React.Fragment>
          ))}

        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <Core />
        </div>

        {BRANCHES.map((b, i) => (
          <motion.div
            key={b.id}
            ref={(el) => (nodeRefs.current[i] = el)}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${b.x}%`, top: `${b.y}%`, cursor: "grab" }}
            drag
            dragMomentum={false}
            whileDrag={{ cursor: "grabbing", zIndex: 30 }}
            onDragStart={() => blip(300, 0.05, 0.03)}
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.25 + i * 0.1 }}
          >
            <BranchPanel b={b} hovered={hovered} setHovered={setHovered} onClick={() => go(b)} />
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 lg:hidden">
        <div className="flex justify-center"><Core /></div>
        {BRANCHES.map((b) => (
          <BranchPanel key={b.id} b={b} hovered={hovered} setHovered={setHovered} onClick={() => go(b)} />
        ))}
      </div>
    </div>
  );
}
