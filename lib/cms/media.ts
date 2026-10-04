/**
 * Media Asset Abstraction Layer & Supabase Storage Helpers
 * MD. DANISH RAZA Portfolio — CMS Architecture (Step 2F)
 * Handles local static paths, Supabase Storage paths, and metadata types.
 */

export const BUCKET_NAME = 'portfolio-media';

export type MediaFolder =
  | 'general'
  | 'hero'
  | 'about'
  | 'academic'
  | 'projects'
  | 'experience'
  | 'education'
  | 'contact';

export const MEDIA_FOLDERS: { id: MediaFolder; label: string }[] = [
  { id: 'general', label: 'General Assets' },
  { id: 'hero', label: 'Hero / Portrait' },
  { id: 'about', label: 'About & Profile' },
  { id: 'projects', label: 'Projects & Work' },
  { id: 'academic', label: 'Academic & Yearbook' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact & Social' },
];

export interface MediaAssetRecord {
  id: string;
  storage_path: string;
  file_name: string;
  mime_type: string;
  file_size: number;
  alt_text?: string;
  folder: MediaFolder | string;
  created_by?: string | null;
  created_at: string;
  updated_at: string;
  url?: string;
}

export interface MediaAsset {
  id: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
  mimeType?: string;
  sizeBytes?: number;
  uploadedAt?: string;
  storageProvider: 'local' | 'supabase' | 'cloudinary' | 's3';
}

export const MEDIA_PRESETS = {
  portrait: {
    defaultUrl: '/images/portrait/danish-portrait-2x.png',
    fallbackUrl: '/images/portrait/danish-portrait.png',
    aspectRatio: '307/423',
    expectedWidth: 614,
    expectedHeight: 846,
  },
  ogImage: {
    defaultUrl: '/images/portrait/danish-portrait-2x.png',
    aspectRatio: '1200/630',
  },
  favicon: {
    defaultUrl: '/icon.svg',
  },
} as const;

/**
 * Resolves a media path or external URL safely.
 * Handles:
 * 1. Full HTTP / HTTPS URLs -> returned as-is
 * 2. Local public paths (starts with '/') -> returned as-is
 * 3. Supabase Storage paths (e.g. 'hero/portrait.png') -> resolved to Supabase public storage URL
 */
export function resolveMediaUrl(pathOrUrl: string | undefined | null, fallback = '/images/projects/technexa.jpg'): string {
  if (!pathOrUrl || typeof pathOrUrl !== 'string' || pathOrUrl.trim() === '') {
    return fallback;
  }

  const clean = pathOrUrl.trim();

  // 1. If already a full HTTP/HTTPS URL
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }

  // 2. If local static path in /public (starts with /)
  if (clean.startsWith('/')) {
    return clean;
  }

  // 3. If local static path without leading slash
  if (
    clean.startsWith('images/') ||
    clean.startsWith('icons/') ||
    clean.startsWith('assets/') ||
    clean.startsWith('portrait/') ||
    clean.startsWith('contact/')
  ) {
    return `/${clean}`;
  }

  // 4. If it's a Supabase storage path (e.g. 'projects/image.jpg' or 'portfolio-media/projects/image.jpg')
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  if (supabaseUrl) {
    const cleanStoragePath = clean.replace(/^portfolio-media\//, '').replace(/^\/+/, '');
    return `${supabaseUrl.replace(/\/+$/, '')}/storage/v1/object/public/${BUCKET_NAME}/${cleanStoragePath}`;
  }

  // Fallback as relative root path
  return `/${clean}`;
}

/**
 * Derives the canonical public URL for a given Supabase Storage path
 */
export function getStoragePublicUrl(storagePath: string): string {
  if (!storagePath || typeof storagePath !== 'string') return '';
  const clean = storagePath.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const cleanPath = clean.replace(/^portfolio-media\//, '').replace(/^\/+/, '');
  if (!supabaseUrl) return `/${cleanPath}`;
  return `${supabaseUrl.replace(/\/+$/, '')}/storage/v1/object/public/${BUCKET_NAME}/${cleanPath}`;
}

/**
 * Validates if an image path exists or is a valid URL format
 */
export function isValidMediaUrl(url: string | undefined | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (trimmed === '') return false;
  return trimmed.startsWith('/') || trimmed.startsWith('http://') || trimmed.startsWith('https://') || /^[a-zA-Z0-9_\-\/]+\.[a-zA-Z0-9]+$/.test(trimmed);
}

/**
 * Human-readable byte size formatter
 */
export function formatBytes(bytes: number, decimals = 1): string {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export const ALLOWED_IMAGE_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
