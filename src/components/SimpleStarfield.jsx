// src/components/SimpleStarfield.jsx
// Simple CSS-only starfield background

import React from 'react';

export default function SimpleStarfield({ theme }) {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 1,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -10 }}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute rounded-full animate-pulse ${
            theme === 'light' ? 'bg-gray-600' : 'bg-white'
          }`}
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}