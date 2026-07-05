# Nipun-portfolio — tool routing (token discipline)

Mirror of the global tool hierarchy so code search / analysis stay token-lean in THIS repo too. These override default reach-for-Grep/Read habits.

## Code search hierarchy
1. **semble MCP** — FIRST choice for "where is X", "how does Y work", find usages, locate code (semantic + lexical). Pass repo root `c:\projects\Nipun-portfolio`.
2. **Grep** — only for exact-string inventory / counts (e.g. "every `Luc0-0`"), or when semble returns nothing. Literal-substring work is grep's job, not semble's.
3. **Read** — ONLY when about to Edit a file (Edit needs the content in context). NOT for analysis/exploration/summarizing.

## Analysis / large output (route through ctx when connected)
- Reading a file to **analyze/summarize** (not edit) → `ctx_execute_file(path, language, code)` — raw file stays in sandbox, only printed summary enters context.
- Searches with big result sets → `ctx_execute(language:"shell", code:"grep ...")` — only stdout enters context.
- Build / long logs → `ctx_execute` the command (e.g. vite build); surface only the pass/fail + errors, not the whole log.
- Multiple commands + queries at once → `ctx_batch_execute`.

## Web / URLs — BLOCKED via Bash
- No `curl` / `wget` / inline `fetch('http`/`requests.get(`. Use `ctx_fetch_and_index(url, source)` then `ctx_search(queries)`.
- No WebFetch.

## Bash
Only for: `git`, `mkdir/rm/mv/cp`, `ls`, `npm install`, `npx vite build`, and other short-output commands.

## Notes
- semble + ctx are sometimes disconnected mid-session; when a tool is unavailable, fall back (grep/Read) and note it.
- Edits inherently need Read — ctx does not save tokens on edit-heavy work, only on search/analysis/logs.
- No code comments unless asked (token-lean). Write artifacts to files, return path + 1-line.
