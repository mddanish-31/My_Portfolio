'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { aboutSlides, AboutSlide } from '@/data/about';
import type { AboutContent } from '@/lib/cms/types';
import { cn } from '@/lib/utils';

export interface AboutProps {
  content?: AboutContent;
}

export const About: React.FC<AboutProps> = ({ content }) => {
  const slides = content?.slides && content.slides.length > 0 ? content.slides : aboutSlides;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastGestureTimeRef = useRef<number>(0);
  const accumulatedDeltaXRef = useRef<number>(0);

  const total = slides.length;

  // Keep refs in sync for event listeners
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Navigation handlers with continuous wrapping / looping
  const goToSlide = useCallback(
    (targetIndex: number) => {
      if (isTransitioningRef.current || targetIndex === activeIndexRef.current) return;
      isTransitioningRef.current = true;
      activeIndexRef.current = targetIndex;
      setIsTransitioning(true);
      setActiveIndex(targetIndex);
      setTimeout(() => {
        isTransitioningRef.current = false;
        setIsTransitioning(false);
      }, reducedMotion ? 50 : 750);
    },
    [reducedMotion]
  );

  const goToNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    const nextIdx = (activeIndexRef.current + 1) % total;
    goToSlide(nextIdx);
  }, [total, goToSlide]);

  const goToPrev = useCallback(() => {
    if (isTransitioningRef.current) return;
    const prevIdx = (activeIndexRef.current - 1 + total) % total;
    goToSlide(prevIdx);
  }, [total, goToSlide]);

  // Trackpad horizontal gesture & non-hijacking wheel listener
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // If vertical scroll dominates or deltaX is negligible:
      // Allow 100% natural vertical page scrolling without interception!
      if (absY >= absX || absX < 15) {
        accumulatedDeltaXRef.current = 0;
        return;
      }

      // Check if About section is in view
      const rect = el.getBoundingClientRect();
      const inView = rect.top <= window.innerHeight * 0.75 && rect.bottom >= window.innerHeight * 0.25;
      if (!inView) return;

      // This is a deliberate horizontal gesture on trackpad:
      // Prevent browser horizontal history swipe navigation
      e.preventDefault();

      const now = Date.now();
      if (now - lastGestureTimeRef.current < 750 || isTransitioningRef.current) {
        return;
      }

      accumulatedDeltaXRef.current += e.deltaX;

      // Threshold to trigger exactly one slide transition per intentional gesture
      if (Math.abs(accumulatedDeltaXRef.current) >= 25) {
        lastGestureTimeRef.current = now;
        const delta = accumulatedDeltaXRef.current;
        accumulatedDeltaXRef.current = 0;

        if (delta > 0) {
          // Trackpad swipe left (scrolling right) -> Next slide
          goToNext();
        } else {
          // Trackpad swipe right (scrolling left) -> Previous slide
          goToPrev();
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [goToNext, goToPrev]);

  // Keyboard navigation when section is in view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.75 && rect.bottom > window.innerHeight * 0.25;
      if (!inView) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(deltaX) > Math.abs(deltaY) * 1.3 && Math.abs(deltaX) > 35) {
      if (deltaX < 0) {
        // Touch swipe left -> Next slide
        goToNext();
      } else {
        // Touch swipe right -> Previous slide
        goToPrev();
      }
    }
  };

  // Calculate circular signed offset in [-2, -1, 0, 1, 2, 3]
  const getOffset = (slideIndex: number): number => {
    let diff = (slideIndex - activeIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  // Render individual slide card content with responsive, content-safe layout
  const renderCardContent = (slide: AboutSlide, isActive: boolean) => {
    return (
      <div className="w-full h-full flex flex-col justify-between p-5 sm:p-7 md:p-8 lg:p-9 relative z-10 select-none box-border min-w-0">
        
        {/* Top Header: Slide Number + Glass Category Badge */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/[0.08] shrink-0 gap-3">
          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold font-editorial text-crimson leading-none tracking-tight drop-shadow-[0_0_12px_rgba(215,25,47,0.4)] shrink-0">
            {slide.number}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-neutral-300 font-semibold shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            {slide.category}
          </span>
        </div>

        {/* Center Editorial Title & Text (Content-Driven & Fully Visible) */}
        <div className="my-auto py-2 sm:py-3.5 space-y-2.5 sm:space-y-3.5 min-w-0">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-[2.75rem] font-bold uppercase text-white font-editorial tracking-[-0.02em] leading-[1.08] break-words drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
            {slide.title}
          </h3>

          <div className="h-[2px] w-10 sm:w-12 bg-gradient-to-r from-crimson via-crimson to-transparent rounded-full shrink-0" />

          {/* Slide 02 Specific Minimal Education Layout */}
          {slide.id === 'education' && slide.educationDetails ? (
            <div className="space-y-2 pt-0.5 min-w-0">
              <p className="text-sm sm:text-base lg:text-lg font-bold text-white uppercase font-poster tracking-wide leading-snug break-words">
                {slide.educationDetails.degree}
              </p>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm font-mono text-neutral-300">
                <span className="text-neutral-200">{slide.educationDetails.institution}</span>
                <span className="text-neutral-600">•</span>
                <span className="text-crimson font-bold">{slide.educationDetails.cohort}</span>
              </div>
              <p className="text-xs sm:text-sm md:text-[14.5px] text-neutral-300 font-sans leading-relaxed font-light pt-1 break-words whitespace-pre-line">
                {slide.text}
              </p>
            </div>
          ) : slide.id === 'what-i-do' && slide.keywords ? (
            /* Slide 03 Specific Minimal Capabilities Grid */
            <div className="space-y-2 pt-0.5 min-w-0">
              <div className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-2 sm:gap-2.5">
                {slide.keywords.map((kw, i) => (
                  <div
                    key={kw || i}
                    className="p-2 sm:p-2.5 bg-white/[0.04] border border-white/[0.08] backdrop-blur-md rounded-md text-[11px] sm:text-xs font-bold text-white font-poster tracking-wider flex items-center gap-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] min-w-0"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-crimson shrink-0 shadow-[0_0_6px_rgba(215,25,47,0.8)]" />
                    <span className="break-words min-w-0 flex-1 leading-tight">{kw}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs sm:text-sm md:text-[14.5px] text-neutral-300 font-sans leading-relaxed font-light pt-1 break-words whitespace-pre-line">
                {slide.text}
              </p>
            </div>
          ) : (
            /* Standard Slides (01, 04, 05, 06) Narrative Text */
            <p className="text-xs sm:text-sm md:text-base lg:text-[1.02rem] text-neutral-200 font-sans leading-relaxed font-light break-words max-w-2xl whitespace-pre-line">
              {slide.text}
            </p>
          )}
        </div>

        {/* Bottom Label Metadata */}
        <div className="pt-3 sm:pt-4 border-t border-white/[0.08] flex items-center justify-between shrink-0 gap-2 mt-auto">
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-crimson uppercase font-semibold break-words min-w-0">
            {slide.bottomLabel}
          </span>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest hidden sm:inline-block shrink-0 ml-2">
            EDITORIAL SPREAD
          </span>
        </div>

      </div>
    );
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-[92vh] sm:min-h-screen w-full bg-[#040404] py-12 sm:py-16 lg:py-20 border-t border-white/[0.06] overflow-x-hidden flex flex-col justify-between select-none"
      aria-label="About Me Section"
      aria-roledescription="carousel"
      tabIndex={0}
    >
      {/* 1. ATMOSPHERIC RED GLOW & DEPTH BEHIND LIQUID GLASS */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_65%_at_50%_50%,rgba(180,15,30,0.18),rgba(60,8,14,0.06)_55%,rgba(4,4,4,0)_80%)] z-0"
        aria-hidden="true"
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] lg:w-[950px] h-[380px] lg:h-[500px] rounded-full bg-crimson/[0.12] blur-[110px] pointer-events-none z-0"
        aria-hidden="true"
      />
      
      <div
        className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-crimson-dark/[0.14] blur-[90px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div
        className="absolute top-1/2 left-[75%] -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-crimson-dark/[0.14] blur-[90px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 2. MAIN CAROUSEL WRAPPER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        
        {/* =========================================================================
            TOP EDITORIAL NAVIGATION HEADER
            ========================================================================= */}
        <div className="flex items-center justify-between pb-5 sm:pb-6 border-b border-white/[0.08]">
          {/* Section Identification */}
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-crimson inline-block animate-pulse shadow-[0_0_8px_rgba(215,25,47,0.9)]" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-white uppercase font-sans">
              {content?.eyebrow || 'ABOUT ME'}
            </span>
          </div>

          {/* Minimal Top-Right Controls: 01 / 06 with liquid glass pill buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-xs sm:text-sm font-mono text-neutral-300 tracking-widest">
              <span className="text-white font-bold">{slides[activeIndex]?.number || `0${activeIndex + 1}`}</span>
              <span className="text-neutral-600 mx-1.5">/</span>
              <span className="text-neutral-500">{total < 10 ? `0${total}` : total}</span>
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={goToPrev}
                disabled={isTransitioning}
                aria-label="Previous Slide"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/[0.12] hover:border-crimson hover:bg-crimson/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_4px_12px_rgba(0,0,0,0.4)] text-neutral-200 hover:text-white transition-all flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-crimson active:scale-95 disabled:opacity-30 cursor-pointer"
              >
                <ArrowLeft size={15} />
              </button>

              <button
                type="button"
                onClick={goToNext}
                disabled={isTransitioning}
                aria-label="Next Slide"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/[0.12] hover:border-crimson hover:bg-crimson/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_4px_12px_rgba(0,0,0,0.4)] text-neutral-200 hover:text-white transition-all flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-crimson active:scale-95 disabled:opacity-30 cursor-pointer"
              >
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3-PANEL HORIZONTAL SLIDER STAGE (PERFECTLY STRAIGHT LIQUID GLASS PANELS)
            ========================================================================= */}
        <div className="relative w-full min-h-[480px] sm:min-h-[510px] md:min-h-[540px] lg:min-h-[560px] h-auto my-auto py-3 sm:py-6 flex items-center justify-center overflow-visible">
          
          {slides.map((slide, index) => {
            const offset = getOffset(index);
            const isActive = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isFarOffscreen = Math.abs(offset) >= 3;

            // Compute exact straight transform and opacity (NO ROTATION / NO 3D)
            let transformStr = '';
            let opacityVal = 0;
            let zIndexVal = 0;
            let pointerEventsVal: 'auto' | 'none' = 'none';
            let cursorVal = 'default';
            let visibilityVal: 'visible' | 'hidden' = 'visible';

            if (isActive) {
              // Center Active Glass Panel (Straight, prominent, scale 1.0)
              transformStr = 'translate(-50%, -50%) translateX(0%) scale(1)';
              opacityVal = 1;
              zIndexVal = 30;
              pointerEventsVal = 'auto';
            } else if (isLeft) {
              // Left Preview Glass Panel (Straight, scale 0.86, partially visible)
              transformStr = 'translate(-50%, -50%) translateX(-104%) scale(0.86)';
              opacityVal = 0.55;
              zIndexVal = 20;
              pointerEventsVal = 'auto';
              cursorVal = 'pointer';
            } else if (isRight) {
              // Right Preview Glass Panel (Straight, scale 0.86, partially visible)
              transformStr = 'translate(-50%, -50%) translateX(104%) scale(0.86)';
              opacityVal = 0.55;
              zIndexVal = 20;
              pointerEventsVal = 'auto';
              cursorVal = 'pointer';
            } else if (offset === 2) {
              // Far Right (Offscreen)
              transformStr = 'translate(-50%, -50%) translateX(210%) scale(0.72)';
              opacityVal = 0;
              zIndexVal = 10;
            } else if (offset === -2) {
              // Far Left (Offscreen)
              transformStr = 'translate(-50%, -50%) translateX(-210%) scale(0.72)';
              opacityVal = 0;
              zIndexVal = 10;
            } else if (offset <= -3) {
              // Far Left Boundary (Offscreen & Hidden)
              transformStr = 'translate(-50%, -50%) translateX(-300%) scale(0.6)';
              opacityVal = 0;
              zIndexVal = 0;
              visibilityVal = 'hidden';
            } else {
              // Far Right Boundary (Offscreen & Hidden)
              transformStr = 'translate(-50%, -50%) translateX(300%) scale(0.6)';
              opacityVal = 0;
              zIndexVal = 0;
              visibilityVal = 'hidden';
            }

            return (
              <div
                key={slide.id}
                data-slide-index={index}
                onClick={() => {
                  if (isLeft) goToPrev();
                  if (isRight) goToNext();
                }}
                style={{
                  transform: transformStr,
                  opacity: opacityVal,
                  zIndex: zIndexVal,
                  visibility: visibilityVal,
                  pointerEvents: pointerEventsVal,
                  cursor: cursorVal,
                  transition: reducedMotion || isFarOffscreen
                    ? 'none'
                    : 'transform 750ms cubic-bezier(0.16, 1, 0.3, 1), opacity 750ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className={cn(
                  'absolute top-1/2 left-1/2 w-[90vw] sm:w-[540px] md:w-[600px] lg:w-[660px] xl:w-[720px] max-w-full min-h-[440px] sm:min-h-[470px] md:min-h-[490px] lg:min-h-[510px] h-auto rounded-2xl select-none box-border flex flex-col justify-between',
                  isActive
                    ? 'bg-[linear-gradient(135deg,rgba(26,10,14,0.52)_0%,rgba(14,6,9,0.62)_100%)] backdrop-blur-2xl backdrop-saturate-[160%] border border-white/[0.18] shadow-[0_30px_80px_-15px_rgba(0,0,0,0.95),0_0_60px_rgba(215,25,47,0.22),inset_0_1px_1px_rgba(255,255,255,0.28),inset_0_-1px_1px_rgba(0,0,0,0.6)]'
                    : 'bg-[linear-gradient(135deg,rgba(18,8,12,0.38)_0%,rgba(10,4,6,0.48)_100%)] backdrop-blur-xl backdrop-saturate-[130%] border border-white/[0.09] hover:border-white/[0.18] shadow-[0_15px_45px_-10px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_1px_rgba(0,0,0,0.4)]'
                )}
                aria-hidden={!isActive}
              >
                {/* Translucent Liquid-Glass Sheen & Internal Specular Highlight */}
                <div
                  className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_90%_60%_at_15%_0%,rgba(255,255,255,0.10)_0%,transparent_60%),linear-gradient(125deg,rgba(255,255,255,0.05)_0%,transparent_35%,rgba(215,25,47,0.06)_70%,transparent_100%)] z-0"
                  aria-hidden="true"
                />

                {/* Top Specular Edge Highlight / Crimson Accent on Active Panel */}
                <div
                  className={cn(
                    'absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none z-10 transition-all duration-500',
                    isActive
                      ? 'bg-gradient-to-r from-transparent via-crimson to-transparent shadow-[0_0_15px_rgba(215,25,47,0.8)] opacity-100'
                      : 'bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60'
                  )}
                />

                {/* Corner Liquid Red Ambient Reflection */}
                <div
                  className={cn(
                    'absolute -bottom-12 -right-12 w-48 h-48 rounded-full pointer-events-none blur-3xl z-0 transition-opacity duration-500',
                    isActive ? 'bg-crimson/[0.12] opacity-100' : 'bg-crimson/[0.05] opacity-50'
                  )}
                  aria-hidden="true"
                />

                {/* Card Content Spread */}
                {renderCardContent(slide, isActive)}
              </div>
            );
          })}

        </div>

        {/* =========================================================================
            BOTTOM MINIMAL NAVIGATION — CENTERED LIQUID GLASS PILL (01 02 03 04 05 06)
            ========================================================================= */}
        <div className="relative z-20 pt-5 sm:pt-6 border-t border-white/[0.08] flex items-center justify-center">
          
          {/* Centered Liquid Glass Pill Container */}
          <div className="relative inline-flex items-center gap-1.5 sm:gap-3 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] backdrop-blur-2xl backdrop-saturate-[150%] border border-white/[0.14] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(0,0,0,0.5)] overflow-hidden">
            
            {/* Subtle internal liquid glass specular sheen */}
            <div
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.08),transparent_70%)] z-0"
              aria-hidden="true"
            />

            {slides.map((slide, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={slide.id || idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={cn(
                    'relative z-10 px-2 sm:px-3 py-1 text-xs sm:text-sm font-mono font-bold tracking-wider transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-crimson',
                    isActive
                      ? 'text-crimson drop-shadow-[0_0_8px_rgba(215,25,47,0.7)]'
                      : 'text-neutral-400 hover:text-white'
                  )}
                  aria-label={`Jump to slide ${slide.number}: ${slide.title}`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span>{slide.number}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 sm:left-3 sm:right-3 h-[2px] bg-crimson rounded-full shadow-[0_0_8px_rgba(215,25,47,0.9)]" />
                  )}
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
