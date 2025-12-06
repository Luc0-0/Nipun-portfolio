// src/components/SolarSystem.jsx
// 3D Solar System with orbiting planets using Three.js

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from '../contexts/useTheme'";

const PLANETS = [
  { id: "about", label: "About", distance: 4, speed: 0.01 },
  {
    id: "ongoing",
    label: "Research",
    distance: 5.5,
    speed: 0.008,
  },
  {
    id: "ai-skills",
    label: "AI Skills",
    distance: 7,
    speed: 0.007,
  },
  {
    id: "web-skills",
    label: "Web Dev",
    distance: 8.5,
    speed: 0.006,
  },
  {
    id: "project1",
    label: "Project 1",
    distance: 10,
    speed: 0.005,
  },
  {
    id: "project2",
    label: "Project 2",
    distance: 11.5,
    speed: 0.004,
  },
  {
    id: "project3",
    label: "Project 3",
    distance: 13,
    speed: 0.003,
  },
  {
    id: "miniprojects",
    label: "Mini Projects",
    distance: 14.5,
    speed: 0.002,
  },
  {
    id: "services",
    label: "Services",
    distance: 16,
    speed: 0.001,
  },
  {
    id: "contact",
    label: "Contact",
    distance: 17.5,
    speed: 0.0008,
  },
];

// Sun component (center)
function Sun({ onClick, isDark }) {
  const meshRef = useRef();
  const sunColor = "#a8a8a8"; // grey
  const shadowColor = isDark ? "#2a2a2a" : "#e8e8e8"; // dark grey in dark theme, light grey in light theme

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} onClick={() => onClick("about")} position={[0, 0, 0]}>
      <sphereGeometry args={[1.8, 32, 32]} />
      <meshStandardMaterial
        color={sunColor}
        emissive={isDark ? "#3a3a3a" : "#888888"}
        emissiveIntensity={0.1}
      />
      <Html distanceFactor={8} position={[0, -2.5, 0]}>
        <div className="text-sm text-gray-300 text-center font-semibold pointer-events-none">
          Nipun
        </div>
      </Html>
    </mesh>
  );
}

// Planet component
function Planet({ planet, onClick, onHover, isDark }) {
  const meshRef = useRef();
  const orbitRef = useRef();
  const [hovered, setHovered] = useState(false);
  const planetColor = isDark ? "#ffffff" : "#000000"; // white in dark theme, black in light theme

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
        <meshStandardMaterial 
          color={planetColor}
          emissive={isDark ? "#333333" : "#d0d0d0"}
          emissiveIntensity={0.05}
        />
        <Html distanceFactor={12} position={[0, -1.2, 0]}>
          <div className={`text-xs px-2 py-1 rounded font-medium pointer-events-none whitespace-nowrap ${
            isDark ? 'text-white bg-black/70' : 'text-black bg-white/70'
          }`}>
            {planet.label}
          </div>
        </Html>
      </mesh>
    </group>
  );
}

// Orbit rings
function OrbitRings({ isDark }) {
  const orbitColor = isDark ? "#ffffff" : "#000000"; // white in dark, black in light
  const orbitOpacity = isDark ? 0.3 : 0.4; // slightly more visible in light theme

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
            <lineBasicMaterial color={orbitColor} opacity={orbitOpacity} transparent />
          </line>
        );
      })}
    </>
  );
}

// 3D Scene
function SolarSystemScene({ onPlanetClick, onHover, isDark }) {
  const lightColor = isDark ? "#a8a8a8" : "#c0c0c0";
  const lightIntensity = isDark ? 0.3 : 0.35;

  return (
    <>
      <ambientLight intensity={lightIntensity} />
      <pointLight position={[0, 0, 0]} intensity={0.5} color={lightColor} />
      <pointLight position={[10, 10, 10]} intensity={0.2} />

      <OrbitRings isDark={isDark} />
      <Sun onClick={onPlanetClick} isDark={isDark} />

      {PLANETS.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          onClick={onPlanetClick}
          onHover={onHover}
          isDark={isDark}
        />
      ))}
    </>
  );
}

// Mobile fallback
function MobileSolarSystem({ onPlanetClick, isDark }) {
  const sunBg = isDark ? 'bg-gray-500' : 'bg-gray-400';
  const sunText = isDark ? 'text-white' : 'text-black';
  const planetColor = isDark ? '#ffffff' : '#000000';
  const bgClass = isDark ? 'bg-black/5 border-white/10' : 'bg-white/10 border-black/10';
  const textClass = isDark ? 'text-gray-300' : 'text-gray-700';

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="text-center mb-8">
        <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Navigation</h3>

        {/* Sun */}
        <button
          onClick={() => onPlanetClick("about")}
          className={`w-20 h-20 rounded-full mb-8 mx-auto flex items-center justify-center font-bold hover:scale-105 transition-transform focus:outline-none ${sunBg} ${sunText}`}
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
            className={`relative group p-4 border rounded-lg hover:opacity-80 transition-all duration-300 focus:outline-none ${bgClass}`}
          >
            <div
              className="w-12 h-12 rounded-full mx-auto mb-2"
              style={{ backgroundColor: planetColor }}
            />
            <span className={`text-sm ${textClass}`}>{planet.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function SolarSystem({ onPlanetClick }) {
  const { isDark } = useTheme();
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isMobile || prefersReduced) {
    return <MobileSolarSystem onPlanetClick={onPlanetClick} isDark={isDark} />;
  }

  return (
    <div className="w-full h-[700px] relative">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center">
        <h3 className={`text-2xl font-bold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Solar System</h3>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Click planets to navigate • Hover for details
        </p>
        {hoveredPlanet && (
          <p className={`text-sm mt-2 font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
            isDark={isDark}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
