import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function PageTransition() {
  const { isSpace, isDark } = useTheme();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none">
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isDark ? '#000000' : '#ffffff',
          opacity: isTransitioning ? 1 : 0
        }}
      />
    </div>
  );
}