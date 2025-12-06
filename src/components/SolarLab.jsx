// src/components/SolarSystem3D.jsx
// 3D Solar System with orbiting planets using Three.js

import React, { useRef, useState, Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from '@react-three/postprocessing';

import * as THREE from "three";

const PLANETS = [
  {
    id: "about",
    label: "About",
    route: "/about",
    distance: 28,
    speed: 0.0015,
    size: 4.2,
    colors: { core: "#5A4A3A", surface: "#8B7355", glow: "#D4A853" },
    startAngle: 0,
  },
  {
    id: "timeline",
    label: "Timeline",
    route: "/timeline",
    distance: 42,
    speed: 0.0015,
    size: 3.8,
    colors: { core: "#4A2C2C", surface: "#8B3A3A", glow: "#C27D5F" },
    startAngle: 60,
  },
  {
    id: "samarth",
    label: "Samarth",
    route: "/work/samarth",
    distance: 56,
    speed: 0.0015,
    size: 4.0,
    colors: { core: "#1E3A5A", surface: "#2E5A8B", glow: "#6B9CBE" },
    startAngle: 120,
  },
  {
    id: "notes",
    label: "Elevated Notes",
    route: "/work/notes",
    distance: 70,
    speed: 0.0015,
    size: 3.9,
    colors: { core: "#3A2E4A", surface: "#5A4A7B", glow: "#9B8BAB" },
    startAngle: 180,
  },
  {
    id: "taskmanager",
    label: "Task Manager",
    route: "/work/taskmanager",
    distance: 84,
    speed: 0.0015,
    size: 3.95,
    colors: { core: "#5A3A1A", surface: "#8B5A2B", glow: "#C89566" },
    startAngle: 240,
  },
  {
    id: "miniprojects",
    label: "More Work",
    route: "/work",
    distance: 98,
    speed: 0.0015,
    size: 3.85,
    colors: { core: "#1A4A4A", surface: "#2E6B6B", glow: "#5A9B9B" },
    startAngle: 300,
  },
  {
    id: "contact",
    label: "Connect",
    route: "/contact",
    distance: 112,
    speed: 0.0015,
    size: 4.1,
    colors: { core: "#6B5A3A", surface: "#9B8B5A", glow: "#D4A853" },
    startAngle: 360,
  },
];

// Refined minimal Sun component with theme toggle
function Sun({ brightMode, setBrightMode, isDark }) {
  const meshRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      // Subtle pulsing only
      const pulse = Math.sin(clock.elapsedTime * 1.5) * 0.08 + 1;
      meshRef.current.scale.setScalar(pulse);
    }
    if (glowRef.current) {
      glowRef.current.rotation.z += 0.002;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={() => setBrightMode(!brightMode)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
        castShadow={false}
        receiveShadow={false}
      >
        <sphereGeometry args={[10, 48, 48]} />
        <meshStandardMaterial
          color={isDark ? "#D4934A" : "#F5D76E"}
          emissive={isDark ? "#B8753A" : "#E8C84D"}
          emissiveIntensity={isDark ? 0.7 : 0.6}
          roughness={isDark ? 0.75 : 0.7}
          metalness={isDark ? 0.25 : 0.3}
        />

        {/* Single refined glow layer */}
        <mesh ref={glowRef} scale={[1.5, 1.5, 1.5]}>
          <sphereGeometry args={[10, 32, 32]} />
          <meshBasicMaterial
            color={isDark ? "#FFB84D" : "#FFE8A8"}
            transparent
            opacity={isDark ? 0.2 : 0.18}
            side={2}
          />
        </mesh>
      </mesh>
    </group>
  );
}

// Custom Particle System for Light Mode Depth Effect
function ParticleField({ brightMode }) {
  const pointsRef = useRef();
  const particleCount = 2000;

  useEffect(() => {
    if (!pointsRef.current) return;

    const geometry = pointsRef.current.geometry;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 500;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 500;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 500;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  }, []);

  useFrame(() => {
    if (!pointsRef.current || !pointsRef.current.geometry) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const speed = brightMode ? 0.2 : 0.08;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] -= speed;
      if (positions[i + 2] < -250) {
        positions[i + 2] = 250;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        size={brightMode ? 1.2 : 0.6}
        color={brightMode ? "#2A2A2A" : "#E0E0E0"}
        sizeAttenuation={true}
        transparent={true}
        opacity={brightMode ? 0.7 : 0.9}
        fog={true}
      />
    </points>
  );
}

// Refined minimal Planet component
function Planet({ planet, onClick, onHover, _brightMode }) {
  const meshRef = useRef();
  const orbitRef = useRef();
  const glowRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const baseSize = planet.size || 1.8;

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

  useFrame(({ clock }) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += planet.speed;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x += 0.005;
      const scale = hovered ? 1.4 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.12);
    }
    if (glowRef.current) {
      // Subtle breathing glow
      const breathe = Math.sin(clock.elapsedTime * 1.5) * 0.05 + 1;
      glowRef.current.scale.setScalar(1.25 * breathe);
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh
        ref={meshRef}
        position={[planet.distance, 0, 0]}
        onClick={() => {
          setClicked(true);
          setTimeout(() => {
            onClick(planet.id);
            setClicked(false);
          }, 200);
        }}
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
        <sphereGeometry args={[baseSize, 48, 48]} />
        <meshStandardMaterial
          color={colors.surface}
          roughness={0.4}
          metalness={0.6}
          emissive={colors.core}
          emissiveIntensity={hovered ? 0.5 : 0.25}
        />

        {/* Single refined glow layer */}
        <mesh ref={glowRef} scale={[1.25, 1.25, 1.25]}>
          <sphereGeometry args={[baseSize, 32, 32]} />
          <meshBasicMaterial
            color={colors.glow}
            transparent
            opacity={hovered ? 0.2 : 0.12}
            side={2}
          />
        </mesh>

        {/* Rings for project planets */}
        {["samarth", "notes", "taskmanager"].includes(planet.id) && (
          <>
            <mesh rotation={[Math.PI / 2 + 0.25, 0, 0]}>
              <ringGeometry args={[baseSize * 1.6, baseSize * 2.2, 64]} />
              <meshBasicMaterial
                color={colors.surface}
                transparent
                opacity={hovered ? 0.3 : 0.15}
                side={2}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2 + 0.2, 0, 0]}>
              <ringGeometry args={[baseSize * 2.4, baseSize * 2.9, 32]} />
              <meshBasicMaterial
                color={colors.glow}
                transparent
                opacity={hovered ? 0.15 : 0.08}
                side={2}
              />
            </mesh>
          </>
        )}
      </mesh>
    </group>
  );
}

