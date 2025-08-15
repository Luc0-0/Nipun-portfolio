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

export default function Hero() {
  const [showWelcome, setShowWelcome] = useState(true);
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

      <div className="max-w-6xl mx-auto relative z-10 flex-1 flex items-center pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-20">
          {/* Left: Epic Text content */}
          <div className="text-center lg:text-left animate-fade-in">
            {/* Epic animated title with typewriter effect */}
            <h1 className="text-5xl lg:text-6xl font-bold mb-8 relative group cursor-default">
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 via-cyan-100 to-blue-100 hover:from-purple-200 hover:via-cyan-200 hover:to-blue-200 transition-all duration-700 hover:scale-105">
                <TypewriterText
                  texts={["Nipun Sujesh"]}
                  speed={30}
                  deleteSpeed={0}
                  pauseTime={999999}
                  loop={false}
                  startDelay={showWelcome ? 999999 : 100}
                />
              </div>

              {/* Multi-layered glowing effects */}
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/60 via-purple-400/40 to-transparent animate-pulse group-hover:via-cyan-400/80 group-hover:via-purple-400/60 transition-all duration-500" />
              <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="mt-8">
                <div
                  className="block text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-purple-200 via-cyan-200 to-gray-300 font-light tracking-[0.3em] animate-slide-up hover:tracking-[0.4em] transition-all duration-30"
                  style={{ animationDelay: "0.1s" }}
                  title="🎓 Learning the future"
                >
                  <TypewriterText
                    texts={[
                      "AI STUDENT & DEVELOPER",
                      "NEURAL NETWORK ARCHITECT",
                      "DIGITAL INNOVATOR",
                      "FUTURE BUILDER",
                    ]}
                    speed={20}
                    deleteSpeed={10}
                    pauseTime={800}
                    startDelay={showWelcome ? 999999 : 30}
                  />
                </div>
                <div
                  className="flex items-center mt-4 animate-slide-up group-hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: "1.1s" }}
                >
                  <div className="w-32 h-px bg-gradient-to-r from-cyan-400/80 via-purple-400/60 to-transparent" />
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full mx-2 animate-pulse" />
                  <div className="w-16 h-px bg-gradient-to-r from-purple-400/80 to-transparent" />
                </div>
              </div>
            </h1>

            {/* Epic description with AI theme and easter eggs */}
            <div
              className="mb-12 animate-slide-up"
              style={{ animationDelay: "1.4s" }}
            >
              <div className="relative group">
                <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                  Training neural networks and crafting
                  <span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-cyan-300 font-semibold bg-purple-400/10 px-2 py-1 rounded border border-purple-400/20 hover:border-cyan-400/40 transition-all duration-300 cursor-pointer"
                    title="🧠 Deep learning in progress..."
                  >
                    {" "}
                    intelligent experiences{" "}
                  </span>
                  that bridge human creativity with artificial intelligence.
                </p>

                {/* Interactive easter egg - comet rain trigger */}
                <div
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 text-lg text-purple-400 cursor-pointer hover:scale-125 hover:text-cyan-400 active:scale-150"
                  title="🎯 Click for comet rain!"
                  onClick={() => {
                    if (window.triggerCometRain) {
                      window.triggerCometRain();
                      // Add some visual feedback
                      const target = event.target;
                      target.style.transform = "scale(2) rotate(360deg)";
                      target.style.transition = "transform 0.5s ease";
                      setTimeout(() => {
                        target.style.transform = "";
                      }, 500);
                    }
                  }}
                >
                  <span className="animate-bounce hover:animate-spin">🚀</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Professional Profile Card */}
          <div className="space-y-8">
            <div
              className="flex justify-center lg:justify-end lg:pr-16 animate-fade-in"
              style={{ animationDelay: "1.2s" }}
            >
              <TiltCard className="relative group" intensity={4}>
                {/* Cinematic backdrop */}
                <div className="absolute -inset-8 bg-gradient-to-br from-black/40 via-purple-900/20 to-cyan-900/20 rounded-3xl blur-2xl" />
                <div className="absolute -inset-6 bg-gradient-to-r from-purple-500/10 via-cyan-500/15 to-indigo-500/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-90 transition-all duration-1000" />
                
                {/* Cinematic frame */}
                <div className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden">
                  {/* Film grain overlay */}
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
                  
                  {/* Cinematic lighting strips */}
                  <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyan-400/30 via-transparent to-purple-400/30 opacity-40" />
                  <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-purple-400/30 via-transparent to-cyan-400/30 opacity-40" />
                  
                  {/* Professional Profile Card */}
                  <div className="text-center relative z-10">
                    {/* Cinematic Profile Picture */}
                    <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto mb-6">
                      {/* Multiple shadow layers for depth */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-xl scale-110" />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-cyan-400/10 to-purple-400/10 blur-2xl scale-125" />
                      
                      <img
                        src="/images/model.png"
                        alt="Nipun Sujesh"
                        className="relative w-full h-full object-cover rounded-full border-2 border-white/30 shadow-2xl group-hover:scale-105 transition-all duration-700 z-10"
                        style={{
                          filter: "contrast(1.05) brightness(0.95) drop-shadow(0 0 30px rgba(168, 85, 247, 0.3))",
                          objectPosition: "center 8%",
                        }}
                      />
                      
                      {/* Cinematic orbital rings */}
                      <div className="absolute inset-0 rounded-full border border-gradient-to-r from-purple-400/40 via-cyan-400/40 to-purple-400/40 animate-spin" style={{ animationDuration: "20s" }} />
                      <div className="absolute inset-2 rounded-full border border-gradient-to-l from-cyan-400/20 via-purple-400/20 to-cyan-400/20 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
                      
                      {/* Cinematic corner accents */}
                      <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-cyan-400/60 rounded-tl-lg" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 border-r-2 border-t-2 border-purple-400/60 rounded-tr-lg" />
                      <div className="absolute -bottom-2 -left-2 w-8 h-8 border-l-2 border-b-2 border-purple-400/60 rounded-bl-lg" />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-cyan-400/60 rounded-br-lg" />
                    </div>

                    {/* Name and Title */}
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-3 drop-shadow-lg">
                        Nipun Sujesh
                      </h3>
                      <p className="text-cyan-400 font-medium text-lg tracking-wide drop-shadow-md">
                        AI Developer & Digital Craftsman
                      </p>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </div>

      {/* Skills and GitHub Section - Bottom of Hero */}
      <div className="max-w-6xl mx-auto relative z-10 pb-20 pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Skills */}
          <div className="bg-black/20 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-gray-300 mb-4 flex items-center gap-3">
              <div className="w-3 h-3 bg-purple-400 rounded-full" />
              AI & ML Skills
            </h3>
            <div className="space-y-3">
              {[
                { name: "AI/ML & Python", level: 88 },
                { name: "Neural Networks", level: 83 },
                { name: "Data Science", level: 85 },
                { name: "TensorFlow", level: 80 },
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

          {/* Web Development Skills */}
          <div className="bg-black/20 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-gray-300 mb-4 flex items-center gap-3">
              <div className="w-3 h-3 bg-cyan-400 rounded-full" />
              Web Development
            </h3>
            <div className="space-y-3">
              {[
                { name: "React & Next.js", level: 92 },
                { name: "Three.js & WebGL", level: 85 },
                { name: "Node.js & APIs", level: 90 },
                { name: "TypeScript", level: 87 },
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
          <div className="bg-black/20 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <LiveGitHubActivity username="nipunsujesh" />
          </div>
        </div>
      </div>

      {/* Professional scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      {/* Welcome Screen Overlay */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center transition-all duration-1000 ease-out">
          <div
            className="text-center cursor-pointer group transform transition-all duration-500 hover:scale-105"
            onClick={() => {
              const overlay = document.querySelector(".fixed.inset-0");
              overlay.style.opacity = "0";
              overlay.style.transform = "scale(0.95)";
              setTimeout(() => setShowWelcome(false), 500);
            }}
          >
            <div className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-white/10 via-purple-500/10 to-cyan-500/10 border border-white/30 rounded-3xl backdrop-blur-xl hover:from-white/20 hover:via-purple-500/20 hover:to-cyan-500/20 hover:border-white/50 transition-all duration-700 shadow-2xl">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full mr-6 animate-pulse shadow-lg" />
              <span className="text-white text-2xl font-light tracking-wide group-hover:tracking-wider transition-all duration-300">
                Welcome to my digital space
              </span>
              <div className="w-16 h-px bg-gradient-to-r from-cyan-400/60 via-purple-400/40 to-transparent ml-6 group-hover:w-20 transition-all duration-500" />
            </div>
            <p className="text-gray-400 mt-4 text-sm animate-pulse">
              Click to continue
            </p>
          </div>
        </div>
      )}

      {/* Next-level features */}
      <PerformanceMonitor />
      <ScrollReveal />
    </section>
  );
}
