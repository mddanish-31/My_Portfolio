'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  allSkillsData,
  skillCategoriesData,
  coreStackItems,
  TechSkill,
  ProficiencyLevel,
} from '@/data/skills';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  Cpu,
  Terminal,
  Globe,
  Layout,
  GitBranch,
  Box,
  Server,
  Zap,
  CheckCircle2,
  Eye,
  Hand,
  Coffee,
} from 'lucide-react';

// =========================================================================
// HELPER: RENDER TECH ICONS
// =========================================================================
const TechIcon: React.FC<{ type: string; className?: string; size?: number }> = ({
  type,
  className = 'w-4 h-4',
  size = 15,
}) => {
  switch (type) {
    case 'react':
      return (
        <svg
          viewBox="-11.5 -10.23174 23 20.46348"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          className={cn('text-cyan-400', className)}
          style={{ width: size, height: size }}
        >
          <circle cx="0" cy="0" r="2.05" fill="currentColor" />
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </svg>
      );
    case 'nextjs':
      return (
        <svg
          viewBox="0 0 180 180"
          fill="currentColor"
          className={cn('text-white', className)}
          style={{ width: size, height: size }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0ZM143.555 149.615L64.218 47.7818H47.7818V132.218H62.7758V66.8624L131.782 155.455C135.845 153.714 139.789 151.751 143.555 149.615ZM132.218 47.7818H117.224V115.654L132.218 134.887V47.7818Z"
          />
        </svg>
      );
    case 'typescript':
      return (
        <span className="font-mono font-bold text-[9.5px] tracking-tighter text-blue-400 bg-blue-950/70 px-1 py-0.2 rounded border border-blue-500/40">
          TS
        </span>
      );
    case 'javascript':
      return (
        <span className="font-mono font-bold text-[9.5px] tracking-tighter text-amber-300 bg-amber-950/70 px-1 py-0.2 rounded border border-amber-500/40">
          JS
        </span>
      );
    case 'nodejs':
      return <Server size={size} className={cn('text-emerald-400', className)} />;
    case 'express':
      return <Zap size={size} className={cn('text-neutral-300', className)} />;
    case 'mongodb':
      return <Database size={size} className={cn('text-emerald-400', className)} />;
    case 'tailwind':
      return <Sparkles size={size} className={cn('text-cyan-400', className)} />;
    case 'python':
      return <Code2 size={size} className={cn('text-amber-400', className)} />;
    case 'c':
      return (
        <span className="font-mono font-bold text-[9.5px] tracking-tighter text-sky-400 bg-sky-950/70 px-1.5 py-0.2 rounded border border-sky-500/40">
          C
        </span>
      );
    case 'cpp':
      return (
        <span className="font-mono font-bold text-[9px] tracking-tighter text-blue-300 bg-blue-950/70 px-1 py-0.2 rounded border border-blue-500/40">
          C++
        </span>
      );
    case 'java':
      return <Coffee size={size} className={cn('text-amber-500', className)} />;
    case 'opencv':
      return <Eye size={size} className={cn('text-emerald-400', className)} />;
    case 'mediapipe':
      return <Hand size={size} className={cn('text-sky-400', className)} />;
    case 'neural':
      return <Cpu size={size} className={cn('text-rose-400', className)} />;
    case 'postgresql':
      return <Database size={size} className={cn('text-sky-400', className)} />;
    case 'mysql':
      return <Database size={size} className={cn('text-amber-400', className)} />;
    case 'prisma':
      return <Layers size={size} className={cn('text-teal-400', className)} />;
    case 'redis':
      return <Database size={size} className={cn('text-rose-400', className)} />;
    case 'git':
      return <GitBranch size={size} className={cn('text-orange-400', className)} />;
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }} className={className}>
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case 'docker':
      return <Box size={size} className={cn('text-sky-400', className)} />;
    case 'vercel':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }} className={className}>
          <path d="M12 1L24 22H0L12 1Z" />
        </svg>
      );
    case 'vscode':
      return <Terminal size={size} className={cn('text-blue-400', className)} />;
    case 'postman':
      return <Zap size={size} className={cn('text-orange-400', className)} />;
    case 'figma':
      return <Layout size={size} className={cn('text-purple-400', className)} />;
    case 'palette':
      return <Layout size={size} className={cn('text-rose-400', className)} />;
    case 'smartphone':
      return <Globe size={size} className={cn('text-cyan-400', className)} />;
    case 'sparkles':
      return <Sparkles size={size} className={cn('text-amber-300', className)} />;
    default:
      return <Code2 size={size} className={cn('text-neutral-400', className)} />;
  }
};

