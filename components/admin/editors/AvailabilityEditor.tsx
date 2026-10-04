'use client';

import React from 'react';
import { FormField, TextInput, TextArea } from './FormField';
import type { AvailabilityContent, OpportunityTrack } from '@/lib/cms/types';

interface AvailabilityEditorProps {
  data: AvailabilityContent;
  onChange: (data: AvailabilityContent) => void;
}

export function AvailabilityEditor({ data, onChange }: AvailabilityEditorProps) {
  const handleChange = (field: keyof AvailabilityContent, value: unknown) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleOpportunityChange = (index: number, field: keyof OpportunityTrack, value: unknown) => {
    const updated = [...(data.opportunities || [])];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange({
      ...data,
      opportunities: updated,
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Status Badge Label">
          <TextInput
            value={data.statusBadge || ''}
            onChange={(e) => handleChange('statusBadge', e.target.value)}
          />
        </FormField>
        <FormField label="Status Subtitle">
          <TextInput
            value={data.statusSubtitle || ''}
            onChange={(e) => handleChange('statusSubtitle', e.target.value)}
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

      <FormField label="Availability Message">
        <TextArea
          rows={3}
          value={data.message || ''}
          onChange={(e) => handleChange('message', e.target.value)}
        />
      </FormField>

      {/* Opportunities */}
      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
          Opportunity Tracks ({data.opportunities?.length || 0})
        </h4>

        <div className="space-y-3">
          {(data.opportunities || []).map((opp, idx) => (
            <div
              key={opp.number || idx}
              className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <FormField label="Track Title">
                  <TextInput
                    value={opp.title}
                    onChange={(e) => handleOpportunityChange(idx, 'title', e.target.value)}
                  />
                </FormField>
                <FormField label="Subtitle">
                  <TextInput
                    value={opp.subtitle || ''}
                    onChange={(e) => handleOpportunityChange(idx, 'subtitle', e.target.value)}
                  />
                </FormField>
                <FormField label="Tag Badge">
                  <TextInput
                    value={opp.tag || ''}
                    onChange={(e) => handleOpportunityChange(idx, 'tag', e.target.value)}
                  />
                </FormField>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-4">
        <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
          Bottom CTA Box
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="CTA Title">
            <TextInput
              value={data.cta?.title || ''}
              onChange={(e) =>
                handleChange('cta', {
                  ...data.cta,
                  title: e.target.value,
                })
              }
            />
          </FormField>
          <FormField label="CTA Subtitle">
            <TextInput
              value={data.cta?.subtitle || ''}
              onChange={(e) =>
                handleChange('cta', {
                  ...data.cta,
                  subtitle: e.target.value,
                })
              }
            />
          </FormField>
          <FormField label="Primary Button Text">
            <TextInput
              value={data.cta?.primaryText || ''}
              onChange={(e) =>
                handleChange('cta', {
                  ...data.cta,
                  primaryText: e.target.value,
                })
              }
            />
          </FormField>
          <FormField label="Primary Button Target">
            <TextInput
              value={data.cta?.primaryHref || ''}
              onChange={(e) =>
                handleChange('cta', {
                  ...data.cta,
                  primaryHref: e.target.value,
                })
              }
            />
          </FormField>
        </div>
      </div>
    </div>
  );
}
