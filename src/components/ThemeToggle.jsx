import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Check for stored theme first, then system preference
    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      root.classList.add('dark');
      setIsDark(true);
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      setIsDark(false);
      localStorage.setItem('theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const root = window.document.documentElement;
    const isCurrentlyDark = root.classList.contains('dark');

     if (isCurrentlyDark) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
      toast.success(' Switched to light mode!', { 
        duration: 2000,
        icon: <Moon />
      });
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
      toast.success('Switched to dark mode!', { 
        duration: 2000,
        icon: <Sun />
      });
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="border px-3 py-2 rounded text-sm text-gray-700 dark:text-gray-100 border-gray-400 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-500 dark:hover:border-gray-400 transition-all duration-200 flex items-center gap-2"
    >
      <span className="text-lg">
        {isDark ? <Sun /> : <Moon />}
      </span>
      <span>
        {isDark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}

export default ThemeToggle;
