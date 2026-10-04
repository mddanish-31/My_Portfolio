'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface UnsavedChangesModalProps {
  isOpen: boolean;
  sectionName: string;
  onStay: () => void;
  onDiscard: () => void;
}

export function UnsavedChangesModal({
  isOpen,
  sectionName,
  onStay,
  onDiscard,
}: UnsavedChangesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="w-full max-w-md rounded-3xl bg-[linear-gradient(135deg,rgba(24,6,10,0.95)_0%,rgba(8,2,4,0.98)_100%)] border border-amber-500/40 shadow-[0_30px_90px_rgba(0,0,0,0.9)] p-6 sm:p-8 space-y-6">
        
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-sans text-white uppercase tracking-tight">
              Unsaved Changes
            </h3>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              You have modified content in <span className="text-amber-300 font-bold font-mono">[{sectionName}]</span> that has not been saved or published yet.
            </p>
          </div>
        </div>

        <p className="text-xs font-mono text-neutral-400 p-3.5 rounded-xl bg-black/50 border border-white/5">
          Leaving or switching sections will permanently discard your pending edits.
        </p>

        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-2">
          <button
            onClick={onStay}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/10 text-neutral-300 hover:text-white font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Stay & Keep Editing
          </button>
          <button
            onClick={onDiscard}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.3)]"
          >
            Discard Changes
          </button>
        </div>

      </div>
    </div>
  );
}
