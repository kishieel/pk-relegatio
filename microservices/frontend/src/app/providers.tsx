import { PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';
import { DEFAULT_THEME } from '@app/consts/environment';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme={DEFAULT_THEME}>
      {children}
    </ThemeProvider>
  );
}
