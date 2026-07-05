import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SiPython, SiJavascript, SiReact, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiGit } from "react-icons/si";
import { Brain, TreeStructure, GithubLogo, LinkedinLogo, EnvelopeSimple, Play, FastForward } from "@phosphor-icons/react";
import TerminalShell from "../components/terminal/TerminalShell";
import AboutSystem from "../components/terminal/AboutSystem";
import AboutMap from "../components/terminal/AboutMap";
import AboutTimeline from "../components/terminal/AboutTimeline";
import { blip, hoverTick, confirm, powerOn, makeDrone } from "../components/terminal/sound";

const RED = "#dd2316";
const RED_HI = "#ff3324";
const TEXT = "#ece8e3";
const BODY = "#b9b3ac";
const DIM = "#6b655f";
const EASE = [0.23, 1, 0.32, 1];
const FRAMP = " .:-=+*coO0#%@";

const FCOLS = 124;
const FROWS = 74;
const CHARW = 0.6;
const WORDS = ["NIPUN", "BUILDER", "AI"];

const BALLS = [
  { ax: 0.36, ay: 0.32, fx: 0.21, fy: 0.17, px: 0.0, py: 1.0, r: 0.24 },
  { ax: 0.3, ay: 0.38, fx: 0.13, fy: 0.24, px: 1.2, py: 0.5, r: 0.2 },
  { ax: 0.44, ay: 0.3, fx: 0.17, fy: 0.3, px: 2.5, py: 2.0, r: 0.27 },
  { ax: 0.26, ay: 0.42, fx: 0.27, fy: 0.14, px: 0.7, py: 3.1, r: 0.19 },
  { ax: 0.48, ay: 0.24, fx: 0.11, fy: 0.2, px: 3.3, py: 1.4, r: 0.22 },
];

const smooth = (x) => x * x * (3 - 2 * x);

function makeStencil(word) {
  const cv = document.createElement("canvas");
  cv.width = FCOLS;
  cv.height = FROWS;
  const c = cv.getContext("2d");
  c.fillStyle = "#000";
  c.fillRect(0, 0, FCOLS, FROWS);
  c.fillStyle = "#fff";
  c.textAlign = "center";
  c.textBaseline = "middle";
  let fs = FROWS * 0.72;
  const fit = () => {
    c.font = `700 ${fs}px 'JetBrains Mono', monospace`;
    return c.measureText(word).width * 1.7;
  };
  while (fit() > FCOLS * 0.78 && fs > 6) fs -= 1;
  c.save();
  c.translate(FCOLS / 2, FROWS / 2);
  c.scale(1.7, 1);
  c.fillText(word, 0, 0);
  c.restore();
  const d = c.getImageData(0, 0, FCOLS, FROWS).data;
  const out = new Float32Array(FCOLS * FROWS);
  for (let i = 0; i < out.length; i++) out[i] = d[i * 4] / 255;
  return out;
}

function makeFaceStencil(cb) {
  const img = new Image();
  img.src = "/images/nipun.png";
  img.onload = () => {
    const cv = document.createElement("canvas");
    cv.width = FCOLS;
    cv.height = FROWS;
    const c = cv.getContext("2d", { willReadFrequently: true });
    const cropA = (FCOLS * CHARW) / FROWS;
    const ia = img.width / img.height;
    let sx, sy, sw, sh;
    if (ia > cropA) {
      sh = img.height;
      sw = sh * cropA;
      sx = (img.width - sw) / 2;
      sy = 0;
    } else {
      sw = img.width;
      sh = sw / cropA;
      sx = 0;
      sy = (img.height - sh) / 2;
    }
    c.drawImage(img, sx, sy, sw, sh, 0, 0, FCOLS, FROWS);
    const d = c.getImageData(0, 0, FCOLS, FROWS).data;
    const lums = new Array(FCOLS * FROWS);
    for (let k = 0; k < lums.length; k++) {
      const i = k * 4;
      const a = d[i + 3] / 255;
      lums[k] = (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) * a;
    }
    const s = [...lums].sort((a, b) => a - b);
    const lo = s[Math.floor(s.length * 0.05)];
    const hi = s[Math.floor(s.length * 0.96)];
    const span = Math.max(1, hi - lo);
    const out = new Float32Array(FCOLS * FROWS);
    for (let k = 0; k < out.length; k++) out[k] = Math.min(1, Math.max(0, (lums[k] - lo) / span));
    cb(out);
  };
}

