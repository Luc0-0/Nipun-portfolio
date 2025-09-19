// src/contexts/ThemeContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // theme: 'light', 'dark', or 'space'
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('space');
    } else if (theme === 'space') {
      document.documentElement.classList.add('space');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.remove('space');
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
};