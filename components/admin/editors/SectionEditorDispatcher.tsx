'use client';

import React from 'react';
import { SettingsEditor } from './SettingsEditor';
import { SectionsEditor } from './SectionsEditor';
import { NavigationEditor } from './NavigationEditor';
import { HeroEditor } from './HeroEditor';
import { AboutEditor } from './AboutEditor';
import { AcademicEditor } from './AcademicEditor';
import { SkillsEditor } from './SkillsEditor';
import { ProjectsEditor } from './ProjectsEditor';
import { ExperienceEditor } from './ExperienceEditor';
import { EducationEditor } from './EducationEditor';
import { AvailabilityEditor } from './AvailabilityEditor';
import { ContactEditor } from './ContactEditor';
import { FooterEditor } from './FooterEditor';

interface SectionEditorDispatcherProps {
  sectionId: string;
  data: any;
  onChange: (data: any) => void;
}

export function SectionEditorDispatcher({
  sectionId,
  data,
  onChange,
}: SectionEditorDispatcherProps) {
  switch (sectionId) {
    case 'settings':
      return <SettingsEditor data={data} onChange={onChange} />;
    case 'sections':
      return <SectionsEditor data={data} onChange={onChange} />;
    case 'navigation':
      return <NavigationEditor data={data} onChange={onChange} />;
    case 'home':
      return <HeroEditor data={data} onChange={onChange} />;
    case 'about':
      return <AboutEditor data={data} onChange={onChange} />;
    case 'academic':
      return <AcademicEditor data={data} onChange={onChange} />;
    case 'skills':
      return <SkillsEditor data={data} onChange={onChange} />;
    case 'projects':
      return <ProjectsEditor data={data} onChange={onChange} />;
    case 'experience':
      return <ExperienceEditor data={data} onChange={onChange} />;
    case 'education':
      return <EducationEditor data={data} onChange={onChange} />;
    case 'availability':
      return <AvailabilityEditor data={data} onChange={onChange} />;
    case 'contact':
      return <ContactEditor data={data} onChange={onChange} />;
    case 'footer':
      return <FooterEditor data={data} onChange={onChange} />;
    default:
      return (
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-neutral-400">
          Structured form unavailable for unknown section ID: <code className="text-crimson">{sectionId}</code>. Use the Advanced Raw JSON Editor below.
        </div>
      );
  }
}
