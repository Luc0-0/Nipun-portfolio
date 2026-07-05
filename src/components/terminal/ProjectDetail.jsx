import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  SiReact, SiVite, SiFramer, SiGreensock, SiPython, SiFastapi, SiPostgresql,
  SiSupabase, SiPytorch, SiDocker, SiVercel, SiRailway, SiJsonwebtokens,
  SiTypescript, SiNodedotjs, SiMongodb, SiTailwindcss, SiScikitlearn, SiJavascript,
  SiNextdotjs, SiFirebase, SiRedux, SiSocketdotio, SiGooglegemini, SiAndroid,
} from "react-icons/si";
import TerminalShell from "./TerminalShell";
import ArchitectureMap from "./ArchitectureMap";
import ChatFlow from "./ChatFlow";
import FeatureBoard from "./FeatureBoard";
import { PROJECT_DETAILS } from "./projectData";
import { blip, hoverTick, back } from "./sound";

const RED = "#dd2316";
const TEXT = "#ece8e3";
const SECOND = "#8a857f";
const DIM = "#4f4a45";
const BORDER = "rgba(236,232,227,0.14)";
const PANEL = "rgba(255,255,255,0.025)";
const MUTE_RED = "#b46a61";
const BODY = "#c4c0b9"; // brighter, readable body text
const BOX = "rgba(10,10,10,0.45)";

const TAG_COLOR = { CURRENT: "#6f9e80", PRODUCTION: "#dd2316", BUILT: "#c2554a", EXPERIMENT: "#8a857f" };
const LOGOS = {
  react: SiReact, vite: SiVite, framer: SiFramer, gsap: SiGreensock, python: SiPython,
  fastapi: SiFastapi, postgresql: SiPostgresql, supabase: SiSupabase, pytorch: SiPytorch,
  docker: SiDocker, vercel: SiVercel, railway: SiRailway, jwt: SiJsonwebtokens,
  typescript: SiTypescript, node: SiNodedotjs, mongodb: SiMongodb, tailwind: SiTailwindcss,
  sklearn: SiScikitlearn, javascript: SiJavascript, nextjs: SiNextdotjs,
  firebase: SiFirebase, redux: SiRedux, socketio: SiSocketdotio, gemini: SiGooglegemini, android: SiAndroid,
};

const FileIcon = ({ color }) => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" aria-hidden="true" className="shrink-0">
    <path d="M1 1h5.5L11 5.5V13H1z" stroke={color} strokeWidth="1" />
    <path d="M6.5 1v4H11" stroke={color} strokeWidth="1" />
  </svg>
);

function countWords(section) {
  let n = 0;
  for (const b of section.blocks) {
    if (b.text) n += b.text.split(/\s+/).length;
    if (b.items) b.items.forEach((it) => (n += (typeof it === "string" ? it : it.label || "").split(/\s+/).length));
    if (b.rows) b.rows.forEach(([k, v]) => (n += `${k} ${v}`.split(/\s+/).length));
  }
  return n;
}

