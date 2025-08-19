// src/components/CinematicCursor.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CinematicCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        setIsHovering(true);
        setCursorVariant('button');
      } else if (target.classList.contains('cursor-text')) {
        setCursorVariant('text');
      } else if (target.classList.contains('cursor-view')) {
        setCursorVariant('view');
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorVariant('default');
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .cursor-interactive');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePos.x - 16,
      y: mousePos.y - 16,
      scale: 1,
      backgroundColor: 'rgba(245, 158, 11, 0.8)',
      border: '2px solid rgba(245, 158, 11, 1)',
    },
    button: {
      x: mousePos.x - 24,
      y: mousePos.y - 24,
      scale: 1.5,
      backgroundColor: 'rgba(139, 92, 246, 0.8)',
      border: '2px solid rgba(139, 92, 246, 1)',
    },
    text: {
      x: mousePos.x - 2,
      y: mousePos.y - 12,
      scale: 1,
      backgroundColor: 'transparent',
      border: '1px solid rgba(245, 158, 11, 1)',
      width: '4px',
      height: '24px',
      borderRadius: '2px',
    },
    view: {
      x: mousePos.x - 32,
      y: mousePos.y - 32,
      scale: 2,
      backgroundColor: 'transparent',
      border: '2px solid rgba(6, 182, 212, 1)',
    }
  };

  if (window.innerWidth < 768) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] rounded-full mix-blend-difference"
        animate={variants[cursorVariant]}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
        style={{
          width: '32px',
          height: '32px',
          filter: 'blur(0.5px)',
          boxShadow: '0 0 20px rgba(245, 158, 11, 0.6)',
        }}
      />
      
      {/* Cursor trail */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full"
        animate={{
          x: mousePos.x - 8,
          y: mousePos.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
        style={{
          width: '16px',
          height: '16px',
          backgroundColor: 'rgba(245, 158, 11, 0.3)',
          filter: 'blur(1px)',
        }}
      />
      
      {/* Outer glow */}
      <motion.div
        className="fixed pointer-events-none z-[9997] rounded-full"
        animate={{
          x: mousePos.x - 40,
          y: mousePos.y - 40,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
        style={{
          width: '80px',
          height: '80px',
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />
    </>
  );
}