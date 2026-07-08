import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PROJECT_DETAILS } from "./projectData";
import { POSTS } from "../../data/writing";

const ORIGIN = "https://www.nipun.space";

const STATIC = {
  "/": ["Nipun Sujesh — AI Engineer · Terminal Portfolio", "Terminal portfolio of an AI engineer building production AI end to end: RAG pipelines, agentic systems, full-stack apps. Ask LucBot, the site's built-in RAG assistant."],
  "/work": ["Projects — Nipun Sujesh", "Shipped AI projects: Serenity, PRAGATI, Guardia, Uni-Verse and more. Production builds, hackathon wins and experiments, each with a full technical breakdown."],
  "/about": ["About — Nipun Sujesh", "System monitor of a person: who Nipun is, what's running, his skills, mind map and timeline. Final-year AI & Data Science, AI Workflow Automation intern at impress.ai."],
  "/skills": ["Skills — Nipun Sujesh", "Interactive skill radar: Generative AI and LLMs, RAG and vector search, agentic AI (ADK, MCP), Python, React, cloud. Honestly self-rated, backed by shipped projects."],
  "/services": ["Services — Web, AI Apps & Automation | Nipun Sujesh", "Hire Nipun for web development, custom AI applications, and RAG chatbots trained on your website and documents. Scoped and quoted per project."],
  "/achievements": ["Achievements — Nipun Sujesh", "Google Gen AI Academy APAC Cohort 1, IBM AI Developer Professional Certificate, ICRAIA research paper, 15+ shipped projects. All real, all verifiable."],
  "/writing": ["Writing — Nipun Sujesh", "Notes from building: AI memory systems, self-assembling agents, production RAG, and why MCP won. Written by someone who ships."],
  "/opensource": ["Open Source — Nipun Sujesh", "Public code: GodProfile, an MCP server with 16 tools, and NLP-from-scratch learning notebooks."],
  "/contact": ["Contact — Nipun Sujesh", "Open a channel: email, GitHub, LinkedIn, or the form that lands straight in Nipun's inbox. Open to Generative AI Engineer roles, 2026."],
  "/map": ["Site Blueprint — Nipun Sujesh", "The portfolio drawn as its own engineering schematic: every page as a module, the command bar as the bus, LucBot as the daemon."],
};

function lookup(path) {
  if (STATIC[path]) return STATIC[path];
  const proj = path.match(/^\/work\/([^/]+)$/);
  if (proj && PROJECT_DETAILS[proj[1]]) {
    const p = PROJECT_DETAILS[proj[1]];
    return [`${p.title} — project by Nipun Sujesh`, `${p.title} (${p.tag}, ${p.year}): architecture, stack and honest status. Built end to end by Nipun Sujesh.`];
  }
  const post = path.match(/^\/writing\/([^/]+)$/);
  if (post) {
    const w = POSTS.find((x) => x.slug === post[1]);
    if (w) return [`${w.title} — Nipun Sujesh`, w.summary];
  }
  return STATIC["/"];
}

const setMeta = (sel, attr, val) => {
  const el = document.querySelector(sel);
  if (el) el.setAttribute(attr, val);
};

export function useSEO() {
  const { pathname } = useLocation();
  useEffect(() => {
    const [title, desc] = lookup(pathname);
    document.title = title;
    setMeta('meta[name="description"]', "content", desc);
    setMeta('link[rel="canonical"]', "href", ORIGIN + (pathname === "/" ? "/" : pathname));
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:url"]', "content", ORIGIN + pathname);
    setMeta('meta[property="og:description"]', "content", desc);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", desc);
  }, [pathname]);
}
