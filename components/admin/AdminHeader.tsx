'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, LogOut, ExternalLink, Loader2, User } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface AdminHeaderProps {
  email: string;
  role: 'admin' | 'superadmin';
}

export function AdminHeader({ email, role }: AdminHeaderProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    } catch {
      // Ignore errors on signOut
    } finally {
      router.push('/admin/login');
      router.refresh();
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#070305]/90 border-b border-white/[0.08] backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-crimson/15 border border-crimson/40 flex items-center justify-center text-crimson shadow-[0_0_12px_rgba(215,25,47,0.3)]">
          <ShieldCheck size={16} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm font-bold tracking-wider text-white font-sans uppercase">
              MD. DANISH RAZA
            </span>
            <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-[10px] font-mono text-neutral-400 uppercase">
              CMS
            </span>
          </div>
          <p className="text-[10px] font-mono text-neutral-400 hidden sm:block">
            ADMIN CONTROL CENTER • STEP 2D
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Admin Identity Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
          <div className="w-5 h-5 rounded-full bg-crimson/20 border border-crimson/30 flex items-center justify-center text-crimson">
            <User size={12} />
          </div>
          <div className="text-left">
            <span className="text-xs font-mono text-neutral-200 block max-w-[140px] sm:max-w-[200px] truncate">
              {email}
            </span>
          </div>
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
              role === 'superadmin'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            {role}
          </span>
        </div>

        {/* View Live Portfolio */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-xs font-mono uppercase tracking-wider text-neutral-300 transition-all"
        >
          <ExternalLink size={13} />
          <span>Live Site</span>
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-crimson/[0.12] hover:bg-crimson/25 border border-crimson/30 hover:border-crimson/50 text-xs font-mono text-crimson font-medium tracking-wider uppercase transition-all cursor-pointer disabled:opacity-50"
          title="Sign out of Admin Portal"
        >
          {loggingOut ? <Loader2 size={14} className="animate-spin" /> : <LogOut size={14} />}
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}
