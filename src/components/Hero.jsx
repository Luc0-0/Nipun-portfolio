// src/components/Hero.jsx
// Clean hero section with name, title, and profile image

import React, { useState } from "react";
import TypewriterText from "./TypewriterText";
import GlitchText from "./GlitchText";
import TiltCard from "./TiltCard";
import PerformanceMonitor from "./PerformanceMonitor";
import AdvancedCursor from "./AdvancedCursor";
import ScrollReveal from "./ScrollReveal";
import SkillMeter from "./SkillMeter";
import LiveGitHubActivity from "./LiveGitHubActivity";
import SimpleTextReveal from "./SimpleTextReveal";
import CinematicText from "./CinematicText";
import ParallaxSection from "./ParallaxSection";
import SkillsRadar from "./SkillsRadar";

import { motion } from 'framer-motion';

export default function Hero() {

  const [showWelcome, setShowWelcome] = useState(false);
  return (
    <section
      id="hero"
      className="min-h-[150vh] flex flex-col justify-between px-6 relative overflow-hidden"
    >
      {/* Elegant frame elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle corner frames */}
        <div className="absolute top-12 left-12 w-8 h-8 border-l border-t border-white/20" />
        <div className="absolute top-12 right-12 w-8 h-8 border-r border-t border-white/20" />
        <div className="absolute bottom-12 left-12 w-8 h-8 border-l border-b border-white/20" />
        <div className="absolute bottom-12 right-12 w-8 h-8 border-r border-b border-white/20" />

        {/* Minimal accent lines */}
        <div className="absolute top-0 left-1/4 w-px h-16 bg-gradient-to-b from-white/30 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-16 bg-gradient-to-b from-white/30 to-transparent" />

        {/* Floating minimal indicators */}
        <div
          className="absolute top-1/4 left-20 w-1 h-1 bg-white/50 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/4 right-20 w-1 h-1 bg-white/50 rounded-full animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* Cinematic backdrop layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/15 via-purple-900/10 to-cyan-900/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Atmospheric depth layers */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: "2s", animationDelay: "1s" }}
        />
      </div>

      {/* Cinematic light rays */}
      <div
        className="absolute top-0 left-1/5 w-px h-2/3 bg-gradient-to-b from-white/20 via-purple-300/10 to-transparent animate-pulse"
        style={{ animationDuration: "1.s" }}
      />
      <div
        className="absolute top-0 right-1/4 w-px h-1/2 bg-gradient-to-b from-white/15 via-cyan-300/10 to-transparent animate-pulse"
        style={{ animationDelay: "1s", animationDuration: "2s" }}
      />

      <div className="max-w-6xl mx-auto relative z-10 flex-1 flex items-center py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Epic Text content */}
          <div className="text-center lg:text-left animate-fade-in">
            {/* Epic animated title with typewriter effect */}
            <h1 className="text-6xl lg:text-7xl font-bold mb-8 relative group cursor-default">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-amber-100 hover:from-gray-800 hover:to-gray-600 dark:hover:from-amber-100 dark:hover:to-amber-200 transition-all duration-300 hover:scale-105">
                <TypewriterText
                  texts={["Nipun Sujesh"]}
                  speed={30}
                  deleteSpeed={0}
                  pauseTime={999999}
                  loop={false}
                  startDelay={100}
                />
              </div>

              {/* Simplified glowing effect */}
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent group-hover:via-amber-400/80 transition-all duration-300" />

              <div className="mt-8">
                <div
                  className="block text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-200 dark:to-amber-400 font-light tracking-[0.2em] animate-slide-up hover:tracking-[0.3em] transition-all duration-300"
                  style={{ animationDelay: "0.1s" }}
                  title="Learning the future"
                >
                  <TypewriterText
                    texts={[
                      "AI STUDENT & DEVELOPER",
                      "CREATIVE CODER",
                      "DIGITAL INNOVATOR",
                      "TECH ENTHUSIAST",
                    ]}
                    speed={20}
                    deleteSpeed={10}
                    pauseTime={800}
                    startDelay={30}
                  />
                </div>
                <div
                  className="flex items-center mt-4 animate-slide-up group-hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: "1.1s" }}
                >
                  <div className="w-32 h-px bg-gradient-to-r from-amber-400/80 to-transparent" />
                  <div className="w-2 h-2 bg-amber-400 rounded-full mx-2" />
                  <div className="w-16 h-px bg-gradient-to-r from-amber-400/80 to-transparent" />
                </div>
              </div>
            </h1>

            {/* Epic description with AI theme and easter eggs */}
            <div
              className="mb-12 animate-slide-up"
              style={{ animationDelay: "1.4s" }}
            >
              <div className="relative group">
                <p className="text-xl text-gray-700 dark:text-gray-100 max-w-2xl leading-relaxed">
                  I train neural networks and build
                  <span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-300 dark:to-cyan-300 font-semibold bg-purple-400/10 px-2 py-1 rounded border border-purple-400/20 hover:border-cyan-400/40 transition-all duration-300 cursor-pointer"
                    title="Deep learning in progress..."
                  >
                    {" "}
                    intelligent experiences{" "}
                  </span>
                  that blend human creativity with AI. I love what I do.
                </p>


              </div>
            </div>

            {/* Current Status Badge */}
            <div className="mb-6 animate-slide-up" style={{ animationDelay: "1.6s" }}>
              <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-amber-400/30 rounded-lg shadow-lg">
                <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <div className="absolute w-2 h-2 bg-green-400 rounded-full animate-ping" />
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Right now: <span className="text-amber-600 dark:text-amber-400 font-semibold">Wrapping up an AI Bootcamp on Udemy</span>
                </span>
              </div>
            </div>

            {/* Professional Download Resume Button */}
            <div className="mb-8">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = '/images/NIPUN SUJESH_compressed.pdf';
                  link.download = 'Nipun_Sujesh_Resume.pdf';
                  link.click();
                }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 border border-amber-500/20 backdrop-blur-sm hover:scale-105"
                data-magnetic
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 16.5c-.28 0-.53-.11-.71-.29l-5.5-5.5a1.003 1.003 0 011.42-1.42l3.29 3.29V4a1 1 0 112 0v8.58l3.29-3.29a1.003 1.003 0 111.42 1.42l-5.5 5.5c-.18.18-.43.29-.71.29z"/>
                  <path d="M19 20H5a1 1 0 110-2h14a1 1 0 110 2z"/>
                </svg>
                Download Resume
              </button>
            </div>

          </div>

          {/* Right: Floating Profile Image */}
          <div className="space-y-8">
            <div
              className="flex justify-center lg:justify-end lg:pr-16 animate-fade-in"
              style={{ animationDelay: "1.2s" }}
            >
              <div className="relative group">
                {/* Premium Glassmorphism Container for Model Image */}
                <div className="mx-auto max-w-md rounded-3xl bg-gradient-to-br from-slate-900/95 via-gray-900/90 to-black/95 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-gradient-to-r from-gray-700/50 via-slate-600/30 to-gray-800/50 p-6 flex items-center justify-center relative overflow-hidden">
                  {/* Animated border gradient */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-slate-700/40 via-gray-600/20 to-slate-800/40 p-[1px]">
                    <div className="w-full h-full rounded-3xl bg-gradient-to-br from-slate-900/95 via-gray-900/90 to-black/95" />
                  </div>
                  <div className="relative z-10 w-full h-auto rounded-2xl transition-all duration-500 group/image hover:shadow-[0_0_40px_10px_rgba(80,120,255,0.25),0_0_80px_20px_rgba(245,195,107,0.18)]">
                    <img
                      src="/images/Model.jpg"
                      alt="Nipun Sujesh"
                      className="w-full h-auto rounded-2xl shadow-2xl border border-gray-800/60"
                      style={{
                        objectFit: "cover"
                      }}
                    />
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
                
                {/* Floating name and title */}
                <div className="text-center mt-8 group-hover:translate-y-2 transition-transform duration-500">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 drop-shadow-lg group-hover:text-gray-800 dark:group-hover:text-amber-100 transition-colors duration-300">
                    Nipun Sujesh
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300 font-medium text-lg tracking-wide drop-shadow-md group-hover:text-amber-600 dark:group-hover:text-amber-200 transition-colors duration-300">
                    AI Developer & Full-Stack Builder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-6xl mx-auto relative z-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Developer Skills */}
          <div className="bg-white/80 dark:bg-black/20 border border-amber-400/40 dark:border-amber-400/20 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-amber-100 mb-6 flex items-center gap-4">
              <div className="w-4 h-4 bg-amber-500 dark:bg-amber-400 rounded-full" />
              AI Development
            </h3>
            <div className="space-y-3">
              {[
                { name: "Python & AI/ML", level: 90 },
                { name: "TensorFlow & PyTorch", level: 85 },
                { name: "NLP & LLMs", level: 82 },
                { name: "Model Deployment", level: 80 },
              ].map((skill, index) => (
                <SkillMeter
                  key={skill.name}
                  skill={skill.name}
                  level={skill.level}
                  delay={index * 200}
                />
              ))}
            </div>
          </div>

          {/* MERN Stack Skills */}
          <div className="bg-white/80 dark:bg-black/20 border border-amber-400/40 dark:border-amber-400/20 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-amber-100 mb-6 flex items-center gap-4">
              <div className="w-4 h-4 bg-amber-500 dark:bg-amber-400 rounded-full" />
              Full Stack (MERN)
            </h3>
            <div className="space-y-3">
              {[
                { name: "MongoDB & Express", level: 88 },
                { name: "React & Next.js", level: 92 },
                { name: "Node.js & APIs", level: 90 },
                { name: "FastAPI & Flask", level: 85 },
              ].map((skill, index) => (
                <SkillMeter
                  key={skill.name}
                  skill={skill.name}
                  level={skill.level}
                  delay={(index + 4) * 200}
                />
              ))}
            </div>
          </div>

          {/* GitHub Activity */}
          <div className="bg-white/80 dark:bg-black/20 border border-amber-400/40 dark:border-amber-400/20 rounded-2xl p-8 backdrop-blur-sm">
            <LiveGitHubActivity username="Luc0-0" />
          </div>
        </div>
      </div>

      {/* Professional scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>





      {/* Next-level features */}
      <PerformanceMonitor />
      <ScrollReveal />
    </section>
  );
}
