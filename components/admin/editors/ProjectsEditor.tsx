'use client';

import React, { useState } from 'react';
import { FormField, TextInput, TextArea, SwitchToggle } from './FormField';
import { MediaPicker } from '@/components/admin/MediaPicker';
import type { ProjectsContent, ProjectContent } from '@/lib/cms/types';
import { normalizeProject } from '@/data/projects';
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Copy,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
  Eye,
  EyeOff,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectsEditorProps {
  data: ProjectsContent;
  onChange: (data: ProjectsContent) => void;
}

export function ProjectsEditor({ data, onChange }: ProjectsEditorProps) {
  const [expandedDetails, setExpandedDetails] = useState<Record<string, boolean>>({});
  const [searchFilter, setSearchFilter] = useState('');

  const projects = (data.projects || []).map((p, idx) => normalizeProject(p, idx));

  const handleChange = (field: keyof ProjectsContent, value: unknown) => {
    onChange({
      ...data,
      [field]: value,
    });
  };

  const handleProjectFieldChange = (
    index: number,
    field: keyof ProjectContent | string,
    value: unknown
  ) => {
    const updated = [...projects];
    const proj = { ...updated[index] };

    if (field === 'shortDescription' || field === 'description') {
      proj.shortDescription = value as string;
      proj.description = value as string;
    } else if (field === 'detailedOverview' || field === 'overview') {
      proj.detailedOverview = value as string;
      proj.overview = value as string;
    } else if (field === 'coverImage' || field === 'image') {
      proj.coverImage = value as string;
      proj.image = value as string;
    } else if (field === 'liveDemoUrl' || field === 'liveUrl') {
      proj.liveDemoUrl = (value as string) || null;
      proj.liveUrl = (value as string) || null;
    } else if (field === 'technologies') {
      let arr: string[] = [];
      if (Array.isArray(value)) {
        arr = value;
      } else if (typeof value === 'string') {
        arr = value.split(',').map((s) => s.trim()).filter(Boolean);
      }
      proj.technologies = arr;
    } else {
      (proj as any)[field] = value;
    }

    updated[index] = proj;
    onChange({
      ...data,
      projects: updated,
    });
  };

  const handleMoveProject = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === projects.length - 1)
    ) {
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...projects];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);

    // Re-index order & numbers sequentially
    const reordered = updated.map((p, idx) => ({
      ...p,
      order: idx + 1,
      number: idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`,
    }));

    onChange({
      ...data,
      projects: reordered,
    });
  };

  const handleAddProject = () => {
    const nextOrder = projects.length + 1;
    const nextNum = nextOrder < 10 ? `0${nextOrder}` : `${nextOrder}`;
    const newId = `project-${Date.now()}`;

    const newProject: ProjectContent = {
      id: newId,
      number: nextNum,
      title: 'New Project Title',
      subtitle: 'Project Subtitle / Category Focus',
      year: `${new Date().getFullYear()}`,
      category: 'FULL-STACK PLATFORM',
      domain: 'Full-Stack',
      shortDescription: 'Concise summary of the project architecture and key capabilities.',
      description: 'Concise summary of the project architecture and key capabilities.',
      detailedOverview: 'Detailed architectural overview, technical decisions, and system design.',
      overview: 'Detailed architectural overview, technical decisions, and system design.',
      coverImage: '/images/projects/technexa.jpg',
      image: '/images/projects/technexa.jpg',
      secondaryImage: '/images/projects/urban-styles.jpg',
      liveDemoUrl: 'https://example.com',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/project',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      featured: true,
      visible: true,
      order: nextOrder,
      role: ['Full-Stack Engineering', 'UI/UX Design'],
      features: ['Modular architecture', 'Real-time synchronization'],
      challenges: ['Optimizing performance on mobile devices'],
      solution: ['Implemented efficient caching and memoization'],
      contribution: 'Designed and built the full-stack system from concept to production.',
      accentColor: '#D7192F',
      stats: [
        { label: 'Architecture', value: 'Full-Stack' },
        { label: 'Performance', value: '98+ Lighthouse' },
      ],
    };

    onChange({
      ...data,
      projects: [...projects, newProject],
    });

    setExpandedDetails((prev) => ({ ...prev, [newId]: true }));
  };

  const handleDuplicateProject = (index: number) => {
    const source = projects[index];
    const newId = `${source.id}-copy-${Date.now()}`;
    const nextOrder = projects.length + 1;
    const nextNum = nextOrder < 10 ? `0${nextOrder}` : `${nextOrder}`;

    const duplicate: ProjectContent = {
      ...source,
      id: newId,
      number: nextNum,
      title: `${source.title} (Copy)`,
      order: nextOrder,
    };

    onChange({
      ...data,
      projects: [...projects, duplicate],
    });
  };

  const handleDeleteProject = (index: number) => {
    const proj = projects[index];
    if (
      window.confirm(
        `Are you sure you want to remove project "${proj.title}"? This cannot be undone.`
      )
    ) {
      const filtered = projects.filter((_, i) => i !== index);
      const reordered = filtered.map((p, idx) => ({
        ...p,
        order: idx + 1,
        number: idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`,
      }));
      onChange({
        ...data,
        projects: reordered,
      });
    }
  };

  const toggleDetails = (id: string) => {
    setExpandedDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const headingText = Array.isArray(data.heading) ? data.heading.join('\n') : '';

  const filteredProjects = projects.filter((p) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.domain && p.domain.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* 1. Chapter & Headers */}
      <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-4">
        <h4 className="text-xs font-mono font-bold uppercase text-crimson tracking-wider flex items-center gap-2">
          <Sparkles size={14} />
          <span>Section Editorial Header</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Chapter Index">
            <TextInput
              value={data.chapter || ''}
              onChange={(e) => handleChange('chapter', e.target.value)}
              placeholder="CHAPTER 04"
            />
          </FormField>
          <FormField label="Eyebrow Tag">
            <TextInput
              value={data.eyebrow || ''}
              onChange={(e) => handleChange('eyebrow', e.target.value)}
              placeholder="SELECTED WORK"
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
            placeholder="PROJECTS &&#10;FRAMEWORKS"
          />
        </FormField>

        <FormField label="Subheading / Editorial Summary">
          <TextArea
            rows={2}
            value={data.subheading || ''}
            onChange={(e) => handleChange('subheading', e.target.value)}
            placeholder="Curated portfolio exhibition spanning full-stack architectures..."
          />
        </FormField>
      </div>

      {/* 2. Projects Showcase Manager */}
      <div className="space-y-4 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/10">
          <div>
            <h4 className="text-sm font-mono font-bold uppercase text-white tracking-wider flex items-center gap-2">
              <Layers size={16} className="text-crimson" />
              <span>Projects Showcase ({projects.length})</span>
            </h4>
            <p className="text-[11px] font-sans text-neutral-400">
              Canonical projects consumed directly by the public homepage exhibition and case study modal.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter projects..."
              className="px-3 py-1.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder:text-neutral-500 font-sans focus:outline-none focus:border-crimson"
            />
            <button
              type="button"
              onClick={handleAddProject}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-crimson hover:bg-crimson-light text-white text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md shrink-0"
            >
              <Plus size={14} />
              <span>Add Project</span>
            </button>
          </div>
        </div>

        {/* Project Cards List */}
        <div className="space-y-4">
          {filteredProjects.map((project) => {
            const actualIndex = projects.findIndex((p) => p.id === project.id);
            const isExpanded = !!expandedDetails[project.id];
            const techString = Array.isArray(project.technologies)
              ? project.technologies.join(', ')
              : '';

            return (
              <div
                key={project.id || actualIndex}
                className={cn(
                  'p-5 rounded-2xl bg-black/50 border space-y-4 transition-all duration-200',
                  project.visible === false
                    ? 'border-white/5 opacity-60'
                    : 'border-white/10 hover:border-white/20'
                )}
              >
                {/* Card Top Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/8">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        'w-2.5 h-2.5 rounded-full inline-block',
                        project.visible !== false
                          ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                          : 'bg-neutral-600'
                      )}
                      title={project.visible !== false ? 'Visible on site' : 'Hidden from site'}
                    />
                    <span className="text-xs font-mono font-bold text-crimson">
                      PROJECT {project.number || `0${actualIndex + 1}`} • {project.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300">
                      {project.category} ({project.year})
                    </span>
                    {project.featured && (
                      <span className="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-crimson/20 text-crimson-light border border-crimson/30 font-bold">
                        <Star size={10} />
                        <span>FEATURED</span>
                      </span>
                    )}
                    {project.visible === false && (
                      <span className="flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-400">
                        <EyeOff size={10} />
                        <span>HIDDEN</span>
                      </span>
                    )}
                  </div>

                  {/* Move Up/Down, Duplicate, Delete, Collapse */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleMoveProject(actualIndex, 'up')}
                      disabled={actualIndex === 0}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
                      title="Move Up"
                      aria-label="Move project up"
                    >
                      <ArrowUp size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveProject(actualIndex, 'down')}
                      disabled={actualIndex === projects.length - 1}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
                      title="Move Down"
                      aria-label="Move project down"
                    >
                      <ArrowDown size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicateProject(actualIndex)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white cursor-pointer"
                      title="Duplicate Project"
                      aria-label="Duplicate project"
                    >
                      <Copy size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(actualIndex)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-400 cursor-pointer"
                      title="Delete Project"
                      aria-label="Delete project"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Primary Core Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <FormField label="Project Title">
                    <TextInput
                      value={project.title}
                      onChange={(e) =>
                        handleProjectFieldChange(actualIndex, 'title', e.target.value)
                      }
                      placeholder="e.g. SAATHI"
                    />
                  </FormField>
                  <FormField label="Subtitle">
                    <TextInput
                      value={project.subtitle}
                      onChange={(e) =>
                        handleProjectFieldChange(actualIndex, 'subtitle', e.target.value)
                      }
                      placeholder="e.g. Community & Service Marketplace"
                    />
                  </FormField>
                  <FormField label="Year">
                    <TextInput
                      value={project.year}
                      onChange={(e) =>
                        handleProjectFieldChange(actualIndex, 'year', e.target.value)
                      }
                      placeholder="2026"
                    />
                  </FormField>
                </div>

                {/* Category & Domain */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <FormField label="Category Badge / Header" description="Displayed on the project card badge">
                    <TextInput
                      value={project.category}
                      onChange={(e) =>
                        handleProjectFieldChange(actualIndex, 'category', e.target.value)
                      }
                      placeholder="FULL-STACK PLATFORM"
                    />
                  </FormField>
                  <FormField label="Filter Domain / Tag" description="Controls homepage domain filter pill">
                    <TextInput
                      value={project.domain || project.category}
                      onChange={(e) =>
                        handleProjectFieldChange(actualIndex, 'domain', e.target.value)
                      }
                      placeholder="Full-Stack"
                    />
                  </FormField>
                  <FormField label="Display Order" description="Numeric display sequence">
                    <TextInput
                      type="number"
                      value={project.order ?? actualIndex + 1}
                      onChange={(e) =>
                        handleProjectFieldChange(actualIndex, 'order', parseInt(e.target.value, 10) || 1)
                      }
                    />
                  </FormField>
                </div>

                {/* Descriptions */}
                <FormField
                  label="Short Description"
                  description="Primary description shown on the main homepage exhibition card"
                >
                  <TextArea
                    rows={2}
                    value={project.shortDescription || project.description || ''}
                    onChange={(e) =>
                      handleProjectFieldChange(actualIndex, 'shortDescription', e.target.value)
                    }
                    placeholder="Concise overview of project features and business domain..."
                  />
                </FormField>

                <FormField
                  label="Detailed Overview"
                  description="In-depth narrative shown in the Full Case Study modal"
                >
                  <TextArea
                    rows={3}
                    value={project.detailedOverview || project.overview || ''}
                    onChange={(e) =>
                      handleProjectFieldChange(actualIndex, 'detailedOverview', e.target.value)
                    }
                    placeholder="Architectural deep dive, problem breakdown, and engineering results..."
                  />
                </FormField>

                {/* Cover & Secondary Images */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <MediaPicker
                    label="Cover Image"
                    folder="projects"
                    value={project.coverImage || project.image || ''}
                    onChange={(val) => handleProjectFieldChange(actualIndex, 'coverImage', val)}
                    description="Primary project cover image"
                    placeholder="/images/projects/technexa.jpg"
                  />
                  <MediaPicker
                    label="Secondary Image (Optional)"
                    folder="projects"
                    value={project.secondaryImage || ''}
                    onChange={(val) =>
                      handleProjectFieldChange(actualIndex, 'secondaryImage', val)
                    }
                    description="Secondary preview screenshot or depth layer"
                    placeholder="/images/projects/urban-styles.jpg"
                  />
                </div>

                {/* External URLs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <FormField label="Live Demo URL">
                    <div className="relative">
                      <TextInput
                        value={project.liveDemoUrl || project.liveUrl || ''}
                        onChange={(e) =>
                          handleProjectFieldChange(actualIndex, 'liveDemoUrl', e.target.value)
                        }
                        placeholder="https://..."
                      />
                      {Boolean(project.liveDemoUrl || project.liveUrl) && (
                        <a
                          href={(project.liveDemoUrl || project.liveUrl) as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute right-3 top-2.5 text-neutral-400 hover:text-white"
                          title="Open Demo Link"
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </FormField>

                  <FormField label="GitHub Repository URL">
                    <div className="relative">
                      <TextInput
                        value={project.githubUrl || ''}
                        onChange={(e) =>
                          handleProjectFieldChange(actualIndex, 'githubUrl', e.target.value)
                        }
                        placeholder="https://github.com/..."
                      />
                      {Boolean(project.githubUrl) && (
                        <a
                          href={project.githubUrl as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute right-3 top-2.5 text-neutral-400 hover:text-white"
                          title="Open GitHub Link"
                        >
                          <Github size={14} />
                        </a>
                      )}
                    </div>
                  </FormField>
                </div>

                {/* Technologies */}
                <FormField
                  label="Technologies & Frameworks (Comma-separated)"
                  description="Used for core stack chips on card and comprehensive stack in case study"
                >
                  <TextInput
                    value={techString}
                    onChange={(e) =>
                      handleProjectFieldChange(actualIndex, 'technologies', e.target.value)
                    }
                    placeholder="Next.js, React, TypeScript, Node.js, MongoDB, Tailwind CSS"
                  />
                </FormField>

                {/* Switches: Featured & Visible */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <SwitchToggle
                    label="Featured Project"
                    checked={project.featured ?? true}
                    onChange={(val) => handleProjectFieldChange(actualIndex, 'featured', val)}
                    description="Highlight this project in exhibition showcases"
                  />
                  <SwitchToggle
                    label="Project Visible"
                    checked={project.visible ?? true}
                    onChange={(val) => handleProjectFieldChange(actualIndex, 'visible', val)}
                    description="Toggle public visibility on the homepage"
                  />
                </div>

                {/* Collapsible Advanced Case Study Section */}
                <div className="pt-2 border-t border-white/8">
                  <button
                    type="button"
                    onClick={() => toggleDetails(project.id)}
                    className="flex items-center justify-between w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] text-neutral-300 hover:text-white transition-colors text-xs font-mono uppercase tracking-wider cursor-pointer"
                  >
                    <span>Extended Case Study Details & Architecture</span>
                    {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>

                  {isExpanded && (
                    <div className="pt-4 space-y-4 animate-in fade-in duration-200">
                      <FormField
                        label="My Contribution & Impact"
                        description="Narrative on your personal contribution to the project"
                      >
                        <TextArea
                          rows={2}
                          value={project.contribution || ''}
                          onChange={(e) =>
                            handleProjectFieldChange(actualIndex, 'contribution', e.target.value)
                          }
                          placeholder="Architected the entire full-stack system from initial wireframing to database schemas..."
                        />
                      </FormField>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormField
                          label="Role & Responsibilities (1 per line)"
                          description="Bullet points in case study"
                        >
                          <TextArea
                            rows={3}
                            value={Array.isArray(project.role) ? project.role.join('\n') : ''}
                            onChange={(e) =>
                              handleProjectFieldChange(
                                actualIndex,
                                'role',
                                e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
                              )
                            }
                            placeholder="Full-Stack Architecture&#10;Database Modeling & Indexing&#10;Interactive UI/UX Design"
                          />
                        </FormField>

                        <FormField
                          label="Key Capabilities & Features (1 per line)"
                          description="Bullet points in case study"
                        >
                          <TextArea
                            rows={3}
                            value={Array.isArray(project.features) ? project.features.join('\n') : ''}
                            onChange={(e) =>
                              handleProjectFieldChange(
                                actualIndex,
                                'features',
                                e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
                              )
                            }
                            placeholder="Verified Provider Profiles&#10;Real-Time Notification dispatcher&#10;Sub-second page transitions"
                          />
                        </FormField>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormField
                          label="The Challenges (1 per line)"
                          description="Engineering challenges overcome"
                        >
                          <TextArea
                            rows={3}
                            value={
                              Array.isArray(project.challenges)
                                ? project.challenges.join('\n')
                                : ''
                            }
                            onChange={(e) =>
                              handleProjectFieldChange(
                                actualIndex,
                                'challenges',
                                e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
                              )
                            }
                            placeholder="Managing asynchronous multi-stage booking states..."
                          />
                        </FormField>

                        <FormField
                          label="Architectural Solutions (1 per line)"
                          description="Solutions engineered to solve challenges"
                        >
                          <TextArea
                            rows={3}
                            value={
                              Array.isArray(project.solution)
                                ? project.solution.join('\n')
                                : ''
                            }
                            onChange={(e) =>
                              handleProjectFieldChange(
                                actualIndex,
                                'solution',
                                e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
                              )
                            }
                            placeholder="Implemented optimistic UI updates with debounced search indexing..."
                          />
                        </FormField>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormField label="Accent Color Hex" description="Used for glowing highlights">
                          <TextInput
                            value={project.accentColor || '#D7192F'}
                            onChange={(e) =>
                              handleProjectFieldChange(actualIndex, 'accentColor', e.target.value)
                            }
                            placeholder="#D7192F"
                          />
                        </FormField>

                        <FormField
                          label="Gallery Screenshots (Comma-separated URLs)"
                          description="For expanded lightbox modal"
                        >
                          <TextInput
                            value={
                              Array.isArray(project.gallery)
                                ? project.gallery.join(', ')
                                : ''
                            }
                            onChange={(e) =>
                              handleProjectFieldChange(
                                actualIndex,
                                'gallery',
                                e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                              )
                            }
                            placeholder="/images/projects/technexa.jpg, /images/projects/urban-styles.jpg"
                          />
                        </FormField>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

