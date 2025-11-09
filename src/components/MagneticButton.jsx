import React, { useRef, useEffect } from 'react';

export default function MagneticButton({ children, className = '', intensity = 0.3, ...props }) {
  const buttonRef = useRef();

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * intensity}px, ${y * intensity}px)`;
    };

    const handleMouseLeave = () => {
      button.style.transform = 'translate(0px, 0px)';
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return (
    <button
      ref={buttonRef}
      className={`transition-transform duration-200 ease-out ${className}`}
      data-magnetic
      {...props}
    >
      {children}
    </button>
  );
}