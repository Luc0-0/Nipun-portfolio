// src/components/InfrastructureSolarSystem.jsx
// Minimal, professional 3D infrastructure-style solar system
// Monochromatic + amber accent, wireframe aesthetic

import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from "three";

// System nodes - 6 core components
const NODES = [
  {
    id: "engineering",
    label: "Engineering",
    distance: 20,
    speed: 0.0008,
    startAngle: 0,
  },
  {
    id: "systems",
    label: "Systems",
    distance: 35,
    speed: 0.0006,
    startAngle: 60,
  },
  {
    id: "output",
    label: "Output",
    distance: 50,
    speed: 0.0005,
    startAngle: 120,
  },
  {
    id: "experience",
    label: "Experience",
    distance: 65,
    speed: 0.0004,
    startAngle: 180,
  },
  {
    id: "validation",
    label: "Validation",
    distance: 80,
    speed: 0.0003,
    startAngle: 240,
  },
  {
    id: "connect",
    label: "Connect",
    distance: 95,
    speed: 0.0002,
    startAngle: 300,
  },
];

// Minimal central core
function CentralCore() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0015;
      meshRef.current.rotation.x += 0.0008;
      
      // Subtle pulsing
      const scale = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 + 1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Wireframe outer shell */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[3, 24, 24]} />
        <meshBasicMaterial wireframe color="#f5f5f5" linewidth={1} />
      </mesh>

      {/* Solid core with amber glow */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[3, 24, 24]} />
        <meshStandardMaterial
          color="#1a1a1a"
          emissive="#fbbf24"
          emissiveIntensity={0.4}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Inner amber accent */}
      <mesh scale={[0.6, 0.6, 0.6]}>
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial
          color="#fbbf24"
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Central torus ring */}
      <mesh rotation={[Math.PI * 0.3, 0, 0]}>
        <torusGeometry args={[4, 0.15, 8, 48]} />
        <meshBasicMaterial color="#f5f5f5" linewidth={1} />
      </mesh>
    </group>
  );
}

// System node with minimal design
function SystemNode({ node, onClick, onHover }) {
  const meshRef = useRef();
  const orbitRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += node.speed;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.x += 0.01;

      // Hover scale effect
      const scale = hovered ? 1.4 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(scale, scale, scale),
        0.15
      );
    }
  });

  return (
    <group ref={orbitRef} rotation={[0, (node.startAngle * Math.PI) / 180, 0]}>
      <mesh
        ref={meshRef}
        position={[node.distance, 0, 0]}
        onClick={() => onClick(node.id)}
        onPointerOver={() => {
          setHovered(true);
          onHover(node.label);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
          document.body.style.cursor = "auto";
        }}
      >
        {/* Wireframe sphere */}
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial
          wireframe
          color={hovered ? "#fbbf24" : "#f5f5f5"}
          linewidth={1}
        />

        {/* Solid core */}
        <mesh scale={[0.7, 0.7, 0.7]}>
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshStandardMaterial
            color="#1a1a1a"
            emissive={hovered ? "#fbbf24" : "#666666"}
            emissiveIntensity={hovered ? 0.5 : 0.2}
            roughness={0.7}
            metalness={0.3}
          />
        </mesh>

        {/* Torus ring */}
        <mesh rotation={[Math.PI * 0.25, 0, 0]}>
          <torusGeometry args={[1.6, 0.06, 8, 24]} />
          <meshBasicMaterial
            color="#f5f5f5"
            transparent
            opacity={hovered ? 0.6 : 0.3}
          />
        </mesh>
      </mesh>

      {/* Orbit path - very subtle */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[node.distance - 0.1, node.distance + 0.1, 128]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.04}
          side={2}
        />
      </mesh>
    </group>
  );
}

