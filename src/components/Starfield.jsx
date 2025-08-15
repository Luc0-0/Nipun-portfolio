// src/components/Starfield.jsx
// Background starfield with Three.js and CSS fallback

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// Animated starfield component
function AnimatedStars({ theme }) {
  const starsRef = useRef();
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      starsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Stars
      ref={starsRef}
      radius={100}
      depth={50}
      count={theme === 'light' ? 2000 : 3000}
      factor={4}
      saturation={0}
      fade
      speed={0.5}
    />
  );
}

// CSS fallback for mobile/reduced motion
function CSSStarfield({ theme }) {
  const stars = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -10 }}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full animate-pulse ${
            theme === 'light' ? 'bg-gray-600' : 'bg-white'
          }`}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Starfield({ theme }) {
  const prefersReduced = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Use CSS fallback for mobile or reduced motion
  if (prefersReduced || isMobile) {
    return <CSSStarfield theme={theme} />;
  }

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -10 }}>
      <Canvas
        gl={{ alpha: true, antialias: false }}
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
      >
        <AnimatedStars theme={theme} />
      </Canvas>
    </div>
  );
}