// src/components/ProjectShowcase.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import CinematicText from './CinematicText';

// Categorized project groups
const featuredProjects = [
  {
    id: 1,
    title: "Task Manager Pro",
    description: "A production-ready full-stack task management application with real-time collaboration, AI-powered task creation, gamification, and advanced analytics.",
    image: "https://images-platform.99static.com/jBf5a8whJMMbR3S1BcujgHrDDt4=/500x500/top/smart/99designs-contests-attachments/20/20314/attachment_20314019",
    video: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Socket.io", "AI", "Gamification"],
    demoUrl: "https://task-manager-pro-are3-drab.vercel.app",
    codeUrl: "https://github.com/Luc0-0/Task-manager-pro",
    featured: true
  },
  {
    id: 2,
    title: "Smart Notes by Nipun",
    description: "A smart note-taking app with advanced search, tagging, and productivity features. Organize your thoughts and boost your workflow.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    video: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    tags: ["React", "Node.js", "Productivity", "Notes"],
    demoUrl: "https://elevated-notes--smart-notes-luc-edition.asia-east1.hosted.app/",
    codeUrl: "https://github.com/Luc0-0/Smart-notes-by-Nipun",
    featured: true
  }
];

const aiProjects = [
  {
    id: 3,
    title: "BLIP Auto Image Captioning",
    description: "Automatic image captioning using BLIP.",
    image: "https://placehold.co/400x300?text=ML+Project",
    tags: ["Python", "BLIP", "AI"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/BLIP-auto-image-captioning",
    featured: false
  },
  {
    id: 4,
    title: "Final AI Speech Synthesis",
    description: "AI-based speech synthesis project.",
    image: "https://placehold.co/400x300?text=ML+Project",
    tags: ["Python", "Speech Synthesis", "AI"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Final-Ai-Speech-Synthesis",
    featured: false
  },
  {
    id: 5,
    title: "Image Classification Cat Dog",
    description: "Cat vs Dog image classification.",
    image: "https://placehold.co/400x300?text=ML+Project",
    tags: ["Python", "Classification", "AI"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Image-classification-cat-dog",
    featured: false
  },
  {
    id: 6,
    title: "Azure AI Image Analysis",
    description: "Image analysis using Azure AI.",
    image: "https://placehold.co/400x300?text=ML+Project",
    tags: ["Python", "Azure", "AI"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Azure-Ai-image-analysis",
    featured: false
  },
  {
    id: 7,
    title: "Azure Business Card Analyzer",
    description: "Business card analyzer with Azure AI.",
    image: "https://placehold.co/400x300?text=ML+Project",
    tags: ["Python", "Azure", "AI"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Azure-Business-card-analyzer",
    featured: false
  },
  {
    id: 8,
    title: "Smart Notes by Nipun",
    description: "Smart notes app for learning and productivity.",
    image: "https://placehold.co/400x300?text=ML+Project",
    tags: ["React", "Notes", "Productivity"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Smart-notes-by-Nipun",
    featured: false
  }
];

const webProjects = [
  {
    id: 5,
    title: "Portfolio Website",
    description: "Modern portfolio featuring 3D animations and responsive design.",
    image: "https://st2.depositphotos.com/1032577/6582/i/450/depositphotos_65828845-stock-photo-portfolio-written-on-notebook.jpg",
    tags: ["React", "Three.js", "Framer Motion", "Tailwind CSS"],
    demoUrl: "https://nipun-portfolio-eight.vercel.app/",
    codeUrl: "https://github.com/Luc0-0/Nipun-portfolio",
    featured: false
  }
];

const miniProjects = [
  {
    id: 9,
    title: "BLIP Auto Image Captioning",
    description: "Automatic image captioning using BLIP.",
    image: "https://placehold.co/400x300?text=Mini+Project",
    tags: ["Python", "BLIP", "AI"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/BLIP-auto-image-captioning",
    featured: false
  },
  {
    id: 10,
    title: "Final AI Speech Synthesis",
    description: "AI-based speech synthesis project.",
    image: "https://placehold.co/400x300?text=Mini+Project",
    tags: ["Python", "Speech Synthesis", "AI"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Final-Ai-Speech-Synthesis",
    featured: false
  },
  {
    id: 11,
    title: "Image Classification Cat Dog",
    description: "Cat vs Dog image classification.",
    image: "https://placehold.co/400x300?text=Mini+Project",
    tags: ["Python", "Classification", "AI"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Image-classification-cat-dog",
    featured: false
  },
  {
    id: 12,
    title: "Azure AI Image Analysis",
    description: "Image analysis using Azure AI.",
    image: "https://placehold.co/400x300?text=Mini+Project",
    tags: ["Python", "Azure", "AI"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Azure-Ai-image-analysis",
    featured: false
  },
  {
    id: 13,
    title: "Azure Business Card Analyzer",
    description: "Business card analyzer with Azure AI.",
    image: "https://placehold.co/400x300?text=Mini+Project",
    tags: ["Python", "Azure", "AI"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Azure-Business-card-analyzer",
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
          {project.demoUrl && project.demoUrl !== '#' && showDemo ? (
            <iframe
              src={project.demoUrl}
              title={project.title}
              className="w-full h-full border-0"
              allow="fullscreen"
              style={{
                backgroundColor: '#1a202c', // Dark background for iframe
                width: '100%',
                height: '100%',
                display: 'block', // Ensure iframe fills the container
              }}
            ></iframe>
          ) : ( // Render image thumbnail and gradient
            <> {/* Use fragment to wrap multiple elements */}
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
 />
 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" /> {/* Gradient overlay */}
 </> )}

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
                className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                  project.id === 3 ? 'text-gray-800 bg-gray-200/30 border border-gray-400' : 'bg-white/20 text-white border border-white/30'
                }`}
                style={{ animationDelay: `${tagIndex * 0.1}s` }}
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Title */}
          <CinematicText
            variant="slideUp"
            className={`text-2xl font-bold mb-2 ${project.id === 3 ? 'text-amber-500' : 'text-white'}`}
          > {project.title} </CinematicText>

          {/* Description */}
          <motion.p
            className="mb-4 text-sm text-blue-400"
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
              whileTap={{ scale: 0.95 }} onClick={() => window.open(project.codeUrl, '_blank')}
            >
              View Code
            </motion.button>
            {project.featured && project.demoUrl && (
              <motion.a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium text-sm border border-blue-700 cursor-view hover:bg-blue-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Website
              </motion.a>
            )}
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
  const [openGroup, setOpenGroup] = useState('featured');
  return (
    <div className="max-w-6xl mx-auto px-6">
      <CinematicText
        variant="glow"
        className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
      >
        Selected Work
      </CinematicText>

      {/* Dropdown/Accordion for project groups */}
      <div className="mb-8 flex gap-4 justify-center">
        <button
          className={`px-6 py-2 rounded-lg font-semibold border ${openGroup === 'featured' ? 'bg-amber-400 text-black' : 'bg-white/10 text-white'}`}
          onClick={() => setOpenGroup('featured')}
        >Featured</button>
        <button
          className={`px-6 py-2 rounded-lg font-semibold border ${openGroup === 'ai' ? 'bg-amber-400 text-black' : 'bg-white/10 text-white'}`}
          onClick={() => setOpenGroup('ai')}
        >AI/ML Projects</button>
        <button
          className={`px-6 py-2 rounded-lg font-semibold border ${openGroup === 'web' ? 'bg-amber-400 text-black' : 'bg-white/10 text-white'}`}
          onClick={() => setOpenGroup('web')}
        >Web Projects</button>
        <button
          className={`px-6 py-2 rounded-lg font-semibold border ${openGroup === 'mini' ? 'bg-amber-400 text-black' : 'bg-white/10 text-white'}`}
          onClick={() => setOpenGroup('mini')}
        >Mini Projects</button>
      </div>

      {/* Nested section for each group */}
      {openGroup === 'featured' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
      {openGroup === 'ai' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {aiProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
      {openGroup === 'web' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {webProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
      {openGroup === 'mini' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {miniProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}