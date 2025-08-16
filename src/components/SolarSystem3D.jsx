// src/components/SolarSystem3D.jsx
// 3D Solar System with orbiting planets using Three.js

import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

const PLANETS = [
  {
    id: "about",
    label: "About",
    distance: 25,
    speed: 0.002,
    colors: { core: "#8B4513", surface: "#CD853F", glow: "#DEB887" }, // Earth-like brown
    startAngle: 0,
  },
  {
    id: "ongoing",
    label: "Research",
    distance: 35,
    speed: 0.002,
    colors: { core: "#B22222", surface: "#DC143C", glow: "#F08080" }, // Mars-like red
    startAngle: 36,
  },
  {
    id: "ai-skills",
    label: "AI Skills",
    distance: 45,
    speed: 0.002,
    colors: { core: "#4169E1", surface: "#6495ED", glow: "#87CEEB" }, // Neptune-like blue
    startAngle: 72,
  },
  {
    id: "web-skills",
    label: "Web Dev",
    distance: 55,
    speed: 0.002,
    colors: { core: "#228B22", surface: "#32CD32", glow: "#90EE90" }, // Venus-like green
    startAngle: 108,
  },
  {
    id: "project1",
    label: "Project 1",
    distance: 65,
    speed: 0.002,
    colors: { core: "#8A2BE2", surface: "#9370DB", glow: "#DDA0DD" }, // Jupiter-like purple
    startAngle: 144,
  },
  {
    id: "project2",
    label: "Project 2",
    distance: 75,
    speed: 0.002,
    colors: { core: "#FF8C00", surface: "#FFA500", glow: "#FFD700" }, // Saturn-like orange
    startAngle: 180,
  },
  {
    id: "project3",
    label: "Project 3",
    distance: 85,
    speed: 0.002,
    colors: { core: "#20B2AA", surface: "#48D1CC", glow: "#AFEEEE" }, // Uranus-like teal
    startAngle: 216,
  },
  {
    id: "miniprojects",
    label: "Mini Projects",
    distance: 95,
    speed: 0.002,
    colors: { core: "#FF7F50", surface: "#FF6347", glow: "#FFA07A" }, // Mercury-like coral
    startAngle: 252,
  },
  {
    id: "services",
    label: "Services",
    distance: 105,
    speed: 0.002,
    colors: { core: "#2F4F4F", surface: "#708090", glow: "#B0C4DE" }, // Pluto-like gray
    startAngle: 288,
  },
  {
    id: "contact",
    label: "Contact",
    distance: 115,
    speed: 0.002,
    colors: { core: "#800080", surface: "#9932CC", glow: "#DA70D6" }, // Exotic purple
    startAngle: 324,
  },
];

