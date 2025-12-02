// src/components/LightweightInteractiveBackground.jsx
// Interactive background with mouse trail, star trail, and comet effects

import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function MouseInteractiveStars() {
  const starsRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 0.5,
        y: (e.clientY / window.innerHeight - 0.5) * 0.5
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x += (mouseRef.current.y - starsRef.current.rotation.x) * 0.05;
      starsRef.current.rotation.y += (mouseRef.current.x - starsRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <Stars 
      ref={starsRef}
      radius={80} 
      depth={50} 
      count={8000} 
      factor={6} 
      saturation={0} 
      fade={true}
      speed={0.5}
      color="#1a1a1a" // Much darker stars for light mode
    />
  );
}

export default function LightweightInteractiveBackground() {
  const cursorRef = useRef();
  const brightnessRef = useRef();
  const trailRef = useRef([]);
  const [mouseTrail, setMouseTrail] = useState([]);
  const [comets, setComets] = useState([]);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Update cursor glow with area brightening
      if (cursorRef.current) {
        cursorRef.current.style.left = x + 'px';
        cursorRef.current.style.top = y + 'px';
      }
      
      // Update brightness area
      if (brightnessRef.current) {
        brightnessRef.current.style.left = x + 'px';
        brightnessRef.current.style.top = y + 'px';
      }
      
      // Enhanced mouse trail with more particles
      const newTrail = { 
        x, 
        y, 
        id: Date.now() + Math.random(),
        timestamp: Date.now()
      };
      setMouseTrail(prev => [...prev.slice(-15), newTrail]);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Create random comets
  useEffect(() => {
    const createComet = () => {
      const comet = {
        id: Date.now() + Math.random(),
        x: Math.random() * window.innerWidth,
        y: -50,
        vx: (Math.random() - 0.5) * 5,
        vy: Math.random() * 4 + 2,
        life: 1,
        trail: [],
        size: Math.random() * 1.5 + 0.5
      };
      setComets(prev => [...prev, comet]);
    };
    
    const interval = setInterval(() => {
      if (Math.random() < 0.6) createComet();
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);
  
  // Update comets
  useEffect(() => {
    const updateComets = () => {
      setComets(prev => prev.map(comet => {
        comet.x += comet.vx;
        comet.y += comet.vy;
        comet.life -= 0.01;
        comet.trail.push({ x: comet.x, y: comet.y });
        if (comet.trail.length > 20) comet.trail.shift();
        return comet;
      }).filter(comet => comet.life > 0 && comet.y < window.innerHeight + 100));
    };
    
    const interval = setInterval(updateComets, 50);
    return () => clearInterval(interval);
  }, []);
  
  // Enhanced trail fading with realistic decay
  useEffect(() => {
    const fadeTrail = setInterval(() => {
      const now = Date.now();
      setMouseTrail(prev => prev.filter(point => now - point.timestamp < 1000));
    }, 50);
    return () => clearInterval(fadeTrail);
  }, []);

  return (
    <>
      {/* Three.js Stars with Mouse Interaction */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <MouseInteractiveStars />
            <fog attach="fog" args={['#000011', 30, 150]} />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Enhanced Mouse Effects */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {/* Area brightening effect */}
        <div 
          ref={brightnessRef}
          className="absolute w-96 h-96 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(100,200,255,0.08) 0%, rgba(150,100,255,0.04) 40%, transparent 70%)',
            filter: 'blur(40px)'
          }}
        />
        
        {/* Mouse cursor glow */}
        <div 
          ref={cursorRef}
          className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2"
          style={{
            background: 'radial-gradient(circle, rgba(100,200,255,0.2) 0%, rgba(150,100,255,0.1) 50%, transparent 70%)',
            filter: 'blur(20px)'
          }}
        />
        
        {/* Enhanced realistic mouse trail */}
        {mouseTrail.map((point, index) => {
          const age = (Date.now() - point.timestamp) / 1000;
          const opacity = Math.max(0, 1 - age) * 0.8;
          const size = Math.max(1, 4 - age * 2);
          
          return (
            <div key={point.id}>
              {/* Main trail particle */}
              <div
                className="absolute rounded-full"
                style={{
                  left: point.x - size/2,
                  top: point.y - size/2,
                  width: size,
                  height: size,
                  background: `rgba(100, 200, 255, ${opacity})`,
                  boxShadow: `0 0 ${size * 3}px rgba(100, 200, 255, ${opacity * 0.6})`
                }}
              />
              {/* Casting effect */}
              <div
                className="absolute rounded-full"
                style={{
                  left: point.x - size,
                  top: point.y - size,
                  width: size * 2,
                  height: size * 2,
                  background: `radial-gradient(circle, rgba(150, 100, 255, ${opacity * 0.3}) 0%, transparent 70%)`,
                  filter: 'blur(4px)'
                }}
              />
            </div>
          );
        })}
        
        {/* Enhanced Comets */}
        {comets.map(comet => {
          const headSize = comet.size || 1;
          return (
            <div key={comet.id}>
              {/* Comet head with size variation */}
              <div
                className="absolute rounded-full"
                style={{
                  left: comet.x - headSize * 1.5,
                  top: comet.y - headSize * 1.5,
                  width: headSize * 3,
                  height: headSize * 3,
                  background: `rgba(255, 255, 255, ${comet.life * 0.9})`,
                  boxShadow: `0 0 ${headSize * 15}px rgba(255, 255, 255, ${comet.life * 0.6}), 0 0 ${headSize * 25}px rgba(100, 200, 255, ${comet.life * 0.3})`
                }}
              />
              {/* Enhanced comet trail */}
              {comet.trail.map((point, index) => {
                const trailOpacity = (index / comet.trail.length) * comet.life * 0.7;
                const trailSize = headSize * (index / comet.trail.length) * 2;
                return (
                  <div
                    key={index}
                    className="absolute rounded-full"
                    style={{
                      left: point.x - trailSize/2,
                      top: point.y - trailSize/2,
                      width: Math.max(1, trailSize),
                      height: Math.max(1, trailSize),
                      background: `rgba(255, 255, 255, ${trailOpacity})`,
                      boxShadow: `0 0 ${trailSize * 3}px rgba(255, 255, 255, ${trailOpacity * 0.5})`
                    }}
                  />
                );
              })}
              {/* Comet glow aura */}
              <div
                className="absolute rounded-full"
                style={{
                  left: comet.x - headSize * 4,
                  top: comet.y - headSize * 4,
                  width: headSize * 8,
                  height: headSize * 8,
                  background: `radial-gradient(circle, rgba(100, 200, 255, ${comet.life * 0.1}) 0%, transparent 70%)`,
                  filter: 'blur(10px)'
                }}
              />
            </div>
          );
        })}
      </div>
      
      {/* Subtle Atmospheric Layer */}
      <div className="fixed inset-0 z-1 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </div>
      

    </>
  );
}