// src/components/SolarSystem3D.jsx
// 3D Solar System with orbiting planets using Three.js

import React, { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from "three";

const PLANETS = [
  {
    id: "about",
    label: "About Me",
    distance: 25,
    speed: 0.002,
    colors: { core: "#8B4513", surface: "#CD853F", glow: "#DEB887" },
    startAngle: 0,
  },
  {
    id: "ongoing",
    label: "Current Studies",
    distance: 35,
    speed: 0.002,
    colors: { core: "#B22222", surface: "#DC143C", glow: "#F08080" },
    startAngle: 36,
  },
  {
    id: "ai-skills",
    label: "AI Developer",
    distance: 45,
    speed: 0.002,
    colors: { core: "#4169E1", surface: "#6495ED", glow: "#87CEEB" },
    startAngle: 72,
  },
  {
    id: "web-skills",
    label: "Full Stack",
    distance: 55,
    speed: 0.002,
    colors: { core: "#228B22", surface: "#32CD32", glow: "#90EE90" },
    startAngle: 108,
  },
  {
    id: "project1",
    label: "Academic",
    distance: 65,
    speed: 0.002,
    colors: { core: "#8A2BE2", surface: "#9370DB", glow: "#DDA0DD" },
    startAngle: 144,
  },
  {
    id: "project2",
    label: "Data Analyst",
    distance: 75,
    speed: 0.002,
    colors: { core: "#FF8C00", surface: "#FFA500", glow: "#FFD700" },
    startAngle: 180,
  },
  {
    id: "project3",
    label: "ML Projects",
    distance: 85,
    speed: 0.002,
    colors: { core: "#20B2AA", surface: "#48D1CC", glow: "#AFEEEE" },
    startAngle: 216,
  },
  {
    id: "miniprojects",
    label: "Mini Projects",
    distance: 95,
    speed: 0.002,
    colors: { core: "#FF7F50", surface: "#FF6347", glow: "#FFA07A" },
    startAngle: 252,
  },
  {
    id: "services",
    label: "Future Goals",
    distance: 105,
    speed: 0.002,
    colors: { core: "#2F4F4F", surface: "#708090", glow: "#B0C4DE" },
    startAngle: 288,
  },
  {
    id: "contact",
    label: "Connect",
    distance: 115,
    speed: 0.002,
    colors: { core: "#800080", surface: "#9932CC", glow: "#DA70D6" },
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

      {/* Removed tooltip for cleaner look */}
    </group>
  );
}

// Enhanced Planet component with realistic gradients and motion
function Planet({ planet, onClick, onHover, brightMode }) {
  const meshRef = useRef();
  const orbitRef = useRef();
  const atmosphereRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

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
      // Speed up revolution when clicked
      orbitRef.current.rotation.y += clicked ? planet.speed * 15 : planet.speed;
    }
    if (meshRef.current) {
      // Self-rotation on axis
      meshRef.current.rotation.y += 0.015;
      meshRef.current.rotation.x += 0.008;
      // Smooth zoom on hover
      const scale = hovered ? 1.6 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.15);
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= 0.008;
      // Pulsing glow effect
      const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.08 + 1;
      atmosphereRef.current.scale.setScalar(1.3 * breathe);
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh
        ref={meshRef}
        position={[planet.distance, 0, 0]}
        onClick={() => {
          console.log('Planet clicked:', planet.id, planet.label);
          setClicked(true);
          setTimeout(() => {
            onClick(planet.id);
            setClicked(false);
          }, 300);
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
        <sphereGeometry args={[baseSize, 64, 64]} />
        <meshStandardMaterial
          color={colors.surface}
          roughness={0.3}
          metalness={0.7}
          emissive={colors.core}
          emissiveIntensity={hovered ? 0.6 : 0.3}
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

        {/* Enhanced glowing atmosphere */}
        <mesh ref={atmosphereRef} scale={[1.3, 1.3, 1.3]}>
          <sphereGeometry args={[baseSize, 32, 32]} />
          <meshBasicMaterial
            color={colors.glow}
            transparent
            opacity={hovered ? 0.25 : 0.15}
            side={2}
          />
        </mesh>
        
        {/* Outer glow layer */}
        <mesh scale={[1.6, 1.6, 1.6]}>
          <sphereGeometry args={[baseSize, 24, 24]} />
          <meshBasicMaterial
            color={colors.glow}
            transparent
            opacity={hovered ? 0.15 : 0.08}
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

        {/* Label removed - now shown at top of canvas */}
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
  const [spinning, setSpinning] = useState(false);
  const sunLightRef = useRef();
  const ambientRef = useRef();
  const sceneRef = useRef();

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
    <group ref={sceneRef} rotation={[-0.3, 0, 0]}>
      <fog attach="fog" args={["#0a0a0a", 120, 250]} />
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
        const opacity = Math.max(0.03, 0.15 - planet.distance / 500);
        return (
          <mesh key={`orbit-${planet.id}`} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry
              args={[planet.distance - 0.3, planet.distance + 0.3, 128]}
            />
            <meshBasicMaterial
              color={planet.colors.surface}
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
function MobileSolarSystemScene({ onPlanetClick, onHover }) {
  const [brightMode, setBrightMode] = useState(false);
  const sunLightRef = useRef();
  const ambientRef = useRef();

  useFrame(() => {
    if (sunLightRef.current) {
      const targetIntensity = brightMode ? 6 : 2.5;
      sunLightRef.current.intensity += (targetIntensity - sunLightRef.current.intensity) * 0.05;
    }
    if (ambientRef.current) {
      const targetIntensity = brightMode ? 0.2 : 0.5;
      ambientRef.current.intensity += (targetIntensity - ambientRef.current.intensity) * 0.05;
    }
  });

  // Mobile-scaled planets (closer distances, smaller sizes)
  const mobilePlanets = PLANETS.map(planet => ({
    ...planet,
    distance: planet.distance * 0.6, // Bring planets closer
    speed: planet.speed * 1.5 // Faster rotation for mobile
  }));

  return (
    <group rotation={[-0.2, 0, 0]}>
      <fog attach="fog" args={["#0a0a0a", 60, 120]} />
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
      {mobilePlanets.map((planet) => (
        <mesh key={`orbit-${planet.id}`} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[planet.distance - 0.3, planet.distance + 0.3, 64]} />
          <meshBasicMaterial color={planet.colors.surface} transparent opacity={0.1} side={2} />
        </mesh>
      ))}
      
      {/* Mobile-scaled Sun */}
      <Sun onClick={onPlanetClick} brightMode={brightMode} setBrightMode={setBrightMode} />
      
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
      
      <Stars radius={80} depth={40} count={800} factor={4} saturation={0} fade speed={0.5} />
    </group>
  );
}

export default function SolarSystem3D({ onPlanetClick }) {
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
            onClick={() => onPlanetClick("about")}
            className="w-20 h-20 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 mb-8 mx-auto flex items-center justify-center text-black font-bold hover:scale-105 transition-transform"
          >
            NS
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {PLANETS.map((planet) => (
            <button
              key={planet.id}
              onClick={() => onPlanetClick(planet.id)}
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
                  <MobileSolarSystemScene onPlanetClick={onPlanetClick} onHover={setHoveredPlanet} />
                </Suspense>
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full relative h-screen`} style={{ pointerEvents: 'auto' }}>
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
      
      {/* Sleek minimal text with hover label */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
        <h3 className="text-lg font-light tracking-[0.3em] text-white/80 mb-4">
          EXPLORE
        </h3>
        {hoveredPlanet && (
          <div className="mt-2 animate-fade-in">
            <div className="inline-block bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 backdrop-blur-md px-6 py-3 rounded-xl border border-amber-400/40 shadow-lg">
              <span className="text-base font-semibold text-amber-100 tracking-wider">
                {hoveredPlanet}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Zoom hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="text-xs text-white/50 tracking-wide">
          Zoom for better experience
        </div>
      </div>

      {/* Ambient particles - positioned closer to center */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => {
          const angle = (i / 15) * 360;
          const radius = 30 + Math.random() * 40;
          const x = 50 + Math.cos(angle * Math.PI / 180) * radius;
          const y = 50 + Math.sin(angle * Math.PI / 180) * radius;
          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-amber-400/40 animate-pulse"
              style={{
                left: `${Math.max(10, Math.min(90, x))}%`,
                top: `${Math.max(10, Math.min(90, y))}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
              }}
            />
          );
        })}
      </div>

      <Canvas
        camera={{ position: [0, 80, 120], fov: 75 }}
        style={{ 
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 60%, #1e293b 100%)",
          cursor: 'auto',
          pointerEvents: 'auto'
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
          <SolarSystemScene onPlanetClick={onPlanetClick} onHover={setHoveredPlanet} />
        </Suspense>
      </Canvas>
    </div>
  );
}
