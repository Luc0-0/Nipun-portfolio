import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function IntelligentCursor() {
  const { isSpace, isDark } = useTheme();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState('default');
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add trailing particles
      const uniqueId = `${Date.now()}-${Math.random()}`;
      setParticles(prev => [
        ...prev.slice(-8),
        {
          id: uniqueId,
          x: e.clientX,
          y: e.clientY,
          opacity: 1
        }
      ]);
    };

    const handleMouseEnter = (e) => {
      const element = e.target;
      if (element && element.matches) {
        if (element.matches('button, a, [data-magnetic]')) {
          setIsHovering(true);
          setCursorType('magnetic');
        } else if (element.matches('input, textarea')) {
          setCursorType('text');
        } else if (element.matches('[data-cursor="view"]')) {
          setCursorType('view');
        }
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorType('default');
    };

    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  // Fade out particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({ ...p, opacity: p.opacity - 0.1 }))
           .filter(p => p.opacity > 0)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  if (window.innerWidth < 768) return null; // Hide on mobile

  return (
    <>
      {/* Trailing particles */}
      {particles.map((particle, i) => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-[9999] w-1 h-1 rounded-full"
          style={{
            left: particle.x - 2,
            top: particle.y - 2,
            opacity: particle.opacity * 0.6,
            background: isSpace 
              ? `rgba(34, 211, 238, ${particle.opacity})` 
              : isDark 
                ? `rgba(251, 191, 36, ${particle.opacity})`
                : `rgba(59, 130, 246, ${particle.opacity})`,
            transform: `scale(${1 - i * 0.1})`,
            transition: 'opacity 0.1s ease-out'
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-all duration-200 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: position.x - 8,
          top: position.y - 8,
        }}
      >
        <div
          className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
            cursorType === 'magnetic' 
              ? 'bg-amber-400/20 border-amber-400' 
              : cursorType === 'text'
                ? 'bg-blue-400/20 border-blue-400'
                : cursorType === 'view'
                  ? 'bg-purple-400/20 border-purple-400'
                  : isSpace
                    ? 'bg-cyan-400/20 border-cyan-400'
                    : isDark
                      ? 'bg-amber-400/20 border-amber-400'
                      : 'bg-gray-800/20 border-gray-800'
          }`}
        />
        
        {/* Cursor type indicator */}
        {cursorType !== 'default' && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium px-2 py-1 bg-black/80 text-white rounded">
            {cursorType === 'magnetic' ? 'CLICK' : cursorType === 'text' ? 'TYPE' : 'VIEW'}
          </div>
        )}
      </div>
    </>
  );
}