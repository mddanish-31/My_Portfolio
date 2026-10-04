'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  contactData,
  ContactBrandType,
  ContactCardItem,
} from '@/data/contact';
import type { ContactContent } from '@/lib/cms/types';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  ArrowUpRight,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Globe,
  MapPin,
  Mail,
} from 'lucide-react';

// =========================================================================
// HELPER: OFFICIAL BRAND ICONS WITH ORIGINAL BRAND COLORS
// =========================================================================
const BrandIcon: React.FC<{ type: ContactBrandType; className?: string }> = ({
  type,
  className,
}) => {
  switch (type) {
    case 'gmail':
      return (
        <svg
          viewBox="0 0 24 24"
          className={cn('w-6 h-6 shrink-0', className)}
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M2.5 19.5h3.5v-9.5L1.5 6.5C1.1 7.2 1 8 1 9v9c0 1.1.7 1.5 1.5 1.5z"
          />
          <path
            fill="#34A853"
            d="M18 19.5h3.5c.8 0 1.5-.4 1.5-1.5V9c0-1-.1-1.8-.5-2.5L18 10v9.5z"
          />
          <path fill="#EA4335" d="M18 10l-6 4.5L6 10v9.5h12V10z" />
          <path
            fill="#FBBC05"
            d="M6 10L1.5 6.5c-.3-.2-.5-.5-.5-.8 0-.8.9-1.3 1.6-.8L12 11.5l9.4-6.6c.7-.5 1.6 0 1.6.8 0 .3-.2.6-.5.8L18 10l-6 4.5L6 10z"
          />
        </svg>
      );

    case 'github':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="#FFFFFF"
          className={cn('w-6 h-6 shrink-0', className)}
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      );

    case 'linkedin':
      return (
        <svg
          viewBox="0 0 24 24"
          className={cn('w-6 h-6 shrink-0', className)}
          aria-hidden="true"
        >
          <path
            fill="#0A66C2"
            d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 1.46-1.45 1.46 1.46 0 0 0-1.46-1.46 1.46 1.46 0 0 0-1.46 1.46 1.45 1.45 0 0 0 1.46 1.45m1.39 9.74v-8.37H5.07v8.37h2.78z"
          />
        </svg>
      );

    case 'whatsapp':
      return (
        <svg
          viewBox="0 0 24 24"
          className={cn('w-6 h-6 shrink-0', className)}
          aria-hidden="true"
        >
          <path
            fill="#25D366"
            d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.53c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.42 1.02 2.59.13.17 1.76 2.69 4.26 3.77.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.11-.23-.17-.48-.3z"
          />
        </svg>
      );

    case 'instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          className={cn('w-6 h-6 shrink-0', className)}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="25%" stopColor="#e6683c" />
              <stop offset="50%" stopColor="#dc2743" />
              <stop offset="75%" stopColor="#cc2366" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
          </defs>
          <path
            fill="url(#ig-grad)"
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
          />
        </svg>
      );

    case 'x':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="#FFFFFF"
          className={cn('w-5 h-5 shrink-0', className)}
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );

    default:
      return <Mail size={22} className="text-white" />;
  }
};

// =========================================================================
// MAIN CONTACT / LET'S CONNECT SECTION COMPONENT
// =========================================================================
export interface ContactProps {
  content?: ContactContent;
}

