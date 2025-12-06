import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navigation from '../components/premium/Navigation';
import Footer from '../components/premium/Footer';

const ARTICLES = [
  {
    id: 1,
    title: "Fine-tuning Transformer Models for Domain-Specific NLP",
    description: "Technical guide on adapting pre-trained language models for specialized use cases, covering dataset preparation, training strategies, and evaluation metrics.",
    learn: "Learn to fine-tune BERT and GPT models for custom NLP tasks with practical code examples.",
    tags: ["NLP", "Transformers", "Machine Learning"],
    date: "2024",
    status: "draft"
  },
  {
    id: 2,
    title: "Production Deployment of AI Models: A Practical Guide",
    description: "End-to-end process of deploying machine learning models to production, covering containerization, API design, monitoring, and scaling strategies.",
    learn: "Understand the complete pipeline from model training to production deployment with Docker and cloud infrastructure.",
    tags: ["MLOps", "Deployment", "Docker", "Cloud"],
    date: "2024",
    status: "draft"
  },
  {
    id: 3,
    title: "Building Real-time AI Chatbots with FastAPI and WebSockets",
    description: "Architecture and implementation of conversational AI systems with low-latency response times and session management.",
    learn: "Build production-ready chatbot APIs with WebSocket support and Redis caching for optimal performance.",
    tags: ["FastAPI", "WebSockets", "AI", "Backend"],
    date: "2024",
    status: "draft"
  }
];

function ArticleCard({ article, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass-card p-8 mb-8 hover:border-[var(--color-accent)]/30 transition-all"
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h2 className="text-heading-lg text-heading text-[var(--color-text-primary)] mb-3">
            {article.title}
          </h2>
          <p className="text-body-md text-[var(--color-text-secondary)] mb-4">
            {article.description}
          </p>
          <p className="text-sm text-[var(--color-accent)] mb-4">
            {article.learn}
          </p>
        </div>
        {article.status === 'draft' && (
          <span className="px-3 py-1 text-xs bg-[var(--color-bg-tertiary)] text-[var(--color-text-muted)] rounded border border-[var(--color-border)]">
            Draft
          </span>
        )}
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs text-[var(--color-text-muted)] bg-[var(--color-bg-tertiary)] rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-xs text-[var(--color-text-muted)] font-mono">
          {article.date}
        </span>
      </div>
    </motion.article>
  );
}

export default function WritingPage() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

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
                WRITING
              </span>
              <h1 className="text-display-xl text-display text-[var(--color-text-primary)] mb-6">
                Technical Articles
              </h1>
              <p className="text-body-lg text-[var(--color-text-secondary)] max-w-3xl">
                Engineering-focused writing on AI/ML systems, deployment strategies, and 
                technical implementation details.
              </p>
            </motion.div>

            {/* Articles */}
            <div>
              {ARTICLES.map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>

            {/* Coming Soon */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center py-16"
            >
              <p className="text-body-md text-[var(--color-text-muted)]">
                More articles in development. Focus areas: production AI systems, 
                MLOps, and full-stack engineering.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