// =========================================================================
// HELPER: PROFICIENCY BADGE STYLES
// =========================================================================
const getProficiencyBadgeStyle = (level: ProficiencyLevel, isMini = false) => {
  switch (level) {
    case 'Advanced':
      return isMini
        ? 'bg-crimson/20 border-crimson/50 text-white'
        : 'bg-[linear-gradient(135deg,rgba(215,25,47,0.25)_0%,rgba(122,16,27,0.35)_100%)] border-crimson/60 text-white shadow-[0_0_10px_rgba(215,25,47,0.35),inset_0_1px_1px_rgba(255,255,255,0.25)]';
    case 'Intermediate':
      return isMini
        ? 'bg-blue-950/60 border-blue-500/40 text-blue-200'
        : 'bg-[linear-gradient(135deg,rgba(30,58,138,0.30)_0%,rgba(15,23,42,0.60)_100%)] border-blue-500/40 text-blue-200 shadow-[0_0_10px_rgba(59,130,246,0.2),inset_0_1px_1px_rgba(255,255,255,0.15)]';
    case 'Beginner':
      return isMini
        ? 'bg-neutral-900/60 border-neutral-700/50 text-neutral-300'
        : 'bg-[linear-gradient(135deg,rgba(60,60,60,0.25)_0%,rgba(20,20,20,0.60)_100%)] border-white/20 text-neutral-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]';
  }
};

