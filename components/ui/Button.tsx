import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 uppercase tracking-wider text-xs sm:text-sm select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]';

  const variants = {
    primary:
      'bg-crimson hover:bg-[#b51426] text-white shadow-sm hover:shadow-[0_0_20px_rgba(215,25,47,0.4)] border border-transparent font-semibold',
    secondary:
      'bg-surface-card hover:bg-surface-elevated text-white border border-white/10 hover:border-white/20',
    outline:
      'bg-transparent hover:bg-white/[0.05] text-white border border-white/20 hover:border-crimson hover:text-white',
    ghost:
      'bg-transparent hover:bg-white/[0.05] text-neutral-300 hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs rounded-sm',
    md: 'px-6 py-3 text-xs sm:text-sm rounded-sm',
    lg: 'px-8 py-4 text-sm rounded-sm font-semibold',
  };

  const combinedClasses = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};
