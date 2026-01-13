import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useParams } from "react-router-dom";
import Navigation from "../components/premium/Navigation";
import Footer from "../components/premium/Footer";

// --- DATA DEFINITIONS ---

const SIGNATURE_PROJECTS_DATA = [
  {
    id: 1,
    title: "Samarth",
    subtitle: "AI + Gov Data | 2024–2025",
    summary:
      "Indian Government Data Q/A System. Web platform that retrieves, cleans, and structures domain information from Indian government datasets.",
    problem:
      "Government datasets are available but difficult for the public to search or interpret. Data accessibility and interpretability barriers prevent effective citizen engagement with public information.",
    approach:
      "Built a FastAPI backend with a structured retrieval layer using embeddings. Implemented domain classifiers for government data categorization. Created RAG pipeline for natural-language Q/A over government datasets. Designed clean React frontend for user-friendly interface.",
    outcome:
      "Consistent answer quality with high interpretability for agriculture and public data queries. Low latency responses with relevant government data retrieval. Scalable architecture supporting domain expansion.",
    tags: ["NLP", "FastAPI", "Embeddings", "RAG", "React"],
    stack: ["Python", "FastAPI", "Embeddings", "React", "RAG", "PostgreSQL"],
    year: "2024-2025",
    category: "AI/ML Engineering",
    liveUrl: null,
    codeUrl: "https://github.com/Luc0-0/Samarth",
  },
  {
    id: 2,
    title: "Elevated Notes",
    subtitle: "AI Tools | 2024",
    summary:
      "Intelligent Note System with Summaries & Semantic Search. Modern note-taking application with AI-driven summaries, rewrite tools, key-point extraction.",
    problem:
      "Notes become unstructured, making retrieval and study difficult. Users need intelligent tools to extract key information and search semantically across notes.",
    approach:
      "Built React editor with AI augmentation features. Backed by FastAPI with embeddings, chunking workflows, and dedicated inference routes. Implemented semantic search using vector similarity.",
    outcome:
      "Fast summarization, semantic search, and clean UX built for productivity. Users can quickly extract insights and find relevant notes.",
    tags: ["React", "FastAPI", "Embeddings", "Transformers", "AI"],
    stack: ["React", "FastAPI", "Embeddings", "Transformers", "MongoDB"],
    year: "2024",
    category: "AI/ML Engineering",
    liveUrl: null,
    codeUrl: "https://github.com/Luc0-0/Smart-notes-by-Nipun",
  },
  {
    id: 3,
    title: "Task Manager Pro",
    subtitle: "Full-Stack | 2024",
    summary:
      "Production Task Management System. Full-stack MERN application supporting tasks, metrics, authentication, and collaborative workflows.",
    problem:
      "Existing task management tools lack real-time synchronization and robust authentication. Teams require instant updates without page refreshes. Security vulnerabilities in session management create risks.",
    approach:
      "Built MERN stack application with JWT authentication and refresh token rotation. Implemented WebSocket connections for real-time updates. Designed RESTful API with rate limiting and input validation.",
    outcome:
      "Supports 1000+ concurrent users. Real-time updates with under 100ms latency. Zero-downtime deployment on Vercel. 99.9% uptime over 6 months.",
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "JWT"],
    year: "2024",
    category: "Web Development",
    liveUrl: "https://task-manager-pro-are3-drab.vercel.app",
    codeUrl: "https://github.com/Luc0-0/Task-manager-pro",
  },
  {
    id: 6,
    title: "Fake News Classifier",
    subtitle: "Production-Adjacent NLP Baseline | 2025",
    summary:
      "Interpretable fake news detection pipeline using classical NLP techniques (TF-IDF, SVM) to establish strong baselines.",
    problem:
      "Complex black-box models often lack interpretability. It is critical to establish strong, transparent baselines to understand fundamental linguistic distinctions between fake and factual news.",
    approach:
      "Built a transparent pipeline using NLTK/spaCy for stemming and stopword removal. Extracted TF-IDF features and benchmarked Logistic Regression against Linear SVM (SGDClassifier). Focused on feature interpretability over raw complexity.",
    outcome:
      "Linear SVM achieved ~87% test accuracy, outperforming Logistic Regression (83%). Proved that interpretable linear models remain highly effective for sparse text classification tasks.",
    tags: ["NLP", "Linear SVM", "TF-IDF", "Python"],
    stack: ["Python", "Scikit-learn", "NLTK", "spaCy", "Pandas", "Matplotlib"],
    year: "2025",
    category: "AI/ML Engineering",
    liveUrl: null,
    codeUrl: "https://github.com/Luc0-0/fake-news-classification-nlp",
  }
];

