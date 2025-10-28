import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Add CSS animations
const rocketStyles = `
  @keyframes rocketFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes trailPulse {
    0% { opacity: 0.6; height: 8px; }
    100% { opacity: 1; height: 16px; }
  }
`;

if (typeof document !== 'undefined' && !document.getElementById('rocket-styles')) {
  const style = document.createElement('style');
  style.id = 'rocket-styles';
  style.textContent = rocketStyles;
  document.head.appendChild(style);
}

const timelineData = [
  {
    year: '2020',
    title: '10th Grade - KV Delhi',
    description: 'Completed 10th standard at Kendriya Vidyalaya Delhi with strong foundation in mathematics and science',
    type: 'education',
    icon: '📚',
    color: 'from-blue-400 to-purple-500',
    glow: '#4169E1'
  },
  {
    year: '2021',
    title: 'Python Journey Begins',
    description: 'Started learning Python programming at Kendriya Vidyalaya - First step into coding universe',
    type: 'skill',
    icon: '🐍',
    color: 'from-green-400 to-blue-500',
    glow: '#32CD32'
  },
  {
    year: '2022',
    title: '12th Grade - KV Kannur',
    description: 'Completed 12th standard at Kendriya Vidyalaya Kannur, focusing on Science stream with excellence',
    type: 'education',
    icon: '🎓',
    color: 'from-purple-400 to-pink-500',
    glow: '#9370DB'
  },
  {
    year: '2022',
    title: 'BTech AI-DS at Kathir College',
    description: 'Joined Kathir College of Engineering for BTech in Artificial Intelligence and Data Science - The AI adventure begins',
    type: 'education',
    icon: '🏛️',
    color: 'from-amber-400 to-orange-500',
    glow: '#FFA500'
  },
  {
    year: '2024',
    title: 'IBM AI Developer Certified',
    description: 'Completed IBM AI Developer Professional Certificate on Coursera with multiple AI/ML specializations',
    type: 'certification',
    icon: '🏆',
    color: 'from-yellow-400 to-red-500',
    glow: '#FFD700'
  },
  {
    year: '2024',
    title: 'Mental Health AI Project',
    description: 'Leading final year project on Mental Health AI Embedded Assistance system - Building AI for good',
    type: 'project',
    icon: '💚',
    color: 'from-emerald-400 to-teal-500',
    glow: '#20B2AA'
  },
  {
    year: '2026',
    title: 'Expected Graduation',
    description: 'Graduating with BTech AI-DS (Current CGPA: 8.0) - Ready to launch into the AI industry',
    type: 'future',
    icon: '🚀',
    color: 'from-indigo-400 to-purple-600',
    glow: '#8A2BE2'
  }
];

