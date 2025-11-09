import React, { useEffect, useRef } from 'react';

export default function ScrollAnimations({ children, animation = 'fadeUp', delay = 0, className = '' }) {
  const elementRef = useRef();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [delay]);

  const animationClasses = {
    fadeUp: 'translate-y-8 opacity-0 transition-all duration-700 ease-out',
    fadeIn: 'opacity-0 transition-opacity duration-700 ease-out',
    slideLeft: 'translate-x-8 opacity-0 transition-all duration-700 ease-out',
    slideRight: '-translate-x-8 opacity-0 transition-all duration-700 ease-out',
    scale: 'scale-95 opacity-0 transition-all duration-700 ease-out',
    blur: 'blur-sm opacity-0 transition-all duration-700 ease-out'
  };

  return (
    <div
      ref={elementRef}
      className={`${animationClasses[animation]} ${className}`}
      style={{
        '--animate-in': 'translate-y-0 opacity-100 translate-x-0 scale-100 blur-0'
      }}
    >
      <style jsx>{`
        .animate-in {
          transform: translate3d(0, 0, 0) !important;
          opacity: 1 !important;
          filter: blur(0) !important;
        }
      `}</style>
      {children}
    </div>
  );
}