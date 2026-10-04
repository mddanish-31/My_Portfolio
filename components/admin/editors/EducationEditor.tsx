'use client';

import React from 'react';
import { FormField, TextInput, TextArea, SwitchToggle } from './FormField';
import type { EducationContent, EducationContentItem } from '@/lib/cms/types';

interface EducationEditorProps {
  data: EducationContent;
  onChange: (data: EducationContent) => void;
}

export function EducationEditor({ data, onChange }: EducationEditorProps) {
  const handleChange = (field: keyof EducationContent, value: unknown) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleItemChange = (index: number, field: keyof EducationContentItem, value: unknown) => {
    const updated = [...(data.items || [])];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange({
      ...data,
      items: updated,
    });
  };

  const headingText = Array.isArray(data.heading) ? data.heading.join('\n') : '';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Chapter Index">
          <TextInput
            value={data.chapter || ''}
            onChange={(e) => handleChange('chapter', e.target.value)}
          />
        </FormField>
        <FormField label="Eyebrow Tag">
          <TextInput
            value={data.eyebrow || ''}
            onChange={(e) => handleChange('eyebrow', e.target.value)}
          />
        </FormField>
      </div>

      <FormField label="Heading Lines (1 per line)">
        <TextArea
          rows={3}
          value={headingText}
          onChange={(e) =>
            handleChange(
              'heading',
              e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
            )
          }
        />
      </FormField>

      <FormField label="Subheading">
        <TextArea
          rows={2}
          value={data.subheading || ''}
          onChange={(e) => handleChange('subheading', e.target.value)}
        />
      </FormField>

      {/* Education Items */}
      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
          Academic Qualifications ({data.items?.length || 0})
        </h4>

        <div className="space-y-4">
          {(data.items || []).map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-crimson">
                  {item.degree} • {item.institution}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300">
                  {item.timeline} ({item.statusBadge})
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FormField label="Degree / Level">
                  <TextInput
                    value={item.degree}
                    onChange={(e) => handleItemChange(idx, 'degree', e.target.value)}
                  />
                </FormField>
                <FormField label="Institution">
                  <TextInput
                    value={item.institution}
                    onChange={(e) => handleItemChange(idx, 'institution', e.target.value)}
                  />
                </FormField>
                <FormField label="Timeline">
                  <TextInput
                    value={item.timeline}
                    onChange={(e) => handleItemChange(idx, 'timeline', e.target.value)}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FormField label="Field of Study">
                  <TextInput
                    value={item.field || ''}
                    onChange={(e) => handleItemChange(idx, 'field', e.target.value)}
                  />
                </FormField>
                <FormField label="Score / Grade">
                  <TextInput
                    value={item.score}
                    onChange={(e) => handleItemChange(idx, 'score', e.target.value)}
                  />
                </FormField>
                <FormField label="Score Type">
                  <TextInput
                    value={item.scoreType}
                    onChange={(e) => handleItemChange(idx, 'scoreType', e.target.value)}
                  />
                </FormField>
              </div>

              <FormField label="Description">
                <TextArea
                  rows={2}
                  value={item.description || ''}
                  onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                />
              </FormField>

              <SwitchToggle
                label="Visible in Education Section"
                checked={item.visible ?? true}
                onChange={(val) => handleItemChange(idx, 'visible', val)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
