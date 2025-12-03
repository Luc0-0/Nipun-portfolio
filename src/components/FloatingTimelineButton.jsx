import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function FloatingTimelineButton() {
  const { isSpace, isDark } = useTheme();

  const handleClick = () => {
    window.location.hash = '/timeline';
  };

  return (
    <button
      onClick={handleClick}
      className="fixed left-6 bottom-32 z-[100] group transition-all duration-500 hover:scale-105 hover:-translate-y-1"
      style={{ pointerEvents: 'auto' }}
      aria-label="View Timeline"
    >
      <div className="relative">
        {/* Modern glassmorphism container */}
        <div className={`relative px-5 py-4 rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
          isSpace 
            ? 'bg-gradient-to-br from-slate-900/80 via-indigo-900/60 to-purple-900/80 border-purple-400/20 hover:border-purple-400/40' 
            : isDark
              ? 'bg-gradient-to-br from-gray-900/80 via-purple-900/60 to-pink-900/80 border-purple-400/20 hover:border-purple-400/40'
              : 'bg-gradient-to-br from-slate-800/80 via-indigo-900/60 to-purple-900/80 border-purple-400/20 hover:border-purple-400/40'
        }`} style={{
          boxShadow: isSpace 
            ? '0 20px 40px rgba(139, 92, 246, 0.2), 0 0 30px rgba(168, 85, 247, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
            : isDark
              ? '0 20px 40px rgba(168, 85, 247, 0.2), 0 0 30px rgba(192, 132, 252, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 20px 40px rgba(139, 92, 246, 0.2), 0 0 30px rgba(168, 85, 247, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <div className="flex items-center gap-3">
            <svg className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${
              isSpace ? 'text-purple-300' : isDark ? 'text-purple-300' : 'text-purple-300'
            }`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <span className={`text-sm font-bold tracking-wide transition-all duration-300 ${
              isSpace ? 'text-purple-100' : isDark ? 'text-purple-100' : 'text-purple-100'
            }`}>
              Timeline
            </span>
          </div>
          
          {/* Animated border gradient */}
          <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            isSpace 
              ? 'bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20' 
              : isDark
                ? 'bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20'
                : 'bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-indigo-500/20'
          }`} />
        </div>
        
        {/* Outer glow effect */}
        <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 -z-10 ${
          isSpace 
            ? 'bg-gradient-to-r from-indigo-400 to-purple-400' 
            : isDark
              ? 'bg-gradient-to-r from-purple-400 to-pink-400'
              : 'bg-gradient-to-r from-indigo-400 to-purple-400'
        }`} />
      </div>
    </button>
  );
}
