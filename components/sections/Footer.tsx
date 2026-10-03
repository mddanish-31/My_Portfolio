'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { footerData } from '@/data/footer';
import { cn } from '@/lib/utils';
import {
  ArrowUpRight,
  ArrowRight,
  ArrowUp,
  Sparkles,
  Lock,
  Send,
  Code2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const footerRef = useRef<HTMLElement>(null);

  // Viewport scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { cta, brand, navigation, socials, admin, bottom } = footerData;

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="relative w-full bg-[#030102] pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-16 border-t border-white/[0.08] overflow-hidden select-none"
      aria-label="Final CTA and Footer Section"
    >
      {/* 1. ATMOSPHERIC BURGUNDY & CRIMSON DEPTH GLOWS */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_25%,rgba(180,15,30,0.18),rgba(45,6,10,0.06)_55%,rgba(3,1,2,0)_80%)] z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-crimson/[0.08] blur-[170px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[20%] right-[10%] w-[520px] h-[520px] rounded-full bg-crimson-dark/[0.09] blur-[180px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Giant Faint Background Editorial Lettering */}
      <div
        className="absolute top-10 sm:top-16 left-1/2 -translate-x-1/2 text-[16vw] font-editorial font-bold uppercase tracking-tight text-white/[0.018] whitespace-nowrap pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        LET&apos;S TALK
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-16 sm:gap-20 lg:gap-24">
        {/* =========================================================================
            CTA HERO PANEL (CENTRAL LIQUID-GLASS SHOWCASE)
            ========================================================================= */}
        <div
          className={cn(
            'relative max-w-5xl mx-auto w-full rounded-2xl sm:rounded-3xl bg-[linear-gradient(135deg,rgba(22,7,12,0.85)_0%,rgba(6,2,4,0.95)_100%)] backdrop-blur-2xl border border-white/[0.14] shadow-[0_25px_80px_-20px_rgba(0,0,0,0.95),0_0_50px_rgba(215,25,47,0.14),inset_0_1px_1px_rgba(255,255,255,0.16)] p-8 sm:p-12 lg:p-16 text-center flex flex-col items-center gap-6 sm:gap-8 overflow-hidden transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {/* Subtle Ambient Inner Glow */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-crimson/[0.15] blur-[120px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Eyebrow with Pulsing Crimson Beacon */}
          <div className="flex items-center gap-2.5 z-10">
            <span className="w-2 h-2 rounded-full bg-crimson inline-block animate-pulse shadow-[0_0_8px_rgba(215,25,47,0.9)]" />
            <span className="text-xs sm:text-sm font-mono font-bold tracking-[0.25em] text-crimson uppercase">
              {cta.chapter} • {cta.eyebrow}
            </span>
          </div>

          {/* Large Editorial Headline */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase text-white font-editorial tracking-tight leading-[0.92] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] max-w-4xl z-10">
            {cta.heading[0]}
            <br />
            {cta.heading[1]}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
              {cta.heading[2]}
            </span>
          </h2>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg lg:text-xl text-[#ded8cf] font-sans font-light max-w-2xl leading-relaxed z-10">
            {cta.subheading}
          </p>

          {/* Availability Status Badge */}
          <div className="z-10 pt-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crimson/15 border border-crimson/40 text-crimson font-mono text-xs font-bold tracking-wider uppercase shadow-[0_0_15px_rgba(215,25,47,0.2)]">
              <span className="w-2 h-2 rounded-full bg-crimson animate-pulse shadow-[0_0_6px_rgba(215,25,47,0.9)]" />
              <span>{cta.availability}</span>
            </div>
          </div>

          {/* Primary & Secondary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto pt-2 z-10">
            {/* Primary Action Button */}
            <a
              href={cta.primaryCta.href}
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-crimson hover:bg-crimson-light text-white text-sm sm:text-base font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(215,25,47,0.6)] hover:shadow-[0_0_45px_rgba(215,25,47,0.9)] hover:-translate-y-0.5 transition-all min-h-[48px] w-full sm:w-auto cursor-pointer"
              aria-label="Send direct message or email"
            >
              <span>{cta.primaryCta.text}</span>
              <ArrowUpRight size={16} />
            </a>

            {/* Secondary Action Button */}
            <Link
              href={cta.secondaryCta.href}
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.12] border border-white/15 hover:border-crimson/60 text-white text-sm sm:text-base font-bold uppercase tracking-wider backdrop-blur-md hover:-translate-y-0.5 transition-all min-h-[48px] w-full sm:w-auto cursor-pointer"
              aria-label="View Projects and Frameworks showcase"
            >
              <span>{cta.secondaryCta.text}</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Micro Metadata Footer Strip Inside Glass Panel */}
          <div className="w-full pt-6 sm:pt-8 mt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-neutral-400 z-10">
            <span className="tracking-wider uppercase">
              {cta.metadata.availableFor}
            </span>
            <span className="text-neutral-500 uppercase hidden sm:inline-block">
              {cta.metadata.profile}
            </span>
          </div>
        </div>

        {/* =========================================================================
            QUIET & REFINED FOOTER AREA
            ========================================================================= */}
        <div className="pt-8 border-t border-white/[0.08] space-y-10 sm:space-y-12">
          {/* Main Footer Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
            {/* Column 1: Brand & Discipline (md:col-span-5) */}
            <div className="md:col-span-5 space-y-4">
              <div className="space-y-1.5">
                <Link
                  href="#home"
                  className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase font-poster hover:text-neutral-200 transition-colors inline-block"
                  aria-label="MD Danish Raza Home"
                >
                  {brand.name}
                </Link>
                <p className="text-xs font-mono font-medium uppercase tracking-wider text-crimson">
                  {brand.role} • {brand.specialization}
                </p>
              </div>

              <p className="text-xs font-mono text-neutral-400 max-w-sm leading-relaxed">
                {brand.academic}
              </p>

              {/* Private Admin Portal Utility Button */}
              <div className="pt-2">
                <Link
                  href={admin.href}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.08] border border-white/10 hover:border-crimson/50 text-[11px] font-mono text-neutral-400 hover:text-white uppercase tracking-wider transition-all duration-200 group cursor-pointer"
                  title="Private Portfolio Administration"
                  aria-label="Open Admin Portal"
                >
                  <Lock size={11} className="text-neutral-500 group-hover:text-crimson transition-colors" />
                  <span>{admin.text}</span>
                  <ArrowUpRight
                    size={11}
                    className="text-neutral-500 group-hover:text-crimson group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  />
                </Link>
              </div>
            </div>

            {/* Column 2: Navigation Links (md:col-span-4) */}
            <div className="md:col-span-4 space-y-3">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-crimson uppercase block">
                PORTFOLIO INDEX
              </span>

              <nav
                className="grid grid-cols-2 gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400"
                aria-label="Footer Navigation"
              >
                {navigation.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="hover:text-white hover:translate-x-0.5 transition-all py-1 flex items-center gap-1 group"
                  >
                    <span className="text-neutral-600 group-hover:text-crimson transition-colors">•</span>
                    <span>{link.name}</span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Column 3: Social Links (md:col-span-3) */}
            <div className="md:col-span-3 space-y-3">
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-crimson uppercase block">
                CONNECT & SOCIAL
              </span>

              <div className="flex flex-col space-y-2 text-xs font-mono uppercase tracking-wider text-neutral-400">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:translate-x-0.5 transition-all py-1 flex items-center justify-between group"
                    aria-label={`Visit MD Danish Raza on ${s.name}`}
                  >
                    <span className="group-hover:text-white transition-colors">{s.name}</span>
                    <ArrowUpRight
                      size={13}
                      className="text-neutral-600 group-hover:text-crimson group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Back to Top Bar */}
          <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
            <span>{bottom.copyright}</span>

            <span className="text-neutral-500 uppercase hidden md:inline-block">
              {bottom.tagline}
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-crimson rounded px-2 py-1"
              aria-label="Scroll back to top of page"
            >
              <span>{bottom.backToTop}</span>
              <ArrowUp
                size={13}
                className="text-crimson group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
