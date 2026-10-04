/**
 * Centralized Data Access Layer (DAL)
 * Public API for consuming CMS content across Server & Client components.
 */

import { getContentProvider } from './provider';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { defaultCMSContent } from './default-content';
import type {
  PortfolioCMSContent,
  SiteSettings,
  SectionSetting,
  NavigationContent,
  HeroContent,
  AboutContent,
  AcademicYearbookContent,
  SkillsContent,
  ProjectsContent,
  ExperienceContent,
  EducationContent,
  AvailabilityContent,
  ContactContent,
  FooterContent,
  SectionId,
  CMSUpdatePayload,
  CMSResponse,
} from './types';

/**
 * Fetch the entire unified portfolio content
 */
export async function getCMSContent(): Promise<PortfolioCMSContent> {
  const provider = getContentProvider();
  return provider.getAllContent();
}

/**
 * Fetch global site settings (SEO, author, social links, theme)
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const provider = getContentProvider();
  return provider.getSectionContent<SiteSettings>('settings');
}

/**
 * Fetch section enabled/disabled flags and ordering
 */
export async function getSectionSettings(): Promise<SectionSetting[]> {
  const content = await getCMSContent();
  return content.sections;
}

/**
 * Fetch header & navigation links
 */
export async function getNavigationContent(): Promise<NavigationContent> {
  const provider = getContentProvider();
  return provider.getSectionContent<NavigationContent>('navigation');
}

/**
 * Fetch Hero section content
 */
export async function getHeroContent(): Promise<HeroContent> {
  const provider = getContentProvider();
  return provider.getSectionContent<HeroContent>('home');
}

/**
 * Fetch About section content
 */
export async function getAboutContent(): Promise<AboutContent> {
  const provider = getContentProvider();
  return provider.getSectionContent<AboutContent>('about');
}

/**
 * Fetch Academic Yearbook section content
 */
export async function getAcademicContent(): Promise<AcademicYearbookContent> {
  const provider = getContentProvider();
  return provider.getSectionContent<AcademicYearbookContent>('academic');
}

/**
 * Fetch Skills & Tech Stack section content
 */
export async function getSkillsContent(): Promise<SkillsContent> {
  const provider = getContentProvider();
  return provider.getSectionContent<SkillsContent>('skills');
}

/**
 * Fetch Projects showcase section content
 */
export async function getProjectsContent(): Promise<ProjectsContent> {
  const provider = getContentProvider();
  return provider.getSectionContent<ProjectsContent>('projects');
}

/**
 * Fetch Experience & Leadership section content
 */
export async function getExperienceContent(): Promise<ExperienceContent> {
  const provider = getContentProvider();
  return provider.getSectionContent<ExperienceContent>('experience');
}

/**
 * Fetch Education background section content
 */
export async function getEducationContent(): Promise<EducationContent> {
  const provider = getContentProvider();
  return provider.getSectionContent<EducationContent>('education');
}

/**
 * Fetch Internship Availability section content
 */
export async function getAvailabilityContent(): Promise<AvailabilityContent> {
  const provider = getContentProvider();
  return provider.getSectionContent<AvailabilityContent>('availability');
}

/**
 * Fetch Contact section content
 */
export async function getContactContent(): Promise<ContactContent> {
  const provider = getContentProvider();
  return provider.getSectionContent<ContactContent>('contact');
}

/**
 * Fetch Footer & closing CTA content
 */
export async function getFooterContent(): Promise<FooterContent> {
  const provider = getContentProvider();
  return provider.getSectionContent<FooterContent>('footer');
}

/**
 * Generic section content getter by SectionId
 */
export async function getSectionContent<T>(sectionId: SectionId | 'settings' | 'navigation'): Promise<T> {
  const provider = getContentProvider();
  return provider.getSectionContent<T>(sectionId);
}

/**
 * Generic section content updater by SectionId
 */
export async function updateSectionContent<T>(payload: CMSUpdatePayload<T>): Promise<CMSResponse<T>> {
  const provider = getContentProvider();
  return provider.updateSectionContent<T>(payload);
}

// =========================================================================
// ADMIN CMS OVERVIEW HELPERS (STEP 2D)
// =========================================================================

export interface CMSSectionOverviewItem {
  sectionId: string;
  name: string;
  description: string;
  category: 'System & Global' | 'Navigation' | 'Portfolio Content';
  isPublished: boolean;
  updatedAt: string;
  updatedBy: string;
  data: unknown;
}

