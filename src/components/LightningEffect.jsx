// src/components/LightningEffect.jsx
import { useEffect, useState } from 'react';

export default function LightningEffect() {
  const [lightning, setLightning] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      if (Math.random() < 0.1) {
        const newLightning = {
          id: Date.now(),
          x1: e.clientX,
          y1: e.clientY,
          x2: e.clientX + (Math.random() - 0.5) * 200,
          y2: e.clientY + (Math.random() - 0.5) * 200
        };
        
        setLightning(prev => [...prev, newLightning]);
        
        setTimeout(() => {
          setLightning(prev => prev.filter(l => l.id !== newLightning.id));
        }, 200);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <svg className="fixed inset-0 pointer-events-none z-[9996]" width="100%" height="100%">
      {lightning.map(bolt => (
        <line
          key={bolt.id}
          x1={bolt.x1}
          y1={bolt.y1}
          x2={bolt.x2}
          y2={bolt.y2}
          stroke="rgba(245, 158, 11, 0.8)"
          strokeWidth="2"
          className="animate-pulse"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.8))',
            animation: 'lightning 0.2s ease-out'
          }}
        />
      ))}
    </svg>
  );
}