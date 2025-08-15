// src/components/PerformanceMonitor.jsx
// Real-time performance monitoring component

import React, { useState, useEffect, useRef } from 'react';

export default function PerformanceMonitor() {
  const [fps, setFps] = useState(60);
  const [memory, setMemory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let animationId;
    
    const updateMetrics = () => {
      const now = performance.now();
      frameCount.current++;
      
      if (now - lastTime.current >= 1000) {
        setFps(Math.round((frameCount.current * 1000) / (now - lastTime.current)));
        frameCount.current = 0;
        lastTime.current = now;
        
        // Memory usage (if available)
        if (performance.memory) {
          setMemory(Math.round(performance.memory.usedJSHeapSize / 1048576));
        }
      }
      
      animationId = requestAnimationFrame(updateMetrics);
    };
    
    updateMetrics();
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Toggle visibility with Ctrl+Shift+P
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-md border border-cyan-400/30 rounded-lg p-3 text-xs font-mono">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${fps >= 55 ? 'bg-green-400' : fps >= 30 ? 'bg-yellow-400' : 'bg-red-400'}`} />
          <span className="text-white">{fps} FPS</span>
        </div>
        {memory > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-white">{memory} MB</span>
          </div>
        )}
        <div className="text-gray-400">Ctrl+Shift+P</div>
      </div>
    </div>
  );
}