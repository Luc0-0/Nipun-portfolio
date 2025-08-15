// src/components/FloatingActionButton.jsx
// Floating action button with micro-interactions

import React, { useState, useEffect } from 'react';

export default function FloatingActionButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const actions = [
    { icon: '🚀', label: 'Top', action: scrollToTop },
    { icon: '💼', label: 'Projects', action: () => document.getElementById('project1')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: '📧', label: 'Contact', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="relative">
        {/* Action buttons */}
        {isExpanded && (
          <div className="absolute bottom-16 right-0 space-y-3">
            {actions.slice(1).map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-500/90 hover:bg-cyan-400 text-white rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110"
                style={{ animationDelay: `${index * 0.1}s` }}
                data-magnetic
                title={action.label}
              >
                <span>{action.icon}</span>
                <span className="text-sm font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Main FAB */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          data-magnetic
        >
          <span className={`text-xl transition-transform duration-300 ${isExpanded ? 'rotate-45' : ''}`}>
            {isExpanded ? '✕' : '⚡'}
          </span>
        </button>
      </div>
    </div>
  );
}