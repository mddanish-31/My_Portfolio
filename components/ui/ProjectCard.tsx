import React from 'react';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/data/projects';
import { resolveMediaUrl } from '@/lib/cms/media';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className }) => {
  const imageUrl = resolveMediaUrl(project.image, '/images/projects/saathi.png');

  return (
    <div
      className={cn(
        'group flex flex-col bg-surface border border-white/[0.08] hover:border-crimson/50 transition-all duration-300 rounded-sm overflow-hidden',
        className
      )}
    >
      {/* Top Card Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface-card border-b border-white/[0.06]">
        <span className="text-xs font-bold text-crimson tracking-wider font-mono">
          {project.number}
        </span>
        <span className="text-[10px] font-semibold text-neutral-400 tracking-wider uppercase">
          {project.category}
        </span>
      </div>

      {/* Image Preview */}
      <div className="relative aspect-video w-full overflow-hidden bg-black/50">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Content Info */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-surface">
        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase group-hover:text-crimson transition-colors duration-200 font-poster">
            {project.title}
          </h3>
          <p className="text-[11px] font-semibold text-crimson uppercase tracking-wider mb-2">
            {project.subtitle}
          </p>
          <p className="text-xs text-neutral-400 leading-relaxed mb-4">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {(project.tags || project.technologies || []).map((tag: string) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-sm bg-white/[0.04] text-neutral-300 border border-white/[0.06] font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-crimson transition-colors uppercase tracking-wider"
              >
                <span>Live Demo</span>
                <ExternalLink size={12} />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition-colors uppercase tracking-wider ml-auto"
              >
                <Github size={13} />
                <span>Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
