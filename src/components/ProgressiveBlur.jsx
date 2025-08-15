// src/components/ProgressiveBlur.jsx
// Progressive blur effect based on scroll

import React, { useEffect, useRef, useState } from 'react';

export default function ProgressiveBlur({ children, className = "" }) {
  const [blurAmount, setBlurAmount] = useState(0);
  const elementRef = useRef();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate blur based on element position
      const distanceFromCenter = Math.abs(rect.top + rect.height / 2 - windowHeight / 2);
      const maxDistance = windowHeight / 2;
      const blur = Math.min((distanceFromCenter / maxDistance) * 5, 5);
      
      setBlurAmount(blur);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        filter: `blur(${blurAmount}px)`,
        transition: 'filter 0.3s ease-out'
      }}
    >
      {children}
    </div>
  );
}