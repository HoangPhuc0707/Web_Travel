import React from 'react';

interface SectionHeaderProps {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ label, title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-[var(--space-2xl)] ${className}`}>
      <div className="inline-flex items-center gap-[var(--space-sm)] text-[13px] font-semibold tracking-[2px] uppercase text-[var(--color-red)] mb-[var(--space-md)] before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-[var(--color-red)] before:rounded-[2px] after:content-[''] after:block after:w-[24px] after:h-[2px] after:bg-[var(--color-red)] after:rounded-[2px]">
        {label}
      </div>
      <h2 className="font-heading text-[clamp(28px,4vw,42px)] font-bold text-[var(--color-text)] leading-[1.2] mb-[var(--space-md)]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[17px] text-[var(--color-text-muted)] max-w-[560px] mx-auto leading-[1.7]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
