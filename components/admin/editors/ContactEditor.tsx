'use client';

import React from 'react';
import { FormField, TextInput, TextArea } from './FormField';
import type { ContactContent, ContactCardItem } from '@/lib/cms/types';

interface ContactEditorProps {
  data: ContactContent;
  onChange: (data: ContactContent) => void;
}

export function ContactEditor({ data, onChange }: ContactEditorProps) {
  const handleChange = (field: keyof ContactContent, value: unknown) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleCardChange = (index: number, field: keyof ContactCardItem, value: unknown) => {
    const updated = [...(data.cards || [])];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange({
      ...data,
      cards: updated,
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
          rows={2}
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

      {/* Contact Cards */}
      <div className="space-y-4 pt-2">
        <h4 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
          Direct Communication Cards ({data.cards?.length || 0})
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {(data.cards || []).map((card, idx) => (
            <div
              key={card.id || idx}
              className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-2"
            >
              <div className="grid grid-cols-2 gap-2">
                <FormField label="Card Title">
                  <TextInput
                    value={card.title}
                    onChange={(e) => handleCardChange(idx, 'title', e.target.value)}
                  />
                </FormField>
                <FormField label="Handle / Address">
                  <TextInput
                    value={card.handle || ''}
                    onChange={(e) => handleCardChange(idx, 'handle', e.target.value)}
                  />
                </FormField>
              </div>
              <FormField label="Description">
                <TextInput
                  value={card.description}
                  onChange={(e) => handleCardChange(idx, 'description', e.target.value)}
                />
              </FormField>
              <div className="grid grid-cols-2 gap-2">
                <FormField label="Button Text">
                  <TextInput
                    value={card.buttonText}
                    onChange={(e) => handleCardChange(idx, 'buttonText', e.target.value)}
                  />
                </FormField>
                <FormField label="Target Link">
                  <TextInput
                    value={card.href}
                    onChange={(e) => handleCardChange(idx, 'href', e.target.value)}
                  />
                </FormField>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
