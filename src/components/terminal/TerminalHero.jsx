import React, { memo, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { blip } from "./sound";
import { useSEO } from "./useSEO";
import PixelTitle from "./PixelTitle";
import BootSequence from "./BootSequence";

// Emil's strong ease-out. One orchestrated load, then stillness.
const EASE = [0.23, 1, 0.32, 1];

const BG = "#000000";
const TEXT = "#ece8e3";
const SECOND = "#8a857f";
const DIM = "#4f4a45";
const RED = "#dd2316";
const RED_DEEP = "#70180f";
const BORDER = "rgba(236,232,227,0.08)";
const BORDER_RED = "rgba(221,35,22,0.30)";

const STATS = [
  { label: "PROJECTS SHIPPED", value: "12+", fill: 0.7 },
  { label: "AI APPLICATIONS", value: "8+", fill: 0.55 },
  { label: "CURRENT", current: true },
  { label: "YEARS CODING", value: "4+", fill: 0.4 },
];

const SYS = [
  { k: "CPU", v: "18%", fill: 0.18 },
  { k: "MEM", v: "24%", fill: 0.24 },
  { k: "DISK", v: "31%", fill: 0.31 },
  { k: "NET", v: "42 KB/s", fill: 0.5 },
];

const FOCUS = [
  ["AI", "FULL STACK"],
  ["PRODUCTS", "SYSTEMS"],
  ["LEARNING", "SHIPPING"],
];

// "Uni-Verse" name. Links to the live site; `withCard` adds the hover preview.
function UniVerseTag({ withCard = false }) {
  return (
    <span className="group relative inline-flex items-center gap-1.5 align-baseline">
      {withCard && <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: RED }} />}
      <a
        href="https://uni-verse.co.in"
        target="_blank"
        rel="noreferrer"
        className="cursor-pointer text-[#a8392e] transition-colors hover:text-[#ff3a2a] focus-visible:text-[#ff3a2a] focus-visible:outline-none"
        style={{ borderBottom: "1px dotted rgba(221,35,22,0.5)" }}
        onMouseEnter={() => blip(720)}
      >
        Uni-Verse
      </a>
      {withCard && (
        <span className="pointer-events-none absolute bottom-full left-0 z-50 mb-2 hidden w-72 group-hover:block">
          <span className="block rounded-md border p-3 text-left" style={{ borderColor: BORDER_RED, backgroundColor: "rgba(6,6,6,0.97)" }}>
            <span className="mb-1.5 flex items-center gap-2 text-[11px] tracking-widest" style={{ color: RED }}>
              ✶ UNI-VERSE
              <span className="ml-auto rounded px-1.5 py-0.5 text-[9px]" style={{ backgroundColor: "rgba(221,35,22,0.15)" }}>
                BUILDING
              </span>
            </span>
            <span className="block text-[12px] leading-relaxed" style={{ color: SECOND }}>
              An honest, on-the-record platform for college life. Verified student voices, kept public.
            </span>
            <span className="mt-2 block text-[11px]" style={{ color: DIM }}>↵ open uni-verse.co.in</span>
          </span>
        </span>
      )}
    </span>
  );
}

function BarMeter({ fill, count = 10, w = 60 }) {
  const reduce = useReducedMotion();
  const n = Math.round(fill * count);
  const seg = w / count;
  const bw = seg * 0.58;
  return (
    <svg width={w} height="12" viewBox={`0 0 ${w} 12`} fill="none" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => {
        const on = i < n;
        const tall = i % 2 === 0;
        return (
          <rect
            key={i}
            x={i * seg + 0.5}
            y={tall ? 1.5 : 3.5}
            width={bw}
            height={tall ? 9 : 5}
            rx="0.4"
            fill={on ? RED : "rgba(140,133,127,0.2)"}
            className={on && i === n - 1 && !reduce ? "term-pulse" : undefined}
          />
        );
      })}
    </svg>
  );
}