// Combine all AI/NLP projects (Mini formatting)
const AI_NLP_PROJECTS_LIST = [
  {
    title: "Fake News Classifier",
    description: "Standardized binary classification pipeline comparing Logistic Regression and Linear SVM.",
    repo: "https://github.com/Luc0-0/fake-news-classification-nlp",
    tags: ["NLP", "SVM", "Interpretability"],
  },
  {
    title: "NeuroFlow",
    description: "ML experimentation suite and model tracking",
    repo: "https://github.com/Luc0-0/NeuroFlow",
    tags: ["ML", "Experimentation", "Python"],
  },
  {
    title: "Embeddings Project",
    description: "Working with word and sentence embeddings",
    repo: "https://github.com/Luc0-0/oaqjp-final-project-emb-ai",
    tags: ["Embeddings", "NLP", "Vector DB"],
  },
  {
    title: "IBM-GPT TTS/STT",
    description: "Text-to-speech and speech-to-text integration",
    repo: "https://github.com/Luc0-0/IBM-GPT-TTS-STT",
    tags: ["NLP", "Audio", "IBM Watson"],
  },
  {
    title: "AI Audio Analyzer",
    description: "Audio processing and analysis with ML models",
    repo: "https://github.com/Luc0-0/AI-Audio-Analyzer",
    tags: ["Audio", "ML", "Signal Processing"],
  },
  {
    title: "Azure AI Image Analysis",
    description: "Image analysis using Azure Cognitive Services",
    repo: "https://github.com/Luc0-0/Azure-AI-Image-Analysis",
    tags: ["Azure", "Computer Vision", "Cloud"],
  },
  {
    title: "Azure Business Card Analyzer",
    description: "Business card data extraction using Azure AI",
    repo: "https://github.com/Luc0-0/Azure-Business-Card-Analyzer",
    tags: ["Azure", "OCR", "Document AI"],
  },
  {
    title: "Final AI Speech Synthesis",
    description: "Advanced speech synthesis using neural networks",
    repo: "https://github.com/Luc0-0/Final-AI-Speech-Synthesis",
    tags: ["TTS", "Neural Networks", "Audio"],
  },
  {
    title: "Image Classification (Cats/Dogs)",
    description: "CNN-based image classification model",
    repo: "https://github.com/Luc0-0/Image-Classification-CatsVsDogs",
    tags: ["Computer Vision", "CNN", "PyTorch"],
  }
];

const LEARNING_PROJECTS_LIST = [
  {
    title: "Luc0-0 (GitHub Profile)",
    description: "Personal learning laboratory and daily progress tracking. A living repository of continuous experimentation.",
    repo: "https://github.com/Luc0-0/Luc0-0",
    tags: ["Learning", "Documentation", "Daily Commits"],
  },
  {
    title: "Learning NLP From Scratch",
    description: "A comprehensive collection of NLP implementations built from the ground up. Includes Bag of Words, TF-IDF, LSA, and Topic Modeling with clear, step-by-step Jupyter notebooks.",
    repo: "https://github.com/Luc0-0/learning-nlp-from-scratch",
    tags: ["NLP", "Jupyter Notebooks", "Fundamentals"],
  },
];


