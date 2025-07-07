import { useEffect, useState } from 'react';
import styles from './ThemeToggle.module.scss';
import clsx from 'clsx';
import { Moon, Sun } from 'lucide-react';

type ThemeType = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const themeLocalStorage = localStorage.getItem('theme');
    return themeLocalStorage === 'dark' ? themeLocalStorage : 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', nextTheme);
      return nextTheme;
    });
  };

  return (
    <div
      className={clsx(styles.theme, theme === 'dark' && styles.dark)}
      onClick={handleTheme}
    >
      <span className={styles.toggleIcon}>
        {theme === 'light' ? <Sun /> : <Moon />}
      </span>
    </div>
  );
}
