import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  actionText?: string;
  actionHref?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  badge,
  actionText,
  actionHref,
  className,
}) => {
  return (
    <div className={cn('flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 border-b border-white/[0.08] pb-4', className)}>
      <div>
        {badge && (
          <span className="text-[11px] font-semibold tracking-ultra text-crimson uppercase mb-2 inline-block">
            {badge}
          </span>
        )}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight uppercase text-white font-poster">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            {subtitle}
          </p>
        )}
      </div>

      {actionText && actionHref && (
        <a
          href={actionHref}
          className="mt-3 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-neutral-400 hover:text-crimson uppercase transition-colors duration-200 group"
        >
          <span>{actionText}</span>
          <span className="text-crimson transition-transform duration-200 group-hover:translate-x-1">&gt;</span>
        </a>
      )}
    </div>
  );
};
