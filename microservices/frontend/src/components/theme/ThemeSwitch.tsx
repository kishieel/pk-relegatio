import { ThemeToggle } from '@app/components/theme/ThemeToggle';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { DEFAULT_THEME } from '@app/consts/environment';

export const ThemeSwitch = () => {
  const theme = getCookie('theme', { cookies });

  return <ThemeToggle cookieTheme={theme || DEFAULT_THEME} />;
};
