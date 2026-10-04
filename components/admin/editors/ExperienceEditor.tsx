'use client';

import React from 'react';
import { FormField, TextInput, TextArea, SwitchToggle } from './FormField';
import type { ExperienceContent, ExperienceContentItem } from '@/lib/cms/types';

interface ExperienceEditorProps {
  data: ExperienceContent;
  onChange: (data: ExperienceContent) => void;
}

export function ExperienceEditor({ data, onChange }: ExperienceEditorProps) {
  const handleChange = (field: keyof ExperienceContent, value: unknown) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleExperienceChange = (index: number, field: keyof ExperienceContentItem, value: unknown) => {
    const updated = [...(data.allExperiences || [])];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange({
      ...data,
      allExperiences: updated,
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

      {/* Experiences */}
      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
          Experience Records ({data.allExperiences?.length || 0})
        </h4>

        <div className="space-y-4">
          {(data.allExperiences || []).map((exp, idx) => (
            <div
              key={exp.id || idx}
              className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-crimson">
                  {exp.role} • {exp.organization}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300">
                  {exp.period}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FormField label="Role Title">
                  <TextInput
                    value={exp.role}
                    onChange={(e) => handleExperienceChange(idx, 'role', e.target.value)}
                  />
                </FormField>
                <FormField label="Organization">
                  <TextInput
                    value={exp.organization}
                    onChange={(e) => handleExperienceChange(idx, 'organization', e.target.value)}
                  />
                </FormField>
                <FormField label="Period">
                  <TextInput
                    value={exp.period}
                    onChange={(e) => handleExperienceChange(idx, 'period', e.target.value)}
                  />
                </FormField>
              </div>

              <FormField label="Description">
                <TextArea
                  rows={2}
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(idx, 'description', e.target.value)}
                />
              </FormField>

              <FormField label="Technologies / Skills (Comma-separated)">
                <TextInput
                  value={Array.isArray(exp.skills) ? exp.skills.join(', ') : ''}
                  onChange={(e) =>
                    handleExperienceChange(
                      idx,
                      'skills',
                      e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                    )
                  }
                />
              </FormField>

              <SwitchToggle
                label="Visible in Timeline"
                checked={exp.visible ?? true}
                onChange={(val) => handleExperienceChange(idx, 'visible', val)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
