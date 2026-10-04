'use client';

import React, { useState } from 'react';
import { FormField, TextInput, TextArea, SwitchToggle } from './FormField';
import type { AcademicYearbookContent, AcademicRecordContent } from '@/lib/cms/types';
import type { AcademicHighlight } from '@/data/academics';
import { Plus, Trash2, BookOpen, Sparkles, Award, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { calculateCumulativeCGPA } from '@/lib/utils/academic';

interface AcademicEditorProps {
  data: AcademicYearbookContent;
  onChange: (data: AcademicYearbookContent) => void;
}

export function AcademicEditor({ data, onChange }: AcademicEditorProps) {
  const [activeSemIndex, setActiveSemIndex] = useState(0);

  const handleChange = (field: keyof AcademicYearbookContent, value: unknown) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleRecordChange = (
    index: number,
    field: keyof AcademicRecordContent,
    value: unknown,
    aliases: (keyof AcademicRecordContent)[] = []
  ) => {
    const updated = [...(data.records || [])];
    const target: Record<string, unknown> = { ...(updated[index] || {}), [field]: value };
    for (const alias of aliases) {
      target[alias] = value;
    }
    updated[index] = target as unknown as AcademicRecordContent;
    onChange({
      ...data,
      records: updated,
    });
  };

  const handleHighlightChange = (
    recIndex: number,
    hlIndex: number,
    field: keyof AcademicHighlight,
    value: string
  ) => {
    const updatedRecords = [...(data.records || [])];
    const currentRecord = updatedRecords[recIndex];
    const updatedHighlights = [...(currentRecord.highlights || [])];

    updatedHighlights[hlIndex] = {
      ...updatedHighlights[hlIndex],
      [field]: value,
      // Keep label and tag in sync for backwards compatibility
      ...(field === 'label' ? { tag: value } : {}),
      ...(field === 'tag' ? { label: value } : {}),
    };

    updatedRecords[recIndex] = {
      ...currentRecord,
      highlights: updatedHighlights,
    };

    onChange({
      ...data,
      records: updatedRecords,
    });
  };

  const handleAddHighlight = (recIndex: number) => {
    const updatedRecords = [...(data.records || [])];
    const currentRecord = updatedRecords[recIndex];
    const updatedHighlights = [
      ...(currentRecord.highlights || []),
      {
        id: `h-${recIndex + 1}-${(currentRecord.highlights?.length || 0) + 1}`,
        label: 'MILESTONE',
        tag: 'MILESTONE',
        title: '',
        description: '',
      },
    ];

    updatedRecords[recIndex] = {
      ...currentRecord,
      highlights: updatedHighlights,
    };

    onChange({
      ...data,
      records: updatedRecords,
    });
  };

  const handleRemoveHighlight = (recIndex: number, hlIndex: number) => {
    const updatedRecords = [...(data.records || [])];
    const currentRecord = updatedRecords[recIndex];
    const updatedHighlights = (currentRecord.highlights || []).filter((_, i) => i !== hlIndex);

    updatedRecords[recIndex] = {
      ...currentRecord,
      highlights: updatedHighlights,
    };

    onChange({
      ...data,
      records: updatedRecords,
    });
  };

  const records = data.records || [];
  const currentRecord = records[activeSemIndex] || records[0];
  const headingText = Array.isArray(data.heading) ? data.heading.join('\n') : '';

  const autoCalculatedCGPA = currentRecord
    ? calculateCumulativeCGPA(records, currentRecord.semester || activeSemIndex + 1)
    : '—';

  return (
    <div className="space-y-8">
      {/* =========================================================================
          1. SECTION LEVEL SETTINGS
          ========================================================================= */}
      <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
          <BookOpen size={16} className="text-crimson" />
          <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
            Yearbook Section Settings
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Chapter Tag">
            <TextInput
              value={data.chapter || ''}
              onChange={(e) => handleChange('chapter', e.target.value)}
              placeholder="CHAPTER 02"
            />
          </FormField>
          <FormField label="Eyebrow Tag">
            <TextInput
              value={data.eyebrow || ''}
              onChange={(e) => handleChange('eyebrow', e.target.value)}
              placeholder="ACADEMIC RECORDS"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Default University / Institution">
            <TextInput
              value={data.institution || ''}
              onChange={(e) => handleChange('institution', e.target.value)}
              placeholder="ADAMAS UNIVERSITY"
            />
          </FormField>
          <FormField label="Default Degree Program">
            <TextInput
              value={data.degree || ''}
              onChange={(e) => handleChange('degree', e.target.value)}
              placeholder="B.TECH COMPUTER SCIENCE & ENGINEERING"
            />
          </FormField>
        </div>

        <FormField label="Section Heading Lines (1 per line)">
          <TextArea
            rows={2}
            value={headingText}
            onChange={(e) =>
              handleChange(
                'heading',
                e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
              )
            }
          />
        </FormField>

        <FormField label="Section Subheading">
          <TextArea
            rows={2}
            value={data.subheading || ''}
            onChange={(e) => handleChange('subheading', e.target.value)}
          />
        </FormField>
      </div>

      {/* =========================================================================
          2. SEMESTER SPREAD EDITOR
          ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-crimson" />
            <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
              Semester Archives ({records.length})
            </h3>
          </div>
          <span className="text-[11px] font-mono text-neutral-400">
            Select a semester tab below to edit its complete spread
          </span>
        </div>

        {/* Semester Tab Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {records.map((rec, idx) => {
            const isActive = idx === activeSemIndex;
            return (
              <button
                key={rec.id || idx}
                type="button"
                onClick={() => setActiveSemIndex(idx)}
                className={cn(
                  'px-3.5 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all border shrink-0 flex items-center gap-2 cursor-pointer',
                  isActive
                    ? 'bg-crimson/25 border-crimson text-white shadow-[0_0_15px_rgba(215,25,47,0.35)]'
                    : 'bg-black/40 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
                )}
              >
                <span>SEM {rec.semester}</span>
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    rec.status === 'COMPLETED'
                      ? 'bg-emerald-400'
                      : rec.status === 'IN PROGRESS'
                      ? 'bg-crimson animate-pulse'
                      : 'bg-neutral-600'
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Active Semester Form */}
        {currentRecord && (
          <div className="p-6 rounded-2xl bg-black/50 border border-white/10 space-y-6">
            {/* Header / Identifier */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono font-bold text-crimson uppercase">
                  {currentRecord.title || currentRecord.semesterRoman || `SEMESTER ${currentRecord.semester}`}
                </span>
                <span className="text-xs font-mono text-neutral-500">•</span>
                <span className="text-xs font-mono text-neutral-400">
                  {currentRecord.academicYear} ({currentRecord.term})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'px-2.5 py-0.5 rounded text-[10.5px] font-mono font-bold uppercase border',
                    currentRecord.status === 'COMPLETED'
                      ? 'bg-emerald-950/60 border-emerald-400/40 text-emerald-300'
                      : currentRecord.status === 'IN PROGRESS'
                      ? 'bg-crimson/20 border-crimson/40 text-crimson'
                      : 'bg-white/5 border-white/10 text-neutral-400'
                  )}
                >
                  {currentRecord.status}
                </span>
              </div>
            </div>

            {/* Fieldset 1: Semester Information */}
            <div className="space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                1. SEMESTER INFORMATION
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <FormField label="Semester #">
                  <TextInput
                    value={currentRecord.semester || ''}
                    onChange={(e) => handleRecordChange(activeSemIndex, 'semester', e.target.value)}
                    placeholder="01"
                  />
                </FormField>
                <FormField label="Title / Roman">
                  <TextInput
                    value={currentRecord.title || currentRecord.semesterRoman || ''}
                    onChange={(e) =>
                      handleRecordChange(activeSemIndex, 'title', e.target.value, ['semesterRoman'])
                    }
                    placeholder="SEMESTER I"
                  />
                </FormField>
                <FormField label="Status">
                  <TextInput
                    value={currentRecord.status || ''}
                    onChange={(e) => handleRecordChange(activeSemIndex, 'status', e.target.value)}
                    placeholder="COMPLETED / IN PROGRESS / UPCOMING"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Academic Year">
                  <TextInput
                    value={currentRecord.academicYear || ''}
                    onChange={(e) => handleRecordChange(activeSemIndex, 'academicYear', e.target.value)}
                    placeholder="2024 — 2025"
                  />
                </FormField>
                <FormField label="Academic Term">
                  <TextInput
                    value={currentRecord.term || ''}
                    onChange={(e) => handleRecordChange(activeSemIndex, 'term', e.target.value)}
                    placeholder="AUTUMN TERM / SPRING TERM"
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="University / Institution">
                  <TextInput
                    value={currentRecord.university || currentRecord.institution || ''}
                    onChange={(e) =>
                      handleRecordChange(activeSemIndex, 'university', e.target.value, ['institution'])
                    }
                    placeholder="ADAMAS UNIVERSITY"
                  />
                </FormField>
                <FormField label="Program / Degree">
                  <TextInput
                    value={currentRecord.program || currentRecord.degree || ''}
                    onChange={(e) =>
                      handleRecordChange(activeSemIndex, 'program', e.target.value, ['degree'])
                    }
                    placeholder="B.TECH COMPUTER SCIENCE & ENGINEERING"
                  />
                </FormField>
              </div>
            </div>

            {/* Fieldset 2: Academic Snapshot Stats */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Award size={14} className="text-crimson" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                  2. ACADEMIC SNAPSHOT STATS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                <div className="flex flex-col justify-between h-full space-y-2 p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-semibold tracking-wider text-neutral-300 uppercase">
                      Semester SGPA
                    </label>
                    <p className="text-[11px] font-sans text-neutral-500 leading-normal min-h-[2rem]">
                      Term evaluation (e.g. 8.50 or —)
                    </p>
                  </div>
                  <TextInput
                    value={currentRecord.sgpa || ''}
                    onChange={(e) => handleRecordChange(activeSemIndex, 'sgpa', e.target.value)}
                    placeholder="— or 9.20"
                    className="h-10 text-xs font-mono"
                  />
                </div>

                <div className="flex flex-col justify-between h-full space-y-2 p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-semibold tracking-wider text-neutral-300 uppercase">
                      Cumulative CGPA
                    </label>
                    <p className="text-[11px] font-sans text-neutral-500 leading-normal min-h-[2rem]">
                      Automatically calculated from semester SGPAs.
                    </p>
                  </div>
                  <div className="relative flex items-center h-10">
                    <TextInput
                      value={autoCalculatedCGPA !== '—' ? autoCalculatedCGPA : '—'}
                      readOnly
                      tabIndex={-1}
                      className="h-10 bg-white/[0.03] border-white/10 text-crimson font-mono font-bold cursor-not-allowed select-none pr-16"
                    />
                    <span className="absolute right-2.5 px-2 py-0.5 rounded bg-crimson/20 border border-crimson/40 text-[10px] font-mono font-bold uppercase text-crimson tracking-wider pointer-events-none">
                      AUTO
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between h-full space-y-2 p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono font-semibold tracking-wider text-neutral-300 uppercase">
                      Academic Credits
                    </label>
                    <p className="text-[11px] font-sans text-neutral-500 leading-normal min-h-[2rem]">
                      Earned units (e.g. 24.0 or —)
                    </p>
                  </div>
                  <TextInput
                    value={currentRecord.credits ?? currentRecord.creditsEarned ?? ''}
                    onChange={(e) =>
                      handleRecordChange(activeSemIndex, 'credits', e.target.value, ['creditsEarned', 'totalCredits'])
                    }
                    placeholder="— or 22.0"
                    className="h-10 text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Fieldset 3: Editorial Overview (Left Page) */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                3. EDITORIAL CONTENT (LEFT PAGE)
              </span>

              <FormField
                label="Semester Overview"
                description="A short editorial paragraph about this semester's themes and focus"
              >
                <TextArea
                  rows={3}
                  value={currentRecord.overview || ''}
                  onChange={(e) => handleRecordChange(activeSemIndex, 'overview', e.target.value)}
                  placeholder="Semester I marks the foundation of my undergraduate engineering journey..."
                />
              </FormField>

              <FormField
                label="Academic Focus Statement"
                description="A concise one-line theme statement"
              >
                <TextInput
                  value={currentRecord.academicFocus || ''}
                  onChange={(e) => handleRecordChange(activeSemIndex, 'academicFocus', e.target.value)}
                  placeholder="Foundational Programming, Problem Solving & Engineering Mathematics"
                />
              </FormField>
            </div>

            {/* Fieldset 4: Right Page Journal */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                4. RIGHT PAGE / JOURNAL
              </span>

              <FormField label="Journal Heading Title">
                <TextInput
                  value={currentRecord.journalTitle || ''}
                  onChange={(e) => handleRecordChange(activeSemIndex, 'journalTitle', e.target.value)}
                  placeholder="SEMESTER HIGHLIGHTS"
                />
              </FormField>

              <FormField
                label="Journal Statement / Description"
                description="The editorial quote displayed with the crimson spine accent"
              >
                <TextArea
                  rows={3}
                  value={currentRecord.journalDescription || currentRecord.notes || ''}
                  onChange={(e) =>
                    handleRecordChange(activeSemIndex, 'journalDescription', e.target.value, ['notes'])
                  }
                  placeholder="Semester focus centers on strengthening foundational computer science concepts..."
                />
              </FormField>
            </div>

            {/* Fieldset 5: Highlights / Milestones */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                  5. HIGHLIGHTS & ARCHIVES ({currentRecord.highlights?.length || 0})
                </span>

                <button
                  type="button"
                  onClick={() => handleAddHighlight(activeSemIndex)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-crimson/20 hover:bg-crimson/30 border border-crimson/40 text-xs font-mono font-bold text-crimson hover:text-white transition-all cursor-pointer"
                >
                  <Plus size={13} />
                  <span>ADD HIGHLIGHT</span>
                </button>
              </div>

              <div className="space-y-3">
                {(currentRecord.highlights || []).map((hl, hlIdx) => (
                  <div
                    key={hl.id || hlIdx}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/5">
                      <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase">
                        Highlight #{hlIdx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(activeSemIndex, hlIdx)}
                        className="text-neutral-500 hover:text-crimson p-1 transition-colors cursor-pointer"
                        title="Remove highlight"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <FormField label="Category Label">
                        <TextInput
                          value={hl.label || hl.tag || ''}
                          onChange={(e) =>
                            handleHighlightChange(activeSemIndex, hlIdx, 'label', e.target.value)
                          }
                          placeholder="CORE CS / MILESTONE"
                        />
                      </FormField>
                      <div className="sm:col-span-2">
                        <FormField label="Highlight Title">
                          <TextInput
                            value={hl.title || ''}
                            onChange={(e) =>
                              handleHighlightChange(activeSemIndex, hlIdx, 'title', e.target.value)
                            }
                            placeholder="Core Programming Foundation"
                          />
                        </FormField>
                      </div>
                    </div>

                    <FormField label="Description">
                      <TextArea
                        rows={2}
                        value={hl.description || ''}
                        onChange={(e) =>
                          handleHighlightChange(activeSemIndex, hlIdx, 'description', e.target.value)
                        }
                        placeholder="Deep dive into structured problem solving, memory models, pointers..."
                      />
                    </FormField>
                  </div>
                ))}
              </div>
            </div>

            {/* Fieldset 6: Visibility */}
            <div className="pt-4 border-t border-white/10">
              <SwitchToggle
                label="Show Semester in Yearbook"
                description="When disabled, this semester will not appear in the public Academic Yearbook."
                checked={currentRecord.visible !== false}
                onChange={(val) => handleRecordChange(activeSemIndex, 'visible', val)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
