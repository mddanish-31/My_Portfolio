'use client';

import React from 'react';
import { FormField, TextInput, TextArea } from './FormField';
import { MediaPicker } from '@/components/admin/MediaPicker';
import type { HeroContent } from '@/lib/cms/types';

interface HeroEditorProps {
  data: HeroContent;
  onChange: (data: HeroContent) => void;
}

export function HeroEditor({ data, onChange }: HeroEditorProps) {
  const handleChange = (field: keyof HeroContent, value: unknown) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleMetadataItemsChange = (blockKey: 'currently' | 'graduating' | 'openFor', itemsStr: string) => {
    const items = itemsStr.split('\n').map((s) => s.trim()).filter(Boolean);
    onChange({
      ...data,
      metadata: {
        ...data.metadata,
        [blockKey]: {
          ...data.metadata[blockKey],
          items,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Intro & Names */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FormField label="Eyebrow Intro" description="Italic script intro above name">
          <TextInput
            value={data.eyebrow || ''}
            onChange={(e) => handleChange('eyebrow', e.target.value)}
            placeholder="Hello, I'm"
          />
        </FormField>
        <FormField label="First Name" description="Upper first name line">
          <TextInput
            value={data.firstName || ''}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="MD."
          />
        </FormField>
        <FormField label="Last Name" description="Lower name line">
          <TextInput
            value={data.lastName || ''}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="DANISH RAZA"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Primary Role" description="Highlighted title in red/crimson">
          <TextInput
            value={data.role || ''}
            onChange={(e) => handleChange('role', e.target.value)}
            placeholder="FULL-STACK DEVELOPER"
          />
        </FormField>
        <FormField label="Location">
          <TextInput
            value={data.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="INDIA"
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Subtitle" description="Caps heading below role">
          <TextInput
            value={data.subtitle || ''}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            placeholder="CREATIVE DESIGNER & DIGITAL PROFESSIONAL"
          />
        </FormField>
        <FormField label="Background Poster Text" description="Giant background typography">
          <TextInput
            value={data.posterText || ''}
            onChange={(e) => handleChange('posterText', e.target.value)}
            placeholder="PORTFOLIO"
          />
        </FormField>
      </div>

      <FormField label="Tagline / Bio" description="Lead paragraph under identity">
        <TextArea
          value={data.tagline || ''}
          onChange={(e) => handleChange('tagline', e.target.value)}
          rows={2}
          placeholder="Building digital experiences that look sharp and work beautifully."
        />
      </FormField>

      <MediaPicker
        label="Hero Portrait Image"
        folder="hero"
        value={data.portraitUrl || ''}
        onChange={(val) => handleChange('portraitUrl', val)}
        description="High-resolution editorial portrait image shown in Hero stage. Supports Supabase Storage, local paths, or external URLs."
        placeholder="/images/portrait/danish-portrait-2x.png"
      />

      {/* Call to Actions */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-4">
        <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
          Call to Action Buttons
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Primary CTA Label">
            <TextInput
              value={data.primaryCta?.label || ''}
              onChange={(e) =>
                handleChange('primaryCta', {
                  ...data.primaryCta,
                  label: e.target.value,
                })
              }
              placeholder="View My Work"
            />
          </FormField>
          <FormField label="Primary CTA Link">
            <TextInput
              value={data.primaryCta?.href || ''}
              onChange={(e) =>
                handleChange('primaryCta', {
                  ...data.primaryCta,
                  href: e.target.value,
                })
              }
              placeholder="#projects"
            />
          </FormField>

          <FormField label="Secondary CTA Label">
            <TextInput
              value={data.secondaryCta?.label || ''}
              onChange={(e) =>
                handleChange('secondaryCta', {
                  ...data.secondaryCta,
                  label: e.target.value,
                })
              }
              placeholder="Let's Talk"
            />
          </FormField>
          <FormField label="Secondary CTA Link">
            <TextInput
              value={data.secondaryCta?.href || ''}
              onChange={(e) =>
                handleChange('secondaryCta', {
                  ...data.secondaryCta,
                  href: e.target.value,
                })
              }
              placeholder="#contact"
            />
          </FormField>
        </div>
      </div>

      {/* Right Column Metadata Cards */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-4">
        <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
          Profile Information Cards (Right Column)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Currently (Lines, 1 per row)">
            <TextArea
              rows={2}
              value={data.metadata?.currently?.items?.join('\n') || ''}
              onChange={(e) => handleMetadataItemsChange('currently', e.target.value)}
            />
          </FormField>

          <FormField label="Graduating (Lines, 1 per row)">
            <TextArea
              rows={2}
              value={data.metadata?.graduating?.items?.join('\n') || ''}
              onChange={(e) => handleMetadataItemsChange('graduating', e.target.value)}
            />
          </FormField>

          <FormField label="Focused On (Single Value)">
            <TextInput
              value={data.metadata?.focusedOn?.value || ''}
              onChange={(e) =>
                onChange({
                  ...data,
                  metadata: {
                    ...data.metadata,
                    focusedOn: {
                      ...data.metadata.focusedOn,
                      value: e.target.value,
                    },
                  },
                })
              }
            />
          </FormField>

          <FormField label="Open For (Lines, 1 per row)">
            <TextArea
              rows={2}
              value={data.metadata?.openFor?.items?.join('\n') || ''}
              onChange={(e) => handleMetadataItemsChange('openFor', e.target.value)}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