export const Contact: React.FC<ContactProps> = ({ content }) => {
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

  const chapter = content?.chapter || contactData.chapter;
  const eyebrow = content?.eyebrow || contactData.eyebrow;
  const heading = content?.heading || contactData.heading;
  const subheading = content?.subheading || contactData.subheading;
  const topicsTitle = content?.topicsTitle || contactData.topicsTitle;
  const topics = content?.topics || contactData.topics;
  const cards = content?.cards || contactData.cards;
  const openToBanner = content?.openToBanner || contactData.openToBanner;

  const headingLines = Array.isArray(heading)
    ? heading
    : [heading || "LET'S BUILD", 'TOGETHER.'];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#040404] pt-20 sm:pt-24 lg:pt-28 pb-20 sm:pb-24 lg:pb-28 border-t border-white/[0.06] overflow-x-hidden select-none"
      aria-label="Contact and Let's Connect Section"
    >
      {/* 1. ATMOSPHERIC BURGUNDY & CRIMSON DEPTH GLOWS */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_55%_at_50%_35%,rgba(180,15,30,0.14),rgba(50,8,12,0.04)_55%,rgba(4,4,4,0)_80%)] z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-[20%] left-[8%] w-[480px] h-[480px] rounded-full bg-crimson/[0.07] blur-[160px] pointer-events-none z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[20%] right-[8%] w-[500px] h-[500px] rounded-full bg-crimson-dark/[0.08] blur-[170px] pointer-events-none z-0"
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
              {chapter} • CONNECT ARCHIVE
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
                {headingLines[0]}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
                  {headingLines[1]}
                </span>
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
            ASYMMETRIC COMPOSITION: LEFT TOPICS PANEL (~35%) + RIGHT 6-CARD GRID (~65%)
            ========================================================================= */}
        <div
          className={cn(
            'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          {/* =======================================================================
              LEFT CONTENT PANEL: TOPICS & DISCUSSION TRACKS (lg:col-span-4)
              ======================================================================= */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6 p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-[linear-gradient(135deg,rgba(18,6,10,0.76)_0%,rgba(6,2,4,0.92)_100%)] backdrop-blur-xl border border-white/[0.12] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.14)]">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08]">
                <span className="w-2 h-2 rounded-full bg-crimson" />
                <span className="text-xs font-mono font-bold tracking-[0.2em] text-crimson uppercase">
                  {topicsTitle}
                </span>
              </div>

              {/* Vertical List of Discussion Topics */}
              <div className="space-y-3 pt-1">
                {topics.map((t, idx) => (
                  <div
                    key={t.id}
                    className="group/topic flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-crimson/40 transition-all duration-200 cursor-default hover:translate-x-1"
                  >
                    <span className="w-2 h-2 rounded-full bg-crimson/80 group-hover/topic:scale-125 group-hover/topic:bg-crimson group-hover/topic:shadow-[0_0_8px_rgba(215,25,47,0.8)] transition-all shrink-0" />
                    <span className="text-xs sm:text-sm font-mono font-medium text-neutral-300 group-hover/topic:text-white uppercase tracking-wider transition-colors">
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Direct Status Box */}
            <div className="pt-4 border-t border-white/[0.08] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <MapPin size={13} className="text-crimson" />
                <span>KOLKATA, INDIA • ASIA/KOLKATA (IST)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-emerald-400 uppercase font-semibold">
                  TYPICALLY RESPONDS WITHIN 24 HOURS
                </span>
              </div>
            </div>
          </div>

          {/* =======================================================================
              RIGHT CONTENT PANEL: 6 PREMIUM GLASSMORPHISM CONTACT CARDS (lg:col-span-8)
              ======================================================================= */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {cards.map((card, idx) => {
              const isExternal = card.isExternal;

              return (
                <a
                  key={card.id}
                  href={card.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="group relative rounded-2xl bg-[linear-gradient(135deg,rgba(18,6,10,0.76)_0%,rgba(6,2,4,0.92)_100%)] backdrop-blur-xl border border-white/[0.10] hover:border-crimson/60 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-10px_rgba(215,25,47,0.22)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson"
                  aria-label={`${card.title}: ${card.description}`}
                >
                  <div className="space-y-3">
                    {/* Top Row: Brand Icon & Sequence Number */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-white/20 transition-transform duration-300 group-hover:scale-105 shadow-inner">
                          <BrandIcon type={card.brandType} />
                        </div>

                        <div>
                          <h3 className="text-lg font-bold uppercase text-white font-sans tracking-tight group-hover:text-white transition-colors">
                            {card.title}
                          </h3>
                          {card.handle && (
                            <span className="text-[11px] font-mono text-neutral-400 group-hover:text-neutral-300 transition-colors">
                              {card.handle}
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="text-xs font-mono text-neutral-500 group-hover:text-crimson transition-colors">
                        {card.number}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#ded8cf] leading-relaxed font-light font-sans pt-1">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Action Button Bar */}
                  <div className="flex items-center justify-between pt-3.5 border-t border-white/[0.06] text-xs font-mono uppercase tracking-wider text-neutral-300 group-hover:text-white transition-colors">
                    <span className="font-semibold text-[11.5px]">{card.buttonText}</span>
                    {isExternal ? (
                      <ArrowUpRight
                        size={15}
                        className="text-neutral-400 group-hover:text-crimson group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      />
                    ) : (
                      <ArrowRight
                        size={15}
                        className="text-neutral-400 group-hover:text-crimson group-hover:translate-x-1 transition-all"
                      />
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            BOTTOM "CURRENTLY OPEN TO" WIDE GLASSMORPHISM BANNER
            ========================================================================= */}
        <div
          className={cn(
            'relative rounded-2xl sm:rounded-3xl bg-[linear-gradient(135deg,rgba(20,7,12,0.85)_0%,rgba(6,2,4,0.95)_100%)] backdrop-blur-2xl border border-white/[0.14] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(215,25,47,0.12),inset_0_1px_1px_rgba(255,255,255,0.16)] p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8 overflow-hidden transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          {/* Subtle Ambient Red Glow */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-crimson/[0.12] blur-[100px] pointer-events-none"
            aria-hidden="true"
          />

          {/* Left Side: Open to headline & tracks */}
          <div className="relative z-10 space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-crimson animate-pulse shadow-[0_0_8px_rgba(215,25,47,0.9)]" />
              <span className="text-xs font-mono font-bold tracking-[0.2em] text-crimson uppercase">
                {openToBanner.eyebrow}
              </span>
            </div>

            <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase text-white font-editorial tracking-tight">
              {openToBanner.title}
            </h4>

            <p className="text-xs sm:text-sm font-mono text-neutral-400">
              {openToBanner.subtracks}
            </p>
          </div>

          {/* Right Side: Message & Abstract Tech Graphic */}
          <div className="relative z-10 flex items-center gap-6 md:pl-6 md:border-l md:border-white/[0.08]">
            <div className="space-y-1.5 max-w-sm">
              <span className="text-xs font-mono font-bold tracking-widest text-white uppercase block">
                {openToBanner.rightTitle}
              </span>
              <p className="text-xs sm:text-sm text-[#ded8cf] leading-relaxed font-sans font-light">
                {openToBanner.rightMessage}
              </p>
            </div>

            {/* Abstract Red Technical Node Graphic */}
            <div className="hidden lg:flex items-center justify-center relative w-16 h-16 shrink-0" aria-hidden="true">
              <div className="absolute inset-0 rounded-full border border-crimson/30 animate-[spin_12s_linear_infinite]" />
              <div className="absolute inset-2 rounded-full border border-white/10" />
              <div className="w-3 h-3 rounded-full bg-crimson shadow-[0_0_12px_rgba(215,25,47,1)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
