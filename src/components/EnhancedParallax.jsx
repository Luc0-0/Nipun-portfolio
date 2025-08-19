// src/components/EnhancedParallax.jsx
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function EnhancedParallax() {
  useEffect(() => {
    // Background parallax layers
    gsap.utils.toArray('.parallax-bg').forEach((element, index) => {
      const speed = (index + 1) * 0.5;
      gsap.to(element, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Floating elements
    gsap.utils.toArray('.float-element').forEach((element, index) => {
      gsap.to(element, {
        y: -100 - (index * 20),
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

    // Text depth effect
    gsap.utils.toArray('.text-depth').forEach(element => {
      gsap.to(element, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Parallax Background Layers */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Layer 1 - Slowest */}
        <div className="parallax-bg absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-amber-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Layer 2 - Medium */}
        <div className="parallax-bg absolute inset-0 opacity-30">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Layer 3 - Fastest */}
        <div className="parallax-bg absolute inset-0 opacity-40">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-purple-400 rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="float-element absolute w-8 h-8 border border-amber-400/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}
          />
        ))}
      </div>
    </>
  );
}