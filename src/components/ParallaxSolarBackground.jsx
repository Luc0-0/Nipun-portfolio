// src/components/ParallaxSolarBackground.jsx
// Parallax scrolling background with infrastructure solar system

import React, { useEffect, useRef } from 'react';
import { InfrastructureSolarSystemBG } from './InfrastructureSolarSystem';

export default function ParallaxSolarBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        // Parallax effect: move slower than scroll
        const translateY = scrollY * 0.3;
        containerRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="solar-parallax-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      <InfrastructureSolarSystemBG />
    </div>
  );
}
