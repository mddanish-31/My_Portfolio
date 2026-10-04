'use server';

/**
 * Server Actions for Media Asset Management & Supabase Storage
 * MD. DANISH RAZA Portfolio — CMS Architecture
 * 
 * Centralized Server Actions module accessible across all admin routes and client components.
 */

import { revalidatePath } from 'next/cache';
import { getAdminSession, createServerSupabaseClient } from '@/lib/supabase/server';
import {
  BUCKET_NAME,
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
  MediaAssetRecord,
} from '@/lib/cms/media';
import {
  getMediaAssets,
  createMediaAssetRecord,
  updateMediaAssetRecord,
  deleteMediaAssetRecord,
  checkMediaAssetUsage,
} from '@/lib/cms/media-data';

export interface ActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  isReferenced?: boolean;
  usedInSections?: string[];
}

/**
 * Fetches media assets for the admin media studio.
 */
export async function getMediaAssetsAction(folder?: string): Promise<ActionResponse<MediaAssetRecord[]>> {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, error: 'Unauthorized: Admin session required.' };
    }

    const assets = await getMediaAssets(folder);
    return { success: true, data: assets };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to fetch media assets';
    return { success: false, error: message };
  }
}

/**
 * Uploads an image file to Supabase Storage and records metadata in media_assets.
 */
export async function uploadMediaAction(formData: FormData): Promise<ActionResponse<MediaAssetRecord>> {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, error: 'Unauthorized: Admin privileges required.' };
    }

    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'general';
    const altText = (formData.get('altText') as string) || '';

    if (!file || !(file instanceof File) || file.size === 0) {
      return { success: false, error: 'No valid file provided for upload.' };
    }

    // Validate MIME Type
    if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) {
      return {
        success: false,
        error: `Unsupported file format (${file.type}). Allowed formats: JPG, JPEG, PNG, WEBP.`,
      };
    }

    // Validate File Size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return {
        success: false,
        error: `File exceeds the 10MB size limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`,
      };
    }

    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      return { success: false, error: 'Supabase client is not available.' };
    }

    // Generate collision-safe storage path: folder/basename_timestamp.ext
    const originalName = file.name;
    const ext = originalName.split('.').pop()?.toLowerCase() || 'jpg';
    const baseClean = originalName
      .substring(0, originalName.lastIndexOf('.') || originalName.length)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .toLowerCase();
    const timestamp = Date.now();
    const cleanFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase() || 'general';
    const storagePath = `${cleanFolder}/${baseClean}_${timestamp}.${ext}`;

    // Upload to Supabase Storage
    const fileBuffer = await file.arrayBuffer();
    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(storagePath, fileBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (storageError) {
      return {
        success: false,
        error: `Storage upload failed: ${storageError.message}`,
      };
    }

    // Insert into media_assets table
    try {
      const record = await createMediaAssetRecord({
        storage_path: storagePath,
        file_name: originalName,
        mime_type: file.type,
        file_size: file.size,
        alt_text: altText,
        folder: cleanFolder,
        created_by: session.user.id,
      });

      if (!record) {
        throw new Error('Failed to record media metadata.');
      }

      revalidatePath('/admin/media');
      revalidatePath('/admin/content');
      revalidatePath('/');

      return { success: true, data: record };
    } catch (dbError) {
      // Rollback: delete the newly uploaded storage file to prevent orphan
      await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
      const msg = dbError instanceof Error ? dbError.message : 'Failed to save media metadata.';
      return { success: false, error: msg };
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred during upload.';
    return { success: false, error: message };
  }
}

/**
 * Safely replaces an existing media file with a new upload.
 * Deletes old file from storage ONLY after new upload and DB update succeed.
 */
