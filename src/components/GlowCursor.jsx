// src/components/GlowCursor.jsx
import { useEffect, useState } from 'react';

export default function GlowCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (window.innerWidth < 768) return null;

  return (
    <>
      {/* Glow effect */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(20px)'
        }}
      />
      
      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[9999] w-4 h-4 border-2 border-amber-400 rounded-full"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          background: 'rgba(245, 158, 11, 0.3)',
          boxShadow: '0 0 20px rgba(245, 158, 11, 0.6), inset 0 0 10px rgba(245, 158, 11, 0.4)'
        }}
      />
      
      {/* Center dot */}
      <div
        className="fixed pointer-events-none z-[9999] w-1 h-1 bg-amber-400 rounded-full"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 10px rgba(245, 158, 11, 0.8)'
        }}
      />
    </>
  );
}