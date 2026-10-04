'use client';

import React from 'react';
import { FormField, TextInput, TextArea, SwitchToggle } from './FormField';
import type { AboutContent, AboutSlideContent } from '@/lib/cms/types';

interface AboutEditorProps {
  data: AboutContent;
  onChange: (data: AboutContent) => void;
}

export function AboutEditor({ data, onChange }: AboutEditorProps) {
  const handleChange = (field: keyof AboutContent, value: unknown) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleSlideChange = (index: number, field: keyof AboutSlideContent, value: unknown) => {
    const updated = [...(data.slides || [])];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange({
      ...data,
      slides: updated,
    });
  };

  return (
    <div className="space-y-6">
      {/* Chapter Headers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Chapter Index">
          <TextInput
            value={data.chapter || ''}
            onChange={(e) => handleChange('chapter', e.target.value)}
            placeholder="CHAPTER 01"
          />
        </FormField>
        <FormField label="Eyebrow Tag">
          <TextInput
            value={data.eyebrow || ''}
            onChange={(e) => handleChange('eyebrow', e.target.value)}
            placeholder="PROFILE & PURPOSE"
          />
        </FormField>
      </div>

      <FormField label="Main Headline">
        <TextInput
          value={data.headline || ''}
          onChange={(e) => handleChange('headline', e.target.value)}
          placeholder="WHO I AM & WHAT DRIVES ME"
        />
      </FormField>

      <FormField label="Subheading">
        <TextArea
          value={data.subheading || ''}
          onChange={(e) => handleChange('subheading', e.target.value)}
          rows={2}
          placeholder="A curated summary of my background..."
        />
      </FormField>

      {/* Quote */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-4">
        <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
          Featured Philosophy Quote
        </h4>
        <FormField label="Quote Text">
          <TextArea
            rows={2}
            value={data.quote?.text || ''}
            onChange={(e) =>
              handleChange('quote', {
                ...data.quote,
                text: e.target.value,
              })
            }
          />
        </FormField>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Quote Author">
            <TextInput
              value={data.quote?.author || ''}
              onChange={(e) =>
                handleChange('quote', {
                  ...data.quote,
                  author: e.target.value,
                })
              }
            />
          </FormField>
          <FormField label="Author Role">
            <TextInput
              value={data.quote?.role || ''}
              onChange={(e) =>
                handleChange('quote', {
                  ...data.quote,
                  role: e.target.value,
                })
              }
            />
          </FormField>
        </div>
      </div>

      {/* Narrative Slides */}
      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
          6 Narrative Carousel Slides ({data.slides?.length || 0})
        </h4>

        <div className="space-y-4">
          {(data.slides || []).map((slide, idx) => (
            <div
              key={slide.id || idx}
              className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-crimson">
                  SLIDE {slide.number || `0${idx + 1}`} • {slide.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                  {slide.category}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FormField label="Slide Title">
                  <TextInput
                    value={slide.title}
                    onChange={(e) => handleSlideChange(idx, 'title', e.target.value)}
                  />
                </FormField>
                <FormField label="Category Label">
                  <TextInput
                    value={slide.category}
                    onChange={(e) => handleSlideChange(idx, 'category', e.target.value)}
                  />
                </FormField>
                <FormField label="Bottom Banner Label">
                  <TextInput
                    value={slide.bottomLabel || ''}
                    onChange={(e) => handleSlideChange(idx, 'bottomLabel', e.target.value)}
                  />
                </FormField>
              </div>

              <FormField label="Narrative Text">
                <TextArea
                  rows={3}
                  value={slide.text}
                  onChange={(e) => handleSlideChange(idx, 'text', e.target.value)}
                />
              </FormField>

              <SwitchToggle
                label="Slide Visible in Carousel"
                checked={slide.visible ?? true}
                onChange={(val) => handleSlideChange(idx, 'visible', val)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
