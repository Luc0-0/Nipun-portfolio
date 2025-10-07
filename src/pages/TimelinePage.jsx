import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Timeline from '../components/Timeline';
import SharedBackground from '../components/SharedBackground';

export default function TimelinePage() {
  return (
    <SharedBackground>
      <Navigation />
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-6 mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors duration-300">
            ← Back to Home
          </Link>
        </div>
        <Timeline />
      </div>
    </SharedBackground>
  );
}