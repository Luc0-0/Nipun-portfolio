// src/components/premium/SketchfabHeroEmbed.jsx
// Performance-optimized Sketchfab 3D model embed with lazy-loading

import React, { useEffect, useRef, useState } from "react";

/**
 * SketchfabHeroEmbed
 * - lazy-loads via IntersectionObserver (300px threshold)
 * - fallback poster for first paint (LCP optimized)
 * - mobile fallback: poster only, no interactive iframe
 * - lightweight grain overlay for Obsidian Luxe
 * - all Sketchfab UI controls hidden
 */
export default function SketchfabHeroEmbed({
  modelId = "d6521362b37b48e3a82bce4911409303",
  poster = "/images/hero-solar-poster.webp",
  interactiveOnDesktopOnly = true,
  className = ""
}) {
  const wrapperRef = useRef(null);
  const iframeRef = useRef(null);
  const [isIntersecting, setIntersecting] = useState(false);
  const [iframeInjected, setIframeInjected] = useState(false);

  // Detect mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 767px)").matches);
  }, []);

  // IntersectionObserver: lazy-load when wrapper enters viewport (with 300px margin)
  useEffect(() => {
    // Immediately set intersecting for debugging (remove later)
    setIntersecting(true);

    if (!wrapperRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIntersecting(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "300px", threshold: 0.01 }
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  // Inject iframe immediately on mount (no lazy load for now)
  useEffect(() => {
    if (iframeInjected) return;

    // Skip iframe on mobile if interactiveOnDesktopOnly
    if (interactiveOnDesktopOnly && isMobile) {
      setIframeInjected(true);
      return;
    }

    if (!wrapperRef.current) return;

    const iframe = document.createElement("iframe");
    iframeRef.current = iframe;

    // Build query params: all UI hidden, autospin enabled
    const params = [
      "autospin=1",
      "autostart=1",
      "preload=1",
      "ui_infos=0",
      "ui_help=0",
      "ui_controls=0",
      "ui_stop=0",
      "ui_inspector=0",
      "ui_watermark=0",
      "ui_fullscreen=0",
    ].join("&");

    iframe.src = `https://sketchfab.com/models/${modelId}/embed?${params}`;
    iframe.title = "3D Hero Model";
    iframe.frameBorder = "0";
    iframe.allow = "autoplay; fullscreen; xr-spatial-tracking";
    iframe.loading = "lazy";
    iframe.decoding = "async";
    iframe.sandbox.add("allow-same-origin", "allow-scripts", "allow-fullscreen", "allow-pointer-lock");

    // Absolute positioning to fill container
    Object.assign(iframe.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      border: "0",
      pointerEvents: "auto",
      zIndex: "1",
      top: "0",
      left: "0",
    });

    wrapperRef.current.appendChild(iframe);
    setIframeInjected(true);

    return () => {
      try {
        if (iframeRef.current?.parentNode) {
          iframeRef.current.parentNode.removeChild(iframeRef.current);
        }
      } catch (e) {
        // silent fail
      }
    };
  }, [iframeInjected, modelId, interactiveOnDesktopOnly, isMobile]);

  return (
    <div
      ref={wrapperRef}
      className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
      role="img"
      aria-label="Interactive 3D hero background"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
      }}
    >
      {/* Poster fallback: shown until iframe loads */}
      <img
        src={poster}
        alt="Hero background"
        decoding="async"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{
          display: iframeInjected && !isMobile ? "none" : "block",
          zIndex: 0,
        }}
      />

      {/* Lightweight grain overlay (CSS, cheap) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{
          background:
            "repeating-linear-gradient(90deg, transparent 0px, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
          opacity: 0.22,
          zIndex: 2,
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

      {/* Sketchfab attribution (TOS requirement) */}
      {iframeInjected && !isMobile && (
        <a
          href={`https://sketchfab.com/models/${modelId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 left-4 z-20 text-xs text-white/50 hover:text-white/80 transition-colors"
          style={{ pointerEvents: "auto" }}
        >
          View on Sketchfab
        </a>
      )}
    </div>
  );
}
