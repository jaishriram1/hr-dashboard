'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  
  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};

export default ThemeSwitcher;