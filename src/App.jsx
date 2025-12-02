// src/App.jsx
// Main app component with theme management and layout

import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import LightweightInteractiveBackground from './components/LightweightInteractiveBackground';
import SolarSystem3D from './components/SolarSystem3D';
import Sections from './components/Sections';
import Achievements from './components/Achievements';
import Navigation from './components/Navigation';
import HolographicElements from './components/HolographicElements';
import RippleEffect from './components/RippleEffect';
import QuantumParticles from './components/QuantumParticles';
import FloatingActionButton from './components/FloatingActionButton';
import { disableDevTools, consoleWarning } from './utils/protection';
import GoogleAnalytics from './components/GoogleAnalytics';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import SmoothScroll from './components/SmoothScroll';
import ScrollEffects from './components/ScrollEffects';
import EnhancedParallax from './components/EnhancedParallax';
import GlowCursor from './components/GlowCursor';
import ImmersiveBackground from './components/ImmersiveBackground';
import CinematicCursor from './components/CinematicCursor';
import NeonModeToggle from './components/NeonModeToggle';
import ProjectShowcase from './components/ProjectShowcase';
import AchievementWall from './components/AchievementWall';
import QuickFix from './components/QuickFix';
import AutoProjectShowcase from './components/AutoProjectShowcase';
import WelcomeModal from './components/WelcomeModal';
import AnalyticsDashboard from './components/AnalyticsDashboard';

import FloatingProjectsButton from './components/FloatingProjectsButton';
import FloatingTimelineButton from './components/FloatingTimelineButton';
import IntelligentCursor from './components/IntelligentCursor';
import PageTransitionNew from './components/PageTransition';
import Scroll3DAnimations from './components/Scroll3DAnimations';
import AIChatbot from './components/AIChatbot';

import { useAnalytics } from './hooks/useAnalytics';


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
      const start = window.pageYOffset;
      const distance = elementPosition - offset - start;
      const duration = 800;
      let startTime = null;
      
      const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      
      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, start + distance * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };
      
      requestAnimationFrame(animation);
    } else {
      console.log('Element not found:', sectionId);
    }
  };

  return <AppContent />;
}

