import React from 'react';
import Link from 'next/link';
import {
  Layers,
  CheckCircle2,
  FileEdit,
  ShieldCheck,
  ArrowRight,
  Database,
  Lock,
  Calendar,
  User,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { getAdminSectionsOverview } from '@/lib/cms/data-access';
import { getAdminSession } from '@/lib/supabase/server';

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  const sections = await getAdminSectionsOverview();

  const totalCount = sections.length;
  const publishedCount = sections.filter((s) => s.isPublished).length;
  const draftCount = totalCount - publishedCount;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-emerald-400 uppercase">
              AUTHENTICATED • STEP 2D ONLINE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase text-white font-editorial tracking-tight">
            Portfolio CMS Dashboard
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Connected to Supabase PostgreSQL • Row Level Security Enforced
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/content"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-crimson hover:bg-[#b81427] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(215,25,47,0.3)] transition-all cursor-pointer"
          >
            <Layers size={14} />
            <span>Manage Content</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Sections */}
        <div className="p-5 rounded-2xl bg-[linear-gradient(135deg,rgba(20,7,12,0.7)_0%,rgba(6,2,4,0.85)_100%)] border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Total Sections</span>
            <div className="w-8 h-8 rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson">
              <Layers size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-editorial text-white">{totalCount}</span>
            <span className="text-xs font-mono text-neutral-500">Managed</span>
          </div>
        </div>

        {/* Published Sections */}
        <div className="p-5 rounded-2xl bg-[linear-gradient(135deg,rgba(20,7,12,0.7)_0%,rgba(6,2,4,0.85)_100%)] border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Published</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-editorial text-emerald-400">{publishedCount}</span>
            <span className="text-xs font-mono text-neutral-500">Live on Site</span>
          </div>
        </div>

        {/* Draft Sections */}
        <div className="p-5 rounded-2xl bg-[linear-gradient(135deg,rgba(20,7,12,0.7)_0%,rgba(6,2,4,0.85)_100%)] border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Drafts</span>
            <div className="w-8 h-8 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <FileEdit size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold font-editorial text-amber-300">{draftCount}</span>
            <span className="text-xs font-mono text-neutral-500">Unpublished</span>
          </div>
        </div>

        {/* Admin Authorization Status */}
        <div className="p-5 rounded-2xl bg-[linear-gradient(135deg,rgba(20,7,12,0.7)_0%,rgba(6,2,4,0.85)_100%)] border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Admin Role</span>
            <div className="w-8 h-8 rounded-xl bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson">
              <ShieldCheck size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold font-mono uppercase text-white">
              {session?.adminRecord.role || 'Admin'}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Overview Matrix Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[linear-gradient(135deg,rgba(20,7,12,0.7)_0%,rgba(6,2,4,0.85)_100%)] border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.7)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
          <div>
            <h2 className="text-lg font-bold font-sans text-white uppercase tracking-wider">
              Managed CMS Sections ({totalCount})
            </h2>
            <p className="text-xs font-mono text-neutral-400">
              Persistent records sourced from PostgreSQL schema with static fallback
            </p>
          </div>
          <Link
            href="/admin/content"
            className="text-xs font-mono text-crimson hover:text-red-400 flex items-center gap-1 transition-colors"
          >
            <span>View All in Inspector</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Responsive Sections Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/[0.06] text-neutral-500 uppercase tracking-wider text-[10px]">
                <th className="pb-3 pl-2">Section ID</th>
                <th className="pb-3">Name & Description</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 hidden sm:table-cell">Last Updated</th>
                <th className="pb-3 hidden md:table-cell">Updated By</th>
                <th className="pb-3 pr-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {sections.map((sec) => (
                <tr key={sec.sectionId} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-3.5 pl-2 font-bold text-neutral-200">
                    <code className="px-2 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-crimson">
                      {sec.sectionId}
                    </code>
                  </td>
                  <td className="py-3.5">
                    <div className="font-sans font-medium text-white group-hover:text-crimson transition-colors">
                      {sec.name}
                    </div>
                    <div className="text-[11px] text-neutral-500 font-sans line-clamp-1 max-w-sm">
                      {sec.description}
                    </div>
                  </td>
                  <td className="py-3.5">
                    {sec.isPublished ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Published</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                        <span>Draft</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 text-neutral-400 hidden sm:table-cell">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-neutral-600" />
                      <span>{new Date(sec.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-neutral-400 hidden md:table-cell">
                    <div className="flex items-center gap-1.5">
                      <User size={12} className="text-neutral-600" />
                      <span>{sec.updatedBy}</span>
                    </div>
                  </td>
                  <td className="py-3.5 pr-2 text-right">
                    <Link
                      href={`/admin/content?section=${sec.sectionId}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.18] text-neutral-300 hover:text-white transition-all text-[11px]"
                    >
                      <span>Inspect</span>
                      <ArrowRight size={11} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Step 2E Roadmap Callout */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[linear-gradient(135deg,rgba(215,25,47,0.06)_0%,rgba(6,2,4,0.85)_100%)] border border-crimson/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3 text-xs">
          <Sparkles size={20} className="text-crimson shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white uppercase tracking-wider font-mono block">
              Step 2D Complete: Live SSR Authentication & Protected Dashboard Shell
            </span>
            <p className="text-neutral-400 font-sans leading-relaxed max-w-2xl">
              Next (Step 2E) will wire interactive WYSIWYG editing forms, real-time draft/publish switches, image upload storage, and instant portfolio mutations.
            </p>
          </div>
        </div>

        <Link
          href="/admin/content"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono uppercase tracking-wider text-neutral-200 transition-all shrink-0"
        >
          <span>Open Content Hub</span>
          <ExternalLink size={12} />
        </Link>
      </div>
    </div>
  );
}
