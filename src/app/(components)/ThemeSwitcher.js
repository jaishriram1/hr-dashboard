'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes'; // <-- Switched to the standard next-themes library

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // This useEffect ensures the component only renders on the client, preventing hydration mismatch.
  useEffect(() => {
    setMounted(true);
  }, []);

  // No need for manual style changes or complex useEffects.
  // next-themes handles everything automatically by toggling the 'dark' class on the <html> element.

  if (!mounted) {
    return null; // Render nothing on the server
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} // Simple and direct theme toggle
      className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-200"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};

export default ThemeSwitcher;