export default function Timeline() {
  const { isSpace, isDark } = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rocketPosition, setRocketPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const observerRef = useRef();
  const timelineRef = useRef();
  const rocketRef = useRef();
  const starsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const elementTop = rect.top;
        const elementHeight = rect.height;
        
        // Calculate smooth progress based on timeline visibility
        const startOffset = viewportHeight * 0.8;
        const endOffset = viewportHeight * 0.2;
        const scrollStart = -elementTop + startOffset;
        const scrollEnd = elementHeight - endOffset;
        const progress = Math.max(0, Math.min(1, scrollStart / scrollEnd));
        
        setScrollProgress(progress);
        
        // Calculate rocket position relative to timeline items
        const items = document.querySelectorAll('.timeline-item');
        let targetPosition = 0;
        
        items.forEach((item, index) => {
          const itemRect = item.getBoundingClientRect();
          const itemCenter = itemRect.top + itemRect.height / 2;
          const viewportCenter = viewportHeight / 2;
          
          if (itemCenter <= viewportCenter && itemCenter >= viewportCenter - 200) {
            targetPosition = (index / (items.length - 1)) * 100;
          }
        });
        
        setRocketPosition(targetPosition);
      }
    };

    const handleMouseMove = (e) => {
      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 100, y: y * 100 });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = document.querySelectorAll('.timeline-item');
    items.forEach(item => observerRef.current.observe(item));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div ref={timelineRef} className="py-20 relative overflow-hidden min-h-screen z-0">


      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Space-themed header */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-block relative">
            <h2 className={`text-4xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 text-transparent bg-clip-text ${
              isSpace 
                ? 'bg-gradient-to-r from-cyan-400 via-purple-400 to-amber-400' 
                : 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-500'
            }`}>
              My Journey
            </h2>
            <div className={`absolute -inset-4 blur-xl rounded-full opacity-50 ${
              isSpace 
                ? 'bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-amber-400/20' 
                : 'bg-gradient-to-r from-amber-400/20 via-orange-500/20 to-red-500/20'
            }`}></div>
            <div className={`h-1 rounded-full ${
              isSpace 
                ? 'bg-gradient-to-r from-transparent via-cyan-400 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-amber-400 to-transparent'
            }`}></div>
          </div>
          <p className={`text-lg md:text-xl mt-6 md:mt-8 max-w-2xl mx-auto px-4 ${
            isSpace ? 'text-gray-200' : 'text-gray-600 dark:text-gray-300'
          }`}>
            A timeline of academic achievements and professional growth
          </p>
        </div>

        <div className="relative">
          {/* 3D Timeline line with glow and depth */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-1 md:w-2 h-full">
            <div className={`w-full h-full rounded-full shadow-2xl ${
              isSpace 
                ? 'bg-gradient-to-b from-cyan-400 via-purple-500 to-amber-400' 
                : isDark
                  ? 'bg-gradient-to-b from-amber-400 via-orange-500 to-red-500'
                  : 'bg-gradient-to-b from-gray-800 via-gray-900 to-black'
            }`} style={{
              boxShadow: isSpace 
                ? '0 0 20px #00FFFF, 0 0 40px #8A2BE2, 0 0 60px #FFA500' 
                : isDark
                  ? '0 0 20px #FFA500, 0 0 40px #FF6347, 0 0 60px #DC143C'
                  : '0 0 20px #374151, 0 0 40px #111827, 0 0 60px #000000'
            }}></div>
            <div className={`absolute inset-0 w-full h-full rounded-full blur-md opacity-60 ${
              isSpace 
                ? 'bg-gradient-to-b from-cyan-400 via-purple-500 to-amber-400' 
                : isDark
                  ? 'bg-gradient-to-b from-amber-400 via-orange-500 to-red-500'
                  : 'bg-gradient-to-b from-gray-800 via-gray-900 to-black'
            }`}></div>
            <div className={`absolute inset-0 w-full h-full rounded-full blur-lg opacity-30 ${
              isSpace 
                ? 'bg-gradient-to-b from-cyan-400 via-purple-500 to-amber-400' 
                : isDark
                  ? 'bg-gradient-to-b from-amber-400 via-orange-500 to-red-500'
                  : 'bg-gradient-to-b from-gray-800 via-gray-900 to-black'
            }`}></div>
          </div>

          {/* Smoothly animated rocket */}
          <div 
            ref={rocketRef}
            className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 z-30"
            style={{
              top: `${rocketPosition}%`,
              filter: 'drop-shadow(0 0 15px #FFA500)',
              transition: 'top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            <div 
              className="text-2xl md:text-4xl" 
              style={{
                transform: `rotate(${rocketPosition * 3.6}deg) translateX(${mousePosition.x * 0.1}px) translateY(${mousePosition.y * 0.1}px)`,
                transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                animation: 'rocketFloat 3s ease-in-out infinite'
              }}
            >
              🚀
            </div>
            {/* Enhanced rocket trail */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-12 bg-gradient-to-t from-orange-500 via-red-400 to-transparent opacity-80 blur-sm" style={{
                animation: 'trailPulse 1s ease-in-out infinite alternate'
              }}></div>
            </div>
            {/* Rocket glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-orange-400/30 rounded-full blur-lg animate-pulse"></div>
          </div>

          {timelineData.map((item, index) => {
            const isVisible = visibleItems.has(index);
            const isActive = activeIndex === index;
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                data-index={index}
                className={`timeline-item relative flex items-center mb-12 md:mb-20 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                } flex-row md:${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* 3D Timeline node with glow */}
                <div className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-8 md:w-12 h-8 md:h-12 rounded-full z-20 transition-all duration-500 ${
                  isActive ? 'scale-125' : 'scale-100'
                }`}>
                  <div className={`w-full h-full bg-gradient-to-r ${item.color} rounded-full shadow-2xl flex items-center justify-center border-4 border-white/20`} style={{
                    boxShadow: `0 0 20px ${item.glow}, 0 0 40px ${item.glow}40`
                  }}>
                    <span className="text-white text-sm md:text-lg font-bold drop-shadow-lg">{item.icon}</span>
                  </div>
                  {isActive && (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full animate-ping opacity-60`}></div>
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full animate-pulse opacity-40`}></div>
                    </>
                  )}
                </div>

                {/* 3D Content card with space theme */}
                <div className={`w-full md:w-5/12 pl-20 md:${isLeft ? 'pr-16' : 'pl-16'} md:pl-0 transition-all duration-700 ${
                  isActive ? 'md:scale-110 md:-translate-y-4' : 'scale-100'
                }`}>
                  <div className={`relative group cursor-pointer transition-all duration-700 ${
                    isActive ? 'transform rotate-1' : ''
                  }`}>
                    {/* Holographic glow effect */}
                    <div className={`absolute -inset-2 bg-gradient-to-r ${item.color} rounded-3xl blur-lg opacity-0 group-hover:opacity-30 transition-all duration-500`} style={{
                      filter: `drop-shadow(0 0 20px ${item.glow})`
                    }}></div>
                    
                    {/* Glass card with space aesthetic */}
                    <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl hover:shadow-3xl transition-all duration-700" style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                      {/* Holographic year badge */}
                      <div className={`inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-6 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r ${item.color} text-white rounded-full font-bold shadow-2xl`} style={{
                        boxShadow: `0 0 20px ${item.glow}60`
                      }}>
                        <span className="text-lg md:text-xl drop-shadow-lg">{item.icon}</span>
                        <span className="text-sm md:text-lg tracking-wider">{item.year}</span>
                      </div>

                      {/* Glowing title */}
                      <h3 className={`text-xl md:text-3xl font-bold mb-3 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r ${item.color}`} style={{
                        filter: `drop-shadow(0 0 10px ${item.glow}60)`
                      }}>
                        {item.title}
                      </h3>

                      {/* Description with space theme */}
                      <p className={`leading-relaxed text-sm md:text-lg mb-4 md:mb-6 ${
                        isSpace ? 'text-gray-200' : 'text-gray-700 dark:text-gray-200'
                      }`}>
                        {item.description}
                      </p>

                      {/* 3D Type indicator */}
                      <div className="flex items-center gap-3">
                        <span className={`inline-block px-3 md:px-4 py-1 md:py-2 text-xs md:text-sm font-bold rounded-full border-2 ${
                          item.type === 'education' ? 'bg-blue-500/20 text-blue-300 border-blue-400/50' :
                          item.type === 'skill' ? 'bg-green-500/20 text-green-300 border-green-400/50' :
                          item.type === 'certification' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-400/50' :
                          item.type === 'project' ? 'bg-purple-500/20 text-purple-300 border-purple-400/50' :
                          'bg-indigo-500/20 text-indigo-300 border-indigo-400/50'
                        }`} style={{
                          textShadow: '0 0 10px currentColor'
                        }}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                      </div>

                      {/* Holographic connection beam */}
                      <div className={`absolute left-0 md:${isLeft ? 'right-0' : 'left-0'} top-1/2 transform -translate-y-1/2 w-0 h-1 bg-gradient-to-r ${item.color} transition-all duration-700 group-hover:w-8 md:group-hover:w-12 opacity-80`} style={{
                        boxShadow: `0 0 10px ${item.glow}`
                      }}></div>
                    </div>
                  </div>
                </div>

                {/* 3D Connection beam to timeline */}
                <div className={`absolute left-8 md:left-1/2 transform md:-translate-x-1/2 translate-x-4 md:${isLeft ? 'translate-x-6' : '-translate-x-6'} w-8 md:w-12 h-1 bg-gradient-to-r ${item.color} opacity-70`} style={{
                  boxShadow: `0 0 10px ${item.glow}60`
                }}></div>
              </div>
            );
          })}
        </div>

        {/* Space mission control indicator */}
        <div className="mt-12 md:mt-20 text-center px-4">
          <div className={`inline-flex items-center gap-3 md:gap-4 px-6 md:px-8 py-3 md:py-4 backdrop-blur-xl rounded-full shadow-2xl ${
            isSpace 
              ? 'bg-black/60 border-cyan-400/30' 
              : 'bg-white/90 dark:bg-black/60 border-amber-400/30 dark:border-cyan-400/30'
          }`} style={{
            boxShadow: isSpace ? '0 0 30px #00FFFF40' : '0 0 30px #FFA50040'
          }}>
            <div className="w-2 md:w-3 h-2 md:h-3 bg-green-400 rounded-full animate-pulse" style={{
              boxShadow: '0 0 10px #32CD32'
            }}></div>
            <span className={`text-sm md:text-lg font-bold ${
              isSpace ? 'text-cyan-300' : 'text-amber-600 dark:text-cyan-300'
            }`}>Journey in Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
}