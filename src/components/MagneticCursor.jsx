// src/components/MagneticCursor.jsx
import { useEffect, useRef, useState } from 'react';

export default function MagneticCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .magnetic');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Hide on mobile
  if (window.innerWidth < 768) return null;

  return (
    <>
      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-all duration-300 ease-out ${
          isHovering ? 'w-12 h-12' : 'w-6 h-6'
        }`}
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          background: 'rgba(245, 158, 11, 0.3)',
          border: '2px solid rgba(245, 158, 11, 0.8)',
          borderRadius: '50%',
          backdropFilter: 'blur(4px)'
        }}
      />
      
      {/* Cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] w-1 h-1 transition-all duration-100"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
          background: '#f59e0b',
          borderRadius: '50%',
          opacity: isHovering ? 0 : 1
        }}
      />
    </>
  );
}