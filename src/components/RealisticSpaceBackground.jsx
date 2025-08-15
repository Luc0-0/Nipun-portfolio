// src/components/RealisticSpaceBackground.jsx
// Realistic space background with Milky Way, distant galaxies, and interactive elements

import React, { useRef, useEffect, useState } from 'react';

export default function RealisticSpaceBackground({ excludeArea = null }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef([]);
  const milkyWayRef = useRef([]);
  const galaxiesRef = useRef([]);
  const nebulaeRef = useRef([]);
  const shootingStarsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeElements();
    };

    // Initialize all space elements
    const initializeElements = () => {
      initializeStars();
      initializeMilkyWay();
      initializeGalaxies();
      initializeNebulae();
    };

    // Initialize realistic stars
    const initializeStars = () => {
      const stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 3000);
      
      for (let i = 0; i < numStars; i++) {
        const brightness = Math.random();
        const size = brightness * 1.5 + 0.3;
        
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: size,
          brightness: brightness,
          opacity: brightness * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.01 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          color: getRealisticStarColor(brightness),
          parallaxFactor: Math.random() * 0.3 + 0.1,
          type: Math.random() < 0.95 ? 'normal' : 'bright'
        });
      }
      starsRef.current = stars;
    };

    // Initialize Milky Way
    const initializeMilkyWay = () => {
      const milkyWay = [];
      const numClouds = 8;
      
      for (let i = 0; i < numClouds; i++) {
        milkyWay.push({
          x: (canvas.width / numClouds) * i + Math.random() * 200 - 100,
          y: canvas.height * 0.3 + Math.random() * canvas.height * 0.4,
          width: canvas.width * 0.3 + Math.random() * canvas.width * 0.2,
          height: canvas.height * 0.1 + Math.random() * canvas.height * 0.05,
          opacity: Math.random() * 0.15 + 0.05,
          rotation: Math.random() * 0.3 - 0.15,
          driftSpeed: Math.random() * 0.1 + 0.05
        });
      }
      milkyWayRef.current = milkyWay;
    };

    // Initialize distant galaxies
    const initializeGalaxies = () => {
      const galaxies = [];
      const numGalaxies = 3;
      
      for (let i = 0; i < numGalaxies; i++) {
        galaxies.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 80 + 40,
          opacity: Math.random() * 0.1 + 0.03,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.001,
          type: Math.random() < 0.5 ? 'spiral' : 'elliptical'
        });
      }
      galaxiesRef.current = galaxies;
    };

    // Initialize nebulae
    const initializeNebulae = () => {
      const nebulae = [];
      const numNebulae = 4;
      
      for (let i = 0; i < numNebulae; i++) {
        nebulae.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 400 + 200,
          opacity: Math.random() * 0.08 + 0.02,
          color: getNebulaColor(),
          driftX: (Math.random() - 0.5) * 0.1,
          driftY: (Math.random() - 0.5) * 0.1,
          pulseSpeed: Math.random() * 0.005 + 0.002,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
      nebulaeRef.current = nebulae;
    };

    // Get realistic star color based on brightness
    const getRealisticStarColor = (brightness) => {
      if (brightness > 0.8) return '#ffffff'; // Bright white
      if (brightness > 0.6) return '#f8f8ff'; // Ghost white
      if (brightness > 0.4) return '#e6e6fa'; // Lavender
      if (brightness > 0.2) return '#dcdcdc'; // Gainsboro
      return '#c0c0c0'; // Silver
    };

    // Get realistic nebula colors
    const getNebulaColor = () => {
      const colors = [
        'rgba(70, 130, 180, 0.4)', // Steel blue
        'rgba(106, 90, 205, 0.3)', // Slate blue
        'rgba(72, 61, 139, 0.3)',  // Dark slate blue
        'rgba(123, 104, 238, 0.2)', // Medium slate blue
        'rgba(147, 112, 219, 0.3)'  // Medium purple
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    // Create shooting star
    const createShootingStar = () => {
      if (Math.random() < 0.001) { // Very rare
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.6,
          vx: Math.random() * 6 + 3,
          vy: Math.random() * 3 + 1,
          life: 1,
          decay: Math.random() * 0.015 + 0.01,
          trail: [],
          brightness: Math.random() * 0.8 + 0.2
        });
      }
    };

    // Check if point is in excluded area
    const isInExcludedArea = (x, y, buffer = 50) => {
      if (!excludeArea) return false;
      return x >= excludeArea.x - buffer && x <= excludeArea.x + excludeArea.width + buffer &&
             y >= excludeArea.y - buffer && y <= excludeArea.y + excludeArea.height + buffer;
    };

    // Draw Milky Way
    const drawMilkyWay = () => {
      milkyWayRef.current.forEach(cloud => {
        cloud.x += cloud.driftSpeed;
        if (cloud.x > canvas.width + cloud.width) {
          cloud.x = -cloud.width;
        }

        ctx.save();
        ctx.translate(cloud.x + cloud.width/2, cloud.y + cloud.height/2);
        ctx.rotate(cloud.rotation);
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, cloud.width);
        gradient.addColorStop(0, `rgba(200, 200, 220, ${cloud.opacity})`);
        gradient.addColorStop(0.3, `rgba(180, 180, 200, ${cloud.opacity * 0.7})`);
        gradient.addColorStop(0.6, `rgba(160, 160, 180, ${cloud.opacity * 0.4})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(-cloud.width/2, -cloud.height/2, cloud.width, cloud.height);
        ctx.restore();
      });
    };

    // Draw distant galaxies
    const drawGalaxies = () => {
      galaxiesRef.current.forEach(galaxy => {
        galaxy.rotation += galaxy.rotationSpeed;
        
        ctx.save();
        ctx.translate(galaxy.x, galaxy.y);
        ctx.rotate(galaxy.rotation);
        ctx.globalAlpha = galaxy.opacity;
        
        if (galaxy.type === 'spiral') {
          // Draw spiral galaxy
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, galaxy.size);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
          gradient.addColorStop(0.3, 'rgba(200, 200, 220, 0.4)');
          gradient.addColorStop(0.7, 'rgba(150, 150, 170, 0.2)');
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.ellipse(0, 0, galaxy.size, galaxy.size * 0.3, 0, 0, Math.PI * 2);
          ctx.fill();
          
          // Spiral arms
          ctx.strokeStyle = 'rgba(180, 180, 200, 0.3)';
          ctx.lineWidth = 2;
          for (let i = 0; i < 2; i++) {
            ctx.beginPath();
            for (let angle = 0; angle < Math.PI * 4; angle += 0.1) {
              const r = (angle / (Math.PI * 4)) * galaxy.size * 0.8;
              const x = Math.cos(angle + i * Math.PI) * r;
              const y = Math.sin(angle + i * Math.PI) * r * 0.3;
              if (angle === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.stroke();
          }
        } else {
          // Draw elliptical galaxy
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, galaxy.size);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
          gradient.addColorStop(0.5, 'rgba(200, 200, 220, 0.3)');
          gradient.addColorStop(1, 'transparent');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.ellipse(0, 0, galaxy.size, galaxy.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      });
    };

    // Draw nebulae
    const drawNebulae = () => {
      nebulaeRef.current.forEach(nebula => {
        nebula.x += nebula.driftX;
        nebula.y += nebula.driftY;
        
        // Wrap around
        if (nebula.x < -nebula.size) nebula.x = canvas.width + nebula.size;
        if (nebula.x > canvas.width + nebula.size) nebula.x = -nebula.size;
        if (nebula.y < -nebula.size) nebula.y = canvas.height + nebula.size;
        if (nebula.y > canvas.height + nebula.size) nebula.y = -nebula.size;

        const pulseOpacity = nebula.opacity + Math.sin(Date.now() * nebula.pulseSpeed + nebula.pulsePhase) * 0.02;

        if (isInExcludedArea(nebula.x - nebula.size/2, nebula.y - nebula.size/2)) return;

        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.size
        );
        gradient.addColorStop(0, nebula.color.replace(/[\d\.]+\)$/g, pulseOpacity + ')'));
        gradient.addColorStop(0.4, nebula.color.replace(/[\d\.]+\)$/g, (pulseOpacity * 0.6) + ')'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
          nebula.x - nebula.size,
          nebula.y - nebula.size,
          nebula.size * 2,
          nebula.size * 2
        );
      });
    };

    // Animation loop
    const animate = () => {
      // Clear with very subtle fade
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      // Draw background elements
      drawMilkyWay();
      drawGalaxies();
      drawNebulae();

      // Draw stars
      starsRef.current.forEach(star => {
        if (isInExcludedArea(star.x - 20, star.y - 20)) return;

        // Mouse parallax effect
        const dx = (mouseX - star.x) * star.parallaxFactor * 0.00005;
        const dy = (mouseY - star.y) * star.parallaxFactor * 0.00005;
        
        const x = star.x + dx;
        const y = star.y + dy;

        // Twinkling
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.3 + 0.7;
        const opacity = star.opacity * twinkle;

        // Mouse proximity effect
        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        const glowIntensity = Math.max(0, 1 - distance / 400);
        const finalOpacity = opacity + glowIntensity * 0.3;

        ctx.save();
        ctx.globalAlpha = finalOpacity;
        ctx.fillStyle = star.color;
        
        if (star.type === 'bright' || glowIntensity > 0.1) {
          ctx.shadowBlur = star.size * 3 + glowIntensity * 8;
          ctx.shadowColor = star.color;
        }
        
        ctx.beginPath();
        ctx.arc(x, y, star.size + glowIntensity, 0, Math.PI * 2);
        ctx.fill();
        
        // Cross pattern for bright stars
        if (star.brightness > 0.7 || glowIntensity > 0.2) {
          ctx.globalAlpha = finalOpacity * 0.8;
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.5;
          ctx.shadowBlur = 3;
          
          const crossSize = star.size * 4 + glowIntensity * 6;
          ctx.beginPath();
          ctx.moveTo(x - crossSize, y);
          ctx.lineTo(x + crossSize, y);
          ctx.moveTo(x, y - crossSize);
          ctx.lineTo(x, y + crossSize);
          ctx.stroke();
        }
        
        ctx.restore();
      });

      // Handle shooting stars
      createShootingStar();
      shootingStarsRef.current = shootingStarsRef.current.filter(star => {
        if (isInExcludedArea(star.x - 100, star.y - 100)) {
          star.life -= star.decay * 3;
        } else {
          star.x += star.vx;
          star.y += star.vy;
          star.life -= star.decay;

          // Trail
          star.trail.push({ x: star.x, y: star.y, opacity: star.life });
          if (star.trail.length > 15) star.trail.shift();

          // Draw trail
          star.trail.forEach((point, index) => {
            const trailOpacity = point.opacity * (index / star.trail.length) * star.brightness;
            if (trailOpacity > 0.01) {
              ctx.save();
              ctx.globalAlpha = trailOpacity;
              ctx.fillStyle = '#ffffff';
              ctx.shadowBlur = 2;
              ctx.shadowColor = '#ffffff';
              ctx.beginPath();
              ctx.arc(point.x, point.y, 0.8, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          });

          // Draw head
          ctx.save();
          ctx.globalAlpha = star.life * star.brightness;
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#ffffff';
          ctx.beginPath();
          ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        return star.life > 0;
      });

      animationId = requestAnimationFrame(animate);
    };

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [excludeArea]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        background: 'linear-gradient(to bottom, #000000 0%, #0a0a0f 30%, #000000 100%)'
      }}
    />
  );
}