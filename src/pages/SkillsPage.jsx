import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import TerminalShell from "../components/terminal/TerminalShell";
import { hoverTick, toggle } from "../components/terminal/sound";

const RED = "#dd2316";
const RED_HI = "#ff3324";
const TEXT = "#ece8e3";
const BODY = "#b9b3ac";
const DIM = "#6b655f";
const FAINT = "#4f4a45";
const EASE = [0.23, 1, 0.32, 1];

const CATS = [
  {
    key: "aiml",
    label: "AI / ML",
    skills: [
      { n: "GenAI & LLMs", v: 88, tools: ["Claude", "Gemini", "LLM APIs"], used: ["impress.ai", "Serenity"] },
      { n: "RAG & Vector Search", v: 85, tools: ["Embeddings", "pgvector"], used: ["impress.ai", "PRAGATI"] },
      { n: "Agentic AI", v: 82, tools: ["Google ADK", "MCP"], used: ["PRAGATI"] },
      { n: "NLP & Fine-tuning", v: 80, tools: ["PyTorch", "HuggingFace", "XLM-R"], used: ["Serenity"] },
      { n: "Prompt Engineering", v: 85, tools: ["Claude", "Gemini"], used: ["impress.ai"] },
      { n: "Computer Vision", v: 72, tools: ["YOLOv8", "OpenCV", "TFLite"], used: ["Guardia"] },
    ],
  },
  {
    key: "lang",
    label: "LANGUAGES",
    skills: [
      { n: "Python", v: 88, tools: ["Pandas", "NumPy", "Scikit-learn"], used: ["Serenity", "PRAGATI", "Guardia"] },
      { n: "JavaScript", v: 80, tools: ["ES2023", "Node"], used: ["Uni-Verse", "Portfolio"] },
      { n: "SQL", v: 70, tools: ["Postgres", "AlloyDB"], used: ["PRAGATI", "Uni-Verse"] },
    ],
  },
  {
    key: "backend",
    label: "BACKEND",
    skills: [
      { n: "FastAPI", v: 78, tools: ["asyncpg", "Flask"], used: ["Serenity", "PRAGATI"] },
      { n: "Node / Express", v: 72, tools: ["MERN", "JWT"], used: ["Amypo", "Task Manager"] },
      { n: "REST & Webhooks", v: 78, tools: ["APIs", "SSE"], used: ["impress.ai", "Serenity"] },
      { n: "Apps Script", v: 75, tools: ["Slack API", "Workspace"], used: ["impress.ai"] },
    ],
  },
  {
    key: "frontend",
    label: "FRONTEND",
    skills: [
      { n: "React 19", v: 80, tools: ["Hooks", "Router"], used: ["Serenity", "Portfolio"] },
      { n: "Next.js", v: 65, tools: ["App Router"], used: ["Uni-Verse"] },
      { n: "Three.js", v: 60, tools: ["R3F", "drei"], used: ["Portfolio"] },
      { n: "Vite", v: 75, tools: ["Tailwind", "Motion"], used: ["Portfolio", "Serenity"] },
    ],
  },
  {
    key: "data",
    label: "DATA",
    skills: [
      { n: "Postgres · pgvector", v: 75, tools: ["Supabase", "RLS"], used: ["Serenity", "Uni-Verse"] },
      { n: "AlloyDB", v: 68, tools: ["GCP", "MCP Toolbox"], used: ["PRAGATI"] },
      { n: "MongoDB", v: 70, tools: ["Atlas", "Mongoose"], used: ["Amypo", "Task Manager"] },
      { n: "Supabase · Firestore", v: 68, tools: ["Auth", "Edge Fns"], used: ["Uni-Verse", "Serenity"] },
    ],
  },
  {
    key: "cloud",
    label: "CLOUD / DEVOPS",
    skills: [
      { n: "Google Cloud", v: 72, tools: ["Cloud Run", "Vertex AI"], used: ["PRAGATI"] },
      { n: "Docker", v: 62, tools: ["Compose"], used: ["PRAGATI", "Serenity"] },
      { n: "Deploy", v: 75, tools: ["Vercel", "Railway", "Render"], used: ["Serenity", "Portfolio"] },
      { n: "Azure · Firebase", v: 58, tools: ["AI Fundamentals"], used: ["Azure AI projects"] },
      { n: "Git · GitHub", v: 85, tools: ["CI", "3-branch flow"], used: ["everything"] },
    ],
  },
];

