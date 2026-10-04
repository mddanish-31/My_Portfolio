'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  experienceGroups,
  experienceFilters,
  ExperienceItem,
  ExperienceCategory,
} from '@/data/experience';
import type { ExperienceContent } from '@/lib/cms/types';
import { cn } from '@/lib/utils';
import {
  Briefcase,
  Users,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Layers,
} from 'lucide-react';

export interface ExperienceProps {
  content?: ExperienceContent;
}

export const Experience: React.FC<ExperienceProps> = ({ content }) => {
  const groups = content?.groups && content.groups.length > 0 ? content.groups : experienceGroups;
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Viewport intersection observer for smooth entry reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Filter visible groups
  const displayedGroups = activeFilter === 'ALL'
    ? groups
    : groups.filter((g) => g.id === activeFilter);

  // Group Category Icon Helper
  const getCategoryIcon = (category: ExperienceCategory) => {
    switch (category) {
      case 'professional':
        return <Briefcase size={16} className="text-crimson" />;
      case 'leadership':
        return <Users size={16} className="text-crimson" />;
      case 'hackathon':
        return <Award size={16} className="text-crimson" />;
      default:
        return <Sparkles size={16} className="text-crimson" />;
    }
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#040404] pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 border-t border-white/[0.06] overflow-x-hidden select-none"
      aria-label="Experience & Leadership Section"
    >
      {/* 1. ATMOSPHERIC BURGUNDY & CRIMSON DEPTH GLOWS */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_55%_at_50%_30%,rgba(180,15,30,0.12),rgba(50,8,12,0.04)_55%,rgba(4,4,4,0)_80%)] z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-[25%] left-[5%] w-[450px] h-[450px] rounded-full bg-crimson/[0.06] blur-[150px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[20%] right-[5%] w-[480px] h-[480px] rounded-full bg-crimson-dark/[0.07] blur-[160px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 2. MAIN CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-10 sm:gap-12">
        {/* =========================================================================
            SECTION HEADER & CATEGORY FILTERING BAR
            ========================================================================= */}
        <div>
          {/* Top Identifier Bar */}
          <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-crimson inline-block animate-pulse shadow-[0_0_8px_rgba(215,25,47,0.9)]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-white uppercase font-sans">
                EXPERIENCE
              </span>
            </div>

            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-400 font-medium">
              CHAPTER 05 • EXPERIENCE ARCHIVE
            </span>
          </div>

          {/* Chapter Editorial Intro */}
          <div className="pt-6 sm:pt-7 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-crimson font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
                <span className="w-4 h-[1.5px] bg-crimson inline-block" />
                <span>CHAPTER 05</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-white font-editorial tracking-tight leading-[0.95] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
                EXPERIENCE &<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
                  LEADERSHIP
                </span>
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 lg:pb-1">
              {experienceFilters.map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    className={cn(
                      'px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson cursor-pointer flex items-center gap-1.5',
                      isActive
                        ? 'bg-crimson/25 border-crimson text-white shadow-[0_0_12px_rgba(215,25,47,0.4)]'
                        : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.08] hover:border-white/20 text-neutral-400 hover:text-white'
                    )}
                  >
                    <span>{filter.label}</span>
                    <span
                      className={cn(
                        'text-[10px] px-1.5 py-0.2 rounded-full',
                        isActive ? 'bg-crimson/40 text-white' : 'bg-white/[0.06] text-neutral-400'
                      )}
                    >
                      {filter.count < 10 ? `0${filter.count}` : filter.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#ded8cf] font-sans leading-relaxed font-light mt-4 max-w-2xl">
            Real-world experience, leadership, collaboration, and milestones.
          </p>
        </div>

        {/* =========================================================================
            EDITORIAL TIMELINE & EXPERIENCE ARCHIVE
            ========================================================================= */}
        <div className="space-y-14 sm:space-y-16 lg:space-y-20">
          {displayedGroups.map((group, groupIdx) => (
            <div key={group.id} className="space-y-6 sm:space-y-8">
              {/* Category Group Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-white/[0.08]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(group.id)}
                    <span className="text-xs font-mono font-bold tracking-[0.2em] text-crimson uppercase">
                      {group.eyebrow}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold uppercase text-white font-editorial tracking-tight">
                    {group.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-neutral-400 font-sans font-light max-w-md">
                  {group.subtitle}
                </p>
              </div>

              {/* Vertical Timeline Spine with Connected Experience Cards */}
              <div className="relative pl-6 sm:pl-10 ml-2 sm:ml-4 border-l border-white/[0.12] sm:border-crimson/25 space-y-6 sm:space-y-8">
                {group.items.map((item, itemIdx) => {
                  const isHovered = hoveredCardId === item.id;
                  const itemNumber = `${item.number} / ${group.items.length < 10 ? `0${group.items.length}` : group.items.length}`;

                  return (
                    <div
                      key={item.id}
                      onMouseEnter={() => setHoveredCardId(item.id)}
                      onMouseLeave={() => setHoveredCardId(null)}
                      style={{
                        transitionDelay: `${(groupIdx * 3 + itemIdx) * 60}ms`,
                      }}
                      className={cn(
                        'relative transition-all duration-500 group',
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                      )}
                    >
                      {/* Timeline Node Indicator on Left Spine */}
                      <div
                        className={cn(
                          'absolute -left-[31px] sm:-left-[47px] top-6 w-4 h-4 sm:w-5 sm:h-5 rounded-full border transition-all duration-300 flex items-center justify-center bg-[#060204]',
                          isHovered
                            ? 'border-crimson shadow-[0_0_14px_rgba(215,25,47,0.9)] scale-110'
                            : 'border-white/20 group-hover:border-crimson/70'
                        )}
                        aria-hidden="true"
                      >
                        <span
                          className={cn(
                            'w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300',
                            isHovered
                              ? 'bg-crimson scale-125'
                              : item.isCurrent
                              ? 'bg-crimson animate-pulse'
                              : 'bg-neutral-500 group-hover:bg-crimson'
                          )}
                        />
                      </div>

                      {/* Experience Liquid-Glass Card Surface */}
                      <article
                        className={cn(
                          'relative rounded-2xl bg-[linear-gradient(135deg,rgba(16,6,9,0.72)_0%,rgba(6,2,4,0.92)_100%)] backdrop-blur-xl border transition-all duration-300 p-5 sm:p-7 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.12)]',
                          isHovered
                            ? 'border-crimson/60 shadow-[0_15px_40px_-10px_rgba(215,25,47,0.22)] translate-x-1 sm:translate-x-2'
                            : 'border-white/[0.10] hover:border-white/20'
                        )}
                      >
                        {/* Top Metadata Row: Role / Position + Date & Status */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3">
                          <div className="space-y-1 flex-1">
                            {/* Role / Position */}
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="text-base sm:text-lg lg:text-xl font-bold uppercase text-white font-sans tracking-tight group-hover:text-white transition-colors">
                                {item.role}
                              </h4>

                              {item.highlight && (
                                <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-crimson/20 border border-crimson/40 text-crimson uppercase">
                                  {item.highlight}
                                </span>
                              )}
                            </div>

                            {/* Organization & Location */}
                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-neutral-300">
                              <span className="text-crimson font-semibold">
                                {item.organization}
                              </span>
                              {item.organizationType && (
                                <span className="flex items-center gap-2">
                                  <span className="text-neutral-600">•</span>
                                  <span className="text-neutral-400 uppercase text-[11px]">
                                    {item.organizationType}
                                  </span>
                                </span>
                              )}
                              {item.location && (
                                <span className="flex items-center gap-2">
                                  <span className="text-neutral-600">•</span>
                                  <span className="text-neutral-400 flex items-center gap-1 text-[11px]">
                                    <MapPin size={11} className="text-neutral-500" />
                                    <span>{item.location}</span>
                                  </span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Date Period & Sequence Number */}
                          <div className="flex items-center sm:flex-col sm:items-end gap-2 shrink-0">
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-200">
                              <Calendar size={12} className="text-crimson" />
                              <span>{item.period}</span>
                            </div>

                            <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline-block">
                              {itemNumber}
                            </span>
                          </div>
                        </div>

                        {/* Main Description */}
                        <p className="text-sm sm:text-base text-[#ded8cf] leading-relaxed font-light mt-2">
                          {item.description}
                        </p>

                        {/* Thin Divider */}
                        <div className="h-px w-full bg-white/[0.08] my-4" />

                        {/* Key Contributions List */}
                        <div className="space-y-2.5">
                          <span className="text-[10.5px] font-mono tracking-widest text-neutral-400 uppercase font-semibold block">
                            KEY CONTRIBUTIONS & IMPACT
                          </span>
                          <ul className="space-y-2">
                            {item.contributions.map((c, i) => (
                              <li
                                key={c || i}
                                className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed flex items-start gap-2.5"
                              >
                                <span className="text-crimson font-bold text-sm leading-none mt-1 shrink-0">
                                  •
                                </span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Bottom Row: Technology & Skill Tags + Future Action Links */}
                        <div className="mt-5 pt-3.5 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          {/* Technology Tags */}
                          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                            {item.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-2.5 sm:px-3 py-1 rounded-lg text-[10.5px] sm:text-[11.5px] font-mono uppercase bg-white/[0.03] border border-white/10 group-hover:border-white/20 text-neutral-300 group-hover:text-white transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>

                          {/* Optional External Links (only rendered if provided in data) */}
                          {(item.companyUrl || item.projectUrl || item.certificateUrl) && (
                            <div className="flex items-center gap-2 shrink-0">
                              {item.companyUrl && (
                                <a
                                  href={item.companyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-[11px] font-mono uppercase text-crimson hover:text-white transition-colors"
                                  aria-label={`Visit ${item.organization} website`}
                                >
                                  <span>ORGANIZATION</span>
                                  <ExternalLink size={12} />
                                </a>
                              )}
                              {item.projectUrl && (
                                <a
                                  href={item.projectUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-[11px] font-mono uppercase text-crimson hover:text-white transition-colors"
                                  aria-label="View Project link"
                                >
                                  <span>PROJECT</span>
                                  <ExternalLink size={12} />
                                </a>
                              )}
                              {item.certificateUrl && (
                                <a
                                  href={item.certificateUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 text-[11px] font-mono uppercase text-crimson hover:text-white transition-colors"
                                  aria-label="View Certificate"
                                >
                                  <span>CREDENTIAL</span>
                                  <ExternalLink size={12} />
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
