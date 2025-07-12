import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { lightTheme, darkTheme, brandColors, ThemeMode, CustomTheme } from './theme.config';

interface ThemeContextType {
  theme: CustomTheme;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultTheme = 'light' }) => {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('orthspine-theme') as ThemeMode;
    return savedTheme || defaultTheme;
  });

  const currentTheme: CustomTheme = {
    mode: themeMode,
    antdTheme: themeMode === 'light' ? lightTheme : darkTheme,
    brandColors,
  };

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
  };

  const setTheme = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('orthspine-theme', themeMode);

    // Update document class for CSS variables
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  // Apply system theme preference on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only apply system theme if user hasn't set a preference
      if (!localStorage.getItem('orthspine-theme')) {
        setThemeMode(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme, setTheme }}>
      <ConfigProvider theme={currentTheme.antdTheme}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
