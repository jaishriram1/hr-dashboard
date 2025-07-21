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
    <button onClick={toggleTheme} className="ml-4 p-2 rounded bg-gray-200 dark:bg-gray-700">
  {theme === 'light' ? <Moon /> : <Sun />}
</button>

  );
};

export default ThemeSwitcher;