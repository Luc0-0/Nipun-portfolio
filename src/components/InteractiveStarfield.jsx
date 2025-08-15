// src/components/InteractiveStarfield.jsx
// Interactive starfield background with mouse tracking and space effects

import React, { useRef, useEffect, useState } from 'react';

export default function InteractiveStarfield({ excludeArea = null }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef([]);
  const shootingStarsRef = useRef([]);
  const nebulaeRef = useRef([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars();
      initializeNebulae();
    };

    // Initialize stars
    const initializeStars = () => {
      const stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 8000);
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          color: getStarColor(),
          parallaxFactor: Math.random() * 0.5 + 0.1
        });
      }
      starsRef.current = stars;
    };

    // Initialize nebulae
    const initializeNebulae = () => {
      const nebulae = [];
      const numNebulae = 3;
      
      for (let i = 0; i < numNebulae; i++) {
        nebulae.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 300 + 200,
          opacity: Math.random() * 0.1 + 0.05,
          color: getNebulaeColor(),
          driftX: (Math.random() - 0.5) * 0.2,
          driftY: (Math.random() - 0.5) * 0.2,
          pulseSpeed: Math.random() * 0.01 + 0.005,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
      nebulaeRef.current = nebulae;
    };

    // Get realistic star color
    const getStarColor = () => {
      const colors = [
        '#ffffff', '#f8f8ff', '#e6e6fa', '#dcdcdc', 
        '#c0c0c0', '#b0c4de', '#d3d3d3', '#f5f5f5'
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    // Get realistic nebulae color
    const getNebulaeColor = () => {
      const colors = [
        'rgba(70, 70, 90, 0.15)',   // Dark blue-gray
        'rgba(60, 60, 80, 0.12)',   // Darker gray-blue
        'rgba(80, 80, 100, 0.18)',  // Muted blue-gray
        'rgba(50, 50, 70, 0.10)',   // Very dark blue
        'rgba(90, 90, 110, 0.20)'   // Light gray-blue
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    // Create shooting star
    const createShootingStar = () => {
      if (Math.random() < 0.003) { // 0.3% chance per frame
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.5,
          vx: Math.random() * 8 + 4,
          vy: Math.random() * 4 + 2,
          life: 1,
          decay: Math.random() * 0.02 + 0.01,
          trail: []
        });
      }
    };

    // Check if point is in excluded area
    const isInExcludedArea = (x, y) => {
      if (!excludeArea) return false;
      return x >= excludeArea.x && x <= excludeArea.x + excludeArea.width &&
             y >= excludeArea.y && y <= excludeArea.y + excludeArea.height;
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      // Draw nebulae
      nebulaeRef.current.forEach(nebula => {
        // Update nebula position
        nebula.x += nebula.driftX;
        nebula.y += nebula.driftY;
        
        // Wrap around screen
        if (nebula.x < -nebula.size) nebula.x = canvas.width + nebula.size;
        if (nebula.x > canvas.width + nebula.size) nebula.x = -nebula.size;
        if (nebula.y < -nebula.size) nebula.y = canvas.height + nebula.size;
        if (nebula.y > canvas.height + nebula.size) nebula.y = -nebula.size;

        // Subtle pulse effect
        const pulseOpacity = nebula.opacity + Math.sin(Date.now() * nebula.pulseSpeed + nebula.pulsePhase) * 0.01;

        // Skip if in excluded area
        if (isInExcludedArea(nebula.x - nebula.size/2, nebula.y - nebula.size/2)) return;

        // Draw nebula
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.size
        );
        gradient.addColorStop(0, nebula.color.replace('0.3', pulseOpacity.toString()));
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
          nebula.x - nebula.size,
          nebula.y - nebula.size,
          nebula.size * 2,
          nebula.size * 2
        );
      });

      // Draw stars
      starsRef.current.forEach(star => {
        // Skip if in excluded area
        if (isInExcludedArea(star.x - 10, star.y - 10)) return;

        // Mouse interaction - parallax effect
        const dx = (mouseX - star.x) * star.parallaxFactor * 0.0001;
        const dy = (mouseY - star.y) * star.parallaxFactor * 0.0001;
        
        const x = star.x + dx;
        const y = star.y + dy;

        // Twinkling effect
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
        const opacity = star.opacity * twinkle;

        // Subtle mouse proximity effect
        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        const glowIntensity = Math.max(0, 1 - distance / 300);
        const finalOpacity = opacity + glowIntensity * 0.2;

        // Draw star
        ctx.save();
        ctx.globalAlpha = finalOpacity;
        ctx.fillStyle = star.color;
        ctx.shadowBlur = star.size * 1.5 + glowIntensity * 5;
        ctx.shadowColor = star.color;
        
        ctx.beginPath();
        ctx.arc(x, y, star.size + glowIntensity * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Draw star cross pattern for brighter stars
        if (star.size > 1.5 || glowIntensity > 0.3) {
          ctx.save();
          ctx.globalAlpha = finalOpacity * 0.6;
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.5;
          ctx.shadowBlur = 3;
          ctx.shadowColor = star.color;
          
          const crossSize = star.size * 3 + glowIntensity * 5;
          ctx.beginPath();
          ctx.moveTo(x - crossSize, y);
          ctx.lineTo(x + crossSize, y);
          ctx.moveTo(x, y - crossSize);
          ctx.lineTo(x, y + crossSize);
          ctx.stroke();
          ctx.restore();
        }
      });

      // Create and update shooting stars
      createShootingStar();
      shootingStarsRef.current = shootingStarsRef.current.filter(star => {
        // Skip if in excluded area
        if (isInExcludedArea(star.x - 50, star.y - 50)) {
          star.life -= star.decay * 2; // Fade faster in excluded area
        } else {
          // Update position
          star.x += star.vx;
          star.y += star.vy;
          star.life -= star.decay;

          // Add to trail
          star.trail.push({ x: star.x, y: star.y, opacity: star.life });
          if (star.trail.length > 20) star.trail.shift();

          // Draw trail
          star.trail.forEach((point, index) => {
            const trailOpacity = point.opacity * (index / star.trail.length) * 0.5;
            if (trailOpacity > 0.01) {
              ctx.save();
              ctx.globalAlpha = trailOpacity;
              ctx.fillStyle = '#ffffff';
              ctx.shadowBlur = 3;
              ctx.shadowColor = '#ffffff';
              ctx.beginPath();
              ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          });

          // Draw shooting star head
          ctx.save();
          ctx.globalAlpha = star.life;
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#ffffff';
          ctx.beginPath();
          ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        return star.life > 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [excludeArea]);

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'radial-gradient(ellipse at center, #050505 0%, #000000 100%)',
        mixBlendMode: 'normal'
      }}
    />
  );
}