// =========================================================================
// MAIN SKILLS COMPONENT
// =========================================================================
export const Skills: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<string>('development');
  const [selectedSkillId, setSelectedSkillId] = useState<string>('react');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [isCategoryTransitioning, setIsCategoryTransitioning] = useState<boolean>(false);
  const [isDetailTransitioning, setIsDetailTransitioning] = useState<boolean>(false);

  // Active Category Data
  const currentCategory = useMemo(() => {
    return (
      skillCategoriesData.find((c) => c.id === activeCategoryId) ||
      skillCategoriesData[0]
    );
  }, [activeCategoryId]);

  // Skills in Current Category
  const categorySkills = useMemo(() => {
    return allSkillsData.filter((s) => s.category === activeCategoryId);
  }, [activeCategoryId]);

  // Active Selected Skill
  const selectedSkill = useMemo(() => {
    return (
      allSkillsData.find((s) => s.id === selectedSkillId) ||
      categorySkills[0] ||
      allSkillsData[0]
    );
  }, [selectedSkillId, categorySkills]);

  // Select a category and its first skill with smooth transition
  const handleSelectCategory = useCallback(
    (categoryId: string) => {
      if (categoryId === activeCategoryId) return;
      setIsCategoryTransitioning(true);
      setIsDetailTransitioning(true);
      setActiveCategoryId(categoryId);

      const firstOfCat = allSkillsData.find((s) => s.category === categoryId);
      if (firstOfCat) {
        setSelectedSkillId(firstOfCat.id);
      }

      setTimeout(() => {
        setIsCategoryTransitioning(false);
        setIsDetailTransitioning(false);
      }, 180);
    },
    [activeCategoryId]
  );

  // Select a skill
  const handleSelectSkill = useCallback(
    (skillId: string) => {
      if (skillId === selectedSkillId) return;
      setIsDetailTransitioning(true);
      setSelectedSkillId(skillId);

      const skill = allSkillsData.find((s) => s.id === skillId);
      if (skill && skill.category !== activeCategoryId) {
        setIsCategoryTransitioning(true);
        setActiveCategoryId(skill.category);
        setTimeout(() => {
          setIsCategoryTransitioning(false);
        }, 180);
      }

      setTimeout(() => {
        setIsDetailTransitioning(false);
      }, 150);
    },
    [selectedSkillId, activeCategoryId]
  );

  // Navigate to Next/Prev skill in category
  const handlePrevSkill = useCallback(() => {
    const currentIndex = categorySkills.findIndex((s) => s.id === selectedSkill.id);
    const prevIndex = (currentIndex - 1 + categorySkills.length) % categorySkills.length;
    handleSelectSkill(categorySkills[prevIndex].id);
  }, [categorySkills, selectedSkill, handleSelectSkill]);

  const handleNextSkill = useCallback(() => {
    const currentIndex = categorySkills.findIndex((s) => s.id === selectedSkill.id);
    const nextIndex = (currentIndex + 1) % categorySkills.length;
    handleSelectSkill(categorySkills[nextIndex].id);
  }, [categorySkills, selectedSkill, handleSelectSkill]);

  // Setup refs for 60fps hardware-accelerated orbital animation without React re-renders
  const nodeRefs = React.useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const beamRef = React.useRef<SVGLineElement | null>(null);
  const targetRef = React.useRef<SVGCircleElement | null>(null);
  const lastTimeRef = React.useRef<number>(0);
  const accumulatedTimeRef = React.useRef<number>(0);
  const isRotatingRef = React.useRef<boolean>(isRotating);
  isRotatingRef.current = isRotating;

  const selectedSkillIdRef = React.useRef<string>(selectedSkill.id);
  selectedSkillIdRef.current = selectedSkill.id;

  // Calculate multi-layer orbital configurations with phase offsets & distinct speeds
  const orbitalNodesConfig = useMemo(() => {
    const count = categorySkills.length;
    return categorySkills.map((skill, index) => {
      // Angular distribution starting from top (-π/2)
      const baseAngle = (index / count) * 2 * Math.PI - Math.PI / 2;
      
      // Multi-layer orbits:
      // Outer orbit: ~216x164, speed 0.00011 rad/ms (~57s per full revolution)
      // Inner orbit: ~156x118, speed 0.00017 rad/ms (~37s per full revolution)
      const isEven = index % 2 === 0;
      const radiusX = isEven ? 216 : 156;
      const radiusY = isEven ? 164 : 118;
      const speed = isEven ? 0.00011 : 0.00017;

      return {
        ...skill,
        baseAngle,
        radiusX,
        radiusY,
        speed,
      };
    });
  }, [categorySkills]);

  // Performant requestAnimationFrame loop for continuous orbital motion
  React.useEffect(() => {
    let animationFrameId: number;
    let isMounted = true;

    // Check for user's reduced-motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = (currentTime: number) => {
      if (!isMounted) return;

      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }

      const delta = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;

      // Only advance time if rotating and reduced motion is not requested
      if (isRotatingRef.current && !prefersReducedMotion) {
        accumulatedTimeRef.current += delta;
      }

      const elapsedTime = accumulatedTimeRef.current;
      const currentSelectedId = selectedSkillIdRef.current;

      let activePos = { x: 270, y: 96 };

      orbitalNodesConfig.forEach((node) => {
        const el = nodeRefs.current[node.id];
        const isSelected = node.id === currentSelectedId;

        // Calculate angular position on orbit
        const currentAngle = prefersReducedMotion
          ? node.baseAngle
          : node.baseAngle + elapsedTime * node.speed;

        const posX = 270 + Math.cos(currentAngle) * node.radiusX;
        const posY = 260 + Math.sin(currentAngle) * node.radiusY;

        if (isSelected) {
          activePos = { x: posX, y: posY };
        }

        if (el) {
          // Depth calculation based on Y position (sin of angle)
          const depth = (Math.sin(currentAngle) + 1) / 2; // 0 (top/back) to 1 (bottom/front)
          const depthScale = 0.94 + 0.10 * depth; // 0.94 to 1.04
          const depthOpacity = 0.82 + 0.18 * depth; // 0.82 to 1.0

          const finalScale = isSelected ? depthScale * 1.08 : depthScale;
          const finalOpacity = isSelected ? 1 : depthOpacity;
          const zIndex = isSelected ? 35 : Math.round(10 + depth * 15);

          // Apply 3D hardware-accelerated transform: Card stays strictly upright without rotation
          el.style.transform = `translate3d(${posX - 270}px, ${posY - 260}px, 0) translate(-50%, -50%) scale(${finalScale})`;
          el.style.opacity = `${finalOpacity}`;
          el.style.zIndex = `${zIndex}`;
        }
      });

      // Update SVG laser beam & active target indicator to track active node smoothly
      if (beamRef.current) {
        beamRef.current.setAttribute('x2', activePos.x.toFixed(1));
        beamRef.current.setAttribute('y2', activePos.y.toFixed(1));
      }
      if (targetRef.current) {
        targetRef.current.setAttribute('cx', activePos.x.toFixed(1));
        targetRef.current.setAttribute('cy', activePos.y.toFixed(1));
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
    };
  }, [orbitalNodesConfig]);

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full bg-[#040404] pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 border-t border-white/[0.06] overflow-x-hidden flex flex-col justify-between select-none"
      aria-label="Skills & Tech Stack Section"
    >
      {/* 1. ATMOSPHERIC BURGUNDY & CRIMSON DEPTH GLOWS */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_35%,rgba(180,15,30,0.15),rgba(50,8,12,0.06)_55%,rgba(4,4,4,0)_80%)] z-0"
        aria-hidden="true"
      />

      <div
        className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] lg:w-[1100px] h-[400px] sm:h-[480px] lg:h-[560px] rounded-full bg-crimson/[0.08] blur-[150px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div
        className="absolute top-[65%] left-[15%] -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-crimson-dark/[0.09] blur-[130px] pointer-events-none z-0"
        aria-hidden="true"
      />

      <div
        className="absolute top-[65%] left-[85%] -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-crimson-dark/[0.09] blur-[130px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* 2. MAIN CONTENT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between gap-6 sm:gap-7 lg:gap-8">
        {/* =========================================================================
            TOP IDENTIFIER BAR & EDITORIAL INTRODUCTION
            ========================================================================= */}
        <div>
          {/* Top Identifier Bar */}
          <div className="flex items-center justify-between pb-3.5 sm:pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-crimson inline-block animate-pulse shadow-[0_0_8px_rgba(215,25,47,0.9)]" />
              <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-white uppercase font-sans">
                TECHNICAL PROFICIENCY
              </span>
            </div>

            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-neutral-400 font-medium">
              CHAPTER 03 • TECHNICAL DNA
            </span>
          </div>

          {/* Chapter Editorial Intro */}
          <div className="pt-6 sm:pt-7 flex flex-col lg:flex-row lg:items-end justify-between gap-5">
            <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-crimson font-mono text-xs sm:text-sm font-bold tracking-widest uppercase">
                <span className="w-4 h-[1.5px] bg-crimson inline-block" />
                <span>CHAPTER 03</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-white font-editorial tracking-tight leading-[0.95] drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]">
                SKILLS &<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-neutral-400">
                  TECH STACK
                </span>
              </h2>
            </div>

            <div className="max-w-md lg:pb-1">
              <p className="text-sm sm:text-base text-[#ded8cf] font-sans leading-relaxed font-light">
                Technologies I work with, explore, and continuously learn to build meaningful digital products.
              </p>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3-COLUMN BALANCED STAGE: NAV (~25%) | ORBIT GLOBE (~50%) | DETAIL PANEL (~25%)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-7 items-stretch">
          {/* =======================================================================
              COLUMN 1: CATEGORY NAVIGATION (lg:col-span-3)
              ======================================================================= */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-3.5">
            <div className="space-y-2">
              <div className="text-[11px] font-mono font-bold tracking-[0.2em] text-crimson uppercase pb-0.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                <span>SELECT DOMAIN</span>
              </div>

              {/* Category Nav List */}
              <nav
                className="flex flex-row lg:flex-col gap-1.5 sm:gap-2 overflow-x-auto lg:overflow-x-visible pb-1.5 lg:pb-0 scrollbar-none snap-x"
                aria-label="Skill Categories"
              >
                {skillCategoriesData.map((cat) => {
                  const isActive = cat.id === activeCategoryId;
                  const catCount = allSkillsData.filter((s) => s.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      data-category-id={cat.id}
                      onClick={() => handleSelectCategory(cat.id)}
                      className={cn(
                        'group relative text-left px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-200 shrink-0 lg:shrink flex items-center justify-between border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson snap-start min-w-[145px] sm:min-w-[165px] lg:min-w-0 lg:w-full',
                        isActive
                          ? 'bg-[linear-gradient(135deg,rgba(215,25,47,0.22)_0%,rgba(122,16,27,0.28)_100%)] border-crimson/60 shadow-[0_0_20px_rgba(215,25,47,0.25),inset_0_1px_1px_rgba(255,255,255,0.18)] text-white'
                          : 'bg-white/[0.02] hover:bg-white/[0.05] border-white/[0.08] hover:border-white/[0.15] text-neutral-400 hover:text-white'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <span
                          className={cn(
                            'font-mono text-xs font-bold transition-colors',
                            isActive ? 'text-crimson' : 'text-neutral-500 group-hover:text-neutral-300'
                          )}
                        >
                          {cat.num}
                        </span>
                        <span className="text-[11px] sm:text-xs lg:text-[13px] font-bold uppercase tracking-wider font-sans whitespace-nowrap">
                          {cat.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 pl-2">
                        <span
                          className={cn(
                            'text-[10px] font-mono px-1.5 py-0.5 rounded-full border transition-colors hidden sm:inline-block',
                            isActive
                              ? 'bg-crimson/30 border-crimson/60 text-white'
                              : 'bg-white/[0.04] border-white/10 text-neutral-400'
                          )}
                        >
                          {catCount}
                        </span>
                        <ArrowRight
                          size={14}
                          className={cn(
                            'transition-transform duration-200 hidden lg:block',
                            isActive
                              ? 'text-crimson translate-x-0.5 opacity-100'
                              : 'text-neutral-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                          )}
                        />
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Category Context Summary Box with Skill List & Proficiency Badges */}
            <div className="hidden lg:block p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span className="text-crimson font-bold">CATEGORY OVERVIEW</span>
                <span>{categorySkills.length} SKILLS</span>
              </div>

              <div className="space-y-1 pt-1 border-t border-white/[0.08]">
                {categorySkills.map((sk) => {
                  const isCur = sk.id === selectedSkill.id;
                  return (
                    <button
                      key={sk.id}
                      onClick={() => handleSelectSkill(sk.id)}
                      className={cn(
                        'w-full flex items-center justify-between text-xs py-1 px-1.5 rounded transition-colors text-left group',
                        isCur
                          ? 'bg-white/[0.06] text-white font-medium'
                          : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
                      )}
                    >
                      <span className="truncate pr-2">{sk.name}</span>
                      <span
                        className={cn(
                          'text-[9px] font-mono uppercase px-1.5 py-0.2 rounded border shrink-0',
                          getProficiencyBadgeStyle(sk.level, true)
                        )}
                      >
                        {sk.level}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* =======================================================================
              COLUMN 2: MAIN INTERACTIVE TECH GLOBE (lg:col-span-6 — VERTICALLY CENTERED)
              ======================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-between relative min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] rounded-2xl sm:rounded-3xl bg-[linear-gradient(135deg,rgba(16,6,9,0.76)_0%,rgba(6,2,4,0.90)_100%)] backdrop-blur-2xl border border-white/[0.14] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(215,25,47,0.12),inset_0_1px_1px_rgba(255,255,255,0.18)] p-3 sm:p-5 overflow-hidden">
            {/* Ambient Background Radial Glow */}
            <div
              className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(215,25,47,0.24)_0%,rgba(122,16,27,0.10)_45%,transparent_75%)] z-0"
              aria-hidden="true"
            />

            {/* Orbit Stage Header Controls */}
            <div className="w-full flex items-center justify-between z-20 pb-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-crimson animate-ping" />
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-neutral-300 uppercase font-bold">
                  {currentCategory.name} ORBIT
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsRotating((prev) => !prev)}
                className="px-3 py-1 rounded-full text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-wider bg-white/[0.04] hover:bg-white/[0.08] border border-white/12 text-neutral-300 transition-colors focus-visible:ring-1 focus-visible:ring-crimson cursor-pointer"
                title={isRotating ? 'Pause Orbit Animation' : 'Resume Orbit Animation'}
                aria-label={isRotating ? 'Pause Orbit Animation' : 'Resume Orbit Animation'}
              >
                {isRotating ? 'PAUSE ROTATION' : 'RESUME ROTATION'}
              </button>
            </div>

            {/* Centered Orbit Viewport Stage */}
            <div className="flex-1 w-full flex items-center justify-center relative my-auto">
              <div
                className={cn(
                  'relative w-[540px] h-[520px] flex items-center justify-center z-10 scale-[0.62] min-[380px]:scale-[0.70] min-[440px]:scale-[0.80] sm:scale-[0.90] lg:scale-[0.98] xl:scale-100 transition-all duration-300 origin-center shrink-0',
                  isCategoryTransitioning ? 'opacity-0 scale-[0.94]' : 'opacity-100'
                )}
              >
                {/* SVG Orbit Lines, Concentric Rings & Dynamic Connection Beam */}
                <svg
                  viewBox="0 0 540 520"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  aria-hidden="true"
                >
                  <defs>
                    {/* Crimson Laser Glow Filter */}
                    <filter id="crimsonLaserGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Layer 2: Outer & Inner Orbit Ellipses */}
                  <ellipse
                    cx="270"
                    cy="260"
                    rx="216"
                    ry="164"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.10)"
                    strokeWidth="1.2"
                    strokeDasharray="5 7"
                    className="animate-spin-orbit"
                    style={{
                      transformOrigin: '270px 260px',
                      animationPlayState: isRotating ? 'running' : 'paused',
                    }}
                  />
                  <ellipse
                    cx="270"
                    cy="260"
                    rx="156"
                    ry="118"
                    fill="none"
                    stroke="rgba(215, 25, 47, 0.28)"
                    strokeWidth="1.4"
                    strokeDasharray="6 8"
                    className="animate-spin-orbit-reverse"
                    style={{
                      transformOrigin: '270px 260px',
                      animationPlayState: isRotating ? 'running' : 'paused',
                    }}
                  />

                  {/* Concentric Circular Crosshairs */}
                  <circle
                    cx="270"
                    cy="260"
                    r="82"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.14)"
                    strokeWidth="1"
                    strokeDasharray="3 5"
                  />
                  <circle
                    cx="270"
                    cy="260"
                    r="110"
                    fill="none"
                    stroke="rgba(215, 25, 47, 0.18)"
                    strokeWidth="1"
                  />

                  {/* Laser Ray connecting Core (270,260) to Active Orbiting Node */}
                  <line
                    ref={beamRef}
                    x1="270"
                    y1="260"
                    x2="270"
                    y2="96"
                    stroke="#d7192f"
                    strokeWidth="2.2"
                    strokeDasharray="5 4"
                    className="animate-beam-dash"
                    style={{ animationPlayState: isRotating ? 'running' : 'paused' }}
                    filter="url(#crimsonLaserGlow)"
                    opacity="0.95"
                  />

                  {/* Target Ping Circle on Active Node Position */}
                  <circle
                    ref={targetRef}
                    cx="270"
                    cy="96"
                    r="16"
                    fill="none"
                    stroke="#d7192f"
                    strokeWidth="1.4"
                    opacity="0.8"
                    className="animate-pulse"
                  />
                </svg>

                {/* Layer 5: Central Liquid-Glass Sphere / Core */}
                <div
                  className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 lg:w-34 lg:h-34 rounded-full flex flex-col items-center justify-center p-3 text-center shadow-[0_0_55px_rgba(215,25,47,0.5),inset_0_2px_5px_rgba(255,255,255,0.45),inset_0_-5px_12px_rgba(0,0,0,0.85)] border border-white/30 bg-[radial-gradient(ellipse_at_35%_30%,rgba(255,255,255,0.30)_0%,rgba(215,25,47,0.38)_40%,rgba(15,4,6,0.96)_90%)] backdrop-blur-xl animate-pulse-core pointer-events-none"
                  style={{ animationPlayState: isRotating ? 'running' : 'paused' }}
                >
                  {/* Core Specular Top Arc */}
                  <div className="absolute top-2 left-4 right-4 h-3 rounded-full bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />

                  <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.25em] text-neutral-300 uppercase font-semibold">
                    TECHNICAL
                  </span>
                  <span className="text-base sm:text-lg lg:text-xl font-bold font-editorial text-white tracking-wider my-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    DNA
                  </span>
                  <span className="text-[7px] sm:text-[8px] font-mono tracking-[0.2em] text-crimson font-bold uppercase">
                    FULL-STACK
                  </span>
                </div>

                {/* Layer 4: Orbiting Technology Nodes (Clean pill, strictly upright orientation) */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  {orbitalNodesConfig.map((node) => {
                    const isSelected = node.id === selectedSkill.id;
                    const initX = 270 + Math.cos(node.baseAngle) * node.radiusX;
                    const initY = 260 + Math.sin(node.baseAngle) * node.radiusY;

                    return (
                      <button
                        key={node.id}
                        ref={(el) => {
                          nodeRefs.current[node.id] = el;
                        }}
                        onClick={() => handleSelectSkill(node.id)}
                        className="pointer-events-auto absolute will-change-transform group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson rounded-full"
                        style={{
                          left: '270px',
                          top: '260px',
                          transform: `translate3d(${initX - 270}px, ${initY - 260}px, 0) translate(-50%, -50%)`,
                        }}
                        title={`${node.name} (${node.level})`}
                        aria-label={`Select skill: ${node.name} - ${node.level}`}
                      >
                        {/* Node Capsule Badge */}
                        <div
                          className={cn(
                            'flex items-center gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full font-sans transition-all duration-200 backdrop-blur-md shadow-lg',
                            isSelected
                              ? 'bg-[linear-gradient(135deg,rgba(215,25,47,0.40)_0%,rgba(20,5,8,0.96)_100%)] border border-crimson text-white shadow-[0_0_25px_rgba(215,25,47,0.7),inset_0_1px_1px_rgba(255,255,255,0.4)] ring-2 ring-crimson/50'
                              : 'bg-[#0d0407]/90 hover:bg-white/[0.08] border border-white/16 text-neutral-200 hover:text-white hover:border-crimson/50'
                          )}
                        >
                          {/* Node Icon */}
                          <div
                            className={cn(
                              'w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors',
                              isSelected ? 'bg-crimson text-white' : 'bg-white/10 text-neutral-300'
                            )}
                          >
                            <TechIcon type={node.iconType} size={13} />
                          </div>

                          {/* Node Name */}
                          <span className="text-xs sm:text-[13px] lg:text-[13.5px] font-semibold tracking-normal whitespace-nowrap">
                            {node.name}
                          </span>

                          {/* Subtle Level Indicator Dot */}
                          <span
                            className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              node.level === 'Advanced'
                                ? 'bg-crimson shadow-[0_0_4px_rgba(215,25,47,0.9)]'
                                : node.level === 'Intermediate'
                                ? 'bg-blue-400 shadow-[0_0_4px_rgba(96,165,250,0.8)]'
                                : 'bg-neutral-400'
                            )}
                            title={`Level: ${node.level}`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Orbit Legend: Proficiency Level System */}
            <div className="w-full pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10.5px] sm:text-[11.5px] font-mono text-neutral-400 z-10">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-crimson inline-block shadow-[0_0_4px_rgba(215,25,47,0.8)]" />
                  <span>ADVANCED</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 inline-block shadow-[0_0_4px_rgba(96,165,250,0.6)]" />
                  <span>INTERMEDIATE</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-neutral-400 inline-block" />
                  <span>BEGINNER</span>
                </span>
              </div>

              <span className="text-neutral-500 hidden sm:inline-block">
                SELF-ASSESSED PROFICIENCY
              </span>
            </div>
          </div>

          {/* =======================================================================
              COLUMN 3: RIGHT LIQUID-GLASS DETAIL PANEL (lg:col-span-3 — AIRY & EDITORIAL)
              ======================================================================= */}
          <div className="lg:col-span-3 flex flex-col justify-between rounded-2xl bg-[linear-gradient(135deg,rgba(18,7,10,0.88)_0%,rgba(8,3,5,0.94)_100%)] backdrop-blur-2xl border border-white/[0.16] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(215,25,47,0.12),inset_0_1px_1px_rgba(255,255,255,0.2)] p-5 sm:p-6 lg:p-7 relative overflow-hidden min-h-[460px] sm:min-h-[500px] lg:min-h-[540px]">
            {/* Specular Top Highlight */}
            <div
              className="absolute top-0 left-0 right-0 h-[1.5px] pointer-events-none bg-gradient-to-r from-transparent via-crimson to-transparent shadow-[0_0_10px_rgba(215,25,47,0.8)] opacity-90"
              aria-hidden="true"
            />

            {/* Detail Content (with smooth fade transition) */}
            <div
              className={cn(
                'space-y-4 transition-opacity duration-200 flex-1 flex flex-col justify-between',
                isDetailTransitioning ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'
              )}
            >
              {/* Top Tag & Clear Proficiency Level Badge */}
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
                  <span className="text-[11px] font-mono tracking-widest text-crimson font-bold uppercase">
                    {selectedSkill.categoryLabel}
                  </span>

                  {/* Exact Proficiency Level Badge: ADVANCED / INTERMEDIATE / BEGINNER */}
                  <span
                    className={cn(
                      'px-3 py-1 rounded-full text-[10.5px] font-mono font-bold uppercase tracking-wider border',
                      getProficiencyBadgeStyle(selectedSkill.level)
                    )}
                  >
                    {selectedSkill.level.toUpperCase()}
                  </span>
                </div>

                {/* Tech Title & Role */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-crimson/20 border border-crimson/40 flex items-center justify-center text-white shrink-0">
                      <TechIcon type={selectedSkill.iconType} size={17} />
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold uppercase text-white font-editorial tracking-tight leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {selectedSkill.name}
                    </h3>
                  </div>

                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold block pt-1">
                    {selectedSkill.role}
                  </span>
                </div>

                {/* Factual Description */}
                <p className="text-sm sm:text-[14px] text-[#ded8cf] leading-relaxed font-light mt-3 pt-3 border-t border-white/[0.08]">
                  {selectedSkill.description}
                </p>
              </div>

              {/* What I Use It For */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10.5px] font-mono font-bold tracking-[0.2em] text-crimson uppercase block">
                  WHAT I USE IT FOR
                </span>
                <ul className="space-y-1.5">
                  {selectedSkill.usage.map((useItem, idx) => (
                    <li
                      key={idx}
                      className="text-xs sm:text-[13px] text-neutral-300 flex items-start gap-2 leading-tight"
                    >
                      <span className="text-crimson text-xs font-bold leading-none mt-0.5">•</span>
                      <span>{useItem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related In My Stack */}
              {selectedSkill.related && selectedSkill.related.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-white/[0.08]">
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase block">
                    RELATED IN MY STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSkill.related.map((relName) => {
                      const matchSkill = allSkillsData.find(
                        (s) => s.name.toLowerCase() === relName.toLowerCase()
                      );
                      return (
                        <button
                          key={relName}
                          onClick={() => {
                            if (matchSkill) handleSelectSkill(matchSkill.id);
                          }}
                          className="px-2.5 py-1 rounded text-xs font-mono uppercase bg-white/[0.04] hover:bg-crimson/20 border border-white/10 hover:border-crimson/50 text-neutral-300 hover:text-white transition-colors"
                        >
                          {relName}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Nav Arrows */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.08] text-xs font-mono text-neutral-400">
              <button
                onClick={handlePrevSkill}
                className="flex items-center gap-1 hover:text-white transition-colors p-1 -ml-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-crimson rounded"
                aria-label="Previous skill"
              >
                <ChevronLeft size={16} className="text-crimson" />
                <span>PREV</span>
              </button>

              <span className="text-[11px] text-neutral-500 font-medium">
                {categorySkills.findIndex((s) => s.id === selectedSkill.id) + 1} /{' '}
                {categorySkills.length}
              </span>

              <button
                onClick={handleNextSkill}
                className="flex items-center gap-1 hover:text-white transition-colors p-1 -mr-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-crimson rounded"
                aria-label="Next skill"
              >
                <span>NEXT</span>
                <ChevronRight size={16} className="text-crimson" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            BOTTOM STRIP: MY CORE STACK (CLEAN, FOCUSED LIQUID GLASS FOOTER)
            ========================================================================= */}
        <div className="w-full rounded-2xl bg-[linear-gradient(135deg,rgba(15,6,8,0.85)_0%,rgba(8,3,5,0.92)_100%)] backdrop-blur-xl border border-white/[0.12] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Label */}
          <div className="flex items-center gap-2.5 shrink-0 border-b md:border-b-0 md:border-r border-white/10 pb-2 md:pb-0 md:pr-5">
            <span className="w-2 h-2 rounded-full bg-crimson animate-pulse shadow-[0_0_6px_rgba(215,25,47,0.9)]" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] font-sans text-white uppercase">
              MY CORE STACK
            </span>
          </div>

          {/* Clean Primary Tech Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 flex-1">
            {coreStackItems.map((item, idx) => {
              const isSelected = selectedSkill.id === item.skillId;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectSkill(item.skillId)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson',
                    isSelected
                      ? 'bg-crimson/25 border-crimson text-white shadow-[0_0_12px_rgba(215,25,47,0.4)]'
                      : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/[0.08] hover:border-white/20 text-neutral-300 hover:text-white'
                  )}
                >
                  <TechIcon type={item.icon} size={13} />
                  <span className="font-semibold text-xs">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Neutral Editorial Label */}
          <div className="hidden xl:flex items-center gap-2 text-xs font-mono text-neutral-400 shrink-0 pl-4 border-l border-white/10">
            <CheckCircle2 size={13} className="text-crimson" />
            <span>CURRENT TOOLSET</span>
          </div>
        </div>
      </div>
    </section>
  );
};
