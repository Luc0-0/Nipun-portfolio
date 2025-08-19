// src/components/SimpleTextReveal.jsx
import { useEffect, useRef } from 'react';

export default function SimpleTextReveal({ children, delay = 0, className = '' }) {
  const textRef = useRef();

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const text = children.toString();
    element.innerHTML = '';
    
    // Split into spans
    const chars = text.split('').map((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.display = 'inline-block';
      span.style.transition = `all 0.5s ease ${(index * 0.05) + delay}s`;
      return span;
    });

    chars.forEach(char => element.appendChild(char));

    // Trigger animation
    const timer = setTimeout(() => {
      chars.forEach(char => {
        char.style.opacity = '1';
        char.style.transform = 'translateY(0px)';
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [children, delay]);

  return <span ref={textRef} className={className}></span>;
}