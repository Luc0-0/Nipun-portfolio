// src/components/ProjectShowcase.jsx
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import CinematicText from './CinematicText';
import { fetchGitHubRepos } from '../utils/githubApi';

// Categorized project groups
const featuredProjects = [
  {
    id: 1,
    title: "Task Manager Pro",
    description: "Full-stack task management application built with React and Node.js. Features user authentication, real-time updates, task categorization, and responsive design. Deployed on Vercel with MongoDB backend integration.",
    image: "https://images-platform.99static.com/jBf5a8whJMMbR3S1BcujgHrDDt4=/500x500/top/smart/99designs-contests-attachments/20/20314/attachment_20314019",
    video: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    tags: ["React", "Node.js", "MongoDB", "Authentication", "Responsive Design"],
    demoUrl: "https://task-manager-pro-are3-drab.vercel.app",
    codeUrl: "https://github.com/Luc0-0/Task-manager-pro",
    featured: true
  },
  {
    id: 2,
    title: "Smart Notes Application",
    description: "Intelligent note-taking application with search functionality, categorization, and cloud storage. Built using React with Firebase backend for real-time synchronization and user management.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    video: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    tags: ["React", "Firebase", "Cloud Storage", "Real-time Sync"],
    demoUrl: "https://elevated-notes--smart-notes-luc-edition.asia-east1.hosted.app/",
    codeUrl: "https://github.com/Luc0-0/Smart-notes-by-Nipun",
    featured: true
  }
];

