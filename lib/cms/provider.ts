/**
 * CMS Content Provider Architecture & Implementations
 * MD. DANISH RAZA Portfolio — CMS Architecture (Step 2C Corrected)
 *
 * Provides a unified provider interface with:
 * 1. SupabaseDatabaseProvider (Live PostgreSQL queries + Secure RLS persistence)
 * 2. StaticFallbackProvider (Zero-downtime compiled static records)
 */

import { defaultCMSContent } from './default-content';
import { isSupabaseServerConfigured, createServerSupabaseClient } from '@/lib/supabase/server';
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
  CMSResponse,
  CMSUpdatePayload,
} from './types';

export interface CMSContentProvider {
  name: string;
  isDatabaseConnected: boolean;
  getAllContent(): Promise<PortfolioCMSContent>;
  getSectionContent<T>(sectionId: SectionId | 'settings' | 'navigation'): Promise<T>;
  updateSectionContent<T>(payload: CMSUpdatePayload<T>): Promise<CMSResponse<T>>;
}

/**
 * Static Fallback Provider
 * Reads from compiled default static content and serves with zero latency.
 */
export class StaticFallbackProvider implements CMSContentProvider {
  name = 'static-fallback';
  isDatabaseConnected = false;

  async getAllContent(): Promise<PortfolioCMSContent> {
    return defaultCMSContent;
  }

  async getSectionContent<T>(sectionId: SectionId | 'settings' | 'navigation'): Promise<T> {
    const content = defaultCMSContent;

    switch (sectionId) {
      case 'settings':
        return content.settings as unknown as T;
      case 'navigation':
        return content.navigation as unknown as T;
      case 'home':
        return content.hero as unknown as T;
      case 'about':
        return content.about as unknown as T;
      case 'academic':
        return content.academic as unknown as T;
      case 'skills':
        return content.skills as unknown as T;
      case 'projects':
        return content.projects as unknown as T;
      case 'experience':
        return content.experience as unknown as T;
      case 'education':
        return content.education as unknown as T;
      case 'availability':
        return content.availability as unknown as T;
      case 'contact':
        return content.contact as unknown as T;
      case 'footer':
        return content.footer as unknown as T;
      default:
        throw new Error(`Unknown CMS Section ID: ${sectionId}`);
    }
  }

