import React from 'react';
import Image from 'next/image';
import { GraduationCap, CalendarDays, Code2, BriefcaseBusiness, MapPin, ArrowRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { Button } from '@/components/ui/Button';
import { MetadataItem } from '@/components/ui/MetadataItem';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen w-full bg-[#050505] pt-20 sm:pt-24 pb-8 sm:pb-12 overflow-hidden flex flex-col justify-between"
    >
      {/* 1. ATMOSPHERIC RED GLOW BEHIND SUBJECT */}
      <div
        className="absolute inset-0 pointer-events-none hero-atmospheric-glow opacity-90 z-0"
        aria-hidden="true"
      />

      {/* Center Subject Radial Glow */}
      <div
        className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[500px] lg:w-[650px] h-[380px] sm:h-[550px] lg:h-[700px] rounded-full hero-portrait-glow pointer-events-none z-[1]"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        
        {/* =========================================================================
            GIANT EDITORIAL "PORTFOLIO" BACKGROUND POSTER TYPOGRAPHY (STARTING AT TOP)
            ========================================================================= */}
        <div
          className="absolute top-0 sm:top-1 lg:top-0 left-0 right-0 w-full flex justify-center items-start select-none pointer-events-none z-[2] overflow-visible"
          aria-hidden="true"
        >
          <span className="text-[25vw] sm:text-[24vw] lg:text-[22vw] xl:text-[295px] font-bold tracking-[-0.03em] leading-[0.80] uppercase text-[#C41528] font-poster block text-center w-full whitespace-nowrap scale-x-[1.12] sm:scale-x-[1.16] lg:scale-x-[1.22] xl:scale-x-[1.26] origin-center">
            PORTFOLIO
          </span>
        </div>

        {/* =========================================================================
            MAIN HERO STAGE (COMPOSITION MATCHING REFERENCE 01)
            ========================================================================= */}
        <div className="relative z-[10] flex-1 flex flex-col justify-end pt-6 sm:pt-10 lg:pt-12">
          
          {/* DESKTOP LAYOUT (1024px+) */}
          <div className="hidden lg:flex justify-between items-end min-h-[580px] xl:min-h-[640px] pb-4 relative w-full">
            
            {/* 1. LEFT COLUMN: IDENTITY & INTRO */}
            <div className="max-w-[380px] xl:max-w-[430px] flex flex-col justify-end space-y-3.5 pb-2 relative z-20">
              {/* Thingós Editorial Italic Serif Introduction */}
              <div className="flex items-center gap-2 pl-0.5">
                <span className="font-thingos italic text-2xl xl:text-3xl text-[#E8DCC8] font-semibold tracking-wide">
                  Hello, I&apos;m
                </span>
              </div>

              {/* Stacked Name: MD. DANISH RAZA (Montega Luxury Editorial Serif) */}
              <div className="flex flex-col select-none space-y-1 pt-0.5">
                <span className="text-4xl sm:text-5xl xl:text-[3.5rem] font-bold uppercase text-white tracking-[-0.02em] leading-[1.02] font-serif drop-shadow-md">
                  {portfolioData.personal.firstName}
                </span>
                <span className="text-4xl sm:text-5xl xl:text-[3.5rem] font-bold uppercase text-white tracking-[-0.02em] leading-[1.02] font-serif drop-shadow-md whitespace-nowrap">
                  {portfolioData.personal.lastName}
                </span>
              </div>

              {/* Red Role (Montega Editorial Serif) */}
              <div className="flex flex-col pt-1">
                <span className="text-xl sm:text-2xl xl:text-[1.65rem] font-bold uppercase text-crimson tracking-tight font-serif leading-tight">
                  FULL-STACK DEVELOPER
                </span>
              </div>

              {/* Subtitle & Tagline (Clean Modern Sans) */}
              <div className="space-y-1.5 pt-0.5">
                <p className="text-xs font-bold tracking-wider text-neutral-300 uppercase font-sans">
                  {portfolioData.personal.subtitle}
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                  {portfolioData.personal.tagline}
                </p>
              </div>

              {/* Location Badge (Clean Sans) */}
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-neutral-300 uppercase pt-1 font-sans">
                <MapPin size={14} className="text-crimson" />
                <span>BASED IN: {portfolioData.personal.location}</span>
              </div>

              {/* CTA Buttons (Clean Sans) */}
              <div className="flex items-center gap-3 pt-3">
                <Button href="#projects" variant="primary" size="md">
                  <span>View My Work</span>
                  <ArrowRight size={15} className="ml-1.5" />
                </Button>

                <Button href="#contact" variant="outline" size="md">
                  <span>Let&apos;s Talk</span>
                </Button>
              </div>
            </div>

            {/* 2. CENTER COLUMN: LARGE HALF-BODY PORTRAIT (TRUE 50% HORIZONTAL CENTER) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex justify-center items-end pointer-events-none select-none z-10 h-[560px] xl:h-[620px]">
              <div className="relative w-[380px] xl:w-[440px] h-[560px] xl:h-[620px]">
                <Image
                  src="/images/portrait/danish-portrait-2x.png"
                  alt="Md. Danish Raza - Full-Stack Developer Portrait"
                  fill
                  priority
                  quality={95}
                  sizes="(max-width: 1280px) 400px, 460px"
                  className="object-contain object-bottom"
                />
              </div>
            </div>

            {/* 3. RIGHT COLUMN: EDITORIAL METADATA */}
            <div className="w-[260px] xl:w-[280px] flex flex-col justify-end space-y-6 pb-6 relative z-20 ml-auto">
              <MetadataItem
                icon={GraduationCap}
                label={portfolioData.metadata.currently.label}
                value={portfolioData.metadata.currently.items}
              />

              <MetadataItem
                icon={CalendarDays}
                label={portfolioData.metadata.graduating.label}
                value={portfolioData.metadata.graduating.items}
              />

              <MetadataItem
                icon={Code2}
                label={portfolioData.metadata.focusedOn.label}
                value={portfolioData.metadata.focusedOn.value}
              />

              <MetadataItem
                icon={BriefcaseBusiness}
                label={portfolioData.metadata.openFor.label}
                value={portfolioData.metadata.openFor.items}
              />
            </div>

          </div>

          {/* MOBILE & TABLET LAYOUT (< 1024px) */}
          <div className="lg:hidden flex flex-col items-center text-center pt-20 sm:pt-24 space-y-6 pb-4">
            
            {/* 1. Mobile Portrait (Centered & Proportional) */}
            <div className="relative w-[240px] sm:w-[300px] md:w-[340px] h-[320px] sm:h-[400px] md:h-[450px] pointer-events-none select-none">
              <Image
                src="/images/portrait/danish-portrait-2x.png"
                alt="Md. Danish Raza - Full-Stack Developer Portrait"
                fill
                priority
                quality={95}
                sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 340px"
                className="object-contain object-bottom"
              />
            </div>

            {/* 2. Identity Group: Hello, I'm -> MD. DANISH RAZA -> FULL-STACK DEVELOPER */}
            <div className="flex flex-col items-center space-y-2">
              <span className="font-thingos italic text-xl sm:text-2xl text-[#E8DCC8] font-semibold tracking-wide">
                Hello, I&apos;m
              </span>

              <div className="flex flex-col select-none space-y-1">
                <span className="text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight leading-[1.05] font-serif">
                  {portfolioData.personal.firstName}
                </span>
                <span className="text-3xl sm:text-4xl font-bold uppercase text-white tracking-tight leading-[1.05] font-serif">
                  {portfolioData.personal.lastName}
                </span>
              </div>

              <span className="text-base sm:text-xl font-bold uppercase text-crimson tracking-tight font-serif pt-0.5">
                FULL-STACK DEVELOPER
              </span>
            </div>

            {/* 3. Subheading, Description & Location */}
            <div className="space-y-2 max-w-md px-4">
              <p className="text-xs font-bold tracking-wider text-neutral-300 uppercase font-sans">
                {portfolioData.personal.subtitle}
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {portfolioData.personal.tagline}
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-neutral-300 uppercase pt-1 font-sans">
                <MapPin size={13} className="text-crimson" />
                <span>BASED IN: {portfolioData.personal.location}</span>
              </div>
            </div>

            {/* 4. CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2 w-full max-w-xs sm:max-w-none px-4">
              <Button href="#projects" variant="primary" size="md" className="w-full sm:w-auto min-h-[44px]">
                <span>View My Work</span>
                <ArrowRight size={14} className="ml-1.5" />
              </Button>

              <Button href="#contact" variant="outline" size="md" className="w-full sm:w-auto min-h-[44px]">
                <span>Let&apos;s Talk</span>
              </Button>
            </div>

            {/* 5. Profile Information Cards (Responsive Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full pt-8 border-t border-white/[0.08] text-left px-2 sm:px-4">
              <MetadataItem
                icon={GraduationCap}
                label={portfolioData.metadata.currently.label}
                value={portfolioData.metadata.currently.items}
              />
              <MetadataItem
                icon={CalendarDays}
                label={portfolioData.metadata.graduating.label}
                value={portfolioData.metadata.graduating.items}
              />
              <MetadataItem
                icon={Code2}
                label={portfolioData.metadata.focusedOn.label}
                value={portfolioData.metadata.focusedOn.value}
              />
              <MetadataItem
                icon={BriefcaseBusiness}
                label={portfolioData.metadata.openFor.label}
                value={portfolioData.metadata.openFor.items}
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
