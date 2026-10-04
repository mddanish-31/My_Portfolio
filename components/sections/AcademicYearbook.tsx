'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { ArrowLeft, ArrowRight, GraduationCap, CheckCircle2, Clock, Sparkles, Compass } from 'lucide-react';
import { academicRecords, SemesterRecord, calculateCumulativeCGPA } from '@/data/academics';
import type { AcademicYearbookContent } from '@/lib/cms/types';
import { cn } from '@/lib/utils';

export interface AcademicYearbookProps {
  content?: AcademicYearbookContent;
}

export const AcademicYearbook: React.FC<AcademicYearbookProps> = ({ content }) => {
  const allRecords = useMemo(() => {
    const rawRecords = content?.records && content.records.length > 0 ? content.records : academicRecords;
    return rawRecords.map((r, i) => {
      const fallback = academicRecords[i] || academicRecords[0];
      return {
        ...fallback,
        ...r,
        overview: r.overview !== undefined ? r.overview : fallback.overview,
        academicFocus: r.academicFocus !== undefined ? r.academicFocus : fallback.academicFocus,
        journalTitle: r.journalTitle !== undefined ? r.journalTitle : (fallback.journalTitle || 'SEMESTER HIGHLIGHTS'),
        journalDescription: r.journalDescription !== undefined ? r.journalDescription : (r.notes || fallback.journalDescription || fallback.notes),
        highlights: (r.highlights && r.highlights.length > 0) ? r.highlights : fallback.highlights,
      };
    });
  }, [content?.records]);

  const records = allRecords.filter((r) => r.visible !== false);
  const [activeSemIndex, setActiveSemIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalSemesters = records.length;
  const currentRecord: SemesterRecord = records[activeSemIndex] || records[0] || academicRecords[0];

  const handleSelectSemester = useCallback(
    (index: number) => {
      if (index === activeSemIndex || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSemIndex(index);
        setIsTransitioning(false);
      }, 200);
    },
    [activeSemIndex, isTransitioning]
  );

  const handlePrevSemester = useCallback(() => {
    if (isTransitioning) return;
    const prevIndex = (activeSemIndex - 1 + totalSemesters) % totalSemesters;
    handleSelectSemester(prevIndex);
  }, [activeSemIndex, totalSemesters, isTransitioning, handleSelectSemester]);

  const handleNextSemester = useCallback(() => {
    if (isTransitioning) return;
    const nextIndex = (activeSemIndex + 1) % totalSemesters;
    handleSelectSemester(nextIndex);
  }, [activeSemIndex, totalSemesters, isTransitioning, handleSelectSemester]);

  const semesterNumber = parseInt(currentRecord.semester, 10) || 1;
  const leftPageNum = currentRecord.pageNumber?.left || `PAGE 0${semesterNumber * 2 - 1}`;
  const rightPageNum = currentRecord.pageNumber?.right || `PAGE 0${semesterNumber * 2}`;
  const semesterTitle = currentRecord.title || currentRecord.semesterRoman || `SEMESTER ${currentRecord.semester}`;
  const universityName = currentRecord.university || currentRecord.institution || content?.institution || 'ADAMAS UNIVERSITY';
  const programName = currentRecord.program || currentRecord.degree || content?.degree || 'B.TECH COMPUTER SCIENCE & ENGINEERING';
  const journalHeading = currentRecord.journalTitle || 'SEMESTER HIGHLIGHTS';
  const journalBody = currentRecord.journalDescription || currentRecord.notes || '';
  const rawCredits = currentRecord.credits !== undefined && currentRecord.credits !== null ? String(currentRecord.credits).trim() : (currentRecord.creditsEarned ? String(currentRecord.creditsEarned).trim() : '');
  const creditsVal = rawCredits !== '' && rawCredits !== '—' && rawCredits !== '-' ? rawCredits : '—';

  const calculatedCGPA = useMemo(() => {
    return calculateCumulativeCGPA(allRecords, currentRecord.semester || (activeSemIndex + 1));
  }, [allRecords, currentRecord.semester, activeSemIndex]);

  return (
    <section
      id="academic"
      className="relative min-h-screen w-full bg-[#040404] pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 border-t border-white/[0.06] overflow-x-hidden flex flex-col justify-between select-none"
      aria-label="Academic Yearbook Section"
    >
      {/* 1. ATMOSPHERIC BURGUNDY & CRIMSON DEPTH GLOWS */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(180,15,30,0.14),rgba(50,8,12,0.05)_55%,rgba(4,4,4,0)_80%)] z-0"
        aria-hidden="true"
      />

      <div
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] lg:w-[1000px] h-[350px] lg:h-[480px] rounded-full bg-crimson/[0.08] blur-[120px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div
        className="absolute top-[65%] left-[20%] -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-crimson-dark/[0.09] blur-[100px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div
        className="absolute top-[65%] left-[80%] -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-crimson-dark/[0.09] blur-[100px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 2. MAIN CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between gap-8 sm:gap-10 lg:gap-12">
        
        {/* =========================================================================
            SECTION HEADER: TOP BAR + CHAPTER 02 EDITORIAL INTRODUCTION
            ========================================================================= */}
        <div>
          {/* Top Identifier Bar */}
          <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-crimson inline-block animate-pulse shadow-[0_0_8px_rgba(215,25,47,0.9)]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-white uppercase font-sans">
                {content?.eyebrow || 'ACADEMIC RECORDS'}
              </span>
            </div>

            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-300 font-semibold">
              MY ACADEMIC YEARBOOK
            </span>
          </div>

          {/* Chapter Editorial Intro */}
          <div className="pt-8 sm:pt-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 sm:space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-crimson font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
                <span className="w-4 h-[1.5px] bg-crimson inline-block" />
                <span>{content?.chapter || 'CHAPTER 02'}</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-white font-editorial tracking-tight leading-[0.95] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
                {Array.isArray(content?.heading) && content.heading.length > 0 ? (
                  content.heading.map((line, i) => (
                    <React.Fragment key={i}>
                      {i === 1 ? (
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
                          {line}
                        </span>
                      ) : (
                        line
                      )}
                      {i < content.heading.length - 1 && <br />}
                    </React.Fragment>
                  ))
                ) : (
                  <>
                    ACADEMIC<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
                      YEARBOOK
                    </span>
                  </>
                )}
              </h2>
            </div>

            <div className="max-w-md lg:pb-2">
              <p className="text-sm sm:text-base text-[#ded8cf] font-sans leading-relaxed font-light">
                {content?.subheading ||
                  'An editorial semester-by-semester academic chronicle documenting undergraduate milestones, performance, and key learnings.'}
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            MAIN OPEN DIGITAL YEARBOOK SPREAD (CONNECTED DUAL-PAGE LIQUID GLASS)
            ========================================================================= */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[linear-gradient(135deg,rgba(18,7,10,0.88)_0%,rgba(8,3,5,0.94)_100%)] backdrop-blur-3xl backdrop-saturate-[160%] border border-white/[0.16] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95),0_0_60px_rgba(215,25,47,0.18),inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(0,0,0,0.6)] overflow-hidden">
          
          {/* Subtle internal liquid glass specular sheen */}
          <div
            className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_90%_50%_at_20%_0%,rgba(255,255,255,0.08)_0%,transparent_60%),linear-gradient(125deg,rgba(255,255,255,0.03)_0%,transparent_40%,rgba(215,25,47,0.05)_75%,transparent_100%)] z-0"
            aria-hidden="true"
          />

          {/* Top Specular Edge Highlight / Crimson Glow Bar */}
          <div
            className="absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none z-20 bg-gradient-to-r from-transparent via-crimson to-transparent shadow-[0_0_15px_rgba(215,25,47,0.8)] opacity-90"
            aria-hidden="true"
          />

          {/* Center Spine Seam (Desktop) */}
          <div
            className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2 bg-gradient-to-b from-white/25 via-white/[0.10] to-white/15 z-20 pointer-events-none shadow-[0_0_12px_rgba(0,0,0,0.8)]"
            aria-hidden="true"
          />

          {/* Connected Two-Page Grid (Side-by-side on Desktop, Vertically Stacked on Mobile) */}
          <div
            className={cn(
              'flex flex-col lg:grid lg:grid-cols-2 relative z-10 transition-opacity duration-200 min-h-[560px] lg:min-h-[620px] h-auto',
              isTransitioning ? 'opacity-0 scale-[0.995]' : 'opacity-100 scale-100'
            )}
          >

            {/* =========================================================================
                LEFT PAGE: SEMESTER RECORD / ACADEMIC SNAPSHOT & EDITORIAL OVERVIEW
                ========================================================================= */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.10] relative h-full gap-6">
              {/* Left Page Corner Watermark */}
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest pointer-events-none select-none pb-1 font-medium">
                ACADEMIC SPREAD • {leftPageNum}
              </div>

              {/* Top Header Information & Content */}
              <div className="space-y-5 sm:space-y-6 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pt-1">
                  <div>
                    <span className="text-xs sm:text-sm font-mono font-bold text-crimson uppercase tracking-[0.2em] block mb-1.5">
                      {currentRecord.academicYear} • {currentRecord.term}
                    </span>
                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] font-bold uppercase text-white font-editorial tracking-tight leading-[1.05] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                      {semesterTitle}
                    </h3>
                  </div>

                  {/* Status Badge */}
                  <div
                    className={cn(
                      'self-start px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 border shadow-sm shrink-0',
                      currentRecord.status === 'COMPLETED'
                        ? 'bg-emerald-950/60 border-emerald-400/50 text-emerald-200 shadow-[0_0_10px_rgba(52,211,153,0.2)]'
                        : currentRecord.status === 'IN PROGRESS'
                        ? 'bg-crimson/25 border-crimson/50 text-white shadow-[0_0_10px_rgba(215,25,47,0.3)]'
                        : 'bg-white/[0.06] border-white/20 text-neutral-300'
                    )}
                  >
                    {currentRecord.status === 'COMPLETED' ? (
                      <CheckCircle2 size={13} className="text-emerald-300" />
                    ) : currentRecord.status === 'IN PROGRESS' ? (
                      <span className="w-2 h-2 rounded-full bg-crimson animate-pulse shadow-[0_0_6px_rgba(215,25,47,0.9)]" />
                    ) : (
                      <Clock size={13} className="text-neutral-400" />
                    )}
                    <span>{currentRecord.status}</span>
                  </div>
                </div>

                {/* Institution & Degree Meta */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm sm:text-[15px] font-sans border-b border-white/[0.10] pb-4">
                  <span className="text-white font-bold tracking-wide uppercase font-poster">{universityName}</span>
                  <span className="text-crimson font-bold">•</span>
                  <span className="text-[#ede7e1] font-medium">{programName}</span>
                </div>

                {/* 3 Performance Metric Cards: SGPA / CGPA / Credits */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.12] backdrop-blur-md flex flex-col justify-between">
                    <span className="text-xs font-mono text-neutral-300 uppercase tracking-wider font-semibold block">
                      SEMESTER SGPA
                    </span>
                    <span className="text-3xl sm:text-4xl font-bold font-editorial text-white tracking-tight my-1.5 block">
                      {currentRecord.sgpa || '—'}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block font-medium">
                      {currentRecord.status === 'COMPLETED' ? 'OFFICIAL GRADE' : 'TERM ACTIVE'}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.12] backdrop-blur-md flex flex-col justify-between">
                    <span className="text-xs font-mono text-neutral-300 uppercase tracking-wider font-semibold block">
                      CUMULATIVE CGPA
                    </span>
                    <span className="text-3xl sm:text-4xl font-bold font-editorial text-crimson tracking-tight my-1.5 block drop-shadow-[0_0_12px_rgba(215,25,47,0.5)]">
                      {calculatedCGPA}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block font-medium">
                      {currentRecord.status === 'COMPLETED' ? 'RECORD VERIFIED' : 'PENDING EVALUATION'}
                    </span>
                  </div>

                  <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-white/[0.04] border border-white/[0.12] backdrop-blur-md flex flex-col justify-between">
                    <span className="text-xs font-mono text-neutral-300 uppercase tracking-wider font-semibold block">
                      ACADEMIC CREDITS
                    </span>
                    <span className="text-3xl sm:text-4xl font-bold font-editorial text-neutral-100 tracking-tight my-1.5 block">
                      {creditsVal}
                    </span>
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block font-medium">
                      EARNED UNITS
                    </span>
                  </div>
                </div>

                {/* Editorial Overview Section */}
                {currentRecord.overview && (
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center gap-2 pb-1.5 border-b border-white/[0.08]">
                      <Sparkles size={14} className="text-crimson" />
                      <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#ede7e1] font-bold">
                        SEMESTER OVERVIEW
                      </span>
                    </div>
                    <p className="text-sm sm:text-[15px] lg:text-base text-[#ded8cf] font-sans leading-relaxed font-light break-words">
                      {currentRecord.overview}
                    </p>
                  </div>
                )}

                {/* Academic Focus Statement */}
                {currentRecord.academicFocus && (
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="text-[10.5px] font-mono text-crimson font-bold uppercase tracking-wider shrink-0 bg-crimson/15 px-2.5 py-1 rounded border border-crimson/30 self-start sm:self-center">
                      ACADEMIC FOCUS
                    </span>
                    <span className="text-xs sm:text-sm text-white font-sans font-medium break-words leading-relaxed">
                      {currentRecord.academicFocus}
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Left Page Footer */}
              <div className="pt-6 mt-auto border-t border-white/[0.10] flex items-center justify-between text-xs sm:text-[13px] font-mono text-neutral-400 uppercase tracking-wider shrink-0 font-medium">
                <span>UNDERGRADUATE RECORD</span>
                <span className="text-neutral-300 font-semibold">{leftPageNum}</span>
              </div>
            </div>

            {/* =========================================================================
                RIGHT PAGE: JOURNAL & SEMESTER HIGHLIGHTS
                ========================================================================= */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative bg-gradient-to-br from-transparent to-white/[0.015] h-full gap-6">
              {/* Right Page Corner Watermark */}
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest pointer-events-none select-none pb-1 text-right font-medium">
                {rightPageNum} • SEMESTER ARCHIVE
              </div>

              {/* Top Header Information & Content */}
              <div className="space-y-5 sm:space-y-6 flex-1">
                <div className="pt-1">
                  <span className="text-xs sm:text-sm font-mono font-bold text-crimson uppercase tracking-[0.2em] block mb-1.5">
                    JOURNAL & MILESTONES
                  </span>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] font-bold uppercase text-white font-editorial tracking-tight leading-[1.05] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                    {journalHeading}
                  </h3>
                </div>

                {/* Editorial Notes / Journal Description Quote */}
                {journalBody && (
                  <div className="p-4.5 sm:p-5 rounded-2xl bg-white/[0.04] border border-white/[0.12] backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-crimson shadow-[0_0_10px_rgba(215,25,47,0.8)]" />
                    <p className="text-sm sm:text-base md:text-[1.05rem] text-[#f5f1eb] font-sans leading-relaxed font-light italic pl-2.5">
                      &ldquo;{journalBody}&rdquo;
                    </p>
                  </div>
                )}

                {/* Highlight Cards (Editorial Blocks) */}
                {currentRecord.highlights && currentRecord.highlights.length > 0 && (
                  <div className="space-y-3 pt-1">
                    <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#ede7e1] font-bold flex items-center gap-2 pb-2.5 border-b border-white/[0.10]">
                      <Compass size={15} className="text-crimson" />
                      <span>KEY LEARNINGS & ARCHIVES</span>
                    </span>

                    <div className="space-y-3.5">
                      {currentRecord.highlights.map((highlight, idx) => (
                        <div
                          key={highlight.id || highlight.title || idx}
                          className="p-4 sm:p-4.5 rounded-2xl bg-white/[0.035] hover:bg-white/[0.06] border border-white/[0.10] hover:border-white/[0.18] transition-all space-y-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                        >
                          <div className="flex items-start sm:items-center justify-between gap-2.5 flex-wrap">
                            <h4 className="text-sm sm:text-base lg:text-[1.05rem] font-bold text-white uppercase font-poster tracking-wide break-words">
                              {highlight.title}
                            </h4>
                            {(highlight.label || highlight.tag) && (
                              <span className="px-2.5 py-0.5 rounded-full bg-crimson/20 border border-crimson/40 text-xs font-mono font-bold text-crimson uppercase tracking-wider shrink-0 shadow-[0_0_8px_rgba(215,25,47,0.3)]">
                                {highlight.label || highlight.tag}
                              </span>
                            )}
                          </div>
                          {highlight.description && (
                            <p className="text-sm sm:text-[15px] lg:text-base text-[#ded8cf] font-sans leading-relaxed font-light break-words">
                              {highlight.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Academic Certification & Seal */}
                <div className="pt-2">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3.5 flex-wrap sm:flex-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson shrink-0 shadow-[0_0_10px_rgba(215,25,47,0.3)]">
                        <GraduationCap size={18} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs sm:text-sm font-bold text-white font-poster uppercase tracking-wider break-words">
                          {universityName} CSE ARCHIVE
                        </span>
                        <span className="text-xs sm:text-[13px] font-mono text-neutral-300">
                          COHORT 2024 — 2028 • {programName}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest hidden sm:inline-block shrink-0 font-medium">
                      VERIFIED LOG
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Right Page Footer */}
              <div className="pt-6 mt-auto border-t border-white/[0.10] flex items-center justify-between text-xs sm:text-[13px] font-mono text-neutral-400 uppercase tracking-wider shrink-0 font-medium">
                <span>{universityName}</span>
                <span className="text-neutral-300 font-semibold">{rightPageNum}</span>
              </div>
            </div>

          </div>

        </div>

        {/* =========================================================================
            BOTTOM SEMESTER NAVIGATION — CENTERED LIQUID GLASS SELECTOR
            ========================================================================= */}
        <div className="flex items-center justify-center pt-2">
          
          <div className="relative inline-flex items-center gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] backdrop-blur-2xl backdrop-saturate-[150%] border border-white/[0.16] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.22),inset_0_-1px_1px_rgba(0,0,0,0.5)] max-w-full overflow-x-auto scrollbar-none">
            
            {/* Previous Semester Arrow */}
            <button
              type="button"
              onClick={handlePrevSemester}
              disabled={isTransitioning}
              aria-label="Previous Semester"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.05] hover:bg-crimson/25 border border-white/[0.12] hover:border-crimson text-neutral-300 hover:text-white transition-all flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-crimson active:scale-95 disabled:opacity-30 cursor-pointer shrink-0"
            >
              <ArrowLeft size={15} />
            </button>

            {/* Semester Buttons (SEM 01 ... SEM 08) */}
            <div className="flex items-center gap-1 sm:gap-1.5 px-1">
              {records.map((record, idx) => {
                const isActive = idx === activeSemIndex;
                return (
                  <button
                    key={record.id || idx}
                    type="button"
                    onClick={() => handleSelectSemester(idx)}
                    disabled={isTransitioning}
                    className={cn(
                      'relative z-10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm md:text-[14px] font-mono font-bold tracking-wider transition-all duration-300 rounded-full cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-crimson shrink-0 select-none',
                      isActive
                        ? 'text-crimson bg-crimson/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_0_15px_rgba(215,25,47,0.45)]'
                        : 'text-neutral-300 hover:text-white hover:bg-white/[0.05]'
                    )}
                    aria-label={`Select Semester ${record.semester}`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span>SEM {record.semester}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 sm:left-4 sm:right-4 h-[2px] bg-crimson rounded-full shadow-[0_0_8px_rgba(215,25,47,0.9)]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Next Semester Arrow */}
            <button
              type="button"
              onClick={handleNextSemester}
              disabled={isTransitioning}
              aria-label="Next Semester"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.05] hover:bg-crimson/25 border border-white/[0.12] hover:border-crimson text-neutral-300 hover:text-white transition-all flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-crimson active:scale-95 disabled:opacity-30 cursor-pointer shrink-0"
            >
              <ArrowRight size={15} />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
