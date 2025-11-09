import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

export default function PageTransition() {
  const { isSpace, isDark } = useTheme();
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none">
      {/* Main transition overlay */}
      <div
        className={`absolute inset-0 transition-all duration-800 ease-out ${
          isTransitioning ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: isSpace
            ? 'linear-gradient(135deg, #1a1a40 0%, #23234f 50%, #0d0d1a 100%)'
            : isDark
              ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f8fafc 100%)'
        }}
      />
      
      {/* Animated particles during transition */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-pulse ${
              isSpace ? 'bg-cyan-400' : isDark ? 'bg-amber-400' : 'bg-blue-400'
            }`}
            style={{
              left: `${10 + i * 7}%`,
              top: `${20 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '0.8s'
            }}
          />
        ))}
      </div>

      {/* Loading text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className={`text-2xl font-light tracking-wider mb-4 ${
            isSpace ? 'text-cyan-300' : isDark ? 'text-amber-300' : 'text-gray-800'
          }`}>
            LOADING
          </div>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-60" />
        </div>
      </div>
    </div>
  );
}