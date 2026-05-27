import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <div 
      className={`bg-[var(--color-toss-card)] rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-gray-100/50 overflow-hidden ${className}`}
      {...props}
    >
      <div className="p-6">
        {children}
      </div>
    </div>);
}
