import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetadataItemProps {
  icon: LucideIcon;
  label: string;
  value: string | string[];
  className?: string;
}

export const MetadataItem: React.FC<MetadataItemProps> = ({
  icon: Icon,
  label,
  value,
  className,
}) => {
  return (
    <div className={cn('flex items-start gap-3.5 group', className)}>
      <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-crimson bg-surface-card/60 group-hover:border-crimson group-hover:bg-crimson/10 transition-colors duration-200 shrink-0">
        <Icon size={16} strokeWidth={1.75} className="text-crimson" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] sm:text-[11px] font-semibold tracking-wider text-neutral-400 uppercase leading-none mb-1">
          {label}
        </span>
        {Array.isArray(value) ? (
          value.map((line, idx) => (
            <span
              key={line || idx}
              className="text-xs sm:text-[13px] font-bold tracking-tight text-white uppercase font-sans leading-snug"
            >
              {line}
            </span>
          ))
        ) : (
          <span className="text-xs sm:text-[13px] font-bold tracking-tight text-white uppercase font-sans leading-snug">
            {value}
          </span>
        )}
      </div>
    </div>
  );
};
