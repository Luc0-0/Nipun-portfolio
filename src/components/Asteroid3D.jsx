// src/components/Asteroid3D.jsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Asteroid3D({ position, size = 1 }) {
  const asteroidRef = useRef();

  useFrame(() => {
    if (asteroidRef.current) {
      asteroidRef.current.rotation.x += 0.01;
      asteroidRef.current.rotation.y += 0.005;
      asteroidRef.current.rotation.z += 0.003;
    }
  });

  return (
    <mesh ref={asteroidRef} position={position}>
      <dodecahedronGeometry args={[size, 1]} />
      <meshStandardMaterial 
        color="#4a5568" 
        roughness={0.9} 
        metalness={0.1}
        emissive="#2d3748"
        emissiveIntensity={0.05}
      />
    </mesh>
  );
}