// src/components/HybridSpaceBackground.jsx
// Hybrid approach: Three.js Stars + CSS atmospheric effects

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function SpaceScene() {
  return (
    <>
      <Stars 
        radius={100} 
        depth={80} 
        count={12000} 
        factor={8} 
        saturation={0} 
        fade={true}
        speed={0.3}
      />
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={0.3} color="#ffffff" />
      <fog attach="fog" args={['#000011', 50, 200]} />
    </>
  );
}

export default function HybridSpaceBackground() {
  return (
    <>
      {/* Three.js Stars Layer */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <SpaceScene />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Enhanced Atmospheric Effects */}
      <div className="fixed inset-0 z-1 pointer-events-none">
        {/* Cinematic depth layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.4)_100%)]" />
        
        {/* Bright star overlays */}
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(1px 1px at 15% 25%, rgba(255,255,255,0.9), transparent 2px),
            radial-gradient(2px 2px at 85% 15%, rgba(255,255,255,0.8), transparent 3px),
            radial-gradient(1px 1px at 45% 75%, rgba(255,255,255,0.7), transparent 2px),
            radial-gradient(1px 1px at 75% 85%, rgba(255,255,255,0.9), transparent 2px),
            radial-gradient(2px 2px at 25% 45%, rgba(255,255,255,0.6), transparent 3px),
            radial-gradient(1px 1px at 95% 55%, rgba(255,255,255,0.8), transparent 2px)
          `
        }} />
        
        {/* Lens flare effects */}
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-blue-200/3 rounded-full blur-2xl" />
        
        {/* Film grain texture */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }} />
      </div>
    </>
  );
}