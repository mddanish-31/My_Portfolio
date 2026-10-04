import React from 'react';
import { redirect } from 'next/navigation';
import { getCurrentUser, getAdminSession } from '@/lib/supabase/server';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminUnauthorized } from '@/components/admin/AdminUnauthorized';

export const metadata = {
  title: 'Admin Portal — MD. DANISH RAZA Portfolio',
  description: 'Portfolio CMS Management Portal',
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Fetch user & admin session server-side
  const user = await getCurrentUser();

  // If completely unauthenticated -> redirect to login
  if (!user) {
    redirect('/admin/login');
  }

  const session = await getAdminSession();

  // If authenticated but not authorized in public.admin_users -> show unauthorized screen
  if (!session) {
    return <AdminUnauthorized email={user.email || 'Authenticated User'} userId={user.id} />;
  }

  // 2. Authenticated Admin -> render Admin Portal Shell
  return (
    <div className="min-h-screen bg-[#040404] text-[#ded8cf] flex flex-col selection:bg-crimson selection:text-white">
      {/* Background ambient glow */}
      <div
        className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-crimson/[0.04] blur-[180px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Sticky Header */}
      <AdminHeader email={session.user.email || 'Admin'} role={session.adminRecord.role} />

      {/* Body with Sidebar & Content */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-7xl mx-auto relative z-10">
        <AdminSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
