import "dotenv/config";
import { writeFileSync, mkdirSync } from "fs";
import { FACTS } from "../src/data/facts.js";
import { POSTS } from "../src/data/writing.js";
import { PROJECT_DETAILS } from "../src/components/terminal/projectData.js";

const MAX = 700;
const chunks = [];
let id = 0;
const push = (page, title, text, kind) => {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length < 40) return;
  for (let i = 0; i < t.length; i += MAX) chunks.push({ id: id++, page, title, text: t.slice(i, i + MAX), ...(kind ? { kind } : {}) });
};

for (const f of FACTS) push(f.page, f.title, f.text, "fact");

for (const p of POSTS) {
  let section = p.title;
  let buf = [];
  const flush = () => {
    if (buf.length) push(`/writing/${p.slug}`, `${p.title} — ${section}`, buf.join(" "));
    buf = [];
  };
  for (const b of p.body) {
    if (b.t === "h") {
      flush();
      section = b.c;
    } else buf.push(Array.isArray(b.c) ? b.c.join(". ") : b.c);
  }
  flush();
}

const text_of = (b) => {
  if (!b) return "";
  if (b.type === "p" || b.type === "quote" || b.type === "h") return b.text || "";
  if (b.type === "list") return (b.items || []).join(". ");
  if (b.type === "kv") return (b.rows || []).map((r) => (Array.isArray(r) ? r.join(": ") : "")).join(". ");
  return "";
};

for (const [slug, p] of Object.entries(PROJECT_DETAILS)) {
  const stack = Array.isArray(p.stack) ? p.stack.join(", ") : typeof p.stack === "string" ? p.stack : "";
  const summary = (p.sections?.[0]?.blocks || []).filter((b) => b.type === "p").map((b) => b.text).join(" ").slice(0, 300);
  const meta = `${p.title} (${p.tag}, ${p.year}).${stack ? ` Stack: ${stack}.` : ""}${p.live ? ` Live at ${p.live}.` : ""} ${summary}`;
  push(`/work/${slug}`, p.title, meta, "meta");
  for (const s of p.sections || []) {
    let section = s.label;
    let buf = [];
    const flush = () => {
      if (buf.length) push(`/work/${slug}`, `${p.title} — ${section}`, buf.join(" "));
      buf = [];
    };
    for (const b of s.blocks || []) {
      if (b.type === "h") {
        flush();
        section = b.text;
      } else {
        const t = text_of(b);
        if (t) buf.push(t);
      }
    }
    flush();
  }
}

mkdirSync("public/rag", { recursive: true });
writeFileSync("public/rag/chunks.json", JSON.stringify(chunks));
const kb = Math.round(JSON.stringify(chunks).length / 1024);
console.log(`${chunks.length} chunks, ${kb}KB -> public/rag/chunks.json`);

const ORIGIN = "https://www.nipun.space";
const today = new Date().toISOString().slice(0, 10);
const ROUTES = [
  ["/", 1.0], ["/work", 0.9], ["/services", 0.9], ["/about", 0.8], ["/skills", 0.8],
  ["/achievements", 0.7], ["/writing", 0.7], ["/opensource", 0.6], ["/contact", 0.7], ["/map", 0.5],
  ...Object.keys(PROJECT_DETAILS).map((s) => [`/work/${s}`, 0.7]),
  ...POSTS.map((p) => [`/writing/${p.slug}`, 0.6]),
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ROUTES.map(
  ([u, pr]) => `  <url><loc>${ORIGIN}${u}</loc><lastmod>${today}</lastmod><priority>${pr.toFixed(1)}</priority></url>`
).join("\n")}\n</urlset>\n`;
writeFileSync("public/sitemap.xml", sitemap);

const llms = `# Nipun Sujesh — nipun.space

> Terminal-themed portfolio of Nipun Sujesh, an AI engineer from Kerala, India. Final-year B.E. in AI & Data Science (GPA 8.24/10, graduating 2026). AI Workflow Automation Engineer Intern at impress.ai. Builds production AI end to end: RAG pipelines, agentic systems (Google ADK, MCP), and full-stack applications. The site includes LucBot, a retrieval-augmented assistant that answers questions about him from this same content.

## Key facts
${FACTS.map((f) => `- ${f.title}: ${f.text}`).join("\n")}

## Projects
${Object.entries(PROJECT_DETAILS).map(([s, p]) => `- [${p.title}](${ORIGIN}/work/${s}): ${p.tag}, ${p.year}`).join("\n")}

## Writing
${POSTS.map((p) => `- [${p.title}](${ORIGIN}/writing/${p.slug}): ${p.summary}`).join("\n")}

## Contact
- Email: nipunsujesh28@gmail.com
- GitHub: https://github.com/Luc0-0
- LinkedIn: https://linkedin.com/in/nipun-sujesh
`;
writeFileSync("public/llms.txt", llms);
console.log(`sitemap: ${ROUTES.length} urls · llms.txt: ${Math.round(llms.length / 1024)}KB`);

const GKEY = process.env.GEMINI_API_KEY;
const EMODEL = "gemini-embedding-001";
const DIM = 256;
if (GKEY) {
  const vecs = [];
  for (let i = 0; i < chunks.length; i += 20) {
    const batch = chunks.slice(i, i + 20);
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${EMODEL}:batchEmbedContents?key=${GKEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: batch.map((c) => ({
          model: `models/${EMODEL}`,
          content: { parts: [{ text: `${c.title}. ${c.text}` }] },
          outputDimensionality: DIM,
        })),
      }),
    });
    if (!r.ok) throw new Error(`embed failed: ${r.status} ${await r.text()}`);
    vecs.push(...(await r.json()).embeddings.map((e) => e.values));
  }
  const packed = vecs.map((v) => {
    const n = Math.hypot(...v) || 1;
    return v.map((x) => Math.round((x / n) * 1000) / 1000);
  });
  writeFileSync("public/rag/embeddings.json", JSON.stringify({ model: EMODEL, dim: DIM, vectors: packed }));
  console.log(`embeddings: ${packed.length} x ${DIM} (${EMODEL})`);
} else {
  console.log("no GEMINI_API_KEY: skipped embeddings, retrieval runs BM25-only");
}
const pages = {};
for (const c of chunks) pages[c.page.split("/")[1]] = (pages[c.page.split("/")[1]] || 0) + 1;
console.log(JSON.stringify(pages));