function Minimap({ headings, activeHd, onJump }) {
  if (headings.length < 2) return null;
  return (
    <div className="group absolute right-5 top-1/2 hidden -translate-y-1/2 lg:flex">
      <div className="flex flex-col items-end gap-2.5">
        {headings.map((h, i) => {
          const on = i === activeHd;
          return (
            <button key={i} onClick={() => onJump(h.idx)} onMouseEnter={() => hoverTick()} className="flex items-center gap-2" aria-label={h.text}>
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-right text-[11px] opacity-0 transition-all duration-200 group-hover:max-w-[160px] group-hover:opacity-100" style={{ color: on ? TEXT : SECOND }}>{h.text}</span>
              <span className="h-[2px] rounded transition-all duration-200" style={{ width: on ? 22 : 12, backgroundColor: on ? RED : "rgba(180,106,97,0.45)" }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Block({ b, idx }) {
  if (b.type === "h")
    return (
      <h2 id={`hd-${idx}`} className="mb-4 mt-10 flex items-baseline gap-2 pb-2 text-2xl first:mt-0" style={{ color: TEXT, borderBottom: `1px solid ${BORDER}`, scrollMarginTop: 12 }}>
        <span style={{ color: RED }}>#</span>{b.text}
      </h2>
    );
  if (b.type === "p") return <p className="mb-5 max-w-[92ch] text-[15px] leading-[1.85]" style={{ color: BODY }}>{b.text}</p>;
  if (b.type === "quote")
    return <blockquote className="mb-5 max-w-[92ch] pl-4 text-[15px] italic" style={{ color: TEXT, borderLeft: `2px solid ${RED}` }}>{b.text}</blockquote>;
  if (b.type === "list")
    return (
      <ul className="mb-5 max-w-[92ch] space-y-2.5">
        {b.items.map((it, i) => (
          <li key={i} className="flex gap-2.5 text-[15px] leading-[1.8]" style={{ color: BODY }}><span style={{ color: RED }}>–</span><span>{it}</span></li>
        ))}
      </ul>
    );
  if (b.type === "kv")
    return (
      <table className="mb-6 w-full max-w-[94ch] border-collapse overflow-hidden rounded-md text-sm" style={{ border: `1px solid ${BORDER}` }}>
        <tbody>
          {b.rows.map(([k, v], i) => (
            <tr key={i} style={{ borderTop: i ? `1px solid ${BORDER}` : "none" }}>
              <td className="w-[150px] border-r py-3 pl-4 pr-4 align-top tracking-wide" style={{ color: RED, borderColor: BORDER, backgroundColor: PANEL }}>{k}</td>
              <td className="py-3 pl-4 pr-4 leading-relaxed" style={{ color: BODY }}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  if (b.type === "stack")
    return (
      <div className="mb-5 space-y-5">
        {b.groups.map((g, gi) => (
          <div key={gi}>
            <p className="mb-2.5 text-[11px] tracking-widest" style={{ color: RED }}>{g.label}</p>
            <div className="flex flex-wrap gap-2.5">
              {g.items.map(([k, label]) => {
                const Logo = LOGOS[k];
                return (
                  <span key={k} className="flex items-center gap-2 rounded-md border px-3 py-2 text-[12px] transition-colors hover:brightness-125" style={{ borderColor: BORDER, backgroundColor: PANEL, color: TEXT }}>
                    {Logo ? <Logo size={15} color={RED} /> : <span style={{ color: RED }}>◦</span>}
                    {label}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  if (b.type === "image")
    return (
      <div className="mb-6 overflow-hidden rounded-md border" style={{ borderColor: BORDER }}>
        <img src={b.src} alt={b.alt || ""} loading="lazy" className="w-full" onError={(e) => { const w = e.currentTarget.parentElement; if (w) w.style.display = "none"; }} />
      </div>
    );
  if (b.type === "arch") return <ArchitectureMap nodes={b.nodes} edges={b.edges} />;
  if (b.type === "chatflow") return <ChatFlow steps={b.steps} />;
  if (b.type === "features") return <FeatureBoard />;
  if (b.type === "code")
    return (
      <pre className="mb-5 max-w-[94ch] overflow-x-auto rounded-md border p-3.5 text-[12px] leading-relaxed" style={{ borderColor: BORDER, backgroundColor: "rgba(0,0,0,0.5)", color: BODY }}>
        <code>{b.text}</code>
      </pre>
    );
  if (b.type === "links")
    return (
      <div className="mb-4 flex flex-col gap-2.5">
        {b.items.map((l, i) => (
          <a key={i} href={l.href} target="_blank" rel="noreferrer" className="w-fit text-sm transition-colors hover:brightness-125" style={{ color: RED, borderBottom: "1px dotted rgba(221,35,22,0.5)" }} onMouseEnter={() => blip(720)}>{l.label}</a>
        ))}
      </div>
    );
  return null;
}

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const detail = PROJECT_DETAILS[projectId];

  const rowRef = useRef(null);
  const contentRef = useRef(null);
  const [sidebarW, setSidebarW] = useState(250);
  const [isLg, setIsLg] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [active, setActive] = useState(detail ? detail.sections[0].id : null);
  const [activeHd, setActiveHd] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setIsLg(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const startResize = (e) => {
    e.preventDefault();
    setDragging(true);
    const move = (ev) => {
      const rect = rowRef.current?.getBoundingClientRect();
      if (rect) setSidebarW(Math.max(180, Math.min(520, ev.clientX - rect.left)));
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const openFile = (id) => {
    blip();
    setActive(id);
    setActiveHd(0);
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };

  // arrow / j-k switches files (ignored while typing in the command bar)
  useEffect(() => {
    if (!detail) return undefined;
    const onKey = (e) => {
      const el = document.activeElement;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      const idx = detail.sections.findIndex((s) => s.id === active);
      if (idx < 0) return;
      if (e.key === "ArrowDown" || e.key === "j") { e.preventDefault(); const n = detail.sections[Math.min(idx + 1, detail.sections.length - 1)]; if (n.id !== active) openFile(n.id); }
      else if (e.key === "ArrowUp" || e.key === "k") { e.preventDefault(); const n = detail.sections[Math.max(idx - 1, 0)]; if (n.id !== active) openFile(n.id); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, detail]);

  if (!detail) {
    return (
      <TerminalShell path={`~/projects/${projectId}`}>
        <div className="px-4 py-8 sm:px-8" style={{ color: SECOND }}>
          <p className="text-sm">No detailed readme wired for this one yet.</p>
          <button onClick={() => { back(); navigate("/work"); }} className="mt-4 text-[13px]" style={{ color: RED }}>← back to /projects</button>
        </div>
      </TerminalShell>
    );
  }

  const section = detail.sections.find((s) => s.id === active) || detail.sections[0];
  const headings = section.blocks.reduce((a, b, i) => (b.type === "h" ? [...a, { text: b.text, idx: i }] : a), []);

  const onJump = (blockIdx) => {
    const el = document.getElementById(`hd-${blockIdx}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    blip();
  };
  const onSpy = () => {
    const c = contentRef.current;
    if (!c) return;
    const ct = c.getBoundingClientRect().top;
    let cur = 0;
    headings.forEach((h, i) => {
      const el = document.getElementById(`hd-${h.idx}`);
      if (el && el.getBoundingClientRect().top - ct <= 100) cur = i;
    });
    setActiveHd((p) => (p === cur ? p : cur));
  };

  return (
    <TerminalShell path={`~/projects/${projectId}`} subtitle={detail.stack}>
      <div className="mx-auto flex min-h-0 w-full max-w-[1500px] flex-1 flex-col px-4 sm:px-8">
        {/* repo header */}
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b py-3" style={{ borderColor: BORDER }}>
          <button onClick={() => { back(); navigate("/work"); }} className="text-[12px] transition-colors hover:brightness-150" style={{ color: MUTE_RED }} onMouseEnter={() => blip(620)}>← /projects</button>
          <h1 className="text-xl" style={{ color: TEXT }}>{detail.title}</h1>
          <span className="text-[10px] tracking-widest" style={{ color: TAG_COLOR[detail.tag] || SECOND }}>{detail.tag}</span>
          <span className="text-[11px]" style={{ color: MUTE_RED }}>{detail.year}</span>
          {detail.live && <a href={detail.live} target="_blank" rel="noreferrer" className="ml-auto text-[12px] hover:brightness-125" style={{ color: RED }} onMouseEnter={() => blip(720)}>live ↗</a>}
          {detail.repo && <a href={detail.repo} target="_blank" rel="noreferrer" className="text-[12px] hover:brightness-125" style={{ color: RED }} onMouseEnter={() => blip(720)}>source ↗</a>}
        </div>

        <div ref={rowRef} className="flex min-h-0 flex-1 flex-col py-4 lg:flex-row">
          {/* sidebar: README + section files (swap content on click) */}
          <aside style={{ width: isLg ? sidebarW : undefined, borderColor: BORDER, backgroundColor: BOX, backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }} className="flex w-full shrink-0 flex-col overflow-hidden rounded-md border lg:w-auto">
            <div className="flex items-center justify-between border-b px-3 py-2.5" style={{ borderColor: BORDER, backgroundColor: PANEL }}>
              <span className="text-[12px]" style={{ color: TEXT }}>Files</span>
              <span className="rounded px-1.5 py-0.5 text-[10px]" style={{ color: SECOND, border: `1px solid ${BORDER}` }}>⎇ main</span>
            </div>
            <div className="min-h-0 flex-1 overflow-x-auto overflow-y-auto p-2 lg:overflow-x-hidden">
              <div className="flex gap-1 lg:flex-col">
                {detail.sections.map((s) => {
                  const on = s.id === section.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => openFile(s.id)}
                      onMouseEnter={() => hoverTick()}
                      className={`relative flex items-center gap-2 whitespace-nowrap rounded px-2 py-1.5 text-left text-[13px] transition-colors ${on ? "" : "hover:bg-[rgba(221,35,22,0.08)] hover:text-[#cfcbc4]"}`}
                      style={{ backgroundColor: on ? "rgba(221,35,22,0.16)" : undefined, color: on ? TEXT : SECOND }}
                    >
                      {on && <span className="absolute inset-y-1 left-0 w-[2px] rounded-full" style={{ backgroundColor: RED }} />}
                      <FileIcon color={on ? RED : DIM} />
                      <span>{s.label.replace(".md", "")}<span style={{ color: DIM }}>.md</span></span>
                      {on && <span className="ml-auto hidden lg:inline" style={{ color: RED }}>›</span>}
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="hidden border-t px-3 py-2 text-[10px] lg:block" style={{ color: MUTE_RED, borderColor: BORDER }}><span style={{ color: RED }}>↑↓</span> open files</p>
          </aside>

          {/* drag to resize */}
          <div onPointerDown={startResize} className="group hidden w-3 shrink-0 cursor-col-resize items-center justify-center lg:flex" aria-hidden="true">
            <div className="h-10 w-[2px] rounded transition-colors group-hover:!bg-[#dd2316]" style={{ backgroundColor: dragging ? RED : BORDER }} />
          </div>

          {/* file box */}
          <main className="mt-4 flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-md border lg:mt-0" style={{ borderColor: BORDER, backgroundColor: BOX, backdropFilter: "blur(2px)", WebkitBackdropFilter: "blur(2px)" }}>
            <div className="flex items-center gap-3 border-b px-4 py-2 text-[11px]" style={{ borderColor: BORDER, backgroundColor: PANEL, color: MUTE_RED }}>
              <span className="flex items-center gap-1.5"><FileIcon color={MUTE_RED} /> {section.label}</span>
              <span className="ml-3 rounded px-2 py-0.5" style={{ color: TEXT, backgroundColor: "rgba(221,35,22,0.14)" }}>Preview</span>
              <a href={detail.repo} target="_blank" rel="noreferrer" className="hover:brightness-150" onMouseEnter={() => blip(620)}>Raw</a>
              <span className="ml-auto tabular-nums">{countWords(section)} words</span>
            </div>
            <div className="relative flex min-h-0 flex-1">
              <div ref={contentRef} onScroll={onSpy} className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 lg:pr-12">
                {section.id === "readme" && (
                  <h1 className="mb-5 pb-3 text-3xl sm:text-4xl" style={{ color: TEXT, borderBottom: `1px solid ${BORDER}` }}>{detail.title}</h1>
                )}
                {section.title && (
                  <h2 className="mb-4 flex items-baseline gap-2 pb-2 text-2xl" style={{ color: TEXT, borderBottom: `1px solid ${BORDER}` }}>
                    <span style={{ color: RED }}>#</span>{section.title}
                  </h2>
                )}
                {section.blocks.map((b, i) => <Block key={i} b={b} idx={i} />)}
              </div>
              <Minimap headings={headings} activeHd={activeHd} onJump={onJump} />
            </div>
          </main>
        </div>
      </div>
    </TerminalShell>
  );
}
