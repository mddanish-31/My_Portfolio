/**
 * Default Seed & Static Fallback Content Provider
 * Maps all existing strongly-typed data records into the unified PortfolioCMSContent schema.
 */

import { portfolioData } from '@/data/portfolio';
import { aboutSlides } from '@/data/about';
import { academicRecords } from '@/data/academics';
import { allSkillsData, skillCategoriesData } from '@/data/skills';
import { projectsData } from '@/data/projects';
import { experienceGroups, allExperiences } from '@/data/experience';
import { educationData, educationRecords, educationList } from '@/data/education';
import { availabilityData } from '@/data/availability';
import { contactData } from '@/data/contact';
import { footerData } from '@/data/footer';
import { navLinks } from '@/data/navigation';
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
} from './types';

export const defaultSiteSettings: SiteSettings = {
  siteTitle: 'MD. DANISH RAZA — Full-Stack Developer',
  siteName: 'MD. DANISH RAZA Portfolio',
  tagline: 'Building digital experiences that look sharp and work beautifully.',
  description:
    'Full-Stack Developer specializing in high-performance web applications, responsive user interfaces, and robust digital products.',
  keywords: [
    'Md Danish Raza',
    'Full-Stack Developer',
    'Frontend Developer',
    'Next.js',
    'React',
    'TypeScript',
    'UI/UX Designer',
    'Portfolio',
    'AI/ML',
  ],
  author: 'Md. Danish Raza',
  authorUrl: 'https://mddanish.dev',
  faviconUrl: '/icon.svg',
  ogImageUrl: '/images/portrait/danish-portrait-2x.png',
  twitterHandle: '@mddanish_dev',
  locale: 'en_US',
  themeColor: '#050505',
  statusBadge: {
    text: 'AVAILABLE FOR WORK',
    available: true,
    dotPulse: true,
  },
  socialLinks: {
    github: portfolioData.personal.social.github,
    linkedin: portfolioData.personal.social.linkedin,
    twitter: portfolioData.personal.social.twitter,
    instagram: portfolioData.personal.social.instagram,
    email: portfolioData.personal.email,
    whatsapp: 'https://wa.me/919876543210',
  },
};

export const defaultSectionSettings: SectionSetting[] = [
  { id: 'home', name: 'Home / Hero', navLabel: 'Home', order: 1, enabled: true, inNavigation: true },
  { id: 'about', name: 'About Me', navLabel: 'About', order: 2, enabled: true, inNavigation: true },
  { id: 'academic', name: 'Academic Yearbook', navLabel: 'Yearbook', order: 3, enabled: true, inNavigation: true },
  { id: 'skills', name: 'Skills & Tech Stack', navLabel: 'Skills', order: 4, enabled: true, inNavigation: true },
  { id: 'projects', name: 'Projects Showcase', navLabel: 'Work', order: 5, enabled: true, inNavigation: true },
  { id: 'experience', name: 'Experience & Leadership', navLabel: 'Experience', order: 6, enabled: true, inNavigation: true },
  { id: 'education', name: 'Academic Background', navLabel: 'Education', order: 7, enabled: true, inNavigation: true },
  { id: 'availability', name: 'Internship Availability', navLabel: 'Availability', order: 8, enabled: true, inNavigation: true },
  { id: 'contact', name: "Let's Connect", navLabel: 'Contact', order: 9, enabled: true, inNavigation: true },
  { id: 'footer', name: 'Footer & Closing CTA', navLabel: 'Footer', order: 10, enabled: true, inNavigation: false },
];

export const defaultNavigation: NavigationContent = {
  brandName: 'MD. DANISH RAZA',
  statusBadge: {
    text: 'AVAILABLE FOR WORK',
    href: '#contact',
  },
  ctaButton: {
    text: "LET'S TALK",
    href: '#contact',
  },
  links: navLinks.map((item, index) => ({
    ...item,
    order: index + 1,
    visible: true,
  })),
};

export const defaultHeroContent: HeroContent = {
  eyebrow: "Hello, I'm",
  firstName: portfolioData.personal.firstName,
  lastName: portfolioData.personal.lastName,
  fullName: portfolioData.personal.fullName,
  role: portfolioData.personal.title,
  subtitle: portfolioData.personal.subtitle,
  tagline: portfolioData.personal.tagline,
  location: portfolioData.personal.location,
  portraitUrl: '/images/portrait/danish-portrait-2x.png',
  posterText: 'PORTFOLIO',
  primaryCta: {
    label: 'View My Work',
    href: '#projects',
  },
  secondaryCta: {
    label: "Let's Talk",
    href: '#contact',
  },
  metadata: {
    currently: portfolioData.metadata.currently,
    graduating: portfolioData.metadata.graduating,
    focusedOn: portfolioData.metadata.focusedOn,
    openFor: portfolioData.metadata.openFor,
  },
};