// Enhanced Sun component with realistic gradient and motion
function Sun({ onClick, brightMode, setBrightMode }) {
  const meshRef = useRef();
  const coronaRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
      // Realistic pulsing with solar flare simulation
      if (brightMode) {
        const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.15 + 1;
        const flare = Math.sin(state.clock.elapsedTime * 0.5) * 0.05 + 1;
        meshRef.current.scale.setScalar(pulse * flare);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.y -= 0.003;
      coronaRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={() => {
          setBrightMode(!brightMode);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
        castShadow={false}
        receiveShadow={false}
      >
        <sphereGeometry args={[8, 64, 64]} />
        <meshStandardMaterial
          color={brightMode ? "#FFA500" : "#FF6B35"}
          emissive={brightMode ? "#FFD700" : "#FF4500"}
          emissiveIntensity={brightMode ? 1.5 : 1.0}
          roughness={0.9}
          metalness={0.1}
        />

        {/* Multi-layered corona with realistic gradient */}
        <mesh ref={coronaRef} scale={[1.3, 1.3, 1.3]}>
          <sphereGeometry args={[8, 32, 32]} />
          <meshBasicMaterial
            color={brightMode ? "#FFD700" : "#FF8C00"}
            transparent
            opacity={brightMode ? 0.4 : 0.25}
            side={2}
          />
        </mesh>
        <mesh scale={[1.6, 1.6, 1.6]}>
          <sphereGeometry args={[8, 24, 24]} />
          <meshBasicMaterial
            color={brightMode ? "#FFFF00" : "#FFA500"}
            transparent
            opacity={brightMode ? 0.25 : 0.15}
            side={2}
          />
        </mesh>
        <mesh scale={[2.0, 2.0, 2.0]}>
          <sphereGeometry args={[8, 16, 16]} />
          <meshBasicMaterial
            color={brightMode ? "#FFFFFF" : "#FFD700"}
            transparent
            opacity={brightMode ? 0.15 : 0.08}
            side={2}
          />
        </mesh>

        {/* Solar flares for bright mode */}
        {brightMode && (
          <>
            <mesh scale={[2.8, 2.8, 2.8]}>
              <sphereGeometry args={[8, 12, 12]} />
              <meshBasicMaterial
                color="#FFFFFF"
                transparent
                opacity={0.1}
                side={2}
              />
            </mesh>
            <mesh scale={[3.5, 3.5, 3.5]}>
              <sphereGeometry args={[8, 8, 8]} />
              <meshBasicMaterial
                color="#FFFACD"
                transparent
                opacity={0.05}
                side={2}
              />
            </mesh>
          </>
        )}
      </mesh>

      {/* Enhanced lighting toggle hint with motion */}
      {hovered && (
        <Html distanceFactor={3} position={[0, 12, 0]}>
          <div className="text-sm text-white bg-gradient-to-r from-black/80 to-gray-800/80 px-4 py-2 rounded-full pointer-events-none border border-amber-400/30">
            <span className="animate-pulse">
              {brightMode ? "Solar Flare Mode" : "Click for Solar Power"}
            </span>
          </div>
        </Html>
      )}
    </group>
  );
}

// Enhanced Planet component with realistic gradients and motion
function Planet({ planet, onClick, onHover, brightMode }) {
  const meshRef = useRef();
  const orbitRef = useRef();
  const atmosphereRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Calculate size based on distance (closer = larger)
  const baseSize = Math.max(2, 6 - planet.distance / 25);

  // Realistic planet colors with gradients
  const planetColors = {
    "#f5c36b": { base: "#D2691E", emissive: "#CD853F", atmosphere: "#F4A460" }, // Sandy brown
    "#4a90e2": { base: "#4169E1", emissive: "#1E90FF", atmosphere: "#87CEEB" }, // Royal blue
    "#e74c3c": { base: "#DC143C", emissive: "#FF6347", atmosphere: "#FFA07A" }, // Crimson
    "#2ecc71": { base: "#228B22", emissive: "#32CD32", atmosphere: "#90EE90" }, // Forest green
    "#9b59b6": { base: "#8A2BE2", emissive: "#9370DB", atmosphere: "#DDA0DD" }, // Blue violet
    "#f39c12": { base: "#FF8C00", emissive: "#FFA500", atmosphere: "#FFD700" }, // Dark orange
    "#1abc9c": { base: "#20B2AA", emissive: "#48D1CC", atmosphere: "#AFEEEE" }, // Light sea green
    "#e67e22": { base: "#FF7F50", emissive: "#FF6347", atmosphere: "#FFA07A" }, // Coral
    "#34495e": { base: "#2F4F4F", emissive: "#708090", atmosphere: "#B0C4DE" }, // Dark slate gray
    "#c0392b": { base: "#B22222", emissive: "#DC143C", atmosphere: "#F08080" }, // Fire brick
  };

  const colors = planet.colors;

  // Set initial rotation based on startAngle
  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y = (planet.startAngle * Math.PI) / 180;
    }
  }, [planet.startAngle]);

  useFrame((state) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += planet.speed;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
      const scale = hovered ? 1.4 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= 0.005;
      const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.05 + 1;
      atmosphereRef.current.scale.setScalar(1.3 * breathe);
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
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
          document.body.style.cursor = "auto";
        }}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[baseSize, 64, 64]} />
        <meshStandardMaterial
          color={colors.surface}
          roughness={0.7}
          metalness={0.2}
          emissive={colors.core}
          emissiveIntensity={0.15}
        />
        
        {/* Inner core gradient */}
        <mesh scale={[0.6, 0.6, 0.6]}>
          <sphereGeometry args={[baseSize, 32, 32]} />
          <meshStandardMaterial
            color={colors.core}
            emissive={colors.core}
            emissiveIntensity={0.3}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Subtle planet atmosphere */}
        <mesh ref={atmosphereRef} scale={[1.3, 1.3, 1.3]}>
          <sphereGeometry args={[baseSize, 32, 32]} />
          <meshBasicMaterial
            color={colors.glow}
            transparent
            opacity={0.12}
            side={2}
          />
        </mesh>

        {/* Rings for select planets */}
        {["project1", "project2", "project3", "services"].includes(planet.id) && (
          <>
            <mesh rotation={[Math.PI / 2 + 0.2, 0, 0]}>
              <ringGeometry args={[baseSize * 1.5, baseSize * 2.2, 64]} />
              <meshBasicMaterial
                color={colors.surface}
                transparent
                opacity={0.4}
                side={2}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2 + 0.15, 0, 0]}>
              <ringGeometry args={[baseSize * 2.3, baseSize * 2.8, 32]} />
              <meshBasicMaterial
                color={colors.glow}
                transparent
                opacity={0.2}
                side={2}
              />
            </mesh>
          </>
        )}

        <Html distanceFactor={2} position={[0, -(baseSize + 3), 0]}>
          <div
            className={`text-lg font-bold pointer-events-none whitespace-nowrap shadow-md border px-4 py-2 rounded-xl transition-all duration-300 ${
              brightMode
                ? "text-gray-800 bg-gradient-to-r from-white/95 to-gray-100/95 border-amber-400"
                : "text-white bg-gradient-to-r from-black/95 to-gray-900/95 border-amber-400/50"
            }`}
          >
            <span
              className={`font-extrabold ${hovered ? "animate-pulse" : ""}`}
              style={{ color: colors.surface }}
            >
              {planet.label}
            </span>
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

