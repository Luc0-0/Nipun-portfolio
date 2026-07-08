const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const hits = new Map();

const redis = async (path) => {
  const r = await fetch(`${URL_}/${path}`, { headers: { Authorization: `Bearer ${TOKEN}` } });
  if (!r.ok) throw new Error(String(r.status));
  return (await r.json()).result;
};

const counts = async (id) => {
  const raw = (await redis(`hgetall/pred:${id}`)) || [];
  const o = { h: 0, a: 0 };
  for (let i = 0; i < raw.length; i += 2) o[raw[i]] = Number(raw[i + 1]) || 0;
  return o;
};

export default async function handler(req, res) {
  if (!URL_ || !TOKEN) return res.status(204).end();
  try {
    if (req.method === "GET") {
      const id = String(req.query?.id || new URLSearchParams(req.url.split("?")[1] || "").get("id") || "").replace(/\D/g, "");
      if (!id) return res.status(400).json({ error: "no id" });
      res.setHeader("Cache-Control", "s-maxage=30");
      return res.status(200).json(await counts(id));
    }
    if (req.method === "POST") {
      let body = req.body;
      if (!body || typeof body !== "object") {
        const raw = await new Promise((ok) => {
          let d = "";
          req.on("data", (c) => (d += c));
          req.on("end", () => ok(d));
        });
        body = JSON.parse(raw || "{}");
      }
      const id = String(body.id || "").replace(/\D/g, "");
      const side = body.side === "a" ? "a" : body.side === "h" ? "h" : null;
      if (!id || !side) return res.status(400).json({ error: "bad vote" });
      const ip = (req.headers["x-forwarded-for"] || "?").split(",")[0].trim();
      const key = `${ip}:${id}`;
      if ((hits.get(key) || 0) >= 3) return res.status(200).json(await counts(id));
      hits.set(key, (hits.get(key) || 0) + 1);
      await redis(`hincrby/pred:${id}/${side}/1`);
      await redis(`expire/pred:${id}/604800`);
      return res.status(200).json(await counts(id));
    }
    return res.status(405).json({ error: "GET or POST" });
  } catch {
    return res.status(204).end();
  }
}
