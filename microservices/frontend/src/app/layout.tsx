import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { cookies } from 'next/headers';
import Providers from '@app/app/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Relegatio',
  description: 'Unpopular opinions on popular topics',
};

export default function Layout({ children }: PropsWithChildren) {
  const theme = cookies().get('theme');

  return (
    <html lang="en" className={theme?.value} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