// 3D Scene with dynamic lighting
function SolarSystemScene({ onPlanetClick, onHover }) {
  const [brightMode, setBrightMode] = useState(false);
  const sunLightRef = useRef();
  const ambientRef = useRef();

  // Animate lighting changes
  useFrame(() => {
    if (sunLightRef.current) {
      const targetIntensity = brightMode ? 8 : 3;
      sunLightRef.current.intensity +=
        (targetIntensity - sunLightRef.current.intensity) * 0.05;
    }
    if (ambientRef.current) {
      const targetIntensity = brightMode ? 0.1 : 0.4;
      ambientRef.current.intensity +=
        (targetIntensity - ambientRef.current.intensity) * 0.05;
    }
  });

  return (
    <group rotation={[-0.3, 0, 0]}>
      {" "}
      {/* Tilt backward by ~17 degrees */}
      <fog attach="fog" args={["#0a0a0a", 120, 250]} />
      <ambientLight ref={ambientRef} intensity={0.4} />
      <pointLight
        ref={sunLightRef}
        position={[0, 0, 0]}
        intensity={3}
        color="#f5c36b"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight
        position={[40, 40, 40]}
        intensity={brightMode ? 0.3 : 0.8}
        color="#ffffff"
      />
      <pointLight
        position={[-40, 30, 60]}
        intensity={brightMode ? 0.2 : 0.6}
        color="#4a90e2"
      />
      <pointLight
        position={[0, -30, 30]}
        intensity={brightMode ? 0.1 : 0.4}
        color="#8a2be2"
      />
      {/* Orbit rings */}
      {PLANETS.map((planet) => {
        const opacity = Math.max(0.05, 0.3 - planet.distance / 400);
        return (
          <mesh key={`orbit-${planet.id}`} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry
              args={[planet.distance - 0.5, planet.distance + 0.5, 128]}
            />
            <meshBasicMaterial
              color={planet.color}
              transparent
              opacity={opacity}
              side={2}
            />
          </mesh>
        );
      })}
      <OrbitRings />
      <Sun
        onClick={onPlanetClick}
        brightMode={brightMode}
        setBrightMode={setBrightMode}
      />
      {PLANETS.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          onClick={onPlanetClick}
          onHover={onHover}
          brightMode={brightMode}
        />
      ))}
      {/* Stars background */}
      <Stars />
    </group>
  );
}

export default function SolarSystem3D({ onPlanetClick }) {
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Use 2D fallback for mobile or reduced motion
  if (isMobile || prefersReduced) {
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

  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-center">
        <h3 className="text-3xl font-bold mb-2">
          <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
            Solar System
          </span>
        </h3>
        <p className="text-sm text-gray-300 animate-fade-in">
          Click planets to navigate • Drag to rotate • Scroll to zoom
        </p>
        {hoveredPlanet && (
          <p className="text-lg mt-3 font-bold animate-pulse">
            <span className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
              {hoveredPlanet}
            </span>
          </p>
        )}

        {/* Animated instruction text */}
        <div
          className="mt-4 text-xs text-gray-400 animate-fade-in"
          style={{ animationDelay: "2s" }}
        >
          <span className="inline-block">Explore the digital universe</span>
        </div>
      </div>

      <Canvas
        camera={{ position: [0, 50, 80], fov: 75 }}
        style={{ background: "linear-gradient(to bottom, #000011, #000033)" }}
      >
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={40}
          maxDistance={200}
          target={[0, -5, 0]}
          autoRotate={false}
          maxPolarAngle={Math.PI * 0.8}
          minPolarAngle={Math.PI * 0.1}
        />
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
