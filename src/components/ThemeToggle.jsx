import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const storedTheme = localStorage.getItem('theme');

    if (storedTheme === 'dark') {
      root.classList.add('dark');
      setIsDark(true);
    } else {
      root.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const isCurrentlyDark = root.classList.contains('dark');

    if (isCurrentlyDark) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
     // ✅ Show toast
    toast('🌙 Theme toggle in progress...');
  };

  return (
    <button
      onClick={toggleTheme}
      className="border px-3 py-1 rounded text-sm text-gray-700 dark:text-gray-100 dark:border-gray-300 border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
    >
      {isDark ? '☀ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}

export default ThemeToggle;
