// src/components/AnimatedSolarSystemMobile.jsx
// Scaled-down solar system for mobile screens

import React, { useState, useEffect } from 'react';

const PLANETS = [
  { id: 'about', label: 'About', color: '#f5c36b', orbit: 60, duration: 20 },
  { id: 'ongoing', label: 'Research', color: '#4a90e2', orbit: 75, duration: 25 },
  { id: 'ai-skills', label: 'AI Skills', color: '#e74c3c', orbit: 90, duration: 30 },
  { id: 'web-skills', label: 'Web Dev', color: '#2ecc71', orbit: 105, duration: 35 },
  { id: 'project1', label: 'Project 1', color: '#9b59b6', orbit: 120, duration: 40 },
  { id: 'project2', label: 'Project 2', color: '#f39c12', orbit: 135, duration: 45 },
  { id: 'project3', label: 'Project 3', color: '#1abc9c', orbit: 150, duration: 50 },
  { id: 'miniprojects', label: 'Mini Projects', color: '#e67e22', orbit: 165, duration: 55 },
  { id: 'services', label: 'Services', color: '#34495e', orbit: 180, duration: 60 },
  { id: 'contact', label: 'Contact', color: '#c0392b', orbit: 195, duration: 65 },
];

export default function AnimatedSolarSystemMobile({ onPlanetClick }) {
  const [focusedPlanet, setFocusedPlanet] = useState(0);

  // Keyboard navigation (optional for mobile)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setFocusedPlanet((prev) => (prev + 1) % PLANETS.length);
      } else if (e.key === 'ArrowLeft') {
        setFocusedPlanet((prev) => (prev - 1 + PLANETS.length) % PLANETS.length);
      } else if (e.key === 'Enter') {
        onPlanetClick(PLANETS[focusedPlanet].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedPlanet, onPlanetClick]);

  return (
    <div className="w-full h-[320px] relative flex items-center justify-center">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 text-center">
        <h3 className="text-lg font-bold text-gold-300 mb-1">
          Solar System Navigator
        </h3>
        <p className="text-xs text-gray-400">
          Tap planets to navigate
        </p>
      </div>
      {/* Solar system container (scaled down) */}
      <div className="relative w-full max-w-xs h-[320px]">
        {/* Sun (center) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => onPlanetClick('about')}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 flex items-center justify-center text-galaxy-900 font-bold text-base hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500/50 shadow-lg animate-pulse"
            style={{ boxShadow: '0 0 16px rgba(245, 195, 107, 0.5)' }}
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
        {PLANETS.map((planet, i) => {
          const angle = (360 / PLANETS.length) * i;
          const rad = (angle * Math.PI) / 180;
          const x = Math.cos(rad) * planet.orbit;
          const y = Math.sin(rad) * planet.orbit;
          return (
            <button
              key={planet.id}
              onClick={() => onPlanetClick(planet.id)}
              className={`absolute left-1/2 top-1/2 rounded-full font-bold text-xs flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500/50 shadow-lg ${focusedPlanet === i ? 'scale-110 ring-2 ring-gold-400' : ''}`}
              style={{
                width: '32px',
                height: '32px',
                background: planet.color,
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                zIndex: 10 + i,
              }}
            >
              {planet.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
