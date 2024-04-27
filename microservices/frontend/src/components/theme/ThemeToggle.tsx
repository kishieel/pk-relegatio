'use client';

import { Moon } from '@app/components/svgs/Moon';
import { Sun } from '@app/components/svgs/Sun';
import { useTheme } from 'next-themes';
import { setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

export interface ThemeToggleProps {
  cookieTheme?: string;
}

export const ThemeToggle = ({ cookieTheme }: ThemeToggleProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { resolvedTheme, setTheme } = useTheme();
  const theme = mounted ? resolvedTheme : cookieTheme;

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setCookie('theme', newTheme, { path: '/' });
    setTheme(newTheme);
  };

  return (
    <div className="relative inline-block text-left" data-headlessui-state="">
      <div onClick={toggleTheme}>
        <button
          id="headlessui-menu-button-:Rn6jaja:"
          type="button"
          aria-haspopup="menu"
          aria-expanded="false"
          data-headlessui-state=""
        >
          {theme === 'dark' ? <Moon /> : <Sun />}
        </button>
      </div>
    </div>
  );
};
