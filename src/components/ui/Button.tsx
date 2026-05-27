import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    primary: "bg-[var(--color-toss-blue)] text-white hover:bg-blue-600 shadow-[0_8px_16px_-4px_rgba(49,130,246,0.3)]",
    secondary: "bg-blue-50 text-[var(--color-toss-blue)] hover:bg-blue-100",
    danger: 'bg-[var(--color-toss-danger)] text-white hover:opacity-90',
    outline: "border border-gray-200 bg-white text-[var(--color-toss-text)] hover:bg-gray-50",
    ghost: "bg-transparent text-[var(--color-toss-text-sec)] hover:bg-gray-100"
  };

  const sizes = {
    sm: "h-9 px-4 text-sm rounded-xl",
    md: "h-12 px-6 text-[15px]",
    lg: "h-14 px-8 text-[17px]"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    />
  );
}
