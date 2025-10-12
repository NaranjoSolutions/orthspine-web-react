import React, { createContext, useContext, useState, useEffect } from 'react';
import { theme } from 'antd';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  antdAlgorithm: typeof theme.defaultAlgorithm | typeof theme.darkAlgorithm;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultTheme = 'light' }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    return (localStorage.getItem('orthspine-theme') as Theme) || defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('orthspine-theme', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const antdAlgorithm = currentTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm;

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme, antdAlgorithm }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
