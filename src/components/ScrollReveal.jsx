// src/components/ScrollReveal.jsx
// Scroll reveal effect for hero elements

import { useEffect } from 'react';

export default function ScrollReveal() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    const scrollRevealElements = document.querySelectorAll('[data-scroll-reveal]');
    scrollRevealElements.forEach((el) => observer.observe(el));

    return () => {
      scrollRevealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return null;
}