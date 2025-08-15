// src/components/TypewriterText.jsx
// Typewriter effect with cursor blink

import React, { useState, useEffect } from 'react';

export default function TypewriterText({ 
  texts = [], 
  speed = 100, 
  deleteSpeed = 50, 
  pauseTime = 2000,
  className = "",
  loop = true,
  startDelay = 0
}) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (texts.length === 0) return;

    const initialTimeout = setTimeout(() => {
      const currentText = texts[currentIndex];
      
      const timeout = setTimeout(() => {
        if (!isDeleting) {
          if (displayText.length < currentText.length) {
            setDisplayText(currentText.slice(0, displayText.length + 1));
          } else if (loop) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          if (displayText.length > 0) {
            // Delete entire words at once for faster transitions
            const words = displayText.split(' ');
            if (words.length > 1) {
              words.pop();
              setDisplayText(words.join(' '));
            } else {
              setDisplayText('');
            }
          } else {
            setIsDeleting(false);
            if (loop) {
              setCurrentIndex((prev) => (prev + 1) % texts.length);
            }
          }
        }
      }, isDeleting ? deleteSpeed : speed);

      return () => clearTimeout(timeout);
    }, startDelay);

    return () => clearTimeout(initialTimeout);
  }, [displayText, currentIndex, isDeleting, texts, speed, deleteSpeed, pauseTime, loop, startDelay]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
    </span>
  );
}