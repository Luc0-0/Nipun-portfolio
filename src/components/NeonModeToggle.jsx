// src/components/NeonModeToggle.jsx
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useState } from 'react';

export default function NeonModeToggle() {
  const { isDark, toggleTheme } = useTheme();
  const [isNeon, setIsNeon] = useState(false);

  const handleToggle = () => {
    toggleTheme();
    setIsNeon(!isNeon);
    
    // Add neon class to body for global neon effects
    if (!isNeon) {
      document.body.classList.add('neon-mode');
    } else {
      document.body.classList.remove('neon-mode');
    }
  };

  return (
    <motion.button
      onClick={handleToggle}
      className={`fixed top-6 right-6 z-50 p-4 rounded-full backdrop-blur-lg border-2 transition-all duration-500 ${
        isNeon 
          ? 'bg-black/80 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.8)]' 
          : isDark 
            ? 'bg-gray-800/80 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)]'
            : 'bg-white/80 border-gray-300 shadow-lg'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ rotate: isNeon ? 360 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative"
      >
        {isNeon ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse" />
            <div className="absolute inset-1 bg-black rounded-full" />
            <div className="absolute inset-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
          </motion.div>
        ) : isDark ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full relative"
          >
            <div className="absolute inset-1 bg-yellow-300 rounded-full animate-pulse" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-6 h-6 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full relative"
          >
            <div className="absolute top-1 left-1 w-2 h-2 bg-gray-300 rounded-full" />
          </motion.div>
        )}
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-full ${
          isNeon ? 'bg-cyan-400/20' : isDark ? 'bg-amber-400/20' : 'bg-gray-400/20'
        }`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.button>
  );
}