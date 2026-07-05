import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Globe, Brain, FlowArrow, PaperPlaneTilt, Check } from "@phosphor-icons/react";
import TerminalShell from "../components/terminal/TerminalShell";
import { hoverTick, confirm, back, blip, toggle } from "../components/terminal/sound";

const RED = "#dd2316";
const RED_HI = "#ff3324";
const TEXT = "#ece8e3";
const BODY = "#b9b3ac";
const DIM = "#6b655f";
const FAINT = "#4f4a45";
const EASE = [0.23, 1, 0.32, 1];
const KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const THEMES = [
  { label: "e-commerce", purpose: "stores · drops", bg: "#101014", fg: "#f2f0ec", ac: "#d9a441", img: "/images/services/theme-3.png" },
  { label: "editorial", purpose: "magazines · blogs", bg: "#f4efe6", fg: "#1d1a16", ac: "#9a3324", serif: true, img: "/images/services/theme-1.png" },
  { label: "3d interactive", purpose: "experiences", bg: "#05060a", fg: "#dfe6f0", ac: "#7c5cff", img: "/images/services/theme-6.png" },
  { label: "brand studio", purpose: "agencies · launches", bg: "#e8e4dd", fg: "#141414", ac: "#2244cc", img: "/images/services/theme-5.png" },
  { label: "saas dashboard", purpose: "products · tools", bg: "#0d1117", fg: "#e6edf3", ac: "#3fb68b", img: "/images/services/theme-2.png" },
  { label: "terminal", purpose: "this site", bg: "#000000", fg: "#ece8e3", ac: "#dd2316", img: "/images/services/theme-4.png" },
];

function ThemeCard({ t }) {
  const [ok, setOk] = useState(true);
  if (!ok) return <MockSite t={t} />;
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md border" style={{ borderColor: "rgba(221,35,22,0.35)", backgroundColor: t.bg }}>
      <img src={t.img} alt={`${t.label} website theme concept`} loading="lazy" decoding="async" onError={() => setOk(false)} className="h-full w-full object-cover" />
      <div className="absolute inset-x-0 bottom-0" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.82))" }}>
        <p className="px-2.5 py-1.5 font-mono text-[8px] tracking-[0.12em] text-[#ece8e3]">
          {t.label} · <span style={{ color: "#8a857f" }}>{t.purpose}</span>
        </p>
      </div>
    </div>
  );
}

function MockSite({ t }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-md border" style={{ backgroundColor: t.bg, borderColor: "rgba(221,35,22,0.35)" }}>
      <div className="flex items-center gap-1 border-b px-2.5 py-1.5" style={{ borderColor: `${t.fg}22` }}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.ac }} />
        <span className="ml-1 h-1 w-10 rounded-full" style={{ background: `${t.fg}55` }} />
        <span className="ml-auto flex gap-1">
          <span className="h-1 w-4 rounded-full" style={{ background: `${t.fg}33` }} />
          <span className="h-1 w-4 rounded-full" style={{ background: `${t.fg}33` }} />
        </span>
      </div>
      <div className="flex flex-1 flex-col px-3 py-3">
        <div className="mb-1.5 h-2.5 w-4/5 rounded-sm" style={{ background: t.fg, opacity: 0.9, fontFamily: t.serif ? "serif" : undefined }} />
        <div className="mb-1 h-2.5 w-3/5 rounded-sm" style={{ background: t.fg, opacity: 0.55 }} />
        <div className="mb-3 h-1.5 w-2/5 rounded-sm" style={{ background: t.ac }} />
        <div className="mb-3 grid grid-cols-3 gap-1.5">
          <span className="h-8 rounded-sm" style={{ background: `${t.fg}18` }} />
          <span className="h-8 rounded-sm" style={{ background: `${t.fg}10` }} />
          <span className="h-8 rounded-sm" style={{ background: `${t.fg}18` }} />
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="h-3.5 w-12 rounded-sm" style={{ background: t.ac }} />
          <span className="h-1.5 w-8 rounded-full" style={{ background: `${t.fg}33` }} />
        </div>
      </div>
      <div className="border-t px-2.5 py-1.5 font-mono text-[8px] tracking-[0.12em]" style={{ borderColor: `${t.fg}22`, color: t.fg }}>
        {t.label} · {t.purpose}
      </div>
    </div>
  );
}

