import { Header } from '@app/components/layout/Header';
import { Footer } from '@app/components/layout/Footer';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="flex h-screen flex-col justify-between font-sans">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
