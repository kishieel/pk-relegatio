import { PropsWithChildren } from 'react';

interface PagingProps {
  disabled: boolean;
  rel?: string;
  href?: string;
}

export const PagingAction = ({ children, disabled, rel, href }: PropsWithChildren<PagingProps>) => {
  if (disabled) {
    return (
      <button className="cursor-auto disabled:opacity-50" disabled>
        {children}
      </button>
    );
  }

  return (
    <a rel={rel} href={href}>
      {children}
    </a>
  );
};