export async function replaceMediaAction(
  assetId: string,
  oldStoragePath: string,
  formData: FormData
): Promise<ActionResponse<MediaAssetRecord>> {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, error: 'Unauthorized: Admin privileges required.' };
    }

    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'general';

    if (!file || !(file instanceof File) || file.size === 0) {
      return { success: false, error: 'No valid file provided for replacement.' };
    }

    if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) {
      return {
        success: false,
        error: `Unsupported file format (${file.type}). Allowed formats: JPG, JPEG, PNG, WEBP.`,
      };
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return {
        success: false,
        error: `File exceeds the 10MB size limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`,
      };
    }

    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      return { success: false, error: 'Supabase client is not available.' };
    }

    // Generate new unique storage path
    const originalName = file.name;
    const ext = originalName.split('.').pop()?.toLowerCase() || 'jpg';
    const baseClean = originalName
      .substring(0, originalName.lastIndexOf('.') || originalName.length)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .toLowerCase();
    const timestamp = Date.now();
    const cleanFolder = folder.replace(/[^a-zA-Z0-9_-]/g, '').toLowerCase() || 'general';
    const newStoragePath = `${cleanFolder}/${baseClean}_${timestamp}.${ext}`;

    // 1. Upload new file first
    const fileBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(newStoragePath, fileBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      return {
        success: false,
        error: `Replacement upload failed: ${uploadError.message}`,
      };
    }

    // 2. Update DB record with new path
    try {
      const updated = await updateMediaAssetRecord(assetId, {
        storage_path: newStoragePath,
        file_name: originalName,
        mime_type: file.type,
        file_size: file.size,
        folder: cleanFolder,
      });

      if (!updated) {
        throw new Error('Failed to update media record.');
      }

      // 3. Remove old storage file now that DB update succeeded
      if (oldStoragePath && oldStoragePath !== newStoragePath) {
        await supabase.storage.from(BUCKET_NAME).remove([oldStoragePath]);
      }

      revalidatePath('/admin/media');
      revalidatePath('/admin/content');
      revalidatePath('/');

      return { success: true, data: updated };
    } catch (dbError) {
      // Rollback new upload
      await supabase.storage.from(BUCKET_NAME).remove([newStoragePath]);
      const msg = dbError instanceof Error ? dbError.message : 'Database update failed during replacement.';
      return { success: false, error: msg };
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Replacement failed.';
    return { success: false, error: message };
  }
}

/**
 * Updates metadata fields (e.g. alt_text, folder category).
 */
export async function updateMediaMetadataAction(
  id: string,
  updates: { alt_text?: string; folder?: string }
): Promise<ActionResponse<MediaAssetRecord>> {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, error: 'Unauthorized: Admin session required.' };
    }

    const updated = await updateMediaAssetRecord(id, updates);
    if (!updated) {
      return { success: false, error: 'Failed to update media asset.' };
    }

    revalidatePath('/admin/media');
    return { success: true, data: updated };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update metadata.';
    return { success: false, error: message };
  }
}

/**
 * Deletes a media asset from Supabase Storage and the metadata table.
 * Validates CMS reference before deleting unless force=true.
 */
export async function deleteMediaAction(
  id: string,
  storagePath: string,
  fileName: string,
  force = false
): Promise<ActionResponse<boolean>> {
  try {
    const session = await getAdminSession();
    if (!session) {
      return { success: false, error: 'Unauthorized: Admin privileges required.' };
    }

    // Check if referenced by CMS content
    if (!force) {
      const usage = await checkMediaAssetUsage(storagePath, fileName);
      if (usage.isUsed) {
        return {
          success: false,
          isReferenced: true,
          usedInSections: usage.usedInSections,
          error: `This asset is currently in use in: ${usage.usedInSections.join(', ')}. Replace or remove the reference before deleting.`,
        };
      }
    }

    const supabase = await createServerSupabaseClient();
    if (!supabase) {
      return { success: false, error: 'Supabase client is not available.' };
    }

    // 1. Remove from Storage
    const { error: storageError } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([storagePath]);

    if (storageError) {
      console.warn('Storage deletion warning:', storageError.message);
    }

    // 2. Remove metadata record
    await deleteMediaAssetRecord(id);

    revalidatePath('/admin/media');
    revalidatePath('/admin/content');
    revalidatePath('/');

    return { success: true, data: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to delete media asset.';
    return { success: false, error: message };
  }
}
