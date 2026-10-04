'use client';

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import {
  Image as ImageIcon,
  Upload,
  Search,
  Copy,
  Check,
  Trash2,
  RefreshCw,
  Edit2,
  ExternalLink,
  Eye,
  X,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  AlertCircle,
  HardDrive,
} from 'lucide-react';
import {
  MediaAssetRecord,
  MEDIA_FOLDERS,
  formatBytes,
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
  resolveMediaUrl,
} from '@/lib/cms/media';
import {
  uploadMediaAction,
  replaceMediaAction,
  updateMediaMetadataAction,
  deleteMediaAction,
} from '@/lib/actions/media';

interface MediaLibraryClientProps {
  initialAssets: MediaAssetRecord[];
}

export function MediaLibraryClient({ initialAssets }: MediaLibraryClientProps) {
  const [assets, setAssets] = useState<MediaAssetRecord[]>(initialAssets);
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewAsset, setPreviewAsset] = useState<MediaAssetRecord | null>(null);
  const [editingAsset, setEditingAsset] = useState<MediaAssetRecord | null>(null);
  const [replacingAsset, setReplacingAsset] = useState<MediaAssetRecord | null>(null);
  const [deletingAsset, setDeletingAsset] = useState<MediaAssetRecord | null>(null);

  // Upload Form State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadFolder, setUploadFolder] = useState<string>('general');
  const [uploadAlt, setUploadAlt] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Replace Form State
  const [replaceFile, setReplaceFile] = useState<File | null>(null);
  const [replacePreview, setReplacePreview] = useState<string | null>(null);
  const [replaceError, setReplaceError] = useState<string | null>(null);
  const [isReplacing, setIsReplacing] = useState(false);

  // Delete State
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteWarning, setDeleteWarning] = useState<{ isReferenced: boolean; sections: string[] } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Edit Alt State
  const [editAltText, setEditAltText] = useState('');
  const [isSavingAlt, setIsSavingAlt] = useState(false);

  // Status banner
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Filtered Assets
  const filteredAssets = assets.filter((asset) => {
    const matchesFolder = selectedFolder === 'all' || asset.folder === selectedFolder;
    if (!matchesFolder) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      asset.file_name.toLowerCase().includes(q) ||
      (asset.alt_text && asset.alt_text.toLowerCase().includes(q)) ||
      asset.storage_path.toLowerCase().includes(q)
    );
  });

  // Handle Copy URL
  const handleCopyUrl = (asset: MediaAssetRecord) => {
    const url = asset.url || resolveMediaUrl(asset.storage_path);
    navigator.clipboard.writeText(url);
    setCopiedId(asset.id);
    showToast('success', 'Public URL copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Upload Handlers
  const handleFileSelect = (file: File) => {
    if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) {
      setUploadError(`Invalid format. Allowed: JPG, JPEG, PNG, WEBP`);
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setUploadError(`File is too large (${formatBytes(file.size)}). Maximum size is 10MB.`);
      return;
    }
    setUploadError(null);
    setUploadFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setUploadPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) return;

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('folder', uploadFolder);
      formData.append('altText', uploadAlt || uploadFile.name);

      const res = await uploadMediaAction(formData);
      if (res.success && res.data) {
        setAssets([res.data, ...assets]);
        setIsUploadOpen(false);
        setUploadFile(null);
        setUploadPreview(null);
        setUploadAlt('');
        showToast('success', `Uploaded "${res.data.file_name}" successfully.`);
      } else {
        setUploadError(res.error || 'Upload failed');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed';
      setUploadError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  // Replace Handlers
  const handleReplaceFileSelect = (file: File) => {
    if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) {
      setReplaceError(`Invalid format. Allowed: JPG, JPEG, PNG, WEBP`);
      return;
    }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setReplaceError(`File is too large (${formatBytes(file.size)}). Maximum size is 10MB.`);
      return;
    }
    setReplaceError(null);
    setReplaceFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setReplacePreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleReplaceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replacingAsset || !replaceFile) return;

    setIsReplacing(true);
    setReplaceError(null);

    try {
      const formData = new FormData();
      formData.append('file', replaceFile);
      formData.append('folder', replacingAsset.folder);

      const res = await replaceMediaAction(replacingAsset.id, replacingAsset.storage_path, formData);
      if (res.success && res.data) {
        setAssets(assets.map((a) => (a.id === replacingAsset.id ? res.data! : a)));
        setReplacingAsset(null);
        setReplaceFile(null);
        setReplacePreview(null);
        showToast('success', `Replaced "${res.data.file_name}" safely.`);
      } else {
        setReplaceError(res.error || 'Replacement failed');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Replacement failed';
      setReplaceError(msg);
    } finally {
      setIsReplacing(false);
    }
  };

  // Edit Alt Text Handler
  const handleSaveAltText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAsset) return;

    setIsSavingAlt(true);
    try {
      const res = await updateMediaMetadataAction(editingAsset.id, { alt_text: editAltText });
      if (res.success && res.data) {
        setAssets(assets.map((a) => (a.id === editingAsset.id ? res.data! : a)));
        setEditingAsset(null);
        showToast('success', 'Alt text updated.');
      } else {
        showToast('error', res.error || 'Failed to update alt text');
      }
    } catch {
      showToast('error', 'Failed to update alt text');
    } finally {
      setIsSavingAlt(false);
    }
  };

  // Delete Handler
  const handleDelete = async (force = false) => {
    if (!deletingAsset) return;

    setIsDeleting(true);
    setDeleteError(null);

    try {
      const res = await deleteMediaAction(
        deletingAsset.id,
        deletingAsset.storage_path,
        deletingAsset.file_name,
        force
      );

      if (res.success) {
        setAssets(assets.filter((a) => a.id !== deletingAsset.id));
        setDeletingAsset(null);
        setDeleteWarning(null);
        showToast('success', 'Media asset removed.');
      } else if (res.isReferenced) {
        setDeleteWarning({
          isReferenced: true,
          sections: res.usedInSections || [],
        });
      } else {
        setDeleteError(res.error || 'Failed to delete media asset');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Deletion failed';
      setDeleteError(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Banner */}
      {toastMessage && (
        <div
          className={`p-3.5 rounded-2xl border text-xs font-mono flex items-center justify-between shadow-xl animate-fadeIn ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300'
              : 'bg-red-950/80 border-red-500/30 text-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {toastMessage.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            <span>{toastMessage.text}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="opacity-60 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header & Main Controls */}
      <div className="p-6 rounded-3xl bg-[#090507]/90 border border-white/[0.08] shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <HardDrive size={18} className="text-crimson" />
            <h2 className="text-base font-mono font-bold uppercase tracking-wider text-white">
              Supabase Storage Media Library
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-neutral-400">
              {assets.length} assets
            </span>
          </div>
          <p className="text-xs font-sans text-neutral-400">
            Upload, optimize, and manage portfolio assets stored in bucket{' '}
            <code className="px-1.5 py-0.5 rounded bg-black/50 text-crimson font-mono">portfolio-media</code>.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setUploadFile(null);
            setUploadPreview(null);
            setUploadError(null);
            setIsUploadOpen(true);
          }}
          className="px-4 py-2.5 rounded-2xl bg-crimson hover:bg-[#b01020] text-white text-xs font-mono font-bold shadow-[0_0_20px_rgba(215,25,47,0.3)] transition-all flex items-center gap-2 whitespace-nowrap self-stretch md:self-auto justify-center"
        >
          <Upload size={14} />
          <span>Upload Image</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Folder Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            type="button"
            onClick={() => setSelectedFolder('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
              selectedFolder === 'all'
                ? 'bg-crimson/20 border border-crimson/40 text-white font-bold shadow-[0_0_12px_rgba(215,25,47,0.2)]'
                : 'bg-white/[0.03] hover:bg-white/[0.06] text-neutral-400 hover:text-white border border-transparent'
            }`}
          >
            All ({assets.length})
          </button>
          {MEDIA_FOLDERS.map((f) => {
            const count = assets.filter((a) => a.folder === f.id).length;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFolder(f.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  selectedFolder === f.id
                    ? 'bg-crimson/20 border border-crimson/40 text-white font-bold shadow-[0_0_12px_rgba(215,25,47,0.2)]'
                    : 'bg-white/[0.03] hover:bg-white/[0.06] text-neutral-400 hover:text-white border border-transparent'
                }`}
              >
                <span>{f.label}</span>
                {count > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-neutral-300">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by filename or alt..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-all"
          />
        </div>
      </div>

      {/* Media Grid */}
      {filteredAssets.length === 0 ? (
        <div className="p-12 rounded-3xl bg-[#090507]/60 border border-dashed border-white/10 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500">
            <ImageIcon size={28} />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-mono font-bold text-neutral-200 uppercase">
              No Media Assets Found
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm">
              {searchQuery
                ? 'No images matched your search criteria.'
                : 'Upload your first portfolio image to get started.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setUploadFile(null);
              setUploadPreview(null);
              setIsUploadOpen(true);
            }}
            className="px-4 py-2 rounded-xl bg-crimson/20 hover:bg-crimson/30 border border-crimson/40 text-crimson hover:text-white text-xs font-mono font-bold transition-all flex items-center gap-2"
          >
            <Upload size={14} />
            <span>Upload Image Now</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => {
            const displayUrl = asset.url || resolveMediaUrl(asset.storage_path);

            return (
              <div
                key={asset.id}
                className="group relative rounded-2xl bg-[#090507]/90 border border-white/[0.08] hover:border-white/20 p-3 flex flex-col justify-between space-y-3 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                {/* Image Stage */}
                <div className="relative aspect-video w-full rounded-xl bg-black/60 overflow-hidden border border-white/5">
                  <Image
                    src={displayUrl}
                    alt={asset.alt_text || asset.file_name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />

                  {/* Top-Right Badges */}
                  <div className="absolute top-2 right-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase text-neutral-300">
                      {asset.folder}
                    </span>
                  </div>

                  {/* Hover Quick Action Buttons */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewAsset(asset)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all shadow-md"
                      title="Quick Preview"
                    >
                      <Eye size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(asset)}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all shadow-md"
                      title="Copy Public URL"
                    >
                      {copiedId === asset.id ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
                    </button>
                    <a
                      href={displayUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all shadow-md"
                      title="Open in new tab"
                    >
                      <ExternalLink size={15} />
                    </a>
                  </div>
                </div>

                {/* Metadata */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <p
                      className="text-xs font-mono font-bold text-neutral-200 truncate"
                      title={asset.file_name}
                    >
                      {asset.file_name}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                    <span>{formatBytes(asset.file_size)}</span>
                    <span className="uppercase">{asset.mime_type.split('/')[1]}</span>
                  </div>

                  {asset.alt_text ? (
                    <p className="text-[11px] font-sans text-neutral-400 italic truncate" title={asset.alt_text}>
                      &quot;{asset.alt_text}&quot;
                    </p>
                  ) : (
                    <p className="text-[11px] font-sans text-neutral-600 italic">No alt description</p>
                  )}
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingAsset(asset);
                      setEditAltText(asset.alt_text || '');
                    }}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors text-xs font-mono flex items-center gap-1"
                    title="Edit Alt Text"
                  >
                    <Edit2 size={12} />
                    <span className="text-[10px] hidden sm:inline">Alt</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setReplacingAsset(asset);
                      setReplaceFile(null);
                      setReplacePreview(null);
                      setReplaceError(null);
                    }}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors text-xs font-mono flex items-center gap-1"
                    title="Replace Image"
                  >
                    <RefreshCw size={12} />
                    <span className="text-[10px] hidden sm:inline">Replace</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDeletingAsset(asset);
                      setDeleteWarning(null);
                      setDeleteError(null);
                    }}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 transition-colors text-xs font-mono flex items-center gap-1"
                    title="Delete Media Asset"
                  >
                    <Trash2 size={12} />
                    <span className="text-[10px] hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================================================
          1. UPLOAD MODAL
          ========================================================================= */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg rounded-3xl bg-[#090507] border border-white/10 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2">
                <Upload size={18} className="text-crimson" />
                <h3 className="text-sm font-mono font-bold uppercase text-white tracking-wider">
                  Upload Media to Supabase
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsUploadOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4">
              {/* Dropzone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files?.[0]) {
                    handleFileSelect(e.dataTransfer.files[0]);
                  }
                }}
                className="relative border-2 border-dashed border-white/15 hover:border-crimson/50 rounded-2xl p-6 text-center transition-all bg-white/[0.02] flex flex-col items-center justify-center space-y-3"
              >
                {uploadPreview ? (
                  <div className="relative w-full h-40 rounded-xl overflow-hidden bg-black/60">
                    <Image
                      src={uploadPreview}
                      alt="Upload Preview"
                      fill
                      className="object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setUploadFile(null);
                        setUploadPreview(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400">
                      <ImageIcon size={22} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-mono font-bold text-neutral-200">
                        Drag & drop image file here, or click to browse
                      </p>
                      <p className="text-[11px] font-sans text-neutral-500">
                        Supported: JPG, PNG, WEBP • Max size: 10MB
                      </p>
                    </div>
                  </>
                )}

                <input
                  type="file"
                  accept={ALLOWED_IMAGE_MIME_TYPES.join(',')}
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {/* Folder & Alt Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-neutral-300 uppercase">
                    Folder / Category
                  </label>
                  <select
                    value={uploadFolder}
                    onChange={(e) => setUploadFolder(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-neutral-200 focus:outline-none focus:border-crimson"
                  >
                    {MEDIA_FOLDERS.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-neutral-300 uppercase">
                    Alt Text (Accessibility)
                  </label>
                  <input
                    type="text"
                    value={uploadAlt}
                    onChange={(e) => setUploadAlt(e.target.value)}
                    placeholder="Short description of image"
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-crimson"
                  />
                </div>
              </div>

              {uploadError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs font-mono transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!uploadFile || isUploading}
                  className="px-5 py-2 rounded-xl bg-crimson hover:bg-[#b01020] text-white text-xs font-mono font-bold shadow-[0_0_15px_rgba(215,25,47,0.3)] disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {isUploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  <span>{isUploading ? 'Uploading...' : 'Confirm Upload'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          2. PREVIEW MODAL
          ========================================================================= */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-3xl rounded-3xl bg-[#090507] border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="space-y-0.5">
                <h3 className="text-sm font-mono font-bold text-white uppercase truncate">
                  {previewAsset.file_name}
                </h3>
                <p className="text-[11px] font-mono text-neutral-500">
                  {previewAsset.storage_path} • {formatBytes(previewAsset.file_size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewAsset(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="relative flex-1 min-h-[350px] bg-black/80 flex items-center justify-center p-6">
              <div className="relative w-full h-full min-h-[350px]">
                <Image
                  src={previewAsset.url || resolveMediaUrl(previewAsset.storage_path)}
                  alt={previewAsset.alt_text || previewAsset.file_name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-neutral-400">
                Alt: {previewAsset.alt_text ? `"${previewAsset.alt_text}"` : 'None'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopyUrl(previewAsset)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono transition-all flex items-center gap-1.5"
                >
                  {copiedId === previewAsset.id ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>Copy Public URL</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewAsset(null)}
                  className="px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 text-xs font-mono"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          3. REPLACE MODAL
          ========================================================================= */}
      {replacingAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-[#090507] border border-white/10 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center gap-2">
                <RefreshCw size={16} className="text-crimson" />
                <h3 className="text-sm font-mono font-bold uppercase text-white tracking-wider">
                  Replace Media File
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setReplacingAsset(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleReplaceSubmit} className="p-6 space-y-4">
              <p className="text-xs font-sans text-neutral-400">
                You are replacing <strong className="text-white font-mono">{replacingAsset.file_name}</strong>.
                The old file will be deleted only after the new file is uploaded safely.
              </p>

              <div className="relative border-2 border-dashed border-white/15 rounded-2xl p-6 text-center bg-white/[0.02] flex flex-col items-center justify-center space-y-3">
                {replacePreview ? (
                  <div className="relative w-full h-36 rounded-xl overflow-hidden bg-black/60">
                    <Image
                      src={replacePreview}
                      alt="New file preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <>
                    <ImageIcon size={24} className="text-neutral-500" />
                    <p className="text-xs font-mono text-neutral-300">Choose new image file</p>
                  </>
                )}

                <input
                  type="file"
                  accept={ALLOWED_IMAGE_MIME_TYPES.join(',')}
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleReplaceFileSelect(e.target.files[0]);
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>

              {replaceError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400">
                  {replaceError}
                </div>
              )}

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setReplacingAsset(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!replaceFile || isReplacing}
                  className="px-5 py-2 rounded-xl bg-crimson hover:bg-[#b01020] text-white text-xs font-mono font-bold disabled:opacity-50 flex items-center gap-2"
                >
                  {isReplacing ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
                  <span>{isReplacing ? 'Replacing...' : 'Confirm Replace'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          4. EDIT ALT TEXT MODAL
          ========================================================================= */}
      {editingAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-[#090507] border border-white/10 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <h3 className="text-sm font-mono font-bold uppercase text-white tracking-wider">
                Edit Image Alt Text
              </h3>
              <button
                type="button"
                onClick={() => setEditingAsset(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveAltText} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-neutral-300 uppercase">
                  Alt Description
                </label>
                <textarea
                  rows={3}
                  value={editAltText}
                  onChange={(e) => setEditAltText(e.target.value)}
                  placeholder="Describe image for screen readers and SEO..."
                  className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-neutral-200 focus:outline-none focus:border-crimson"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingAsset(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingAlt}
                  className="px-5 py-2 rounded-xl bg-crimson hover:bg-[#b01020] text-white text-xs font-mono font-bold flex items-center gap-2"
                >
                  {isSavingAlt ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                  <span>Save Description</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          5. DELETE CONFIRMATION MODAL (WITH USAGE WARNING)
          ========================================================================= */}
      {deletingAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-[#090507] border border-red-500/30 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-red-500/20 flex items-center justify-between bg-red-950/30">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle size={18} />
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider">
                  Delete Media Asset
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDeletingAsset(null)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs font-sans text-neutral-300 leading-relaxed">
                Are you sure you want to delete{' '}
                <strong className="text-white font-mono">{deletingAsset.file_name}</strong>?
                This will permanently remove the file from Supabase Storage.
              </p>

              {/* Reference warning if detected */}
              {deleteWarning?.isReferenced && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <AlertTriangle size={15} />
                    <span>Active Reference Warning</span>
                  </div>
                  <p className="text-[11px] font-sans text-neutral-300">
                    This image appears to be currently used in portfolio section(s):{' '}
                    <strong className="text-amber-300 font-mono">
                      {deleteWarning.sections.join(', ')}
                    </strong>
                    . Deleting it may result in a missing image on the public website.
                  </p>
                </div>
              )}

              {deleteError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400">
                  {deleteError}
                </div>
              )}

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setDeletingAsset(null);
                    setDeleteWarning(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 text-xs font-mono"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(Boolean(deleteWarning?.isReferenced))}
                  disabled={isDeleting}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                >
                  {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  <span>
                    {deleteWarning?.isReferenced ? 'Force Delete Anyway' : 'Confirm Delete'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
