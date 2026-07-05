// README.md = full scrollable doc (default). Each other file = the detailed deep-dive.
// Block types: h | p | quote | list | kv | stack | image | code | links
const STACK_GROUPS = [
  { label: "Frontend", items: [["react", "React 19"], ["vite", "Vite 7"], ["framer", "Framer Motion"], ["gsap", "GSAP"]] },
  { label: "Backend", items: [["python", "Python"], ["fastapi", "FastAPI"], ["sqlalchemy", "SQLAlchemy 2.0"]] },
  { label: "Database", items: [["postgresql", "PostgreSQL 15"], ["supabase", "Supabase"]] },
  { label: "AI / ML", items: [["pytorch", "XLNet / PyTorch"], ["ollama", "Ollama Cloud"]] },
  { label: "Auth & Deploy", items: [["jwt", "JWT"], ["docker", "Docker"], ["vercel", "Vercel"], ["railway", "Railway"]] },
];
const LINKS = [
  { label: "live demo → serenity.nipun.space", href: "https://serenity.nipun.space" },
  { label: "source → github.com/Luc0-0", href: "https://github.com/Luc0-0/Serenity-Multi-Modal-Mental-Assistant-System" },
];
const API_ROWS = [
  ["POST /api/auth/signup", "Register"],
  ["POST /api/auth/login", "Login, returns JWT"],
  ["POST /api/chat", "Send message, returns AI response"],
  ["GET /api/conversations", "List user conversations"],
  ["GET /api/emotions/analytics", "Emotion trend data"],
  ["GET /api/journal", "Journal entries"],
  ["POST /api/journal", "Create journal entry"],
  ["GET /health", "Health check"],
];

