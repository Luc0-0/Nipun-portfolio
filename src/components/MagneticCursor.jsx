// src/components/MagneticCursor.jsx
// Magnetic cursor with morphing effects

import React, { useRef, useEffect } from 'react';

export default function MagneticCursor() {
  const cursorRef = useRef();
  const cursorDotRef = useRef();

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target.matches('button, a, [data-magnetic]')) {
        cursor.style.transform = `translate(${mouseX - 20}px, ${mouseY - 20}px) scale(2)`;
        cursor.style.backgroundColor = 'rgba(100, 200, 255, 0.2)';
        cursorDot.style.opacity = '0';
      }
    };

    const handleMouseLeave = () => {
      cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px) scale(1)`;
      cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      cursorDot.style.opacity = '1';
    };

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      if (cursor) {
        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';
      }
      if (cursorDot) {
        cursorDot.style.left = mouseX - 2 + 'px';
        cursorDot.style.top = mouseY - 2 + 'px';
      }
      
      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    animateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-5 h-5 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-300"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      />
      <div
        ref={cursorDotRef}
        className="fixed w-1 h-1 bg-white rounded-full pointer-events-none z-50"
      />
    </>
  );
}