export const defaultAboutContent: AboutContent = {
  chapter: 'CHAPTER 01',
  eyebrow: 'PROFILE & PURPOSE',
  headline: 'WHO I AM & WHAT DRIVES ME',
  subheading: 'A curated summary of my background, focus, creative curiosity, and software engineering philosophy.',
  slides: aboutSlides.map((slide, idx) => ({
    ...slide,
    order: idx + 1,
    visible: true,
  })),
  quote: portfolioData.quote,
};

export const defaultAcademicContent: AcademicYearbookContent = {
  chapter: 'CHAPTER 02',
  eyebrow: 'ACADEMIC YEARBOOK',
  heading: ['SEMESTER', 'ARCHIVE', 'CHRONICLE.'],
  subheading: 'A comprehensive semester-by-semester academic record documenting coursework, performance, and key milestones.',
  institution: 'ADAMAS UNIVERSITY',
  degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
  records: academicRecords.map((record, idx) => ({
    ...record,
    order: idx + 1,
    visible: true,
  })),
};

export const defaultSkillsContent: SkillsContent = {
  chapter: 'CHAPTER 03',
  eyebrow: 'TECHNICAL DNA',
  heading: ['TECH STACK', '& CORE', 'COMPETENCIES.'],
  subheading: 'A comprehensive matrix of programming languages, full-stack frameworks, databases, and developer tooling.',
  categories: skillCategoriesData.map((cat, idx) => ({
    ...cat,
    order: idx + 1,
    visible: true,
  })),
  skills: allSkillsData.map((skill, idx) => ({
    ...skill,
    order: idx + 1,
    visible: true,
  })),
};

export const defaultProjectsContent: ProjectsContent = {
  chapter: 'CHAPTER 04',
  eyebrow: 'FEATURED WORK',
  heading: ['ENGINEERED', 'PRODUCTS', '& SYSTEMS.'],
  subheading: 'Explore curated case studies spanning full-stack platforms, AI/ML integrations, and digital products.',
  projects: projectsData.map((project, idx) => ({
    ...project,
    order: idx + 1,
    visible: true,
  })),
};

export const defaultExperienceContent: ExperienceContent = {
  chapter: 'CHAPTER 05',
  eyebrow: 'EXPERIENCE & LEADERSHIP',
  heading: ['EXPERIENCE', '& MILESTONES.'],
  subheading: 'Real-world experience, engineering roles, leadership, collaborative community building, and hackathon milestones.',
  groups: experienceGroups.map((group, idx) => ({
    ...group,
    order: idx + 1,
    visible: true,
    items: group.items.map((item, itemIdx) => ({
      ...item,
      order: itemIdx + 1,
      visible: true,
    })),
  })),
  allExperiences: allExperiences.map((item, idx) => ({
    ...item,
    order: idx + 1,
    visible: true,
  })),
};

export const defaultEducationContent: EducationContent = {
  chapter: 'CHAPTER 06',
  eyebrow: 'ACADEMIC BACKGROUND',
  heading: ['EDUCATION', '& MILESTONES.'],
  subheading: 'Consistent academic growth with a strong foundation in computer science, mathematics, and technology.',
  items: educationList.map((item, idx) => ({
    ...item,
    order: idx + 1,
    visible: true,
  })),
  records: {
    undergraduate: { ...educationRecords.undergraduate, order: 3, visible: true },
    higherSecondary: { ...educationRecords.higherSecondary, order: 2, visible: true },
    secondary: { ...educationRecords.secondary, order: 1, visible: true },
  },
};

export const defaultAvailabilityContent: AvailabilityContent = {
  ...availabilityData,
  visible: true,
};

export const defaultContactContent: ContactContent = {
  ...contactData,
  visible: true,
};

export const defaultFooterContent: FooterContent = {
  ...footerData,
  visible: true,
};

export const defaultCMSContent: PortfolioCMSContent = {
  settings: defaultSiteSettings,
  sections: defaultSectionSettings,
  navigation: defaultNavigation,
  hero: defaultHeroContent,
  about: defaultAboutContent,
  academic: defaultAcademicContent,
  skills: defaultSkillsContent,
  projects: defaultProjectsContent,
  experience: defaultExperienceContent,
  education: defaultEducationContent,
  availability: defaultAvailabilityContent,
  contact: defaultContactContent,
  footer: defaultFooterContent,
  lastUpdated: new Date().toISOString(),
  version: '1.0.0',
};
