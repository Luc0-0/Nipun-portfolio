// src/App.jsx
// Obsidian Luxe - Premium Portfolio

import React, { useEffect, Suspense } from 'react';

// Premium Components
import Navigation from './components/premium/Navigation';
import Hero from './components/premium/Hero';
import ProjectGallery from './components/premium/ProjectGallery';
import About from './components/premium/About';
import Expertise from './components/premium/Expertise';
import Credentials from './components/premium/Credentials';
import NeuralTimeline from './components/premium/NeuralTimeline';
import Contact from './components/premium/Contact';
import Footer from './components/premium/Footer';

// Premium Effects
import GlowingOrbs from './components/premium/GlowingOrbs';
import PremiumCursor from './components/premium/PremiumCursor';
const AmbientParticles = React.lazy(() => import('./components/premium/AmbientParticles'));

// Existing Components to Keep
import AIChatbot from './components/AIChatbot';
import GoogleAnalytics from './components/GoogleAnalytics';
import SmoothScroll from './components/SmoothScroll';

// Import premium chatbot styles
import './components/premium/Chatbot.css';

export default function App() {
  useEffect(() => {
    // Set initial theme based on system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!prefersDark) {
      document.documentElement.classList.add('light');
    }
  }, []);

  return (
    <>
      {/* Google Analytics */}
      <GoogleAnalytics />

      {/* Smooth Scroll */}
      <SmoothScroll />

      {/* Premium Background Effects */}
      <GlowingOrbs />

      {/* 3D Ambient Particles - Lazy loaded for performance */}
      <Suspense fallback={null}>
        <AmbientParticles />
      </Suspense>

      {/* Premium Cursor */}
      <PremiumCursor />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <ProjectGallery />
        <About />
        <Expertise />
        <NeuralTimeline />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* AI Chatbot */}
      <AIChatbot />
    </>
  );
}