function AsciiField({ energyRef, glitchRef }) {
  const reduce = useReducedMotion();
  const preRef = useRef(null);
  const contRef = useRef(null);
  const mouse = useRef({ x: FCOLS / 2, y: FROWS / 2, tx: FCOLS / 2, ty: FROWS / 2, fade: 0, tfade: 0 });
  const drone = useRef(null);
  if (!drone.current) drone.current = makeDrone();
  const idle = useRef(null);

  useEffect(() => {
    const off = () => drone.current.leave();
    window.addEventListener("blur", off);
    document.addEventListener("visibilitychange", off);
    return () => {
      window.removeEventListener("blur", off);
      document.removeEventListener("visibilitychange", off);
      clearTimeout(idle.current);
      drone.current.stop();
    };
  }, []);

  useEffect(() => {
    const el = contRef.current;
    if (!el) return;
    const apply = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const fs = Math.max(4, Math.min((w * 1.06) / (FCOLS * CHARW), (h * 1.06) / FROWS));
      if (preRef.current) preRef.current.style.fontSize = `${fs}px`;
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const cx = FCOLS / 2;
    const cy = FROWS / 2;
    const SLOW = 0.45;
    const N = FRAMP.length;
    const rm2 = Math.pow(0.16 * FCOLS, 2);
    const targets = WORDS.map((w) => ({ s: makeStencil(w), k: 3.1 }));
    makeFaceStencil((arr) => targets.push({ s: arr, k: 1.5 }));
    const hash = (x, y) => {
      const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
      return s - Math.floor(s);
    };

    const compose = (t, e, boot) => {
      const mu = mouse.current;
      const phase = t % 9;
      const tg = targets[Math.floor(t / 9) % targets.length];
      let m = 0;
      if (phase < 1.1) m = smooth(phase / 1.1);
      else if (phase < 2.7) m = 1;
      else if (phase < 3.8) m = 1 - smooth((phase - 2.7) / 1.1);
      const sten = tg.s;

      const bc = BALLS.map((b) => ({
        x: cx + Math.cos(t * b.fx * 6.283 * SLOW + b.px) * b.ax * FCOLS,
        y: cy + Math.sin(t * b.fy * 6.283 * SLOW + b.py) * b.ay * FROWS,
        r2: Math.pow(b.r * FCOLS * (1 + e * 0.14), 2),
      }));

      let out = "";
      for (let y = 0; y < FROWS; y++) {
        for (let x = 0; x < FCOLS; x++) {
          let f = 0;
          for (let k = 0; k < bc.length; k++) {
            const dx = x - bc[k].x;
            const dy = (y - bc[k].y) * 2;
            f += bc[k].r2 / (dx * dx + dy * dy + 1);
          }
          if (mu.fade > 0.01) {
            const dx = x - mu.x;
            const dy = (y - mu.y) * 2;
            f += (rm2 * mu.fade) / (dx * dx + dy * dy + 1);
          }
          const blended = f * (1 - 0.5 * m) + sten[y * FCOLS + x] * m * tg.k;
          const level = Math.min(1, Math.max(0, (blended - 0.55) / 2.4));
          const qi = Math.round(level * (N - 1));
          out += qi === 0 || (boot < 1 && hash(x, y) > boot) ? " " : FRAMP[qi];
        }
        out += "\n";
      }
      return out;
    };

    if (reduce) {
      if (preRef.current) preRef.current.textContent = compose(2.9, 0, 1);
      return;
    }

    const entry = setTimeout(powerOn, 140);
    let raf, last = 0, t0 = null;
    const frame = (ts) => {
      raf = requestAnimationFrame(frame);
      if (t0 == null) t0 = ts;
      if (ts - last < 33) return;
      last = ts;
      const t = (ts - t0) / 1000;
      const boot = Math.min(1, t / 1.2);
      const e = energyRef.current;
      energyRef.current = e * 0.93;
      const g = glitchRef.current;
      glitchRef.current = g * 0.85;
      const mu = mouse.current;
      mu.x += (mu.tx - mu.x) * 0.12;
      mu.y += (mu.ty - mu.y) * 0.12;
      mu.fade += (mu.tfade - mu.fade) * 0.07;
      if (preRef.current) {
        preRef.current.textContent = compose(t, e, boot);
        const vx = Math.sin(t * 6.5) * e * 1.8 + (g > 0.2 ? (Math.random() - 0.5) * 2.5 : 0);
        const vy = Math.cos(t * 5) * e * 1.1;
        preRef.current.style.transform = `translate(${vx}px, ${vy}px) scale(${1 + e * 0.015})`;
        preRef.current.style.textShadow = g > 0.2 ? `2px 0 ${RED}, -2px 0 rgba(120,200,255,0.45)` : "0 0 22px rgba(221,35,22,0.4)";
      }
    };
    raf = requestAnimationFrame(frame);
    return () => {
      clearTimeout(entry);
      cancelAnimationFrame(raf);
    };
  }, [reduce, energyRef, glitchRef]);

  const onMove = (e) => {
    const el = contRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mu = mouse.current;
    mu.tx = ((e.clientX - r.left) / r.width) * FCOLS;
    mu.ty = ((e.clientY - r.top) / r.height) * FROWS;
    mu.tfade = 1;
    const sp = Math.min(1, Math.hypot(e.movementX || 0, e.movementY || 0) / 28);
    if (!reduce) {
      drone.current.move((e.clientY - r.top) / r.height, sp);
      clearTimeout(idle.current);
      idle.current = setTimeout(() => drone.current.leave(), 170);
    }
  };
  const onLeave = () => {
    mouse.current.tfade = 0;
    clearTimeout(idle.current);
    drone.current.leave();
  };

  return (
    <div
      ref={contRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative h-full w-full overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, #000 11%, #000 87%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 13%, #000 87%, transparent 100%)",
        WebkitMaskComposite: "source-in",
        maskImage:
          "linear-gradient(to right, transparent 0%, #000 11%, #000 87%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 13%, #000 87%, transparent 100%)",
        maskComposite: "intersect",
      }}
    >
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform">
        <pre
          ref={preRef}
          aria-hidden="true"
          className="m-0 select-none whitespace-pre will-change-transform"
          style={{
            color: RED_HI,
            fontFamily: "'JetBrains Mono', monospace",
            lineHeight: 1,
            letterSpacing: "0.5px",
            textShadow: "0 0 22px rgba(221,35,22,0.4)",
          }}
        />
      </div>
    </div>
  );
}

