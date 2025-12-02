import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Timeline from '../components/Timeline';
import SharedBackground from '../components/SharedBackground';

export default function TimelinePage() {
  return (
    <SharedBackground>
      <Navigation />
      <div className="pt-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-amber-400/30 rounded-lg text-amber-300 hover:text-amber-200 hover:bg-white/20 hover:border-amber-400/50 transition-all duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
        <Timeline />
      </div>
    </SharedBackground>
  );
}