const aiProjects = [
  {
    id: 3,
    title: "BLIP Image Captioning System",
    description: "Computer vision project implementing BLIP (Bootstrapping Language-Image Pre-training) for automatic image captioning. Uses Python with transformers library for generating descriptive captions from images.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    tags: ["Python", "BLIP", "Computer Vision", "Transformers"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/BLIP-auto-image-captioning",
    featured: false
  },
  {
    id: 4,
    title: "AI Speech Synthesis",
    description: "Text-to-speech synthesis project using AI models. Implements neural speech synthesis techniques to convert text input into natural-sounding speech output using Python and deep learning frameworks.",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=300&fit=crop",
    tags: ["Python", "TTS", "Neural Networks", "Audio Processing"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Final-Ai-Speech-Synthesis",
    featured: false
  },
  {
    id: 5,
    title: "Cat vs Dog Classifier",
    description: "Binary image classification project using convolutional neural networks to distinguish between cats and dogs. Built with Python, implementing CNN architecture for accurate pet image classification.",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
    tags: ["Python", "CNN", "Image Classification", "Deep Learning"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Image-classification-cat-dog",
    featured: false
  },
  {
    id: 6,
    title: "Azure Computer Vision",
    description: "Cloud-based image analysis application using Microsoft Azure Cognitive Services. Integrates Azure Computer Vision API for object detection, text recognition, and image analysis capabilities.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    tags: ["Python", "Azure", "Computer Vision", "Cloud API"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Azure-Ai-image-analysis",
    featured: false
  },
  {
    id: 7,
    title: "Business Card OCR",
    description: "Optical Character Recognition system for business cards using Azure Form Recognizer. Extracts and structures contact information from business card images with high accuracy.",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
    tags: ["Python", "Azure", "OCR", "Form Recognition"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Azure-Business-card-analyzer",
    featured: false
  }
];

const webProjects = [
  {
    id: 5,
    title: "Interactive Portfolio",
    description: "Personal portfolio website showcasing AI/Data Science projects with 3D solar system navigation. Built with React, Three.js, and Framer Motion, deployed on Vercel with responsive design and interactive animations.",
    image: "https://st2.depositphotos.com/1032577/6582/i/450/depositphotos_65828845-stock-photo-portfolio-written-on-notebook.jpg",
    tags: ["React", "Three.js", "Framer Motion", "Tailwind CSS", "Vercel"],
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
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    tags: ["Python", "BLIP", "AI"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/BLIP-auto-image-captioning",
    featured: false
  },
  {
    id: 10,
    title: "Final AI Speech Synthesis",
    description: "AI-based speech synthesis project.",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=300&fit=crop",
    tags: ["Python", "Speech Synthesis", "AI"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Final-Ai-Speech-Synthesis",
    featured: false
  },
  {
    id: 11,
    title: "Image Classification Cat Dog",
    description: "Cat vs Dog image classification.",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
    tags: ["Python", "Classification", "AI"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Image-classification-cat-dog",
    featured: false
  },
  {
    id: 12,
    title: "Azure AI Image Analysis",
    description: "Image analysis using Azure AI.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    tags: ["Python", "Azure", "AI"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Azure-Ai-image-analysis",
    featured: false
  },
  {
    id: 13,
    title: "Azure Business Card Analyzer",
    description: "Business card analyzer with Azure AI.",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
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
            className="w-full h-full object-cover object-left"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.6 }}
            style={{ objectPosition: 'left center' }}
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
            {project.isGithubRepo && (
              <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-300 border border-green-400/30">
                🔴 LIVE
              </span>
            )}
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
            {project.stars > 0 && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-400/30">
                ⭐ {project.stars}
              </span>
            )}
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
            {project.updated && (
              <span className="block text-xs text-gray-400 mt-2">
                Updated: {new Date(project.updated).toLocaleDateString()}
              </span>
            )}
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
  const [githubProjects, setGithubProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGithubProjects = async () => {
      try {
        const repos = await fetchGitHubRepos();
        const getCustomImage = (repoName, category) => {
          const imageMap = {
            'ai': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=left',
            'ml': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop&crop=left',
            'data': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=left',
            'web': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=left',
            'react': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop&crop=left',
            'python': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop&crop=left',
            'default': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=left'
          };
          
          const name = repoName.toLowerCase();
          if (name.includes('ai') || name.includes('ml') || name.includes('neural')) return imageMap.ai;
          if (name.includes('data') || name.includes('analysis')) return imageMap.data;
          if (name.includes('web') || name.includes('react') || name.includes('portfolio')) return imageMap.react;
          if (name.includes('python')) return imageMap.python;
          if (category === 'AI/ML Projects') return imageMap.ml;
          if (category === 'Web Development') return imageMap.web;
          if (category === 'Data Science') return imageMap.data;
          return imageMap.default;
        };

        const formattedRepos = repos.slice(0, 8).map(repo => ({
          id: `github-${repo.id}`,
          title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          description: repo.description || 'GitHub Repository - Live project automatically synced',
          image: getCustomImage(repo.name, repo.category),
          tags: [repo.language, 'Live', repo.category.split('/')[0]].filter(Boolean),
          demoUrl: '#',
          codeUrl: repo.html_url,
          featured: false,
          isGithubRepo: true,
          stars: repo.stargazers_count,
          updated: repo.updated_at,
          category: repo.category
        }));
        setGithubProjects(formattedRepos);
      } catch (error) {
        console.error('Failed to load GitHub projects:', error);
      } finally {
        setLoading(false);
      }
    };
    loadGithubProjects();
  }, []);

  // Merge GitHub projects with existing categories
  const githubAI = githubProjects.filter(p => p.category === 'AI/ML Projects');
  const githubWeb = githubProjects.filter(p => p.category === 'Web Development');
  const githubMini = githubProjects.filter(p => p.category === 'Mini Projects');
  const githubData = githubProjects.filter(p => p.category === 'Data Science');

  const allAIProjects = [...aiProjects, ...githubAI];
  const allWebProjects = [...webProjects, ...githubWeb];
  const allMiniProjects = [...miniProjects, ...githubMini, ...githubData];
  return (
    <div className="max-w-6xl mx-auto px-6">
      <CinematicText
        variant="glow"
        className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
      >
        Selected Work
      </CinematicText>

      {/* Dropdown/Accordion for project groups */}
      <div className="mb-8 flex gap-4 justify-center flex-wrap">
        <button
          className={`px-6 py-2 rounded-lg font-semibold border ${openGroup === 'featured' ? 'bg-amber-400 text-black' : 'bg-white/10 text-white'}`}
          onClick={() => setOpenGroup('featured')}
        >Featured</button>
        <button
          className={`px-6 py-2 rounded-lg font-semibold border ${openGroup === 'ai' ? 'bg-amber-400 text-black' : 'bg-white/10 text-white'}`}
          onClick={() => setOpenGroup('ai')}
        >AI/ML Projects ({allAIProjects.length})</button>
        <button
          className={`px-6 py-2 rounded-lg font-semibold border ${openGroup === 'web' ? 'bg-amber-400 text-black' : 'bg-white/10 text-white'}`}
          onClick={() => setOpenGroup('web')}
        >Web Projects ({allWebProjects.length})</button>
        <button
          className={`px-6 py-2 rounded-lg font-semibold border ${openGroup === 'mini' ? 'bg-amber-400 text-black' : 'bg-white/10 text-white'}`}
          onClick={() => setOpenGroup('mini')}
        >Mini Projects ({allMiniProjects.length})</button>
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
          {allAIProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
      {openGroup === 'web' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {allWebProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
      {openGroup === 'mini' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {allMiniProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}