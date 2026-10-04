'use client';

import React, { useState, useMemo } from 'react';
import { FormField, TextInput, TextArea, SelectInput, SwitchToggle } from './FormField';
import type { SkillsContent, TechSkillContent, SkillCategoryContent } from '@/lib/cms/types';
import { normalizeSkillCategory, skillCategoriesData, SkillCategory } from '@/data/skills';
import {
  Plus,
  Trash2,
  Sparkles,
  Code2,
  Layers,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  Eye,
  EyeOff,
  Tag,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SkillsEditorProps {
  data: SkillsContent;
  onChange: (data: SkillsContent) => void;
}

const PROFICIENCY_OPTIONS = ['Advanced', 'Intermediate', 'Beginner'] as const;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function SkillsEditor({ data, onChange }: SkillsEditorProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryWarning, setCategoryWarning] = useState<{ id: string; message: string } | null>(null);

  // Canonical categories list from CMS data (or default if unpopulated)
  const categories: SkillCategoryContent[] = useMemo(() => {
    const list =
      data.categories && data.categories.length > 0
        ? data.categories
        : (skillCategoriesData as SkillCategoryContent[]);
    return [...list].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [data.categories]);

  const allSkills: TechSkillContent[] = useMemo(() => {
    return data.skills || [];
  }, [data.skills]);

  // Section level changes
  const handleChange = (field: keyof SkillsContent, value: unknown) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  // -------------------------------------------------------------------------
  // CATEGORY MANAGEMENT HANDLERS
  // -------------------------------------------------------------------------
  const handleCategoryChange = (
    catId: string,
    field: keyof SkillCategoryContent,
    value: unknown
  ) => {
    const updated = categories.map((cat) => {
      if (cat.id === catId || cat.slug === catId) {
        return {
          ...cat,
          [field]: value,
        };
      }
      return cat;
    });

    onChange({
      ...data,
      categories: updated,
    });
  };

  const handleAddCategory = () => {
    setCategoryWarning(null);
    const newOrder = categories.length > 0 ? Math.max(...categories.map((c) => c.order || 0)) + 1 : 1;
    const defaultName = 'New Domain';
    const newSlug = `domain-${Date.now()}`;

    const newCategory: SkillCategoryContent = {
      id: newSlug,
      name: defaultName,
      slug: newSlug,
      description: 'Domain focus and capability description.',
      order: newOrder,
      visible: true,
      num: String(newOrder).padStart(2, '0'),
      label: 'Domain Overview',
    };

    const updated = [...categories, newCategory];
    onChange({
      ...data,
      categories: updated,
    });
  };

  const handleDeleteCategory = (catId: string, slug: string) => {
    const targetSlug = slug || catId;
    const associatedSkills = allSkills.filter(
      (s) => normalizeSkillCategory(s.category) === targetSlug || s.category === targetSlug || s.category === catId
    );

    if (associatedSkills.length > 0) {
      setCategoryWarning({
        id: catId,
        message: `This category contains ${associatedSkills.length} skill(s). Reassign or remove these skills before deleting.`,
      });
      return;
    }

    setCategoryWarning(null);
    const updated = categories.filter((cat) => cat.id !== catId && cat.slug !== targetSlug);
    onChange({
      ...data,
      categories: updated,
    });

    if (selectedFilter === targetSlug || selectedFilter === catId) {
      setSelectedFilter('all');
    }
  };

  const handleMoveCategory = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const list = [...categories];
    const [moved] = list.splice(index, 1);
    list.splice(targetIndex, 0, moved);

    // Re-index orders sequentially
    const reordered = list.map((cat, idx) => ({
      ...cat,
      order: idx + 1,
      num: String(idx + 1).padStart(2, '0'),
    }));

    onChange({
      ...data,
      categories: reordered,
    });
  };

  // -------------------------------------------------------------------------
  // SKILL EDITING HANDLERS
  // -------------------------------------------------------------------------
  const handleSkillChange = (
    index: number,
    field: keyof TechSkillContent,
    value: unknown,
    aliases: (keyof TechSkillContent)[] = []
  ) => {
    const updated = [...allSkills];
    const target: Record<string, unknown> = { ...(updated[index] || {}), [field]: value };

    // Auto-synchronize categoryLabel if category is changed
    if (field === 'category') {
      const selectedSlug = String(value);
      const matchedCat = categories.find((c) => (c.slug || c.id) === selectedSlug);
      if (matchedCat) {
        target.categoryLabel = matchedCat.name.toUpperCase();
      }
    }

    for (const alias of aliases) {
      target[alias] = value;
    }

    updated[index] = target as unknown as TechSkillContent;
    onChange({
      ...data,
      skills: updated,
    });
  };

  const handleAddSkill = () => {
    const defaultCatSlug =
      selectedFilter !== 'all' ? selectedFilter : categories[0]?.slug || 'development';
    const matchedCat = categories.find((c) => (c.slug || c.id) === defaultCatSlug);

    const newSkill: TechSkillContent = {
      id: `skill-${Date.now()}`,
      name: 'New Skill',
      category: defaultCatSlug,
      categoryLabel: matchedCat ? matchedCat.name.toUpperCase() : 'DEVELOPMENT',
      level: 'Intermediate',
      role: 'Software Development',
      description: 'Core skill capability and technical domain implementation.',
      usage: ['Component & module architecture', 'Full-stack application integration'],
      related: [],
      iconType: 'code2',
      visible: true,
      order: allSkills.length + 1,
    };

    onChange({
      ...data,
      skills: [...allSkills, newSkill],
    });
  };

  const handleRemoveSkill = (skillId: string) => {
    const updated = allSkills.filter((s) => s.id !== skillId);
    onChange({
      ...data,
      skills: updated,
    });
  };

  const headingText = Array.isArray(data.heading) ? data.heading.join('\n') : '';

  // Dynamic counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: allSkills.length,
    };

    for (const cat of categories) {
      const slug = cat.slug || cat.id;
      counts[slug] = 0;
    }

    for (const s of allSkills) {
      const norm = normalizeSkillCategory(s.category);
      if (counts[norm] !== undefined) {
        counts[norm]++;
      } else if (counts[s.category] !== undefined) {
        counts[s.category]++;
      }
    }

    return counts;
  }, [allSkills, categories]);

  // Filter skills by selected category and search query
  const filteredSkills = useMemo(() => {
    return allSkills
      .map((skill, originalIndex) => ({ skill, originalIndex }))
      .filter(({ skill }) => {
        const skillCat = normalizeSkillCategory(skill.category);
        const matchesCategory =
          selectedFilter === 'all' || skillCat === selectedFilter || skill.category === selectedFilter;
        const matchesSearch =
          searchQuery === '' ||
          skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (skill.role && skill.role.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      });
  }, [allSkills, selectedFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* =========================================================================
          1. SECTION LEVEL SETTINGS
          ========================================================================= */}
      <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
          <Sparkles size={16} className="text-crimson" />
          <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
            Skills Section Settings
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Chapter Index">
            <TextInput
              value={data.chapter || ''}
              onChange={(e) => handleChange('chapter', e.target.value)}
              placeholder="CHAPTER 03"
            />
          </FormField>
          <FormField label="Eyebrow Tag">
            <TextInput
              value={data.eyebrow || ''}
              onChange={(e) => handleChange('eyebrow', e.target.value)}
              placeholder="TECHNICAL DNA"
            />
          </FormField>
        </div>

        <FormField label="Heading Lines (1 per line)">
          <TextArea
            rows={3}
            value={headingText}
            onChange={(e) =>
              handleChange(
                'heading',
                e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
              )
            }
          />
        </FormField>

        <FormField label="Subheading">
          <TextArea
            rows={2}
            value={data.subheading || ''}
            onChange={(e) => handleChange('subheading', e.target.value)}
            placeholder="A comprehensive matrix of programming languages, full-stack frameworks, databases, and developer tooling."
          />
        </FormField>
      </div>

      {/* =========================================================================
          2. DYNAMIC DOMAINS & CATEGORIES MANAGEMENT
          ========================================================================= */}
      <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-crimson" />
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
              Skills Domains & Categories ({categories.length})
            </h4>
          </div>

          <button
            type="button"
            onClick={handleAddCategory}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-crimson/20 hover:bg-crimson/30 border border-crimson/40 text-xs font-mono font-bold text-crimson hover:text-white transition-all cursor-pointer shadow-[0_0_12px_rgba(215,25,47,0.25)]"
          >
            <Plus size={13} />
            <span>Add Category</span>
          </button>
        </div>

        {categoryWarning && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <AlertCircle size={15} className="shrink-0 text-amber-400" />
            <span className="flex-1">{categoryWarning.message}</span>
            <button
              type="button"
              onClick={() => setCategoryWarning(null)}
              className="text-neutral-400 hover:text-white text-xs px-1"
            >
              ×
            </button>
          </div>
        )}

        <div className="space-y-3">
          {categories.map((cat, idx) => {
            const slug = cat.slug || cat.id;
            const skillCount = categoryCounts[slug] || 0;
            const isVisible = cat.visible !== false;

            return (
              <div
                key={cat.id || slug}
                className="p-3.5 rounded-xl bg-black/60 border border-white/10 hover:border-white/20 transition-all space-y-3"
              >
                {/* Category Header Row: Order, Name, Stats & Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    {/* Move Up/Down */}
                    <div className="flex items-center gap-0.5">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => handleMoveCategory(idx, 'up')}
                        className="p-1 rounded text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5"
                        title="Move Up"
                      >
                        <ArrowUp size={13} />
                      </button>
                      <button
                        type="button"
                        disabled={idx === categories.length - 1}
                        onClick={() => handleMoveCategory(idx, 'down')}
                        className="p-1 rounded text-neutral-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5"
                        title="Move Down"
                      >
                        <ArrowDown size={13} />
                      </button>
                    </div>

                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">
                      0{cat.order || idx + 1}
                    </span>

                    <span className="text-xs font-bold text-white uppercase font-sans">
                      {cat.name}
                    </span>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-crimson/15 border border-crimson/30 text-crimson font-bold">
                      {skillCount} {skillCount === 1 ? 'skill' : 'skills'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Visibility Toggle */}
                    <button
                      type="button"
                      onClick={() => handleCategoryChange(cat.id, 'visible', !isVisible)}
                      className={cn(
                        'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10.5px] font-mono transition-colors border cursor-pointer',
                        isVisible
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                          : 'bg-neutral-900 border-neutral-700 text-neutral-400'
                      )}
                      title={isVisible ? 'Visible on Homepage' : 'Hidden from Homepage'}
                    >
                      {isVisible ? <Eye size={12} /> : <EyeOff size={12} />}
                      <span>{isVisible ? 'VISIBLE' : 'HIDDEN'}</span>
                    </button>

                    {/* Delete Category Button with safety check */}
                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(cat.id, cat.slug)}
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                      title={skillCount > 0 ? `Cannot delete: contains ${skillCount} skill(s)` : 'Delete Category'}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Category Editable Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <FormField label="Category Name">
                    <TextInput
                      value={cat.name}
                      onChange={(e) => {
                        const newName = e.target.value;
                        handleCategoryChange(cat.id, 'name', newName);
                      }}
                      placeholder="e.g. Cloud & DevOps"
                    />
                  </FormField>

                  <FormField label="Slug / Canonical ID">
                    <TextInput
                      value={cat.slug || cat.id}
                      onChange={(e) => {
                        const newSlug = slugify(e.target.value);
                        handleCategoryChange(cat.id, 'slug', newSlug);
                      }}
                      placeholder="e.g. cloud-devops"
                    />
                  </FormField>

                  <FormField label="Overview / Subheading">
                    <TextInput
                      value={cat.label || ''}
                      onChange={(e) => handleCategoryChange(cat.id, 'label', e.target.value)}
                      placeholder="e.g. Cloud Infrastructure & CI/CD"
                    />
                  </FormField>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          3. CANONICAL SKILLS MATRIX EDITOR
          ========================================================================= */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-crimson" />
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
              Technical Skills Matrix ({allSkills.length})
            </h4>
          </div>

          <button
            type="button"
            onClick={handleAddSkill}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-crimson/20 hover:bg-crimson/30 border border-crimson/40 text-xs font-mono font-bold text-crimson hover:text-white transition-all cursor-pointer shadow-[0_0_12px_rgba(215,25,47,0.25)]"
          >
            <Plus size={14} />
            <span>Add Skill</span>
          </button>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={cn(
              'px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all border shrink-0 flex items-center gap-2 cursor-pointer',
              selectedFilter === 'all'
                ? 'bg-crimson/25 border-crimson text-white shadow-[0_0_12px_rgba(215,25,47,0.3)]'
                : 'bg-black/40 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
            )}
          >
            <span>ALL</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-neutral-300">
              {categoryCounts.all}
            </span>
          </button>

          {categories.map((cat) => {
            const slug = cat.slug || cat.id;
            const isActive = selectedFilter === slug || selectedFilter === cat.id;
            const count = categoryCounts[slug] || 0;
            return (
              <button
                key={cat.id || slug}
                type="button"
                onClick={() => setSelectedFilter(slug)}
                className={cn(
                  'px-3 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all border shrink-0 flex items-center gap-2 cursor-pointer',
                  isActive
                    ? 'bg-crimson/25 border-crimson text-white shadow-[0_0_12px_rgba(215,25,47,0.3)]'
                    : 'bg-black/40 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                )}
              >
                <span>{cat.name}</span>
                <span
                  className={cn(
                    'text-[10px] px-1.5 py-0.2 rounded-full border',
                    isActive
                      ? 'bg-crimson/30 border-crimson/60 text-white'
                      : 'bg-white/5 border-white/10 text-neutral-400'
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Skill Search Input */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <TextInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills by name or role/area..."
              className="pl-3.5 pr-8 py-2 text-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs cursor-pointer"
              >
                ×
              </button>
            )}
          </div>
          <span className="text-xs font-mono text-neutral-400 shrink-0">
            Showing {filteredSkills.length} of {allSkills.length}
          </span>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {filteredSkills.map(({ skill, originalIndex }) => {
            const skillCatSlug = normalizeSkillCategory(skill.category);
            const matchedCategoryObj = categories.find(
              (c) => (c.slug || c.id) === skillCatSlug || c.slug === skill.category || c.id === skill.category
            );

            return (
              <div
                key={skill.id || originalIndex}
                className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-3.5 hover:border-white/20 transition-all shadow-lg"
              >
                {/* Header: Skill Name, Category Badge, Level, Trash */}
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/10">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-white font-sans">{skill.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-crimson/15 border border-crimson/30 text-crimson">
                      {matchedCategoryObj?.name || 'DEVELOPMENT'}
                    </span>
                    <span
                      className={cn(
                        'px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border',
                        skill.level === 'Advanced'
                          ? 'bg-crimson/20 border-crimson/40 text-white'
                          : skill.level === 'Intermediate'
                          ? 'bg-blue-950/60 border-blue-500/40 text-blue-200'
                          : 'bg-neutral-900/60 border-neutral-700/50 text-neutral-300'
                      )}
                    >
                      {skill.level}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill.id)}
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                    title="Remove Skill"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                {/* Row 1: Skill Name & Controlled Dynamic Category Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField label="Skill Name">
                    <TextInput
                      value={skill.name}
                      onChange={(e) => handleSkillChange(originalIndex, 'name', e.target.value)}
                      placeholder="e.g. React"
                    />
                  </FormField>

                  <FormField
                    label="Domain / Category"
                    description="Homepage domain where skill appears"
                  >
                    <SelectInput
                      value={skillCatSlug}
                      onChange={(e) =>
                        handleSkillChange(originalIndex, 'category', e.target.value)
                      }
                    >
                      {categories.map((opt) => (
                        <option
                          key={opt.id || opt.slug}
                          value={opt.slug || opt.id}
                          className="bg-neutral-900 text-white"
                        >
                          {opt.name} {opt.visible === false ? '(Hidden)' : ''}
                        </option>
                      ))}
                    </SelectInput>
                  </FormField>
                </div>

                {/* Row 2: Controlled Proficiency & Role / Area */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField label="Proficiency Level">
                    <SelectInput
                      value={skill.level || 'Intermediate'}
                      onChange={(e) =>
                        handleSkillChange(originalIndex, 'level', e.target.value as any)
                      }
                    >
                      {PROFICIENCY_OPTIONS.map((lvl) => (
                        <option key={lvl} value={lvl} className="bg-neutral-900 text-white">
                          {lvl}
                        </option>
                      ))}
                    </SelectInput>
                  </FormField>

                  <FormField
                    label="Role / Area"
                    description="What the skill is used for"
                  >
                    <TextInput
                      value={skill.role || ''}
                      onChange={(e) => handleSkillChange(originalIndex, 'role', e.target.value)}
                      placeholder="e.g. Frontend Development"
                    />
                  </FormField>
                </div>

                {/* Row 3: Description */}
                <FormField label="Skill Description">
                  <TextArea
                    rows={2}
                    value={skill.description || ''}
                    onChange={(e) => handleSkillChange(originalIndex, 'description', e.target.value)}
                    placeholder="Short description of technical capabilities and usage..."
                  />
                </FormField>

                {/* Row 4: Visibility in Skills Matrix */}
                <div className="pt-2 border-t border-white/5">
                  <SwitchToggle
                    label="Visible in Skills Matrix"
                    description="When disabled, this skill is hidden from the Homepage and does not contribute to category counts."
                    checked={skill.visible !== false}
                    onChange={(val) => handleSkillChange(originalIndex, 'visible', val)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="p-8 text-center rounded-2xl bg-black/30 border border-white/5 space-y-2">
            <p className="text-xs font-mono text-neutral-400">
              No skills found matching the current filter.
            </p>
            <button
              type="button"
              onClick={handleAddSkill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-crimson/20 hover:bg-crimson/30 border border-crimson/40 text-xs font-mono font-bold text-crimson hover:text-white transition-all cursor-pointer"
            >
              <Plus size={13} />
              <span>Add Skill to {selectedFilter.toUpperCase()}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
