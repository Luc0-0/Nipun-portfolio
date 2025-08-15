// src/components/QuantumParticles.jsx
// Quantum-like floating particles

import React, { useRef, useEffect } from 'react';

export default function QuantumParticles() {
  const containerRef = useRef();
  const particlesRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create quantum particles
    const createParticles = () => {
      const particles = [];
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'quantum-particle';
        
        const size = Math.random() * 3 + 1;
        const hue = Math.random() * 60 + 200;
        
        particle.style.cssText = `
          position: fixed;
          width: ${size}px;
          height: ${size}px;
          background: radial-gradient(circle, hsl(${hue}, 60%, 70%) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 3;
          opacity: 0.6;
          box-shadow: 0 0 ${size * 4}px hsl(${hue}, 60%, 70%);
        `;

        const particleData = {
          element: particle,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          phase: Math.random() * Math.PI * 2,
          frequency: Math.random() * 0.02 + 0.01
        };

        particles.push(particleData);
        container.appendChild(particle);
      }
      particlesRef.current = particles;
    };

    // Animate particles with quantum uncertainty
    const animateParticles = () => {
      particlesRef.current.forEach(particle => {
        // Quantum uncertainty movement
        particle.phase += particle.frequency;
        const uncertainty = Math.sin(particle.phase) * 2;
        
        particle.vx += (Math.random() - 0.5) * 0.01;
        particle.vy += (Math.random() - 0.5) * 0.01;
        
        particle.x += particle.vx + uncertainty;
        particle.y += particle.vy + uncertainty;

        // Boundary wrapping
        if (particle.x < -10) particle.x = window.innerWidth + 10;
        if (particle.x > window.innerWidth + 10) particle.x = -10;
        if (particle.y < -10) particle.y = window.innerHeight + 10;
        if (particle.y > window.innerHeight + 10) particle.y = -10;

        // Apply quantum tunneling effect
        const tunneling = Math.sin(particle.phase * 2) * 0.3 + 0.7;
        
        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
        particle.element.style.opacity = tunneling * 0.6;
      });

      requestAnimationFrame(animateParticles);
    };

    createParticles();
    animateParticles();

    return () => {
      particlesRef.current.forEach(particle => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-3" />;
}