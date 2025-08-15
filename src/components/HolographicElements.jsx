// src/components/HolographicElements.jsx
// Holographic UI elements and scan lines

import React from 'react';

export default function HolographicElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-5">
      {/* Subtle scan lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-full h-px bg-white animate-scan-down" />
        <div className="absolute w-full h-px bg-white animate-scan-up" style={{animationDelay: '4s'}} />
      </div>
      
      {/* Elegant corner frames */}
      <div className="absolute top-6 left-6">
        <div className="w-12 h-12 border-l border-t border-white/20" />
        <div className="text-xs text-white/30 mt-2 font-light tracking-wider">PORTFOLIO</div>
      </div>
      
      <div className="absolute top-6 right-6">
        <div className="w-12 h-12 border-r border-t border-white/20" />
        <div className="text-xs text-white/30 mt-2 font-light tracking-wider text-right">2024</div>
      </div>
      
      <div className="absolute bottom-6 left-6">
        <div className="w-12 h-12 border-l border-b border-white/20" />
      </div>
      
      <div className="absolute bottom-6 right-6">
        <div className="w-12 h-12 border-r border-b border-white/20" />
      </div>
      
      {/* Minimal floating indicators */}
      <div className="absolute top-1/3 right-12 animate-float">
        <div className="w-1 h-1 bg-white/40 rounded-full" />
      </div>
      
      <div className="absolute bottom-1/3 left-12 animate-float" style={{animationDelay: '2s'}}>
        <div className="w-1 h-1 bg-white/40 rounded-full" />
      </div>
    </div>
  );
}