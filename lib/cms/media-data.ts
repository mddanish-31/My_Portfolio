/**
 * Server-side Media Data Access Layer
 * MD. DANISH RAZA Portfolio — CMS Architecture (Step 2F)
 * Handles PostgreSQL queries for media_assets and usage checking.
 */

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getCMSContent } from '@/lib/cms/data-access';
import {
  MediaAssetRecord,
  getStoragePublicUrl,
  BUCKET_NAME,
} from './media';

/**
 * Fetches all media assets from public.media_assets table, optionally filtered by folder.
 */
export async function getMediaAssets(folder?: string): Promise<MediaAssetRecord[]> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      return [];
    }

    let query = supabase
      .from('media_assets')
      .select('*')
      .order('created_at', { ascending: false });

    if (folder && folder !== 'all') {
      query = query.eq('folder', folder);
    }

    const { data, error } = await query;

    if (error || !data) {
      return [];
    }

    return data.map((item) => ({
      ...item,
      url: getStoragePublicUrl(item.storage_path),
    }));
  } catch {
    return [];
  }
}

/**
 * Gets a single media asset record by storage_path.
 */
export async function getMediaAssetByPath(storagePath: string): Promise<MediaAssetRecord | null> {
  try {
    const supabase = await createServerSupabaseClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from('media_assets')
      .select('*')
      .eq('storage_path', storagePath)
      .single();

    if (error || !data) return null;

    return {
      ...data,
      url: getStoragePublicUrl(data.storage_path),
    };
  } catch {
    return null;
  }
}

/**
 * Inserts a new media asset metadata record.
 */
export async function createMediaAssetRecord(asset: {
  storage_path: string;
  file_name: string;
  mime_type: string;
  file_size: number;
  alt_text?: string;
  folder: string;
  created_by?: string | null;
}): Promise<MediaAssetRecord | null> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('media_assets')
    .insert([
      {
        storage_path: asset.storage_path,
        file_name: asset.file_name,
        mime_type: asset.mime_type,
        file_size: asset.file_size,
        alt_text: asset.alt_text || '',
        folder: asset.folder || 'general',
        created_by: asset.created_by || null,
      },
    ])
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || 'Failed to insert media asset record');
  }

  return {
    ...data,
    url: getStoragePublicUrl(data.storage_path),
  };
}

/**
 * Updates a media asset metadata record (e.g. alt_text, folder).
 */
export async function updateMediaAssetRecord(
  id: string,
  updates: Partial<Pick<MediaAssetRecord, 'alt_text' | 'folder' | 'storage_path' | 'file_name' | 'mime_type' | 'file_size'>>
): Promise<MediaAssetRecord | null> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('media_assets')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error || !data) {
    throw new Error(error?.message || 'Failed to update media asset record');
  }

  return {
    ...data,
    url: getStoragePublicUrl(data.storage_path),
  };
}

/**
 * Deletes a media asset record from public.media_assets.
 */
export async function deleteMediaAssetRecord(id: string): Promise<boolean> {
  const supabase = await createServerSupabaseClient();
  if (!supabase) return false;

  const { error } = await supabase
    .from('media_assets')
    .delete()
    .eq('id', id);

  return !error;
}

/**
 * Checks if a media asset is currently referenced in any CMS section content.
 */
export async function checkMediaAssetUsage(
  storagePath: string,
  fileName: string
): Promise<{ isUsed: boolean; usedInSections: string[] }> {
  try {
    const cms = await getCMSContent();
    const usedInSections: string[] = [];

    const storagePathClean = storagePath.replace(/^portfolio-media\//, '');
    const searchTerms = [
      storagePath,
      storagePathClean,
      `portfolio-media/${storagePathClean}`,
      fileName,
    ].filter(Boolean);

    const checkObject = (sectionName: string, obj: unknown) => {
      const serialized = JSON.stringify(obj);
      for (const term of searchTerms) {
        if (serialized.includes(term)) {
          if (!usedInSections.includes(sectionName)) {
            usedInSections.push(sectionName);
          }
          break;
        }
      }
    };

    if (cms.hero) checkObject('Home / Hero', cms.hero);
    if (cms.about) checkObject('About Me', cms.about);
    if (cms.academic) checkObject('Academic Yearbook', cms.academic);
    if (cms.skills) checkObject('Skills', cms.skills);
    if (cms.projects) checkObject('Projects', cms.projects);
    if (cms.experience) checkObject('Experience', cms.experience);
    if (cms.education) checkObject('Education', cms.education);
    if (cms.availability) checkObject('Availability', cms.availability);
    if (cms.contact) checkObject('Contact', cms.contact);
    if (cms.footer) checkObject('Footer', cms.footer);
    if (cms.settings) checkObject('Site Settings', cms.settings);

    return {
      isUsed: usedInSections.length > 0,
      usedInSections,
    };
  } catch {
    return { isUsed: false, usedInSections: [] };
  }
}