function ThemeRing({ reduce }) {
  if (reduce)
    return (
      <div className="grid grid-cols-3 gap-3">
        {THEMES.slice(0, 3).map((t) => (
          <div key={t.label} className="h-[220px]"><ThemeCard t={t} /></div>
        ))}
      </div>
    );
  return (
    <div>
      <div className="relative h-[340px] w-full overflow-hidden" style={{ perspective: "1200px" }}>
        <div className="absolute left-1/2 top-1/2 h-0 w-0" style={{ transform: "rotateX(-4deg)", transformStyle: "preserve-3d" }}>
          <div className="ring-spin h-0 w-0" style={{ transformStyle: "preserve-3d" }}>
            {THEMES.map((t, i) => (
              <div
                key={t.label}
                className="absolute h-[240px] w-[192px]"
                style={{ transform: `rotateY(${i * 60}deg) translateZ(228px)`, marginLeft: -96, marginTop: -120, backfaceVisibility: "hidden" }}
              >
                <ThemeCard t={t} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-1 text-center font-mono text-[10px] tracking-[0.14em]" style={{ color: FAINT }}>
        6 theme directions · every panel designed & coded by me · hover to pause
      </p>
    </div>
  );
}

function ChatMock() {
  const rows = [
    { me: false, w: "70%" },
    { me: true, w: "52%" },
    { me: false, w: "78%" },
    { me: true, w: "40%" },
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-2.5 rounded-md border p-5" style={{ borderColor: "rgba(221,35,22,0.3)", backgroundColor: "rgba(8,8,8,0.6)" }}>
      <p className="mb-1 font-mono text-[9px] tracking-[0.14em]" style={{ color: DIM }}>● assistant.live — multimodal, with memory</p>
      {rows.map((r, i) => (
        <div key={i} className={`flex ${r.me ? "justify-end" : ""}`}>
          <span className="h-6 rounded-md border px-3" style={{ width: r.w, borderColor: r.me ? "rgba(221,35,22,0.5)" : "rgba(236,232,227,0.14)", backgroundColor: r.me ? "rgba(28,8,6,0.8)" : "rgba(16,16,16,0.8)" }} />
        </div>
      ))}
      <p className="mt-1 font-mono text-[9px]" style={{ color: FAINT }}>like serenity.nipun.space — live, in production</p>
    </div>
  );
}

function PipeMock() {
  const steps = ["docs", "embed", "retrieve", "agent", "action"];
  return (
    <div className="flex h-full flex-col justify-center rounded-md border p-5" style={{ borderColor: "rgba(221,35,22,0.3)", backgroundColor: "rgba(8,8,8,0.6)" }}>
      <p className="mb-4 font-mono text-[9px] tracking-[0.14em]" style={{ color: DIM }}>● pipeline.map — your data → real work</p>
      <div className="flex items-center justify-between">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <span className="rounded-sm border px-2 py-1.5 font-mono text-[9px]" style={{ borderColor: i === 3 ? RED_HI : "rgba(221,35,22,0.4)", color: i === 3 ? RED_HI : BODY, backgroundColor: "rgba(16,8,7,0.8)" }}>
              {s}
            </span>
            {i < steps.length - 1 && <span className="h-px flex-1" style={{ background: "rgba(221,35,22,0.45)", margin: "0 4px" }} />}
          </React.Fragment>
        ))}
      </div>
      <p className="mt-4 font-mono text-[9px]" style={{ color: FAINT }}>like pragati — agents that assemble their own tools</p>
    </div>
  );
}

