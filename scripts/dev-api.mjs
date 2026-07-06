import "dotenv/config";
import { createServer } from "http";
import handler from "../api/ask.js";

const wrap = (res) => {
  res.status = (c) => {
    res.statusCode = c;
    return res;
  };
  res.json = (o) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(o));
  };
  return res;
};

createServer((req, res) => {
  if (!req.url.startsWith("/api/ask")) {
    res.statusCode = 404;
    return res.end("not found");
  }
  Promise.resolve(handler(req, wrap(res))).catch((e) => {
    console.error(e);
    if (!res.headersSent) wrap(res).status(500).json({ error: "dev server error" });
    else res.end();
  });
}).listen(3001, () => {
  console.log("api dev server on http://localhost:3001  (key: " + (process.env.OLLAMA_API_KEY ? "loaded" : "MISSING — add OLLAMA_API_KEY to .env") + ")");
});
