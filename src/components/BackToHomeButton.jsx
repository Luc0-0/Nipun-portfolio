import React from 'react';
import { useTheme } from '../contexts/useTheme'';

export default function BackToHomeButton() {
  const { isSpace, isDark } = useTheme();

  const handleClick = () => {
    window.location.hash = '/';
    window.scrollTo(0, 0);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed top-24 right-6 z-[100] group transition-all duration-500 hover:scale-105 hover:-translate-y-1"
      aria-label="Back to Home"
    >
      <div className="relative">
        {/* Modern glassmorphism container */}
        <div className={`relative px-5 py-4 rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
          isSpace 
            ? 'bg-gradient-to-br from-slate-900/80 via-amber-900/60 to-orange-900/80 border-amber-400/20 hover:border-amber-400/40' 
            : isDark
              ? 'bg-gradient-to-br from-gray-900/80 via-amber-900/60 to-yellow-900/80 border-amber-400/20 hover:border-amber-400/40'
              : 'bg-gradient-to-br from-slate-800/80 via-amber-900/60 to-orange-900/80 border-amber-400/20 hover:border-amber-400/40'
        }`} style={{
          boxShadow: isSpace 
            ? '0 20px 40px rgba(245, 158, 11, 0.2), 0 0 30px rgba(251, 191, 36, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
            : isDark
              ? '0 20px 40px rgba(245, 158, 11, 0.2), 0 0 30px rgba(251, 191, 36, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 20px 40px rgba(245, 158, 11, 0.2), 0 0 30px rgba(251, 191, 36, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <div className="flex items-center gap-3">
            <div className={`text-xl transition-all duration-300 group-hover:scale-110 group-hover:-translate-x-1 ${
              isSpace ? 'text-amber-300' : isDark ? 'text-amber-300' : 'text-amber-300'
            }`}>
              🏠
            </div>
            <span className={`text-sm font-bold tracking-wide transition-all duration-300 ${
              isSpace ? 'text-amber-100' : isDark ? 'text-amber-100' : 'text-amber-100'
            }`}>
              Home
            </span>
          </div>
          
          {/* Animated border gradient */}
          <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            isSpace 
              ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20' 
              : isDark
                ? 'bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20'
                : 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20'
          }`} />
        </div>
        
        {/* Outer glow effect */}
        <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 -z-10 ${
          isSpace 
            ? 'bg-gradient-to-r from-amber-400 to-orange-400' 
            : isDark
              ? 'bg-gradient-to-r from-amber-400 to-yellow-400'
              : 'bg-gradient-to-r from-amber-400 to-orange-400'
        }`} />
      </div>
    </button>
  );
}
