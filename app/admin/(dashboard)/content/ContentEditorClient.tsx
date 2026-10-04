'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  Search,
  CheckCircle2,
  FileEdit,
  ExternalLink,
  Save,
  Send,
  RotateCcw,
  Sparkles,
  Calendar,
  User,
  AlertCircle,
  Loader2,
  Check,
  EyeOff,
  Layers,
  ChevronRight,
} from 'lucide-react';
import type { CMSSectionOverviewItem } from '@/lib/cms/data-access';
import { saveSectionContentAction } from '@/lib/actions/content';
import { SectionEditorDispatcher } from '@/components/admin/editors/SectionEditorDispatcher';
import { AdvancedJsonEditor } from '@/components/admin/editors/AdvancedJsonEditor';
import { UnsavedChangesModal } from '@/components/admin/UnsavedChangesModal';

interface ContentEditorClientProps {
  initialSections: CMSSectionOverviewItem[];
  defaultSelectedSectionId?: string;
}

export function ContentEditorClient({
  initialSections,
  defaultSelectedSectionId,
}: ContentEditorClientProps) {
  // Master sections list state
  const [sections, setSections] = useState<CMSSectionOverviewItem[]>(initialSections);

  // Currently selected section ID
  const [selectedId, setSelectedId] = useState<string>(() => {
    if (defaultSelectedSectionId && initialSections.some((s) => s.sectionId === defaultSelectedSectionId)) {
      return defaultSelectedSectionId;
    }
    return initialSections[0]?.sectionId || 'settings';
  });

  // Active section data in editing state
  const activeSection = useMemo(() => {
    return sections.find((s) => s.sectionId === selectedId) || sections[0];
  }, [sections, selectedId]);

  // Working copy of current section data
  const [workingData, setWorkingData] = useState<unknown>(() => activeSection?.data);

  // Status & Notification state
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // Unsaved Changes Confirmation Dialog
  const [pendingSectionId, setPendingSectionId] = useState<string | null>(null);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);

  // Track if current section is dirty (modified)
  const isDirty = useMemo(() => {
    if (!activeSection) return false;
    try {
      return JSON.stringify(workingData) !== JSON.stringify(activeSection.data);
    } catch {
      return false;
    }
  }, [workingData, activeSection]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    sections.forEach((s) => set.add(s.category));
    return ['All', ...Array.from(set)];
  }, [sections]);

  // Filtered sections for left list
  const filteredSections = useMemo(() => {
    return sections.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.sectionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = categoryFilter === 'All' || s.category === categoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [sections, searchQuery, categoryFilter]);

  // Switching section handler with dirty interception
  const handleSelectSection = useCallback(
    (targetId: string) => {
      if (targetId === selectedId) return;

      if (isDirty) {
        setPendingSectionId(targetId);
        setShowUnsavedModal(true);
        return;
      }

      const target = sections.find((s) => s.sectionId === targetId);
      if (target) {
        setSelectedId(targetId);
        setWorkingData(target.data);
        setSaveSuccess(null);
        setSaveError(null);
      }
    },
    [selectedId, isDirty, sections]
  );

  // Confirm discard changes from modal
  const handleConfirmDiscard = () => {
    setShowUnsavedModal(false);
    if (pendingSectionId) {
      const target = sections.find((s) => s.sectionId === pendingSectionId);
      if (target) {
        setSelectedId(pendingSectionId);
        setWorkingData(target.data);
        setSaveSuccess(null);
        setSaveError(null);
      }
      setPendingSectionId(null);
    }
  };

  // Discard changes manually
  const handleManualDiscard = () => {
    if (activeSection) {
      setWorkingData(activeSection.data);
      setSaveSuccess(null);
      setSaveError(null);
    }
  };

  // Perform Save Draft or Publish
  const handleSave = async (publishStatus: boolean) => {
    if (!activeSection) return;

    setIsSaving(true);
    setSaveSuccess(null);
    setSaveError(null);

    try {
      const res = await saveSectionContentAction({
        sectionId: activeSection.sectionId as any,
        data: workingData,
        isPublished: publishStatus,
      });

      if (!res.success) {
        setSaveError(res.error || 'Failed to persist changes to CMS.');
        return;
      }

      // Update local master sections state
      const now = res.timestamp || new Date().toISOString();
      setSections((prev) =>
        prev.map((s) =>
          s.sectionId === activeSection.sectionId
            ? {
                ...s,
                data: workingData,
                isPublished: publishStatus,
                updatedAt: now,
              }
            : s
        )
      );

      setSaveSuccess(
        publishStatus
          ? `"${activeSection.name}" published successfully! Public portfolio updated.`
          : `"${activeSection.name}" saved as draft.`
      );

      setTimeout(() => {
        setSaveSuccess(null);
      }, 5000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred while saving.';
      setSaveError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-crimson uppercase">
              CMS Content Editor • Step 2E
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase text-white font-editorial tracking-tight">
            Portfolio CMS Content Studio
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Schema-aware structured editing, instant draft persistence, and live site publishing
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`/#${activeSection?.sectionId === 'home' || activeSection?.sectionId === 'settings' ? '' : activeSection?.sectionId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <ExternalLink size={13} className="text-neutral-400" />
            <span>View Live Site</span>
          </a>
        </div>
      </div>

      {/* Main Master-Detail Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* =========================================================================
            LEFT COLUMN: 13-SECTION LIST / SIDEBAR (4 COLUMNS ON LG)
            ========================================================================= */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
              <Search size={14} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 13 sections..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-crimson focus:outline-none text-xs text-white placeholder:text-neutral-600 font-mono"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-crimson/20 border border-crimson/50 text-white font-bold'
                    : 'bg-white/[0.02] hover:bg-white/[0.06] text-neutral-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Section Items List */}
          <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {filteredSections.map((sec) => {
              const isSelected = sec.sectionId === selectedId;
              const isSectionModified = isSelected && isDirty;

              return (
                <button
                  key={sec.sectionId}
                  onClick={() => handleSelectSection(sec.sectionId)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 group cursor-pointer ${
                    isSelected
                      ? 'bg-[linear-gradient(135deg,rgba(40,10,18,0.9)_0%,rgba(16,4,8,0.95)_100%)] border-crimson/60 shadow-[0_0_20px_rgba(215,25,47,0.18)]'
                      : 'bg-black/40 hover:bg-white/[0.03] border-white/[0.06] hover:border-white/15'
                  }`}
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <code
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                          isSelected
                            ? 'bg-crimson text-white'
                            : 'bg-white/[0.05] text-neutral-400 group-hover:text-crimson'
                        }`}
                      >
                        {sec.sectionId}
                      </code>
                      {isSectionModified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          <span>Unsaved</span>
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-bold font-sans text-white truncate group-hover:text-white">
                      {sec.name}
                    </div>

                    <div className="text-[10px] font-mono text-neutral-500 truncate">
                      {new Date(sec.updatedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {sec.isPublished ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono font-bold uppercase">
                        <CheckCircle2 size={9} />
                        <span>Live</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-300 text-[9px] font-mono font-bold uppercase">
                        <FileEdit size={9} />
                        <span>Draft</span>
                      </span>
                    )}
                    <ChevronRight
                      size={14}
                      className={`transition-transform ${
                        isSelected ? 'text-crimson translate-x-0.5' : 'text-neutral-600'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

        </div>

        {/* =========================================================================
            RIGHT COLUMN: ACTIVE SECTION EDITOR STAGE (8 COLUMNS ON LG)
            ========================================================================= */}
        <div className="lg:col-span-8 space-y-6">
          
          {activeSection && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[linear-gradient(135deg,rgba(20,7,12,0.7)_0%,rgba(6,2,4,0.85)_100%)] border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-6">
              
              {/* Section Editor Sticky Top Action Bar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
                
                {/* Section Meta Title */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <code className="px-2 py-0.5 rounded bg-crimson/20 border border-crimson/40 text-xs font-mono font-bold text-crimson">
                      {activeSection.sectionId}
                    </code>
                    <span className="text-[11px] font-mono text-neutral-400">
                      Category: <span className="text-neutral-200">{activeSection.category}</span>
                    </span>
                  </div>
                  <h2 className="text-xl font-bold font-sans text-white uppercase tracking-wider">
                    {activeSection.name}
                  </h2>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-400 pt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-neutral-500" />
                      <span>Last updated: {new Date(activeSection.updatedAt).toLocaleString()}</span>
                    </span>
                  </div>
                </div>

                {/* Editor Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
                  
                  {/* Discard button */}
                  {isDirty && (
                    <button
                      type="button"
                      onClick={handleManualDiscard}
                      disabled={isSaving}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer disabled:opacity-50"
                      title="Discard pending changes"
                    >
                      <RotateCcw size={13} />
                      <span>Discard</span>
                    </button>
                  )}

                  {/* Save Draft */}
                  <button
                    type="button"
                    onClick={() => handleSave(false)}
                    disabled={isSaving}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 text-amber-200 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 shadow-sm"
                  >
                    {isSaving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
                    <span>Save Draft</span>
                  </button>

                  {/* Publish */}
                  <button
                    type="button"
                    onClick={() => handleSave(true)}
                    disabled={isSaving}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-crimson hover:bg-[#b81427] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50 shadow-[0_0_20px_rgba(215,25,47,0.3)]"
                  >
                    {isSaving ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                    <span>Publish to Site</span>
                  </button>

                  {/* Unpublish option (if currently published) */}
                  {activeSection.isPublished && (
                    <button
                      type="button"
                      onClick={() => handleSave(false)}
                      disabled={isSaving}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-white/10 text-neutral-400 hover:text-neutral-200 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                      title="Set as draft so it is hidden from public portfolio"
                    >
                      <EyeOff size={13} />
                      <span>Unpublish</span>
                    </button>
                  )}
                </div>

              </div>

              {/* Status Notifications */}
              {saveSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-2.5 text-xs font-mono text-emerald-300 animate-fadeIn">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>{saveSuccess}</span>
                </div>
              )}

              {saveError && (
                <div className="p-3.5 rounded-2xl bg-red-950/50 border border-red-500/40 flex items-center gap-2.5 text-xs font-mono text-red-300 animate-fadeIn">
                  <AlertCircle size={16} className="text-red-400 shrink-0" />
                  <span>{saveError}</span>
                </div>
              )}

              {isDirty && !saveSuccess && !saveError && (
                <div className="p-3 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between gap-3 text-xs font-mono text-amber-300">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>You have unsaved changes in this section.</span>
                  </div>
                  <span className="text-[11px] text-amber-400/80 hidden sm:inline">
                    Click Save Draft or Publish to apply.
                  </span>
                </div>
              )}

              {/* PRIMARY STRUCTURED FORM EDITOR */}
              <div className="space-y-6 pt-2">
                <SectionEditorDispatcher
                  sectionId={activeSection.sectionId}
                  data={workingData}
                  onChange={(updated) => setWorkingData(updated)}
                />
              </div>

              {/* ADVANCED RAW JSON EDITOR (COLLAPSIBLE) */}
              <div className="pt-6 border-t border-white/[0.08]">
                <AdvancedJsonEditor
                  value={workingData}
                  onChange={(parsed) => setWorkingData(parsed)}
                />
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Unsaved Changes Confirmation Modal */}
      <UnsavedChangesModal
        isOpen={showUnsavedModal}
        sectionName={activeSection?.name || 'Section'}
        onStay={() => {
          setShowUnsavedModal(false);
          setPendingSectionId(null);
        }}
        onDiscard={handleConfirmDiscard}
      />
    </div>
  );
}
