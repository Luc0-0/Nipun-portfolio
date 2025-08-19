// src/components/ParticleExplosion.jsx
import { useEffect, useState } from 'react';

export default function ParticleExplosion() {
  const [explosions, setExplosions] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newExplosion = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
        particles: Array.from({ length: 12 }, (_, i) => ({
          id: i,
          angle: (i * 30) * Math.PI / 180,
          speed: Math.random() * 100 + 50
        }))
      };

      setExplosions(prev => [...prev, newExplosion]);

      setTimeout(() => {
        setExplosions(prev => prev.filter(exp => exp.id !== newExplosion.id));
      }, 1000);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]">
      {explosions.map(explosion => (
        <div key={explosion.id}>
          {explosion.particles.map(particle => (
            <div
              key={particle.id}
              className="absolute w-2 h-2 bg-amber-400 rounded-full"
              style={{
                left: explosion.x,
                top: explosion.y,
                animation: `explode 1s ease-out forwards`,
                '--angle': `${particle.angle}rad`,
                '--speed': `${particle.speed}px`
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}