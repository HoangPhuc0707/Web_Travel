import React from 'react';

interface BadgeProps {
  variant?: 'blue' | 'red' | 'green';
  className?: string;
  children: React.ReactNode;
}

export function Badge({ variant = 'blue', className = '', children }: BadgeProps) {
  const baseClasses = 'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold';
  
  const variantClasses = {
    blue: 'bg-[var(--color-primary-light)] text-[var(--color-primary)]',
    red: 'bg-[var(--color-red-light)] text-[var(--color-red)]',
    green: 'bg-[#ECFDF5] text-[#059669]',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