function NetSparkline() {
  const reduce = useReducedMotion();
  return (
    <svg width="58" height="12" viewBox="0 0 58 12" fill="none" aria-hidden="true">
      <path id="netpath" d="M0,8 L7,5 L13,9 L20,3 L27,7 L34,2 L41,8 L48,4 L58,6" stroke={RED} strokeWidth="1.2" />
      {!reduce && (
        <circle r="1.5" fill={RED}>
          <animateMotion dur="2.6s" repeatCount="indefinite">
            <mpath href="#netpath" />
          </animateMotion>
        </circle>
      )}
    </svg>
  );
}

function Goal({ side, pulsing }) {
  const B = "rgba(221,35,22,0.9)";
  const D = "rgba(221,35,22,0.32)";
  return (
    <svg
      width="76"
      height="72"
      viewBox="0 0 76 72"
      aria-hidden="true"
      className={pulsing ? "net-pulse" : ""}
      style={{ transform: `scaleX(${side === "r" ? -1 : 1})`, "--mir": side === "r" ? -1 : 1, "--netdir": "-2px" }}
    >
      <g fill="none">
        {/* A=near post base, B=near post top, A2/B2=far post (into screen), T/T2=net top-back, C/C2=net bottom-back */}
        <line x1="58" y1="62" x2="24" y2="54" stroke={D} strokeWidth="0.9" />
        <line x1="41" y1="18" x2="24" y2="54" stroke={D} strokeWidth="0.9" />
        <line x1="55" y1="6" x2="38" y2="42" stroke={D} strokeWidth="0.9" />
        <line x1="41" y1="18" x2="55" y2="6" stroke={D} strokeWidth="0.9" />
        <line x1="24" y1="54" x2="38" y2="42" stroke={D} strokeWidth="0.9" />
        <line x1="58" y1="22" x2="41" y2="18" stroke={D} strokeWidth="0.9" />
        <line x1="72" y1="10" x2="55" y2="6" stroke={D} strokeWidth="0.9" />
        {[0.33, 0.66].map((t) => (
          <line key={`m${t}`} x1={58 + (41 - 58) * t} y1={22 + (18 - 22) * t} x2={58 + (24 - 58) * t} y2={62 + (54 - 62) * t} stroke={D} strokeWidth="0.5" />
        ))}
        {[0.33, 0.66].map((t) => (
          <line key={`t${t}`} x1={58 + (72 - 58) * t} y1={22 + (10 - 22) * t} x2={41 + (55 - 41) * t} y2={18 + (6 - 18) * t} stroke={D} strokeWidth="0.5" />
        ))}
        <line x1="58" y1="62" x2="72" y2="50" stroke={D} strokeWidth="0.8" />
        <line x1="58" y1="62" x2="58" y2="22" stroke={B} strokeWidth="2.2" />
        <line x1="72" y1="50" x2="72" y2="10" stroke={B} strokeWidth="1.6" />
        <line x1="58" y1="22" x2="72" y2="10" stroke={B} strokeWidth="2" />
      </g>
    </svg>
  );
}

