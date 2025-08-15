// src/components/AdvancedCursor.jsx
// Advanced cursor with physics and visual effects

import React, { useEffect, useRef, useState } from 'react';

export default function AdvancedCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef([]);
  const [cursorType, setCursorType] = useState('default');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateCursor = () => {
      // Smooth cursor movement with easing
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
      
      // Update trail
      trailRef.current.push({ x: cursorX, y: cursorY, opacity: 1 });
      if (trailRef.current.length > 20) {
        trailRef.current.shift();
      }
      
      // Fade trail
      trailRef.current.forEach((point, index) => {
        point.opacity *= 0.9;
      });
      
      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      
      if (target.matches('a, button, [data-magnetic]')) {
        setCursorType('magnetic');
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1.5)`;
      } else if (target.matches('input, textarea')) {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    
    updateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, []);

  const getCursorClasses = () => {
    const base = "fixed top-0 left-0 pointer-events-none z-50 transition-all duration-300 mix-blend-difference";
    
    switch (cursorType) {
      case 'magnetic':
        return `${base} w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full`;
      case 'text':
        return `${base} w-0.5 h-6 bg-white`;
      default:
        return `${base} w-4 h-4 bg-white rounded-full`;
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Cursor trail */}
      {trailRef.current.map((point, index) => (
        <div
          key={index}
          className="fixed top-0 left-0 pointer-events-none z-40 w-2 h-2 bg-cyan-400/30 rounded-full mix-blend-screen"
          style={{
            transform: `translate(${point.x}px, ${point.y}px)`,
            opacity: point.opacity
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={getCursorClasses()}
      />
    </>
  );
}