function AppContent() {
  const { isDark, isSpace } = useTheme();
  const { trackProjectClick, trackBlogView } = useAnalytics();
  const handlePlanetClick = (sectionId) => {
    console.log('Navigating to:', sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const start = window.pageYOffset;
      const distance = elementPosition - offset - start;
      const duration = 800;
      let startTime = null;
      
      const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      
      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, start + distance * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };
      
      requestAnimationFrame(animation);
    } else {
      console.log('Element not found:', sectionId);
    }
  };

  return (
    <div className={`min-h-screen relative ${isSpace ? 'bg-gradient-to-br from-[#1a1a40] via-[#23234f] to-[#0d0d1a]' : 'bg-gradient-to-b from-white to-gray-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black'}`}>
      {/* Star overlay for space theme */}
      {isSpace && (
        <div className="pointer-events-none fixed inset-0 z-0">
          <svg width="100%" height="100%" className="absolute inset-0 w-full h-full" style={{ opacity: 0.18 }}>
            <defs>
              <radialGradient id="starGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#fff" stopOpacity="1" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </radialGradient>
            </defs>
            {[...Array(60)].map((_, i) => (
              <circle key={i} cx={Math.random() * 1920} cy={Math.random() * 1080} r={Math.random() * 2 + 1} fill="url(#starGlow)" />
            ))}
          </svg>
        </div>
      )}

      {/* Google Analytics */}
      <GoogleAnalytics />

      {/* Smooth Scroll */}
      <SmoothScroll />

      {/* Scroll Effects */}
      <ScrollEffects />

      {/* Next-level UI Components */}
      <IntelligentCursor />
      <PageTransitionNew />



      {/* Navigation */}
      <Navigation />

      {/* Enhanced interactive elements */}
      <LightweightInteractiveBackground />



      {/* Main content */}
      <main className="relative z-10">
        {/* Enhanced hero section */}
        <div className="relative">
          <Hero />
        </div>

        {/* Enhanced solar system navigator */}
        <section id="solar-system" className="py-20 relative solar-system-section">
          <SolarSystem3D onPlanetClick={handlePlanetClick} />
        </section>

        {/* Enhanced content sections */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/5" />
          <Sections />
        </div>

        {/* Project Showcase */}
        <div className="relative py-20 project-showcase-anchor">
          <Scroll3DAnimations index={0} delay={200}>
            <ProjectShowcase />
          </Scroll3DAnimations>
        </div>

        {/* Live GitHub Projects */}
        <div className="relative py-20">
          <div className="max-w-6xl mx-auto px-6 text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-amber-100">
              Live GitHub Projects
            </h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Automatically synced from my GitHub repositories
            </p>
            <a
              href="#/live-projects"
              onClick={(e) => {
                // Fallback for mobile devices that might have issues with hash routing
                if (window.innerWidth < 768) {
                  e.preventDefault();
                  window.location.hash = '/live-projects';
                }
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-400 hover:to-purple-500 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              View Live Projects
            </a>
          </div>
        </div>

        {/* Achievement Wall */}
        <div className="relative py-20">
          <Scroll3DAnimations index={2} delay={250}>
            <AchievementWall />
          </Scroll3DAnimations>
        </div>

        {/* Achievements section */}
        <div className="relative">
          <Achievements />
        </div>



        {/* Blog Section */}
        <div className="relative py-20">
          <Scroll3DAnimations index={3} delay={400}>
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-amber-100">
                  Latest Articles
                </h2>
                <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                  Sharing my journey in AI, Data Science, and technology
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/90 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-amber-400/20 rounded-2xl p-6 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-amber-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-4xl">🧠</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">From Zero to AI</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">My BTech journey in Data Science, maintaining 8.0 CGPA, and choosing mental health AI...</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Personal • 6 min read</span>
                    <span>Dec 15, 2024</span>
                  </div>
                </div>

                <div className="bg-white/90 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-amber-400/20 rounded-2xl p-6 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-4xl">🐍</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Python for AI</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">Essential Python libraries every AI student should master: NumPy, Pandas, Scikit-learn...</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Tutorial • 8 min read</span>
                    <span>Dec 10, 2024</span>
                  </div>
                </div>

                <div className="bg-white/90 dark:bg-white/5 backdrop-blur-sm border border-gray-200 dark:border-amber-400/20 rounded-2xl p-6 hover:bg-gray-50 dark:hover:bg-white/10 transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-4xl">💚</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mental Health AI</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">Building my final year project: Mental Health AI Embedded Assistance system...</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Project • 10 min read</span>
                    <span>Dec 5, 2024</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <a
                  href="#/blog"
                  onClick={(e) => {
                    // Fallback for mobile devices that might have issues with hash routing
                    if (window.innerWidth < 768) {
                      e.preventDefault();
                      window.location.hash = '/blog';
                    }
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-lg hover:from-amber-400 hover:to-amber-500 hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                  Read All Articles
                </a>
              </div>
            </div>
          </Scroll3DAnimations>
        </div>
      </main>

      {/* Enhanced footer */}
      <footer className="relative z-10 py-12 backdrop-blur-lg bg-white/80 dark:bg-black/40 border-t border-gray-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to Connect?</h3>
            <p className="text-gray-600 dark:text-gray-300">Let's build something amazing together</p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center space-x-6 mb-6">
            {/* Premium Download Resume Button */}
            <div className="flex justify-center mb-8">
              <a
                href="/images/NIPUN SUJESH_compressed.pdf"
                download
                className="inline-flex items-center gap-2 px-7 py-3 rounded-2xl bg-gradient-to-br from-black via-indigo-900 to-amber-400/30 dark:from-black dark:via-indigo-950 dark:to-amber-300/20 shadow-[0_0_24px_2px_rgba(80,120,255,0.18)] border border-indigo-700/40 dark:border-amber-300/20 text-lg font-bold text-amber-200 dark:text-amber-100 hover:shadow-[0_0_40px_10px_rgba(245,195,107,0.18)] hover:scale-105 transition-all duration-300 backdrop-blur-lg focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
              >
                <svg className="w-6 h-6 text-amber-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 16.5c-.28 0-.53-.11-.71-.29l-5.5-5.5a1.003 1.003 0 011.42-1.42l3.29 3.29V4a1 1 0 112 0v8.58l3.29-3.29a1.003 1.003 0 111.42 1.42l-5.5 5.5c-.18.18-.43.29-.71.29z" />
                  <path d="M19 20H5a1 1 0 110-2h14a1 1 0 110 2z" />
                </svg>
                Download Resume
              </a>
            </div>
            <a href="https://github.com/Luc0-0" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/nipun-sujesh" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://instagram.com/nipun0__0" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">&copy; 2024 Nipun Sujesh. All rights reserved.</p>
        </div>
      </footer>

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Neon Mode Toggle */}
      <NeonModeToggle />

      {/* Welcome Modal for Visitor Analytics */}
      <WelcomeModal />

      {/* Analytics Dashboard */}
      <AnalyticsDashboard />

      {/* Floating Projects Button */}
      <FloatingProjectsButton />

      {/* Floating Timeline Button */}
      <FloatingTimelineButton />

      {/* AI Chatbot */}
      <AIChatbot />

    </div>
  );
}