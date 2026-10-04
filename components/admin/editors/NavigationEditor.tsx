'use client';

import React from 'react';
import { FormField, TextInput, SwitchToggle } from './FormField';
import type { NavigationContent, NavigationContentItem } from '@/lib/cms/types';
import { Plus, Trash2 } from 'lucide-react';

interface NavigationEditorProps {
  data: NavigationContent;
  onChange: (data: NavigationContent) => void;
}

export function NavigationEditor({ data, onChange }: NavigationEditorProps) {
  const handleChange = (field: keyof NavigationContent, value: unknown) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleLinkChange = (index: number, field: keyof NavigationContentItem, value: unknown) => {
    const updated = [...(data.links || [])];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange({
      ...data,
      links: updated,
    });
  };

  const handleAddLink = () => {
    const newLink: NavigationContentItem = {
      id: 'custom-link',
      name: 'New Link',
      href: '#',
      order: (data.links?.length || 0) + 1,
      visible: true,
    };
    onChange({
      ...data,
      links: [...(data.links || []), newLink],
    });
  };

  const handleRemoveLink = (index: number) => {
    const updated = (data.links || []).filter((_, idx) => idx !== index);
    onChange({
      ...data,
      links: updated,
    });
  };

  return (
    <div className="space-y-6">
      {/* Brand & Top Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField label="Brand Name" description="Navbar left logo text">
          <TextInput
            value={data.brandName || ''}
            onChange={(e) => handleChange('brandName', e.target.value)}
            placeholder="MD. DANISH RAZA"
          />
        </FormField>

        <FormField label="Status Badge Label">
          <TextInput
            value={data.statusBadge?.text || ''}
            onChange={(e) =>
              handleChange('statusBadge', {
                ...data.statusBadge,
                text: e.target.value,
              })
            }
            placeholder="AVAILABLE FOR WORK"
          />
        </FormField>

        <FormField label="CTA Button Text">
          <TextInput
            value={data.ctaButton?.text || ''}
            onChange={(e) =>
              handleChange('ctaButton', {
                ...data.ctaButton,
                text: e.target.value,
              })
            }
            placeholder="LET'S TALK"
          />
        </FormField>
      </div>

      {/* Navigation Links */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
            Navigation Bar Links ({data.links?.length || 0})
          </h4>
          <button
            type="button"
            onClick={handleAddLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <Plus size={13} />
            <span>Add Link</span>
          </button>
        </div>

        <div className="space-y-3">
          {(data.links || []).map((link, idx) => (
            <div
              key={link.id || idx}
              className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3 hover:border-white/10 transition-all"
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                <FormField label="Link Text">
                  <TextInput
                    value={link.name}
                    onChange={(e) => handleLinkChange(idx, 'name', e.target.value)}
                  />
                </FormField>
                <FormField label="Target Anchor / URL">
                  <TextInput
                    value={link.href}
                    onChange={(e) => handleLinkChange(idx, 'href', e.target.value)}
                  />
                </FormField>
                <FormField label="Section ID">
                  <TextInput
                    value={link.id}
                    onChange={(e) => handleLinkChange(idx, 'id', e.target.value)}
                  />
                </FormField>
                <div className="flex items-center justify-between gap-2">
                  <SwitchToggle
                    label="Visible"
                    checked={link.visible}
                    onChange={(val) => handleLinkChange(idx, 'visible', val)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(idx)}
                    className="p-2.5 rounded-xl bg-red-950/40 hover:bg-red-950/80 text-red-400 border border-red-500/20 transition-colors cursor-pointer"
                    title="Delete Link"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
