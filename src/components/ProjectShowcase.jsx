// src/components/ProjectShowcase.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import CinematicText from './CinematicText';

const projects = [
  {
    id: 1,
    title: "Interactive Portfolio Website",
    description: "Modern portfolio featuring 3D animations, smooth scrolling, and responsive design built with React and Three.js",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    video: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    tags: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    demoUrl: "https://nipun-portfolio.vercel.app",
    codeUrl: "https://github.com/Luc0-0/portfolio",
    featured: true
  },
  {
    id: 2,
    title: "Machine Learning Dashboard",
    description: "Data visualization dashboard for ML model performance tracking with real-time metrics and interactive charts",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    video: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    tags: ["Python", "Streamlit", "Pandas", "Plotly"],
    demoUrl: "#",
    codeUrl: "#",
    featured: true
  },
  {
    id: 3,
    title: "Task Management App",
    description: "Full-stack productivity application with user authentication, real-time updates, and collaborative features",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    video: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Socket.io"],
    demoUrl: "#",
    codeUrl: "#",
    featured: false
  }
];

function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  return (
    <motion.div
      className={`relative group cursor-pointer ${
        project.featured ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div className="relative h-full bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-black/95 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        
        {/* Background Image/Video */}
        <div className="absolute inset-0">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-end">
          
          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
          >
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium border border-white/30 backdrop-blur-sm"
                style={{ animationDelay: `${tagIndex * 0.1}s` }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <CinematicText
            variant="slideUp"
            className="text-2xl font-bold text-white mb-2"
          >
            {project.title}
          </CinematicText>

          {/* Description */}
          <motion.p
            className="text-gray-300 mb-4 text-sm"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0.7 }}
          >
            {project.description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-black rounded-lg font-medium text-sm cursor-view"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(245, 158, 11, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDemo(!showDemo)}
            >
              {showDemo ? 'Show Image' : 'Live Demo'}
            </motion.button>
            
            <motion.button
              className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium text-sm border border-white/20 cursor-view"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              View Code
            </motion.button>
          </motion.div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: isHovered 
              ? "0 0 40px rgba(245, 158, 11, 0.3), inset 0 0 40px rgba(245, 158, 11, 0.1)"
              : "0 0 0px rgba(245, 158, 11, 0)"
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Featured Badge */}
        {project.featured && (
          <motion.div
            className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-bold"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            FEATURED
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function ProjectShowcase() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <CinematicText
        variant="glow"
        className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
      >
Selected Work
      </CinematicText>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}