export const PROJECT_DETAILS = {
  serenity: {
    title: "Serenity",
    tag: "PRODUCTION",
    year: "2025",
    stack: "Python · React · FastAPI · Ollama",
    live: "https://serenity.nipun.space",
    repo: "https://github.com/Luc0-0/Serenity-Multi-Modal-Mental-Assistant-System",
    sections: [
      {
        id: "readme",
        label: "README.md",
        title: null,
        blocks: [
          { type: "quote", text: "A quieter place for your mind." },
          { type: "p", text: "Serenity is an AI-powered mental-health companion, built as a final-year BTech (AI & Data Science) project. It combines a layered memory system, adaptive personality, real-time emotion detection, and crisis-safe response logic into a single full-stack application, deployed and actively in development." },
          { type: "links", items: LINKS },

          { type: "h", text: "What it does" },
          { type: "p", text: "Most chatbots forget you the moment a conversation ends. Serenity doesn't. Every interaction is stored across four memory tiers (short-term context, semantic vector memory, a 30-day emotional profile, and pattern-based meta-reflections), so the assistant builds a genuine understanding of the user over time." },
          { type: "p", text: "Alongside memory, it runs a real-time emotion pipeline on every message, adapts its personality to what the user needs in that moment, and routes any input flagged as a crisis through a hardened response path before the LLM ever sees it." },

          { type: "h", text: "Architecture" },
          { type: "p", text: "The system is divided into five layers, each swappable at config level." },
          { type: "arch" },
          { type: "kv", rows: [
            ["Frontend", "React 19 SPA (Vite, CSS Modules, Framer Motion, GSAP)"],
            ["Backend", "FastAPI, async SQLAlchemy 2.0, pluggable Emotion / LLM / Crisis engines"],
            ["Database", "PostgreSQL 15 (Supabase), 10 tables, Alembic"],
            ["AI / ML", "keyword (~65%) + XLNet (~88%) emotion, Ollama Cloud LLM with fallback"],
            ["Infra", "Docker Compose dev; Vercel + Railway + Supabase prod"],
          ] },

          { type: "h", text: "Memory System" },
          { type: "p", text: "The core technical contribution. Each chat message triggers a four-tier memory bundle before the LLM prompt is assembled." },
          { type: "kv", rows: [
            ["Short-term", "Cached conversation summaries (session)"],
            ["Semantic", "384-dim vector similarity search (sentence-transformers)"],
            ["Emotional Profile", "30-day rolling aggregation (12h cache)"],
            ["Meta-Reflections", "Journal + conversation pattern synthesis (2d cache)"],
          ] },
          { type: "p", text: "The LLM receives all four tiers as structured context, so responses reference past states, recurring themes and long-term patterns, not just the last few messages." },

          { type: "h", text: "Crisis Detection" },
          { type: "p", text: "Crisis assessment runs first, before any LLM call. A conservative keyword engine (high precision over recall) classifies severity and returns resources (988, 741741, 911) on trigger; the turn terminates there and nothing reaches the LLM. Events are logged with severity and keywords." },

          { type: "h", text: "Chat Flow" },
          { type: "chatflow" },
          { type: "p", text: "Input → crisis check → ConversationService → EmotionService → ContextManager → 4-tier memory bundle → LLM prompt → Ollama → save → background tasks → typewriter display." },

          { type: "h", text: "Tech Stack" },
          { type: "stack", groups: STACK_GROUPS },

          { type: "h", text: "Feature Status" },
          { type: "features" },
          { type: "p", text: "Shipped: real-time streaming chat, four-mode personality, four-tier memory, crisis detection, journal + analytics, JWT auth, Docker deploy. In progress: XLNet as the default emotion engine, the Insights visualisations, and mobile polish. Planned: voice input, wearable integration, and a therapist portal." },

          { type: "h", text: "Running Locally" },
          { type: "p", text: "Prerequisites: Docker and Docker Compose." },
          { type: "code", text: "git clone https://github.com/Luc0-0/Serenity-Multi-Modal-Mental-Assistant-System\ncd Serenity-Multi-Modal-Mental-Assistant-System\ncp backend/.env.example backend/.env\ndocker-compose up --build" },

          { type: "h", text: "API" },
          { type: "kv", rows: API_ROWS },

          { type: "h", text: "Status" },
          { type: "p", text: "Deployed and functional, actively in development. License: AGPL-3.0." },

          { type: "h", text: "Links" },
          { type: "links", items: LINKS },
        ],
      },
      {
        id: "features",
        label: "features.md",
        title: "What it does",
        blocks: [
          { type: "p", text: "Most chatbots forget you the moment a conversation ends. Serenity doesn't. Every interaction is stored across four memory tiers, so the assistant builds a genuine understanding of the user over time rather than starting cold each session." },
          { type: "list", items: [
            "Four-tier memory: short-term context, semantic vector memory, a 30-day emotional profile, and pattern-based meta-reflections",
            "Real-time emotion pipeline that runs on every message",
            "Adaptive personality (four modes) that shifts to what the user needs in the moment",
            "Crisis inputs routed through a hardened response path before the LLM ever sees them",
            "Journal with AI extraction, emotion analytics dashboard, streaming (SSE) chat",
          ] },
        ],
      },
      {
        id: "architecture",
        label: "architecture.md",
        title: "Architecture",
        blocks: [
          { type: "p", text: "The system is divided into five layers. Each is swappable at config level, so engines can be replaced without touching service code." },
          { type: "arch" },
          { type: "kv", rows: [
            ["Frontend", "React 19 SPA with Vite, CSS Modules, Framer Motion and GSAP. Pages: CheckIn (chat), Journal, Insights, Meditate, Profile. State via context providers with localStorage persistence."],
            ["Backend", "FastAPI with async SQLAlchemy 2.0. AI logic lives in a pluggable engine system (EmotionEngine, LLMEngine, CrisisEngine), swappable at config level. Background tasks run non-blocking via FastAPI BackgroundTasks."],
            ["Database", "PostgreSQL 15 on Supabase. 10 tables: users, conversations, messages, emotion logs, journal entries, crisis events, semantic memories, emotional profiles, meta-reflections, context cache. Migrations via Alembic."],
            ["AI / ML", "Keyword emotion engine (~65%, no GPU). Optional XLNet (~88%) and Ollama-based detection are pluggable. LLM via Ollama Cloud (gpt-oss:120b) with a template fallback chain."],
            ["Infrastructure", "Docker Compose for local dev. Production across Vercel (frontend), Railway (backend), Supabase (PostgreSQL)."],
          ] },
        ],
      },
      {
        id: "memory",
        label: "memory.md",
        title: "Memory System",
        blocks: [
          { type: "p", text: "The core technical contribution. Each chat message triggers a four-tier memory bundle before the LLM prompt is assembled." },
          { type: "kv", rows: [
            ["Short-term", "Cached conversation summaries (session TTL)"],
            ["Semantic", "384-dim vector similarity search via sentence-transformers"],
            ["Emotional Profile", "30-day rolling emotion aggregation (12h cache)"],
            ["Meta-Reflections", "Journal + conversation pattern synthesis (2d cache)"],
          ] },
          { type: "p", text: "The LLM receives all four tiers as structured context, allowing responses that reference past emotional states, recurring themes and long-term patterns, not just the last few messages." },
        ],
      },
      {
        id: "crisis",
        label: "crisis.md",
        title: "Crisis Detection",
        blocks: [
          { type: "p", text: "Crisis assessment runs as the first step in every request, before any LLM call. It uses a keyword-based engine, intentionally conservative (high precision over recall), that classifies severity." },
          { type: "p", text: "If triggered, it immediately returns appropriate resources (988, 741741, 911) and the conversation terminates at that point; no LLM response is generated. Crisis events are logged to a dedicated table with severity, detected keywords and acknowledgement state." },
        ],
      },
      {
        id: "chatflow",
        label: "chatflow.md",
        title: "Chat Flow",
        blocks: [
          { type: "chatflow" },
          { type: "p", text: "Full pipeline, from user input to the typewriter display:" },
          { type: "list", items: [
            "User input (CheckIn, ChatContext, api.js validation)",
            "Crisis assessment (keyword match, severity, critical path)",
            "ConversationService, then EmotionService (keyword engine, optional XLNet)",
            "ContextManager assembles the 4-tier memory bundle",
            "LLM prompt assembly → Ollama Cloud",
            "Save to DB → non-blocking background tasks → typewriter display",
          ] },
        ],
      },
      {
        id: "stack",
        label: "stack.md",
        title: "Tech Stack",
        blocks: [{ type: "stack", groups: STACK_GROUPS }],
      },
      {
        id: "api",
        label: "api.md",
        title: "API Endpoints",
        blocks: [
          { type: "p", text: "REST endpoints exposed by the FastAPI backend." },
          { type: "kv", rows: API_ROWS },
        ],
      },
      {
        id: "running",
        label: "running.md",
        title: "Running Locally",
        blocks: [
          { type: "p", text: "Prerequisites: Docker and Docker Compose." },
          { type: "code", text: "git clone https://github.com/Luc0-0/Serenity-Multi-Modal-Mental-Assistant-System\ncd Serenity-Multi-Modal-Mental-Assistant-System" },
          { type: "p", text: "Copy the environment file and fill in your values:" },
          { type: "code", text: "cp backend/.env.example backend/.env\n\nDATABASE_URL=postgresql+asyncpg://user:password@localhost:5432/serenity\nSECRET_KEY=your-secret-key\nOLLAMA_API_KEY=your-ollama-api-key\nOLLAMA_BASE_URL=https://ollama.com/v1" },
          { type: "p", text: "Start all services, then run migrations:" },
          { type: "code", text: "docker-compose up --build\ndocker exec -it serenity-backend alembic upgrade head" },
        ],
      },
      {
        id: "status",
        label: "status.md",
        title: "Feature Status",
        blocks: [
          { type: "features" },
          { type: "p", text: "Deployed and functional, actively in development." },
          { type: "list", items: [
            "Shipped: streaming chat, four-mode personality, four-tier memory, crisis detection, journal + analytics, JWT auth, Docker deploy",
            "In progress: XLNet as default emotion engine, Insights visualisations, mobile polish",
            "Planned: voice input, wearable integration, therapist portal, multi-language",
          ] },
        ],
      },
      {
        id: "links",
        label: "links.md",
        title: "Links",
        blocks: [{ type: "links", items: LINKS }],
      },
    ],
  },

  pragati: {
    title: "Pragati", tag: "PRODUCTION", year: "2026", stack: "Python · Google ADK · AlloyDB · Gemini",
    live: "https://pragati-366193575719.us-central1.run.app", repo: "https://github.com/Luc0-0/pragati",
    sections: [
      {
        id: "readme", label: "README.md", title: null, blocks: [
          { type: "quote", text: "India's self-assembling public-health intelligence system." },
          { type: "p", text: "PRAGATI (Progressive Reasoning Agent for Global Advanced Total Intelligence), built for the Google Gen AI Academy APAC hackathon, Track 1: AI Agents with ADK." },
          { type: "links", items: [{ label: "live demo ↗", href: "https://pragati-366193575719.us-central1.run.app" }, { label: "source ↗", href: "https://github.com/Luc0-0/pragati" }] },
          { type: "h", text: "What makes it unique" },
          { type: "p", text: "Most AI agents are hand-coded with fixed tools. PRAGATI self-assembles its own MCP tools at runtime. Add a table to AlloyDB, restart, and it has a new tool, with zero code changes." },
          { type: "h", text: "How it boots" },
          { type: "list", items: ["Cartographer introspects the AlloyDB schema, no hardcoded table names", "Forge generates MCP Toolbox tool definitions from the discovered schema", "Root Orchestrator (ADK agent) routes natural-language queries to the right tool", "Gemini Flash synthesizes a natural-language answer from the raw data"] },
          { type: "h", text: "Tech Stack" },
          { type: "stack", groups: [{ label: "AI", items: [["gemini", "Gemini Flash"], ["python", "Python"]] }, { label: "Agents & Data", items: [["", "Google ADK"], ["", "AlloyDB"], ["", "MCP Toolbox"]] }, { label: "Deploy", items: [["", "Cloud Run"]] }] },
        ],
      },
      {
        id: "architecture", label: "architecture.md", title: "Architecture", blocks: [
          { type: "p", text: "At boot, the orchestrator wires its own tools from the live database schema, then routes each query to the right one." },
          { type: "arch",
            nodes: [
              { id: "q", type: "layer", position: { x: 200, y: 0 }, data: { title: "USER QUERY", items: ["natural language"] } },
              { id: "orch", type: "layer", position: { x: 200, y: 120 }, data: { title: "ROOT ORCHESTRATOR", items: ["Google ADK", "routing"] } },
              { id: "carto", type: "layer", position: { x: -30, y: 250 }, data: { title: "CARTOGRAPHER", items: ["schema introspect"] } },
              { id: "forge", type: "layer", position: { x: 430, y: 250 }, data: { title: "FORGE", items: ["MCP tool gen"] } },
              { id: "db", type: "layer", position: { x: -30, y: 380 }, data: { title: "ALLOYDB", items: ["live schema", "queries"] } },
              { id: "reg", type: "layer", position: { x: 430, y: 380 }, data: { title: "MCP REGISTRY", items: ["self-assembled"] } },
              { id: "gem", type: "layer", position: { x: 200, y: 500 }, data: { title: "GEMINI FLASH", items: ["NL synthesis"], crisis: true } },
            ],
            edges: [
              { id: "e1", source: "q", target: "orch", sourceHandle: "b", targetHandle: "t", label: "NL" },
              { id: "e2", source: "orch", target: "carto", sourceHandle: "b", targetHandle: "t" },
              { id: "e3", source: "orch", target: "forge", sourceHandle: "b", targetHandle: "t" },
              { id: "e4", source: "carto", target: "db", sourceHandle: "b", targetHandle: "t", label: "introspect" },
              { id: "e5", source: "forge", target: "reg", sourceHandle: "b", targetHandle: "t", label: "generates" },
              { id: "e6", source: "reg", target: "gem", sourceHandle: "b", targetHandle: "t" },
              { id: "e7", source: "db", target: "gem", sourceHandle: "b", targetHandle: "t", label: "data" },
            ],
          },
        ],
      },
      {
        id: "flow", label: "boot-flow.md", title: "Boot Flow", blocks: [
          { type: "p", text: "Each query flows through the self-assembled agent pipeline:" },
          { type: "chatflow", steps: [
            { t: "User query", s: "natural language" },
            { t: "Root Orchestrator", s: "Google ADK · routing" },
            { t: "Cartographer", s: "introspect AlloyDB schema" },
            { t: "Forge", s: "generate MCP tools from schema" },
            { t: "MCP Registry", s: "self-assembled tools" },
            { t: "Query AlloyDB", s: "via the selected tool" },
            { t: "Gemini Flash", s: "synthesize NL answer" },
          ] },
        ],
      },
      { id: "links", label: "links.md", title: "Links", blocks: [{ type: "links", items: [{ label: "live demo ↗", href: "https://pragati-366193575719.us-central1.run.app" }, { label: "source ↗", href: "https://github.com/Luc0-0/pragati" }] }] },
    ],
  },

  guardia: {
    title: "Guardia", tag: "PRODUCTION", year: "2026", stack: "YOLOv8-pose · Python · Android",
    live: null, repo: "https://github.com/kripasekar187-bit/guardia_final-year",
    sections: [
      {
        id: "readme", label: "README.md", title: null, blocks: [
          { type: "quote", text: "Real-time fall detection for elderly and solo-living safety." },
          { type: "p", text: "Guardia watches over people who live alone using pose estimation and acts fast when something goes wrong. A final-year project." },
          { type: "links", items: [{ label: "source ↗", href: "https://github.com/kripasekar187-bit/guardia_final-year" }] },
          { type: "h", text: "What it does" },
          { type: "list", items: ["Runs on a standard webcam, processing video in real time", "On a fall: speaks an \"Are you okay?\" prompt, then an alarm if there's no response", "Sends SMS and WhatsApp alerts to an emergency contact", "Uploads a snapshot of the fall to cloud storage", "Fall to SMS delivery in about 12 seconds"] },
          { type: "h", text: "Tech Stack" },
          { type: "stack", groups: [{ label: "Vision", items: [["python", "Python"], ["", "YOLOv8-pose"]] }, { label: "App", items: [["android", "Android"], ["", "Kotlin / Java"]] }] },
        ],
      },
      {
        id: "howitworks", label: "how-it-works.md", title: "How it works", blocks: [
          { type: "p", text: "Built on YOLOv8n-pose (pre-trained skeleton detection) with multi-signal heuristics layered on top, rather than a custom model." },
          { type: "list", items: ["Velocity spike: sudden downward acceleration of the body centre", "Horizontal posture: bounding-box aspect ratio flips when someone falls", "Spine angle: skeleton orientation crosses toward horizontal", "A fall is flagged only when 2 of the 3 signals trigger, cutting false positives", "Per-person tracking, a 3.5s grace period, and a raise-hand self-cancel"] },
        ],
      },
      {
        id: "pipeline", label: "pipeline.md", title: "Detection Pipeline", blocks: [
          { type: "p", text: "From a webcam frame to an alert:" },
          { type: "chatflow", steps: [
            { t: "Webcam frame", s: "real-time video" },
            { t: "YOLOv8-pose", s: "skeleton keypoints" },
            { t: "Signals", s: "velocity · posture · spine angle" },
            { t: "Fall flagged", s: "if 2 of 3 signals trigger", crisis: true },
            { t: "Grace period", s: "3.5s · raise hand to cancel" },
            { t: "Voice + alarm", s: "\"Are you okay?\" then alarm" },
            { t: "Alert", s: "SMS + WhatsApp to contact" },
            { t: "Snapshot", s: "upload to cloud" },
          ] },
        ],
      },
      {
        id: "results", label: "results.md", title: "Results", blocks: [
          { type: "p", text: "Tested on 75 clips across 7 categories with 3 subjects." },
          { type: "kv", rows: [["Accuracy", "91.0%"], ["Test set", "75 clips · 7 categories · 3 subjects"], ["Latency", "~12s fall to SMS"]] },
        ],
      },
      { id: "links", label: "links.md", title: "Links", blocks: [{ type: "links", items: [{ label: "source ↗", href: "https://github.com/kripasekar187-bit/guardia_final-year" }] }] },
    ],
  },

  samarth: {
    title: "Samarth", tag: "PRODUCTION", year: "2025", stack: "Next.js · FastAPI · data.gov.in",
    live: "https://samarth-two.vercel.app", repo: "https://github.com/Luc0-0/Samarth",
    sections: [
      {
        id: "readme", label: "README.md", title: null, blocks: [
          { type: "quote", text: "Intelligent Q&A for Indian agriculture." },
          { type: "p", text: "Samarth answers natural-language questions over Indian agriculture data, with live data.gov.in API integration, a Next.js frontend, and cloud deployment." },
          { type: "links", items: [{ label: "live demo ↗", href: "https://samarth-two.vercel.app" }, { label: "source ↗", href: "https://github.com/Luc0-0/Samarth" }] },
          { type: "h", text: "What you can ask" },
          { type: "list", items: ["Live: current crop prices in Maharashtra, latest mandi rates for wheat", "Historical (2001-2014): rainfall comparisons, rice production by state, cotton trends", "Analytical: correlation between rainfall and crop production"] },
          { type: "h", text: "Tech Stack" },
          { type: "stack", groups: [{ label: "Frontend", items: [["nextjs", "Next.js"], ["tailwind", "Tailwind"]] }, { label: "Backend", items: [["python", "Python"], ["fastapi", "FastAPI"]] }, { label: "Deploy", items: [["vercel", "Vercel"], ["", "Render"], ["docker", "Docker"]] }] },
        ],
      },
      {
        id: "architecture", label: "architecture.md", title: "Architecture", blocks: [
          { type: "p", text: "A natural-language question is parsed, then routed to live or historical data before an answer is composed." },
          { type: "arch",
            nodes: [
              { id: "fe", type: "layer", position: { x: 0, y: 40 }, data: { title: "NEXT.JS FRONTEND", items: ["Q&A UI"] } },
              { id: "be", type: "layer", position: { x: 270, y: 40 }, data: { title: "FASTAPI BACKEND", items: ["NLP", "routing"] } },
              { id: "live", type: "layer", position: { x: 540, y: -30 }, data: { title: "data.gov.in API", items: ["live mandi rates"] } },
              { id: "hist", type: "layer", position: { x: 540, y: 110 }, data: { title: "HISTORICAL DATA", items: ["2001-2014"] } },
            ],
            edges: [
              { id: "s1", source: "fe", target: "be", sourceHandle: "r", targetHandle: "l", label: "query" },
              { id: "s2", source: "be", target: "live", sourceHandle: "r", targetHandle: "l", label: "live" },
              { id: "s3", source: "be", target: "hist", sourceHandle: "r", targetHandle: "l", label: "history" },
            ],
          },
        ],
      },
      {
        id: "data", label: "data.md", title: "Data sources", blocks: [
          { type: "p", text: "Live market rates via the data.gov.in API, plus a historical dataset (2001-2014) for trends and correlations." },
        ],
      },
      {
        id: "running", label: "running.md", title: "Running", blocks: [
          { type: "code", text: "docker-compose up --build\n# frontend :3000  ·  backend :8000\n\n# local\npython run_server.py\ncd frontend/nextjs && npm install && npm run dev" },
        ],
      },
      { id: "links", label: "links.md", title: "Links", blocks: [{ type: "links", items: [{ label: "live demo ↗", href: "https://samarth-two.vercel.app" }, { label: "source ↗", href: "https://github.com/Luc0-0/Samarth" }] }] },
    ],
  },

  godprofile: {
    title: "GodProfile", tag: "BUILT", year: "2026", stack: "Python · MCP · PyPI",
    live: "https://luc0-0.github.io/GodProfile/", repo: "https://github.com/Luc0-0/GodProfile",
    sections: [{
      id: "readme", label: "README.md", title: null, blocks: [
        { type: "quote", text: "Turns your GitHub profile README into a god-tier art exhibit." },
        { type: "p", text: "GodProfile is an MCP server (published on PyPI) that ships 16 tools to generate glassmorphic SVGs, animated banners, live-data widgets, bento-grid layouts, and full GitHub Actions CI, all from a single MCP config line. Every visual in its own README was generated by GodProfile itself." },
        { type: "links", items: [{ label: "live demo ↗", href: "https://luc0-0.github.io/GodProfile/" }, { label: "source ↗", href: "https://github.com/Luc0-0/GodProfile" }] },
        { type: "h", text: "What it does" },
        { type: "list", items: ["16 MCP tools for profile art: animated terminals, banners, glassmorphic cards, bento grids, live widgets", "4 built-in themes", "One-line MCP config for Claude Desktop", "Generates GitHub Actions CI to keep the live widgets fresh"] },
        { type: "h", text: "Install" },
        { type: "code", text: "pip install godprofile-mcp" },
        { type: "h", text: "Tech Stack" },
        { type: "stack", groups: [{ label: "Core", items: [["python", "Python"], ["", "MCP Protocol"], ["", "PyPI"]] }] },
      ],
    }],
  },

  "smart-notes": {
    title: "Smart Notes", tag: "BUILT", year: "2026", stack: "Next.js · Firebase · Gemini",
    live: null, repo: "https://github.com/Luc0-0/Smart-notes-by-Nipun",
    sections: [{
      id: "readme", label: "README.md", title: null, blocks: [
        { type: "quote", text: "An intelligent note-taking app." },
        { type: "p", text: "Elevated Notes is a feature-rich note app built with Next.js, Firebase, and Google's Gemini via Genkit, for capturing thoughts, organizing projects, and enhancing writing with AI tools." },
        { type: "links", items: [{ label: "source ↗", href: "https://github.com/Luc0-0/Smart-notes-by-Nipun" }] },
        { type: "h", text: "AI features" },
        { type: "list", items: ["Summarize long notes", "Generate outlines from a title", "Rewrite for clarity and style", "Adjust tone", "Extract action items from meetings", "AI note starters from a prompt", "Auto-tagging on save"] },
        { type: "h", text: "Organization" },
        { type: "list", items: ["Specialized notebooks: General, Projects, Meetings, Personal", "Custom tags and browse-by-tag", "Full-text client-side search", "Archiving with restore"] },
        { type: "h", text: "Tech Stack" },
        { type: "stack", groups: [{ label: "Frontend", items: [["nextjs", "Next.js"], ["react", "React"], ["tailwind", "Tailwind"]] }, { label: "AI", items: [["gemini", "Gemini (Genkit)"]] }, { label: "Backend", items: [["firebase", "Firebase"]] }] },
      ],
    }],
  },

  studypath: {
    title: "StudyPath", tag: "BUILT", year: "2025", stack: "React · FastAPI · ReactFlow",
    live: null, repo: "https://github.com/Luc0-0/StudyPath",
    sections: [{
      id: "readme", label: "README.md", title: null, blocks: [
        { type: "quote", text: "Personalized learning roadmaps as interactive graphs." },
        { type: "p", text: "StudyPath.ai generates structured learning plans with milestones and subtopics, visualized as interactive dependency graphs." },
        { type: "links", items: [{ label: "source ↗", href: "https://github.com/Luc0-0/StudyPath" }] },
        { type: "h", text: "Features" },
        { type: "list", items: ["Structured learning plans with milestones and subtopics", "Interactive dependency-graph visualization (ReactFlow)", "Real-time form validation and error handling", "Rate-limited, CORS-protected API", "Optional PostgreSQL persistence for saved plans", "Responsive across desktop and tablet"] },
        { type: "h", text: "Tech Stack" },
        { type: "stack", groups: [{ label: "Frontend", items: [["react", "React 18"], ["vite", "Vite"], ["tailwind", "Tailwind"], ["", "ReactFlow"]] }, { label: "Backend", items: [["python", "Python"], ["fastapi", "FastAPI"], ["postgresql", "PostgreSQL"]] }] },
      ],
    }],
  },

  "task-manager-pro": {
    title: "Task Manager Pro", tag: "BUILT", year: "2025", stack: "React · Node · MongoDB",
    live: "https://task-manager-pro-are3-drab.vercel.app", repo: "https://github.com/Luc0-0/Task-manager-pro",
    sections: [{
      id: "readme", label: "README.md", title: null, blocks: [
        { type: "quote", text: "Production-ready full-stack task manager." },
        { type: "p", text: "A comprehensive task-management app built with React, Node.js, and MongoDB, with real-time collaboration, AI task creation, gamification, and analytics." },
        { type: "links", items: [{ label: "live demo ↗", href: "https://task-manager-pro-are3-drab.vercel.app" }, { label: "source ↗", href: "https://github.com/Luc0-0/Task-manager-pro" }] },
        { type: "h", text: "Features" },
        { type: "list", items: ["Core: JWT + Google OAuth, task CRUD, projects, tags + filtering, reminders", "Intermediate: subtasks + dependencies, recurring tasks, calendar drag-and-drop, smart search, progress tracking", "Advanced: natural-language AI task creation, real-time collaboration (WebSocket), gamification (XP / levels), analytics dashboard, team sharing"] },
        { type: "h", text: "Tech Stack" },
        { type: "stack", groups: [{ label: "Frontend", items: [["react", "React 18"], ["vite", "Vite"], ["tailwind", "Tailwind"], ["redux", "Redux Toolkit"], ["framer", "Framer Motion"], ["socketio", "Socket.io"]] }, { label: "Backend", items: [["node", "Node.js"], ["mongodb", "MongoDB"], ["jwt", "JWT"]] }] },
      ],
    }],
  },

  "xlnet-emotion": {
    title: "XLNet Emotion", tag: "BUILT", year: "2026", stack: "Python · PyTorch · XLNet",
    live: null, repo: "https://github.com/Luc0-0/xlnet-emotion-classifier",
    sections: [{
      id: "readme", label: "README.md", title: null, blocks: [
        { type: "quote", text: "Fine-tuned XLNet for emotion classification." },
        { type: "p", text: "Classifies social-media text into four emotions (anger, fear, joy, sadness). XLNet-base-cased, fine-tuned for sequence classification." },
        { type: "links", items: [{ label: "source ↗", href: "https://github.com/Luc0-0/xlnet-emotion-classifier" }] },
        { type: "h", text: "Results" },
        { type: "kv", rows: [["Accuracy", "87%"], ["Weighted F1", "0.87"], ["Dataset", "7,102 train · 347 val · 3,142 test"]] },
        { type: "h", text: "Usage" },
        { type: "code", text: "from xlnet_emotion.inference import EmotionPredictor\n\npredictor = EmotionPredictor(model, \"xlnet-base-cased\")\nresult = predictor.predict(\"This is amazing!\")\n# {\"label\": \"joy\", \"confidence\": 0.94}" },
        { type: "h", text: "Training" },
        { type: "list", items: ["XLNet-base-cased, sequence classification", "AdamW, learning rate 2e-5, batch size 8", "Preprocessing removes @mentions and #hashtags"] },
      ],
    }],
  },

  "fake-news-classifier": {
    title: "Fake News Classifier", tag: "BUILT", year: "2026", stack: "Python · scikit-learn · NLP",
    live: null, repo: "https://github.com/Luc0-0/fake-news-classification-nlp",
    sections: [{
      id: "readme", label: "README.md", title: null, blocks: [
        { type: "quote", text: "Fake-news detection with classical NLP." },
        { type: "p", text: "A clear, interpretable pipeline for binary fake-vs-factual news classification using classical NLP and linear models, focused on fundamentals over complex architectures." },
        { type: "links", items: [{ label: "source ↗", href: "https://github.com/Luc0-0/fake-news-classification-nlp" }] },
        { type: "h", text: "Pipeline" },
        { type: "list", items: ["Text preprocessing", "Feature extraction: Bag-of-Words / TF-IDF", "Linear classifiers: Logistic Regression vs Linear SVM", "Standard evaluation metrics"] },
        { type: "h", text: "Dataset" },
        { type: "p", text: "News articles with title, text, date, and a fake/factual label. A 70/30 train-test split." },
      ],
    }],
  },

  "uni-verse": {
    title: "Uni-Verse", tag: "CURRENT", year: "2026", stack: "Next.js · Supabase",
    live: "https://uni-verse.co.in", repo: null,
    sections: [{
      id: "readme", label: "README.md", title: null, blocks: [
        { type: "quote", text: "An honest, on-the-record platform for college life." },
        { type: "p", text: "Uni-Verse is what I'm building now: verified student voices about colleges, kept public and on the record. Actively in development." },
        { type: "links", items: [{ label: "live ↗ uni-verse.co.in", href: "https://uni-verse.co.in" }] },
        { type: "h", text: "Status" },
        { type: "p", text: "Currently building. More detail as it ships." },
      ],
    }],
  },
};
