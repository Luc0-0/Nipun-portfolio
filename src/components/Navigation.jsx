// src/components/Navigation.jsx
// Navigation bar with theme matching

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'solar-system', label: 'Navigation', path: '/#solar-system' },
  { id: 'about', label: 'About', path: '/#about' },
  { id: 'skills', label: 'Skills', path: '/#ai-skills' },
  { id: 'projects', label: 'Projects', path: '/#project1' },
  { id: 'showcase', label: 'Showcase', path: '/#projectshowcase' },
  { id: 'live-projects', label: 'Live Projects', path: '/live-projects' },
  { id: 'achievements', label: 'Achievements', path: '/#achievements' },
  { id: 'blog', label: 'Blog', path: '/#/blog' },
  { id: 'contact', label: 'Contact', path: '/#contact' }
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      setIsVisible(scrollY > 300);
      
      // Update active section based on scroll position
      const sections = ['solar-system', 'about', 'ongoing', 'ai-skills', 'web-skills', 'project1', 'project2', 'project3', 'miniprojects', 'learning', 'achievements', 'services', 'contact'];
      let current = 'home';
      
      // Check for showcase section
      const showcaseElement = document.querySelector('.project-showcase-anchor');
      if (showcaseElement) {
        const showcaseRect = showcaseElement.getBoundingClientRect();
        if (showcaseRect.top <= 150 && showcaseRect.bottom >= 150) {
          current = 'showcase';
        }
      }
      
      // Check other sections if showcase not active
      if (current !== 'showcase') {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150) {
              current = section;
            }
          }
        }
      }
      
      // Map section IDs to nav item IDs
      const sectionToNavMap = {
        'solar-system': 'solar-system',
        'about': 'about',
        'ongoing': 'about',
        'ai-skills': 'skills',
        'web-skills': 'skills',
        'project1': 'projects',
        'project2': 'projects',
        'project3': 'projects',
        'miniprojects': 'projects',
        'learning': 'projects',
        'showcase': 'showcase',
        'achievements': 'achievements',
        'services': 'contact',
        'contact': 'contact'
      };
      
      setActiveSection(sectionToNavMap[current] || 'home');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item) => {
    if (item.id === 'blog') {
      window.location.href = '/#/blog';
    } else if (item.id === 'live-projects') {
      window.open('/live-projects', '_blank');
    } else if (item.id === 'showcase') {
      const element = document.querySelector('.project-showcase-anchor');
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      }
    } else if (item.id === 'solar-system') {
      const element = document.querySelector('.solar-system-section');
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      }
    } else if (item.id === 'achievements') {
      const element = document.getElementById('achievements');
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      }
    } else if (item.path.startsWith('/#')) {
      const sectionId = item.path.substring(2);
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.lenis?.scrollTo(elementPosition - offset);
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/80 backdrop-blur-lg border-b border-amber-400/20 shadow-lg shadow-amber-400/10' 
        : 'bg-transparent'
    } ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-amber-100 hover:from-amber-200 hover:to-amber-300 transition-all duration-300"
          >
            NS
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-amber-300'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-300 hover:text-white transition-colors duration-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}