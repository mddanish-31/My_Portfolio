'use client';

import React, { useState, useEffect } from 'react';
import { Code, Check, AlertCircle, Sparkles, ChevronDown, ChevronUp, Copy } from 'lucide-react';

interface AdvancedJsonEditorProps {
  value: unknown;
  onChange: (parsedData: unknown) => void;
}

export function AdvancedJsonEditor({ value, onChange }: AdvancedJsonEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync internal string with value whenever value changes from parent
  useEffect(() => {
    try {
      setJsonText(JSON.stringify(value, null, 2));
      setError(null);
    } catch {
      setError('Unable to serialize section data to JSON');
    }
  }, [value]);

  const handleTextChange = (newText: string) => {
    setJsonText(newText);
    try {
      const parsed = JSON.parse(newText);
      setError(null);
      onChange(parsed);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid JSON format';
      setError(msg);
    }
  };

  const handleFormatJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonText(formatted);
      setError(null);
      onChange(parsed);
    } catch {
      // Keep error message
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 overflow-hidden transition-all">
      {/* Accordion Toggle Header */}
      <div className="p-4 flex items-center justify-between gap-4 bg-white/[0.02]">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 text-xs font-mono font-semibold tracking-wider text-neutral-300 hover:text-white uppercase transition-colors cursor-pointer"
        >
          <Code size={16} className="text-crimson" />
          <span>Advanced Raw JSON Editor</span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-neutral-400 normal-case font-mono">
            {isOpen ? 'Expanded' : 'Collapsed'}
          </span>
        </button>

        <div className="flex items-center gap-2">
          {isOpen && (
            <>
              <button
                type="button"
                onClick={handleFormatJson}
                disabled={Boolean(error)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white text-[11px] font-mono transition-colors disabled:opacity-40 cursor-pointer"
              >
                <Sparkles size={12} className="text-amber-400" />
                <span>Format JSON</span>
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 hover:text-white text-[11px] font-mono transition-colors cursor-pointer"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 rounded-lg hover:bg-white/[0.06] text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle JSON editor"
          >
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded Editor Body */}
      {isOpen && (
        <div className="p-4 pt-2 space-y-3 border-t border-white/[0.06]">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-neutral-500">Direct PostgreSQL JSONB view:</span>
            {error ? (
              <span className="inline-flex items-center gap-1 text-red-400 font-semibold">
                <AlertCircle size={12} />
                <span>Invalid JSON: {error}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <Check size={12} />
                <span>Valid JSON Syntax</span>
              </span>
            )}
          </div>

          <textarea
            value={jsonText}
            onChange={(e) => handleTextChange(e.target.value)}
            rows={14}
            spellCheck={false}
            className={`w-full p-4 rounded-xl font-mono text-xs leading-relaxed bg-[#050505] text-neutral-200 border transition-all focus:outline-none ${
              error
                ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-white/10 focus:border-crimson focus:ring-1 focus:ring-crimson'
            }`}
          />
          <p className="text-[11px] font-sans text-neutral-500 leading-normal">
            Note: Changes in the Raw JSON Editor immediately update the form editor when syntax is valid.
          </p>
        </div>
      )}
    </div>
  );
}
