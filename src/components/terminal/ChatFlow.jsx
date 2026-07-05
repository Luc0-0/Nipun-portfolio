import React, { useEffect, useState } from "react";
import { hoverTick } from "./sound";

const RED = "#dd2316";
const BR = "#ff3a2a";
const TEXT = "#ece8e3";
const SECOND = "#8a857f";
const DIM = "#4f4a45";
const BORDER = "rgba(236,232,227,0.14)";

const STEPS = [
  { t: "User Input", s: "CheckIn · ChatContext · api.js validation" },
  { t: "POST /api/chat", s: "FastAPI router · JWT · Pydantic schema" },
  { t: "Crisis Assessment", s: "keyword match · severity · critical path", crisis: true },
  { t: "ConversationService", s: "create / validate · save user message" },
  { t: "EmotionService", s: "keyword engine → XLNet · label + confidence" },
  { t: "ContextManager", s: "history · truncation · summarisation" },
  { t: "MemoryService", s: "4-tier bundle: short · semantic · emotional · meta" },
  { t: "LLMService", s: "adaptive prompt · Ollama Cloud" },
  { t: "Save → DB", s: "messages · role · conversation_id" },
  { t: "Background Tasks", s: "title · analytics · journal · memory" },
  { t: "Return → Frontend", s: "JSON · crisis flag · resources" },
  { t: "Typewriter Display", s: "character-by-character" },
];

export default function ChatFlow({ steps }) {
  const S = steps && steps.length ? steps : STEPS;
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % S.length), 950);
    return () => clearInterval(id);
  }, [S.length]);

  return (
    <div className="mb-6 rounded-md border p-4 sm:p-6" style={{ borderColor: BORDER, backgroundColor: "rgba(0,0,0,0.4)" }}>
      <div className="mx-auto flex max-w-md flex-col">
        {S.map((st, i) => {
          const on = i === active;
          const past = i < active;
          return (
            <div key={i}>
              <div onMouseEnter={() => { setActive(i); hoverTick(); }} className="flex items-start gap-3 rounded-md px-3 py-2 transition-colors" style={{ backgroundColor: on ? "rgba(221,35,22,0.12)" : "transparent" }}>
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] transition-colors" style={{ border: `1px solid ${on ? BR : past ? RED : "rgba(221,35,22,0.4)"}`, color: on ? BR : past ? RED : DIM, backgroundColor: on ? "rgba(221,35,22,0.15)" : "transparent" }}>{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-[13px]" style={{ color: on ? TEXT : SECOND }}>{st.t}{st.crisis && <span className="ml-2 text-[10px]" style={{ color: BR }}>critical</span>}</p>
                  <p className="text-[11px]" style={{ color: DIM }}>{st.s}</p>
                </div>
              </div>
              {st.crisis && (
                <div className="my-1 ml-8 flex items-center gap-2">
                  <span className="text-[11px]" style={{ color: DIM }}>└─ if crisis →</span>
                  <span className="rounded border px-2 py-0.5 text-[10px]" style={{ borderColor: BR, color: BR }}>988 · 741741 · 911 · stop</span>
                </div>
              )}
              {i < S.length - 1 && <div className="ml-[1.4rem] h-3 w-px transition-colors" style={{ backgroundColor: past || on ? RED : "rgba(221,35,22,0.25)" }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
