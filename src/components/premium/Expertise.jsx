import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EXPERTISE_AREAS = [
  {
    title: "AI/ML Engineering",
    description: "Training, fine-tuning, and deploying ML models. Experience with NLP, RAG, embeddings, sentiment models, generative AI, and model optimization workflows.",
    skills: [
      "Python", "TensorFlow", "PyTorch", "Transformers", "Hugging Face", 
      "LangChain", "OpenAI/Gemini APIs", "NLP", "RAG"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Backend Engineering",
    description: "Designing scalable API services with authentication, microservices, and containerization. Experience with REST APIs, database design, and deployment.",
    skills: [
      "Node.js", "Express", "FastAPI", "Flask", "MongoDB", 
      "PostgreSQL", "Redis", "Docker", "JWT", "REST APIs"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  {
    title: "Frontend & 3D",
    description: "Building responsive, interactive interfaces and 3D visualizations. Experience with modern frameworks, animations, and performance optimization.",
    skills: [
      "React", "Next.js", "Three.js", "WebGL", "Framer Motion", 
      "Tailwind CSS", "TypeScript", "Performance Optimization"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    title: "Data & Cloud",
    description: "Working with datasets, pipelines, and cloud deployment. Experience with data processing, visualization, and infrastructure management.",
    skills: [
      "Pandas", "NumPy", "SQL", "Scikit-learn", "Plotly", 
      "AWS", "Firebase", "Vercel", "Railway", "Render"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    )
  },
  {
    title: "Tools & DevOps",
    description: "Development and deployment tooling for efficient engineering workflows. Git, CI/CD basics, debugging, and testing.",
    skills: [
      "Git", "VS Code", "Docker", "Linux", "Jupyter", 
      "Postman", "CI/CD", "Testing", "Debugging"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
];


function ExpertiseCard({ area, index }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="glass-card p-8 h-full hover:border-[var(--color-accent)]/30 transition-all group"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-6 text-[var(--color-accent)] group-hover:bg-[var(--color-accent)]/20 transition-colors">
        {area.icon}
      </div>

      {/* Title */}
      <h3 className="text-heading-lg text-heading text-[var(--color-text-primary)] mb-3">
        {area.title}
      </h3>

      {/* Description */}
      <p className="text-body-sm text-[var(--color-text-secondary)] mb-6">
        {area.description}
      </p>

      {/* Skills List */}
      <div className="flex flex-wrap gap-2">
        {area.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-xs text-[var(--color-text-secondary)] bg-[var(--color-bg-tertiary)] rounded border border-[var(--color-border)]"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Expertise() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="expertise" ref={sectionRef} className="py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-bg-secondary)]" />
      
      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-caption text-[var(--color-accent)] mb-4 block tracking-widest">
            EXPERTISE
          </span>
          <h2 className="text-display-md text-display text-[var(--color-text-primary)] mb-6">
            Technical Proficiency
          </h2>
          <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Technical capabilities organized by domain. Each area represents applied 
            experience in production systems.
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERTISE_AREAS.map((area, index) => (
            <ExpertiseCard key={area.title} area={area} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
