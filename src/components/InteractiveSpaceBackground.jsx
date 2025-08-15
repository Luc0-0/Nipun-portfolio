// src/components/InteractiveSpaceBackground.jsx
// Interactive space background with mouse tracking and dynamic effects

import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveStars({ mouse }) {
  const starsRef = useRef();
  
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x = mouse.y * 0.0005;
      starsRef.current.rotation.y = mouse.x * 0.0005;
    }
  });

  return (
    <Stars 
      ref={starsRef}
      radius={100} 
      depth={80} 
      count={15000} 
      factor={8} 
      saturation={0} 
      fade={true}
      speed={0.2}
    />
  );
}

function ShootingStars() {
  const groupRef = useRef();
  const shootingStars = useRef([]);

  useEffect(() => {
    // Create shooting stars
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(100 * 3);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2,
        transparent: true,
        opacity: 0
      });
      
      const points = new THREE.Points(geometry, material);
      shootingStars.current.push({
        mesh: points,
        active: false,
        life: 0
      });
      
      if (groupRef.current) {
        groupRef.current.add(points);
      }
    }
  }, []);

  useFrame(() => {
    shootingStars.current.forEach(star => {
      if (Math.random() < 0.001 && !star.active) {
        // Activate shooting star
        star.active = true;
        star.life = 1;
        star.startX = (Math.random() - 0.5) * 200;
        star.startY = (Math.random() - 0.5) * 200;
        star.startZ = (Math.random() - 0.5) * 200;
      }
      
      if (star.active) {
        star.life -= 0.01;
        star.mesh.material.opacity = star.life;
        
        // Update trail positions
        const positions = star.mesh.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i] = star.startX + (i/3) * 2;
          positions[i + 1] = star.startY - (i/3) * 1;
          positions[i + 2] = star.startZ + (i/3) * 0.5;
        }
        star.mesh.geometry.attributes.position.needsUpdate = true;
        
        if (star.life <= 0) {
          star.active = false;
        }
      }
    });
  });

  return <group ref={groupRef} />;
}

function SpaceScene({ mouse }) {
  return (
    <>
      <InteractiveStars mouse={mouse} />
      <ShootingStars />
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={0.3} color="#ffffff" />
      <fog attach="fog" args={['#000011', 50, 200]} />
    </>
  );
}

export default function InteractiveSpaceBackground() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Three.js Interactive Stars */}
      <div ref={containerRef} className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
          <Suspense fallback={null}>
            <SpaceScene mouse={mouseRef.current} />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Enhanced Atmospheric Effects */}
      <div className="fixed inset-0 z-1 pointer-events-none">
        {/* Dynamic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.4)_100%)]" />
        
        {/* Interactive bright stars */}
        <div className="absolute inset-0 interactive-stars" style={{
          background: `
            radial-gradient(1px 1px at 15% 25%, rgba(255,255,255,0.9), transparent 2px),
            radial-gradient(2px 2px at 85% 15%, rgba(255,255,255,0.8), transparent 3px),
            radial-gradient(1px 1px at 45% 75%, rgba(255,255,255,0.7), transparent 2px),
            radial-gradient(1px 1px at 75% 85%, rgba(255,255,255,0.9), transparent 2px),
            radial-gradient(2px 2px at 25% 45%, rgba(255,255,255,0.6), transparent 3px),
            radial-gradient(1px 1px at 95% 55%, rgba(255,255,255,0.8), transparent 2px)
          `
        }} />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/60 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Lens flares */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-blue-200/3 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}} />
      </div>
    </>
  );
}