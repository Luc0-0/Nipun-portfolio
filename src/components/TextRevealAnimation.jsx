// src/components/TextRevealAnimation.jsx
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextRevealAnimation({ 
  children, 
  className = '', 
  delay = 0, 
  stagger = 0.03,
  animation = 'slideUp' // slideUp, fadeIn, typewriter, glitch
}) {
  const textRef = useRef();

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Split text into spans for each character
    const text = element.textContent;
    element.innerHTML = '';
    
    const chars = text.split('').map(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      return span;
    });

    chars.forEach(char => element.appendChild(char));

    // Animation variants
    const animations = {
      slideUp: {
        from: { y: 100, opacity: 0 },
        to: { y: 0, opacity: 1, ease: "back.out(1.7)" }
      },
      fadeIn: {
        from: { opacity: 0, scale: 0 },
        to: { opacity: 1, scale: 1, ease: "elastic.out(1, 0.3)" }
      },
      typewriter: {
        from: { opacity: 0, x: -20 },
        to: { opacity: 1, x: 0, ease: "power2.out" }
      },
      glitch: {
        from: { opacity: 0, x: -10, y: -10, skewX: 10 },
        to: { opacity: 1, x: 0, y: 0, skewX: 0, ease: "power2.out" }
      }
    };

    const anim = animations[animation] || animations.slideUp;

    // Set initial state
    gsap.set(chars, anim.from);
    
    // Fallback: show text after 3 seconds if animation doesn't trigger
    setTimeout(() => {
      if (chars.some(char => gsap.getProperty(char, 'opacity') === 0)) {
        gsap.set(chars, { opacity: 1, y: 0, x: 0, scale: 1, skewX: 0 });
      }
    }, 3000);

    // Create scroll-triggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true
      }
    });
    
    tl.to(chars, {
      ...anim.to,
      duration: 0.8,
      stagger: stagger,
      delay: delay
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) trigger.kill();
      });
    };
  }, [delay, stagger, animation]);

  return (
    <span ref={textRef} className={className}>
      {children}
    </span>
  );
}