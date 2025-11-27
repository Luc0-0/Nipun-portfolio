// src/components/CometTrail.jsx
import { useEffect, useState, useRef } from 'react';

export default function CometTrail() {
  const [trail, setTrail] = useState([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      trailIdRef.current += 1;
      const newPoint = {
        id: trailIdRef.current,
        x: e.clientX,
        y: e.clientY
      };

      setTrail(prev => [...prev.slice(-15), newPoint]);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9995]">
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: point.x,
            top: point.y,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, rgba(245, 158, 11, ${0.8 - index * 0.05}) 0%, transparent 70%)`,
            animation: `fade-out 1s ease-out forwards`,
            animationDelay: `${index * 0.05}s`
          }}
        />
      ))}
    </div>
  );
}