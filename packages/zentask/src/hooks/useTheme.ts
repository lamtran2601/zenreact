import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme is stored in localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      return savedTheme;
    }
    
    // Default to system preference
    return 'system';
  });
  
  // Apply theme changes
  useEffect(() => {
    const applyTheme = (newTheme: Theme) => {
      // Store theme preference
      localStorage.setItem('theme', newTheme);
      
      // Determine actual theme to apply
      let themeToApply: 'light' | 'dark' = 'light';
      
      if (newTheme === 'system') {
        // Use system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        themeToApply = prefersDark ? 'dark' : 'light';
      } else {
        themeToApply = newTheme;
      }
      
      // Apply theme to document
      document.documentElement.setAttribute('data-theme', themeToApply);
      // For DaisyUI
      document.documentElement.classList.toggle('dark', themeToApply === 'dark');
      // For Tailwind
      document.documentElement.classList.toggle('light', themeToApply === 'light');
    };
    
    applyTheme(theme);
    
    // Listen for system preference changes if using 'system'
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = () => {
        applyTheme('system');
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);
  
  return { theme, setTheme };
};

export default useTheme; 