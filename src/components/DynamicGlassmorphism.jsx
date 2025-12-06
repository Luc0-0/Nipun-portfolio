import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/useTheme'';

export default function DynamicGlassmorphism({ 
  children, 
  className = '', 
  intensity = 'medium',
  colorShift = false,
  ...props 
}) {
  const { isSpace, isDark } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const intensityMap = {
    light: { blur: 'backdrop-blur-sm', opacity: '10' },
    medium: { blur: 'backdrop-blur-md', opacity: '20' },
    heavy: { blur: 'backdrop-blur-xl', opacity: '30' }
  };

  const currentIntensity = intensityMap[intensity];
  const dynamicBlur = Math.min(20, 8 + scrollY * 0.01);
  
  // Color shift based on mouse position
  const hue = colorShift ? (mousePosition.x / window.innerWidth) * 60 : 0;

  return (
    <div
      className={`relative ${currentIntensity.blur} transition-all duration-300 ${className}`}
      style={{
        backdropFilter: `blur(${dynamicBlur}px)`,
        background: colorShift
          ? `hsla(${hue}, 70%, 50%, 0.${currentIntensity.opacity})`
          : isSpace
            ? `rgba(34, 211, 238, 0.${currentIntensity.opacity})`
            : isDark
              ? `rgba(251, 191, 36, 0.${currentIntensity.opacity})`
              : `rgba(255, 255, 255, 0.${currentIntensity.opacity})`,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)`
      }}
      {...props}
    >
      {children}
    </div>
  );
}
