// src/components/premium/GalaxyParticles.jsx
import React, { useEffect, useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * GalaxyParticles.jsx
 *
 * Usage:
 * <GalaxyParticles
 *   theme="dark"
 *   speed={0.0007}
 *   density={2000}
 *   colors={['#1e3a8a', '#6b21a8', '#d4a853']}
 * />
 *
 * Requirements (must be installed in project):
 * - react
 * - react-dom
 * - @react-three/fiber
 * - three
 * - @react-three/drei
 * - @react-three/postprocessing
 *
 * This component lazy-loads the canvas using IntersectionObserver and renders a performant
 * Points particle system with a bloom pass. It falls back to a poster image on mobile or until
 * the canvas is in view + loaded.
 */

// Small helper: detect mobile
const isMobileDevice = () =>
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

// Default colors (dark blues, purple, gold)
const DEFAULT_COLORS = ["#1e3a8a", "#6b21a8", "#d4a853"];

// Inner component that builds the particle system
function GalaxyScene({ density, speed, colors, theme, mouseParallax = true }) {
  const pointsRef = useRef();
  const { size, viewport } = useThree();

  // create particle positions and colors once
  const { positions, colorsArr, sizes } = useMemo(() => {
    const count = Math.max(250, Math.min(10000, Math.floor(density))); // clamp
    const positions = new Float32Array(count * 3);
    const colorsArr = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    // distribute particles in a soft disk/galaxy distribution with small z variance
    for (let i = 0; i < count; i++) {
      // radius distribution biased towards center
      const radius = Math.pow(Math.random(), 0.6) * (50 + Math.random() * 120);
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 8; // slight vertical thickness
      const z = Math.sin(angle) * radius * (0.45 + Math.random() * 0.6);

      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // color pick with bias; dark theme -> brighter particles; light theme -> subdued
      const cIdx = Math.floor(Math.random() * colors.length);
      const hex = colors[cIdx] || "#ffffff";
      // simple hex to rgb
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      // apply slight random brightness variance
      const bright = (0.8 + Math.random() * 0.6) * (theme === "dark" ? 1 : 0.65);
      colorsArr[i * 3 + 0] = Math.min(1, r * bright);
      colorsArr[i * 3 + 1] = Math.min(1, g * bright);
      colorsArr[i * 3 + 2] = Math.min(1, b * bright);

      // size variance
      sizes[i] = 1.5 + Math.random() * 3.5;
    }

    return { positions, colorsArr, sizes };
  }, [density, colors, theme]);

  // subtle mouse parallax
  const mouse = useRef([0, 0]);
  useEffect(() => {
    function onMove(e) {
      mouse.current = [
        (e.clientX / window.innerWidth - 0.5) * 0.5,
        (e.clientY / window.innerHeight - 0.5) * 0.5,
      ];
    }
    if (mouseParallax && typeof window !== "undefined") {
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }
  }, [mouseParallax]);

  // animation loop
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (!pointsRef.current) return;

    // rotation: slow orbital spin
    pointsRef.current.rotation.y = t * speed * 60;

    // gentle wave: update positions via shader is better, but we can add small oscillation to the group
    pointsRef.current.position.x = (mouseParallax ? mouse.current[0] * 8 : 0) * 1.2;
    pointsRef.current.position.y = (mouseParallax ? -mouse.current[1] * 4 : 0) * 1.1;

    // small per-particle scale pulsation
    const scale = 1 + Math.sin(t * 0.12) * 0.01;
    pointsRef.current.scale.set(scale, scale, scale);
  });

  return (
    <>
      {/* ambient low light so particles are visible */}
      <ambientLight intensity={theme === "dark" ? 0.2 : 0.6} />
      {/* mild directional fill */}
      <directionalLight position={[10, 10, 5]} intensity={theme === "dark" ? 0.2 : 0.4} />
      <group position={[0, 0, 0]}>
        <points ref={pointsRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={colorsArr.length / 3}
              array={colorsArr}
              itemSize={3}
            />
            <bufferAttribute attach="attributes-size" count={sizes.length} array={sizes} itemSize={1} />
          </bufferGeometry>

          <pointsMaterial
            vertexColors
            size={1.6}
            sizeAttenuation={true}
            alphaTest={0.01}
            transparent={true}
            opacity={0.95}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* mild additional small particle cloud closer to camera for depth */}
        <mesh position={[0, -6, -10]} rotation={[0.1, 0, 0]}>
          <sphereGeometry args={[80, 32, 16]} />
          <meshStandardMaterial
            color={theme === "dark" ? "#02030a" : "#f5f3f1"}
            roughness={1}
            metalness={0}
            transparent
            opacity={0.03}
          />
        </mesh>
      </group>

      {/* postprocessing bloom for glow (selective) */}
      <EffectComposer disableNormalPass>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          intensity={theme === "dark" ? 0.28 : 0.14}
          kernelSize={3}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

// Wrapper component: lazy/in-view + poster fallback + canvas
export default function GalaxyParticles({
  theme = "dark",
  speed = 0.0006,
  density = 2000,
  colors = DEFAULT_COLORS,
  className = "",
  poster = "/images/Model.jpg",
}) {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [renderCanvas, setRenderCanvas] = useState(false);

  // IntersectionObserver to lazy render the heavy canvas
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const el = containerRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { root: null, rootMargin: "300px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Start rendering canvas shortly after inView (allow main paint)
  useEffect(() => {
    if (!inView) return;
    // If mobile, don't render canvas — keep poster only
    if (isMobileDevice()) {
      setRenderCanvas(false);
      return;
    }
    // small delay to ensure hero content paints first
    const t = setTimeout(() => setRenderCanvas(true), 220);
    return () => clearTimeout(t);
  }, [inView]);

  // choose palette depending on theme
  const palette = useMemo(() => {
    if (theme === "light") {
      return colors;
    }
    return colors;
  }, [theme, colors]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ background: "transparent" }}
    >
      {/* Poster image as first paint and mobile fallback */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        decoding="async"
        loading="lazy"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 40%",
        }}
      />

      {/* Canvas: only injected on non-mobile and after in-view */}
      {renderCanvas && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Suspense fallback={null}>
            <Canvas
              gl={{ antialias: true, powerPreference: "high-performance" }}
              camera={{ position: [0, 8, 60], fov: 55 }}
              style={{ width: "100%", height: "100%" }}
            >
              <color attach="background" args={[theme === "dark" ? "#050506" : "#faf9f6"]} />
              <GalaxyScene density={density} speed={speed} colors={palette} theme={theme} mouseParallax />
            </Canvas>
          </Suspense>
        </div>
      )}

      {/* grain overlay (keeps overall texture) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: theme === "dark" ? 0.03 : 0.06,
          mixBlendMode: "overlay",
        }}
      />

      {/* subtle gold tint overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            theme === "dark"
              ? "linear-gradient(180deg, rgba(212,168,83,0.03) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.06) 100%)"
              : "linear-gradient(180deg, rgba(196,168,114,0.02) 0%, rgba(0,0,0,0) 50%)",
        }}
      />
    </div>
  );
}
