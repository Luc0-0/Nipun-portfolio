// src/components/GlitchText.jsx
// Cyberpunk glitch effect for text

import React, { useState } from 'react';

export default function GlitchText({ children, className = "", trigger = "hover" }) {
  const [isGlitching, setIsGlitching] = useState(false);

  const handleTrigger = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 500);
  };

  return (
    <span 
      className={`relative inline-block ${className}`}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
      onClick={trigger === "click" ? handleTrigger : undefined}
    >
      <span className={`relative z-10 ${isGlitching ? 'animate-pulse' : ''}`}>
        {children}
      </span>
      
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-0 text-red-500 opacity-70 animate-ping"
            style={{ transform: 'translate(-2px, 0)' }}
          >
            {children}
          </span>
          <span 
            className="absolute top-0 left-0 text-cyan-500 opacity-70 animate-ping"
            style={{ transform: 'translate(2px, 0)', animationDelay: '0.1s' }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}