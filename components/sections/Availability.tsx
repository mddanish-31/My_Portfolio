'use client';

import React, { useState, useEffect, useRef } from 'react';
import { availabilityData } from '@/data/availability';
import type { AvailabilityContent } from '@/lib/cms/types';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  ExternalLink,
  Github,
  Mail,
  Sparkles,
  Send,
  CheckCircle2,
} from 'lucide-react';

export interface AvailabilityProps {
  content?: AvailabilityContent;
}

export const Availability: React.FC<AvailabilityProps> = ({ content }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const data = content || availabilityData;
  const chapter = data.chapter || availabilityData.chapter;
  const eyebrow = data.eyebrow || availabilityData.eyebrow;
  const statusLabel = data.statusLabel || availabilityData.statusLabel;
  const statusBadge = data.statusBadge || availabilityData.statusBadge;
  const statusTitle = data.statusTitle || availabilityData.statusTitle;
  const statusSubtitle = data.statusSubtitle || availabilityData.statusSubtitle;
  const academicMeta = data.academicMeta || availabilityData.academicMeta;
  const heading = data.heading || availabilityData.heading;
  const message = data.message || availabilityData.message;
  const opportunitiesTitle = data.opportunitiesTitle || availabilityData.opportunitiesTitle;
  const opportunities =
    data.opportunities && data.opportunities.length > 0
      ? data.opportunities
      : availabilityData.opportunities;
  const cta = data.cta || availabilityData.cta;

  return (
    <section
      id="availability"
      ref={sectionRef}
      className="relative min-h-[70vh] w-full bg-[#040404] pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24 lg:pb-28 border-t border-white/[0.06] overflow-x-hidden select-none"
      aria-label="Internship Availability Section"
    >
      {/* 1. ATMOSPHERIC BURGUNDY & CRIMSON DEPTH GLOWS */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_55%_at_50%_35%,rgba(180,15,30,0.14),rgba(50,8,12,0.04)_55%,rgba(4,4,4,0)_80%)] z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-[20%] left-[10%] w-[480px] h-[480px] rounded-full bg-crimson/[0.07] blur-[160px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] rounded-full bg-crimson-dark/[0.08] blur-[170px] pointer-events-none z-0"
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
              {chapter} • OPPORTUNITY ARCHIVE
            </span>
          </div>
        </div>

        {/* =========================================================================
            LARGE EDITORIAL LIQUID-GLASS PANEL (3 VISUAL ZONES + BOTTOM ACTION BAR)
            ========================================================================= */}
        <div
          className={cn(
            'relative rounded-2xl sm:rounded-3xl bg-[linear-gradient(135deg,rgba(20,7,12,0.85)_0%,rgba(6,2,4,0.95)_100%)] backdrop-blur-2xl border border-white/[0.14] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(215,25,47,0.12),inset_0_1px_1px_rgba(255,255,255,0.16)] p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-8 sm:gap-10 overflow-hidden transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          {/* Ambient Inner Crimson Radial Accent */}
          <div
            className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-crimson/[0.14] blur-[140px] pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-crimson-dark/[0.12] blur-[140px] pointer-events-none"
            aria-hidden="true"
          />

          {/* =======================================================================
              3 VISUAL ZONES GRID: LEFT (STATUS) | CENTER (MESSAGE) | RIGHT (LOOKING FOR)
              ======================================================================= */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* =====================================================================
                ZONE 1: LEFT — STATUS & AVAILABILITY (lg:col-span-4)
                ===================================================================== */}
            <div className="lg:col-span-4 min-w-0 flex flex-col justify-between gap-6 border-b lg:border-b-0 lg:border-r border-white/[0.08] pb-6 lg:pb-0 lg:pr-8 min-h-[360px] sm:min-h-[390px] lg:min-h-[430px]">
              {/* Top Block: Status Label, Editorial Headline & Available Badge */}
              <div className="space-y-4 min-w-0 w-full">
                {/* Red Identifier Eyebrow */}
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                  <span className="text-xs font-mono font-bold tracking-[0.2em] text-crimson uppercase">
                    {statusLabel}
                  </span>
                </div>

                {/* Large Editorial Headline */}
                <h3 className="w-full max-w-full font-bold uppercase text-white font-editorial tracking-tight leading-[0.92] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)] text-3xl sm:text-4xl lg:text-[2.15rem] xl:text-[2.55rem] 2xl:text-[2.85rem]">
                  {Array.isArray(statusTitle) ? (
                    <span>
                      {statusTitle[0]}
                      <br />
                      {statusTitle[1]}
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
                        {statusTitle.slice(2).join(' ')}
                      </span>
                    </span>
                  ) : (
                    statusTitle
                  )}
                </h3>

                {/* Animated Status Pill */}
                <div className="pt-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(52,211,153,0.15)]">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <span>{statusBadge}</span>
                  </div>
                </div>
              </div>

              {/* Flexible spacer to guarantee ample breathing room */}
              <div className="flex-1 min-h-[20px] lg:min-h-[28px]" />

              {/* Subtitle & Academic Context (Anchored cleanly at bottom) */}
              <div className="space-y-2 pt-2 shrink-0">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                  {statusSubtitle}
                </span>

                <div className="pt-2 border-t border-white/[0.06] flex flex-col gap-1 text-[11px] font-mono text-neutral-500">
                  <span>
                    {academicMeta.degree} • {academicMeta.graduation}
                  </span>
                  <span>
                    STATUS: <strong className="text-neutral-300 font-semibold">{academicMeta.status}</strong> • FOCUS:{' '}
                    <strong className="text-neutral-300 font-semibold">{academicMeta.focus}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* =====================================================================
                ZONE 2: CENTER — EDITORIAL MESSAGE (lg:col-span-4)
                ===================================================================== */}
            <div className="lg:col-span-4 min-w-0 flex flex-col justify-between gap-6 border-b lg:border-b-0 lg:border-r border-white/[0.08] pb-6 lg:pb-0 lg:pr-8 min-h-[360px] sm:min-h-[390px] lg:min-h-[430px]">
              <div className="space-y-3 min-w-0 w-full">
                <div className="flex items-center gap-2 text-crimson font-mono text-xs font-bold tracking-widest uppercase">
                  <span className="w-3.5 h-[1.5px] bg-crimson inline-block" />
                  <span>EDITORIAL STATEMENT</span>
                </div>

                <h4 className="w-full max-w-full font-bold uppercase text-white font-editorial tracking-tight leading-[0.95] text-2xl sm:text-3xl lg:text-[1.85rem] xl:text-[2.35rem] 2xl:text-[2.6rem]">
                  {Array.isArray(heading) ? (
                    <span>
                      {heading[0]}
                      <br />
                      {heading[1]}
                      <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
                        {heading.slice(2).join(' ')}
                      </span>
                    </span>
                  ) : (
                    heading
                  )}
                </h4>

                <p className="text-sm sm:text-base text-[#ded8cf] leading-relaxed font-light pt-2 font-sans">
                  {message}
                </p>
              </div>

              {/* Flexible spacer */}
              <div className="flex-1 min-h-[16px]" />

              {/* Focus Badge Box (Anchored cleanly at bottom) */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1 shrink-0">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block font-semibold">
                  CORE OBJECTIVE
                </span>
                <span className="text-xs text-neutral-200 font-sans font-light">
                  Bridging rock-solid full-stack software engineering with clean design systems and scalable systems architecture.
                </span>
              </div>
            </div>

            {/* =====================================================================
                ZONE 3: RIGHT — WHAT I'M LOOKING FOR (lg:col-span-4)
                ===================================================================== */}
            <div className="lg:col-span-4 min-w-0 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1 border-b border-white/[0.06]">
                  <span className="text-xs font-mono font-bold tracking-[0.2em] text-crimson uppercase">
                    {opportunitiesTitle}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    04 TRACKS
                  </span>
                </div>

                {/* 4 Compact Glass Rows */}
                <div className="space-y-2.5">
                  {opportunities.map((item) => (
                    <div
                      key={item.number}
                      className="group flex items-center justify-between p-3 sm:p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-crimson/60 transition-all duration-200 cursor-default hover:translate-x-1.5 shadow-sm"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-6 h-6 rounded-full bg-white/[0.04] group-hover:bg-crimson border border-white/10 group-hover:border-crimson-light flex items-center justify-center font-mono text-[11px] font-bold text-neutral-400 group-hover:text-white transition-colors shrink-0">
                          {item.number}
                        </span>

                        <div className="min-w-0">
                          <span className="text-xs sm:text-sm font-bold uppercase text-neutral-200 group-hover:text-white font-sans break-words leading-snug block transition-colors">
                            {item.title}
                          </span>
                          {item.subtitle && (
                            <span className="text-[10.5px] font-mono text-neutral-500 group-hover:text-neutral-400 break-words leading-snug block">
                              {item.subtitle}
                            </span>
                          )}
                        </div>
                      </div>

                      <ArrowRight
                        size={14}
                        className="text-neutral-500 group-hover:text-crimson group-hover:translate-x-0.5 transition-all shrink-0 ml-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* =======================================================================
              BOTTOM ACTION BAR (CTAs & CONNECTIVITY)
              ======================================================================= */}
          <div className="relative z-10 pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            {/* Left Context Label */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-crimson" />
                <h5 className="text-sm sm:text-base font-bold uppercase text-white font-sans tracking-wide">
                  {cta.title}
                </h5>
              </div>
              <p className="text-xs font-mono text-neutral-400">
                {cta.subtitle}
              </p>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Primary Connect Button */}
              <a
                href={cta.primaryHref}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-crimson hover:bg-crimson-light text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(215,25,47,0.5)] hover:shadow-[0_0_35px_rgba(215,25,47,0.8)] transition-all min-h-[44px] cursor-pointer"
                aria-label="Connect via email regarding internship opportunities"
              >
                <span>{cta.primaryText}</span>
                <Send size={14} />
              </a>

              {/* Secondary GitHub Button */}
              <a
                href={cta.secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 text-white text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-md transition-all min-h-[44px] cursor-pointer"
                aria-label="Visit MD Danish Raza GitHub profile"
              >
                <span>{cta.secondaryText}</span>
                <Github size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
