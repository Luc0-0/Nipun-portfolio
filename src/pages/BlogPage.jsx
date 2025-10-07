// src/pages/BlogPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import TextReveal from '../components/TextReveal';
import TiltCard from '../components/TiltCard';
import SharedBackground from '../components/SharedBackground';

const BLOG_POSTS = [
  {
    id: 'my-ai-journey',
    title: 'From Zero to AI: My BTech Journey in Data Science',
    excerpt: 'How I discovered my passion for AI during my BTech program, the challenges of maintaining an 8.0 CGPA, and why I chose mental health AI for my final year project.',
    date: '2024-12-15',
    category: 'Personal',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop'
  },
  {
    id: 'python-for-ai',
    title: 'Python Libraries Every AI Student Should Master',
    excerpt: 'My experience learning pandas, numpy, scikit-learn, and TensorFlow. Practical tips for BTech students starting their AI journey with real project examples.',
    date: '2024-12-10',
    category: 'Tutorial',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop'
  },
  {
    id: 'mental-health-ai',
    title: 'Building Mental Health AI: My Final Year Project',
    excerpt: 'Deep dive into my final year project on Mental Health AI Embedded Assistance. The challenges, technologies used, and why this project matters.',
    date: '2024-12-05',
    category: 'Project',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
  },
  {
    id: 'azure-ai-experience',
    title: 'Learning Cloud AI with Microsoft Azure',
    excerpt: 'My hands-on experience with Azure Cognitive Services, Computer Vision API, and Form Recognizer. Real projects and lessons learned.',
    date: '2024-11-28',
    category: 'Tutorial',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
  },
  {
    id: 'coursera-ai-certification',
    title: 'IBM AI Developer Certification: My Experience',
    excerpt: 'Complete review of the IBM AI Developer Professional Certificate on Coursera. What I learned, projects I built, and how it helped my career.',
    date: '2024-11-20',
    category: 'Career',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop'
  }
];

export default function BlogPage() {
  return (
    <SharedBackground>
      <div className="pt-20 pb-12">
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
    </SharedBackground>
  );
}