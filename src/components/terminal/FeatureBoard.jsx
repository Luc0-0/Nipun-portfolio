import React, { useState } from "react";
import { hoverTick, toggle } from "./sound";

const RED = "#dd2316";
const GREEN = "#6f9e80";
const GRAY = "#8a857f";
const TEXT = "#ece8e3";
const SECOND = "#8a857f";
const DIM = "#4f4a45";
const BORDER = "rgba(236,232,227,0.14)";

const COLS = [
  { key: "done", label: "IMPLEMENTED", color: GREEN, items: ["Streaming chat (SSE)", "Conversation history", "Auto title generation", "Typewriter display", "Shapeshifter personality (4 modes)", "Pluggable engine architecture", "Four-tier memory", "Crisis detection", "Journal + AI extraction", "Emotion analytics", "JWT auth · Docker deploy"] },
  { key: "wip", label: "IN PROGRESS", color: RED, items: ["XLNet as default engine", "Ollama emotion detection", "Improved context window", "Pattern-based crisis (ML)", "Meditation feature", "Emotion picker (6-level UI)", "Mobile polish", "Rate limiting", "Emotional trend graph"] },
  { key: "plan", label: "PLANNED", color: GRAY, items: ["Voice input & emotion", "Facial expression analysis", "Predictive crisis detection", "Fine-tuned mental-health LLM", "Native mobile (React Native)", "Wearable integration", "Therapist portal", "Multi-language", "E2E encryption · HIPAA"] },
];

export default function FeatureBoard() {
  const [filter, setFilter] = useState("all");
  const total = COLS.reduce((a, c) => a + c.items.length, 0);
  const done = COLS[0].items.length;
  const cols = filter === "all" ? COLS : COLS.filter((c) => c.key === filter);

  return (
    <div className="mb-6">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px]">
        {[["all", "ALL"], ["done", "IMPLEMENTED"], ["wip", "IN PROGRESS"], ["plan", "PLANNED"]].map(([k, l]) => (
          <button key={k} onClick={() => { setFilter(k); toggle(); }} className="rounded border px-2.5 py-1 transition-colors" style={{ borderColor: filter === k ? RED : BORDER, color: filter === k ? TEXT : SECOND, backgroundColor: filter === k ? "rgba(221,35,22,0.12)" : "transparent" }}>{l}</button>
        ))}
        <span className="ml-auto" style={{ color: DIM }}>{done}/{total} shipped</span>
      </div>
      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
        <div style={{ width: `${(done / total) * 100}%`, height: "100%", backgroundColor: GREEN }} />
      </div>
      <div className={`grid gap-3 ${cols.length > 1 ? "sm:grid-cols-3" : "sm:grid-cols-1"}`}>
        {cols.map((c) => (
          <div key={c.key} className="rounded-md border p-3" style={{ borderColor: BORDER, backgroundColor: "rgba(8,8,8,0.5)" }}>
            <p className="mb-2.5 flex items-center gap-2 text-[11px] tracking-widest" style={{ color: c.color }}><span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />{c.label}</p>
            <div className="space-y-1.5">
              {c.items.map((it) => (
                <div key={it} onMouseEnter={hoverTick} className="flex items-start gap-2 rounded px-1.5 py-1 text-[12px] transition-colors hover:bg-[rgba(221,35,22,0.06)]" style={{ color: SECOND }}>
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: c.color }} />{it}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
