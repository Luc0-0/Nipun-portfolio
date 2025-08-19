// src/components/ConstellationLines.jsx
import { useEffect, useState } from 'react';

export default function ConstellationLines() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [nearbyElements, setNearbyElements] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Find nearby interactive elements
      const interactiveElements = document.querySelectorAll('button, a, .constellation-point');
      const nearby = [];
      
      interactiveElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
        
        if (distance < 200) {
          nearby.push({ x: centerX, y: centerY, distance });
        }
      });
      
      setNearbyElements(nearby.slice(0, 3)); // Max 3 connections
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <svg className="fixed inset-0 pointer-events-none z-[9994]" width="100%" height="100%">
      {nearbyElements.map((element, index) => (
        <line
          key={index}
          x1={mousePos.x}
          y1={mousePos.y}
          x2={element.x}
          y2={element.y}
          stroke="rgba(245, 158, 11, 0.8)"
          strokeWidth="2"
          strokeDasharray="5,5"
          style={{
            opacity: Math.max(0, 1 - element.distance / 200),
            animation: 'constellation-pulse 2s ease-in-out infinite'
          }}
        />
      ))}
    </svg>
  );
}