// 3D Scene with dynamic lighting
function SolarSystemScene({ onPlanetClick, onHover, brightMode, onSunClick }) {
  const sunLightRef = useRef();
  const ambientRef = useRef();
  const sceneRef = useRef();

  // Animate lighting changes and system rotation
  useFrame(({ clock }) => {
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
    // Slow rotation of entire solar system
    if (sceneRef.current) {
      sceneRef.current.rotation.y += 0.0002;
      sceneRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.1) * 0.08 - 0.3;
    }
  });

  return (
    <group ref={sceneRef} rotation={[-0.3, 0, 0]}>
      <fog attach="fog" args={[brightMode ? "#F5F1E8" : "#0a0a0a", 120, 250]} />
      <ambientLight ref={ambientRef} intensity={0.3} color="#fbbf24" />
      <pointLight
        ref={sunLightRef}
        position={[0, 0, 0]}
        intensity={2.5}
        color="#fbbf24"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight
        position={[40, 40, 40]}
        intensity={brightMode ? 0.2 : 0.5}
        color="#fbbf24"
      />
      <pointLight
        position={[-40, 30, 60]}
        intensity={brightMode ? 0.1 : 0.3}
        color="#f59e0b"
      />
      <pointLight
        position={[0, -30, 30]}
        intensity={brightMode ? 0.1 : 0.2}
        color="#d97706"
      />
      {/* Orbit rings */}
      {PLANETS.map((planet) => {
        const opacity = Math.max(0.08, 0.25 - planet.distance / 500);
        return (
          <mesh key={`orbit-${planet.id}`} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry
              args={[planet.distance - 0.8, planet.distance + 0.8, 128]}
            />
            <meshBasicMaterial
              color={brightMode ? "#1A1A1A" : "#E8E8E8"}
              transparent
              opacity={brightMode ? opacity * 0.8 : opacity}
              side={2}
            />
          </mesh>
        );
      })}
      <Sun
        brightMode={brightMode}
        setBrightMode={onSunClick}
        isDark={!brightMode}
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
      {/* Particle field with depth effect */}
      <ParticleField brightMode={brightMode} />
      <EffectComposer>
        <Bloom
          intensity={0.2}
          luminanceThreshold={0.4}
          luminanceSmoothing={0.8}
        />
      </EffectComposer>
    </group>
  );
}

