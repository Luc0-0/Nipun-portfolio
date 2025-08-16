// src/App.jsx
// Main app component with theme management and layout

import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import LightweightInteractiveBackground from './components/LightweightInteractiveBackground';
import SolarSystem3D from './components/SolarSystem3D';
import Sections from './components/Sections';
import Achievements from './components/Achievements';
import Navigation from './components/Navigation';
import MagneticCursor from './components/MagneticCursor';
import HolographicElements from './components/HolographicElements';
import RippleEffect from './components/RippleEffect';
import QuantumParticles from './components/QuantumParticles';
import FloatingActionButton from './components/FloatingActionButton';
import CustomCursor from './components/CustomCursor';
import { disableDevTools, consoleWarning } from './utils/protection';
import GoogleAnalytics from './components/GoogleAnalytics';

export default function App() {
  // Temporarily disabled protection to test Google Analytics
  // useEffect(() => {
  //   disableDevTools();
  //   consoleWarning();
  // }, []);

  const handlePlanetClick = (sectionId) => {
    console.log('Navigating to:', sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    } else {
      console.log('Element not found:', sectionId);
    }
  };

  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(to bottom, #000011, #000033)' }}>
      {/* Google Analytics */}
      <GoogleAnalytics />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Enhanced interactive elements */}
      <CustomCursor />
      <MagneticCursor />
      <HolographicElements />
      <RippleEffect />
      <QuantumParticles />
      <LightweightInteractiveBackground />
      


      {/* Main content */}
      <main className="relative z-10">
        {/* Enhanced hero section */}
        <div className="relative">
          <Hero />
        </div>
        
        {/* Enhanced solar system navigator */}
        <section className="py-20 relative z-10">
          <SolarSystem3D onPlanetClick={handlePlanetClick} />
          {/* Professional navigation instructions */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-black/70 backdrop-blur-lg px-8 py-4 rounded-lg border border-white/10 shadow-2xl hover:border-white/20 hover:bg-black/80 transition-all duration-500">
              <p className="text-sm text-gray-200 text-center mb-2 font-medium">
                Interactive Solar System Navigator
              </p>
              <p className="text-xs text-gray-400 text-center">
                Click planets to explore • Drag to rotate • Scroll to zoom
              </p>
            </div>
          </div>
        </section>
        
        {/* Enhanced content sections */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/5" />
          <Sections />
        </div>
        
        {/* Achievements section */}
        <div className="relative">
          <Achievements />
        </div>
      </main>
      
      {/* Enhanced footer */}
      <footer className="relative z-10 py-12 backdrop-blur-lg bg-black/40 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-2">Ready to Connect?</h3>
            <p className="text-gray-300">Let's build something amazing together</p>
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <button 
              onClick={() => handlePlanetClick('contact')}
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-white/25"
            >
              Get In Touch
            </button>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              Back to Top
            </button>
          </div>
          <p className="text-sm text-gray-400">&copy; 2024 Nipun Sujesh. All rights reserved.</p>
        </div>
      </footer>
      
      {/* Floating action button */}
      <FloatingActionButton />
    </div>
  );
}