function MiniProjectCard({ project }) {
  return (
    <motion.a
      href={project.repo}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-4 md:p-6 group hover:border-[var(--color-accent)]/30 transition-all block h-full flex flex-col"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <h4 className="text-heading-md text-heading text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
            {project.title}
          </h4>
          <p className="text-sm text-[var(--color-text-secondary)] mt-2 line-clamp-2">
            {project.description}
          </p>
        </div>
        <svg
          className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </div>
      <div className="flex flex-wrap gap-2 mt-auto pt-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-tertiary)] rounded border border-[var(--color-border)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card p-8 md:p-10 mb-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h2 className="text-display-md text-display text-[var(--color-text-primary)]">
              {project.title}
            </h2>
            <span className="tag">{project.category}</span>
          </div>
          {project.subtitle && (
            <p className="text-sm text-[var(--color-accent)] mb-3 font-medium tracking-wide">
              {project.subtitle}
            </p>
          )}
          <p className="text-body-md text-[var(--color-text-secondary)] mb-3">
            {project.summary}
          </p>
          <span className="text-sm text-[var(--color-text-muted)] font-mono">
            {project.year}
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Live
            </motion.a>
          )}
          {project.codeUrl && (
            <motion.a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Code
            </motion.a>
          )}
        </div>
      </div>

      {/* Problem */}
      <div className="mb-6 pb-6 border-b border-[var(--color-border)]">
        <h3 className="text-heading-md text-heading text-[var(--color-text-primary)] mb-3">
          Problem
        </h3>
        <p className="text-body-md text-[var(--color-text-secondary)] leading-relaxed">
          {project.problem}
        </p>
      </div>

      {/* Approach */}
      <div className="mb-6 pb-6 border-b border-[var(--color-border)]">
        <h3 className="text-heading-md text-heading text-[var(--color-text-primary)] mb-3">
          Approach
        </h3>
        <p className="text-body-md text-[var(--color-text-secondary)] leading-relaxed">
          {project.approach}
        </p>
      </div>

      {/* Outcome */}
      <div className="mb-6">
        <h3 className="text-heading-md text-heading text-[var(--color-text-primary)] mb-3">
          Outcome
        </h3>
        <p className="text-body-md text-[var(--color-text-secondary)] leading-relaxed">
          {project.outcome}
        </p>
      </div>

      {/* Stack & Tags */}
      <div className="flex flex-wrap gap-2 pt-6 border-t border-[var(--color-border)]">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-tertiary)] rounded border border-[var(--color-border)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

const TABS = [
  { id: 'signature', label: 'Signature Projects' },
  { id: 'ai-nlp', label: 'AI / NLP Systems' },
  { id: 'learning', label: 'Learning & Labs' }
];

export default function WorkPage() {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('signature');
  const sectionRef = useRef(null);
  const projectRefs = useRef({});
  const isInView = useInView(sectionRef, { once: true });

  // Handle scrolling to specific project
  useEffect(() => {
    if (projectId && projectRefs.current[projectId]) {
      setTimeout(() => {
        projectRefs.current[projectId].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [projectId]);

  return (
    <>
      <Navigation />
      <main className="relative z-10 pt-20">
        <section ref={sectionRef} className="py-32 relative">
          <div className="section-container">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="mb-16"
            >
              <span className="text-caption text-[var(--color-accent)] mb-4 block tracking-widest">
                WORK
              </span>
              <h1 className="text-display-xl text-display text-[var(--color-text-primary)] mb-6">
                Engineering Projects
              </h1>
              <p className="text-body-lg text-[var(--color-text-secondary)] max-w-3xl">
                Production-grade systems built with measurable outcomes. Each
                project addresses specific technical challenges with documented
                results.
              </p>
            </motion.div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-4 mb-16 border-b border-[var(--color-border)] pb-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-sm font-medium tracking-wide transition-all relative ${activeTab === tab.id
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                    }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content Display */}
            <div className="min-h-[500px]">

              {/* 1. Signature Projects View */}
              {activeTab === 'signature' && (
                <motion.div
                  key="signature"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  {SIGNATURE_PROJECTS_DATA.map((project, index) => (
                    <div key={project.id} ref={(el) => projectRefs.current[project.title.toLowerCase().replace(/\s+/g, '')] = el}>
                      <ProjectCard project={project} index={index} />
                    </div>
                  ))}
                </motion.div>
              )}

              {/* 2. AI / NLP Systems View */}
              {activeTab === 'ai-nlp' && (
                <motion.div
                  key="ai-nlp"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-body-lg text-[var(--color-text-secondary)] mb-10 max-w-3xl">
                    Applied ML, NLP pipelines, and deeper technical experiments. Focus on technical depth, embeddings, and architecture.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {AI_NLP_PROJECTS_LIST.map((project, index) => (
                      <MiniProjectCard key={index} project={project} />
                    ))}
                  </div>
                </motion.div>
              )}

              {/* 3. Learning & Labs View */}
              {activeTab === 'learning' && (
                <motion.div
                  key="learning"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-body-lg text-[var(--color-text-secondary)] mb-10 max-w-3xl">
                    Continuous learning and system-level experimentation. Tracking daily progress and concept exploration.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {LEARNING_PROJECTS_LIST.map((project, index) => (
                      <MiniProjectCard key={index} project={project} />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Writing & Technical Content (Persistent at bottom) */}
            <div className="mt-20 pt-16 border-t border-[var(--color-border)]">
              <span className="text-caption text-[var(--color-accent)] mb-4 block tracking-widest">
                WRITING & TECHNICAL CONTENT
              </span>
              <motion.article
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="glass-card p-8 md:p-10 mb-12"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h2 className="text-display-md text-display text-[var(--color-text-primary)]">
                        Technical Writing & Articles
                      </h2>
                      <span className="tag">Content Creation</span>
                    </div>
                    <p className="text-body-lg text-[var(--color-text-secondary)] max-w-3xl">
                      Engineering-focused writing on AI/ML systems, production deployment strategies, and technical implementation details.
                    </p>
                  </div>

                  {/* Link Button */}
                  <motion.a
                    href="#/writing"
                    className="btn-secondary text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    View All Articles
                  </motion.a>
                </div>

                {/* Key Topics */}
                <div className="mb-6 pb-6 border-b border-[var(--color-border)]">
                  <h3 className="text-heading-md text-heading text-[var(--color-text-primary)] mb-3">
                    Focus Areas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Fine-tuning Transformers', 'MLOps & Deployment', 'Real-time AI Systems', 'RAG Pipelines', 'FastAPI Architecture', 'Production ML'].map((topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-tertiary)] rounded border border-[var(--color-border)]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Writing Details */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-[var(--color-text-primary)] mb-2">Featured Topics</h4>
                    <ul className="text-body-md text-[var(--color-text-secondary)] space-y-2">
                      <li>• Fine-tuning Transformer Models for Domain-Specific NLP</li>
                      <li>• Production Deployment of AI Models: A Practical Guide</li>
                      <li>• Building Real-time AI Chatbots with FastAPI and WebSockets</li>
                    </ul>
                  </div>
                </div>
              </motion.article>
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