const CX = 350;
const CY = 350;
const R = 232;
const GAP = 6;
const N = CATS.reduce((a, c) => a + c.skills.length, 0);
const SLOT = (360 - GAP * CATS.length) / N;

const NODES = (() => {
  const out = [];
  let cursor = -90 - (CATS[0].skills.length * SLOT) / 2;
  CATS.forEach((c) => {
    const start = cursor;
    c.skills.forEach((s) => {
      out.push({ ...s, cat: c.key, deg: cursor + SLOT / 2 });
      cursor += SLOT;
    });
    c.a0 = start + 1.5;
    c.a1 = cursor - 1.5;
    c.mid = (start + cursor) / 2;
    cursor += GAP;
  });
  return out;
})();

const pt = (deg, r) => {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
};
const arcPath = (a0, a1, r) => {
  const [x0, y0] = pt(a0, r);
  const [x1, y1] = pt(a1, r);
  return `M ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1}`;
};
const anchor = (deg) => {
  const c = Math.cos((deg * Math.PI) / 180);
  return c > 0.3 ? "start" : c < -0.3 ? "end" : "middle";
};

function Meter({ v, delay, reduce }) {
  return (
    <span className="h-2 flex-1 overflow-hidden rounded-sm" style={{ background: "rgba(236,232,227,0.07)" }}>
      <motion.span
        className="block h-full"
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: v / 100 }}
        transition={{ duration: 0.7, ease: EASE, delay }}
        style={{ transformOrigin: "left", background: "repeating-linear-gradient(90deg, #dd2316 0 6px, rgba(221,35,22,0.25) 6px 8px)" }}
      />
    </span>
  );
}

