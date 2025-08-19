// src/components/ImmersiveBackground.jsx
import { Canvas } from '@react-three/fiber';
import { Stars, Float, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingGeometry({ position, geometry, color }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function ParticleField({ mouse }) {
  const points = useRef();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.5} color="#f59e0b" transparent opacity={0.8} />
    </points>
  );
}

export default function ImmersiveBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 50], fov: 60 }}>
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.3} />
        
        {/* Starfield */}
        <Stars 
          radius={300} 
          depth={60} 
          count={3000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.5}
        />
        
        {/* Floating Geometric Shapes */}
        <FloatingGeometry 
          position={[-20, 10, -30]} 
          geometry={<octahedronGeometry args={[2]} />}
          color="#8b5cf6"
        />
        <FloatingGeometry 
          position={[25, -15, -40]} 
          geometry={<icosahedronGeometry args={[1.5]} />}
          color="#06b6d4"
        />
        <FloatingGeometry 
          position={[-30, -20, -25]} 
          geometry={<tetrahedronGeometry args={[1.8]} />}
          color="#f59e0b"
        />
        
        {/* Particle Field */}
        <ParticleField />
        
        {/* Post-processing Effects */}
        <EffectComposer>
          <Bloom 
            intensity={0.3} 
            luminanceThreshold={0.1} 
            luminanceSmoothing={0.9}
            blendFunction={BlendFunction.SCREEN}
          />
          <ChromaticAberration 
            offset={[0.0002, 0.0005]} 
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}