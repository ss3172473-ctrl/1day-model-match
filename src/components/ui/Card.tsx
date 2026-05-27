import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div 
      className={`bg-[var(--color-toss-card)] rounded-2xl p-5 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[var(--color-toss-border)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