function Ticker({ m }) {
  const [i, setI] = useState(0);
  const items = [];
  if (m.goals?.length) {
    for (const g of [...m.goals].reverse()) items.push(`⚽ ${g.m != null ? g.m + "'" : ""} ${g.p} (${g.side === "h" ? m.home : m.away})`);
  }
  if (m.stage) items.push(m.stage.toLowerCase().replace(/_/g, " "));
  if (m.matchday) items.push(`matchday ${m.matchday}`);
  if (m.venue) items.push(m.venue.toLowerCase());
  if (!m.live) items.push("kickoff " + new Date(m.utcDate).toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }) + " IST");
  useEffect(() => {
    if (items.length < 2) return undefined;
    const id = setInterval(() => setI((v) => v + 1), 4200);
    return () => clearInterval(id);
  }, [items.length]);
  if (!items.length) return null;
  const cur = items[i % items.length];
  return (
    <div className="hidden w-40 self-center overflow-hidden border-l pb-1 pl-4 md:block" style={{ borderColor: BORDER_RED }}>
      <p className="text-[9px] tracking-widest" style={{ color: RED }}>MATCH FEED</p>
      <motion.p
        key={cur}
        initial={{ opacity: 0, rotateX: 80 }}
        animate={{ opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="mt-1 truncate text-[11px]"
        style={{ color: SECOND, transformOrigin: "bottom" }}
        title={cur}
      >
        {cur}
      </motion.p>
    </div>
  );
}

function LiveScore() {
  const [m, setM] = useState(null);
  const [kick, setKick] = useState(null);
  const [, forceTick] = useState(0);
  const kickN = useRef(0);
  const prev = useRef(null);
  const fetchedAt = useRef(0);

  useEffect(() => {
    const id = setInterval(() => forceTick((v) => v + 1), 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("demo")) {
      const base = { live: true, comp: "WC", home: "FRA", away: "MAR", status: "IN_PLAY", utcDate: new Date().toISOString(), goals: [] };
      const steps = [
        [0, { hs: 0, as: 0, minute: 12 }, null],
        [4000, { hs: 1, as: 0, minute: 14, goals: [{ m: 14, p: "Mbappé", side: "h" }] }, "r"],
        [10000, { hs: 1, as: 1, minute: 31, goals: [{ m: 31, p: "Hakimi", side: "a" }] }, "l"],
        [16000, { hs: 2, as: 1, minute: 52, goals: [{ m: 52, p: "Dembélé", side: "h" }] }, "r"],
        [21000, { hs: 2, as: 2, minute: 67, goals: [{ m: 67, p: "En-Nesyri", side: "a" }] }, "l"],
        [27000, { hs: 3, as: 2, minute: 89, goals: [{ m: 89, p: "Mbappé", side: "h" }] }, "r"],
      ];
      let acc = [];
      const timers = steps.map(([t, s, side]) =>
        setTimeout(() => {
          acc = [...acc, ...(s.goals || [])];
          setM({ ...base, ...s, goals: acc });
          if (side) fire(side);
        }, t)
      );
      return () => timers.forEach(clearTimeout);
    }
    let alive = true;
    const load = async () => {
      if (document.hidden) return;
      try {
        const r = await fetch("/api/scores");
        if (!r.ok || r.status === 204) return;
        const j = await r.json();
        if (!alive || !j) return;
        if (prev.current && j.live) {
          if ((j.hs ?? 0) > (prev.current.hs ?? 0)) fire("r");
          else if ((j.as ?? 0) > (prev.current.as ?? 0)) fire("l");
        }
        prev.current = j;
        fetchedAt.current = Date.now();
        setM(j);
      } catch {
        /* hide */
      }
    };
    load();
    const id = setInterval(load, 60000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const fire = (side) => {
    kickN.current += 1;
    setKick({ side, n: kickN.current });
  };

  if (!m) return null;
  const when = new Date(m.utcDate).toLocaleString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });

  return (
    <div className="mt-6 inline-flex items-end gap-4" style={{ opacity: 0.85 }}>
      <div className="relative inline-flex items-end gap-4">
      <Goal side="l" pulsing={kick && kick.side === "l"} key={`gl-${kick?.side === "l" ? kick.n : 0}`} />
      <div className="min-w-[170px] pb-3 text-center">
        <p className="mb-1 flex items-center justify-center gap-2 text-[10px] tracking-widest" style={{ color: RED }}>
          {m.live ? "LIVE" : "NEXT"} // {m.comp || "FOOTBALL"}
          {m.live && <span className="term-pulse">●</span>}
        </p>
        {m.live ? (
          <p className="text-base tabular-nums" style={{ color: TEXT }}>
            {m.home} <span style={{ color: RED }}>{m.hs ?? 0} — {m.as ?? 0}</span> {m.away}
            {m.status === "PAUSED" ? (
              <span className="ml-2 text-[11px]" style={{ color: SECOND }}>HT</span>
            ) : (
              m.minute != null && (
                <span className="ml-2 text-[11px]" style={{ color: SECOND }}>
                  {Math.min(Number(m.minute) + (fetchedAt.current ? Math.floor((Date.now() - fetchedAt.current) / 60000) : 0), 90)}'
                </span>
              )
            )}
          </p>
        ) : (
          <>
            <p className="text-sm" style={{ color: TEXT }}>{m.home} <span style={{ color: RED }}>vs</span> {m.away}</p>
            <p className="mt-0.5 text-[11px]" style={{ color: SECOND }}>{when} IST</p>
          </>
        )}
      </div>
      <Goal side="r" pulsing={kick && kick.side === "r"} key={`gr-${kick?.side === "r" ? kick.n : 0}`} />
      {kick && (
        <span
          key={`ball-${kick.n}`}
          aria-hidden="true"
          className={`absolute left-1/2 h-2.5 w-2.5 rounded-full ${kick.side === "l" ? "kick-l" : "kick-r"}`}
          style={{ bottom: 14, marginLeft: -5, background: "#ece8e3", boxShadow: `0 0 8px rgba(221,35,22,0.8), inset -1px -1px 0 rgba(221,35,22,0.6)`, opacity: 0 }}
        />
      )}
      </div>
      <Ticker m={m} />
    </div>
  );
}

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now.toLocaleTimeString("en-GB", { hour12: false, timeZone: "Asia/Kolkata" });
}

const TerminalHero = memo(() => {
  const reduce = useReducedMotion();
  const time = useClock();
  const gridRef = useRef(null);
  useSEO();

  const onPointerMove = (e) => {
    if (reduce) return;
    const el = gridRef.current;
    if (el) {
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    }
  };

  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay, ease: EASE },
  });

  return (
    <section
      className="relative flex h-[100dvh] w-full flex-col overflow-hidden"
      style={{ backgroundColor: BG, color: TEXT, fontFamily: "'JetBrains Mono', monospace", "--color-accent": RED }}
      onMouseMove={onPointerMove}
    >
      <BootSequence />

      {/* Blueprint grid: 3 layers (24 / 8 / 2px dots), one composited paint. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: [
            "linear-gradient(rgba(170,160,155,0.05) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(170,160,155,0.05) 1px, transparent 1px)",
            "linear-gradient(rgba(170,160,155,0.028) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(170,160,155,0.028) 1px, transparent 1px)",
            "radial-gradient(rgba(221,35,22,0.11) 0.6px, transparent 0.7px)",
          ].join(", "),
          backgroundSize: "24px 24px, 24px 24px, 8px 8px, 8px 8px, 2px 2px",
        }}
      />

      {/* Cursor-reactive grid */}
      <div
        ref={gridRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(221,35,22,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(221,35,22,0.55) 1px, transparent 1px)",
          backgroundSize: "13px 13px",
          opacity: 0.55,
          WebkitMaskImage: "radial-gradient(170px circle at var(--mx, -200px) var(--my, -200px), #000 0%, rgba(0,0,0,0.5) 45%, transparent 68%)",
          maskImage: "radial-gradient(170px circle at var(--mx, -200px) var(--my, -200px), #000 0%, rgba(0,0,0,0.5) 45%, transparent 68%)",
        }}
      />

      {/* Red data-corruption overlay */}
      <img
        src="/images/overlay.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full object-cover"
        style={{ mixBlendMode: "screen", opacity: 0.55 }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: "radial-gradient(120% 100% at 50% 38%, transparent 55%, rgba(0,0,0,0.6) 100%)" }}
      />

      {/* ── Top status bar (above the portrait) ── */}
      <motion.header
        {...rise(0.04)}
        className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-4 py-2.5 text-[11px] sm:px-6"
        style={{ color: "#ffffff", textShadow: "0 1px 3px rgba(0,0,0,0.95)", background: "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)" }}
      >
        <span className="flex items-center gap-2">
          <span style={{ color: RED }}>✶</span>
          welcome to nipun.os · portfolio v1
        </span>
        <span className="flex items-center gap-3">
          <span style={{ color: RED }}>◉</span>
          <span className="tabular-nums">{time}</span>
          <span style={{ color: DIM }}>|</span>
          <span className="hidden sm:inline">IST</span>
          <span style={{ color: DIM }}>|</span>
          <span>online</span>
          <span style={{ color: DIM }}>[_]</span>
        </span>
      </motion.header>

      {/* ── Main two-column body ── */}
      <div className="relative z-30 grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[58%_42%]">
        {/* LEFT */}
        <div className="flex min-h-0 flex-col justify-start px-4 pb-16 pt-14 sm:px-8 sm:pt-16 lg:border-r" style={{ borderColor: BORDER }}>
          <div className="shrink-0">
            <motion.div {...rise(0.14)} className="select-none">
              <PixelTitle lines={["NIPUN", "SUJESH"]} fill={RED} shadow={RED_DEEP} style={{ width: "clamp(210px, 33vw, 480px)", height: "auto" }} />
            </motion.div>

            <motion.div {...rise(0.4)} className="mt-10 flex items-start gap-2">
              <span style={{ color: RED }}>›</span>
              <div className="max-w-[52ch] text-[13px] leading-relaxed sm:text-[15px]">
                <p style={{ color: TEXT }}>AI engineer building production AI systems and the full-stack around them.</p>
                <p className="mt-1.5" style={{ color: SECOND }}>
                  Currently building <UniVerseTag />, an on-the-record platform for college life.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div {...rise(0.48)} className="mt-8 h-px w-full max-w-[52ch]" style={{ backgroundColor: BORDER }} />
          {/* Metrics */}
          <motion.div {...rise(0.52)} className="mt-7 grid shrink-0 grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4" style={{ opacity: 0.6 }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-[10px] tracking-wider" style={{ color: SECOND }}>{s.label}</p>
                <div className="mt-1 flex items-center gap-2 text-sm">
                  {s.current ? (
                    <UniVerseTag withCard />
                  ) : (
                    <>
                      <span className="text-lg font-medium tabular-nums" style={{ color: RED }}>{s.value}</span>
                      <BarMeter fill={s.fill} />
                    </>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div {...rise(0.6)}>
            <LiveScore />
          </motion.div>
        </div>

        {/* RIGHT — portrait (upper) + widgets (lower) */}
        <motion.div {...rise(0.3)} className="relative hidden min-h-0 flex-col overflow-hidden pb-16 pl-3 pr-0 pt-0 sm:pl-4 lg:flex">
          <div className="relative min-h-0 flex-1">
            <img
              src="/images/nipun.png"
              alt="Nipun Sujesh"
              className="absolute inset-0 h-full w-full object-cover object-center"
              style={{
                transform: "scale(1.06)",
                maskImage: "radial-gradient(ellipse 80% 84% at 60% 42%, #000 46%, transparent 84%)",
                WebkitMaskImage: "radial-gradient(ellipse 80% 84% at 60% 42%, #000 46%, transparent 84%)",
              }}
            />
          </div>

          <div className="relative z-10 mt-auto grid shrink-0 grid-cols-2 gap-3" style={{ opacity: 0.7 }}>
            <div className="rounded-md border p-3" style={{ borderColor: BORDER_RED }}>
              <p className="mb-2 text-[10px] tracking-widest" style={{ color: RED }}>SYSTEM</p>
              <div className="space-y-1.5">
                {SYS.map((s) => (
                  <div key={s.k} className="flex items-center gap-2 text-[11px]">
                    <span className="w-9" style={{ color: SECOND }}>{s.k}</span>
                    <span className="w-12 tabular-nums" style={{ color: TEXT }}>{s.v}</span>
                    {s.k === "NET" ? <NetSparkline /> : <BarMeter fill={s.fill} />}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-md border p-3" style={{ borderColor: BORDER_RED }}>
              <p className="mb-2 text-[10px] tracking-widest" style={{ color: RED }}>FOCUS</p>
              <div className="space-y-1.5 text-[11px]">
                {FOCUS.map(([a, b]) => (
                  <div key={a} className="flex items-center gap-2">
                    <span className="w-20" style={{ color: TEXT }}>{a}</span>
                    <span style={{ color: RED }}>×</span>
                    <span style={{ color: SECOND }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

TerminalHero.displayName = "TerminalHero";
export default TerminalHero;
