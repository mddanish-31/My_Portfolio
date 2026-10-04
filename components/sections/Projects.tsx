'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Image from 'next/image';
import {
  projectsData,
  normalizeProject,
  ProjectItem,
} from '@/data/projects';
import type { ProjectsContent } from '@/lib/cms/types';
import { resolveMediaUrl } from '@/lib/cms/media';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Github,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  CheckCircle2,
} from 'lucide-react';

// =========================================================================
// MAIN PROJECTS & FRAMEWORKS COMPONENT (ART-DIRECTED EXHIBITION)
// =========================================================================
export interface ProjectsProps {
  content?: ProjectsContent;
}

export const Projects: React.FC<ProjectsProps> = ({ content }) => {
  // 1. Canonical source of truth: prioritize CMS content with fallback to compiled seed data
  const rawList = content?.projects && content.projects.length > 0 ? content.projects : projectsData;

  const normalizedProjects: ProjectItem[] = useMemo(() => {
    return rawList.map((p, idx) => normalizeProject(p, idx));
  }, [rawList]);

  // Filter only visible projects and sort by canonical order
  const visibleProjects: ProjectItem[] = useMemo(() => {
    return normalizedProjects
      .filter((p) => p.visible !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [normalizedProjects]);

  // Dynamically derive filter domain pills from visible projects
  const availableDomains = useMemo(() => {
    const set = new Set<string>();
    visibleProjects.forEach((p) => {
      const d = p.domain || p.category;
      if (d && d.trim()) {
        set.add(d.trim());
      }
    });
    return ['ALL', ...Array.from(set)];
  }, [visibleProjects]);

  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isModalTransitioning, setIsModalTransitioning] = useState<boolean>(false);

  // Parallax & Stage container refs
  const stageRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const secondaryCardRef = useRef<HTMLButtonElement>(null);
  const tertiaryCardRef = useRef<HTMLButtonElement>(null);
  const bgGlowRef = useRef<HTMLDivElement>(null);

  // Filtered projects based on selected domain
  const filteredProjects = useMemo(() => {
    if (selectedDomain === 'ALL') return visibleProjects;
    const target = selectedDomain.toLowerCase();
    return visibleProjects.filter((p) => {
      const d = (p.domain || '').toLowerCase();
      const c = (p.category || '').toLowerCase();
      return d === target || c === target || d.includes(target) || c.includes(target);
    });
  }, [visibleProjects, selectedDomain]);

  // Ensure currentIndex stays within bounds of filtered list
  const activeProject: ProjectItem = useMemo(() => {
    if (filteredProjects.length === 0) {
      return visibleProjects[0] || normalizeProject({}, 0);
    }
    return filteredProjects[currentIndex] || filteredProjects[0];
  }, [filteredProjects, currentIndex, visibleProjects]);

  // Secondary & Tertiary projects for asymmetric floating depth
  const prevProject: ProjectItem = useMemo(() => {
    const len = filteredProjects.length;
    if (len <= 1) return activeProject;
    const prevIdx = (currentIndex - 1 + len) % len;
    return filteredProjects[prevIdx];
  }, [filteredProjects, currentIndex, activeProject]);

  const nextProject: ProjectItem = useMemo(() => {
    const len = filteredProjects.length;
    if (len <= 1) return activeProject;
    const nextIdx = (currentIndex + 1) % len;
    return filteredProjects[nextIdx];
  }, [filteredProjects, currentIndex, activeProject]);

  // Navigation handlers with smooth transition and functional state updates
  const handleSelectProject = useCallback((index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 250);
  }, []);

  const handlePrev = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const len = filteredProjects.length;
      if (len <= 1) return 0;
      return (prev - 1 + len) % len;
    });
    setTimeout(() => {
      setIsTransitioning(false);
    }, 250);
  }, [filteredProjects.length]);

  const handleNext = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const len = filteredProjects.length;
      if (len <= 1) return 0;
      return (prev + 1) % len;
    });
    setTimeout(() => {
      setIsTransitioning(false);
    }, 250);
  }, [filteredProjects.length]);

  // Open & close modal (synchronizes with active visible projects list)
  const openModal = useCallback(
    (project: ProjectItem) => {
      setActiveModalProject(project);
      const idx = visibleProjects.findIndex((p) => p.id === project.id);
      if (idx !== -1) setCurrentIndex(idx);
      setLightboxImageIndex(null);
      document.body.style.overflow = 'hidden';
    },
    [visibleProjects]
  );

  const closeModal = useCallback(() => {
    setActiveModalProject(null);
    setLightboxImageIndex(null);
    document.body.style.overflow = 'unset';
  }, []);

  // Modal Next/Prev navigation with smooth content transition, infinite looping & showcase sync
  const handleModalNext = useCallback(() => {
    if (!activeModalProject || visibleProjects.length === 0) return;
    setIsModalTransitioning(true);
    const idx = visibleProjects.findIndex((p) => p.id === activeModalProject.id);
    const nextIdx = (idx + 1) % visibleProjects.length;
    const nextProj = visibleProjects[nextIdx];

    setActiveModalProject(nextProj);
    setCurrentIndex(nextIdx);
    setLightboxImageIndex(null);

    if (modalRef.current) {
      modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setTimeout(() => {
      setIsModalTransitioning(false);
    }, 180);
  }, [activeModalProject, visibleProjects]);

  const handleModalPrev = useCallback(() => {
    if (!activeModalProject || visibleProjects.length === 0) return;
    setIsModalTransitioning(true);
    const idx = visibleProjects.findIndex((p) => p.id === activeModalProject.id);
    const prevIdx = (idx - 1 + visibleProjects.length) % visibleProjects.length;
    const prevProj = visibleProjects[prevIdx];

    setActiveModalProject(prevProj);
    setCurrentIndex(prevIdx);
    setLightboxImageIndex(null);

    if (modalRef.current) {
      modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }

    setTimeout(() => {
      setIsModalTransitioning(false);
    }, 180);
  }, [activeModalProject, visibleProjects]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImageIndex !== null) {
          setLightboxImageIndex(null);
        } else if (activeModalProject) {
          closeModal();
        }
      } else if (activeModalProject) {
        if (e.key === 'ArrowRight') handleModalNext();
        if (e.key === 'ArrowLeft') handleModalPrev();
      } else {
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'ArrowLeft') handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    activeModalProject,
    lightboxImageIndex,
    handleNext,
    handlePrev,
    handleModalNext,
    handleModalPrev,
    closeModal,
  ]);

  // Ref for trackpad gesture lock/cooldown (shared across showcase and modal)
  const isGestureLockedRef = useRef<boolean>(false);
  const gestureLockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Horizontal Trackpad & Touch Gesture Navigation on Showcase Stage
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (e: WheelEvent) => {
      if (activeModalProject) return;

      const { deltaX, deltaY } = e;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      const HORIZONTAL_THRESHOLD = 28; // px

      if (absX > absY && absX >= HORIZONTAL_THRESHOLD) {
        e.preventDefault();

        if (isGestureLockedRef.current) return;
        isGestureLockedRef.current = true;

        if (deltaX > 0) {
          handleNext();
        } else {
          handlePrev();
        }

        if (gestureLockTimeoutRef.current) {
          clearTimeout(gestureLockTimeoutRef.current);
        }
        gestureLockTimeoutRef.current = setTimeout(() => {
          isGestureLockedRef.current = false;
        }, 450);
      }
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (activeModalProject || e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (activeModalProject || e.changedTouches.length !== 1) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      const absX = Math.abs(diffX);
      const absY = Math.abs(diffY);

      const TOUCH_THRESHOLD = 40; // px

      if (absX > absY && absX >= TOUCH_THRESHOLD) {
        if (isGestureLockedRef.current) return;
        isGestureLockedRef.current = true;

        if (diffX < 0) {
          handleNext();
        } else {
          handlePrev();
        }

        if (gestureLockTimeoutRef.current) {
          clearTimeout(gestureLockTimeoutRef.current);
        }
        gestureLockTimeoutRef.current = setTimeout(() => {
          isGestureLockedRef.current = false;
        }, 400);
      }
    };

    stage.addEventListener('wheel', handleWheel, { passive: false });
    stage.addEventListener('touchstart', handleTouchStart, { passive: true });
    stage.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      stage.removeEventListener('wheel', handleWheel);
      stage.removeEventListener('touchstart', handleTouchStart);
      stage.removeEventListener('touchend', handleTouchEnd);
      if (gestureLockTimeoutRef.current) {
        clearTimeout(gestureLockTimeoutRef.current);
      }
    };
  }, [activeModalProject, handleNext, handlePrev]);

  // 2. Horizontal Trackpad & Touch Gesture Navigation on Case Study Detail Modal
  useEffect(() => {
    if (!activeModalProject) return;
    const modalEl = modalRef.current;
    if (!modalEl) return;

    const handleModalWheel = (e: WheelEvent) => {
      if (lightboxImageIndex !== null) return;

      const { deltaX, deltaY } = e;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      const HORIZONTAL_THRESHOLD = 28; // px

      if (absX > absY && absX >= HORIZONTAL_THRESHOLD) {
        e.preventDefault();

        if (isGestureLockedRef.current) return;
        isGestureLockedRef.current = true;

        if (deltaX > 0) {
          handleModalNext();
        } else {
          handleModalPrev();
        }

        if (gestureLockTimeoutRef.current) {
          clearTimeout(gestureLockTimeoutRef.current);
        }
        gestureLockTimeoutRef.current = setTimeout(() => {
          isGestureLockedRef.current = false;
        }, 550);
      }
    };

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (lightboxImageIndex !== null || e.touches.length !== 1) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (lightboxImageIndex !== null || e.changedTouches.length !== 1) return;
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;
      const absX = Math.abs(diffX);
      const absY = Math.abs(diffY);

      const TOUCH_THRESHOLD = 40; // px

      if (absX > absY && absX >= TOUCH_THRESHOLD) {
        if (isGestureLockedRef.current) return;
        isGestureLockedRef.current = true;

        if (diffX < 0) {
          handleModalNext();
        } else {
          handleModalPrev();
        }

        if (gestureLockTimeoutRef.current) {
          clearTimeout(gestureLockTimeoutRef.current);
        }
        gestureLockTimeoutRef.current = setTimeout(() => {
          isGestureLockedRef.current = false;
        }, 450);
      }
    };

    modalEl.addEventListener('wheel', handleModalWheel, { passive: false });
    modalEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    modalEl.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      modalEl.removeEventListener('wheel', handleModalWheel);
      modalEl.removeEventListener('touchstart', handleTouchStart);
      modalEl.removeEventListener('touchend', handleTouchEnd);
      if (gestureLockTimeoutRef.current) {
        clearTimeout(gestureLockTimeoutRef.current);
      }
    };
  }, [activeModalProject, lightboxImageIndex, handleModalNext, handleModalPrev]);

  // Mouse Parallax Effect
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = x;
      targetY = y;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (heroCardRef.current) {
        heroCardRef.current.style.transform = `translate3d(${currentX * 12}px, ${currentY * 8}px, 0)`;
      }
      if (secondaryCardRef.current) {
        secondaryCardRef.current.style.transform = `translate3d(${currentX * -18}px, ${currentY * -14}px, 0) rotate(-2deg)`;
      }
      if (tertiaryCardRef.current) {
        tertiaryCardRef.current.style.transform = `translate3d(${currentX * 22}px, ${currentY * 18}px, 0) rotate(2deg)`;
      }
      if (bgGlowRef.current) {
        bgGlowRef.current.style.transform = `translate3d(${currentX * -25}px, ${currentY * -20}px, 0)`;
      }

      rafId = requestAnimationFrame(updateParallax);
    };

    stage.addEventListener('mousemove', handleMouseMove, { passive: true });
    stage.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      stage.removeEventListener('mousemove', handleMouseMove);
      stage.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const chapterText = content?.chapter || 'CHAPTER 04';
  const eyebrowText = content?.eyebrow || 'SELECTED WORK';
  const headingLines =
    content?.heading && content.heading.length > 0
      ? content.heading
      : ['PROJECTS &', 'FRAMEWORKS'];

  return (
    <section
      id="projects"
      className="relative min-h-screen w-full bg-[#040404] pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 border-t border-white/[0.06] overflow-x-hidden flex flex-col justify-between select-none"
      aria-label="Projects & Frameworks Section"
    >
      {/* 1. ATMOSPHERIC BURGUNDY & CRIMSON DEPTH GLOWS */}
      <div
        ref={bgGlowRef}
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_55%_at_50%_40%,rgba(180,15,30,0.14),rgba(50,8,12,0.05)_55%,rgba(4,4,4,0)_80%)] z-0 transition-transform duration-300 ease-out"
        aria-hidden="true"
      />
      <div
        className="absolute top-[30%] left-[8%] w-[420px] h-[420px] rounded-full bg-crimson/[0.07] blur-[140px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[20%] right-[8%] w-[450px] h-[450px] rounded-full bg-crimson-dark/[0.08] blur-[150px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 2. MAIN CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between gap-6 sm:gap-8">
        {/* =========================================================================
            SECTION HEADER & DOMAIN FILTERING BAR
            ========================================================================= */}
        <div>
          {/* Top Identifier Bar */}
          <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-crimson inline-block animate-pulse shadow-[0_0_8px_rgba(215,25,47,0.9)]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-white uppercase font-sans">
                {eyebrowText}
              </span>
            </div>

            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-400 font-medium">
              {chapterText} • CURATED EXHIBITION
            </span>
          </div>

          {/* Chapter Editorial Intro */}
          <div className="pt-6 sm:pt-7 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-crimson font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
                <span className="w-4 h-[1.5px] bg-crimson inline-block" />
                <span>{chapterText}</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-white font-editorial tracking-tight leading-[0.95] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
                {headingLines[0]}
                {headingLines.length > 1 && (
                  <>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
                      {headingLines.slice(1).join(' ')}
                    </span>
                  </>
                )}
              </h2>

              {content?.subheading && (
                <p className="text-xs sm:text-sm text-neutral-400 font-light font-sans pt-1">
                  {content.subheading}
                </p>
              )}
            </div>

            {/* Domain Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 lg:pb-1">
              {availableDomains.map((domain) => {
                const isActive = selectedDomain.toUpperCase() === domain.toUpperCase();
                return (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => {
                      setSelectedDomain(domain);
                      setCurrentIndex(0);
                    }}
                    className={cn(
                      'px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all duration-200 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson cursor-pointer',
                      isActive
                        ? 'bg-crimson/25 border-crimson text-white shadow-[0_0_12px_rgba(215,25,47,0.4)]'
                        : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.08] hover:border-white/20 text-neutral-400 hover:text-white'
                    )}
                  >
                    {domain}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================================
            ART-DIRECTED COLLAGE STAGE WITH FLOATING OBJECTS & LAYERED DEPTH
            ========================================================================= */}
        <div
          ref={stageRef}
          className="relative w-full rounded-2xl sm:rounded-3xl bg-[linear-gradient(135deg,rgba(16,6,9,0.70)_0%,rgba(6,2,4,0.92)_100%)] backdrop-blur-2xl border border-white/[0.14] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(215,25,47,0.10),inset_0_1px_1px_rgba(255,255,255,0.18)] p-4 sm:p-6 lg:p-8 overflow-hidden min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] flex flex-col justify-between"
        >
          {/* Subtle Background Blueprint Lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"
            aria-hidden="true"
          />

          {/* Top Stage Bar: Project Counter & Exhibition Controls */}
          <div className="relative z-20 flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-crimson animate-ping" />
              <span className="text-[11px] sm:text-xs font-mono tracking-widest text-neutral-300 uppercase font-bold">
                EXHIBITION VIEW • {activeProject.category}
              </span>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1.5 sm:p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.10] border border-white/10 hover:border-crimson/50 text-neutral-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-crimson cursor-pointer"
                aria-label="Previous project"
              >
                <ArrowLeft size={15} />
              </button>

              <span className="text-xs sm:text-sm font-mono text-neutral-400 font-semibold px-1">
                {activeProject.number || (currentIndex + 1 < 10 ? `0${currentIndex + 1}` : `${currentIndex + 1}`)}{' '}
                <span className="text-neutral-600">/</span>{' '}
                {filteredProjects.length < 10 ? `0${filteredProjects.length}` : filteredProjects.length}
              </span>

              <button
                type="button"
                onClick={handleNext}
                className="p-1.5 sm:p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.10] border border-white/10 hover:border-crimson/50 text-neutral-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-crimson cursor-pointer"
                aria-label="Next project"
              >
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Center Stage: Layered Asymmetric Showcase */}
          <div className="relative z-10 w-full flex-1 flex items-center justify-center my-3 sm:my-5">
            {/* 1. FLOATING SECONDARY PROJECT CARD (Top Left Depth Layer) */}
            {filteredProjects.length > 1 && (
              <button
                ref={secondaryCardRef}
                type="button"
                onClick={() =>
                  handleSelectProject((currentIndex - 1 + filteredProjects.length) % filteredProjects.length)
                }
                className="hidden xl:block absolute left-2 top-4 w-[240px] rounded-xl bg-[linear-gradient(135deg,rgba(20,8,12,0.85)_0%,rgba(10,3,6,0.92)_100%)] backdrop-blur-xl border border-white/[0.12] p-3 text-left transition-all duration-300 hover:border-crimson/50 hover:scale-105 z-10 opacity-60 hover:opacity-100 group shadow-2xl cursor-pointer"
                title={`Previous: ${prevProject.title}`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pb-1.5 border-b border-white/[0.08]">
                  <span className="text-crimson font-bold">PROJECT {prevProject.number}</span>
                  <span>{prevProject.year}</span>
                </div>
                <div className="relative w-full h-24 rounded-lg overflow-hidden my-2 bg-black/40 border border-white/5">
                  <Image
                    src={resolveMediaUrl(prevProject.coverImage || prevProject.image, '/images/projects/technexa.jpg')}
                    alt={prevProject.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-75 group-hover:opacity-100"
                    sizes="240px"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/projects/technexa.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <h4 className="text-xs font-bold font-editorial uppercase text-white break-words leading-tight group-hover:text-crimson transition-colors">
                  {prevProject.title}
                </h4>
                <p className="text-[10px] text-neutral-400 font-sans break-words leading-snug">
                  {prevProject.subtitle}
                </p>
              </button>
            )}

            {/* 2. MAIN HERO PROJECT VISUAL SHOWCASE (Centerpiece) */}
            <div
              ref={heroCardRef}
              className={cn(
                'relative w-full max-w-4xl rounded-2xl bg-[linear-gradient(135deg,rgba(22,9,14,0.92)_0%,rgba(12,4,7,0.96)_100%)] backdrop-blur-2xl border border-white/[0.18] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(215,25,47,0.16),inset_0_1px_1px_rgba(255,255,255,0.25)] overflow-hidden transition-all duration-300 group z-20',
                isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'
              )}
            >
              {/* Specular Crimson Top Edge Glow */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none bg-gradient-to-r from-transparent via-crimson to-transparent shadow-[0_0_12px_rgba(215,25,47,0.9)] opacity-90 z-30"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                {/* Visual Media Column (lg:col-span-7) */}
                <div
                  onClick={() => openModal(activeProject)}
                  className="lg:col-span-7 relative min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] bg-black/60 overflow-hidden cursor-pointer group/img"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') openModal(activeProject);
                  }}
                  aria-label={`View Case Study for ${activeProject.title}`}
                >
                  <Image
                    src={resolveMediaUrl(activeProject.coverImage || activeProject.image, '/images/projects/technexa.jpg')}
                    alt={activeProject.title}
                    fill
                    priority
                    className="object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/projects/technexa.jpg';
                    }}
                  />

                  {/* Dark Gradient Overlays & Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/60 hidden lg:block pointer-events-none" />

                  {/* Floating Badges over Image */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 flex flex-wrap items-center gap-2">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-black/70 backdrop-blur-md border border-white/20 text-white shadow-lg">
                      PROJECT {activeProject.number || (currentIndex + 1 < 10 ? `0${currentIndex + 1}` : `${currentIndex + 1}`)}
                    </span>
                    <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider bg-crimson/30 backdrop-blur-md border border-crimson/60 text-white shadow-[0_0_10px_rgba(215,25,47,0.4)]">
                      {activeProject.year}
                    </span>
                  </div>

                  {/* Expand Case Study Trigger Pill */}
                  <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-crimson hover:bg-crimson-light text-white text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(215,25,47,0.7)] transition-all group-hover/img:scale-105">
                    <Maximize2 size={13} />
                    <span>EXPLORE CASE STUDY</span>
                  </div>
                </div>

                {/* Editorial Metadata Column (lg:col-span-5) */}
                <div className="lg:col-span-5 p-5 sm:p-6 lg:p-7 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/[0.10]">
                  <div className="space-y-3 sm:space-y-4">
                    {/* Domain & Category Subheading */}
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                      <span className="text-[11px] font-mono tracking-widest text-crimson font-bold uppercase">
                        {activeProject.category}
                      </span>
                      <span className="text-[11px] font-mono text-neutral-400">
                        {activeProject.domain || activeProject.category}
                      </span>
                    </div>

                    {/* Main Title */}
                    <div className="space-y-1">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-white font-editorial tracking-tight leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                        {activeProject.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-sans text-neutral-300 font-light">
                        {activeProject.subtitle}
                      </p>
                    </div>

                    {/* Factual Short Description */}
                    <p className="text-xs sm:text-[13px] text-[#ded8cf] leading-relaxed font-light font-sans">
                      {activeProject.shortDescription || activeProject.description}
                    </p>

                    {/* Tech Stack Pills (Displaying up to 5 on compact card) */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase block">
                          CORE STACK
                        </span>
                        {activeProject.technologies.length > 5 && (
                          <span className="text-[10px] font-mono text-neutral-500">
                            +{activeProject.technologies.length - 5} MORE
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProject.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-white/[0.04] border border-white/10 text-neutral-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Project Action CTA Buttons */}
                  <div className="pt-4 sm:pt-5 mt-4 border-t border-white/[0.08] flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => openModal(activeProject)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-crimson hover:bg-crimson-light text-white text-xs font-bold uppercase tracking-wider font-sans shadow-[0_0_20px_rgba(215,25,47,0.5)] transition-all cursor-pointer"
                    >
                      <span>VIEW FULL CASE STUDY</span>
                      <ArrowRight size={14} />
                    </button>

                    {activeProject.githubUrl && (
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/12 text-neutral-300 hover:text-white transition-colors"
                        title="GitHub Repository"
                        aria-label={`GitHub Repository for ${activeProject.title}`}
                      >
                        <Github size={16} />
                      </a>
                    )}

                    {(activeProject.liveDemoUrl || activeProject.liveUrl) && (
                      <a
                        href={(activeProject.liveDemoUrl || activeProject.liveUrl) as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/12 text-neutral-300 hover:text-white transition-colors"
                        title="Live Deployment"
                        aria-label={`Live Website for ${activeProject.title}`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 3. FLOATING TERTIARY PROJECT CARD (Bottom Right Depth Layer) */}
            {filteredProjects.length > 1 && (
              <button
                ref={tertiaryCardRef}
                type="button"
                onClick={() =>
                  handleSelectProject((currentIndex + 1) % filteredProjects.length)
                }
                className="hidden xl:block absolute right-2 bottom-4 w-[240px] rounded-xl bg-[linear-gradient(135deg,rgba(20,8,12,0.85)_0%,rgba(10,3,6,0.92)_100%)] backdrop-blur-xl border border-white/[0.12] p-3 text-left transition-all duration-300 hover:border-crimson/50 hover:scale-105 z-10 opacity-60 hover:opacity-100 group shadow-2xl cursor-pointer"
                title={`Next: ${nextProject.title}`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 pb-1.5 border-b border-white/[0.08]">
                  <span className="text-crimson font-bold">PROJECT {nextProject.number}</span>
                  <span>{nextProject.year}</span>
                </div>
                <div className="relative w-full h-24 rounded-lg overflow-hidden my-2 bg-black/40 border border-white/5">
                  <Image
                    src={resolveMediaUrl(nextProject.coverImage || nextProject.image, '/images/projects/technexa.jpg')}
                    alt={nextProject.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-75 group-hover:opacity-100"
                    sizes="240px"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/images/projects/technexa.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <h4 className="text-xs font-bold font-editorial uppercase text-white break-words leading-tight group-hover:text-crimson transition-colors">
                  {nextProject.title}
                </h4>
                <p className="text-[10px] text-neutral-400 font-sans break-words leading-snug">
                  {nextProject.subtitle}
                </p>
              </button>
            )}
          </div>

          {/* Bottom Exhibition Strip: Project Ribbon Selector */}
          <div className="relative z-20 w-full pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 flex-nowrap">
              {filteredProjects.map((p, idx) => {
                const isSelected = p.id === activeProject.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelectProject(idx)}
                    className={cn(
                      'flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-200 shrink-0 border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-crimson cursor-pointer',
                      isSelected
                        ? 'bg-[linear-gradient(135deg,rgba(215,25,47,0.30)_0%,rgba(122,16,27,0.35)_100%)] border-crimson text-white shadow-[0_0_15px_rgba(215,25,47,0.35)] font-bold'
                        : 'bg-white/[0.02] hover:bg-white/[0.06] border-white/[0.08] hover:border-white/16 text-neutral-400 hover:text-white'
                    )}
                  >
                    <span className={isSelected ? 'text-crimson' : 'text-neutral-500'}>
                      {p.number || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`)}
                    </span>
                    <span className="truncate max-w-[120px] sm:max-w-none">{p.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-500 shrink-0 pl-3 border-l border-white/10">
              <CheckCircle2 size={13} className="text-crimson" />
              <span>CLICK CARD FOR CASE STUDY</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FULLSCREEN / IMMERSIVE LIQUID-GLASS CASE STUDY DETAIL MODAL
          ========================================================================= */}
      {activeModalProject && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/92 backdrop-blur-2xl flex flex-col justify-between animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={`Case Study: ${activeModalProject.title}`}
        >
          {/* Modal Sticky Top Header */}
          <div className="sticky top-0 z-30 bg-[#060204]/90 backdrop-blur-md border-b border-white/[0.10] px-4 sm:px-8 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              {/* Left Identity */}
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-crimson shadow-[0_0_8px_rgba(215,25,47,0.9)]" />
                <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-crimson">
                  PROJECT {activeModalProject.number}
                </span>
                <span className="text-neutral-600 hidden sm:inline">•</span>
                <span className="text-xs sm:text-sm font-mono text-neutral-300 uppercase tracking-wider hidden sm:inline">
                  {activeModalProject.category}
                </span>
              </div>

              {/* Center Navigation & Close Button */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-1 bg-white/[0.04] border border-white/10 rounded-full p-1">
                  <button
                    type="button"
                    onClick={handleModalPrev}
                    className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    title="Previous Project (Left Arrow)"
                    aria-label="Previous project"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-[11px] font-mono text-neutral-400 px-2">
                    {activeModalProject.number} / {visibleProjects.length < 10 ? `0${visibleProjects.length}` : visibleProjects.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleModalNext}
                    className="p-1.5 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                    title="Next Project (Right Arrow)"
                    aria-label="Next project"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] hover:bg-crimson/30 border border-white/14 hover:border-crimson/60 text-neutral-200 hover:text-white transition-all text-xs font-mono uppercase tracking-wider cursor-pointer"
                  title="Close Modal (Escape)"
                  aria-label="Close case study"
                >
                  <X size={15} />
                  <span className="hidden sm:inline">CLOSE</span>
                </button>
              </div>
            </div>
          </div>

          {/* Modal Main Content Canvas */}
          <div
            className={cn(
              'max-w-6xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12 space-y-10 sm:space-y-12 transition-all duration-200',
              isModalTransitioning ? 'opacity-0 scale-[0.99] translate-y-1' : 'opacity-100 scale-100 translate-y-0'
            )}
          >
            {/* Title & Subheading Hero */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 text-crimson font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
                <span className="w-4 h-[1.5px] bg-crimson inline-block" />
                <span>CASE STUDY & TECHNICAL DEEP DIVE</span>
              </div>

              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase text-white font-editorial tracking-tight leading-[0.92] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
                {activeModalProject.title}
              </h1>

              <p className="text-lg sm:text-xl text-[#ded8cf] font-sans font-light max-w-3xl">
                {activeModalProject.subtitle}
              </p>
            </div>

            {/* Quick Stats Grid */}
            {activeModalProject.stats && activeModalProject.stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md">
                <div className="space-y-1">
                  <span className="text-[10.5px] font-mono text-neutral-400 uppercase tracking-widest block">
                    TIMELINE
                  </span>
                  <span className="text-sm sm:text-base font-bold text-white font-sans">
                    {activeModalProject.year}
                  </span>
                </div>
                {activeModalProject.stats.map((st, i) => (
                  <div key={st.label || i} className="space-y-1">
                    <span className="text-[10.5px] font-mono text-neutral-400 uppercase tracking-widest block">
                      {st.label}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-crimson font-sans">
                      {st.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Cinematic Hero Screenshot Showcase */}
            <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/[0.16] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(215,25,47,0.15)] bg-black/60">
              <Image
                src={resolveMediaUrl(activeModalProject.coverImage || activeModalProject.image, '/images/projects/technexa.jpg')}
                alt={activeModalProject.title}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1280px) 100vw, 1200px"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/images/projects/technexa.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Action Links Bar Over Hero Image */}
              <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 flex flex-wrap items-center gap-3">
                {(activeModalProject.liveDemoUrl || activeModalProject.liveUrl) && (
                  <a
                    href={(activeModalProject.liveDemoUrl || activeModalProject.liveUrl) as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-crimson hover:bg-crimson-light text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(215,25,47,0.7)] transition-all cursor-pointer"
                  >
                    <span>LIVE PROJECT</span>
                    <ExternalLink size={15} />
                  </a>
                )}

                {activeModalProject.githubUrl && (
                  <a
                    href={activeModalProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/80 hover:bg-white/[0.15] border border-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer"
                  >
                    <span>GITHUB REPO</span>
                    <Github size={15} />
                  </a>
                )}
              </div>
            </div>

            {/* Two-Column Comprehensive Architectural Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
              {/* Left Column: Project Overview, Challenges & Solutions (lg:col-span-7) */}
              <div className="lg:col-span-7 space-y-8">
                {/* Project Overview */}
                <div className="space-y-3 p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md">
                  <span className="text-xs font-mono font-bold tracking-[0.2em] text-crimson uppercase block">
                    PROJECT OVERVIEW
                  </span>
                  <p className="text-sm sm:text-base text-[#ded8cf] leading-relaxed font-light font-sans">
                    {activeModalProject.detailedOverview || activeModalProject.overview}
                  </p>
                </div>

                {/* The Challenge & Architectural Solution */}
                {((activeModalProject.challenges && activeModalProject.challenges.length > 0) ||
                  (activeModalProject.solution && activeModalProject.solution.length > 0)) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeModalProject.challenges && activeModalProject.challenges.length > 0 && (
                      <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2.5">
                        <span className="text-xs font-mono font-bold tracking-[0.2em] text-amber-400 uppercase block">
                          THE CHALLENGE
                        </span>
                        <ul className="space-y-2">
                          {activeModalProject.challenges.map((c, i) => (
                            <li
                              key={c || i}
                              className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed flex items-start gap-2"
                            >
                              <span className="text-amber-400 font-bold">•</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activeModalProject.solution && activeModalProject.solution.length > 0 && (
                      <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-2.5">
                        <span className="text-xs font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase block">
                          ARCHITECTURAL SOLUTION
                        </span>
                        <ul className="space-y-2">
                          {activeModalProject.solution.map((s, i) => (
                            <li
                              key={s || i}
                              className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed flex items-start gap-2"
                            >
                              <span className="text-emerald-400 font-bold">•</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* My Contribution */}
                {activeModalProject.contribution && (
                  <div className="p-6 sm:p-7 rounded-2xl bg-[linear-gradient(135deg,rgba(215,25,47,0.12)_0%,rgba(12,4,7,0.85)_100%)] border border-crimson/40 space-y-2.5">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] text-white uppercase block">
                      MY CONTRIBUTION & IMPACT
                    </span>
                    <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-light">
                      {activeModalProject.contribution}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Roles, Technologies & Key Features (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Role & Responsibilities */}
                {activeModalProject.role && activeModalProject.role.length > 0 && (
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] text-crimson uppercase block">
                      ROLE & RESPONSIBILITIES
                    </span>
                    <ul className="space-y-2">
                      {activeModalProject.role.map((r, i) => (
                        <li
                          key={r || i}
                          className="text-xs sm:text-sm text-neutral-300 flex items-center gap-2 font-medium"
                        >
                          <CheckCircle2 size={14} className="text-crimson shrink-0" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies Used */}
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                  <span className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase block">
                    TECHNOLOGIES & FRAMEWORKS
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-lg text-xs font-mono uppercase bg-white/[0.04] border border-white/12 text-neutral-200 shadow-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Features List */}
                {activeModalProject.features && activeModalProject.features.length > 0 && (
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                    <span className="text-xs font-mono font-bold tracking-[0.2em] text-crimson uppercase block">
                      KEY CAPABILITIES & FEATURES
                    </span>
                    <ul className="space-y-2.5">
                      {activeModalProject.features.map((f, i) => (
                        <li
                          key={f || i}
                          className="text-xs sm:text-sm text-neutral-300 leading-relaxed flex items-start gap-2 font-light"
                        >
                          <span className="text-crimson font-bold text-xs mt-0.5">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Gallery Lightbox Preview Section */}
            {activeModalProject.gallery && activeModalProject.gallery.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-[0.2em] text-crimson uppercase">
                    PROJECT GALLERY & INTERFACES
                  </span>
                  <span className="text-xs font-mono text-neutral-500">
                    CLICK TO ENLARGE
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {activeModalProject.gallery.map((imgUrl, i) => (
                    <button
                      key={imgUrl || i}
                      type="button"
                      onClick={() => setLightboxImageIndex(i)}
                      className="relative aspect-video rounded-xl overflow-hidden border border-white/10 hover:border-crimson/60 group transition-all cursor-pointer bg-black/40"
                    >
                      <Image
                        src={resolveMediaUrl(imgUrl, '/images/projects/technexa.jpg')}
                        alt={`${activeModalProject.title} screenshot ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, 33vw"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/images/projects/technexa.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                      <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 size={13} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Sticky Bottom Navigation Footer */}
          <div className="sticky bottom-0 z-30 bg-[#060204]/95 backdrop-blur-md border-t border-white/[0.10] px-4 sm:px-8 py-3.5">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
              <button
                type="button"
                onClick={handleModalPrev}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} className="text-crimson" />
                <span>PREVIOUS PROJECT</span>
              </button>

              <span className="text-xs font-mono text-neutral-500 hidden sm:inline-block">
                {activeModalProject.title} ({activeModalProject.number} / {visibleProjects.length < 10 ? `0${visibleProjects.length}` : visibleProjects.length})
              </span>

              <button
                type="button"
                onClick={handleModalNext}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>NEXT PROJECT</span>
                <ArrowRight size={14} className="text-crimson" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          IMAGE LIGHTBOX MODAL
          ========================================================================= */}
      {activeModalProject && lightboxImageIndex !== null && activeModalProject.gallery && (
        <div
          className="fixed inset-0 z-60 bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setLightboxImageIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-crimson text-white transition-colors cursor-pointer z-20"
            aria-label="Close Lightbox"
          >
            <X size={20} />
          </button>

          <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <Image
              src={resolveMediaUrl(activeModalProject.gallery[lightboxImageIndex], '/images/projects/technexa.jpg')}
              alt={`${activeModalProject.title} expanded view`}
              fill
              className="object-contain"
              sizes="100vw"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = '/images/projects/technexa.jpg';
              }}
            />
          </div>

          <div className="mt-4 flex items-center gap-4 text-xs font-mono text-neutral-400">
            <button
              type="button"
              onClick={() =>
                setLightboxImageIndex(
                  (lightboxImageIndex - 1 + activeModalProject.gallery!.length) %
                    activeModalProject.gallery!.length
                )
              }
              className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white"
            >
              PREV
            </button>
            <span>
              {lightboxImageIndex + 1} / {activeModalProject.gallery.length}
            </span>
            <button
              type="button"
              onClick={() =>
                setLightboxImageIndex((lightboxImageIndex + 1) % activeModalProject.gallery!.length)
              }
              className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-white"
            >
              NEXT
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