// Mobile-optimized 3D Solar System Scene
function MobileSolarSystemScene({ onPlanetClick, onHover, brightMode, onSunClick }) {
  const sunLightRef = useRef();
  const ambientRef = useRef();
  const sceneRef = useRef();

  useFrame(({ clock }) => {
    if (sunLightRef.current) {
      const targetIntensity = brightMode ? 6 : 2.5;
      sunLightRef.current.intensity += (targetIntensity - sunLightRef.current.intensity) * 0.05;
    }
    if (ambientRef.current) {
      const targetIntensity = brightMode ? 0.2 : 0.5;
      ambientRef.current.intensity += (targetIntensity - ambientRef.current.intensity) * 0.05;
    }
    // Slow rotation of entire solar system
    if (sceneRef.current) {
      sceneRef.current.rotation.y += 0.0002;
      sceneRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.1) * 0.08 - 0.2;
    }
  });

  // Mobile-scaled planets (closer distances, smaller sizes)
  const mobilePlanets = PLANETS.map(planet => ({
    ...planet,
    distance: planet.distance * 0.6, // Bring planets closer
    speed: planet.speed * 1.5 // Faster rotation for mobile
  }));

  return (
    <group ref={sceneRef} rotation={[-0.2, 0, 0]}>
      <fog attach="fog" args={[brightMode ? "#F5F1E8" : "#0a0a0a", 60, 120]} />
      <ambientLight ref={ambientRef} intensity={0.5} />
      <pointLight
        ref={sunLightRef}
        position={[0, 0, 0]}
        intensity={2.5}
        color="#f5c36b"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[20, 20, 20]} intensity={0.4} color="#ffffff" />
      <pointLight position={[-20, 15, 30]} intensity={0.3} color="#4a90e2" />
      
      {/* Mobile orbit rings */}
      {mobilePlanets.map((planet) => {
        const opacity = Math.max(0.08, 0.25 - planet.distance / 500);
        return (
          <mesh key={`orbit-${planet.id}`} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planet.distance - 0.8, planet.distance + 0.8, 64]} />
            <meshBasicMaterial color={brightMode ? "#1A1A1A" : "#E8E8E8"} transparent opacity={brightMode ? opacity * 0.8 : opacity} side={2} />
          </mesh>
        );
      })}
      
      {/* Mobile-scaled Sun */}
      <Sun brightMode={brightMode} setBrightMode={onSunClick} isDark={!brightMode} />
      
      {/* Mobile-scaled Planets */}
      {mobilePlanets.map((planet) => (
        <Planet
          key={planet.id}
          planet={planet}
          onClick={onPlanetClick}
          onHover={onHover}
          brightMode={brightMode}
        />
      ))}
      
      <ParticleField brightMode={brightMode} />
    </group>
  );
}

