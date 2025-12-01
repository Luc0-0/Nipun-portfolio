import React, { useEffect, useRef } from 'react';

export default function Scroll3DAnimations({ 
  children, 
  direction = 'left', 
  delay = 0, 
  className = '',
  index = 0 
}) {
  const elementRef = useRef();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-3d-in');
            }, delay);
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(element);
    return () => observer.unobserve(element);
  }, [delay]);

  // Alternate between left and right only
  const currentDirection = index % 2 === 0 ? 'left' : 'right';

  const getInitialTransform = () => {
    if (currentDirection === 'left') {
      return 'translate3d(-150px, 30px, -80px) rotateY(-20deg) rotateX(8deg) scale(0.9)';
    } else {
      return 'translate3d(150px, 30px, -80px) rotateY(20deg) rotateX(8deg) scale(0.9)';
    }
  };

  return (
    <div
      ref={elementRef}
      className={`opacity-0 ${className}`}
      style={{
        transform: getInitialTransform(),
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden'
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .animate-3d-in {
          opacity: 1 !important;
          transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale(1) !important;
          transition: transform 1.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.5s ease-out !important;
        }
      `}} />
      {children}
    </div>
  );
}