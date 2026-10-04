'use server';

/**
 * Server Action: Save/Publish CMS Section Content
 * MD. DANISH RAZA Portfolio — CMS Architecture
 * 
 * Centralized Server Actions module accessible across all admin routes.
 */

import { updateSectionContent } from '@/lib/cms/data-access';
import { getAdminSession } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import type { SectionId } from '@/lib/cms/types';

export interface SaveSectionParams {
  sectionId: SectionId | 'settings' | 'navigation';
  data: unknown;
  isPublished: boolean;
}

export interface SaveSectionResult {
  success: boolean;
  data?: unknown;
  source?: 'database' | 'static-fallback';
  timestamp: string;
  error?: string;
}

/**
 * Server Action: Save/Publish CMS Section Content
 * Authenticates admin session server-side, validates payload, persists to CMS, and triggers cache revalidation.
 */
export async function saveSectionContentAction(params: SaveSectionParams): Promise<SaveSectionResult> {
  // 1. Server-side Admin Authorization Verification
  const session = await getAdminSession();
  if (!session) {
    return {
      success: false,
      timestamp: new Date().toISOString(),
      error: 'Unauthorized: Valid administrator session required to perform CMS mutations.',
    };
  }

  // 2. Validate section ID
  const validSectionIds = [
    'settings',
    'sections',
    'navigation',
    'home',
    'about',
    'academic',
    'skills',
    'projects',
    'experience',
    'education',
    'availability',
    'contact',
    'footer',
  ];

  if (!validSectionIds.includes(params.sectionId)) {
    return {
      success: false,
      timestamp: new Date().toISOString(),
      error: `Invalid section ID: "${params.sectionId}".`,
    };
  }

  // 3. Delegate to Data Access Layer -> Content Provider
  const updateResult = await updateSectionContent({
    sectionId: params.sectionId,
    data: params.data as any,
    isPublished: params.isPublished,
    updatedBy: session.user.email || 'admin',
  });

  // 4. On successful save, trigger Next.js cache revalidation for the public homepage and admin dashboard
  if (updateResult.success) {
    revalidatePath('/', 'page');
    revalidatePath('/admin', 'page');
    revalidatePath('/admin/content', 'page');
  }

  return {
    success: updateResult.success,
    data: updateResult.data,
    source: updateResult.source,
    timestamp: updateResult.timestamp,
    error: updateResult.error,
  };
}
