'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      if (!supabase) {
        throw new Error('Supabase client could not be initialized. Please check your environment variables.');
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      });

      if (authError) {
        // Safe, non-sensitive error message
        if (authError.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials.');
        } else {
          setError(authError.message || 'Authentication failed. Please try again.');
        }
        setLoading(false);
        return;
      }

      if (data?.session) {
        // Redirect to admin dashboard and trigger server re-validation
        router.push('/admin');
        router.refresh();
      } else {
        setError('Unable to establish an authenticated session.');
        setLoading(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred during login.';
      setError(msg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#040404] text-[#ded8cf] flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden select-none">
      {/* Background ambient glows */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-crimson/[0.08] blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#220710]/40 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Header */}
      <header className="relative z-10 max-w-md mx-auto w-full flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-xs font-mono uppercase tracking-wider text-neutral-300 transition-all cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Back to Site</span>
        </Link>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-crimson/10 border border-crimson/20 text-[11px] font-mono text-crimson font-medium tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
          <span>PORTFOLIO CMS</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="relative z-10 max-w-md mx-auto w-full my-auto py-10">
        <div className="p-8 sm:p-10 rounded-3xl bg-[linear-gradient(135deg,rgba(20,7,12,0.88)_0%,rgba(6,2,4,0.96)_100%)] border border-white/[0.12] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9),0_0_50px_rgba(215,25,47,0.12)] backdrop-blur-2xl space-y-7">
          
          {/* Brand & Eyebrow */}
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-crimson/15 border border-crimson/40 flex items-center justify-center text-crimson shadow-[0_0_20px_rgba(215,25,47,0.35)] mx-auto mb-4">
              <ShieldCheck size={24} />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-white font-editorial">
              Admin Control Center
            </h1>
            <p className="text-xs font-mono text-neutral-400">
              MD. DANISH RAZA PORTFOLIO • CMS LOGIN
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-xl bg-crimson/[0.12] border border-crimson/40 flex items-start gap-2.5 text-xs text-red-200 animate-fadeIn">
              <AlertCircle size={16} className="text-crimson shrink-0 mt-0.5" />
              <p className="leading-relaxed font-sans">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-email"
                className="block text-xs font-mono font-medium tracking-wider text-neutral-300 uppercase"
              >
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <Mail size={16} />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mddanish.dev"
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-crimson focus:ring-1 focus:ring-crimson focus:outline-none text-sm text-white placeholder:text-neutral-600 transition-all font-sans"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="block text-xs font-mono font-medium tracking-wider text-neutral-300 uppercase"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <Lock size={16} />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={loading}
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-crimson focus:ring-1 focus:ring-crimson focus:outline-none text-sm text-white placeholder:text-neutral-600 transition-all font-sans font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-neutral-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Sign In Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-crimson hover:bg-[#b81427] active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(215,25,47,0.4)] transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <span>SIGN IN TO DASHBOARD</span>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="pt-2 border-t border-white/[0.06] text-center">
            <p className="text-[11px] font-mono text-neutral-500 leading-relaxed">
              Restricted Area • Authorized personnel only. All access attempts are authenticated via PostgreSQL RLS.
            </p>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-md mx-auto w-full text-center text-xs font-mono text-neutral-600">
        <span>MD. DANISH RAZA • CMS CORE V1.0.0</span>
      </footer>
    </div>
  );
}
