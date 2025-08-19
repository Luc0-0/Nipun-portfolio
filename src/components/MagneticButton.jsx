// src/components/MagneticButton.jsx
import { useRef } from 'react';

export default function MagneticButton({ children, className, ...props }) {
  const buttonRef = useRef();

  const handleMouseMove = (e) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;
    
    button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    if (!button) return;
    
    button.style.transform = 'translate(0px, 0px)';
    button.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    
    setTimeout(() => {
      button.style.transition = '';
    }, 500);
  };

  return (
    <button
      ref={buttonRef}
      className={`magnetic ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}