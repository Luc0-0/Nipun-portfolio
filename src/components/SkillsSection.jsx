// src/components/SkillsSection.jsx
// Separate skills section that appears on scroll

import React from 'react';
import SkillMeter from './SkillMeter';
import LiveGitHubActivity from './LiveGitHubActivity';

export default function SkillsSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Crafting intelligent solutions with cutting-edge technologies
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* AI & Language Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-300 mb-8 flex items-center gap-3">
              <div className="w-3 h-3 bg-purple-400 rounded-full" />
              AI & Language Skills
            </h3>
            <div className="space-y-4">
              {[
                { name: "AI/ML & Python", level: 88 },
                { name: "Neural Networks", level: 83 },
                { name: "Data Science", level: 85 },
                { name: "TensorFlow & PyTorch", level: 80 },
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
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-300 mb-8 flex items-center gap-3">
              <div className="w-3 h-3 bg-cyan-400 rounded-full" />
              Web Development
            </h3>
            <div className="space-y-4">
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
        </div>

        {/* Live GitHub Activity */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <LiveGitHubActivity username="nipunsujesh" />
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-16">
          <a
            href="#project1"
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 rounded-lg hover:from-cyan-500/20 hover:to-blue-500/20 transition-all duration-500 backdrop-blur-md overflow-hidden"
            data-magnetic
            data-ripple
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative flex items-center gap-3 text-cyan-100 font-medium tracking-wide">
              <div className="w-2 h-2 border border-cyan-400 rotate-45" />
              EXPLORE PROJECTS
              <span className="group-hover:translate-x-2 transition-transform duration-300">
                →
              </span>
            </span>
          </a>

          <a
            href="#contact"
            className="group relative px-8 py-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800 text-white font-semibold rounded-lg hover:from-gray-600 hover:via-gray-500 hover:to-gray-700 hover:shadow-xl hover:shadow-gray-400/25 transition-all duration-500 overflow-hidden border border-gray-500/30"
            data-magnetic
            data-ripple
            style={{
              background: "linear-gradient(135deg, #71717a, #52525b, #3f3f46)",
              boxShadow: "0 4px 15px rgba(113, 113, 122, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative flex items-center gap-3">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse" />
              INITIATE CONTACT
              <span className="group-hover:scale-110 transition-transform duration-300">
                ✨
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}