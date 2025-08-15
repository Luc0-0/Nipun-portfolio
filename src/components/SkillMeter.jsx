// src/components/SkillMeter.jsx
// Interactive skill meter with animations

import React, { useState, useEffect, useRef } from 'react';

export default function SkillMeter({ skill, level, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const meterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (meterRef.current) {
      observer.observe(meterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setCurrentLevel(prev => {
            if (prev >= level) {
              clearInterval(interval);
              return level;
            }
            return prev + 2;
          });
        }, 20);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, level, delay]);

  const getSkillColor = (level) => {
    if (level >= 90) return 'from-gray-400 to-gray-500';
    if (level >= 75) return 'from-gray-500 to-gray-600';
    if (level >= 60) return 'from-gray-600 to-gray-700';
    return 'from-gray-700 to-gray-800';
  };

  const getGlowColor = (level) => {
    if (level >= 90) return 'shadow-gray-400/30';
    if (level >= 75) return 'shadow-gray-500/30';
    if (level >= 60) return 'shadow-gray-600/30';
    return 'shadow-gray-700/30';
  };

  return (
    <div ref={meterRef} className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
          {skill}
        </span>
        <span className="text-xs text-gray-400 font-mono">
          {currentLevel}%
        </span>
      </div>
      
      <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
        {/* Background glow */}
        <div 
          className={`absolute inset-0 bg-gradient-to-r ${getSkillColor(level)} opacity-10 rounded-full`}
        />
        
        {/* Progress bar */}
        <div
          className={`h-full bg-gradient-to-r ${getSkillColor(level)} rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${getGlowColor(level)} shadow-lg`}
          style={{ width: `${currentLevel}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          
          {/* Pulse effect for high skills */}
          {level >= 85 && (
            <div className="absolute inset-0 bg-white/10 animate-pulse" />
          )}
        </div>
        
        {/* Skill level indicators */}
        <div className="absolute inset-0 flex justify-between items-center px-1">
          {[25, 50, 75].map(mark => (
            <div
              key={mark}
              className={`w-px h-1 ${currentLevel >= mark ? 'bg-white/30' : 'bg-gray-600'} transition-colors duration-300`}
            />
          ))}
        </div>
      </div>
      
      {/* Skill description on hover */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
        <div className="text-xs text-gray-500">
          {level >= 90 && "Expert level - Leading projects and mentoring others"}
          {level >= 75 && level < 90 && "Advanced - Comfortable with complex implementations"}
          {level >= 60 && level < 75 && "Intermediate - Solid understanding and practical experience"}
          {level < 60 && "Learning - Building foundational knowledge"}
        </div>
      </div>
    </div>
  );
}