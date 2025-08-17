// src/pages/BlogPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import TextReveal from '../components/TextReveal';
import TiltCard from '../components/TiltCard';

const BLOG_POSTS = [
  {
    id: 'my-ai-journey',
    title: 'My Journey into AI and Machine Learning',
    excerpt: 'How I started learning AI as a student and the challenges I faced along the way.',
    date: '2024-01-15',
    category: 'Personal',
    readTime: '5 min read',
    image: '/images/blog/ai-journey.jpg'
  },
  {
    id: 'python-for-beginners',
    title: 'Python Fundamentals for Data Science',
    excerpt: 'Essential Python concepts every data science student should master.',
    date: '2024-01-20',
    category: 'Tutorial',
    readTime: '8 min read',
    image: '/images/blog/python-basics.jpg'
  },
  {
    id: 'first-ml-project',
    title: 'Building My First Machine Learning Model',
    excerpt: 'Step-by-step guide to creating a sentiment analysis model using scikit-learn.',
    date: '2024-02-01',
    category: 'Project',
    readTime: '12 min read',
    image: '/images/blog/ml-project.jpg'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-20 pb-12" style={{ background: 'linear-gradient(to bottom, #000011, #000033)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 transition-colors duration-300 mb-8">
          ← Back to Home
        </Link>

        <TextReveal>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100">
              Blog & Insights
            </h1>
            <p className="text-xl text-gray-300">Sharing my learning journey in AI and Data Science</p>
          </div>
        </TextReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <TextReveal key={post.id} delay={index * 100}>
              <TiltCard className="bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-2xl overflow-hidden hover:border-amber-400/40 transition-all duration-300">
                <div className="aspect-video bg-gradient-to-br from-amber-500/20 to-purple-500/20 flex items-center justify-center">
                  <div className="text-6xl opacity-50">📝</div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 text-xs bg-amber-500/20 text-amber-300 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-400">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 hover:text-amber-100 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{post.date}</span>
                    <Link 
                      to={`/blog/${post.id}`}
                      className="text-amber-300 hover:text-amber-200 text-sm font-medium transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </TextReveal>
          ))}
        </div>

        {/* Coming Soon Section */}
        <TextReveal delay={400}>
          <div className="text-center mt-16">
            <div className="bg-white/5 backdrop-blur-sm border border-amber-400/20 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">More Articles Coming Soon!</h2>
              <p className="text-gray-300 mb-6">
                I'm constantly learning and sharing new insights about AI, machine learning, and data science.
              </p>
              <div className="flex justify-center gap-4">
                <span className="px-4 py-2 bg-amber-500/10 text-amber-300 rounded-full text-sm">
                  Deep Learning Basics
                </span>
                <span className="px-4 py-2 bg-amber-500/10 text-amber-300 rounded-full text-sm">
                  Data Visualization
                </span>
                <span className="px-4 py-2 bg-amber-500/10 text-amber-300 rounded-full text-sm">
                  Career Tips
                </span>
              </div>
            </div>
          </div>
        </TextReveal>
      </div>
    </div>
  );
}