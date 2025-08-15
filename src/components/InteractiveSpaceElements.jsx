// src/components/InteractiveSpaceElements.jsx
// Interactive space elements that respond to scroll and hover

import React, { useRef, useEffect } from 'react';

export default function InteractiveSpaceElements() {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating space elements
    const createElements = () => {
      const elements = [];
      const numElements = 12;

      for (let i = 0; i < numElements; i++) {
        const element = document.createElement('div');
        element.className = 'space-element';
        
        const size = Math.random() * 3 + 1;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const type = Math.random();
        
        let elementType, color, glow;
        if (type < 0.4) {
          elementType = 'star-cluster';
          color = 'rgba(200, 200, 220, 0.6)';
          glow = '0 0 10px rgba(200, 200, 220, 0.4)';
        } else if (type < 0.7) {
          elementType = 'distant-star';
          color = 'rgba(255, 255, 255, 0.8)';
          glow = '0 0 8px rgba(255, 255, 255, 0.3)';
        } else {
          elementType = 'space-dust';
          color = 'rgba(150, 150, 170, 0.4)';
          glow = '0 0 6px rgba(150, 150, 170, 0.2)';
        }
        
        element.style.cssText = `
          position: fixed;
          width: ${size}px;
          height: ${size}px;
          background: ${color};
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          box-shadow: ${glow};
          transition: all 0.3s ease-out;
          opacity: 0.7;
        `;

        const elementData = {
          element: element,
          x: x,
          y: y,
          baseX: x,
          baseY: y,
          size: size,
          type: elementType,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          life: Math.random() * 200 + 100,
          maxLife: Math.random() * 200 + 100,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.01 + 0.005,
          parallaxFactor: Math.random() * 0.3 + 0.1
        };

        elements.push(elementData);
        container.appendChild(element);
      }

      elementsRef.current = elements;
    };

    // Update elements
    const updateElements = () => {
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      const scroll = scrollRef.current;

      elementsRef.current.forEach((element, index) => {
        // Parallax effect based on scroll
        const parallaxY = scroll * element.parallaxFactor;
        
        // Mouse interaction - gentle attraction/repulsion
        const dx = mouseX - element.x;
        const dy = mouseY - element.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance && distance > 0) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          
          // Different behaviors for different element types
          if (element.type === 'star-cluster') {
            // Slight attraction
            element.vx += Math.cos(angle) * force * 0.005;
            element.vy += Math.sin(angle) * force * 0.005;
          } else if (element.type === 'distant-star') {
            // Gentle repulsion
            element.vx -= Math.cos(angle) * force * 0.003;
            element.vy -= Math.sin(angle) * force * 0.003;
          } else {
            // Orbital motion
            element.vx += Math.cos(angle + Math.PI/2) * force * 0.004;
            element.vy += Math.sin(angle + Math.PI/2) * force * 0.004;
          }
        }

        // Apply velocity with damping
        element.vx *= 0.99;
        element.vy *= 0.99;
        element.x += element.vx;
        element.y += element.vy - parallaxY * 0.1;

        // Boundary wrapping
        if (element.x < -20) element.x = window.innerWidth + 20;
        if (element.x > window.innerWidth + 20) element.x = -20;
        if (element.y < -20) element.y = window.innerHeight + 20;
        if (element.y > window.innerHeight + 20) element.y = -20;

        // Pulsing effect
        element.pulsePhase += element.pulseSpeed;
        const pulse = Math.sin(element.pulsePhase) * 0.3 + 0.7;
        
        // Life cycle
        element.life -= 0.05;
        if (element.life <= 0) {
          element.life = element.maxLife;
          element.x = Math.random() * window.innerWidth;
          element.y = Math.random() * window.innerHeight;
          element.vx = (Math.random() - 0.5) * 0.2;
          element.vy = (Math.random() - 0.5) * 0.2;
        }

        // Mouse proximity glow
        const glowIntensity = Math.max(0, 1 - distance / 150);
        
        // Update element
        const opacity = (element.life / element.maxLife) * pulse * 0.7 + glowIntensity * 0.3;
        const scale = 0.8 + pulse * 0.2 + glowIntensity * 0.4;
        
        element.element.style.transform = `translate(${element.x}px, ${element.y}px) scale(${scale})`;
        element.element.style.opacity = Math.min(1, opacity);
        
        // Enhanced glow on proximity
        if (glowIntensity > 0.1) {
          const glowSize = 15 + glowIntensity * 10;
          element.element.style.boxShadow = `0 0 ${glowSize}px rgba(200, 200, 220, ${glowIntensity * 0.6})`;
        }
      });

      requestAnimationFrame(updateElements);
    };

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Scroll tracking
    const handleScroll = () => {
      scrollRef.current = window.scrollY * 0.005;
    };

    // Initialize
    createElements();
    updateElements();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      elementsRef.current.forEach(element => {
        if (element.element.parentNode) {
          element.element.parentNode.removeChild(element.element);
        }
      });
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-2" />;
}