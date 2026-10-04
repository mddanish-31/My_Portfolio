'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Layers, Image as ImageIcon, Settings, Globe, Shield } from 'lucide-react';

const NAV_ITEMS = [
  {
    href: '/admin',
    label: 'Dashboard',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: '/admin/content',
    label: 'Content Sections',
    icon: Layers,
    exact: false,
  },
  {
    href: '/admin/media',
    label: 'Media Library',
    icon: ImageIcon,
    exact: false,
  },
  {
    href: '/admin/settings',
    label: 'System Settings',
    icon: Settings,
    exact: false,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-[#070305]/60 border-b lg:border-b-0 lg:border-r border-white/[0.08] p-4 lg:p-6 flex lg:flex-col justify-between gap-4">
      <div className="w-full space-y-6">
        {/* Navigation Category */}
        <div className="space-y-1.5">
          <div className="px-3 pb-2 hidden lg:flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-neutral-500">
              CMS NAVIGATION
            </span>
          </div>

          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-crimson/15 border border-crimson/40 text-white font-bold shadow-[0_0_15px_rgba(215,25,47,0.2)]'
                      : 'text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-crimson' : 'text-neutral-500'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* System Status Summary (Desktop only) */}
        <div className="hidden lg:block p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider">
            <Shield size={14} className="text-crimson" />
            <span>RLS Active</span>
          </div>
          <p className="text-[11px] font-sans text-neutral-500 leading-relaxed">
            Row Level Security is enforced by PostgreSQL. All mutations are validated server-side.
          </p>
        </div>
      </div>

      {/* Live Site Link in sidebar for desktop */}
      <div className="hidden lg:block pt-4 border-t border-white/[0.06]">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] text-xs font-mono text-neutral-400 hover:text-white transition-all"
        >
          <span className="flex items-center gap-2">
            <Globe size={14} />
            <span>Public Site</span>
          </span>
          <span className="text-[10px] text-neutral-600">↗</span>
        </Link>
      </div>
    </aside>
  );
}
