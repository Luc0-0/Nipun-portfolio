// src/components/MagneticElements.jsx
import { useEffect } from 'react';

export default function MagneticElements() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const magneticElements = document.querySelectorAll('.magnetic');
      
      magneticElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
        
        if (distance < 100) {
          const deltaX = (e.clientX - centerX) * 0.2;
          const deltaY = (e.clientY - centerY) * 0.2;
          element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`;
        } else {
          element.style.transform = 'translate(0px, 0px) scale(1)';
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return null;
}