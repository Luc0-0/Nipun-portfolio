// src/components/AnimatedSolarSystem.jsx
// CSS-based animated solar system with orbiting planets

import React, { useState, useEffect } from 'react';

const PLANETS = [
  { id: 'about', label: 'About', color: '#f5c36b', orbit: 120, duration: 20 },
  { id: 'ongoing', label: 'Research', color: '#4a90e2', orbit: 150, duration: 25 },
  { id: 'ai-skills', label: 'AI Skills', color: '#e74c3c', orbit: 180, duration: 30 },
  { id: 'web-skills', label: 'Web Dev', color: '#2ecc71', orbit: 210, duration: 35 },
  { id: 'project1', label: 'Project 1', color: '#9b59b6', orbit: 240, duration: 40 },
  { id: 'project2', label: 'Project 2', color: '#f39c12', orbit: 270, duration: 45 },
  { id: 'project3', label: 'Project 3', color: '#1abc9c', orbit: 300, duration: 50 },
  { id: 'miniprojects', label: 'Mini Projects', color: '#e67e22', orbit: 330, duration: 55 },
  { id: 'services', label: 'Services', color: '#34495e', orbit: 360, duration: 60 },
  { id: 'contact', label: 'Contact', color: '#c0392b', orbit: 390, duration: 65 },
];

export default function AnimatedSolarSystem({ onPlanetClick }) {
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

      {/* Solar system container */}
      <div className="relative w-[800px] h-[800px]">
        
        {/* Sun (center) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => onPlanetClick('about')}
            className="w-24 h-24 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 flex items-center justify-center text-galaxy-900 font-bold text-lg hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gold-500/50 shadow-lg animate-pulse"
            style={{
              boxShadow: '0 0 30px rgba(245, 195, 107, 0.5)',
            }}
          >
            NS
          </button>
        </div>

        {/* Orbit rings */}
        {PLANETS.map((planet, i) => (
          <div
            key={`orbit-${i}`}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            style={{
              width: `${planet.orbit * 2}px`,
              height: `${planet.orbit * 2}px`,
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
                className={`relative group w-16 h-16 rounded-full border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gold-500/50 ${
                  focusedPlanet === i 
                    ? 'scale-125 border-gold-400 shadow-lg' 
                    : 'border-white/30 hover:scale-110 hover:border-gold-400'
                }`}
                style={{
                  backgroundColor: planet.color,
                  boxShadow: focusedPlanet === i ? `0 0 20px ${planet.color}80` : 'none',
                }}
                aria-label={`Navigate to ${planet.label}`}
              >
                {/* Planet label */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-xs text-white bg-black/70 px-2 py-1 rounded font-medium">
                    {planet.label}
                  </span>
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