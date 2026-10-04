'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldAlert, LogOut, ArrowLeft, Loader2, KeyRound } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface AdminUnauthorizedProps {
  email: string;
  userId: string;
}

export function AdminUnauthorized({ email, userId }: AdminUnauthorizedProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    } finally {
      router.push('/admin/login');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#040404] text-[#ded8cf] flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden select-none">
      {/* Background glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-950/20 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Header */}
      <header className="relative z-10 max-w-lg mx-auto w-full flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-xs font-mono uppercase tracking-wider text-neutral-300"
        >
          <ArrowLeft size={14} />
          <span>Back to Site</span>
        </Link>
      </header>

      {/* Main Card */}
      <main className="relative z-10 max-w-lg mx-auto w-full my-auto py-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-[linear-gradient(135deg,rgba(24,6,10,0.92)_0%,rgba(8,2,4,0.98)_100%)] border border-red-500/30 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9),0_0_50px_rgba(215,25,47,0.15)] space-y-6">
          
          <div className="w-14 h-14 rounded-2xl bg-red-950/60 border border-red-500/50 flex items-center justify-center text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.25)] mx-auto">
            <ShieldAlert size={28} />
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white font-editorial">
              Access Denied (403)
            </h1>
            <p className="text-xs font-mono text-neutral-400">
              AUTHENTICATED BUT NOT REGISTERED AS AN ADMIN
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] space-y-2 text-xs">
            <div className="flex items-center justify-between text-neutral-400 font-mono">
              <span>Account Email:</span>
              <span className="text-white font-medium truncate max-w-[220px]">{email}</span>
            </div>
            <div className="flex items-center justify-between text-neutral-400 font-mono">
              <span>User UUID:</span>
              <span className="text-neutral-300 font-mono text-[11px] truncate max-w-[220px]">{userId}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200/90 font-sans leading-relaxed">
            <KeyRound size={16} className="text-amber-400 shrink-0 mt-0.5" />
            <p>
              To authorize this account as an administrator, your user UUID must be added to the{' '}
              <code className="px-1.5 py-0.5 rounded bg-amber-950/80 font-mono text-amber-300">
                public.admin_users
              </code>{' '}
              table via the Supabase Dashboard SQL Editor or bootstrap procedure.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex-1 py-3 px-4 rounded-xl bg-crimson hover:bg-[#b81427] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {loggingOut ? <Loader2 size={15} className="animate-spin" /> : <LogOut size={15} />}
              <span>Sign Out & Switch Account</span>
            </button>
          </div>

        </div>
      </main>

      <footer className="relative z-10 max-w-lg mx-auto w-full text-center text-xs font-mono text-neutral-600">
        <span>MD. DANISH RAZA • CMS CORE V1.0.0</span>
      </footer>
    </div>
  );
}
