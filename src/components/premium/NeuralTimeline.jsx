import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const TIMELINE_DATA = [
  {
    year: '2020',
    title: '10th Grade — Kendriya Vidyalaya, Delhi',
    description: 'Completed 10th standard with strong foundation in mathematics and science. First exposure to logical thinking and problem-solving.',
    type: 'education',
    nodeColor: '#4169E1'
  },
  {
    year: '2021',
    title: 'Python Programming Begins',
    description: 'Started learning Python at Kendriya Vidyalaya. First lines of code marked the beginning of the programming journey.',
    type: 'skill',
    nodeColor: '#32CD32'
  },
  {
    year: '2022',
    title: '12th Grade — Kendriya Vidyalaya, Kannur',
    description: 'Completed 12th standard with Science stream. Developed interest in computer science and technology.',
    type: 'education',
    nodeColor: '#9370DB'
  },
  {
    year: '2022',
    title: 'BTech AI & Data Science',
    description: 'Enrolled at Kathir College of Engineering. Four-year program combining computer science fundamentals with specialized AI coursework.',
    type: 'education',
    nodeColor: '#FFA500'
  },
  {
    year: '2024',
    title: 'IBM AI Developer Certified',
    description: 'Completed IBM AI Developer Professional Certificate. Eight courses covering software engineering, Python, AI concepts, and production deployment.',
    type: 'certification',
    nodeColor: '#FFD700'
  },
  {
    year: '2024',
    title: 'Mental Health AI Project',
    description: 'Initiated capstone project on Mental Health AI Embedded Assistance. Designing conversational AI for accessible mental wellness support.',
    type: 'project',
    nodeColor: '#20B2AA'
  },
  {
    year: '2026',
    title: 'Expected Graduation',
    description: 'Graduating with BTech in Artificial Intelligence and Data Science. Current CGPA: 8.0. Ready to contribute to the AI industry.',
    type: 'future',
    nodeColor: '#8A2BE2'
  }
];

function NeuralNode({ item, index, isActive, onClick }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={nodeRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative flex items-center gap-6 md:gap-12 py-8"
      onClick={onClick}
    >
      {/* Year Label - Left Side on Desktop */}
      <div className="hidden md:block w-24 text-right">
        <span className={`font-mono text-lg transition-colors duration-300 ${
          isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'
        }`}>
          {item.year}
        </span>
      </div>

      {/* Neural Node */}
      <div className="relative z-10 flex-shrink-0">
        {/* Outer Ring */}
        <motion.div
          animate={{
            scale: isActive ? 1.2 : 1,
            opacity: isActive ? 1 : 0.5
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${item.nodeColor}40 0%, transparent 70%)`,
            transform: 'scale(2)'
          }}
        />
        
        {/* Node Core */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          className={`relative w-4 h-4 rounded-full cursor-pointer transition-all duration-300 ${
            isActive ? 'ring-4 ring-offset-2 ring-offset-[var(--color-bg-primary)]' : ''
          }`}
          style={{ 
            backgroundColor: item.nodeColor,
            boxShadow: isActive ? `0 0 20px ${item.nodeColor}` : `0 0 10px ${item.nodeColor}60`
          }}
        >
          {/* Pulse Animation for Active */}
          {isActive && (
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: item.nodeColor }}
              animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>

        {/* Connection Lines (Neural Synapses) */}
        <svg className="absolute top-full left-1/2 -translate-x-1/2 w-px h-16 md:h-20" style={{ marginTop: '-2px' }}>
          <line
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="100%"
            stroke={item.nodeColor}
            strokeWidth="2"
            strokeOpacity={isActive ? "0.6" : "0.2"}
            strokeDasharray="4 4"
          />
        </svg>
      </div>

      {/* Content Card */}
      <motion.div
        animate={{ x: isActive ? 10 : 0 }}
        transition={{ duration: 0.3 }}
        className={`flex-1 glass-card p-6 cursor-pointer transition-all duration-300 ${
          isActive ? 'border-l-2' : 'border-l-0'
        }`}
        style={{ borderLeftColor: isActive ? item.nodeColor : 'transparent' }}
      >
        {/* Mobile Year */}
        <div className="md:hidden mb-2">
          <span className="font-mono text-sm text-[var(--color-accent)]">{item.year}</span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className={`text-heading-md text-heading mb-2 transition-colors duration-300 ${
              isActive ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
            }`}>
              {item.title}
            </h3>
            <p className={`text-body-sm transition-colors duration-300 ${
              isActive ? 'text-[var(--color-text-secondary)]' : 'text-[var(--color-text-muted)]'
            }`}>
              {item.description}
            </p>
          </div>

          {/* Type Badge */}
          <span
            className="flex-shrink-0 px-2 py-1 text-xs rounded"
            style={{ 
              backgroundColor: `${item.nodeColor}20`,
              color: item.nodeColor
            }}
          >
            {item.type}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function NeuralTimeline() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background Neural Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full">
          <pattern id="neural-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#neural-pattern)" />
        </svg>
      </div>

      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-caption text-[var(--color-accent)] mb-4 block tracking-widest">
            JOURNEY
          </span>
          <h2 className="text-display-md text-display text-[var(--color-text-primary)] mb-6">
            Timeline
          </h2>
          <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Chronological progression of education, certifications, and project milestones.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Main Spine Line */}
          <div className="absolute left-6 md:left-[7.5rem] top-0 bottom-0 w-px bg-[var(--color-border)]">
            <motion.div
              className="w-full bg-gradient-to-b from-[var(--color-accent)] to-[var(--color-accent)]/30"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline Nodes */}
          <div className="relative">
            {TIMELINE_DATA.map((item, index) => (
              <NeuralNode
                key={index}
                item={item}
                index={index}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>

        {/* Neural Network Decorative Element */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 pointer-events-none hidden lg:block"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Neural Network Visualization */}
            {[...Array(8)].map((_, i) => (
              <g key={i}>
                <circle
                  cx={100 + Math.cos((i * Math.PI) / 4) * 60}
                  cy={100 + Math.sin((i * Math.PI) / 4) * 60}
                  r="4"
                  fill="var(--color-accent)"
                  opacity="0.5"
                />
                <line
                  x1="100"
                  y1="100"
                  x2={100 + Math.cos((i * Math.PI) / 4) * 60}
                  y2={100 + Math.sin((i * Math.PI) / 4) * 60}
                  stroke="var(--color-accent)"
                  strokeWidth="1"
                  opacity="0.3"
                />
              </g>
            ))}
            <circle cx="100" cy="100" r="8" fill="var(--color-accent)" opacity="0.6" />
          </svg>
        </motion.div>

        {/* Status Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-card">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm text-[var(--color-text-secondary)]">
              See full timeline and resume
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
