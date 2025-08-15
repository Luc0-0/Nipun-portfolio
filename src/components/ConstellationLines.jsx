// src/components/ConstellationLines.jsx
// Dynamic constellation lines that connect elements and follow mouse

import React, { useRef, useEffect } from 'react';

export default function ConstellationLines({ nodes = [] }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Get all interactive elements as nodes
    const getNodes = () => {
      const elements = document.querySelectorAll('[data-constellation]');
      const nodeList = Array.from(elements).map(el => {
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2 + window.scrollY,
          element: el,
          active: el.matches(':hover')
        };
      });

      // Add mouse as a node
      nodeList.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y + window.scrollY,
        isMouse: true,
        active: true
      });

      return nodeList;
    };

    // Calculate distance between two points
    const distance = (a, b) => {
      return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    };

    // Draw constellation lines
    const drawConstellations = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const nodes = getNodes();
      const maxDistance = 300;
      const scrollOffset = window.scrollY;

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];
          const dist = distance(nodeA, nodeB);

          if (dist < maxDistance) {
            const opacity = Math.max(0, 1 - dist / maxDistance);
            let lineOpacity = opacity * 0.15;

            // Subtle increase for mouse interaction
            if (nodeA.isMouse || nodeB.isMouse) {
              lineOpacity *= 1.5;
            }
            if (nodeA.active || nodeB.active) {
              lineOpacity *= 1.2;
            }

            // Adjust for scroll position
            const adjustedAY = nodeA.y - scrollOffset;
            const adjustedBY = nodeB.y - scrollOffset;

            // Only draw if at least one point is visible
            if ((adjustedAY >= -100 && adjustedAY <= canvas.height + 100) ||
                (adjustedBY >= -100 && adjustedBY <= canvas.height + 100)) {
              
              // Create subtle gradient line
              const gradient = ctx.createLinearGradient(
                nodeA.x, adjustedAY,
                nodeB.x, adjustedBY
              );
              
              const color1 = nodeA.isMouse ? 'rgba(200, 200, 220, ' : 'rgba(150, 150, 170, ';
              const color2 = nodeB.isMouse ? 'rgba(200, 200, 220, ' : 'rgba(150, 150, 170, ';
              
              gradient.addColorStop(0, color1 + lineOpacity + ')');
              gradient.addColorStop(0.5, 'rgba(160, 160, 180, ' + lineOpacity * 0.8 + ')');
              gradient.addColorStop(1, color2 + lineOpacity + ')');

              ctx.strokeStyle = gradient;
              ctx.lineWidth = Math.max(0.3, lineOpacity * 1.5);
              ctx.globalAlpha = lineOpacity;

              // Subtle glow effect
              ctx.shadowBlur = 5;
              ctx.shadowColor = nodeA.isMouse || nodeB.isMouse ? '#ccccdd' : '#999999';

              ctx.beginPath();
              ctx.moveTo(nodeA.x, adjustedAY);
              ctx.lineTo(nodeB.x, adjustedBY);
              ctx.stroke();

              // Reset shadow
              ctx.shadowBlur = 0;
            }
          }
        }
      }

      // Draw subtle nodes
      nodes.forEach(node => {
        if (!node.isMouse) {
          const adjustedY = node.y - scrollOffset;
          if (adjustedY >= -50 && adjustedY <= canvas.height + 50) {
            ctx.save();
            ctx.globalAlpha = node.active ? 0.4 : 0.2;
            ctx.fillStyle = node.active ? '#ccccdd' : '#999999';
            ctx.shadowBlur = node.active ? 8 : 4;
            ctx.shadowColor = node.active ? '#ccccdd' : '#999999';
            
            ctx.beginPath();
            ctx.arc(node.x, adjustedY, node.active ? 2 : 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      });

      animationId = requestAnimationFrame(drawConstellations);
    };

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    drawConstellations();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [nodes]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-5"
      style={{ mixBlendMode: 'normal' }}
    />
  );
}