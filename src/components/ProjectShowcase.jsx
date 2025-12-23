// src/components/ProjectShowcase.jsx
import { motion } from 'framer-motion';
import { useState } from 'react';
import CinematicText from './CinematicText';
import projectsData from '../data/projects.json';
import { useAnalytics } from '../hooks/useAnalytics';

// Helper to format static data to component shape
const formatProject = (repo) => ({
  id: `github-${repo.id}`,
  title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
  description: repo.description || 'GitHub Repository',
  image: getCustomImage(repo.name, repo.category),
  tags: [...repo.tech, 'Live'],
  demoUrl: repo.liveUrl || '#',
  codeUrl: repo.repoUrl,
  featured: false,
  isGithubRepo: true,
  stars: repo.stars,
  updated: repo.lastUpdated,
  category: repo.category
});

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
  if (category === 'ai-systems') return imageMap.ai;
  if (category === 'production') return imageMap.web;
  if (name.includes('python')) return imageMap.python;
  return imageMap.default;
};

// ... kept static featuredProjects arrays ...

// Categorized project groups
const featuredProjects = [
  {
    id: 1,
    title: "Task Manager Pro",
    description: "Task manager I built to learn full-stack dev. Has user auth, real-time updates, and works pretty smoothly. React frontend, Node backend, MongoDB for data. Deployed on Vercel.",
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
    description: "Note-taking app with search and cloud sync. Built with React and Firebase. Saves everything in real-time so you never lose your notes.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    video: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    tags: ["React", "Firebase", "Cloud Storage", "Real-time Sync"],
    demoUrl: "https://elevated-notes--smart-notes-luc-edition.asia-east1.hosted.app/",
    codeUrl: "https://github.com/Luc0-0/Smart-notes-by-Nipun",
    featured: true
  },
  {
    id: 3,
    title: "Samarth - Data Science Platform",
    description: "Data science platform I'm working on. Has analytics, visualizations, and some ML features. Still adding more tools but the core stuff works well.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    video: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    tags: ["Data Science", "Analytics", "Machine Learning", "Visualization", "Python"],
    demoUrl: "https://samarth-two.vercel.app",
    codeUrl: "https://github.com/Luc0-0/samarth",
    featured: true
  }
];

const aiProjects = [
  {
    id: 3,
    title: "BLIP Image Captioning System",
    description: "Image captioning using BLIP. Feed it an image, it tells you what's in it. Built with Python and the transformers library.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    tags: ["Python", "BLIP", "Computer Vision", "Transformers"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/BLIP-auto-image-captioning",
    featured: false
  },
  {
    id: 4,
    title: "AI Speech Synthesis",
    description: "Text-to-speech project using neural networks. Type something, it speaks it out. Pretty cool to see AI generate human-like speech.",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=300&fit=crop",
    tags: ["Python", "TTS", "Neural Networks", "Audio Processing"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Final-Ai-Speech-Synthesis",
    featured: false
  },
  {
    id: 5,
    title: "Cat vs Dog Classifier",
    description: "Classic cat vs dog classifier using CNNs. Good learning project for understanding image classification. Works surprisingly well.",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
    tags: ["Python", "CNN", "Image Classification", "Deep Learning"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Image-classification-cat-dog",
    featured: false
  },
  {
    id: 6,
    title: "Azure Computer Vision",
    description: "Image analysis using Azure's Computer Vision API. Detects objects, reads text from images, and analyzes content. Cloud-based so it's fast.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
    tags: ["Python", "Azure", "Computer Vision", "Cloud API"],
    demoUrl: "#",
    codeUrl: "https://github.com/Luc0-0/Azure-Ai-image-analysis",
    featured: false
  },
  {
    id: 7,
    title: "Business Card OCR",
    description: "OCR for business cards using Azure. Snap a photo of a card, it extracts all the contact info. Saves a lot of manual typing.",
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
    description: "This portfolio you're looking at right now. 3D solar system navigation, auto-syncing GitHub projects, and an AI chatbot. Built with React and Three.js.",
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

// ... ProjectCard component kept as is ...

export default function ProjectShowcase() {
  const [openGroup, setOpenGroup] = useState('featured');

  // Compute categories from static data
  const syncedAI = projectsData.filter(p => p.category === 'ai-systems').map(formatProject);
  const syncedWeb = projectsData.filter(p => p.category === 'production').map(formatProject);
  const syncedMini = projectsData.filter(p => ['learning', 'libraries'].includes(p.category)).map(formatProject);

  // Merge with hardcoded featured items (deduplicating by ID/URL if needed, but simple concat for now to preserve "featured" manual entries)
  // We filter out hardcoded items from synced list to avoid overlap if ID matches, but IDs are different ("1" vs "github-task-manager-pro")
  // For simplicity, we just display both, or prefer synced.

  const allAIProjects = [...aiProjects, ...syncedAI];
  const allWebProjects = [...webProjects, ...syncedWeb];
  const allMiniProjects = [...miniProjects, ...syncedMini];

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