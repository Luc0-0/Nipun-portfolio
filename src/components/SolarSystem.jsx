// src/components/SolarSystem.jsx
// 3D Solar System with orbiting planets using Three.js

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

const PLANETS = [
  { id: "about", label: "About", distance: 4, speed: 0.01, color: "#f5c36b" },
  {
    id: "ongoing",
    label: "Research",
    distance: 5.5,
    speed: 0.008,
    color: "#4a90e2",
  },
  {
    id: "ai-skills",
    label: "AI Skills",
    distance: 7,
    speed: 0.007,
    color: "#e74c3c",
  },
  {
    id: "web-skills",
    label: "Web Dev",
    distance: 8.5,
    speed: 0.006,
    color: "#2ecc71",
  },
  {
    id: "project1",
    label: "Project 1",
    distance: 10,
    speed: 0.005,
    color: "#9b59b6",
  },
  {
    id: "project2",
    label: "Project 2",
    distance: 11.5,
    speed: 0.004,
    color: "#f39c12",
  },
  {
    id: "project3",
    label: "Project 3",
    distance: 13,
    speed: 0.003,
    color: "#1abc9c",
  },
  {
    id: "miniprojects",
    label: "Mini Projects",
    distance: 14.5,
    speed: 0.002,
    color: "#e67e22",
  },
  {
    id: "services",
    label: "Services",
    distance: 16,
    speed: 0.001,
    color: "#34495e",
  },
  {
    id: "contact",
    label: "Contact",
    distance: 17.5,
    speed: 0.0008,
    color: "#c0392b",
  },
];

// Sun component (center)
function Sun({ onClick }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} onClick={() => onClick("about")} position={[0, 0, 0]}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial
        color="#f5c36b"
        emissive="#f5c36b"
        emissiveIntensity={0.3}
      />
      <Html distanceFactor={8} position={[0, -2, 0]}>
        <div className="text-sm text-gold-300 text-center font-semibold pointer-events-none">
          Nipun
        </div>
      </Html>
    </mesh>
  );
}

// Planet component
function Planet({ planet, onClick, onHover }) {
  const meshRef = useRef();
  const orbitRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += planet.speed;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      const scale = hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh
        ref={meshRef}
        position={[planet.distance, 0, 0]}
        onClick={() => onClick(planet.id)}
        onPointerOver={() => {
          setHovered(true);
          onHover(planet.label);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <sphereGeometry args={[0.6, 20, 20]} />
        <meshStandardMaterial color={planet.color} />
        <Html distanceFactor={12} position={[0, -1.2, 0]}>
          <div className="text-xs text-white bg-black/70 px-2 py-1 rounded font-medium pointer-events-none whitespace-nowrap">
            {planet.label}
          </div>
        </Html>
      </mesh>
    </group>
  );
}

// Orbit rings
function OrbitRings() {
  return (
    <>
      {PLANETS.map((planet, i) => {
        const points = [];
        for (let j = 0; j <= 64; j++) {
          const angle = (j / 64) * Math.PI * 2;
          points.push(
            new THREE.Vector3(
              Math.cos(angle) * planet.distance,
              0,
              Math.sin(angle) * planet.distance
            )
          );
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial color="#ffffff" opacity={0.1} transparent />
          </line>
        );
      })}
    </>
  );
}

// 3D Scene
function SolarSystemScene({ onPlanetClick, onHover }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={1} color="#f5c36b" />
      <pointLight position={[10, 10, 10]} intensity={0.5} />

      <OrbitRings />
      <Sun onClick={onPlanetClick} />

      {PLANETS.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          onClick={onPlanetClick}
          onHover={onHover}
        />
      ))}
    </>
  );
}

// Mobile fallback
function MobileSolarSystem({ onPlanetClick }) {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gold-300 mb-4">Navigation</h3>

        {/* Sun */}
        <button
          onClick={() => onPlanetClick("about")}
          className="w-20 h-20 rounded-full bg-gradient-to-r from-gold-400 to-gold-600 mb-8 mx-auto flex items-center justify-center text-galaxy-900 font-bold hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-gold-500"
        >
          NS
        </button>
      </div>

      {/* Planets grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {PLANETS.map((planet) => (
          <button
            key={planet.id}
            onClick={() => onPlanetClick(planet.id)}
            className="relative group p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold-500"
          >
            <div
              className="w-12 h-12 rounded-full mx-auto mb-2"
              style={{ backgroundColor: planet.color }}
            />
            <span className="text-sm text-gray-300">{planet.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SolarSystem({ onPlanetClick }) {
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isMobile || prefersReduced) {
    return <MobileSolarSystem onPlanetClick={onPlanetClick} />;
  }

  return (
    <div className="w-full h-[700px] relative">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center">
        <h3 className="text-2xl font-bold text-gold-300 mb-2">Solar System</h3>
        <p className="text-sm text-gray-400">
          Click planets to navigate • Hover for details
        </p>
        {hoveredPlanet && (
          <p className="text-sm text-gold-300 mt-2 font-medium">
            {hoveredPlanet}
          </p>
        )}
      </div>

      <Canvas
        camera={{ position: [0, 15, 30], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SolarSystemScene
            onPlanetClick={onPlanetClick}
            onHover={setHoveredPlanet}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
