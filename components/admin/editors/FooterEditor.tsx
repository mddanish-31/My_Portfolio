'use client';

import React from 'react';
import { FormField, TextInput, TextArea } from './FormField';
import type { FooterContent } from '@/lib/cms/types';

interface FooterEditorProps {
  data: FooterContent;
  onChange: (data: FooterContent) => void;
}

export function FooterEditor({ data, onChange }: FooterEditorProps) {
  const handleChange = (field: keyof FooterContent, value: unknown) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Closing CTA */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-4">
        <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
          Closing Footer CTA
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Chapter">
            <TextInput
              value={data.cta?.chapter || ''}
              onChange={(e) =>
                handleChange('cta', {
                  ...data.cta,
                  chapter: e.target.value,
                })
              }
            />
          </FormField>
          <FormField label="Eyebrow">
            <TextInput
              value={data.cta?.eyebrow || ''}
              onChange={(e) =>
                handleChange('cta', {
                  ...data.cta,
                  eyebrow: e.target.value,
                })
              }
            />
          </FormField>
        </div>
        <FormField label="Subheading">
          <TextArea
            rows={2}
            value={data.cta?.subheading || ''}
            onChange={(e) =>
              handleChange('cta', {
                ...data.cta,
                subheading: e.target.value,
              })
            }
          />
        </FormField>
      </div>

      {/* Brand & Bottom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Brand Name">
          <TextInput
            value={data.brand?.name || ''}
            onChange={(e) =>
              handleChange('brand', {
                ...data.brand,
                name: e.target.value,
              })
            }
          />
        </FormField>
        <FormField label="Specialization">
          <TextInput
            value={data.brand?.specialization || ''}
            onChange={(e) =>
              handleChange('brand', {
                ...data.brand,
                specialization: e.target.value,
              })
            }
          />
        </FormField>
        <FormField label="Copyright Statement">
          <TextInput
            value={data.bottom?.copyright || ''}
            onChange={(e) =>
              handleChange('bottom', {
                ...data.bottom,
                copyright: e.target.value,
              })
            }
          />
        </FormField>
        <FormField label="Tagline">
          <TextInput
            value={data.bottom?.tagline || ''}
            onChange={(e) =>
              handleChange('bottom', {
                ...data.bottom,
                tagline: e.target.value,
              })
            }
          />
        </FormField>
      </div>
    </div>
  );
}
