import React from 'react';

export default function SharedBackground({ children, className = "" }) {
  return (
    <div className={`min-h-screen relative ${className}`} style={{
      background: 'linear-gradient(to bottom, #0a0a0a 0%, #1a1a2e 20%, #16213e 40%, #0f3460 60%, #1a1a2e 80%, #0a0a0a 100%)',
      cursor: 'auto'
    }}>
      {/* Atmospheric depth layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
        <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-amber-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />
      </div>

      {/* Subtle starfield */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              opacity: Math.random() * 0.4 + 0.1
            }}
          />
        ))}
      </div>

      {/* Content with proper z-index */}
      <div className="relative z-10" style={{ cursor: 'auto' }}>
        {children}
      </div>
    </div>
  );
}