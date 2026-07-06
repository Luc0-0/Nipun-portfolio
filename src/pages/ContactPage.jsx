import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { GithubLogo, LinkedinLogo, EnvelopeSimple, PaperPlaneTilt, MapPin, FileText } from "@phosphor-icons/react";
import TerminalShell from "../components/terminal/TerminalShell";
import { hoverTick, confirm, back, blip } from "../components/terminal/sound";
import { RESUME_PATH, RESUME_FILE } from "../components/terminal/commands";

const RED = "#dd2316";
const RED_HI = "#ff3324";
const TEXT = "#ece8e3";
const BODY = "#b9b3ac";
const DIM = "#6b655f";
const FAINT = "#4f4a45";
const EASE = [0.23, 1, 0.32, 1];
const KEY = import.meta.env.VITE_WEB3FORMS_KEY;

const CHANNELS = [
  { I: EnvelopeSimple, k: "email", v: "nipunsujesh28@gmail.com", href: "mailto:nipunsujesh28@gmail.com" },
  { I: GithubLogo, k: "github", v: "github.com/Luc0-0", href: "https://github.com/Luc0-0" },
  { I: LinkedinLogo, k: "linkedin", v: "linkedin.com/in/nipun-sujesh", href: "https://www.linkedin.com/in/nipun-sujesh" },
];

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline gap-3 font-mono text-[11px] tracking-[0.14em]">
        <span style={{ color: RED }}>{label}</span>
        {error && <span style={{ color: RED_HI }}>[ err ] {error}</span>}
      </span>
      {children}
    </label>
  );
}

const inputCls = "w-full rounded-sm border bg-transparent px-3 py-2.5 font-mono text-base outline-none transition-colors duration-200 placeholder:italic placeholder:text-[#3d3934] focus:border-[rgba(255,51,36,0.7)] sm:text-sm";
const inputStyle = { borderColor: "rgba(236,232,227,0.14)", color: TEXT, caretColor: RED, backgroundColor: "rgba(8,8,8,0.5)" };

export default function ContactPage() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const botRef = useRef(null);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: null }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "who's calling?";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "needs a valid address";
    if (form.message.trim().length < 10) er.message = "say a bit more (10+ chars)";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const send = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    if (!validate()) {
      back();
      return;
    }
    if (botRef.current?.value) return;
    blip(500, 0.05, 0.03);
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: KEY,
          subject: `nipun.space — message from ${form.name}`,
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        confirm();
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else throw new Error(data.message || "send failed");
    } catch {
      back();
      setStatus("error");
    }
  };

  const fadeUp = (d) => ({
    initial: reduce ? false : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASE, delay: d },
  });

  return (
    <TerminalShell path="~/contact" subtitle="open a channel" quiet>
      <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="mx-auto w-full max-w-[1200px] px-5 py-10 sm:px-10">
          <motion.div {...fadeUp(0)} className="mb-10">
            <p className="font-mono text-sm" style={{ color: RED }}>&gt; compose --to nipun<span className="term-caret">_</span></p>
            <p className="mt-1 font-mono text-sm" style={{ color: DIM }}>lands straight in my inbox · or pick a channel on the right</p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <motion.form {...fadeUp(0.08)} onSubmit={send} noValidate className="space-y-5">
              <input ref={botRef} type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <Field label="from:" error={errors.name}>
                <input className={inputCls} style={inputStyle} value={form.name} onChange={set("name")} placeholder="your name" autoComplete="name" />
              </Field>

              <Field label="reply-to:" error={errors.email}>
                <input className={inputCls} style={inputStyle} type="email" value={form.email} onChange={set("email")} placeholder="you@domain.com" autoComplete="email" />
              </Field>

              <Field label="body:" error={errors.message}>
                <textarea
                  className={`${inputCls} min-h-[180px] resize-y`}
                  style={inputStyle}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="a role, a project, an idea, or just a hello…"
                />
              </Field>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  onMouseEnter={hoverTick}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-sm border px-5 py-2.5 font-mono text-sm transition-all duration-200 hover:shadow-[0_0_20px_rgba(221,35,22,0.3)] active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
                  style={{ borderColor: RED_HI, color: RED_HI, backgroundColor: "rgba(28,8,6,0.7)" }}
                >
                  <PaperPlaneTilt size={15} weight="fill" />
                  {status === "sending" ? "sending…" : ":send"}
                </button>

                {status === "sent" && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-xs" style={{ color: "#6f9e80" }}>
                    [ ok ] delivered. i'll get back to you.
                  </motion.span>
                )}
                {status === "error" && (
                  <span className="font-mono text-xs" style={{ color: RED_HI }}>
                    [ err ] channel down —{" "}
                    <a className="underline" href={`mailto:nipunsujesh28@gmail.com?subject=${encodeURIComponent("From " + (form.name || "your site"))}&body=${encodeURIComponent(form.message)}`}>
                      send by mail instead
                    </a>
                  </span>
                )}
              </div>
            </motion.form>

            <motion.aside {...fadeUp(0.16)}>
              <p className="mb-4 font-mono text-[11px] tracking-[0.2em]" style={{ color: RED }}>$ channels --list</p>
              <div className="space-y-2.5">
                {CHANNELS.map(({ I, k, v, href }) => (
                  <a
                    key={k}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    onMouseEnter={hoverTick}
                    className="group flex cursor-pointer items-center gap-3 rounded-sm border py-3 pl-6 pr-3.5 transition-colors duration-200 hover:border-[rgba(221,35,22,0.7)]"
                    style={{ borderColor: "rgba(236,232,227,0.12)", backgroundColor: "rgba(8,8,8,0.5)" }}
                  >
                    <I size={17} style={{ color: RED }} />
                    <span className="w-16 shrink-0 font-mono text-[11px]" style={{ color: DIM }}>{k}</span>
                    <span className="truncate font-mono text-xs underline decoration-[rgba(221,35,22,0.45)] underline-offset-4 transition-colors duration-200 group-hover:text-white group-hover:decoration-[rgba(255,51,36,0.8)]" style={{ color: BODY }}>{v}</span>
                  </a>
                ))}
                <a
                  href={RESUME_PATH}
                  download={RESUME_FILE}
                  onMouseEnter={hoverTick}
                  className="group flex cursor-pointer items-center gap-3 rounded-sm border py-3 pl-6 pr-3.5 transition-colors duration-200 hover:border-[rgba(221,35,22,0.7)]"
                  style={{ borderColor: "rgba(236,232,227,0.12)", backgroundColor: "rgba(8,8,8,0.5)" }}
                >
                  <FileText size={17} style={{ color: RED }} />
                  <span className="w-16 shrink-0 font-mono text-[11px]" style={{ color: DIM }}>resume</span>
                  <span className="font-mono text-xs underline decoration-[rgba(221,35,22,0.45)] underline-offset-4 transition-colors duration-200 group-hover:text-white group-hover:decoration-[rgba(255,51,36,0.8)]" style={{ color: BODY }}>download the PDF</span>
                </a>
              </div>

              <div className="mt-8 space-y-1.5 font-mono text-[11px]" style={{ color: FAINT }}>
                <p className="flex items-center gap-2"><MapPin size={13} style={{ color: RED }} /> Kerala, India · IST +5:30</p>
                <p>open to: Generative AI Engineer roles · 2026</p>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </TerminalShell>
  );
}
