// src/components/SimpleSolarSystem.jsx
// Simple 2D solar system without Three.js

import React from 'react';

const PLANETS = [
  { id: 'about', label: 'About', color: '#f5c36b' },
  { id: 'ongoing', label: 'Research', color: '#4a90e2' },
  { id: 'ai-skills', label: 'AI Skills', color: '#e74c3c' },
  { id: 'web-skills', label: 'Web Dev', color: '#2ecc71' },
  { id: 'project1', label: 'Project 1', color: '#9b59b6' },
  { id: 'project2', label: 'Project 2', color: '#f39c12' },
  { id: 'project3', label: 'Project 3', color: '#1abc9c' },
  { id: 'miniprojects', label: 'Mini Projects', color: '#e67e22' },
  { id: 'services', label: 'Services', color: '#34495e' },
  { id: 'contact', label: 'Contact', color: '#c0392b' },
];

export default function SimpleSolarSystem({ onPlanetClick }) {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-gold-300 mb-4">Navigation</h3>
        <p className="text-gray-400">Click to navigate to sections</p>
        
        {/* Sun */}
        <button
          onClick={() => onPlanetClick('about')}
          className="w-24 h-24 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 mt-8 mx-auto flex items-center justify-center text-galaxy-900 font-bold text-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-gold-500"
        >
          NS
        </button>
      </div>
      
      {/* Planets grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
        {PLANETS.map((planet) => (
          <button
            key={planet.id}
            onClick={() => onPlanetClick(planet.id)}
            className="relative group p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
          >
            <div 
              className="w-16 h-16 rounded-full mx-auto mb-3 shadow-lg"
              style={{ backgroundColor: planet.color }}
            />
            <span className="text-sm text-gray-300 font-medium">{planet.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}