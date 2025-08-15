// src/components/CosmicParticles.jsx
// Floating cosmic particles that react to mouse and scroll

import React, { useRef, useEffect } from 'react';

export default function CosmicParticles() {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create particles
    const createParticles = () => {
      const particles = [];
      const numParticles = 15;

      for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'cosmic-particle';
        
        const size = Math.random() * 2 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const hue = Math.random() * 30 + 210; // Subtle blue range
        
        particle.style.cssText = `
          position: fixed;
          width: ${size}px;
          height: ${size}px;
          background: radial-gradient(circle, hsl(${hue}, 20%, 80%) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          opacity: ${Math.random() * 0.3 + 0.1};
          box-shadow: 0 0 ${size * 1}px hsl(${hue}, 20%, 80%);
          transition: transform 0.1s ease-out;
        `;

        const particleData = {
          element: particle,
          x: x,
          y: y,
          baseX: x,
          baseY: y,
          size: size,
          hue: hue,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: Math.random() * 100 + 50,
          maxLife: Math.random() * 100 + 50,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01
        };

        particles.push(particleData);
        container.appendChild(particle);
      }

      particlesRef.current = particles;
    };

    // Update particles
    const updateParticles = () => {
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const scroll = scrollRef.current;

      particlesRef.current.forEach((particle, index) => {
        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 0.02;
          particle.vy -= Math.sin(angle) * force * 0.02;
        }

        // Apply velocity with damping
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Scroll effect
        particle.y += scroll * 0.1;

        // Boundary wrapping
        if (particle.x < -10) particle.x = window.innerWidth + 10;
        if (particle.x > window.innerWidth + 10) particle.x = -10;
        if (particle.y < -10) particle.y = window.innerHeight + 10;
        if (particle.y > window.innerHeight + 10) particle.y = -10;

        // Pulsing effect
        particle.pulsePhase += particle.pulseSpeed;
        const pulse = Math.sin(particle.pulsePhase) * 0.3 + 0.7;
        
        // Life cycle
        particle.life -= 0.1;
        if (particle.life <= 0) {
          particle.life = particle.maxLife;
          particle.x = Math.random() * window.innerWidth;
          particle.y = Math.random() * window.innerHeight;
          particle.vx = (Math.random() - 0.5) * 0.5;
          particle.vy = (Math.random() - 0.5) * 0.5;
        }

        // Update element
        const opacity = (particle.life / particle.maxLife) * pulse * 0.3;
        const scale = 0.8 + pulse * 0.2;
        
        particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px) scale(${scale})`;
        particle.element.style.opacity = opacity;
      });

      requestAnimationFrame(updateParticles);
    };

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Scroll tracking
    const handleScroll = () => {
      scrollRef.current = window.scrollY * 0.01;
    };

    // Initialize
    createParticles();
    updateParticles();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      particlesRef.current.forEach(particle => {
        if (particle.element.parentNode) {
          particle.element.parentNode.removeChild(particle.element);
        }
      });
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-1" />;
}