import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export function GradientText({ children, className = '' }: GradientTextProps) {
  return (
    <span
      className={`bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}
