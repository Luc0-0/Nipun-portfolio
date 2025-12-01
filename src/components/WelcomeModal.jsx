import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "Welcome to Nipun's Space";

  useEffect(() => {
    const hasVisited = localStorage.getItem('portfolio_visitor_info');
    if (!hasVisited) {
      setTimeout(() => setIsOpen(true), 500);
    }
  }, []);

  useEffect(() => {
    if (isOpen && displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, displayedText]);

  const handleEnter = () => {
    localStorage.setItem('portfolio_visitor_info', JSON.stringify({
      visited: true,
      timestamp: new Date().toISOString()
    }));
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          style={{
            background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)'
          }}
        >
          {/* Starfield */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(200)].map((_, i) => {
              const size = Math.random() * 1.5 + 0.5;
              const initialOpacity = Math.random() * 0.4 + 0.3;
              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: size + 'px',
                    height: size + 'px',
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 100%)',
                    boxShadow: `0 0 ${size * 3}px rgba(255,255,255,0.8), 0 0 ${size * 5}px rgba(255,255,255,0.4)`
                  }}
                  animate={{
                    opacity: [initialOpacity + 0.3, initialOpacity * 0.5, initialOpacity + 0.3],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
          </div>

          {/* Typewriter Text */}
          <div className="relative z-10 text-center pointer-events-auto">
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-white mb-8"
              style={{
                fontFamily: 'monospace',
                textShadow: '0 0 20px rgba(255,255,255,0.5)',
                cursor: 'default'
              }}
            >
              {displayedText}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-1 h-12 md:h-16 bg-white ml-2 align-middle"
              />
            </motion.h1>
            
            {displayedText === fullText && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={handleEnter}
                className="relative px-10 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 group"
                style={{ 
                  cursor: 'pointer',
                  clipPath: 'polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)'
                }}
              >
                <span className="relative z-10">Enter</span>
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;