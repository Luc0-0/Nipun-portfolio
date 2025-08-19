// src/components/ColorShift.jsx
import { useEffect } from 'react';

export default function ColorShift() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const hue = Math.floor(scrollPercent * 60) + 30; // 30-90 degrees (amber to green range)
      
      document.documentElement.style.setProperty('--dynamic-hue', hue);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}