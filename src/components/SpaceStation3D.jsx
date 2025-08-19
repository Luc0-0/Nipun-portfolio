// src/components/SpaceStation3D.jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SpaceStation3D({ position = [50, 20, -30] }) {
  const stationRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    if (stationRef.current) {
      stationRef.current.rotation.y += 0.005;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
    }
  });

  return (
    <group ref={stationRef} position={position}>
      {/* Main station body */}
      <mesh>
        <cylinderGeometry args={[3, 3, 8, 16]} />
        <meshStandardMaterial 
          color="#4a5568" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#1a202c"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Rotating ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[6, 0.5, 8, 32]} />
        <meshStandardMaterial 
          color="#2d3748" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#f59e0b"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Solar panels */}
      <mesh position={[8, 0, 0]}>
        <boxGeometry args={[0.2, 6, 4]} />
        <meshStandardMaterial 
          color="#1a365d" 
          metalness={0.3} 
          roughness={0.7}
          emissive="#3182ce"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[-8, 0, 0]}>
        <boxGeometry args={[0.2, 6, 4]} />
        <meshStandardMaterial 
          color="#1a365d" 
          metalness={0.3} 
          roughness={0.7}
          emissive="#3182ce"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Communication dish */}
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 4, 0, 0]}>
        <coneGeometry args={[2, 1, 16]} />
        <meshStandardMaterial 
          color="#718096" 
          metalness={0.7} 
          roughness={0.3}
        />
      </mesh>

      {/* Lights */}
      <pointLight position={[0, 0, 0]} color="#f59e0b" intensity={0.5} distance={20} />
    </group>
  );
}