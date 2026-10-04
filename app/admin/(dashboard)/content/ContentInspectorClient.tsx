'use client';

import React, { useState, useMemo } from 'react';
import {
  Search,
  Layers,
  CheckCircle2,
  FileEdit,
  X,
  Code,
  Copy,
  Check,
  Calendar,
  User,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import type { CMSSectionOverviewItem } from '@/lib/cms/data-access';

interface ContentInspectorClientProps {
  initialSections: CMSSectionOverviewItem[];
  defaultSelectedSectionId?: string;
}

export function ContentInspectorClient({
  initialSections,
  defaultSelectedSectionId,
}: ContentInspectorClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [activeSection, setActiveSection] = useState<CMSSectionOverviewItem | null>(() => {
    if (defaultSelectedSectionId) {
      return initialSections.find((s) => s.sectionId === defaultSelectedSectionId) || null;
    }
    return null;
  });
  const [copied, setCopied] = useState(false);

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialSections.forEach((s) => set.add(s.category));
    return ['All', ...Array.from(set)];
  }, [initialSections]);

  const filteredSections = useMemo(() => {
    return initialSections.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.sectionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = categoryFilter === 'All' || s.category === categoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [initialSections, searchQuery, categoryFilter]);

  const handleCopyJson = () => {
    if (!activeSection) return;
    navigator.clipboard.writeText(JSON.stringify(activeSection.data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase text-white font-editorial tracking-tight">
            Portfolio Content Sections
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Read-only content inspection & PostgreSQL schema validation • Step 2D
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-neutral-400">
          Total: <span className="text-white font-bold">{initialSections.length} Sections</span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
            <Search size={15} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sections by name or ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/10 focus:border-crimson focus:outline-none text-xs text-white placeholder:text-neutral-600 font-mono"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-crimson/20 border border-crimson/50 text-white font-bold'
                  : 'bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sections Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSections.map((sec) => (
          <div
            key={sec.sectionId}
            className={`p-5 rounded-2xl bg-[linear-gradient(135deg,rgba(20,7,12,0.7)_0%,rgba(6,2,4,0.85)_100%)] border transition-all flex flex-col justify-between space-y-4 group ${
              activeSection?.sectionId === sec.sectionId
                ? 'border-crimson/60 shadow-[0_0_25px_rgba(215,25,47,0.2)]'
                : 'border-white/[0.08] hover:border-white/[0.18]'
            }`}
          >
            <div className="space-y-3">
              {/* Card Top Row */}
              <div className="flex items-center justify-between gap-2">
                <code className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-xs font-mono font-bold text-crimson">
                  {sec.sectionId}
                </code>
                {sec.isPublished ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase">
                    <CheckCircle2 size={10} />
                    <span>Published</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold uppercase">
                    <FileEdit size={10} />
                    <span>Draft</span>
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base font-bold font-sans text-white group-hover:text-crimson transition-colors">
                  {sec.name}
                </h3>
                <p className="text-xs text-neutral-400 font-sans mt-1 leading-relaxed line-clamp-2">
                  {sec.description}
                </p>
              </div>
            </div>

            {/* Card Metadata & Action */}
            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span className="flex items-center gap-1">
                <Calendar size={11} />
                <span>{new Date(sec.updatedAt).toLocaleDateString()}</span>
              </span>

              <button
                onClick={() => setActiveSection(sec)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-crimson/15 hover:bg-crimson/30 border border-crimson/40 text-crimson hover:text-white font-mono text-xs font-medium tracking-wider transition-all cursor-pointer"
              >
                <span>Inspect</span>
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSections.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/[0.06] text-neutral-400 font-mono text-xs">
          No sections match your search criteria.
        </div>
      )}

      {/* JSON / Data Inspector Modal Drawer */}
      {activeSection && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
          <div className="w-full max-w-4xl max-h-[88vh] flex flex-col rounded-3xl bg-[#090306] border border-white/[0.14] shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/[0.08] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-crimson/15 border border-crimson/40 flex items-center justify-center text-crimson">
                  <Code size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold font-sans text-white uppercase tracking-wider">
                      {activeSection.name}
                    </h2>
                    <code className="px-2 py-0.5 rounded bg-white/[0.06] text-xs font-mono text-crimson">
                      {activeSection.sectionId}
                    </code>
                  </div>
                  <p className="text-[11px] font-mono text-neutral-400">
                    Category: {activeSection.category} • Updated by {activeSection.updatedBy}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyJson}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-200 transition-all cursor-pointer"
                  title="Copy JSON Payload"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
                </button>
                <button
                  onClick={() => setActiveSection(null)}
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body / JSON Viewer */}
            <div className="p-6 overflow-y-auto flex-1 font-mono text-xs bg-black/60">
              <pre className="text-neutral-300 leading-relaxed overflow-x-auto p-4 rounded-2xl bg-black/70 border border-white/[0.06]">
                {JSON.stringify(activeSection.data, null, 2)}
              </pre>
            </div>

            {/* Modal Footer */}
            <div className="p-4 px-6 border-t border-white/[0.08] bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2 text-crimson">
                <Sparkles size={14} />
                <span>WYSIWYG Section Editor will be attached in Step 2E</span>
              </div>
              <button
                onClick={() => setActiveSection(null)}
                className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