  async updateSectionContent<T>(payload: CMSUpdatePayload<T>): Promise<CMSResponse<T>> {
    const current = await this.getSectionContent<T>(payload.sectionId);
    let updated: T;

    if (Array.isArray(payload.data)) {
      updated = payload.data as unknown as T;
    } else if (typeof payload.data === 'object' && payload.data !== null && typeof current === 'object' && current !== null && !Array.isArray(current)) {
      updated = { ...current, ...payload.data };
    } else {
      updated = payload.data as unknown as T;
    }

    return {
      success: true,
      data: updated,
      source: 'static-fallback',
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Supabase Database Content Provider
 * Queries PostgreSQL `portfolio_sections` table for persistent CMS records.
 * Seamlessly falls back to `StaticFallbackProvider` if the database is unreachable,
 * offline, unconfigured, or if table records are not found.
 */
export class SupabaseDatabaseProvider implements CMSContentProvider {
  name = 'supabase-database';
  private fallbackProvider = new StaticFallbackProvider();

  get isDatabaseConnected(): boolean {
    return isSupabaseServerConfigured();
  }

  /**
   * Fetches the entire unified portfolio content from PostgreSQL.
   */
  async getAllContent(): Promise<PortfolioCMSContent> {
    if (!this.isDatabaseConnected) {
      return this.fallbackProvider.getAllContent();
    }

    try {
      const supabase = await createServerSupabaseClient();
      if (!supabase) {
        return this.fallbackProvider.getAllContent();
      }

      const { data, error } = await supabase
        .from('portfolio_sections')
        .select('section_id, data, is_published');

      if (error || !data || data.length === 0) {
        return this.fallbackProvider.getAllContent();
      }

      // Map rows by section_id (only published rows for public portfolio content)
      const map = new Map<string, unknown>();
      data.forEach((row) => {
        if (row && row.section_id && row.is_published !== false) {
          map.set(row.section_id, row.data);
        }
      });

      const fallback = await this.fallbackProvider.getAllContent();

      return {
        settings: (map.get('settings') as SiteSettings) || fallback.settings,
        sections: (map.get('sections') as SectionSetting[]) || fallback.sections,
        navigation: (map.get('navigation') as NavigationContent) || fallback.navigation,
        hero: (map.get('home') as HeroContent) || fallback.hero,
        about: (map.get('about') as AboutContent) || fallback.about,
        academic: (map.get('academic') as AcademicYearbookContent) || fallback.academic,
        skills: (map.get('skills') as SkillsContent) || fallback.skills,
        projects: (map.get('projects') as ProjectsContent) || fallback.projects,
        experience: (map.get('experience') as ExperienceContent) || fallback.experience,
        education: (map.get('education') as EducationContent) || fallback.education,
        availability: (map.get('availability') as AvailabilityContent) || fallback.availability,
        contact: (map.get('contact') as ContactContent) || fallback.contact,
        footer: (map.get('footer') as FooterContent) || fallback.footer,
        lastUpdated: new Date().toISOString(),
        version: fallback.version,
      };
    } catch {
      return this.fallbackProvider.getAllContent();
    }
  }

  /**
   * Fetches specific section content by ID from PostgreSQL.
   */
  async getSectionContent<T>(sectionId: SectionId | 'settings' | 'navigation'): Promise<T> {
    if (!this.isDatabaseConnected) {
      return this.fallbackProvider.getSectionContent<T>(sectionId);
    }

    try {
      const supabase = await createServerSupabaseClient();
      if (!supabase) {
        return this.fallbackProvider.getSectionContent<T>(sectionId);
      }

      const { data, error } = await supabase
        .from('portfolio_sections')
        .select('data, is_published')
        .eq('section_id', sectionId)
        .single();

      if (error || !data || !data.data) {
        return this.fallbackProvider.getSectionContent<T>(sectionId);
      }

      return data.data as T;
    } catch {
      return this.fallbackProvider.getSectionContent<T>(sectionId);
    }
  }

  /**
   * Persists section content mutations into Supabase PostgreSQL.
   */
  async updateSectionContent<T>(payload: CMSUpdatePayload<T>): Promise<CMSResponse<T>> {
    if (!this.isDatabaseConnected) {
      return this.fallbackProvider.updateSectionContent<T>(payload);
    }

    try {
      const current = await this.getSectionContent<T>(payload.sectionId);
      let updated: T;

      if (Array.isArray(payload.data)) {
        updated = payload.data as unknown as T;
      } else if (typeof payload.data === 'object' && payload.data !== null && typeof current === 'object' && current !== null && !Array.isArray(current)) {
        updated = { ...current, ...payload.data };
      } else {
        updated = payload.data as unknown as T;
      }

      const supabase = await createServerSupabaseClient();
      if (!supabase) {
        throw new Error('Supabase client unavailable');
      }

      const { error } = await supabase
        .from('portfolio_sections')
        .upsert(
          {
            section_id: payload.sectionId,
            data: updated,
            is_published: payload.isPublished !== undefined ? payload.isPublished : true,
            updated_by: payload.updatedBy || 'admin',
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'section_id' }
        );

      if (error) {
        throw new Error(error.message);
      }

      return {
        success: true,
        data: updated,
        source: 'database',
        timestamp: new Date().toISOString(),
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Database operation failed';
      return {
        success: false,
        data: payload.data as unknown as T,
        source: 'database',
        timestamp: new Date().toISOString(),
        error: errorMessage,
      };
    }
  }
}

// Active provider instance (defaults to SupabaseDatabaseProvider with seamless static fallback)
let activeProvider: CMSContentProvider = new SupabaseDatabaseProvider();

/**
 * Gets the active CMS Content Provider
 */
export function getContentProvider(): CMSContentProvider {
  return activeProvider;
}

/**
 * Allows switching the content provider explicitly
 */
export function setContentProvider(provider: CMSContentProvider): void {
  activeProvider = provider;
}