const SECTION_CATALOG: Array<{
  sectionId: string;
  name: string;
  description: string;
  category: 'System & Global' | 'Navigation' | 'Portfolio Content';
  getDefaultData: () => unknown;
}> = [
  {
    sectionId: 'settings',
    name: 'Global Site Settings & SEO',
    description: 'Site title, meta description, author details, social channels, and theme colors.',
    category: 'System & Global',
    getDefaultData: () => defaultCMSContent.settings,
  },
  {
    sectionId: 'sections',
    name: 'Section Ordering & Visibility',
    description: 'Section enablement switches and custom navigation ordering.',
    category: 'System & Global',
    getDefaultData: () => defaultCMSContent.sections,
  },
  {
    sectionId: 'navigation',
    name: 'Header & Navigation Bar',
    description: 'Brand identity, top status badge, quick CTA button, and anchor links.',
    category: 'Navigation',
    getDefaultData: () => defaultCMSContent.navigation,
  },
  {
    sectionId: 'home',
    name: 'Hero Section',
    description: 'Editorial greeting, personal titles, bio tagline, portrait image, and CTA links.',
    category: 'Portfolio Content',
    getDefaultData: () => defaultCMSContent.hero,
  },
  {
    sectionId: 'about',
    name: 'About Narrative & Slides',
    description: '6 narrative journey chapters, editorial headings, and philosophy quotes.',
    category: 'Portfolio Content',
    getDefaultData: () => defaultCMSContent.about,
  },
  {
    sectionId: 'academic',
    name: 'Academic Yearbook',
    description: 'Semester timeline archives, GPA performance, subjects, and milestones.',
    category: 'Portfolio Content',
    getDefaultData: () => defaultCMSContent.academic,
  },
  {
    sectionId: 'skills',
    name: 'Skills & Tech Stack',
    description: '6 technical domains with detailed proficiency tags and skills matrix.',
    category: 'Portfolio Content',
    getDefaultData: () => defaultCMSContent.skills,
  },
  {
    sectionId: 'projects',
    name: 'Projects Showcase',
    description: 'Featured project case studies, live links, galleries, and impact metrics.',
    category: 'Portfolio Content',
    getDefaultData: () => defaultCMSContent.projects,
  },
  {
    sectionId: 'experience',
    name: 'Experience & Leadership',
    description: 'Professional internships, student leadership, and hackathon sprints.',
    category: 'Portfolio Content',
    getDefaultData: () => defaultCMSContent.experience,
  },
  {
    sectionId: 'education',
    name: 'Education Background',
    description: 'Secondary, Higher Secondary, and Undergraduate academic records.',
    category: 'Portfolio Content',
    getDefaultData: () => defaultCMSContent.education,
  },
  {
    sectionId: 'availability',
    name: 'Opportunity Availability',
    description: 'Internship availability status, 4 focus tracks, and direct CTAs.',
    category: 'Portfolio Content',
    getDefaultData: () => defaultCMSContent.availability,
  },
  {
    sectionId: 'contact',
    name: 'Contact & Inquiries',
    description: 'Direct communication channels, liquid-glass cards, and inquiries.',
    category: 'Portfolio Content',
    getDefaultData: () => defaultCMSContent.contact,
  },
  {
    sectionId: 'footer',
    name: 'Footer & Closing CTA',
    description: 'Closing editorial statement, copyright, and bottom navigation.',
    category: 'Portfolio Content',
    getDefaultData: () => defaultCMSContent.footer,
  },
];

/**
 * Fetches overview metadata for all 13 CMS sections (used by Admin Dashboard and Content Inspector)
 */
export async function getAdminSectionsOverview(): Promise<CMSSectionOverviewItem[]> {
  const fallbackTimestamp = new Date().toISOString();

  try {
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { data, error } = await supabase
        .from('portfolio_sections')
        .select('section_id, data, is_published, updated_at, updated_by');

      if (!error && data && data.length > 0) {
        const rowMap = new Map<string, { data: unknown; is_published: boolean; updated_at: string; updated_by: string }>();
        data.forEach((row) => {
          rowMap.set(row.section_id, {
            data: row.data,
            is_published: row.is_published ?? true,
            updated_at: row.updated_at || fallbackTimestamp,
            updated_by: row.updated_by || 'admin',
          });
        });

        return SECTION_CATALOG.map((cat) => {
          const dbRow = rowMap.get(cat.sectionId);
          return {
            sectionId: cat.sectionId,
            name: cat.name,
            description: cat.description,
            category: cat.category,
            isPublished: dbRow ? dbRow.is_published : true,
            updatedAt: dbRow ? dbRow.updated_at : fallbackTimestamp,
            updatedBy: dbRow ? dbRow.updated_by : 'system-seed',
            data: dbRow ? dbRow.data : cat.getDefaultData(),
          };
        });
      }
    }
  } catch {
    // Fall through to compiled default content
  }

  return SECTION_CATALOG.map((cat) => ({
    sectionId: cat.sectionId,
    name: cat.name,
    description: cat.description,
    category: cat.category,
    isPublished: true,
    updatedAt: fallbackTimestamp,
    updatedBy: 'system-seed',
    data: cat.getDefaultData(),
  }));
}
