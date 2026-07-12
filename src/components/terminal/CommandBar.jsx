import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { blip, confirm } from "./sound";
import { COMMANDS, RESUME_PATH, RESUME_FILE } from "./commands";
import { useVisited } from "./useVisited";
import { askStream } from "./rag";

const EASE = [0.23, 1, 0.32, 1];
const RED = "#dd2316";
const TEXT = "#ece8e3";
const SECOND = "#8a857f";
const DIM = "#4f4a45";
const BG = "#000000";
const BORDER = "rgba(236,232,227,0.08)";
const BORDER_RED = "rgba(221,35,22,0.30)";
const HILITE = "rgba(221,35,22,0.12)";

const SAFE_PAGES = new Set(["/", "/work", "/work/serenity", "/work/pragati", "/work/guardia", "/work/samarth", "/work/uni-verse", "/work/godprofile", "/about", "/skills", "/services", "/achievements", "/writing", "/opensource", "/contact", "resume"]);

const NAV = [
  { label: "work", to: "/work" },
  { label: "about", to: "/about" },
  { label: "skills", to: "/skills" },
  { label: "services", to: "/services" },
  { label: "writing", to: "/writing" },
  { label: "contact", to: "/contact" },
];

function parseAnswer(raw) {
  const navs = [];
  const addNav = (page, label) => {
    if (SAFE_PAGES.has(page) && !navs.some((n) => n.page === page))
      navs.push({ page, label: label || (page === "resume" ? "download the resume" : `take me to ${page}`) });
  };
  const display = raw
    .replace(/@@NAV(\{[^@]*\})@@/g, (_, json) => {
      try {
        const a = JSON.parse(json);
        addNav(a.page, a.label);
      } catch {
        /* ignore bad marker */
      }
      return "";
    })
    .replace(/\[[A-Za-z_ ]*\]?\s*\{[^{}]*"page"[^{}]*\}/g, (block) => {
      const page = (block.match(/"page"\s*:\s*"([^"]+)"/) || [])[1];
      const label = (block.match(/"label"\s*:\s*"([^"]+)"/) || [])[1];
      if (page) addNav(page, label);
      return "";
    })
    .replace(/@@NAV[^@]*$/, "")
    .trim();
  return { display, navs };
}

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
  const [ask, setAsk] = useState(null);
  const askRun = useRef(0);
  const [listening, setListening] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pop, setPop] = useState(false);
  const [placeholder] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches ? "ask LucBot · / for commands" : "type / for commands · or ask LucBot anything"
  );
  const recRef = useRef(null);
  const SR = typeof window !== "undefined" && (window.SpeechRecognition || window.webkitSpeechRecognition);

  const toggleMic = () => {
    if (!SR) return;
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const rec = new SR();
    recRef.current = rec;
    rec.lang = "en-IN";
    rec.interimResults = true;
    rec.onresult = (e) => {
      const t = [...e.results].map((r) => r[0].transcript).join("");
      setValue(t);
    };
    rec.onend = () => {
      setListening(false);
      inputRef.current?.focus();
    };
    rec.onerror = () => setListening(false);
    blip(700, 0.05, 0.04);
    setListening(true);
    rec.start();
  };

  useEffect(() => {
    mark(location.pathname);
  }, [location.pathname, mark]);

  // pop the bar on non-home routes so people learn navigation lives here
  useEffect(() => {
    if (location.pathname === "/") return undefined;
    setPop(true);
    const t = setTimeout(() => setPop(false), 950);
    return () => clearTimeout(t);
  }, [location.pathname]);

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

  const openBar = () => {
    if (!value) {
      setValue("/");
      setSel(0);
    }
    inputRef.current?.focus();
  };

  const query = value.trim().toLowerCase();
  const isCmd = query.startsWith("/");
  const open = isCmd && query.length > 0;
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

  const doAsk = async (q) => {
    const run = ++askRun.current;
    confirm();
    setAsk({ q, text: "", status: "thinking", sources: [] });
    setValue("");
    try {
      const route = location.pathname === "/" ? "/" : location.pathname;
      const sources = await askStream(q, route, (tok) => {
        if (askRun.current !== run) return;
        setAsk((a) => (a ? { ...a, status: "streaming", text: a.text + tok } : a));
      });
      if (askRun.current === run)
        setAsk((a) => {
          if (!a) return a;
          const hasContent = parseAnswer(a.text).display || parseAnswer(a.text).navs.length;
          return { ...a, status: "done", sources, text: hasContent ? a.text : "static on the line, no answer came through. ask again." };
        });
    } catch (err) {
      if (askRun.current === run) setAsk((a) => (a ? { ...a, status: "error", text: err.message } : a));
    }
  };

  const runNav = (n) => {
    confirm();
    if (n.page === "resume") {
      const a = document.createElement("a");
      a.href = RESUME_PATH;
      a.download = RESUME_FILE;
      a.click();
    } else {
      navigate(n.page);
      setAsk(null);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape" && ask) {
      askRun.current++;
      setAsk(null);
      setValue("");
      return;
    }
    if (e.key === "Enter" && !value.trim() && ask?.status === "done") {
      const navs = parseAnswer(ask.text).navs;
      if (navs.length) {
        e.preventDefault();
        runNav(navs[0]);
        return;
      }
    }
    if (e.key === "Enter" && !isCmd && value.trim()) {
      e.preventDefault();
      doAsk(value.trim());
      return;
    }
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
                    className="flex w-full items-center gap-2.5 py-2.5 pl-2 pr-3 text-left text-[12px] sm:py-[6px] sm:text-[13px]"
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
            <div className="flex items-center gap-2 border-t px-3 py-1.5 text-[10.5px]" style={{ borderColor: BORDER, color: DIM }}>
              <span style={{ color: SECOND }}>↑↓</span> move
              <span style={{ color: SECOND }}>↵</span> open
              <span className="ml-auto">clear <kbd className="rounded border px-1" style={{ borderColor: BORDER_RED, color: RED }}>/</kbd> and type to ask about me</span>
            </div>
          </div>
        ) : ask ? (
          <div className="overflow-hidden rounded-md border px-4 py-3" style={{ borderColor: BORDER_RED, borderStyle: "dashed", backgroundColor: BG }}>
            <div className="mb-2 flex items-start justify-between gap-3">
              <p className="min-w-0 flex-1 text-[13px]" style={{ color: RED }}>&gt; {ask.q}</p>
              <button
                onClick={() => {
                  askRun.current++;
                  setAsk(null);
                }}
                aria-label="Clear answer"
                className="grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-sm border text-[12px] sm:hidden"
                style={{ borderColor: "rgba(236,232,227,0.2)", color: SECOND }}
              >
                ✕
              </button>
            </div>
            <p className="max-h-48 overflow-y-auto whitespace-pre-wrap text-[13px] leading-relaxed [&::-webkit-scrollbar]:hidden" style={{ color: ask.status === "error" ? "#c56b60" : "#c9c4bd" }}>
              {ask.status === "thinking" ? "retrieving…" : parseAnswer(ask.text).display || (parseAnswer(ask.text).navs.length ? "on it. one click away." : "")}
              {(ask.status === "thinking" || ask.status === "streaming") && <span className="term-caret" style={{ color: RED }}>▌</span>}
            </p>
            {parseAnswer(ask.text).navs.length > 0 && (
              <div className="mt-2 flex flex-wrap justify-end gap-2">
                {parseAnswer(ask.text).navs.map((n) => (
                  <button
                    key={n.page}
                    onClick={() => runNav(n)}
                    onMouseEnter={() => blip()}
                    className="group inline-flex cursor-pointer items-center gap-1.5 rounded px-2.5 py-[3px] text-[10.5px] font-medium text-white transition-all duration-150 ease-out hover:-translate-y-px hover:brightness-110 active:translate-y-px"
                    style={{
                      backgroundColor: "#d31f12",
                      boxShadow: "0 2px 0 #6e0f06, 0 3px 10px rgba(221,35,22,0.3)",
                    }}
                    onMouseDown={(e) => (e.currentTarget.style.boxShadow = "0 1px 0 #6e0f06, 0 1px 4px rgba(221,35,22,0.25)")}
                    onMouseUp={(e) => (e.currentTarget.style.boxShadow = "0 2px 0 #6e0f06, 0 3px 10px rgba(221,35,22,0.3)")}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 2px 0 #6e0f06, 0 3px 10px rgba(221,35,22,0.3)")}
                  >
                    <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.85)" }}>↵</span>
                    {n.label}
                  </button>
                ))}
              </div>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px]" style={{ color: DIM }}>
              {ask.sources.map((s) => (
                <button
                  key={s.page + s.title}
                  onClick={() => {
                    confirm();
                    navigate(s.page.startsWith("/writing") || s.page.startsWith("/work") ? s.page : s.page);
                    setAsk(null);
                  }}
                  className="cursor-pointer border-b border-transparent transition-colors duration-200 hover:border-[rgba(221,35,22,0.6)] hover:text-[#ece8e3]"
                >
                  from {s.page}
                </button>
              ))}
              <span className="ml-auto"><span className="hidden sm:inline">esc to clear · </span>answers from site data only</span>
            </div>
          </div>
        ) : (
          <ThinkingLine />
        )}
      </div>

      {/* mobile destination strip (desktop uses the side wheel) */}
      <div
        className="flex items-center gap-1.5 border-t px-4 py-1.5 sm:px-6 lg:hidden"
        style={{ borderColor: BORDER, backgroundColor: "rgba(0,0,0,0.82)", backdropFilter: "blur(6px)" }}
      >
        <span className="hidden shrink-0 items-center gap-1 text-[12px] sm:flex" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          <span style={{ color: RED }}>❯</span>
          <span style={{ color: DIM }}>cd&nbsp;~/</span>
        </span>
        <div className="flex flex-1 items-center gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {NAV.map((n) => {
            const active = location.pathname === n.to || location.pathname.startsWith(n.to + "/");
            return (
              <button
                key={n.to}
                onClick={() => {
                  confirm();
                  navigate(n.to);
                }}
                onMouseEnter={() => blip()}
                className="shrink-0 rounded px-2.5 py-1 text-[12px] transition-colors duration-150"
                style={{ color: active ? RED : SECOND, backgroundColor: active ? HILITE : "transparent" }}
              >
                {n.label}
                {active && <span style={{ color: RED }}> ●</span>}
              </button>
            );
          })}
        </div>
        <span className="ml-1 hidden shrink-0 text-[10px] sm:inline" style={{ color: DIM }}>
          or type <span style={{ color: RED }}>/</span> for all
        </span>
      </div>

      {/* pinned input bar */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
        className="flex items-center justify-between gap-4 border-t px-4 py-2.5 text-[11px] sm:px-6"
        style={{ borderColor: BORDER, color: SECOND, backgroundColor: "rgba(0,0,0,0.82)", backdropFilter: "blur(6px)" }}
      >
        <div
          onClick={openBar}
          className={`flex min-w-0 flex-1 cursor-text items-center gap-2 rounded-md border px-3 py-2 text-sm transition-all duration-200 ${pop && !focused ? "cmd-pop" : ""}`}
          style={{
            borderColor: focused ? RED : "rgba(221,35,22,0.5)",
            backgroundColor: focused ? "rgba(221,35,22,0.06)" : "rgba(221,35,22,0.03)",
            boxShadow: focused ? "0 0 0 3px rgba(221,35,22,0.14)" : "0 0 14px rgba(221,35,22,0.08)",
          }}
        >
          <span ref={tickRef} style={{ color: RED, display: "inline-block", transition: "transform 0.08s ease-out" }}>❯</span>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            onFocus={() => {
              setFocused(true);
              if (!value) {
                setValue("/");
                setSel(0);
              }
            }}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            aria-label="terminal command input"
            spellCheck={false}
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-[#c56b60] focus:outline-none focus-visible:outline-none sm:text-sm"
            style={{ color: "#d6d2cc", caretColor: RED }}
          />
          {!value && !focused && (
            <span className="hidden shrink-0 items-center gap-1.5 sm:flex" aria-hidden="true">
              <kbd className="term-pulse rounded border px-1.5 py-[1px] text-[12px] leading-none" style={{ borderColor: "rgba(221,35,22,0.45)", color: RED }}>/</kbd>
              <span className="text-[11px]" style={{ color: DIM }}>to start</span>
            </span>
          )}
          {SR && (
            <button
              onClick={toggleMic}
              aria-label={listening ? "Stop listening" : "Ask by voice"}
              className={`grid h-7 w-7 shrink-0 cursor-pointer place-items-center rounded-sm border transition-colors duration-200 hover:border-[rgba(221,35,22,0.7)] ${listening ? "term-pulse" : ""}`}
              style={{ borderColor: listening ? "#ff3324" : "rgba(236,232,227,0.14)", color: listening ? "#ff3324" : SECOND }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="9" y="2" width="6" height="12" rx="3" />
                <path d="M5 10v1a7 7 0 0 0 14 0v-1M12 18v4" />
              </svg>
            </button>
          )}
        </div>
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