const SERVICES = [
  {
    key: "web",
    I: Globe,
    title: "Web Development",
    pitch: "Sites people remember. Portfolios, product landings, brand pages — designed and built end to end, from first sketch to deployed domain.",
    gets: ["Design + build, one person, no handoff loss", "Motion, 3D and sound where it earns its place", "SEO-ready, responsive, fast", "Deployed and handed over on your domain"],
    tech: ["React", "Next.js", "Tailwind", "Three.js", "Framer Motion"],
    visual: "ring",
  },
  {
    key: "ai",
    I: Brain,
    title: "Custom AI Applications",
    pitch: "Full AI products, not just prompts. Assistants with memory, multimodal apps, fine-tuned models — built, evaluated, and shipped to production.",
    gets: ["Full stack: model + backend + interface", "Fine-tuning when off-the-shelf isn't enough", "Evals and safety behavior, not vibes", "Deployed with auth, monitoring, and a handover doc"],
    tech: ["Python", "FastAPI", "PyTorch", "LLM APIs", "React"],
    visual: "chat",
  },
  {
    key: "auto",
    I: FlowArrow,
    title: "RAG · Chatbots · Automation",
    pitch: "A chatbot that actually knows your business. I do RAG over your website, docs and FAQs, wire agents into your tools, and automate the hours nobody should be spending.",
    gets: ["Custom chatbot trained on your website + documents", "No made-up answers: it quotes your own docs and hands off to a human when unsure", "Agents connected to your stack (MCP, APIs, Slack)", "Runs on your site, WhatsApp, or wherever customers are"],
    tech: ["RAG", "Embeddings", "MCP", "pgvector", "LLM APIs"],
    visual: "pipe",
  },
];

const TEMPLATES = {
  web: "Hi Nipun, I need a website.\n\nWhat it's for: \nPages / sections: \nStyle I like: \nDeadline: ",
  ai: "Hi Nipun, I want to build an AI application.\n\nWhat it should do: \nWho uses it: \nData it works with: \nDeadline: ",
  auto: "Hi Nipun, I need a chatbot / RAG / automation.\n\nWebsite or docs it should learn from: \nWhere it should live (site, WhatsApp, Slack): \nWhat it should handle: \nDeadline: ",
};
const TVALUES = Object.values(TEMPLATES);

const inputCls = "w-full rounded-sm border bg-transparent px-3 py-2.5 font-mono text-sm outline-none transition-colors duration-200 placeholder:italic placeholder:text-[#3d3934] focus:border-[rgba(255,51,36,0.7)]";
const inputStyle = { borderColor: "rgba(236,232,227,0.14)", color: TEXT, caretColor: RED, backgroundColor: "rgba(8,8,8,0.5)" };

