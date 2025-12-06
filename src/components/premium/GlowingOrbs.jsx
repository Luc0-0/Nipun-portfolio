import React from 'react';
import { motion } from 'framer-motion';

export default function GlowingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Primary Orb - Top Right */}
      <motion.div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 168, 83, 0.08) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Secondary Orb - Bottom Left */}
      <motion.div
        className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 168, 83, 0.05) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Tertiary Orb - Center */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 168, 83, 0.03) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Accent Orb - Top Left */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 168, 83, 0.06) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 40, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Small floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[var(--color-accent)]"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            opacity: 0.3,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  );
}
