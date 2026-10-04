import React from 'react';
import { getMediaAssets } from '@/lib/cms/media-data';
import { MediaLibraryClient } from './MediaLibraryClient';

export const metadata = {
  title: 'Media Library & Supabase Storage — Admin Portal',
  description: 'Manage, upload, preview, replace, and delete portfolio images and media assets',
};

export default async function AdminMediaPage() {
  const assets = await getMediaAssets();

  return <MediaLibraryClient initialAssets={assets} />;
}
