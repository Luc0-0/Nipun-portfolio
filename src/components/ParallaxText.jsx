// src/components/ParallaxText.jsx
// Smooth parallax text movement

import React, { useEffect, useRef } from 'react';

export default function ParallaxText({ children, speed = 0.5, className = "" }) {
  const elementRef = useRef();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      element.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}