// src/components/HoverDistortion.jsx
import { useEffect } from 'react';

export default function HoverDistortion() {
  useEffect(() => {
    const cards = document.querySelectorAll('.distort-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.filter = 'blur(0.5px) contrast(1.1) saturate(1.2)';
        card.style.transform = 'scale(1.02) rotateX(2deg)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.filter = 'none';
        card.style.transform = 'scale(1) rotateX(0deg)';
      });
      
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
        card.style.transform = `scale(1.02) rotateX(${y}deg) rotateY(${x}deg)`;
      });
    });
  }, []);

  return null;
}