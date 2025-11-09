import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import MagneticButton from './MagneticButton';

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
    <MagneticButton
      onClick={scrollToProjects}
      className={`fixed bottom-6 left-6 z-50 group transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      aria-label="Scroll to Featured Projects"
      intensity={0.2}
    >
      <div className="relative">
        {/* Modern glassmorphism container */}
        <div className={`relative px-5 py-4 rounded-2xl backdrop-blur-xl border transition-all duration-500 hover:scale-105 hover:-translate-y-1 ${
          isSpace 
            ? 'bg-gradient-to-br from-slate-900/80 via-purple-900/60 to-cyan-900/80 border-cyan-400/20 hover:border-cyan-400/40' 
            : isDark
              ? 'bg-gradient-to-br from-gray-900/80 via-amber-900/60 to-orange-900/80 border-amber-400/20 hover:border-amber-400/40'
              : 'bg-gradient-to-br from-slate-800/80 via-blue-900/60 to-purple-900/80 border-blue-400/20 hover:border-blue-400/40'
        }`} style={{
          boxShadow: isSpace 
            ? '0 20px 40px rgba(139, 92, 246, 0.2), 0 0 30px rgba(34, 211, 238, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
            : isDark
              ? '0 20px 40px rgba(245, 158, 11, 0.2), 0 0 30px rgba(251, 146, 60, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 20px 40px rgba(59, 130, 246, 0.2), 0 0 30px rgba(147, 51, 234, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}>
          <div className="flex items-center gap-3">
            <div className={`text-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
              isSpace ? 'text-cyan-300' : isDark ? 'text-amber-300' : 'text-blue-300'
            }`}>
              ⚡
            </div>
            <span className={`text-sm font-bold tracking-wide transition-all duration-300 ${
              isSpace ? 'text-cyan-100' : isDark ? 'text-amber-100' : 'text-blue-100'
            }`}>
              Projects
            </span>
          </div>
          
          {/* Animated border gradient */}
          <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            isSpace 
              ? 'bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20' 
              : isDark
                ? 'bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20'
                : 'bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20'
          }`} style={{
            background: `linear-gradient(45deg, transparent 30%, ${isSpace ? 'rgba(34, 211, 238, 0.1)' : isDark ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)'} 50%, transparent 70%)`
          }} />
        </div>
        
        {/* Outer glow effect */}
        <div className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500 -z-10 ${
          isSpace 
            ? 'bg-gradient-to-r from-purple-400 to-cyan-400' 
            : isDark
              ? 'bg-gradient-to-r from-amber-400 to-orange-400'
              : 'bg-gradient-to-r from-blue-400 to-purple-400'
        }`} />
      </div>
    </MagneticButton>
  );
}