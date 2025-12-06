// src/components/AnimatedSolarSystem.jsx
// CSS-based animated solar system with orbiting planets

import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const PLANETS = [
  { id: 'about', label: 'About Me', color: '#ffffff', orbit: 120, duration: 20 },
  { id: 'ongoing', label: 'Current Studies', color: '#ffffff', orbit: 150, duration: 25 },
  { id: 'ai-skills', label: 'AI Developer & Engineer', color: '#ffffff', orbit: 180, duration: 30 },
  { id: 'web-skills', label: 'Full Stack (MERN)', color: '#ffffff', orbit: 210, duration: 35 },
  { id: 'project1', label: 'Academic Projects', color: '#ffffff', orbit: 240, duration: 40 },
  { id: 'project2', label: 'Data Analyst Projects', color: '#ffffff', orbit: 270, duration: 45 },
  { id: 'project3', label: 'Machine Learning Projects', color: '#ffffff', orbit: 300, duration: 50 },
  { id: 'miniprojects', label: 'Mini Projects', color: '#ffffff', orbit: 330, duration: 55 },
  { id: 'services', label: 'Future Goals', color: '#ffffff', orbit: 360, duration: 60 },
  { id: 'contact', label: 'Connect With Me', color: '#ffffff', orbit: 390, duration: 65 },
];

export default function AnimatedSolarSystem({ onPlanetClick }) {
  const { isDark } = useTheme();
  const [focusedPlanet, setFocusedPlanet] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setFocusedPlanet((prev) => (prev + 1) % PLANETS.length);
        e.preventDefault();
      } else if (e.key === 'ArrowLeft') {
        setFocusedPlanet((prev) => (prev - 1 + PLANETS.length) % PLANETS.length);
        e.preventDefault();
      } else if (e.key === 'Enter') {
        onPlanetClick(PLANETS[focusedPlanet].id);
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedPlanet, onPlanetClick]);

  return (
    <div className="w-full h-[700px] relative flex items-center justify-center">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center">
        <h3 className="text-2xl font-bold text-gold-300 mb-2">
          Solar System Navigator
        </h3>
        <p className="text-sm text-gray-400">
          Click planets to navigate • Use ← → keys • Enter to select
        </p>
      </div>

      {/* Responsive Solar system container */}
      <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl h-[320px] sm:h-[480px] md:h-[600px] lg:h-[800px]">
        {/* Sun (center) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => onPlanetClick('about')}
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gray-400 flex items-center justify-center text-black font-bold text-lg hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300/50 shadow-lg"
            style={{
              boxShadow: isDark ? 'inset 0 0 20px rgba(0, 0, 0, 0.2)' : 'inset 0 0 20px rgba(0, 0, 0, 0.4)',
            }}
          >
            NS
          </button>
        </div>

        {/* Orbit rings */}
        {PLANETS.map((planet, i) => (
          <div
            key={`orbit-${i}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              width: `calc(${planet.orbit * 2}px * (100vw / 800))`,
              height: `calc(${planet.orbit * 2}px * (100vw / 800))`,
              maxWidth: `${planet.orbit * 2}px`,
              maxHeight: `${planet.orbit * 2}px`,
              borderColor: isDark ? '#ffffff' : '#000000',
            }}
          />
        ))}

        {/* Planets */}
        {PLANETS.map((planet, i) => (
          <div
            key={planet.id}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: `${planet.orbit * 2}px`,
              height: `${planet.orbit * 2}px`,
              animation: `spin ${planet.duration}s linear infinite`,
            }}
          >
            {/* Planet positioned at the right edge of its orbit */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-auto">
              <button
                onClick={() => onPlanetClick(planet.id)}
                onMouseEnter={() => setFocusedPlanet(i)}
                className={`relative group w-16 h-16 rounded-full border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-white/50 ${
                  focusedPlanet === i 
                    ? 'scale-125 border-white shadow-lg' 
                    : 'border-white/50 hover:scale-110 hover:border-white'
                }`}
                style={{
                  backgroundColor: isDark ? planet.color : '#000000',
                  boxShadow: focusedPlanet === i ? (isDark ? `inset 0 0 15px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.2)` : `inset 0 0 15px rgba(255, 255, 255, 0.3), 0 0 20px rgba(0, 0, 0, 0.2)`) : 'none',
                }}
                aria-label={`Navigate to ${planet.label}`}
              >
                {/* Planet label - shows on hover */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-amber-400/30 shadow-lg">
                    <span className="text-xs font-semibold text-amber-100">
                      {planet.label}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-gray-500 text-center">
        <p>Use keyboard: ← → to navigate, Enter to select</p>
        <p>Currently focused: <span className="text-gold-300">{PLANETS[focusedPlanet].label}</span></p>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
}