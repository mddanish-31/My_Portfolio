/**
 * Central Content Model & CMS Type Definitions
 * SAATHI / Portfolio CMS Foundation
 * MD. Danish Raza Portfolio
 */

import type { PortfolioData } from '@/data/portfolio';
import type { AboutSlide } from '@/data/about';
import type { SemesterRecord, AcademicHighlight } from '@/data/academics';
import type { SkillCategoryInfo, TechSkill } from '@/data/skills';
import type { ProjectItem } from '@/data/projects';
import type { ExperienceCategoryGroup, ExperienceItem } from '@/data/experience';
import type { EducationItem, EducationSectionData } from '@/data/education';
import type { AvailabilityData, OpportunityTrack } from '@/data/availability';
import type { ContactData, ContactCardItem } from '@/data/contact';
import type { FooterData } from '@/data/footer';
import type { NavLinkItem } from '@/data/navigation';

export type { OpportunityTrack, ContactCardItem, AcademicHighlight, SemesterRecord };

// =========================================================================
// 1. GLOBAL / SITE SETTINGS
// =========================================================================
export interface SiteSettings {
  siteTitle: string;
  siteName: string;
  tagline: string;
  description: string;
  keywords: string[];
  author: string;
  authorUrl: string;
  faviconUrl: string;
  ogImageUrl: string;
  twitterHandle: string;
  locale: string;
  themeColor: string;
  statusBadge: {
    text: string;
    available: boolean;
    dotPulse: boolean;
  };
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram?: string;
    email: string;
    whatsapp?: string;
  };
}

// =========================================================================
// 2. SECTION CONFIGURATION & ORDERING
// =========================================================================
export type SectionId =
  | 'home'
  | 'about'
  | 'academic'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'education'
  | 'availability'
  | 'contact'
  | 'footer';

export interface SectionSetting {
  id: SectionId;
  name: string;
  navLabel: string;
  order: number;
  enabled: boolean;
  inNavigation: boolean;
}

// =========================================================================
// 3. HERO SECTION CONTENT MODEL
// =========================================================================
export interface HeroMetadataBlock {
  label: string;
  items: string[];
  singleValue?: string;
}

export interface HeroContent {
  eyebrow: string;
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  subtitle: string;
  tagline: string;
  location: string;
  portraitUrl: string;
  posterText: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  metadata: {
    currently: HeroMetadataBlock;
    graduating: HeroMetadataBlock;
    focusedOn: {
      label: string;
      value: string;
    };
    openFor: HeroMetadataBlock;
  };
}

// =========================================================================
// 4. ABOUT SECTION CONTENT MODEL
// =========================================================================
export interface AboutSlideContent extends AboutSlide {
  order?: number;
  visible?: boolean;
}

export interface AboutContent {
  chapter: string;
  eyebrow: string;
  headline: string;
  subheading: string;
  slides: AboutSlideContent[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

// =========================================================================
// 5. ACADEMIC YEARBOOK CONTENT MODEL
// =========================================================================
export interface AcademicRecordContent extends SemesterRecord {
  order?: number;
  visible?: boolean;
}

export interface AcademicYearbookContent {
  chapter: string;
  eyebrow: string;
  heading: string[];
  subheading: string;
  institution: string;
  degree: string;
  records: AcademicRecordContent[];
}

// =========================================================================
// 6. SKILLS CONTENT MODEL
// =========================================================================
export interface TechSkillContent extends TechSkill {
  order?: number;
  visible?: boolean;
}

export interface SkillCategoryContent extends SkillCategoryInfo {
  order?: number;
  visible?: boolean;
}

export interface SkillsContent {
  chapter: string;
  eyebrow: string;
  heading: string[];
  subheading: string;
  categories: SkillCategoryContent[];
  skills: TechSkillContent[];
}

// =========================================================================
// 7. PROJECTS CONTENT MODEL
// =========================================================================
export interface ProjectContent extends ProjectItem {
  order?: number;
  visible?: boolean;
}

export interface ProjectsContent {
  chapter: string;
  eyebrow: string;
  heading: string[];
  subheading: string;
  projects: ProjectContent[];
}

// =========================================================================
// 8. EXPERIENCE CONTENT MODEL
// =========================================================================
export interface ExperienceContentItem extends ExperienceItem {
  order?: number;
  visible?: boolean;
}

export interface ExperienceCategoryGroupContent extends ExperienceCategoryGroup {
  order?: number;
  visible?: boolean;
  items: ExperienceContentItem[];
}

export interface ExperienceContent {
  chapter: string;
  eyebrow: string;
  heading: string[];
  subheading: string;
  groups: ExperienceCategoryGroupContent[];
  allExperiences: ExperienceContentItem[];
}

// =========================================================================
// 9. EDUCATION CONTENT MODEL
// =========================================================================
export interface EducationContentItem extends EducationItem {
  order?: number;
  visible?: boolean;
}

export interface EducationContent {
  chapter: string;
  eyebrow: string;
  heading: string[];
  subheading: string;
  items: EducationContentItem[];
  records: {
    undergraduate: EducationContentItem;
    higherSecondary: EducationContentItem;
    secondary: EducationContentItem;
  };
}

// =========================================================================
// 10. AVAILABILITY CONTENT MODEL
// =========================================================================
export interface AvailabilityContent extends AvailabilityData {
  visible?: boolean;
}

// =========================================================================
// 11. CONTACT CONTENT MODEL
// =========================================================================
export interface ContactContent extends ContactData {
  visible?: boolean;
}

// =========================================================================
// 12. FOOTER CONTENT MODEL
// =========================================================================
export interface FooterContent extends FooterData {
  visible?: boolean;
}

// =========================================================================
// 13. NAVIGATION CONTENT MODEL
// =========================================================================
export interface NavigationContentItem extends NavLinkItem {
  order: number;
  visible: boolean;
}

export interface NavigationContent {
  brandName: string;
  statusBadge: {
    text: string;
    href: string;
  };
  ctaButton: {
    text: string;
    href: string;
  };
  links: NavigationContentItem[];
}

// =========================================================================
// 14. COMPLETE UNIFIED PORTFOLIO CMS CONTENT AGGREGATE
// =========================================================================
export interface PortfolioCMSContent {
  settings: SiteSettings;
  sections: SectionSetting[];
  navigation: NavigationContent;
  hero: HeroContent;
  about: AboutContent;
  academic: AcademicYearbookContent;
  skills: SkillsContent;
  projects: ProjectsContent;
  experience: ExperienceContent;
  education: EducationContent;
  availability: AvailabilityContent;
  contact: ContactContent;
  footer: FooterContent;
  lastUpdated: string;
  version: string;
}

// =========================================================================
// 15. CMS RESPONSE & MUTATION TYPES
// =========================================================================
export interface CMSResponse<T> {
  success: boolean;
  data: T;
  source: 'database' | 'static-fallback';
  timestamp: string;
  error?: string;
}

export interface CMSUpdatePayload<T> {
  sectionId: SectionId | 'settings' | 'navigation';
  data: Partial<T>;
  isPublished?: boolean;
  updatedBy?: string;
}
