# nipun.os — the terminal portfolio

Live at **[nipun.space](https://nipun.space)**. Black screen, one red, a command bar at the bottom. Everything else grew out of that.

Built by [Nipun Sujesh](https://linkedin.com/in/nipun-sujesh), AI engineer. Final-year B.E. in AI & Data Science, currently automating workflows at impress.ai and building [Uni-Verse](https://uni-verse.co.in).

## LucBot

The daemon that lives in the command bar. Type a question instead of a command and it answers, about me, from the site's own content. It is loyal, slightly smug, and refuses to make things up.

Under the hood:

- **Hybrid retrieval.** A BM25 scorer written from scratch in ~40 lines of browser JS, plus Gemini embeddings truncated to 256 dims, merged with reciprocal rank fusion. 91 chunks, built from the site's real data files on every deploy.
- **Page-aware.** Ask "what is this project" while standing on a project page and it knows where you are.
- **Judgment mode.** Comparative questions ("best project?") pull the whole catalog so the model can reason across everything, then commit to an opinion it can justify.
- **Function calling.** When a page answers your question better, LucBot offers a red button. It suggests, you click. It never navigates on its own.
- **Honest by construction.** Answers come only from retrieved context. Off-data questions get "the boss hasn't loaded that into my memory."
- **Transport.** A Vercel function that speaks the HTTP QUERY method (RFC 10008) with POST fallback, streaming from gpt-oss on Ollama Cloud. Keys never touch the browser.
- Voice input via the Web Speech API, if your browser has it.

Retrieval is validated by a small golden-set eval that caught three real bugs before launch: a missing stopword, missing plural stemming, and a route boost that multiplied zero instead of adding to it.

## The pages

| route | what happens there |
|---|---|
| `/` | pixel wordmark, boot sequence (once per session), ASCII portrait, live football scoreboard |
| `/work` | infinite project strip; every project opens as a file-view doc with interactive diagrams |
| `/about` | a system monitor of a person: ASCII fluid that reacts to typing, htop telemetry, draggable mind map, boot-log timeline |
| `/skills` | one radar, 26 skills, 6 sectors, click to zoom |
| `/services` | web, AI apps, RAG chatbots; a 3D ring of theme concepts; briefs land straight in my inbox |
| `/writing` | notes from building: memory systems, agents, production RAG, MCP |
| `/achievements` | certs and wins, expandable to the actual certificates |
| `/opensource` | GodProfile (an MCP server) and learning notebooks |
| `/contact` | compose to my inbox, no middleman |
| `/map` | the site drawn as its own engineering blueprint, LucBot wired in as a daemon on the bus |

## The scoreboard

Two wireframe goals face each other on the home page, drawn like a sideline broadcast camera. Between them: the next big fixture, or the live score with a minute that ticks. When a goal is scored in a real match, a ball arcs into the scoring side's net and the mesh ripples. Scorers and match context flip through a small feed on the right.

Data comes from football-data.org through a cached serverless proxy (one upstream call a minute, no matter how many visitors). During the World Cup it follows the World Cup; the rest of the year it follows whatever big match is next. Append `?demo` to the URL to watch a scripted 3-2 thriller.

## Stack

React 19 · Vite · Tailwind · Framer Motion · Three.js · Vercel functions · Ollama Cloud (gpt-oss) · Gemini embeddings · Web Audio API for every sound (synthesized, zero samples) · one red: `#dd2316`

## Running it locally

```bash
git clone https://github.com/Luc0-0/Nipun-portfolio.git
cd Nipun-portfolio && npm install

# .env
# OLLAMA_API_KEY=...      answers (chat)
# GEMINI_API_KEY=...      embeddings
# OLLAMA_MODEL=gpt-oss:120b
# VITE_WEB3FORMS_KEY=...  contact forms
# FOOTBALL_DATA_KEY=...   scoreboard

node scripts/dev-api.mjs   # terminal 1: LucBot + scores API
npm run dev                # terminal 2: the site
```

Missing keys degrade gracefully: no football key, no scoreboard; no Gemini key, retrieval falls back to pure BM25.

---
[nipun.space](https://www.nipun.space) · [LinkedIn](https://linkedin.com/in/nipun-sujesh) · [GitHub](https://github.com/Luc0-0) · [nipunsujesh28@gmail.com](mailto:nipunsujesh28@gmail.com)
