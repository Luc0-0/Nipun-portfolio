import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load env vars (prioritize .env.local for local dev)
dotenv.config({ path: '.env.local' });
dotenv.config();

// --- CONFIGURATION ---
const GITHUB_USERNAME = 'Luc0-0';
const OUTPUT_FILE = path.join(process.cwd(), 'src/data/projects.json');
const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional, for higher rate limits
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

// Categories mapped to strict rules
const CATEGORIES = {
    PRODUCTION: 'production',
    AI_SYSTEMS: 'ai-systems',
    LIBRARIES: 'libraries',
    LEARNING: 'learning'
};

const GENERIC_EXCLUDES = ['portfolio', 'readme', 'test', 'demo'];

// Manual Description Overrides
const DESCRIPTION_OVERRIDES = {
    'learning-nlp-from-scratch': 'A comprehensive collection of NLP implementations built from the ground up. Includes Bag of Words, TF-IDF, LSA, and Topic Modeling with clear, step-by-step Jupyter notebooks.',
    'fake-news-classification-nlp': 'Standardized binary classification pipeline comparing Logistic Regression and Linear SVM (~87% acc) using TF-IDF features for interpretable fake news detection.',
    'xlnet-emotion-classifier': 'Fine-tuned XLNet for emotion classification. Achieved 87% accuracy with detailed training diagnostics and confusion matrix analysis.'
};

// Strict Whitelist for Libraries
const LIBRARY_WHITELIST = ['neuroflow', 'smarttimer'];

// --- DETERMINISTIC CLASSIFICATION RULES ---
const RULES = [
    {
        category: CATEGORIES.LIBRARIES,
        test: (text, repo) => LIBRARY_WHITELIST.includes(repo.name.toLowerCase())
    },
    {
        category: CATEGORIES.LEARNING,
        test: (text) => /course|assignment|practice|learning|tutorial|algorithm|leetcode/.test(text)
    },
    {
        category: CATEGORIES.PRODUCTION,
        test: (text, repo) => (
            repo.homepage ||
            /deployed|production|live site|demo link/.test(text)
        )
    },
    {
        category: CATEGORIES.AI_SYSTEMS,
        test: (text) => /model|training|inference|dataset|nlp|computer vision|pytorch|tensorflow|transformers|llm|rag|embedding/.test(text)
    }
];

// --- HELPERS ---

async function fetchJSON(url) {
    const headers = {
        'User-Agent': 'nipun-portfolio-sync-bot',
        'Accept': 'application/vnd.github.v3+json'
    };
    if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`;

    const res = await fetch(url, { headers });
    if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`GitHub API Error ${res.status}: ${res.statusText}`);
    }
    return res.json();
}

async function fetchReadme(repoName, defaultBranch) {
    const rawUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${defaultBranch}/README.md`;
    try {
        const res = await fetch(rawUrl);
        if (res.ok) return await res.text();
    } catch (e) {
        console.warn(`Failed to fetch README for ${repoName}`);
    }
    return '';
}