function Panel({ active, setActive, hover, reduce }) {
  const cat = CATS.find((c) => c.key === active);
  if (!cat)
    return (
      <div className="space-y-2">
        <p className="mb-3 text-[11px] tracking-[0.2em]" style={{ color: RED }}>SECTORS</p>
        {CATS.map((c) => {
          const avg = Math.round(c.skills.reduce((a, s) => a + s.v, 0) / c.skills.length);
          return (
            <button
              key={c.key}
              onClick={() => {
                toggle();
                setActive(c.key);
              }}
              onMouseEnter={hoverTick}
              className="flex w-full cursor-pointer items-center gap-3 rounded-sm border px-3 py-2.5 text-left transition-colors duration-200 hover:border-[rgba(221,35,22,0.7)]"
              style={{ borderColor: "rgba(236,232,227,0.12)", backgroundColor: "rgba(8,8,8,0.5)" }}
            >
              <span className="w-24 shrink-0 text-xs" style={{ color: TEXT }}>{c.label}</span>
              <Meter v={avg} delay={0} reduce={reduce} />
              <span className="w-8 text-right text-[11px] tabular-nums" style={{ color: DIM }}>{avg}</span>
            </button>
          );
        })}
        <p className="pt-2 text-[11px]" style={{ color: FAINT }}>click a sector to zoom in</p>
      </div>
    );
  return (
    <div key={cat.key}>
      <div className="mb-4 flex items-baseline justify-between">
        <p className="text-[11px] tracking-[0.2em]" style={{ color: RED }}>{cat.label} // breakdown</p>
        <button onClick={() => { toggle(); setActive("all"); }} onMouseEnter={hoverTick} className="cursor-pointer text-[10px] transition-colors duration-200 hover:text-[#ece8e3]" style={{ color: DIM }}>
          ← all sectors
        </button>
      </div>
      <div className="space-y-4">
        {cat.skills.map((s, i) => {
          const hot = hover === s.n;
          return (
            <motion.div
              key={s.n}
              initial={reduce ? false : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: EASE, delay: i * 0.05 }}
              className="rounded-sm border p-3 transition-colors duration-200"
              style={{ borderColor: hot ? "rgba(255,51,36,0.7)" : "rgba(236,232,227,0.1)", backgroundColor: hot ? "rgba(28,8,6,0.6)" : "rgba(8,8,8,0.5)" }}
            >
              <div className="mb-1.5 flex items-center gap-3">
                <span className="flex-1 truncate text-[13px]" style={{ color: hot ? "#fff" : TEXT }}>{s.n}</span>
                <Meter v={s.v} delay={0.1 + i * 0.05} reduce={reduce} />
                <span className="w-8 text-right text-[11px] tabular-nums" style={{ color: hot ? RED_HI : DIM }}>{s.v}</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {s.tools.map((t) => (
                  <span key={t} className="rounded-sm border px-1.5 py-0.5 text-[9px]" style={{ borderColor: "rgba(236,232,227,0.14)", color: DIM }}>{t}</span>
                ))}
                <span className="ml-auto text-[9px]" style={{ color: FAINT }}>in: {s.used.join(" · ")}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function SkillsPage() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState("aiml");
  const [hover, setHover] = useState(null);

  const webPath = useMemo(() => {
    return (
      NODES.map((s, i) => {
        const [x, y] = pt(s.deg, (s.v / 100) * R);
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      }).join(" ") + " Z"
    );
  }, []);

  const hotSeg = useMemo(() => {
    if (active === "all") return null;
    const seg = NODES.filter((s) => s.cat === active);
    return seg.map((s, i) => {
      const [x, y] = pt(s.deg, (s.v / 100) * R);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(" ");
  }, [active]);

  const hovered = NODES.find((s) => s.n === hover);
  const activeCat = CATS.find((c) => c.key === active);
  const centerBig = hovered ? hovered.v : activeCat ? Math.round(activeCat.skills.reduce((a, s) => a + s.v, 0) / activeCat.skills.length) : Math.round(NODES.reduce((a, s) => a + s.v, 0) / N);
  const centerSmall = hovered ? hovered.n : activeCat ? activeCat.label : "ALL SECTORS";

  const pick = (k) => {
    toggle();
    setActive(k);
  };

  return (
    <TerminalShell path="~/skills" subtitle="calibrated loadout" quiet>
      <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-8 sm:px-10">
          <div className="mb-6">
            <p className="font-mono text-sm" style={{ color: RED }}>&gt; ~/skills<span className="term-caret">_</span></p>
            <p className="mt-1 font-mono text-sm" style={{ color: DIM }}>the stack, honestly rated · self-calibrated · click a sector</p>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {[{ key: "all", label: "ALL" }, ...CATS].map((c) => {
              const on = active === c.key;
              return (
                <button
                  key={c.key}
                  onClick={() => pick(c.key)}
                  onMouseEnter={hoverTick}
                  className="cursor-pointer rounded-sm border px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] transition-colors duration-200"
                  style={{
                    borderColor: on ? RED_HI : "rgba(236,232,227,0.16)",
                    color: on ? RED_HI : BODY,
                    backgroundColor: on ? "rgba(28,8,6,0.7)" : "rgba(8,8,8,0.4)",
                    boxShadow: on ? "0 0 16px rgba(221,35,22,0.25)" : "none",
                  }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div className="mx-auto w-full max-w-[720px]">
              <svg viewBox="0 0 700 700" className="w-full select-none" role="img" aria-label="Skill radar, grouped by sector">
                <defs>
                  <radialGradient id="radfill" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={RED} stopOpacity="0.22" />
                    <stop offset="100%" stopColor={RED} stopOpacity="0.04" />
                  </radialGradient>
                </defs>

                {[0.25, 0.5, 0.75, 1].map((f) => (
                  <circle key={f} cx={CX} cy={CY} r={R * f} fill="none" stroke={RED} strokeOpacity={f === 1 ? 0.18 : 0.08} strokeWidth="1" strokeDasharray="2 5" />
                ))}

                {NODES.map((s) => {
                  const [x, y] = pt(s.deg, R);
                  const dimmed = active !== "all" && s.cat !== active;
                  return <line key={`ax-${s.n}`} x1={CX} y1={CY} x2={x} y2={y} stroke={RED} strokeOpacity={dimmed ? 0.03 : 0.09} strokeWidth="1" />;
                })}

                {CATS.map((c) => {
                  const on = active === c.key;
                  const dimmed = active !== "all" && !on;
                  const [lx, ly] = pt(c.mid, R + 42);
                  return (
                    <g key={c.key} onClick={() => pick(c.key)} onPointerEnter={hoverTick} style={{ cursor: "pointer" }}>
                      <path d={arcPath(c.a0, c.a1, R + 18)} fill="none" stroke={on ? RED_HI : RED} strokeOpacity={on ? 0.95 : dimmed ? 0.15 : 0.4} strokeWidth={on ? 2.5 : 1.2} />
                      <text
                        x={lx}
                        y={ly}
                        textAnchor={anchor(c.mid)}
                        fontSize="13"
                        letterSpacing="2"
                        fill={on ? RED_HI : dimmed ? FAINT : BODY}
                        style={{ fontFamily: "'JetBrains Mono', monospace", transition: "fill 0.2s" }}
                      >
                        {c.label}
                      </text>
                    </g>
                  );
                })}

                <motion.path
                  d={webPath}
                  fill="url(#radfill)"
                  stroke={RED}
                  strokeWidth="1.3"
                  strokeOpacity={active === "all" ? 0.65 : 0.22}
                  initial={reduce ? false : { pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.1, ease: EASE }}
                />

                {hotSeg && (
                  <motion.path
                    key={active}
                    d={hotSeg}
                    fill="none"
                    stroke={RED_HI}
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    style={{ filter: "drop-shadow(0 0 5px rgba(221,35,22,0.8))" }}
                  />
                )}

                {NODES.map((s, i) => {
                  const [x, y] = pt(s.deg, (s.v / 100) * R);
                  const on = active === "all" || s.cat === active;
                  const hot = hover === s.n;
                  const [tx, ty] = pt(s.deg, (s.v / 100) * R + 20);
                  return (
                    <motion.g
                      key={s.n}
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: reduce ? 0 : 0.5 + i * 0.02 }}
                      onPointerEnter={() => {
                        setHover(s.n);
                        hoverTick();
                      }}
                      onPointerLeave={() => setHover(null)}
                      onClick={() => pick(s.cat)}
                      style={{ cursor: "pointer" }}
                    >
                      <circle cx={x} cy={y} r="14" fill="transparent" />
                      <circle
                        cx={x}
                        cy={y}
                        r={hot ? 6 : on ? 4 : 2.5}
                        fill={hot ? "#fff" : on ? RED_HI : "rgba(221,35,22,0.35)"}
                        style={{ filter: on ? "drop-shadow(0 0 5px rgba(255,51,36,0.9))" : "none", transition: "r 0.15s" }}
                      />
                      {hot && (
                        <g>
                          <rect x={anchor(s.deg) === "end" ? tx - s.n.length * 7 - 34 : anchor(s.deg) === "middle" ? tx - (s.n.length * 7 + 34) / 2 : tx - 6} y={ty - 13} width={s.n.length * 7 + 40} height="19" rx="3" fill="rgba(0,0,0,0.85)" stroke="rgba(221,35,22,0.5)" strokeWidth="0.5" />
                          <text x={tx} y={ty} textAnchor={anchor(s.deg)} fontSize="11" fill="#fff" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                            {s.n} · {s.v}
                          </text>
                        </g>
                      )}
                    </motion.g>
                  );
                })}

                <circle cx={CX} cy={CY} r="52" fill="rgba(10,6,5,0.92)" stroke={RED} strokeOpacity="0.5" strokeWidth="1" />
                <text x={CX} y={CY - 2} textAnchor="middle" fontSize="34" fill={RED} style={{ fontFamily: "'Jersey 25', monospace" }}>
                  {centerBig}
                </text>
                <text x={CX} y={CY + 22} textAnchor="middle" fontSize="9.5" letterSpacing="1.5" fill={DIM} style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  {centerSmall.length > 22 ? centerSmall.slice(0, 21) + "…" : centerSmall.toUpperCase()}
                </text>
              </svg>
            </div>

            <div className="pb-10 lg:sticky lg:top-6">
              <Panel active={active} setActive={setActive} hover={hover} reduce={reduce} />
            </div>
          </div>
        </div>
      </div>
    </TerminalShell>
  );
}