const LINES = [
  { p: "Hey, I'm Nipun.", em: true },
  { p: "AI engineer. Builder." },
  { p: "I build systems that solve real problems." },
  { p: "Currently building Uni-Verse, an honest, on-the-record platform for college life." },
  { p: "Exploring AI, full-stack, and where they meet." },
  { p: "Focused on learning and shipping." },
];

const SEP = "  ";
const FULL = LINES.map((l) => l.p).join(SEP);
const OFFSETS = (() => {
  let a = 0;
  return LINES.map((l, i) => {
    const o = a;
    a += l.p.length + (i < LINES.length - 1 ? SEP.length : 0);
    return o;
  });
})();
const LINE_ENDS = new Set(OFFSETS.map((o, i) => o + LINES[i].p.length));
const nextWordEnd = (R) => {
  let i = R;
  while (i < FULL.length && FULL[i] === " ") i++;
  while (i < FULL.length && FULL[i] !== " ") i++;
  return i;
};

const SKILLS = [
  { n: "Python", I: SiPython },
  { n: "JavaScript", I: SiJavascript },
  { n: "React", I: SiReact },
  { n: "Node.js", I: SiNodedotjs },
  { n: "Express", I: SiExpress },
  { n: "MongoDB", I: SiMongodb },
  { n: "SQL", I: SiPostgresql },
  { n: "AI / ML", I: Brain },
  { n: "System Design", I: TreeStructure },
  { n: "Git", I: SiGit },
];

