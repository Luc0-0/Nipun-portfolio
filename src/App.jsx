// src/App.jsx
// Obsidian Luxe - Premium Portfolio

import React, { useEffect, Suspense, useState, lazy } from 'react';

// Premium Components
import Navigation from './components/premium/Navigation';
import Hero from './components/premium/Hero';

// Lazy load heavy sections
const ProjectGallery = lazy(() => import('./components/premium/ProjectGallery'));
const About = lazy(() => import('./components/premium/About'));
const Expertise = lazy(() => import('./components/premium/Expertise'));
const Credentials = lazy(() => import('./components/premium/Credentials'));
const NeuralTimeline = lazy(() => import('./components/premium/NeuralTimeline'));
const Contact = lazy(() => import('./components/premium/Contact'));
const Footer = lazy(() => import('./components/premium/Footer'));

// Premium Effects
import GlowingOrbs from './components/premium/GlowingOrbs';
import PremiumCursor from './components/premium/PremiumCursor';
const AmbientParticles = lazy(() => import('./components/premium/AmbientParticles'));

// Loader
import Loader from './components/ui/Loader';

// Existing Components to Keep
import AIChatbot from './components/AIChatbot';
import GoogleAnalytics from './components/GoogleAnalytics';
import SmoothScroll from './components/SmoothScroll';

// Import premium chatbot styles
import './components/premium/Chatbot.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set initial theme based on system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!prefersDark) {
      document.documentElement.classList.add('light');
    }
  }, []);

  useEffect(() => {
    // Minimum splash duration: ~2200ms
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Show loader while loading
  if (isLoading) {
    return <Loader />;
  }

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

        {/* Lazy load below-the-fold content */}
        <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"></div></div>}>
          <ProjectGallery />
          <About />
          <Expertise />
          <NeuralTimeline />
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* AI Chatbot */}
      <AIChatbot />
    </>
  );
}
