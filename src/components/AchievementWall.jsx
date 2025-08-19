// src/components/AchievementWall.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import CinematicText from './CinematicText';

const achievements = [
  {
    id: 1,
    title: "Excellence in Computer Science",
    organization: "University Academic Board",
    date: "2024",
    description: "Recognized for outstanding academic performance and innovative project contributions in AI and machine learning coursework.",
    icon: "🎖️",
    color: "from-slate-600 to-slate-800",
    glowColor: "rgba(71, 85, 105, 0.4)"
  },
  {
    id: 2,
    title: "React Developer Certification",
    organization: "Meta Professional Certificate",
    date: "2023",
    description: "Completed comprehensive training in React ecosystem, including advanced hooks, state management, and modern development practices.",
    icon: "📜",
    color: "from-slate-700 to-gray-800",
    glowColor: "rgba(55, 65, 81, 0.4)"
  },
  {
    id: 3,
    title: "Python Programming Proficiency",
    organization: "Industry Certification",
    date: "2023",
    description: "Demonstrated expertise in Python for data science, machine learning, and web development applications.",
    icon: "🐍",
    color: "from-gray-600 to-slate-700",
    glowColor: "rgba(75, 85, 99, 0.4)"
  },
  {
    id: 4,
    title: "Open Source Contributions",
    organization: "GitHub Community",
    date: "2024",
    description: "Active contributor to various open-source projects, focusing on educational tools and developer utilities.",
    icon: "💼",
    color: "from-gray-700 to-slate-800",
    glowColor: "rgba(55, 65, 81, 0.4)"
  }
];

function AchievementCard({ achievement, index }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-80 h-48 cursor-pointer perspective-1000"
      initial={{ opacity: 0, y: 50, rotateY: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full transform-style-preserve-3d transition-transform duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden">
          <div className={`w-full h-full bg-gradient-to-br ${achievement.color} rounded-xl p-6 shadow-xl border border-white/10`}>
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                boxShadow: isHovered 
                  ? `0 0 40px ${achievement.glowColor}, 0 0 80px ${achievement.glowColor}`
                  : `0 0 20px ${achievement.glowColor}`
              }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between text-white">
              <div className="flex items-start justify-between">
                <motion.div
                  className="text-4xl"
                  animate={{ rotate: isHovered ? 360 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {achievement.icon}
                </motion.div>
                <div className="text-right">
                  <div className="text-sm opacity-80">{achievement.date}</div>
                  <div className="text-xs opacity-60">Click to flip</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                <p className="text-sm opacity-90">{achievement.organization}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 shadow-2xl border border-amber-400/30">
            <div className="h-full flex flex-col justify-center text-center text-white">
              <motion.div
                className="text-3xl mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {achievement.icon}
              </motion.div>
              <h3 className="text-lg font-bold mb-3 text-amber-400">{achievement.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{achievement.description}</p>
              <div className="mt-4 text-xs text-amber-300">{achievement.organization} • {achievement.date}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AchievementWall() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <CinematicText
        variant="glow"
        className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
      >
Certifications & Recognition
      </CinematicText>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 justify-items-center">
        {achievements.map((achievement, index) => (
          <AchievementCard key={achievement.id} achievement={achievement} index={index} />
        ))}
      </div>

      {/* Interactive hint */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          💡 Click on any achievement card to see more details
        </p>
      </motion.div>
    </div>
  );
}