function ServicePanel({ s, idx, flip, reduce, onHire }) {
  return (
    <motion.section
      layout
      initial={reduce ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="group/panel relative overflow-hidden rounded-md border transition-colors duration-300 hover:border-[rgba(255,51,36,0.45)]"
      style={{ borderColor: "rgba(221,35,22,0.22)", backgroundColor: "rgba(10,8,8,0.55)", backdropFilter: "blur(2px)" }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: "repeating-linear-gradient(transparent 0 3px, rgba(0,0,0,0.14) 3px 4px)", opacity: 0.4 }} />
      <span aria-hidden="true" className="pointer-events-none absolute -top-4 right-2 select-none leading-none" style={{ fontFamily: "'Jersey 25', monospace", fontSize: "7rem", color: "rgba(221,35,22,0.06)" }}>
        {String(idx + 1).padStart(2, "0")}
      </span>
      <div className="relative grid items-center gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_1.05fr]">
        <div className={flip ? "lg:order-2" : ""}>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-md border" style={{ borderColor: "rgba(221,35,22,0.5)", backgroundColor: "rgba(20,6,5,0.85)" }}>
              <s.I size={20} weight="fill" style={{ color: RED }} />
            </span>
            <div>
              <p className="font-mono text-[9px] tracking-[0.22em]" style={{ color: FAINT }}>SVC {String(idx + 1).padStart(2, "0")}</p>
              <h2 className="text-xl font-medium sm:text-2xl" style={{ color: TEXT }}>{s.title}</h2>
            </div>
          </div>
          <p className="mb-5 max-w-[48ch] text-sm leading-relaxed" style={{ color: BODY }}>{s.pitch}</p>
          <ul className="mb-5 space-y-2">
            {s.gets.map((g) => (
              <li key={g} className="flex items-start gap-2.5 text-[13px] leading-snug" style={{ color: BODY }}>
                <Check size={14} weight="bold" style={{ color: RED, marginTop: 2 }} />
                {g}
              </li>
            ))}
          </ul>
          <div className="mb-6 flex flex-wrap gap-1.5">
            {s.tech.map((t) => (
              <span key={t} className="rounded-sm border px-1.5 py-0.5 font-mono text-[9px]" style={{ borderColor: "rgba(236,232,227,0.14)", color: DIM }}>{t}</span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <button
              onClick={() => onHire(s.key)}
              onMouseEnter={hoverTick}
              className="group/cta inline-flex cursor-pointer items-center gap-2 rounded-sm border px-4 py-2 font-mono text-xs transition-all duration-200 hover:shadow-[0_0_18px_rgba(221,35,22,0.3)] active:scale-[0.97]"
              style={{ borderColor: RED_HI, color: RED_HI, backgroundColor: "rgba(28,8,6,0.7)" }}
            >
              start a project <span className="transition-transform duration-200 group-hover/cta:translate-x-1">→</span>
            </button>
          </div>
        </div>
        <div className={`min-h-[260px] ${flip ? "lg:order-1" : ""}`}>
          {s.visual === "ring" && <ThemeRing reduce={reduce} />}
          {s.visual === "chat" && <ChatMock />}
          {s.visual === "pipe" && <PipeMock />}
        </div>
      </div>
    </motion.section>
  );
}

export default function ServicesPage() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ name: "", email: "", service: "web", message: TEMPLATES.web });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const formRef = useRef(null);
  const botRef = useRef(null);

  const setService = (k) => {
    setForm((f) => ({ ...f, service: k, message: !f.message.trim() || TVALUES.includes(f.message) ? TEMPLATES[k] : f.message }));
  };
  const onHire = (k) => {
    confirm();
    setService(k);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: null }));
  };

  const send = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const er = {};
    if (!form.name.trim()) er.name = "who's calling?";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "needs a valid address";
    if (form.message.trim().length < 20) er.message = "fill the brief a little";
    setErrors(er);
    if (Object.keys(er).length) return back();
    if (botRef.current?.value) return;
    blip(500, 0.05, 0.03);
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: KEY,
          subject: `nipun.space — ${SERVICES.find((s) => s.key === form.service)?.title} inquiry from ${form.name}`,
          name: form.name,
          email: form.email,
          message: `service: ${form.service}\n\n${form.message}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        confirm();
        setStatus("sent");
      } else throw new Error();
    } catch {
      back();
      setStatus("error");
    }
  };

  const shown = SERVICES.filter((s) => filter === "all" || s.key === filter);

  return (
    <TerminalShell path="~/services" subtitle="for hire" quiet>
      <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto w-full max-w-[1240px] px-5 py-10 sm:px-10">
          <div className="mb-8">
            <h1 className="leading-none" style={{ fontFamily: "'Jersey 25', monospace", fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", color: RED, letterSpacing: "0.02em", textShadow: "0 0 26px rgba(221,35,22,0.35)" }}>
              SERVICES<span className="term-caret">_</span>
            </h1>
            <p className="mt-2 font-mono text-sm" style={{ color: DIM }}>&gt; ~/services --hire · three things i build for people · scoped and quoted per project</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t pt-4 font-mono text-[11px]" style={{ borderColor: "rgba(236,232,227,0.09)", color: FAINT }}>
              <span><span style={{ color: RED }}>●</span> currently: ai workflow automation @ impress.ai</span>
              <span><span style={{ color: RED }}>●</span> serenity — live in production</span>
              <span><span style={{ color: RED }}>●</span> pragati — deployed on cloud run</span>
              <span className="ml-auto" style={{ color: DIM }}>taking select projects alongside final year</span>
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {[{ k: "all", l: "ALL" }, { k: "web", l: "WEB" }, { k: "ai", l: "AI APPS" }, { k: "auto", l: "AUTOMATION" }].map((c) => {
              const on = filter === c.k;
              return (
                <button
                  key={c.k}
                  onClick={() => {
                    toggle();
                    setFilter(c.k);
                    if (c.k !== "all") setService(c.k);
                  }}
                  onMouseEnter={hoverTick}
                  className="cursor-pointer rounded-sm border px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] transition-all duration-200 active:scale-[0.96]"
                  style={{ borderColor: on ? RED_HI : "rgba(236,232,227,0.16)", color: on ? RED_HI : BODY, backgroundColor: on ? "rgba(28,8,6,0.7)" : "rgba(8,8,8,0.4)", boxShadow: on ? "0 0 16px rgba(221,35,22,0.25)" : "none" }}
                >
                  {c.l}
                </button>
              );
            })}
          </div>

          <div className="mb-14 space-y-6">
            {shown.map((s) => {
              const idx = SERVICES.indexOf(s);
              return <ServicePanel key={s.key} s={s} idx={idx} flip={idx % 2 === 1} reduce={reduce} onHire={onHire} />;
            })}
          </div>

          <div ref={formRef} className="mb-4 scroll-mt-16 border-t pt-10" style={{ borderColor: "rgba(236,232,227,0.09)" }}>
            <p className="mb-1 font-mono text-sm" style={{ color: RED }}>&gt; compose --brief<span className="term-caret">_</span></p>
            <p className="mb-6 font-mono text-sm" style={{ color: DIM }}>tell me what you need. lands straight in my inbox, i reply with a scope and a quote.</p>

            <form onSubmit={send} noValidate className="grid max-w-[760px] gap-5">
              <input ref={botRef} type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 flex items-baseline gap-3 font-mono text-[11px] tracking-[0.14em]">
                    <span style={{ color: RED }}>from:</span>
                    {errors.name && <span style={{ color: RED_HI }}>[ err ] {errors.name}</span>}
                  </span>
                  <input className={inputCls} style={inputStyle} value={form.name} onChange={set("name")} placeholder="your name" autoComplete="name" />
                </label>
                <label className="block">
                  <span className="mb-1.5 flex items-baseline gap-3 font-mono text-[11px] tracking-[0.14em]">
                    <span style={{ color: RED }}>reply-to:</span>
                    {errors.email && <span style={{ color: RED_HI }}>[ err ] {errors.email}</span>}
                  </span>
                  <input className={inputCls} style={inputStyle} type="email" value={form.email} onChange={set("email")} placeholder="you@domain.com" autoComplete="email" />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block font-mono text-[11px] tracking-[0.14em]" style={{ color: RED }}>service:</span>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((s) => {
                    const on = form.service === s.key;
                    return (
                      <button
                        type="button"
                        key={s.key}
                        onClick={() => {
                          toggle();
                          setService(s.key);
                        }}
                        onMouseEnter={hoverTick}
                        className="cursor-pointer rounded-sm border px-3 py-1.5 font-mono text-[11px] transition-colors duration-200"
                        style={{ borderColor: on ? RED_HI : "rgba(236,232,227,0.16)", color: on ? RED_HI : BODY, backgroundColor: on ? "rgba(28,8,6,0.7)" : "transparent" }}
                      >
                        {s.title}
                      </button>
                    );
                  })}
                </div>
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-baseline gap-3 font-mono text-[11px] tracking-[0.14em]">
                  <span style={{ color: RED }}>brief:</span>
                  {errors.message && <span style={{ color: RED_HI }}>[ err ] {errors.message}</span>}
                </span>
                <textarea className={`${inputCls} min-h-[190px] resize-y`} style={inputStyle} value={form.message} onChange={set("message")} />
              </label>
              <div className="flex flex-wrap items-center gap-4 pb-12">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  onMouseEnter={hoverTick}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-sm border px-5 py-2.5 font-mono text-sm transition-all duration-200 hover:shadow-[0_0_20px_rgba(221,35,22,0.3)] active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
                  style={{ borderColor: RED_HI, color: RED_HI, backgroundColor: "rgba(28,8,6,0.7)" }}
                >
                  <PaperPlaneTilt size={15} weight="fill" />
                  {status === "sending" ? "sending…" : ":send brief"}
                </button>
                {status === "sent" && <span className="font-mono text-xs" style={{ color: "#6f9e80" }}>[ ok ] received. i'll reply with a scope + quote.</span>}
                {status === "error" && (
                  <span className="font-mono text-xs" style={{ color: RED_HI }}>
                    [ err ] channel down —{" "}
                    <a className="underline" href={`mailto:nipunsujesh28@gmail.com?subject=${encodeURIComponent("Project inquiry")}&body=${encodeURIComponent(form.message)}`}>send by mail</a>
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </TerminalShell>
  );
}
