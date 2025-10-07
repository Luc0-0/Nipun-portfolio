import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getReposByCategory } from '../utils/githubApi';
import TextReveal from './TextReveal';
import SharedBackground from './SharedBackground';

const AutoProjectShowcase = () => {
  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const categorizedRepos = await getReposByCategory();
        setProjects(categorizedRepos);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const categories = ['All', ...Object.keys(projects)];
  const allProjects = Object.values(projects).flat();
  const displayProjects = selectedCategory === 'All' ? allProjects : projects[selectedCategory] || [];

  if (loading) {
    return (
      <SharedBackground>
        <div className="pt-20 pb-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading projects from GitHub...</p>
            </div>
          </div>
        </div>
      </SharedBackground>
    );
  }

  return (
    <SharedBackground>
      <div className="pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <TextReveal>
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-3 text-amber-300 hover:text-amber-200 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Homepage
            </Link>
          </div>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100 mb-4">
              Live Projects
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Automatically synced from my GitHub repositories
            </p>
          </div>
        </TextReveal>

        {/* Category Filter */}
        <TextReveal delay={100}>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category} {category !== 'All' && `(${projects[category]?.length || 0})`}
              </button>
            ))}
          </div>
        </TextReveal>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => (
            <TextReveal key={project.id} delay={index * 50}>
              <div className="bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                    <span className="text-sm text-amber-300 bg-amber-500/20 px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.stargazers_count > 0 && (
                      <div className="flex items-center gap-1 text-gray-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm">{project.stargazers_count}</span>
                      </div>
                    )}
                    {project.language && (
                      <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
                        {project.language}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-100 transition-colors">
                  {project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </h3>

                <p className="text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {project.topics && project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.topics.slice(0, 3).map((topic) => (
                      <span key={topic} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">
                    Updated {new Date(project.updated_at).toLocaleDateString()}
                  </span>
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    View Code
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </TextReveal>
          ))}
        </div>

        {displayProjects.length === 0 && !loading && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </div>
        )}

        <TextReveal delay={300}>
          <div className="text-center mt-12">
            <a
              href="https://github.com/Luc0-0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-amber-500/20 text-amber-300 px-8 py-4 rounded-full hover:bg-amber-500/30 transition-all duration-300 border border-amber-400/30"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              View All on GitHub
            </a>
          </div>
        </TextReveal>
      </div>
      </div>
    </SharedBackground>
  );
};

export default AutoProjectShowcase;