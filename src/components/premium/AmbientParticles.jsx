import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 100 }) {
  const mesh = useRef();
  const light = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.0005 + Math.random() / 500;
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 200 - 100;
      const z = Math.random() * 200 - 100;

      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = particles[i].x;
      positions[i * 3 + 1] = particles[i].y;
      positions[i * 3 + 2] = particles[i].z;
    }
    return positions;
  }, [count, particles]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      let { time, factor, speed, x, y, z } = particle;
      
      time = particle.time += speed;
      
      const s = Math.cos(time);
      
      dummy.position.set(
        x + Math.sin((time / 10) * factor) * 2,
        y + Math.cos((time / 10) * factor) * 2,
        z + Math.sin((time / 10) * factor) * 2
      );
      
      dummy.scale.setScalar(s * 0.3 + 0.3);
      dummy.updateMatrix();
      
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
    
    if (light.current) {
      light.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 30;
      light.current.position.y = Math.cos(state.clock.elapsedTime * 0.2) * 30;
    }
  });

  return (
    <>
      <pointLight ref={light} distance={100} intensity={2} color="#d4a853" />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial
          color="#d4a853"
          emissive="#d4a853"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </instancedMesh>
    </>
  );
}

function FloatingDust({ count = 50 }) {
  const points = useRef();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 150;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.02;
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.5}
        color="#d4a853"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

export default function AmbientParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: false }}
      >
        <ambientLight intensity={0.1} />
        <Particles count={60} />
        <FloatingDust count={40} />
      </Canvas>
    </div>
  );
}
