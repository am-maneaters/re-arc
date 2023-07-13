import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const theme = window.localStorage.getItem('arcgis-react-theme') as Theme;
    if (theme) {
      setTheme(theme);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('arcgis-react-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
