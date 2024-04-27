import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <p>TEST</p>
      {children}
    </div>
  );
}
