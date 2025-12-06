// src/pages/LabPage.jsx
// ⭐ Obsidian Luxe Lab — Premium 3D Systems Explorer (V3)
// Interactive solar system metaphor for portfolio navigation

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfessionalSolarSystem3D from "../components/ProfessionalSolarSystem3D";

export default function LabPage() {
  const navigate = useNavigate();
  const [brightMode, setBrightMode] = useState(false);

  const handlePlanetClick = (planetId) => {
    // Safe route mapping with fallbacks
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
    if (route) {
      navigate(route);
    }
  };

  const handleBrightModeChange = (newBrightMode) => {
    setBrightMode(newBrightMode);
  };

  return (
    <>
      {/* Back Button — Obsidian Luxe Glass Card */}
      <button
        onClick={() => (window.location.hash = "/")}
        className={`fixed top-8 left-8 z-20 glass-card px-4 py-2 flex items-center gap-2 group transition-all duration-300 opacity-0 animate-fade-in ${
          brightMode 
            ? 'hover:border-[#1A1A1A]/60 border-[#2A2A2A]/40' 
            : 'hover:border-[var(--color-accent)]/60'
        }`}
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        aria-label="Back to home"
      >
        <svg
          className={`w-4 h-4 group-hover:-translate-x-1 transition-transform ${brightMode ? 'text-[#1A1A1A]' : 'text-[var(--color-text-primary)]'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className={`text-sm font-medium ${brightMode ? 'text-[#1A1A1A]' : 'text-[var(--color-text-primary)]'}`}>
          Back
        </span>
      </button>

      {/* Main 3D Solar System — Premium Cinema Rendering */}
      <ProfessionalSolarSystem3D onPlanetClick={handlePlanetClick} onBrightModeChange={handleBrightModeChange} />

      {/* Footer Info Card — Obsidian Luxe Aesthetic */}
      <div className="fixed bottom-8 right-8 z-10 max-w-xs">
        <div className={`glass-card p-4 ${brightMode ? 'bg-white/5 border-[#2A2A2A]/30' : ''}`}>
          <p className={`text-xs ${brightMode ? 'text-[#3A3A3A]' : 'text-[var(--color-text-secondary)]'}`}>
            <span className={`font-semibold ${brightMode ? 'text-[#1A1A1A]' : 'text-[var(--color-accent)]'}`}>
              Systems Explorer
            </span>{" "}
            — Interactive 3D universe of your work, skills, projects, and
            capabilities.
          </p>
        </div>
      </div>
    </>
  );
}
