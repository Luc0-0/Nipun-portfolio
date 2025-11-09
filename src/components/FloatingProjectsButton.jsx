import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function FloatingProjectsButton() {
  const { isSpace, isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls past hero section
      const heroHeight = window.innerHeight * 1.5;
      const projectsSection = document.querySelector('.project-showcase-anchor');
      
      if (window.scrollY > 200 && window.scrollY < (projectsSection?.offsetTop - 100 || Infinity)) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.querySelector('.project-showcase-anchor');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToProjects}
      className={`fixed bottom-6 left-6 z-50 group transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      aria-label="Scroll to Featured Projects"
    >
      <div className={`relative px-4 py-3 rounded-full shadow-2xl backdrop-blur-lg border transition-all duration-300 hover:scale-110 ${
        isSpace 
          ? 'bg-gradient-to-r from-purple-600/90 to-cyan-600/90 border-cyan-400/30 hover:border-cyan-400/60' 
          : isDark
            ? 'bg-gradient-to-r from-amber-600/90 to-orange-600/90 border-amber-400/30 hover:border-amber-400/60'
            : 'bg-gradient-to-r from-blue-600/90 to-purple-600/90 border-blue-400/30 hover:border-blue-400/60'
      }`} style={{
        boxShadow: isSpace 
          ? '0 8px 32px rgba(139, 92, 246, 0.3), 0 0 20px rgba(34, 211, 238, 0.2)' 
          : isDark
            ? '0 8px 32px rgba(245, 158, 11, 0.3), 0 0 20px rgba(251, 146, 60, 0.2)'
            : '0 8px 32px rgba(59, 130, 246, 0.3), 0 0 20px rgba(147, 51, 234, 0.2)'
      }}>
        <div className="flex items-center gap-2">
          <div className={`text-lg transition-transform duration-300 group-hover:scale-110 ${
            isSpace ? 'text-cyan-200' : 'text-white'
          }`}>
            🚀
          </div>
          <span className={`text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
            isSpace ? 'text-cyan-100' : 'text-white'
          }`}>
            Featured Projects
          </span>
        </div>
        
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300 ${
          isSpace 
            ? 'bg-gradient-to-r from-purple-400 to-cyan-400' 
            : isDark
              ? 'bg-gradient-to-r from-amber-400 to-orange-400'
              : 'bg-gradient-to-r from-blue-400 to-purple-400'
        }`} />
      </div>
    </button>
  );
}