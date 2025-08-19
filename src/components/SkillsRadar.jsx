// src/components/SkillsRadar.jsx
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const skills = [
  { name: 'React', level: 90, color: '#61dafb' },
  { name: 'JavaScript', level: 95, color: '#f7df1e' },
  { name: 'Python', level: 85, color: '#3776ab' },
  { name: 'Node.js', level: 80, color: '#339933' },
  { name: 'Three.js', level: 75, color: '#000000' },
  { name: 'AI/ML', level: 70, color: '#ff6b6b' },
  { name: 'UI/UX', level: 85, color: '#8b5cf6' },
  { name: 'WebGL', level: 65, color: '#f59e0b' }
];

function SkillOrb({ skill, index, isInView }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const angle = (index / skills.length) * 2 * Math.PI;
  const radius = 120;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { 
        scale: 1, 
        opacity: 1,
        rotate: 360 
      } : { scale: 0, opacity: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ scale: 1.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Skill Orb */}
      <motion.div
        className="relative w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xs"
        style={{
          background: `linear-gradient(135deg, ${skill.color}, ${skill.color}80)`,
          boxShadow: `0 0 20px ${skill.color}60`
        }}
        animate={{
          boxShadow: isHovered 
            ? `0 0 40px ${skill.color}, 0 0 60px ${skill.color}60`
            : `0 0 20px ${skill.color}60`
        }}
      >
        {skill.name.slice(0, 3)}
        
        {/* Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="28"
            fill="none"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="2"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="28"
            fill="none"
            stroke={skill.color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 28}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
            animate={isInView ? {
              strokeDashoffset: 2 * Math.PI * 28 * (1 - skill.level / 100)
            } : {
              strokeDashoffset: 2 * Math.PI * 28
            }}
            transition={{ delay: index * 0.1 + 0.5, duration: 1.5 }}
          />
        </svg>
      </motion.div>

      {/* Skill Label */}
      <motion.div
        className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
          {skill.name} - {skill.level}%
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SkillsRadar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative w-80 h-80 mx-auto">
      {/* Center Hub */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1, rotate: 360 } : { scale: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        style={{
          boxShadow: '0 0 40px rgba(245, 158, 11, 0.8)'
        }}
      >
        SKILLS
      </motion.div>

      {/* Radar Rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-amber-400/20 rounded-full"
          style={{
            width: `${ring * 80}px`,
            height: `${ring * 80}px`
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ delay: ring * 0.2, duration: 0.8 }}
        />
      ))}

      {/* Skill Orbs */}
      {skills.map((skill, index) => (
        <SkillOrb key={skill.name} skill={skill} index={index} isInView={isInView} />
      ))}

      {/* Scanning Line */}
      <motion.div
        className="absolute top-1/2 left-1/2 origin-left w-40 h-0.5 bg-gradient-to-r from-amber-400 to-transparent"
        style={{ transformOrigin: 'left center' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}