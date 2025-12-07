// src/components/ui/Loader.jsx
// Premium Loading Screen with Lottie Astronaut Animation

import React, { Suspense } from "react";
import { motion } from "framer-motion";

// Lazy load Lottie to avoid blocking critical path
const Lottie = React.lazy(() => import("lottie-react"));

// Import astronaut animation from public folder
// Vite will serve this as-is, so we fetch it at runtime
let astronautData = null;

const loadAstronautAnimation = async () => {
  try {
    const response = await fetch("/astronot.json");
    return await response.json();
  } catch (error) {
    console.warn("Failed to load astronaut animation:", error);
    return null;
  }
};

export default function Loader() {
  const [animationData, setAnimationData] = React.useState(null);

  // Load animation on mount
  React.useEffect(() => {
    loadAstronautAnimation().then(setAnimationData);
  }, []);

  // Check for reduced motion preference
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: prefersReduced ? 1 : 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReduced ? 0.1 : 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0b]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Lottie Animation Container */}
      <motion.div
        className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 flex items-center justify-center"
        variants={itemVariants}
      >
        <Suspense fallback={<div className="text-white/40">●</div>}>
          {animationData ? (
            <Lottie
              animationData={animationData}
              loop
              autoplay
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            // Fallback if Lottie animation fails
            <div className="text-center">
              <div className="text-4xl text-[var(--color-accent)] mb-4">◆</div>
              <p className="text-xs text-white/60">Initializing...</p>
            </div>
          )}
        </Suspense>
      </motion.div>

      {/* Status Text */}
      <motion.p
        className="mt-6 text-xs sm:text-sm tracking-[0.35em] text-[var(--color-accent)] font-light"
        variants={itemVariants}
      >
        LOADING!!!
      </motion.p>

      {/* Attribution */}
      <p className="absolute bottom-4 text-center text-[10px] text-white/40 px-4 max-w-sm">
        Astronot by{" "}
        <a
          href="https://iconscout.com/contributors/east-supply"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-[var(--color-accent)] transition-colors"
        >
          East Supply
        </a>{" "}
        on{" "}
        <a
          href="https://iconscout.com/lottie-animations/astronot"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-[var(--color-accent)] transition-colors"
        >
          Iconscout
        </a>
      </p>
    </motion.div>
  );
}
