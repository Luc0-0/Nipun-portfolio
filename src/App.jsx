import React, { useEffect, Suspense, useState, lazy } from 'react';

import Navigation from './components/premium/Navigation';
import Hero from './components/premium/Hero';
import CapstoneFeature from './components/premium/CapstoneFeature';

const ProjectGallery = lazy(() => import('./components/premium/ProjectGallery'));
const About = lazy(() => import('./components/premium/About'));
const Expertise = lazy(() => import('./components/premium/Expertise'));
const Credentials = lazy(() => import('./components/premium/Credentials'));
const NeuralTimeline = lazy(() => import('./components/premium/NeuralTimeline'));
const Contact = lazy(() => import('./components/premium/Contact'));
const Footer = lazy(() => import('./components/premium/Footer'));

import GlowingOrbs from './components/premium/GlowingOrbs';
import PremiumCursor from './components/premium/PremiumCursor';
const AmbientParticles = lazy(() => import('./components/premium/AmbientParticles'));

import Loader from './components/ui/Loader';

import AIChatbot from './components/AIChatbot';
import GoogleAnalytics from './components/GoogleAnalytics';
import SmoothScroll from './components/SmoothScroll';
import './components/premium/Chatbot.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!prefersDark) {
      document.documentElement.classList.add('light');
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <GoogleAnalytics />
      <SmoothScroll />
      <GlowingOrbs />

      <Suspense fallback={null}>
        <AmbientParticles />
      </Suspense>

      <PremiumCursor />
      <Navigation />

      <main className="relative z-10">
        <Hero />
        <CapstoneFeature />

        <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"></div></div>}>
          <ProjectGallery />
          <About />
          <Expertise />
          <NeuralTimeline />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <AIChatbot />
    </>
  );
}
