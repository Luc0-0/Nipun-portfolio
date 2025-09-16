
export default CategoryPage;
function CategoryPage({ category }) {
  const repos = repoData[category] || [];
  const [flipped, setFlipped] = useState(Array(repos.length).fill(false));
  const [search, setSearch] = useState("");

  const handleFlip = idx => {
    setFlipped(f => f.map((v, i) => (i === idx ? !v : v)));
  };

  const filteredRepos = repos.filter(repo => {
    const searchLower = search.toLowerCase();
    return (
      repo.name.toLowerCase().includes(searchLower) ||
      repo.description.toLowerCase().includes(searchLower) ||
      (repo.techstack && repo.techstack.some(tech => tech.toLowerCase().includes(searchLower)))
    );
  });

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-white to-gray-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
          {category.replace(/-/g, ' ').toUpperCase()} Projects
        </h1>
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, description, or tech..."
            className="w-full max-w-md px-4 py-2 rounded-lg border border-amber-400/30 bg-white/80 dark:bg-gray-900/60 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredRepos.length === 0 ? (
            <p className="text-center text-gray-400">No repositories found for this category.</p>
          ) : (
            filteredRepos.map((repo, idx) => (
              <div
                key={repo.name}
                className="perspective"
                style={{ perspective: '1200px' }}
              >
                <div
                  className={`relative w-full h-80 transition-transform duration-700 transform-style-preserve-3d ${flipped[idx] ? 'rotate-y-180' : ''}`}
                  style={{ transform: flipped[idx] ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                  onClick={() => handleFlip(idx)}
                >
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden bg-white/90 dark:bg-gray-900/80 rounded-2xl p-8 flex flex-col items-center border border-amber-400/20 shadow-lg hover:shadow-amber-400/30 cursor-pointer">
                    <img src={repo.image} alt={repo.name} className="mb-4 rounded-lg w-full h-32 object-cover" />
                    <h2 className="text-xl font-bold mt-2 text-gray-900 dark:text-white text-center">{repo.name}</h2>
                    <span className="inline-block px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 mt-2">Click to Flip</span>
                  </div>
                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-amber-400/80 to-orange-500/80 rounded-2xl p-8 flex flex-col items-center justify-center border border-amber-400/20 shadow-lg rotate-y-180 cursor-pointer">
                    <h2 className="text-xl font-bold mb-2 text-white text-center">{repo.name}</h2>
                    <p className="text-white mb-4 text-center">{repo.description}</p>
                    {repo.techstack && repo.techstack.length > 0 && (
                      <div className="flex flex-wrap gap-2 justify-center mb-2">
                        {repo.techstack.map((tech, i) => (
                          <span key={i} className="flex items-center gap-1 px-3 py-1 text-xs bg-white/20 text-white rounded-full border border-white/30">
                            <span>{techIcons[tech] || '🔧'}</span>
                            <span>{tech}</span>
                          </span>
                        ))}
                      </div>
                    )}
                    <a href={repo.url} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-white text-amber-600 rounded hover:bg-amber-100 mt-2 font-bold">View on GitHub</a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';

const techIcons = {
  Python: '🐍',
  BLIP: '🖼️',
  AI: '🤖',
  'Speech Synthesis': '🔊',
  Classification: '📊',
  Azure: '☁️',
  React: '⚛️',
  Notes: '📝',
  Productivity: '🚀',
  Flashcards: '📇',
};

const repoData = {
  academic: [
    {
      name: "Grand Final Year Project",
      url: "#",
      image: "https://placehold.co/400x300?text=Coming+Soon",
      description: "A comprehensive AI-powered solution for real-world problems, integrating advanced machine learning, data analytics, and cloud deployment. Stay tuned for details!",
      techstack: ["Python", "AI", "Azure"]
    }
  ],
  "machine-learning": [
    {
      name: "BLIP-auto-image-captioning",
      url: "https://github.com/Luc0-0/BLIP-auto-image-captioning",
      image: "https://placehold.co/400x300?text=ML+Project",
      description: "A project leveraging BLIP for automatic image captioning. Utilizes deep learning models to generate captions for images, improving accessibility and search.",
      techstack: ["Python", "BLIP", "AI"]
    },
    {
      name: "Final-Ai-Speech-Synthesis",
      url: "https://github.com/Luc0-0/Final-Ai-Speech-Synthesis",
      image: "https://placehold.co/400x300?text=ML+Project",
      description: "End-to-end AI-based speech synthesis system. Converts text to natural-sounding speech using neural networks and advanced signal processing.",
      techstack: ["Python", "Speech Synthesis", "AI"]
    },
    {
      name: "Image-classification-cat-dog",
      url: "https://github.com/Luc0-0/Image-classification-cat-dog",
      image: "https://placehold.co/400x300?text=ML+Project",
      description: "A supervised learning project for classifying cat and dog images. Implements CNN architectures and data augmentation for robust results.",
      techstack: ["Python", "Classification", "AI"]
    },
    {
      name: "Azure-Ai-image-analysis",
      url: "https://github.com/Luc0-0/Azure-Ai-image-analysis",
      image: "https://placehold.co/400x300?text=ML+Project",
      description: "Image analysis using Azure AI services. Integrates cloud APIs for object detection, OCR, and image tagging in scalable workflows.",
      techstack: ["Python", "Azure", "AI"]
    },
    {
      name: "Azure-Business-card-analyzer",
      url: "https://github.com/Luc0-0/Azure-Business-card-analyzer",
      image: "https://placehold.co/400x300?text=ML+Project",
      description: "Business card analyzer powered by Azure AI. Extracts contact info and organizes it using NLP and cloud automation.",
      techstack: ["Python", "Azure", "AI"]
    },
    {
      name: "Smart-notes-by-Nipun",
      url: "https://github.com/Luc0-0/Smart-notes-by-Nipun",
      image: "https://placehold.co/400x300?text=ML+Project",
      description: "A smart note-taking app with AI features for organization, search, and productivity. Built with React and Python back-end integration.",
      techstack: ["React", "Notes", "Productivity"]
    }
  ],
  learning: [
    {
      name: "Final-Ai-Speech-Synthesis",
      url: "https://github.com/Luc0-0/Final-Ai-Speech-Synthesis",
      image: "https://placehold.co/400x300?text=Learning+Project",
      description: "End-to-end AI-based speech synthesis system. Converts text to natural-sounding speech using neural networks and advanced signal processing.",
      techstack: ["Python", "Speech Synthesis", "AI"]
    },
    {
      name: "flashcard-generator",
      url: "https://github.com/Luc0-0/flashcard-generator",
      image: "https://placehold.co/400x300?text=Learning+Project",
      description: "A flashcard generator for efficient study and memorization. Features spaced repetition and customizable decks.",
      techstack: ["React", "Flashcards", "Learning"]
    },
    {
      name: "Azure-Ai-image-analysis",
      url: "https://github.com/Luc0-0/Azure-Ai-image-analysis",
      image: "https://placehold.co/400x300?text=Learning+Project",
      description: "Image analysis using Azure AI services. Integrates cloud APIs for object detection, OCR, and image tagging in scalable workflows.",
      techstack: ["Python", "Azure", "AI"]
    },
    {
      name: "Image-classification-cat-dog",
      url: "https://github.com/Luc0-0/Image-classification-cat-dog",
      image: "https://placehold.co/400x300?text=Learning+Project",
      description: "A supervised learning project for classifying cat and dog images. Implements CNN architectures and data augmentation for robust results.",
      techstack: ["Python", "Classification", "AI"]
    },
    {
      name: "Azure-Business-card-analyzer",
      url: "https://github.com/Luc0-0/Azure-Business-card-analyzer",
      image: "https://placehold.co/400x300?text=Learning+Project",
      description: "Business card analyzer powered by Azure AI. Extracts contact info and organizes it using NLP and cloud automation.",
      techstack: ["Python", "Azure", "AI"]
    },
    {
      name: "BLIP-auto-image-captioning",
      url: "https://github.com/Luc0-0/BLIP-auto-image-captioning",
      image: "https://placehold.co/400x300?text=Learning+Project",
      description: "A project leveraging BLIP for automatic image captioning. Utilizes deep learning models to generate captions for images, improving accessibility and search.",
      techstack: ["Python", "BLIP", "AI"]
    },
    {
      name: "oaqjp-final-project-emb-ai",
      url: "https://github.com/Luc0-0/oaqjp-final-project-emb-ai",
      image: "https://placehold.co/400x300?text=Learning+Project",
      description: "Embedded AI final project focused on real-time data processing and model deployment on edge devices.",
      techstack: ["Python", "AI", "Azure"]
    }
  ],
  "mini-projects": [
    {
      name: "BLIP-auto-image-captioning",
      url: "https://github.com/Luc0-0/BLIP-auto-image-captioning",
      image: "https://placehold.co/400x300?text=Mini+Project",
      description: "A project leveraging BLIP for automatic image captioning. Utilizes deep learning models to generate captions for images, improving accessibility and search.",
      techstack: ["Python", "BLIP", "AI"]
    },
    {
      name: "Final-Ai-Speech-Synthesis",
      url: "https://github.com/Luc0-0/Final-Ai-Speech-Synthesis",
      image: "https://placehold.co/400x300?text=Mini+Project",
      description: "End-to-end AI-based speech synthesis system. Converts text to natural-sounding speech using neural networks and advanced signal processing.",
      techstack: ["Python", "Speech Synthesis", "AI"]
    },
    {
      name: "Image-classification-cat-dog",
      url: "https://github.com/Luc0-0/Image-classification-cat-dog",
      image: "https://placehold.co/400x300?text=Mini+Project",
      description: "A supervised learning project for classifying cat and dog images. Implements CNN architectures and data augmentation for robust results.",
      techstack: ["Python", "Classification", "AI"]
    },
    {
      name: "Azure-Ai-image-analysis",
      url: "https://github.com/Luc0-0/Azure-Ai-image-analysis",
      image: "https://placehold.co/400x300?text=Mini+Project",
      description: "Image analysis using Azure AI services. Integrates cloud APIs for object detection, OCR, and image tagging in scalable workflows.",
      techstack: ["Python", "Azure", "AI"]
    },
    {
      name: "Azure-Business-card-analyzer",
      url: "https://github.com/Luc0-0/Azure-Business-card-analyzer",
      image: "https://placehold.co/400x300?text=Mini+Project",
      description: "Business card analyzer powered by Azure AI. Extracts contact info and organizes it using NLP and cloud automation.",
      techstack: ["Python", "Azure", "AI"]
    }
  ]
};


