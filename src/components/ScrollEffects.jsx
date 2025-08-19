// src/components/ScrollEffects.jsx
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollEffects() {
  useEffect(() => {
    // Refresh ScrollTrigger when Lenis updates
    let lenis = window.lenis;
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
    }

    // Parallax background elements
    gsap.utils.toArray('.parallax-slow').forEach(element => {
      gsap.to(element, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Fade in sections on scroll
    gsap.utils.toArray('.fade-in-up').forEach(element => {
      gsap.fromTo(element, 
        { 
          opacity: 0, 
          y: 100 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Scale elements on scroll
    gsap.utils.toArray('.scale-in').forEach(element => {
      gsap.fromTo(element,
        {
          scale: 0.8,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Stagger animations for lists
    gsap.utils.toArray('.stagger-children').forEach(container => {
      const children = container.children;
      gsap.fromTo(children,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Rotate elements on scroll
    gsap.utils.toArray('.rotate-scroll').forEach(element => {
      gsap.to(element, {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
}