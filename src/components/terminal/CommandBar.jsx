import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { blip, confirm } from "./sound";
import { COMMANDS, RESUME_PATH, RESUME_FILE } from "./commands";
import { useVisited } from "./useVisited";

const EASE = [0.23, 1, 0.32, 1];
const RED = "#dd2316";
const TEXT = "#ece8e3";
const SECOND = "#8a857f";
const DIM = "#4f4a45";
const BG = "#000000";
const BORDER = "rgba(236,232,227,0.08)";
const BORDER_RED = "rgba(221,35,22,0.30)";
const HILITE = "rgba(221,35,22,0.12)";

const THINK_WORDS = [
  "Cogitating",
  "Querying Nipun",
  "Compiling thoughts",
  "Synthesizing",
  "Shipping",
  "Reticulating splines",
  "Caffeinating",
];
const SPIN = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

function ThinkingLine() {
  const reduce = useReducedMotion();
  const [spin, setSpin] = useState(0);
  const [word, setWord] = useState(0);
  useEffect(() => {
    if (reduce) return undefined;
    const a = setInterval(() => setSpin((v) => (v + 1) % SPIN.length), 95);
    const b = setInterval(() => setWord((v) => (v + 1) % THINK_WORDS.length), 2300);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, [reduce]);
  return (
    <div className="flex items-center gap-2.5 px-2 py-3 text-sm" style={{ color: SECOND }}>
      <span style={{ color: RED, width: "1ch", display: "inline-block" }}>{reduce ? "✶" : SPIN[spin]}</span>
      <span>
        {THINK_WORDS[word]}
        <span style={{ color: DIM }}>…</span>
      </span>
      <span className="ml-1 text-[11px]" style={{ color: DIM }}>
        press <span style={{ color: RED }}>/</span> to run a command
      </span>
    </div>
  );
}

export default function CommandBar() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();
  const { visited, mark } = useVisited();
  const inputRef = useRef(null);
  const tickRef = useRef(null);
  const [value, setValue] = useState("");
  const [sel, setSel] = useState(0);
  const [uptime, setUptime] = useState("0m 00s");

  useEffect(() => {
    mark(location.pathname);
  }, [location.pathname, mark]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement;
      const tag = el?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || el?.isContentEditable) return;
      e.preventDefault();
      setValue("/");
      setSel(0);
      inputRef.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000);
      setUptime(`${Math.floor(s / 60)}m ${String(s % 60).padStart(2, "0")}s`);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const query = value.trim().toLowerCase();
  const open = query.length > 0;
  const filtered = useMemo(() => {
    if (!open) return [];
    const q = query.replace(/^\//, "");
    return COMMANDS.filter((c) => c.cmd.toLowerCase().includes(q));
  }, [open, query]);
  const safeSel = Math.min(sel, Math.max(0, filtered.length - 1));

  const run = (c) => {
    if (!c) return;
    if (c.download) {
      const a = document.createElement("a");
      a.href = RESUME_PATH;
      a.download = RESUME_FILE;
      a.click();
      return;
    }
    if (c.help) {
      setValue("/");
      setSel(0);
      inputRef.current?.focus();
      return;
    }
    if (c.external) {
      window.open(c.external, "_blank", "noreferrer");
      setValue("");
      return;
    }
    if (c.to) {
      navigate(c.to);
      setValue("");
    }
  };

  const onKeyDown = (e) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      blip();
      setSel((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      blip();
      setSel((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      confirm();
      run(filtered[safeSel]);
    } else if (e.key === "Escape") {
      setValue("");
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
    setSel(0);
    if (navigator.vibrate) navigator.vibrate(5);
    const el = tickRef.current;
    if (el && !reduce) {
      el.style.transform = "scale(1.3)";
      clearTimeout(el._t);
      el._t = setTimeout(() => {
        el.style.transform = "scale(1)";
      }, 70);
    }
  };

  const path = location.pathname === "/" ? "~/nipun.os" : `~/nipun.os${location.pathname}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      {/* menu / thinking opens upward above the bar */}
      <div className="absolute bottom-full left-0 w-full px-4 pb-2 sm:px-6 lg:w-[58%]">
        {open ? (
          <div className="overflow-hidden rounded-md border" style={{ borderColor: BORDER_RED, borderStyle: "dashed", backgroundColor: BG }}>
            {filtered.length === 0 ? (
              <div className="px-3 py-3 text-[13px]" style={{ color: DIM }}>
                no command matches "{value}"
              </div>
            ) : (
              filtered.map((c, i) => {
                const active = i === safeSel;
                const seen = c.to && visited.has(c.to);
                return (
                  <button
                    key={c.cmd}
                    type="button"
                    onMouseEnter={() => {
                      if (i !== safeSel) blip();
                      setSel(i);
                    }}
                    onClick={() => run(c)}
                    className="flex w-full items-center gap-2.5 py-[6px] pl-2 pr-3 text-left text-[11px] sm:text-[13px]"
                    style={{ backgroundColor: active ? HILITE : "transparent" }}
                  >
                    <span style={{ width: 3, alignSelf: "stretch", backgroundColor: active ? RED : "transparent" }} />
                    <span className={`w-24 shrink-0 sm:w-28 ${c.special ? "cmd-rainbow" : ""}`} style={c.special ? undefined : { color: active ? TEXT : SECOND }}>
                      {c.cmd}
                    </span>
                    <span className="flex-1 truncate" style={{ color: active ? "#b8b3ac" : DIM }}>
                      {c.desc}
                    </span>
                    {seen && (
                      <span className="shrink-0" style={{ color: active ? RED : "#6b6660" }} title="visited">
                        ✓
                      </span>
                    )}
                    {active && <span className="ml-2 shrink-0" style={{ color: RED }}>↵</span>}
                  </button>
                );
              })
            )}
          </div>
        ) : (
          <ThinkingLine />
        )}
      </div>

      {/* pinned input bar */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
        className="flex items-center justify-between gap-4 border-t px-4 py-2.5 text-[11px] sm:px-6"
        style={{ borderColor: BORDER, color: SECOND, backgroundColor: "rgba(0,0,0,0.82)", backdropFilter: "blur(6px)" }}
      >
        <span className="flex min-w-0 flex-1 items-center gap-2 text-sm">
          <span ref={tickRef} style={{ color: RED, display: "inline-block", transition: "transform 0.08s ease-out" }}>❯</span>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="type / for commands"
            aria-label="terminal command input"
            spellCheck={false}
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#c56b60] focus:outline-none focus-visible:outline-none"
            style={{ color: "#d6d2cc", caretColor: RED }}
          />
        </span>
        <span className="hidden items-center gap-3 sm:flex">
          <span>{path}</span>
          <span style={{ color: DIM }}>|</span>
          <span className="tabular-nums">◷ {uptime}</span>
          <span style={{ color: DIM }}>|</span>
          <span className="inline-flex items-center gap-1.5">
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true">
              <polyline points="0,5 4,5 6,1 9,9 12,3 14,5 20,5" stroke={RED} strokeWidth="1.2" />
            </svg>
            ready
          </span>
        </span>
      </motion.div>
    </div>
  );
}
