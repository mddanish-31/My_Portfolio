'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  educationRecords,
  educationList,
  EducationLevelId,
  EducationItem,
} from '@/data/education';
import type { EducationContent } from '@/lib/cms/types';
import { cn } from '@/lib/utils';
import {
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

export interface EducationProps {
  content?: EducationContent;
}

export const Education: React.FC<EducationProps> = ({ content }) => {
  const [activeId, setActiveId] = useState<EducationLevelId>('undergraduate');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [hoveredCard, setHoveredCard] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  const items = content?.items && content.items.length > 0 ? content.items : educationList;
  const records = content?.records || educationRecords;

  const chapter = content?.chapter || 'CHAPTER 06';
  const eyebrow = content?.eyebrow || 'ACADEMIC BACKGROUND';
  const heading = content?.heading || ['EDUCATION &', 'FOUNDATION'];
  const subheading =
    content?.subheading ||
    'Consistent academic growth with a strong foundation in computer science, mathematics, and technology.';

  // Viewport scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle active record switch with smooth editorial transition
  const handleSelectEducation = useCallback((id: EducationLevelId) => {
    if (id === activeId) return;
    setIsTransitioning(true);
    setActiveId(id);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 220);
  }, [activeId]);

  const activeRecord: EducationItem =
    (records as Record<string, EducationItem>)[activeId] ||
    (records as Record<string, EducationItem>)['undergraduate'] ||
    educationRecords.undergraduate;

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#040404] pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 border-t border-white/[0.06] overflow-x-hidden select-none"
      aria-label="Academic Background & Education Section"
    >
      {/* 1. ATMOSPHERIC BURGUNDY & CRIMSON DEPTH GLOWS */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_55%_at_50%_35%,rgba(180,15,30,0.12),rgba(50,8,12,0.04)_55%,rgba(4,4,4,0)_80%)] z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-[20%] left-[8%] w-[460px] h-[460px] rounded-full bg-crimson/[0.06] blur-[160px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[25%] right-[8%] w-[480px] h-[480px] rounded-full bg-crimson-dark/[0.07] blur-[160px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 2. MAIN CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-10 sm:gap-12">
        {/* =========================================================================
            SECTION HEADER & EDITORIAL METADATA
            ========================================================================= */}
        <div>
          {/* Top Identifier Bar */}
          <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-crimson inline-block animate-pulse shadow-[0_0_8px_rgba(215,25,47,0.9)]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-white uppercase font-sans">
                {eyebrow}
              </span>
            </div>

            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-400 font-medium">
              {chapter} • ACADEMIC ARCHIVE
            </span>
          </div>

          {/* Chapter Editorial Intro */}
          <div className="pt-6 sm:pt-7 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-crimson font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
                <span className="w-4 h-[1.5px] bg-crimson inline-block" />
                <span>{chapter}</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-white font-editorial tracking-tight leading-[0.95] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
                {Array.isArray(heading) ? (
                  <span>
                    {heading[0]}
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
                      {heading.slice(1).join(' ')}
                    </span>
                  </span>
                ) : (
                  heading
                )}
              </h2>
            </div>

            <div className="max-w-md lg:pb-1">
              <p className="text-sm sm:text-base text-[#ded8cf] font-sans leading-relaxed font-light">
                {subheading}
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            INTERACTIVE ACADEMIC MILESTONE SELECTOR BAR
            ========================================================================= */}
        <div
          className={cn(
            'w-full p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.2em] text-crimson uppercase">
              <TrendingUp size={14} className="text-crimson" />
              <span>SELECT ACADEMIC MILESTONE</span>
            </div>
            <span className="text-[11px] font-mono text-neutral-500 uppercase hidden sm:inline-block">
              CLICK TO INSPECT RECORD • 01 → 02 → 03
            </span>
          </div>

          {/* Interactive Milestone Selectors (Semantic Tabs) */}
          <div
            role="tablist"
            aria-label="Academic Milestones"
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3.5"
          >
            {items.map((item) => {
              const isActive = activeId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="education-detail-card"
                  onClick={() => handleSelectEducation(item.id as EducationLevelId)}
                  className={cn(
                    'group relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-250 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson min-h-[52px]',
                    isActive
                      ? 'bg-crimson/20 border-crimson shadow-[0_0_20px_rgba(215,25,47,0.30)] text-white'
                      : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.06] hover:border-white/20 text-neutral-400 hover:text-neutral-200'
                  )}
                >
                  {/* Number Indicator */}
                  <span
                    className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors duration-250',
                      isActive
                        ? 'bg-crimson border border-crimson-light text-white shadow-[0_0_8px_rgba(215,25,47,0.8)]'
                        : 'bg-white/[0.06] border border-white/10 text-neutral-400 group-hover:text-white'
                    )}
                  >
                    {item.number}
                  </span>

                  {/* Text Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          'text-[10px] font-mono font-bold uppercase tracking-wider block transition-colors duration-250',
                          isActive ? 'text-crimson-light' : 'text-neutral-400'
                        )}
                      >
                        {item.selectorLabel}
                      </span>
                      {item.isCurrent && (
                        <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-ping" />
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-xs sm:text-sm font-bold break-words leading-tight block transition-colors duration-250',
                        isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                      )}
                    >
                      {item.selectorTitle}
                    </span>
                  </div>

                  {/* Active Marker Dot */}
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-crimson shadow-[0_0_8px_rgba(215,25,47,0.9)] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            PRIMARY DYNAMIC ACADEMIC DETAIL CARD
            ========================================================================= */}
        <div id="education-detail-card" className="w-full">
          <article
            onMouseEnter={() => setHoveredCard(true)}
            onMouseLeave={() => setHoveredCard(false)}
            className={cn(
              'relative rounded-2xl sm:rounded-3xl bg-[linear-gradient(135deg,rgba(20,7,12,0.82)_0%,rgba(6,2,4,0.94)_100%)] backdrop-blur-2xl border transition-all duration-300 p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(215,25,47,0.10),inset_0_1px_1px_rgba(255,255,255,0.16)] group overflow-hidden min-h-[380px] flex flex-col justify-between',
              hoveredCard
                ? 'border-crimson/70 shadow-[0_25px_70px_-15px_rgba(215,25,47,0.25)] -translate-y-1'
                : 'border-white/[0.14] hover:border-crimson/50'
            )}
          >
            {/* Ambient Background Radial Glow */}
            <div
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-crimson/[0.12] blur-[120px] pointer-events-none"
              aria-hidden="true"
            />

            {/* Dynamic Content Surface with Smooth Editorial Transition */}
            <div
              className={cn(
                'relative z-10 flex flex-col justify-between gap-6 sm:gap-8 transition-all duration-250',
                isTransitioning
                  ? 'opacity-0 scale-[0.99] translate-y-1'
                  : 'opacity-100 scale-100 translate-y-0'
              )}
            >
              {/* Top Row: Identifier Badges & Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-crimson/20 border border-crimson/40 text-crimson">
                    {activeRecord.id === 'undergraduate' ? (
                      <GraduationCap size={18} />
                    ) : (
                      <BookOpen size={18} />
                    )}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold tracking-[0.2em] text-crimson uppercase block">
                      {activeRecord.level}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {activeRecord.id === 'undergraduate'
                        ? 'UNDERGRADUATE DEGREE PROGRAM'
                        : activeRecord.id === 'higherSecondary'
                        ? 'HIGHER SECONDARY ACADEMIC PROGRAM'
                        : 'SECONDARY EDUCATION PROGRAM'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border',
                      activeRecord.isCurrent
                        ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-400'
                        : 'bg-white/[0.04] border-white/10 text-neutral-300'
                    )}
                  >
                    {activeRecord.isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                    <span>{activeRecord.statusBadge}</span>
                  </div>

                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300">
                    <Calendar size={12} className="text-crimson" />
                    <span>{activeRecord.timeline}</span>
                  </div>
                </div>
              </div>

              {/* Main Content & Score Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                {/* Left Column: Degree, Field & Institution */}
                <div className="lg:col-span-7 space-y-3 sm:space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-white font-editorial tracking-tight leading-[0.95]">
                      {activeRecord.degree}
                    </h3>
                    {activeRecord.field && (
                      <h4 className="text-lg sm:text-xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400 font-sans tracking-wide">
                        {activeRecord.field}
                      </h4>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-sm sm:text-base font-mono font-semibold text-crimson">
                    <span>{activeRecord.institution}</span>
                  </div>

                  {activeRecord.description && (
                    <p className="text-sm sm:text-base text-[#ded8cf] leading-relaxed font-light max-w-2xl">
                      {activeRecord.description}
                    </p>
                  )}
                </div>

                {/* Right Column: Prominent Score Display Box */}
                <div className="lg:col-span-5 flex flex-col justify-center items-start lg:items-end">
                  <div className="w-full sm:w-auto p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.10] backdrop-blur-md space-y-2 text-left lg:text-right shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center lg:justify-end gap-2">
                      <Award size={14} className="text-crimson" />
                      <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
                        {activeRecord.scoreType === 'CGPA'
                          ? 'CUMULATIVE GRADE POINT'
                          : 'OVERALL ACADEMIC SCORE'}
                      </span>
                    </div>

                    <div className="flex items-baseline lg:justify-end gap-2">
                      <span className="text-4xl sm:text-5xl font-bold font-sans text-white tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                        {activeRecord.score}
                      </span>
                      {activeRecord.scoreScale && (
                        <span className="text-lg sm:text-xl font-mono text-neutral-400 font-medium">
                          {activeRecord.scoreScale}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center lg:justify-end gap-2 pt-1 border-t border-white/[0.06]">
                      <span className="w-2 h-2 rounded-full bg-crimson inline-block shadow-[0_0_6px_rgba(215,25,47,0.9)]" />
                      <span className="text-xs font-mono font-bold tracking-wider text-crimson uppercase">
                        {activeRecord.scoreBadgeLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Highlights & Focus Areas */}
              {activeRecord.highlights && activeRecord.highlights.length > 0 && (
                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-3">
                  <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase font-semibold">
                    KEY FOCUS & FOUNDATION:
                  </span>
                  {activeRecord.highlights.map((h, i) => (
                    <div
                      key={h || i}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs font-sans text-neutral-300 font-light"
                    >
                      <CheckCircle2 size={13} className="text-crimson shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
