// src/pages/ContactPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import TextReveal from '../components/TextReveal';
import TiltCard from '../components/TiltCard';

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20 pb-12" style={{ background: 'linear-gradient(to bottom, #000011, #000033)' }}>
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors duration-300 mb-8">
          ← Back to Home
        </Link>

        <TextReveal>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-300">Ready to collaborate? Let's discuss your next project</p>
          </div>
        </TextReveal>

        <div className="grid md:grid-cols-2 gap-8">
          <TextReveal delay={200}>
            <TiltCard className="bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-xl">📧</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Email</h3>
                    <p className="text-amber-300">contact@nipunsujesh.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-xl">💼</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">LinkedIn</h3>
                    <p className="text-amber-300">linkedin.com/in/nipunshrestha</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-xl">🐙</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">GitHub</h3>
                    <p className="text-amber-300">github.com/nipunshrestha</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </TextReveal>

          <TextReveal delay={400}>
            <TiltCard className="bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send Message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-white/10 border border-amber-400/20 rounded-lg focus:border-amber-400/40 focus:outline-none text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 bg-white/10 border border-amber-400/20 rounded-lg focus:border-amber-400/40 focus:outline-none text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea rows="4" className="w-full px-4 py-3 bg-white/10 border border-amber-400/20 rounded-lg focus:border-amber-400/40 focus:outline-none text-white resize-none"></textarea>
                </div>
                <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-medium rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300">
                  Send Message
                </button>
              </form>
            </TiltCard>
          </TextReveal>
        </div>
      </div>
    </div>
  );
}