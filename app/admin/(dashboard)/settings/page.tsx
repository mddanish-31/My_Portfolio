import React from 'react';
import { getAdminSession } from '@/lib/supabase/server';
import { getContentProvider } from '@/lib/cms/provider';
import { Settings, ShieldCheck, Database, KeyRound, Sparkles, User, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'System Settings — Admin Portal',
  description: 'CMS and Database Configuration Settings',
};

export default async function AdminSettingsPage() {
  const session = await getAdminSession();
  const provider = getContentProvider();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold uppercase text-white font-editorial tracking-tight">
            System & CMS Settings
          </h1>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Database connections, role permissions, and environment architecture
          </p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Active Admin Account Card */}
        <div className="p-6 rounded-3xl bg-[linear-gradient(135deg,rgba(20,7,12,0.7)_0%,rgba(6,2,4,0.85)_100%)] border border-white/[0.1] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-crimson/15 border border-crimson/30 flex items-center justify-center text-crimson">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold font-sans text-white uppercase tracking-wider">
                Active Administrator
              </h2>
              <p className="text-[11px] font-mono text-neutral-400">Authenticated Session</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2.5 text-xs font-mono">
            <div className="flex items-center justify-between text-neutral-400">
              <span>Email:</span>
              <span className="text-white font-medium">{session?.user.email}</span>
            </div>
            <div className="flex items-center justify-between text-neutral-400">
              <span>Role:</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/30 text-emerald-400 font-bold uppercase text-[10px]">
                {session?.adminRecord.role}
              </span>
            </div>
            <div className="flex items-center justify-between text-neutral-400">
              <span>User ID:</span>
              <span className="text-neutral-400 text-[10px] truncate max-w-[180px]">{session?.user.id}</span>
            </div>
          </div>
        </div>

        {/* Database & Architecture Card */}
        <div className="p-6 rounded-3xl bg-[linear-gradient(135deg,rgba(20,7,12,0.7)_0%,rgba(6,2,4,0.85)_100%)] border border-white/[0.1] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Database size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold font-sans text-white uppercase tracking-wider">
                Database Architecture
              </h2>
              <p className="text-[11px] font-mono text-neutral-400">Supabase PostgreSQL</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2.5 text-xs font-mono">
            <div className="flex items-center justify-between text-neutral-400">
              <span>Provider:</span>
              <span className="text-white font-medium">{provider.name}</span>
            </div>
            <div className="flex items-center justify-between text-neutral-400">
              <span>Status:</span>
              <span className="inline-flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Connected</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-neutral-400">
              <span>Row Level Security:</span>
              <span className="text-neutral-200">Enforced</span>
            </div>
          </div>
        </div>

      </div>

      {/* Step 2E Notice */}
      <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-4">
        <Sparkles size={20} className="text-crimson shrink-0 mt-1" />
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
            Step 2E: Interactive Section Mutation & Asset Management
          </h3>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            In Step 2E, global site metadata, profile images, social handles, and individual section content will become fully editable directly from this admin portal.
          </p>
        </div>
      </div>
    </div>
  );
}
