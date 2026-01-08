// src/components/premium/HeroBackground.jsx
// Spline particle effect + animated grain texture overlay

import React, { useEffect, useRef, useState } from 'react';

export default function HeroBackground() {
  const canvasRef = useRef(null);
  const iframeRef = useRef(null);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    // Load Spline iframe on mount and track viewport visibility
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
      // Load Spline immediately on mount
      if (!iframeRef.current.src) {
        iframeRef.current.src = 'https://my.spline.design/particles-kTMeEq2wzYZ5e8p5fwMKI0Zr/';
      }
    }

    // Delay grain animation start until Spline iframe loads (small buffer)
    const timer = setTimeout(() => {
      setSplineLoaded(true);
    }, 300);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Pause Spline when user scrolls, resume when scroll stops
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Resume after scroll stops (300ms no scroll events)
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size and draw static noise once
    const drawStaticNoise = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const buffer = new Uint32Array(imageData.data.buffer);

      for (let i = 0; i < buffer.length; i++) {
        // Less dense noise for better aesthetics
        buffer[i] = Math.random() < 0.5 ? 0xff000000 : 0xffffffff;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    drawStaticNoise();

    // Only redraw on resize (much cheaper than requestAnimationFrame)
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(drawStaticNoise, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Spline particles embed - Paused on scroll, hidden when not in view */}
      <iframe
        ref={iframeRef}
        frameBorder='0'
        className="absolute inset-0 w-full h-full transition-opacity duration-200"
        style={{
          border: 'none',
          overflow: 'hidden',
          opacity: isScrolling || !isInView ? 0 : 1,
          pointerEvents: isScrolling || !isInView ? 'none' : 'auto'
        }}
        title="Spline Particles"
      />

      {/* Animated grain texture overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-30 mix-blend-soft-light"
        style={{ zIndex: 2 }}
      />

      {/* Diagonal light ray gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)',
          mixBlendMode: 'screen',
          zIndex: 1
        }}
      />

      {/* Gold/warm tint overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(212,168,83,0.04) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.1) 100%)",
          mixBlendMode: "overlay",
          zIndex: 3,
        }}
      />
    </>
  );
}
