import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import TerminalShell from "../components/terminal/TerminalShell";
import { hoverTick, back } from "../components/terminal/sound";
import { POSTS, readTime } from "../data/writing";

const RED = "#dd2316";
const TEXT = "#ece8e3";
const BODY = "#b9b3ac";
const DIM = "#6b655f";
const EASE = [0.23, 1, 0.32, 1];

const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "2-digit" });

function Block({ b }) {
  if (b.t === "h") return <h2 className="mb-3 mt-9 font-mono text-sm tracking-[0.12em]" style={{ color: RED }}>## {b.c}</h2>;
  if (b.t === "list")
    return (
      <ul className="mb-5 space-y-1.5">
        {b.c.map((li) => (
          <li key={li} className="flex gap-2.5 text-[15px] leading-relaxed" style={{ color: BODY }}>
            <span style={{ color: RED }}>›</span>
            {li}
          </li>
        ))}
      </ul>
    );
  if (b.t === "quote")
    return (
      <blockquote className="mb-5 border px-5 py-3 text-[15px] italic leading-relaxed" style={{ borderColor: "rgba(221,35,22,0.3)", color: BODY, backgroundColor: "rgba(10,8,8,0.5)" }}>
        {b.c}
      </blockquote>
    );
  return <p className="mb-5 text-[15px] leading-[1.75]" style={{ color: BODY }}>{b.c}</p>;
}

export default function WritingPost() {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/writing" replace />;

  return (
    <TerminalShell path={`~/writing/${post.slug}`} subtitle="reading" quiet>
      <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <motion.article
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mx-auto w-full max-w-[720px] px-5 py-10 sm:px-8"
        >
          <button
            onClick={() => {
              back();
              navigate("/writing");
            }}
            onMouseEnter={hoverTick}
            className="mb-8 cursor-pointer font-mono text-xs transition-colors duration-200 hover:text-[#ece8e3]"
            style={{ color: DIM }}
          >
            ← cd ~/writing
          </button>

          <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px]">
            <span className="tabular-nums" style={{ color: RED }}>{fmt(post.date)}</span>
            <span style={{ color: "#4f4a45" }}>·</span>
            <span style={{ color: DIM }}>{readTime(post)} min read</span>
            <span className="ml-auto flex gap-1.5">
              {post.tags.map((t) => (
                <span key={t} className="rounded-sm border px-1.5 py-0.5 text-[9px]" style={{ borderColor: "rgba(236,232,227,0.14)", color: DIM }}>{t}</span>
              ))}
            </span>
          </div>

          <h1 className="mb-8 text-2xl font-medium leading-snug sm:text-3xl" style={{ color: TEXT }}>{post.title}</h1>

          {post.body.map((b, i) => (
            <Block key={i} b={b} />
          ))}

          <div className="mb-12 mt-10 border-t pt-6" style={{ borderColor: "rgba(236,232,227,0.1)" }}>
            <p className="font-mono text-xs" style={{ color: DIM }}>
              — Nipun · <span style={{ color: RED }}>nipun.space</span>
            </p>
          </div>
        </motion.article>
      </div>
    </TerminalShell>
  );
}
