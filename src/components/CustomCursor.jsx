// src/components/CustomCursor.jsx
// Custom cursor with smooth trailing shadow effect

import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef();
  const trailRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const trailPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };

    const animate = () => {
      trailPos.current.x += (mousePos.current.x - trailPos.current.x) * 0.08;
      trailPos.current.y += (mousePos.current.y - trailPos.current.y) * 0.08;
      
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x - 12}px, ${trailPos.current.y - 12}px)`;
      }
      
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', updateMousePosition);
    document.body.style.cursor = 'none';
    animate();

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 bg-white rounded-full pointer-events-none z-50 will-change-transform"
        style={{
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(245, 158, 11, 0.4)'
        }}
      />
      
      {/* Single smooth trailing shadow */}
      <div
        ref={trailRef}
        className="fixed w-6 h-6 rounded-full pointer-events-none z-40 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, rgba(245, 158, 11, 0.15) 50%, transparent 100%)',
          filter: 'blur(2px)'
        }}
      />
    </>
  );
}