async function classifyWithGemini(repo, readme) {
    if (!GEMINI_API_KEY) {
        console.warn(`⚠️ Skipped AI classification for ${repo.name} (No API Key). Defaulting to LEARNING.`);
        return CATEGORIES.LEARNING;
    }

    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
        Classify this GitHub repository into STRICTLY ONE of these categories:
        - production (deployed, maintained, user-facing)
        - ai-systems (ML/DL/NLP models, research code)
        - libraries (reusable tools, SDKs, packages)
        - learning (coursework, practice, minimal scripts)

        Repo Name: ${repo.name}
        Description: ${repo.description}
        README snippet: ${readme.slice(0, 1000)}

        Return ONLY the category name. No markdown. No punctuation.
        `;

        const result = await model.generateContent(prompt);
        const text = result.response.text().trim().toLowerCase();

        if (Object.values(CATEGORIES).includes(text)) return text;
        return CATEGORIES.LEARNING; // Fallback
    } catch (error) {
        console.error(`AI Classification failed for ${repo.name}:`, error.message);
        return CATEGORIES.LEARNING;
    }
}

async function classifyRepo(repo, readme) {
    const fullText = `${repo.name} ${repo.description || ''} ${readme}`.toLowerCase();

    // 1. Deterministic Phase
    for (const rule of RULES) {
        if (rule.test(fullText, repo)) {
            return rule.category;
        }
    }

    // 2. Fallback Phase (AI)
    return await classifyWithGemini(repo, readme);
}

// --- MAIN ---

async function main() {
    console.log(`🚀 Starting Project Sync for ${GITHUB_USERNAME}...`);

    // 0. Load Existing Data (for incremental updates)
    let existingProjects = [];
    try {
        const data = await fs.readFile(OUTPUT_FILE, 'utf-8');
        existingProjects = JSON.parse(data);
    } catch (e) {
        console.log("No existing data found. Starting fresh.");
    }

    // Map: id -> category
    const categoryMap = new Map(existingProjects.map(p => [p.id, p.category]));

    // 1. Fetch Repos
    const repos = await fetchJSON(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=public`);

    if (!Array.isArray(repos)) {
        console.error("CRITICAL: GitHub API did not return an array. Response:", repos);
        process.exit(1);
    }

    const validRepos = repos.filter(r => !r.fork && !r.archived && !r.private && r.name !== 'Luc0-0'); // Filter out profile repo

    console.log(`📡 Found ${validRepos.length} public repositories.`);

    const projects = [];

    // 2. Process each repo
    for (const repo of validRepos) {
        console.log(`Processing ${repo.name}...`);

        const repoId = repo.name.toLowerCase();
        let category;

        // A. Check for Manual Tags in Description [cat:library]
        const tagMatch = repo.description?.match(/\[cat:([a-z-]+)\]/i);
        if (tagMatch) {
            const tag = tagMatch[1].toLowerCase();
            if (Object.values(CATEGORIES).includes(tag)) {
                category = tag;
                console.log(`   ↳ Tag detected: ${category}`);
            }
        }

        // B. Incremental Check (Reuse existing if not tagged)
        if (!category && categoryMap.has(repoId)) {
            category = categoryMap.get(repoId);
            console.log(`   ↳ Preserving existing category: ${category}`);
        }

        // C. Run Classification (Only for NEW repos or if no history)
        if (!category) {
            const readme = await fetchReadme(repo.name, repo.default_branch);
            category = await classifyRepo(repo, readme);
            console.log(`   ↳ New Classification: ${category}`);
        }

        // Always fetch README for content/tech (optional optimization: skip this too if static)
        // For now, we only cache category to save AI tokens, but fetch README for updated content.
        let readme = '';
        if (!categoryMap.has(repoId) && !tagMatch) {
            // If we just classified it, we have the readme. If we skipped classification, we might need it for tech stack.
            // Optimize: Fetching README again is cheap compared to AI.
            readme = await fetchReadme(repo.name, repo.default_branch);
        } else {
            readme = await fetchReadme(repo.name, repo.default_branch);
        }

        // Normalize Tech Stack (heuristic)
        const tech = [];
        if (repo.language) tech.push(repo.language);
        if (readme.includes('React')) tech.push('React');
        if (readme.includes('Tailwind')) tech.push('Tailwind');
        if (readme.includes('Python')) tech.push('Python');
        if (readme.includes('FastAPI')) tech.push('FastAPI');
        if (readme.includes('Three.js')) tech.push('Three.js');

        // Deduplicate tech
        const uniqueTech = [...new Set(tech)].slice(0, 5);

        projects.push({
            id: repo.name.toLowerCase(), // Stable ID
            name: repo.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), // Title Case
            category: category,
            description: DESCRIPTION_OVERRIDES[repo.name.toLowerCase()] || repo.description || "No description provided.",
            tech: uniqueTech,
            repoUrl: repo.html_url,
            liveUrl: repo.homepage || null,
            source: 'github',
            lastUpdated: repo.updated_at,
            stars: repo.stargazers_count
        });
    }

    // 3. Sort by priority (Production > AI > Stars > Date)
    projects.sort((a, b) => {
        const catOrder = { [CATEGORIES.PRODUCTION]: 4, [CATEGORIES.AI_SYSTEMS]: 3, [CATEGORIES.LIBRARIES]: 2, [CATEGORIES.LEARNING]: 1 };
        const scoreA = (catOrder[a.category] || 0) * 1000 + a.stars;
        const scoreB = (catOrder[b.category] || 0) * 1000 + b.stars;
        return scoreB - scoreA;
    });

    // 4. Write Data
    await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(projects, null, 2));

    console.log(`✅ Sync Complete. Generated ${projects.length} projects in ${OUTPUT_FILE}`);
}

main().catch(err => {
    console.error('❌ Sync Failed:', err);
    process.exit(1);
});
