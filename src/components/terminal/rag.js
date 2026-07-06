const STOP = new Set("a about an and are as at be by can did do does for from had has have he her his how i in is it its me more of on or page she tell that the them then they this to us was we what when where which who why will with you your".split(" "));

const tokenize = (s) =>
  s.toLowerCase().split(/[^a-z0-9+#.]+/).filter((w) => w.length > 1 && !STOP.has(w)).map((w) => (w.length > 3 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w));

let index = null;
let emb = null;
let embTried = false;

async function load() {
  if (index) return index;
  const res = await fetch("/rag/chunks.json");
  const chunks = await res.json();
  const df = new Map();
  const docs = chunks.map((c) => {
    const terms = tokenize(`${c.title} ${c.title} ${c.text}`);
    const tf = new Map();
    for (const t of terms) tf.set(t, (tf.get(t) || 0) + 1);
    for (const t of tf.keys()) df.set(t, (df.get(t) || 0) + 1);
    return { ...c, tf, len: terms.length };
  });
  const avgLen = docs.reduce((a, d) => a + d.len, 0) / docs.length;
  index = { docs, df, N: docs.length, avgLen };
  return index;
}

async function loadEmb() {
  if (embTried) return emb;
  embTried = true;
  try {
    const r = await fetch("/rag/embeddings.json");
    if (r.ok) emb = await r.json();
  } catch {
    emb = null;
  }
  return emb;
}

async function queryVector(question) {
  try {
    const r = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ embed: question }) });
    if (!r.ok) return null;
    return (await r.json()).vector;
  } catch {
    return null;
  }
}

function lexRank(question, route, { docs, df, N, avgLen }) {
  const qTerms = [...new Set(tokenize(question))];
  const k1 = 1.4;
  const b = 0.6;
  return docs
    .map((d) => {
      let score = 0;
      for (const t of qTerms) {
        const f = d.tf.get(t);
        if (!f) continue;
        const idf = Math.log(1 + (N - df.get(t) + 0.5) / (df.get(t) + 0.5));
        score += idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + b * (d.len / avgLen))));
      }
      if (route !== "/" && d.page === route) score = score * 1.5 + 4;
      return { d, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b2) => b2.score - a.score);
}

const strip = (list, k) => {
  const seen = new Set();
  return list.filter((s) => (seen.has(s.d.title) ? false : seen.add(s.d.title))).slice(0, k).map((s) => ({ page: s.d.page, title: s.d.title, text: s.d.text }));
};

const BROAD = /\b(best|top|favorite|favourite|most|impressive|compare|comparison|versus|vs|recommend|should i|strongest|weakest|good at|rank|overview|portfolio|main|primary|major|key|notable|showcase|highlight|flagship|proud|shipped|built|builds?|projects?|worked|working|done|doing|made|created)\b/i;

export async function retrieve(question, route = "/", k = 5) {
  const idx = await load();
  const broad = BROAD.test(question);
  if (broad) {
    const catalog = idx.docs.filter((d) => d.kind === "meta" || (d.kind === "fact" && /Achievements|Skills overview|Current focus|Flagship/.test(d.title)));
    const lexTop = lexRank(question, route, idx).slice(0, 4);
    const seen = new Set();
    const merged = [...catalog.map((d) => ({ d, score: 1 })), ...lexTop].filter((s) => (seen.has(s.d.id) ? false : seen.add(s.d.id)));
    return merged.slice(0, 14).map((s) => ({ page: s.d.page, title: s.d.title, text: s.d.text }));
  }
  const lex = lexRank(question, route, idx);

  const E = await loadEmb();
  if (!E) return strip(lex, k);
  const qv = await queryVector(question);
  if (!qv) return strip(lex, k);

  const t = qv.slice(0, E.dim);
  const n = Math.hypot(...t) || 1;
  const qn = t.map((x) => x / n);
  const sem = idx.docs
    .map((d, i) => {
      const v = E.vectors[i];
      let dot = 0;
      for (let j = 0; j < qn.length; j++) dot += qn[j] * v[j];
      return { d, score: dot };
    })
    .sort((a, b2) => b2.score - a.score)
    .slice(0, 20);

  const K = 60;
  const fused = new Map();
  const add = (list, weight) =>
    list.forEach((s, rank) => {
      const cur = fused.get(s.d.id) || { d: s.d, score: 0 };
      cur.score += weight / (K + rank + 1);
      fused.set(s.d.id, cur);
    });
  add(lex.slice(0, 20), 1);
  add(sem, 1);
  if (route !== "/") for (const cur of fused.values()) if (cur.d.page === route) cur.score += 0.004;

  return strip([...fused.values()].sort((a, b2) => b2.score - a.score), k);
}

export async function askStream(question, route, onToken) {
  const chunks = await retrieve(question, route, 5);
  const res = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question, chunks }) });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.error || "assistant unavailable");
  }
  const rd = res.body.getReader();
  const dec = new TextDecoder();
  while (true) {
    const { done, value } = await rd.read();
    if (done) break;
    onToken(dec.decode(value, { stream: true }));
  }
  return chunks.slice(0, 2);
}