// Connection lines between nodes
function ConnectionLines() {
  return (
    <>
      {NODES.map((node, i) => {
        const nextNode = NODES[(i + 1) % NODES.length];
        
        // Calculate positions
        const angle1 = (node.startAngle * Math.PI) / 180;
        const angle2 = (nextNode.startAngle * Math.PI) / 180;
        
        const x1 = Math.cos(angle1) * node.distance;
        const z1 = Math.sin(angle1) * node.distance;
        const x2 = Math.cos(angle2) * nextNode.distance;
        const z2 = Math.sin(angle2) * nextNode.distance;

        const points = [
          new THREE.Vector3(x1, 0, z1),
          new THREE.Vector3(x2, 0, z2),
        ];

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <line key={`connection-${i}`} geometry={geometry}>
            <lineBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.08}
              linewidth={1}
            />
          </line>
        );
      })}
    </>
  );
}

// Main scene
function InfrastructureScene({ onNodeClick, onHover, interactive = false }) {
  const sceneRef = useRef();

  useFrame(() => {
    // Scene rotation for background version only
    if (sceneRef.current && !interactive) {
      sceneRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <group ref={sceneRef} rotation={[-0.1, 0, 0]}>
      {/* Fog for depth */}
      <fog attach="fog" args={["#0a0a0a", 80, 200]} />

      {/* Lighting */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <pointLight
        position={[50, 50, 50]}
        intensity={0.8}
        color="#fbbf24"
      />
      <pointLight
        position={[-50, 30, 30]}
        intensity={0.3}
        color="#ffffff"
      />

      {/* Connection lines */}
      <ConnectionLines />

      {/* Central core */}
      <CentralCore />

      {/* System nodes */}
      {NODES.map((node) => (
        <SystemNode
          key={node.id}
          node={node}
          onClick={onNodeClick}
          onHover={onHover}
        />
      ))}

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={0.15}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </group>
  );
}

// Background version - fixed, low opacity, subtle
export function InfrastructureSolarSystemBG() {
  const [hoveredNode, setHoveredNode] = useState(null);

  const handleNodeClick = (nodeId) => {
    // Silent - just for visual effect, no navigation
    console.log("Node hovered:", nodeId);
  };

  return (
    <div
      className="solar-system-bg"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        opacity: 0.08,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    >
      <Canvas
        camera={{ position: [0, 60, 100], fov: 75 }}
        style={{
          background: "transparent",
        }}
        gl={{
          antialias: false,
          powerPreference: "low-power",
          alpha: true,
        }}
      >
        <Suspense fallback={null}>
          <InfrastructureScene
            onNodeClick={handleNodeClick}
            onHover={setHoveredNode}
            interactive={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Interactive full-screen version for /lab route
export function InfrastructureSolarSystemLab({ onNodeClick }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <div className="w-full h-screen relative bg-[#0a0a0a]">
      {/* Title overlay */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <h1 className="text-3xl md:text-4xl font-display font-light tracking-[0.2em] text-white/80 mb-2">
          SYSTEMS LAB
        </h1>
        <p className="text-sm text-white/40">Interactive infrastructure explorer</p>
      </div>

      {/* Node info on hover */}
      {hoveredNode && (
        <div className="absolute top-1/2 right-8 -translate-y-1/2 z-10">
          <div className="glass-card p-6 max-w-xs">
            <div className="text-base font-semibold text-amber-300 mb-2">
              {hoveredNode}
            </div>
            <p className="text-sm text-white/60">
              Click to explore this system component
            </p>
          </div>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 60, 100], fov: 75 }}
        style={{
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%)",
        }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
        }}
      >
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={80}
          maxDistance={200}
          target={[0, 0, 0]}
          autoRotate={true}
          autoRotateSpeed={0.3}
          rotateSpeed={0.8}
          zoomSpeed={0.8}
        />
        <Suspense fallback={null}>
          <InfrastructureScene
            onNodeClick={onNodeClick}
            onHover={setHoveredNode}
            interactive={true}
          />
        </Suspense>
      </Canvas>

      {/* Hint text */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <p className="text-xs text-white/40 tracking-wide text-center">
          Drag to rotate • Scroll to zoom • Click nodes to explore
        </p>
      </div>
    </div>
  );
}

// Default export for backwards compatibility
export default function InfrastructureSolarSystem({ onNodeClick }) {
  return <InfrastructureSolarSystemLab onNodeClick={onNodeClick} />;
}