const CURRENTLY = ["Building Uni-Verse", "AI Workflow Automation @ impress.ai", "Shipping"];

const LINKS = [
  { I: GithubLogo, label: "github.com/Luc0-0", href: "https://github.com/Luc0-0" },
  { I: LinkedinLogo, label: "linkedin.com/in/nipun-sujesh", href: "https://www.linkedin.com/in/nipun-sujesh" },
  { I: EnvelopeSimple, label: "nipunsujesh28@gmail.com", href: "mailto:nipunsujesh28@gmail.com" },
];

function HeroPanel({ energyRef, glitchRef }) {
  const reduce = useReducedMotion();
  const [reveal, setRevealState] = useState(0);
  const [done, setDone] = useState(false);
  const [runId, setRunId] = useState(0);
  const revealRef = useRef(0);
  const cancelled = useRef(false);

  const setReveal = (v) => {
    revealRef.current = v;
    setRevealState(v);
  };

  useEffect(() => {
    cancelled.current = false;
    setReveal(0);
    setDone(false);
    if (reduce) {
      setReveal(FULL.length);
      setDone(true);
      return;
    }
    let timer;
    const punch = (str) => {
      if (/[.,]$/.test(str)) glitchRef.current = Math.min(1, glitchRef.current + 0.8);
    };
    const tick = () => {
      if (cancelled.current) return;
      const R = nextWordEnd(revealRef.current);
      setReveal(R);
      energyRef.current = Math.min(1, energyRef.current + 0.5);
      hoverTick();
      if (R >= FULL.length) {
        setDone(true);
        confirm();
        return;
      }
      if (LINE_ENDS.has(R)) blip(420, 0.03, 0.018);
      punch(FULL.slice(0, R).trimEnd());
      timer = setTimeout(tick, 80);
    };
    timer = setTimeout(tick, 320);
    return () => {
      cancelled.current = true;
      clearTimeout(timer);
    };
  }, [reduce, runId, energyRef, glitchRef]);

  const skip = () => {
    cancelled.current = true;
    setReveal(FULL.length);
    setDone(true);
  };
  const replay = () => setRunId((r) => r + 1);

  const shown = LINES.map((l, i) => l.p.slice(0, Math.max(0, Math.min(l.p.length, reveal - OFFSETS[i]))));
  const cursorIdx = shown.findIndex((s, i) => s.length < LINES[i].p.length);
  const fadeUp = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay },
  });

  return (
    <div className="flex min-h-0 flex-col">
      <div className="mb-3 flex items-center gap-4">
        <h1
          className="leading-none"
          style={{ fontFamily: "'Jersey 25', monospace", fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)", color: RED, letterSpacing: "0.02em", textShadow: "0 0 30px rgba(221,35,22,0.4)" }}
        >
          ABOUT<span className="term-caret">_</span>
        </h1>
        <button
          onClick={done ? replay : skip}
          onMouseEnter={hoverTick}
          className="mb-2 inline-flex cursor-pointer items-center gap-1.5 self-end rounded-sm border px-2 py-1 text-[10px] tracking-wide transition-colors duration-200 hover:border-[rgba(221,35,22,0.7)] hover:text-[#ece8e3]"
          style={{ borderColor: "rgba(236,232,227,0.16)", color: DIM }}
          aria-label={done ? "Replay intro" : "Skip intro"}
        >
          {done ? <Play size={11} weight="fill" style={{ color: RED }} /> : <FastForward size={11} weight="fill" style={{ color: RED }} />}
          {done ? "replay" : "skip"}
        </button>
      </div>

      <div className="mb-5">
        {LINES.map((l, i) => (
          <p
            key={i}
            className={l.em ? "mb-1 text-base sm:text-lg" : "mb-1 max-w-[54ch] text-sm leading-snug sm:text-[15px]"}
            style={{ color: l.em ? TEXT : BODY, minHeight: shown[i] ? undefined : "1.25em" }}
          >
            {l.em && shown[i] ? (
              <>Hey, I'm <span style={{ color: RED }}>{shown[i].replace("Hey, I'm ", "")}</span></>
            ) : (
              shown[i]
            )}
            {!done && i === cursorIdx && (
              <span className="ml-0.5 inline-block" style={{ animation: "term-blink 1s step-end infinite", color: RED }}>▌</span>
            )}
          </p>
        ))}
      </div>

      <motion.div {...fadeUp(0.05)} className="mb-4">
        <p className="mb-2 text-[11px] tracking-[0.2em]" style={{ color: RED }}>SKILLS:</p>
        <div className="flex flex-wrap gap-2">
          {SKILLS.map(({ n, I }) => (
            <span
              key={n}
              onMouseEnter={hoverTick}
              className="inline-flex cursor-default items-center gap-1.5 rounded-sm border px-2.5 py-1 text-xs transition-colors duration-200 hover:border-[rgba(221,35,22,0.7)] hover:text-[#ece8e3]"
              style={{ borderColor: "rgba(236,232,227,0.16)", color: BODY }}
            >
              <I size={13} style={{ color: RED }} aria-hidden="true" />
              {n}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp(0.15)} className="mb-4">
        <p className="mb-1.5 text-[11px] tracking-[0.2em]" style={{ color: RED }}>CURRENTLY:</p>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm" style={{ color: BODY }}>
          {CURRENTLY.map((c, i) => (
            <span key={c} className="flex items-center gap-3">
              {c}
              {i < CURRENTLY.length - 1 && <span style={{ color: DIM }}>|</span>}
            </span>
          ))}
        </p>
      </motion.div>

      <motion.div {...fadeUp(0.25)}>
        <p className="mb-2 text-[11px] tracking-[0.2em]" style={{ color: RED }}>LET'S CONNECT:</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
          {LINKS.map(({ I, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              onMouseEnter={hoverTick}
              className="group inline-flex cursor-pointer items-center gap-2 transition-colors duration-200"
              style={{ color: BODY }}
            >
              <I size={15} style={{ color: RED }} aria-hidden="true" />
              <span className="border-b border-transparent group-hover:border-[rgba(221,35,22,0.6)] group-hover:text-[#ece8e3]">{label}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function ScrollCue({ onJump }) {
  return (
    <button
      onClick={onJump}
      onMouseEnter={hoverTick}
      className="group absolute bottom-9 left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1 text-[10px] tracking-[0.25em]"
      style={{ color: DIM }}
    >
      <span className="transition-colors duration-200 group-hover:text-[#ece8e3]">SCROLL · SYSTEM TELEMETRY</span>
      <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }} style={{ color: RED }}>▼</motion.span>
    </button>
  );
}

export default function AboutPage() {
  const scrollRef = useRef(null);
  const nextRef = useRef(null);
  const energyRef = useRef(0);
  const glitchRef = useRef(0);

  const jump = () => {
    if (nextRef.current) nextRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <TerminalShell path="~/about" subtitle="system monitor // a person" quiet>
      <div ref={scrollRef} className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <section className="relative flex min-h-full items-center px-6 py-6 sm:px-10">
          <div className="mx-auto grid w-full max-w-[1480px] items-center gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            <div className="-ml-6 h-[44vh] sm:-ml-10 sm:h-[56vh] lg:h-[88vh]">
              <AsciiField energyRef={energyRef} glitchRef={glitchRef} />
            </div>
            <HeroPanel energyRef={energyRef} glitchRef={glitchRef} />
          </div>
          <ScrollCue onJump={jump} />
        </section>

        <section ref={nextRef} className="relative min-h-full border-t" style={{ borderColor: "rgba(236,232,227,0.08)" }}>
          <AboutSystem />
        </section>

        <section className="relative min-h-full border-t" style={{ borderColor: "rgba(236,232,227,0.08)" }}>
          <AboutMap />
        </section>

        <section className="relative border-t" style={{ borderColor: "rgba(236,232,227,0.08)" }}>
          <AboutTimeline />
        </section>
      </div>
    </TerminalShell>
  );
}
