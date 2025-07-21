'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../ThemeProvider';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const changeBackgroundManually = (currentTheme) => {
    if (currentTheme === 'light') {
      document.body.style.backgroundColor = '#1a202c';
    } else {
      document.body.style.backgroundColor = '#f7fafc';
    }
  };

  useEffect(() => {
    setMounted(true);
    changeBackgroundManually(theme);
  }, []);

  useEffect(() => {
    if (mounted) {
      changeBackgroundManually(theme);
    }
  }, [theme, mounted]);


  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200"
    >
      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

export default ThemeSwitcher;