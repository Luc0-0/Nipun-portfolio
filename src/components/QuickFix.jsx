// src/components/QuickFix.jsx
import { motion } from 'framer-motion';

export default function QuickFix() {
  return (
    <div className="fixed top-20 left-4 z-50 bg-red-500 text-white p-4 rounded-lg">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        🚀 LEGENDARY EFFECTS ACTIVE!
      </motion.div>
      <div className="text-xs mt-2">
        • 3D Skills Radar ✅<br/>
        • Project Showcase ✅<br/>
        • Achievement Wall ✅<br/>
        • Cinematic Cursor ✅<br/>
        • Neon Mode Toggle ✅
      </div>
    </div>
  );
}