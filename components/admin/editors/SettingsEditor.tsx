'use client';

import React from 'react';
import { FormField, TextInput, TextArea, SwitchToggle } from './FormField';
import { MediaPicker } from '@/components/admin/MediaPicker';
import type { SiteSettings } from '@/lib/cms/types';

interface SettingsEditorProps {
  data: SiteSettings;
  onChange: (data: SiteSettings) => void;
}

export function SettingsEditor({ data, onChange }: SettingsEditorProps) {
  const handleChange = (field: keyof SiteSettings, value: unknown) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleSocialChange = (key: string, value: string) => {
    onChange({
      ...data,
      socialLinks: {
        ...data.socialLinks,
        [key]: value,
      },
    });
  };

  const handleStatusBadgeChange = (field: string, value: unknown) => {
    onChange({
      ...data,
      statusBadge: {
        ...data.statusBadge,
        [field]: value,
      },
    });
  };

  const keywordsString = Array.isArray(data.keywords) ? data.keywords.join(', ') : '';

  return (
    <div className="space-y-6">
      {/* Basic Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Site Title" description="Browser tab title & search engine main title">
          <TextInput
            value={data.siteTitle || ''}
            onChange={(e) => handleChange('siteTitle', e.target.value)}
            placeholder="MD. DANISH RAZA — Full-Stack Developer"
          />
        </FormField>

        <FormField label="Site Name" description="Brand name identifier">
          <TextInput
            value={data.siteName || ''}
            onChange={(e) => handleChange('siteName', e.target.value)}
            placeholder="MD. DANISH RAZA Portfolio"
          />
        </FormField>
      </div>

      <FormField label="Tagline" description="Primary website slogan">
        <TextInput
          value={data.tagline || ''}
          onChange={(e) => handleChange('tagline', e.target.value)}
          placeholder="Building digital experiences that look sharp and work beautifully."
        />
      </FormField>

      <FormField label="SEO Description" description="Global meta description for search engines & previews">
        <TextArea
          value={data.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
          placeholder="Full-Stack Developer specializing in..."
        />
      </FormField>

      <FormField label="SEO Keywords" description="Comma-separated list of keywords">
        <TextInput
          value={keywordsString}
          onChange={(e) =>
            handleChange(
              'keywords',
              e.target.value.split(',').map((k) => k.trim()).filter(Boolean)
            )
          }
          placeholder="Next.js, React, TypeScript, Full-Stack, Portfolio"
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField label="Author Name">
          <TextInput
            value={data.author || ''}
            onChange={(e) => handleChange('author', e.target.value)}
          />
        </FormField>
        <FormField label="Author URL">
          <TextInput
            value={data.authorUrl || ''}
            onChange={(e) => handleChange('authorUrl', e.target.value)}
          />
        </FormField>
        <FormField label="Twitter Handle">
          <TextInput
            value={data.twitterHandle || ''}
            onChange={(e) => handleChange('twitterHandle', e.target.value)}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MediaPicker
          label="Open Graph (OG) Share Image"
          folder="general"
          value={data.ogImageUrl || ''}
          onChange={(val) => handleChange('ogImageUrl', val)}
          description="Image shown in social link previews (Twitter, WhatsApp, LinkedIn)"
          placeholder="/images/portrait/danish-portrait-2x.png"
        />
        <MediaPicker
          label="Favicon Icon"
          folder="general"
          value={data.faviconUrl || ''}
          onChange={(val) => handleChange('faviconUrl', val)}
          description="Browser tab icon (.svg / .png / .ico)"
          placeholder="/icon.svg"
        />
      </div>

      {/* Status Badge */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-4">
        <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
          Availability Status Badge
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Badge Text">
            <TextInput
              value={data.statusBadge?.text || ''}
              onChange={(e) => handleStatusBadgeChange('text', e.target.value)}
              placeholder="AVAILABLE FOR WORK"
            />
          </FormField>
          <div className="space-y-2 pt-2">
            <SwitchToggle
              label="Active Status"
              checked={data.statusBadge?.available ?? true}
              onChange={(val) => handleStatusBadgeChange('available', val)}
            />
            <SwitchToggle
              label="Dot Pulse Animation"
              checked={data.statusBadge?.dotPulse ?? true}
              onChange={(val) => handleStatusBadgeChange('dotPulse', val)}
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-4">
        <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
          Social Links & Handles
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="GitHub URL">
            <TextInput
              value={data.socialLinks?.github || ''}
              onChange={(e) => handleSocialChange('github', e.target.value)}
            />
          </FormField>
          <FormField label="LinkedIn URL">
            <TextInput
              value={data.socialLinks?.linkedin || ''}
              onChange={(e) => handleSocialChange('linkedin', e.target.value)}
            />
          </FormField>
          <FormField label="Twitter / X URL">
            <TextInput
              value={data.socialLinks?.twitter || ''}
              onChange={(e) => handleSocialChange('twitter', e.target.value)}
            />
          </FormField>
          <FormField label="Instagram URL">
            <TextInput
              value={data.socialLinks?.instagram || ''}
              onChange={(e) => handleSocialChange('instagram', e.target.value)}
            />
          </FormField>
          <FormField label="Email Address">
            <TextInput
              value={data.socialLinks?.email || ''}
              onChange={(e) => handleSocialChange('email', e.target.value)}
            />
          </FormField>
          <FormField label="WhatsApp URL">
            <TextInput
              value={data.socialLinks?.whatsapp || ''}
              onChange={(e) => handleSocialChange('whatsapp', e.target.value)}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
