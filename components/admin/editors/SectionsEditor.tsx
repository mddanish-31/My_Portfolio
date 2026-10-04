'use client';

import React from 'react';
import { FormField, TextInput, SwitchToggle } from './FormField';
import type { SectionSetting } from '@/lib/cms/types';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface SectionsEditorProps {
  data: SectionSetting[];
  onChange: (data: SectionSetting[]) => void;
}

export function SectionsEditor({ data, onChange }: SectionsEditorProps) {
  const sectionsList = Array.isArray(data) ? [...data] : [];

  const handleItemChange = (index: number, field: keyof SectionSetting, value: unknown) => {
    const updated = [...sectionsList];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= sectionsList.length) return;
    const updated = [...sectionsList];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    // update order numbers
    updated.forEach((s, idx) => {
      s.order = idx + 1;
    });
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-neutral-400 font-sans">
        Configure section ordering, display labels, and global visibility switches.
      </p>

      <div className="space-y-3">
        {sectionsList.map((sec, idx) => (
          <div
            key={sec.id}
            className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3 hover:border-white/10 transition-all"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-white/5 text-[11px] font-mono font-bold flex items-center justify-center text-neutral-400">
                  {idx + 1}
                </span>
                <code className="px-2 py-0.5 rounded bg-crimson/15 text-crimson text-xs font-mono font-bold">
                  {sec.id}
                </code>
                <span className="text-xs font-bold text-white font-sans">{sec.name}</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleMove(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => handleMove(idx, 'down')}
                  disabled={idx === sectionsList.length - 1}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 disabled:opacity-30 cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown size={13} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <FormField label="Display Name">
                <TextInput
                  value={sec.name}
                  onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                />
              </FormField>

              <FormField label="Navigation Bar Label">
                <TextInput
                  value={sec.navLabel}
                  onChange={(e) => handleItemChange(idx, 'navLabel', e.target.value)}
                />
              </FormField>

              <div className="flex flex-col gap-2 pt-2">
                <SwitchToggle
                  label="Section Enabled"
                  checked={sec.enabled}
                  onChange={(val) => handleItemChange(idx, 'enabled', val)}
                />
                <SwitchToggle
                  label="Show in Nav Bar"
                  checked={sec.inNavigation}
                  onChange={(val) => handleItemChange(idx, 'inNavigation', val)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
