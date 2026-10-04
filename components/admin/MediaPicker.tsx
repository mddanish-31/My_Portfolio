'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Image as ImageIcon,
  Upload,
  FolderOpen,
  X,
  Check,
  Search,
  ExternalLink,
  Copy,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import {
  MediaAssetRecord,
  MEDIA_FOLDERS,
  resolveMediaUrl,
  getStoragePublicUrl,
  formatBytes,
  ALLOWED_IMAGE_MIME_TYPES,
} from '@/lib/cms/media';
import { getMediaAssetsAction, uploadMediaAction } from '@/lib/actions/media';

interface MediaPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  folder?: string;
  description?: string;
  placeholder?: string;
}

export function MediaPicker({
  label,
  value,
  onChange,
  folder = 'general',
  description,
  placeholder = '/images/... or select from library',
}: MediaPickerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [assets, setAssets] = useState<MediaAssetRecord[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);

  const resolvedUrl = resolveMediaUrl(value);

  // Load media library assets when modal opens
  useEffect(() => {
    if (isModalOpen) {
      loadAssets();
    }
  }, [isModalOpen, selectedFolder]);

  const loadAssets = async () => {
    setIsLoading(true);
    try {
      const res = await getMediaAssetsAction(selectedFolder === 'all' ? undefined : selectedFolder);
      if (res.success && res.data) {
        setAssets(res.data);
      }
    } catch {
      // safe fallback
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      formData.append('altText', file.name);

      const res = await uploadMediaAction(formData);
      if (res.success && res.data) {
        const publicUrl = res.data.url || getStoragePublicUrl(res.data.storage_path);
        onChange(publicUrl);
        setIsModalOpen(false);
      } else {
        setUploadError(res.error || 'Upload failed');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setUploadError(msg);
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(resolvedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredAssets = assets.filter((a) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return a.file_name.toLowerCase().includes(q) || (a.alt_text && a.alt_text.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-1.5">
          <ImageIcon size={13} className="text-crimson" />
          <span>{label}</span>
        </label>
        <button
          type="button"
          onClick={() => setShowManualInput(!showManualInput)}
          className="text-[11px] font-mono text-neutral-500 hover:text-crimson transition-colors"
        >
          {showManualInput ? 'Hide URL text' : 'Direct URL input'}
        </button>
      </div>

      {description && <p className="text-[11px] font-sans text-neutral-500">{description}</p>}

      {/* Media Value & Preview Box */}
      <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-3">
        <div className="flex items-center gap-4">
          {/* Thumbnail preview */}
          <div className="relative w-16 h-16 shrink-0 rounded-xl bg-neutral-900 border border-white/10 overflow-hidden flex items-center justify-center group">
            {value ? (
              <Image
                src={resolvedUrl}
                alt={label}
                fill
                sizes="64px"
                className="object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <ImageIcon size={20} className="text-neutral-600" />
            )}
          </div>

          {/* Current Path Info & Actions */}
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-200 truncate font-semibold">
                {value || <span className="text-neutral-600 italic">No image selected</span>}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-3 py-1 rounded-lg bg-crimson/15 hover:bg-crimson/25 border border-crimson/30 text-crimson hover:text-white text-[11px] font-mono font-bold transition-all flex items-center gap-1.5"
              >
                <FolderOpen size={12} />
                <span>Media Library</span>
              </button>

              <label className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-[11px] font-mono transition-all flex items-center gap-1.5 cursor-pointer">
                {isUploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                <span>{isUploading ? 'Uploading...' : 'Quick Upload'}</span>
                <input
                  type="file"
                  accept={ALLOWED_IMAGE_MIME_TYPES.join(',')}
                  onChange={handleQuickUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>

              {value && (
                <>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                    title="Copy full URL"
                  >
                    {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  </button>

                  <a
                    href={resolvedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                    title="Open image in new tab"
                  >
                    <ExternalLink size={12} />
                  </a>

                  <button
                    type="button"
                    onClick={() => onChange('')}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors"
                    title="Clear image"
                  >
                    <X size={12} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Optional Direct String Input for custom URLs */}
        {showManualInput && (
          <div className="pt-2 border-t border-white/5">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-neutral-200 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
            />
          </div>
        )}

        {uploadError && (
          <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 flex items-center gap-1.5">
            <AlertCircle size={13} />
            <span>{uploadError}</span>
          </div>
        )}
      </div>

      {/* Modal Media Library Selector */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-4xl max-h-[85vh] flex flex-col rounded-3xl bg-[#090507] border border-white/10 shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2">
                <ImageIcon size={18} className="text-crimson" />
                <h3 className="text-sm font-mono font-bold uppercase text-white tracking-wider">
                  Select Media Asset
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Filter Bar */}
            <div className="px-6 py-3 border-b border-white/5 bg-black/20 flex flex-wrap items-center justify-between gap-3">
              {/* Folder Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                <button
                  type="button"
                  onClick={() => setSelectedFolder('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    selectedFolder === 'all'
                      ? 'bg-crimson/20 border border-crimson/40 text-white font-bold'
                      : 'bg-white/5 text-neutral-400 hover:text-white'
                  }`}
                >
                  All Folders
                </button>
                {MEDIA_FOLDERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFolder(f.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all whitespace-nowrap ${
                      selectedFolder === f.id
                        ? 'bg-crimson/20 border border-crimson/40 text-white font-bold'
                        : 'bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-60">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search assets..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-crimson"
                />
              </div>
            </div>

            {/* Modal Asset Grid */}
            <div className="p-6 flex-1 overflow-y-auto min-h-[300px]">
              {isLoading ? (
                <div className="h-64 flex flex-col items-center justify-center space-y-3 text-neutral-500 font-mono text-xs">
                  <Loader2 size={24} className="animate-spin text-crimson" />
                  <span>Loading media library...</span>
                </div>
              ) : filteredAssets.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center space-y-4 text-center p-6 border border-dashed border-white/10 rounded-2xl">
                  <ImageIcon size={32} className="text-neutral-600" />
                  <div className="space-y-1">
                    <p className="text-sm font-mono text-neutral-300 font-semibold">No assets found</p>
                    <p className="text-xs text-neutral-500">
                      {searchQuery
                        ? 'Try modifying your search filter.'
                        : 'Upload an image to start populating this folder.'}
                    </p>
                  </div>
                  <label className="px-4 py-2 rounded-xl bg-crimson hover:bg-[#b01020] text-white text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer">
                    <Upload size={14} />
                    <span>Upload to this folder</span>
                    <input
                      type="file"
                      accept={ALLOWED_IMAGE_MIME_TYPES.join(',')}
                      onChange={handleQuickUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredAssets.map((asset) => {
                    const publicUrl = asset.url || getStoragePublicUrl(asset.storage_path);
                    const isSelected = value === asset.storage_path || value === asset.url || value === publicUrl;
                    return (
                      <div
                        key={asset.id}
                        onClick={() => {
                          onChange(publicUrl);
                          setIsModalOpen(false);
                        }}
                        className={`group relative rounded-2xl bg-black/40 border p-2 space-y-2 cursor-pointer transition-all hover:scale-[1.02] ${
                          isSelected
                            ? 'border-crimson ring-1 ring-crimson shadow-[0_0_15px_rgba(215,25,47,0.3)] bg-crimson/5'
                            : 'border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="relative aspect-square w-full rounded-xl bg-neutral-900 overflow-hidden">
                          {asset.url && (
                            <Image
                              src={asset.url}
                              alt={asset.alt_text || asset.file_name}
                              fill
                              sizes="(max-width: 768px) 150px, 200px"
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          )}
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-crimson text-white flex items-center justify-center shadow-lg">
                              <Check size={14} />
                            </div>
                          )}
                        </div>

                        <div className="space-y-0.5">
                          <p className="text-xs font-mono font-semibold text-neutral-200 truncate" title={asset.file_name}>
                            {asset.file_name}
                          </p>
                          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                            <span>{formatBytes(asset.file_size)}</span>
                            <span className="uppercase px-1.5 py-0.2 rounded bg-white/5">
                              {asset.folder}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-500">
                {filteredAssets.length} asset{filteredAssets.length !== 1 ? 's' : ''} available
              </span>
              <div className="flex items-center gap-3">
                <label className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer">
                  {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  <span>{isUploading ? 'Uploading...' : 'Upload New File'}</span>
                  <input
                    type="file"
                    accept={ALLOWED_IMAGE_MIME_TYPES.join(',')}
                    onChange={handleQuickUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-bold transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
