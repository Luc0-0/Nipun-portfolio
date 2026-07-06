# Nipun Sujesh — Portfolio

Terminal-themed portfolio, live at [nipun.space](https://nipun.space). React 19 + Vite, one red accent, command-bar navigation, sounds, and an ASCII-fluid about page.

## LucBot v1

The resident daemon in the command bar. Type a question (no `/`) and it answers from the site's own content:

- Hybrid retrieval: hand-rolled BM25 + Gemini embeddings, merged with reciprocal rank fusion, page-aware boosts
- Serves answers via a Vercel function speaking the HTTP QUERY method (RFC 10008) with POST fallback, streaming from gpt-oss on Ollama Cloud
- Function-calling: suggests pages as clickable buttons, never navigates without consent
- Voice input via the Web Speech API
- Answers only from indexed site data; refuses instead of inventing

## Running locally

```bash
git clone https://github.com/Luc0-0/Nipun-portfolio.git
cd Nipun-portfolio && npm install
# .env: OLLAMA_API_KEY, GEMINI_API_KEY, OLLAMA_MODEL, VITE_WEB3FORMS_KEY
node scripts/dev-api.mjs   # terminal 1 — LucBot API
npm run dev                # terminal 2
```

---
[Live Site](https://www.nipun.space) · [LinkedIn](https://linkedin.com/in/nipun-sujesh) · [GitHub](https://github.com/Luc0-0) · [Email](mailto:nipunsujesh28@gmail.com)
