// src/contexts/ThemeContext.jsx

import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // theme: 'light', 'dark', or 'space'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    
    // Clear all theme classes first
    document.documentElement.classList.remove('dark', 'space', 'light');
    
    // Apply appropriate theme class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'space') {
      document.documentElement.classList.add('space');
    } else if (theme === 'light') {
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  const isDark = theme === 'dark';
  const isSpace = theme === 'space';
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const toggleSpaceTheme = () => setTheme(theme === 'space' ? 'dark' : 'space');

  return (
    <ThemeContext.Provider value={{ isDark, isSpace, theme, toggleTheme, toggleSpaceTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}