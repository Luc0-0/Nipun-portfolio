
export default CategoryPage;
function CategoryPage() {
  const { category } = useParams();
  const [githubRepos, setGithubRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const staticRepos = repoData[category] || [];
  const [flipped, setFlipped] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadGithubRepos = async () => {
      try {
        const repos = await fetchGitHubRepos();
        const categoryMap = {
          'machine-learning': 'AI/ML Projects',
          'academic': 'AI/ML Projects',
          'learning': 'Data Science',
          'mini-projects': 'Mini Projects'
        };
        const targetCategory = categoryMap[category];
        const getCustomImage = (repoName, category) => {
          const imageMap = {
            'ai': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
            'ml': 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop',
            'data': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
            'web': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
            'react': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
            'python': 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
            'azure': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop',
            'speech': 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=300&fit=crop',
            'classification': 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop',
            'default': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop'
          };
          
          const name = repoName.toLowerCase();
          if (name.includes('ai') || name.includes('ml') || name.includes('neural')) return imageMap.ai;
          if (name.includes('data') || name.includes('analysis')) return imageMap.data;
          if (name.includes('web') || name.includes('react') || name.includes('portfolio')) return imageMap.react;
          if (name.includes('python')) return imageMap.python;
          if (name.includes('azure')) return imageMap.azure;
          if (name.includes('speech') || name.includes('synthesis')) return imageMap.speech;
          if (name.includes('classification') || name.includes('cat') || name.includes('dog')) return imageMap.classification;
          if (category === 'AI/ML Projects') return imageMap.ml;
          if (category === 'Web Development') return imageMap.web;
          if (category === 'Data Science') return imageMap.data;
          return imageMap.default;
        };

        const filteredRepos = repos
          .filter(repo => repo.category === targetCategory)
          .map(repo => ({
            name: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            url: repo.html_url,
            image: getCustomImage(repo.name, repo.category),
            description: repo.description || 'GitHub Repository - Live project automatically synced',
            techstack: [repo.language, 'Live'].filter(Boolean),
            isGithubRepo: true,
            stars: repo.stargazers_count,
            updated: repo.updated_at
          }));
        setGithubRepos(filteredRepos);
      } catch (error) {
        console.error('Failed to load GitHub repos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadGithubRepos();
  }, [category]);

  const allRepos = [...staticRepos, ...githubRepos];
  
  useEffect(() => {
    setFlipped(Array(allRepos.length).fill(false));
  }, [allRepos.length]);

  const handleFlip = idx => {
    setFlipped(f => f.map((v, i) => (i === idx ? !v : v)));
  };

  const filteredRepos = allRepos.filter(repo => {
    const searchLower = search.toLowerCase();
    return (
      repo.name.toLowerCase().includes(searchLower) ||
      repo.description.toLowerCase().includes(searchLower) ||
      (repo.techstack && repo.techstack.some(tech => tech.toLowerCase().includes(searchLower)))
    );
  });

  return (
    <div className="min-h-screen relative z-10 bg-gradient-to-b from-white to-gray-100 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black py-20">
      <div className="max-w-6xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-amber-400/30 rounded-lg text-amber-300 hover:text-amber-200 hover:bg-white/20 hover:border-amber-400/50 transition-all duration-300 mb-8">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
          {category.replace(/-/g, ' ').toUpperCase()} Projects ({allRepos.length})
        </h1>
        {loading && (
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 text-amber-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-400"></div>
              Loading live repositories...
            </div>
          </div>
        )}
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
                  <div className="absolute w-full h-full backface-hidden rounded-2xl p-8 flex flex-col items-center border border-gray-800 bg-gray-900 dark:bg-black shadow-md transition-all duration-200 hover:shadow-lg cursor-pointer">
                    {repo.isGithubRepo && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-bold border border-green-400/30">
                        🔴 LIVE
                      </div>
                    )}
                    <img src={repo.image} alt={repo.name} className="mb-4 rounded-xl w-full h-32 object-cover object-left shadow-md transition-all duration-200" style={{ objectPosition: 'left center' }} />
                    <h2 className="text-xl font-bold mt-2 text-gray-900 dark:text-white text-center">{repo.name}</h2>
                    {repo.stars > 0 && (
                      <div className="flex items-center gap-1 text-yellow-400 text-sm mt-1">
                        <span>⭐</span>
                        <span>{repo.stars}</span>
                      </div>
                    )}
                    <span className="inline-block px-4 py-2 bg-gray-900 text-amber-200 rounded-lg shadow hover:scale-105 hover:bg-gray-800 mt-2 transition-all duration-200 font-medium tracking-wide border border-gray-700">Click to Flip</span>
                  </div>
                  {/* Back Side */}
                  <div className="absolute w-full h-full backface-hidden rounded-2xl p-8 flex flex-col items-center justify-center border border-gray-800 bg-gray-900 dark:bg-black shadow-md rotate-y-180 transition-all duration-200 hover:shadow-lg cursor-pointer">
                    <h2 className="text-xl font-bold mb-2 text-white text-center">{repo.name}</h2>
                    <p className="text-white mb-4 text-center">{repo.description}</p>
                    {repo.updated && (
                      <p className="text-gray-400 text-xs mb-2">Updated: {new Date(repo.updated).toLocaleDateString()}</p>
                    )}
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


import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchGitHubRepos } from '../utils/githubApi';

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
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      description: "Mental Health AI project - Building an AI system for mental health support using NLP and sentiment analysis. My final year project.",
      techstack: ["Python", "AI", "NLP"]
    }
  ],
  "machine-learning": [
    {
      name: "BLIP-auto-image-captioning",
      url: "https://github.com/Luc0-0/BLIP-auto-image-captioning",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      description: "Image captioning using BLIP. Feed it images, it generates captions. Built with deep learning models.",
      techstack: ["Python", "BLIP", "AI"]
    },
    {
      name: "Final-Ai-Speech-Synthesis",
      url: "https://github.com/Luc0-0/Final-Ai-Speech-Synthesis",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=300&fit=crop",
      description: "Text-to-speech using neural networks. Type text, get speech output. Works pretty well.",
      techstack: ["Python", "Speech Synthesis", "AI"]
    },
    {
      name: "Image-classification-cat-dog",
      url: "https://github.com/Luc0-0/Image-classification-cat-dog",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
      description: "Cat vs dog classifier using CNNs. Classic ML project for learning image classification.",
      techstack: ["Python", "Classification", "AI"]
    },
    {
      name: "Azure-Ai-image-analysis",
      url: "https://github.com/Luc0-0/Azure-Ai-image-analysis",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      description: "Image analysis with Azure AI. Detects objects, reads text, tags images. Cloud-based.",
      techstack: ["Python", "Azure", "AI"]
    },
    {
      name: "Azure-Business-card-analyzer",
      url: "https://github.com/Luc0-0/Azure-Business-card-analyzer",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
      description: "Business card scanner using Azure. Extracts contact info from card photos.",
      techstack: ["Python", "Azure", "AI"]
    },
    {
      name: "Smart-notes-by-Nipun",
      url: "https://github.com/Luc0-0/Smart-notes-by-Nipun",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      description: "Note-taking app with search and organization. Built with React and Python backend.",
      techstack: ["React", "Notes", "Productivity"]
    }
  ],
  learning: [
    {
      name: "Final-Ai-Speech-Synthesis",
      url: "https://github.com/Luc0-0/Final-Ai-Speech-Synthesis",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=300&fit=crop",
      description: "Text-to-speech using neural networks. Type text, get speech output. Works pretty well.",
      techstack: ["Python", "Speech Synthesis", "AI"]
    },
    {
      name: "flashcard-generator",
      url: "https://github.com/Luc0-0/flashcard-generator",
      image: "https://images.unsplash.com/photo-1606868306217-dbf5046868d2?w=400&h=300&fit=crop",
      description: "Flashcard app for studying. Has spaced repetition and custom decks.",
      techstack: ["React", "Flashcards", "Learning"]
    },
    {
      name: "Azure-Ai-image-analysis",
      url: "https://github.com/Luc0-0/Azure-Ai-image-analysis",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      description: "Image analysis with Azure AI. Detects objects, reads text, tags images. Cloud-based.",
      techstack: ["Python", "Azure", "AI"]
    },
    {
      name: "Image-classification-cat-dog",
      url: "https://github.com/Luc0-0/Image-classification-cat-dog",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
      description: "Cat vs dog classifier using CNNs. Classic ML project for learning image classification.",
      techstack: ["Python", "Classification", "AI"]
    },
    {
      name: "Azure-Business-card-analyzer",
      url: "https://github.com/Luc0-0/Azure-Business-card-analyzer",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
      description: "Business card scanner using Azure. Extracts contact info from card photos.",
      techstack: ["Python", "Azure", "AI"]
    },
    {
      name: "BLIP-auto-image-captioning",
      url: "https://github.com/Luc0-0/BLIP-auto-image-captioning",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      description: "Image captioning using BLIP. Feed it images, it generates captions. Built with deep learning models.",
      techstack: ["Python", "BLIP", "AI"]
    },
    {
      name: "oaqjp-final-project-emb-ai",
      url: "https://github.com/Luc0-0/oaqjp-final-project-emb-ai",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      description: "Embedded AI project for real-time data processing on edge devices.",
      techstack: ["Python", "AI", "Azure"]
    }
  ],
  "mini-projects": [
    {
      name: "BLIP-auto-image-captioning",
      url: "https://github.com/Luc0-0/BLIP-auto-image-captioning",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
      description: "Image captioning using BLIP. Feed it images, it generates captions. Built with deep learning models.",
      techstack: ["Python", "BLIP", "AI"]
    },
    {
      name: "Final-Ai-Speech-Synthesis",
      url: "https://github.com/Luc0-0/Final-Ai-Speech-Synthesis",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=300&fit=crop",
      description: "Text-to-speech using neural networks. Type text, get speech output. Works pretty well.",
      techstack: ["Python", "Speech Synthesis", "AI"]
    },
    {
      name: "Image-classification-cat-dog",
      url: "https://github.com/Luc0-0/Image-classification-cat-dog",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
      description: "Cat vs dog classifier using CNNs. Classic ML project for learning image classification.",
      techstack: ["Python", "Classification", "AI"]
    },
    {
      name: "Azure-Ai-image-analysis",
      url: "https://github.com/Luc0-0/Azure-Ai-image-analysis",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      description: "Image analysis with Azure AI. Detects objects, reads text, tags images. Cloud-based.",
      techstack: ["Python", "Azure", "AI"]
    },
    {
      name: "Azure-Business-card-analyzer",
      url: "https://github.com/Luc0-0/Azure-Business-card-analyzer",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
      description: "Business card scanner using Azure. Extracts contact info from card photos.",
      techstack: ["Python", "Azure", "AI"]
    }
  ]
};


