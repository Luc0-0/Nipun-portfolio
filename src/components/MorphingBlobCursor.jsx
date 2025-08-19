// src/components/MorphingBlobCursor.jsx
import { useEffect, useState } from 'react';

export default function MorphingBlobCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll('button, a, .interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (window.innerWidth < 768) return null;

  return (
    <div
      className={`fixed pointer-events-none z-[9999] transition-all duration-300 ease-out ${
        isHovering ? 'w-16 h-16' : 'w-8 h-8'
      }`}
      style={{
        left: mousePos.x,
        top: mousePos.y,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle, ${isHovering ? 'rgba(245, 158, 11, 0.6)' : 'rgba(245, 158, 11, 0.4)'} 0%, transparent 70%)`,
        borderRadius: isHovering ? '30% 70% 70% 30% / 30% 30% 70% 70%' : '50%',
        filter: 'blur(8px)',
        animation: 'morph 3s ease-in-out infinite'
      }}
    />
  );
}