export default function SolarLab({ onBrightModeChange }) {
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [brightMode, setBrightMode] = useState(false);
  const navigate = useNavigate();
  const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const handleThemeToggle = () => {
    const newBrightMode = !brightMode;
    setBrightMode(newBrightMode);
    if (onBrightModeChange) {
      onBrightModeChange(newBrightMode);
    }
    console.log("Lab theme toggled to:", newBrightMode ? "LIGHT" : "DARK");
  };

  const handlePlanetClick = (planetId) => {
    const routeMap = {
      about: "/about",
      timeline: "/timeline",
      samarth: "/work/samarth",
      notes: "/work/notes",
      taskmanager: "/work/taskmanager",
      miniprojects: "/work",
      contact: "/contact",
    };
    const route = routeMap[planetId];
    if (route) navigate(route);
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only use 2D fallback for reduced motion preference
  if (prefersReduced) {
    return (
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-amber-300 mb-4">Navigation</h3>
          <button
              onClick={() => handlePlanetClick("about")}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 mb-8 mx-auto flex items-center justify-center text-black font-bold hover:scale-105 transition-transform"
            >
              NS
            </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {PLANETS.map((planet) => (
            <button
              key={planet.id}
              onClick={() => handlePlanetClick(planet.id)}
              className="relative group p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full mx-auto mb-2" style={{ backgroundColor: planet.colors.surface }} />
              <span className="text-sm text-gray-300">{planet.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="w-full py-8">
        <div className="max-w-sm mx-auto px-4">
          {/* Sleek glass box container */}
          <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden">
            {/* Subtle glass effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none" />
            
            {/* Mobile Solar System - No text, just the 3D scene */}
            <div className="h-80 relative">
              <Canvas
                camera={{ position: [0, 40, 80], fov: 60 }}
                style={{ background: "transparent" }}
                gl={{ antialias: false, powerPreference: 'low-power', alpha: true }}
              >
                <OrbitControls
                  enablePan={false}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={60}
                  maxDistance={120}
                  target={[0, -5, 0]}
                  autoRotate={false}
                  rotateSpeed={0.3}
                  zoomSpeed={0.5}
                />
                <Suspense fallback={null}>
                           <MobileSolarSystemScene onPlanetClick={handlePlanetClick} onHover={setHoveredPlanet} brightMode={brightMode} onSunClick={handleThemeToggle} />
                          </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full relative h-screen`}>
      {/* Depth layering background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-slate-900/10 to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-900/5 to-transparent pointer-events-none" />
      
      {/* Floating minimalist frame */}
      <div className="absolute inset-4 border border-white/5 rounded-2xl pointer-events-none">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-amber-400/20 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-amber-400/20 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-amber-400/20 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-amber-400/20 rounded-br-lg" />
      </div>
      
      {/* Premium minimal hover label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <h3 className={`text-sm font-light tracking-[0.25em] mb-6 ${brightMode ? 'text-[#2A2A2A]' : 'text-[var(--color-text-secondary)]'}`}>
          EXPLORE
        </h3>
        {hoveredPlanet && (
          <div className="mt-4 animate-fade-in">
            <div className={`inline-block glass-card px-5 py-2.5 border-[var(--color-border)] ${brightMode ? 'bg-white/10 border-[#1A1A1A]/30' : ''}`}>
              <span className={`text-sm font-medium tracking-[0.05em] ${brightMode ? 'text-[#1A1A1A]' : 'text-[var(--color-accent)]'}`}>
                {hoveredPlanet}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Zoom hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className={`text-xs tracking-[0.08em] font-light ${brightMode ? 'text-[#3A3A3A]' : 'text-[var(--color-text-muted)]'}`}>
          Scroll to explore • Drag to rotate
        </div>
      </div>

      <Canvas
        camera={{ position: [0, 60, 85], fov: 60 }}
        style={{ 
          background: brightMode ? "#F5F1E8" : "#0a0a0b",
          cursor: 'auto'
        }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={100}
          maxDistance={300}
          target={[0, 0, 0]}
          autoRotate={false}
          maxPolarAngle={Math.PI * 0.9}
          minPolarAngle={Math.PI * 0.1}
          rotateSpeed={1}
          zoomSpeed={1}
        />
        <Suspense fallback={null}>
          <SolarSystemScene onPlanetClick={handlePlanetClick} onHover={setHoveredPlanet} brightMode={brightMode} onSunClick={handleThemeToggle} />
        </Suspense>
      </Canvas>
    </div>
  );
}
