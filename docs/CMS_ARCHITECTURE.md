# SAATHI / Portfolio CMS Architecture Specification

> **Project**: MD. Danish Raza Portfolio  
> **Status**: Step 1 Implemented (Foundation & Central Content Model)  
> **Framework**: Next.js 15 (App Router) + TypeScript + Tailwind CSS

---

## 1. Current Architecture Audit

Prior to the CMS Foundation, each section of the portfolio directly imported separate static TypeScript data files from `@/data/*`:

| Component | Path | Data Source | Notes |
| :--- | :--- | :--- | :--- |
| **Navbar** | `components/layout/Navbar.tsx` | `@/data/navigation`, `@/data/portfolio` | Hardcoded links & status pill |
| **Hero** | `components/sections/Hero.tsx` | `@/data/portfolio` | Personal info, roles, metadata |
| **About** | `components/sections/About.tsx` | `@/data/about`, `@/data/portfolio` | 6 narrative slides & quotes |
| **Yearbook** | `components/sections/AcademicYearbook.tsx` | `@/data/academics` | Semester records, subjects, grades |
| **Skills** | `components/sections/Skills.tsx` | `@/data/skills` | Categories & detailed skill cards |
| **Projects** | `components/sections/Projects.tsx` | `@/data/projects` | Case studies, galleries, metrics |
| **Experience** | `components/sections/Experience.tsx` | `@/data/experience` | Professional, leadership, hackathons |
| **Education** | `components/sections/Education.tsx` | `@/data/education` | Academic milestones & cards |
| **Availability** | `components/sections/Availability.tsx` | `@/data/availability` | Internship status, tracks, CTAs |
| **Contact** | `components/sections/Contact.tsx` | `@/data/contact` | Reach out cards & social handles |
| **Footer** | `components/sections/Footer.tsx` | `@/data/footer`, `@/data/portfolio` | CTAs, copyright, navigation |
| **Metadata** | `app/layout.tsx` | Static inline config | SEO, OpenGraph, Favicon, Title |

---

## 2. Proposed CMS Architecture (Step 1 Implemented)

We have introduced a 3-tier Data Access Layer (DAL) that isolates the UI components from the underlying storage mechanism:

```
┌─────────────────────────────────────────────────────────────┐
│                 PUBLIC UI & ADMIN PORTAL                    │
│      (Hero, About, Projects, Skills, Contact, /admin)       │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│            CENTRALIZED DATA ACCESS LAYER (DAL)              │
│                  (@/lib/cms/data-access.ts)                 │
│   getCMSContent(), getHeroContent(), getProjectsContent()...│
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 CMS CONTENT PROVIDER LAYER                  │
│                     (@/lib/cms/provider.ts)                 │
│         CMSContentProvider Interface & Provider Switch      │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼                              ▼
┌──────────────────────────────┐ ┌────────────────────────────┐
│   DATABASE PROVIDER (FUTURE) │ │  STATIC FALLBACK PROVIDER  │
│  (Supabase / Prisma / Mongo) │ │  (@/lib/cms/default-content│
│   Connected in Step 2 / 3    │ │   Zero-downtime compiled)  │
└──────────────────────────────┘ └────────────────────────────┘
```

---

## 3. Central Content Entities

The entire portfolio is unified under the `PortfolioCMSContent` interface in `lib/cms/types.ts`:

1. **`SiteSettings`**: Site title, description, SEO meta, OG image, social links, theme color, availability indicator.
2. **`SectionSetting[]`**: Enable/disable flags, custom navigation labels, section display ordering.
3. **`NavigationContent`**: Brand label, status badge, action CTA button, navigation anchor links.
4. **`HeroContent`**: Eyebrow, name, roles, location, bio tagline, CTAs, portrait URL, status metrics.
5. **`AboutContent`**: Chapter metadata, headline, narrative slide cards, quote blocks.
6. **`AcademicYearbookContent`**: Semester archives, GPA metrics, course subjects, academic highlights.
7. **`SkillsContent`**: 6 domain categories, individual tech skills with proficiency levels & tags.
8. **`ProjectsContent`**: Featured case studies, roles, challenges, solutions, metrics, gallery screenshots.
9. **`ExperienceContent`**: Work history, leadership roles, competition sprints, contributions.
10. **`EducationContent`**: Secondary, Higher Secondary, and Undergraduate milestone cards.
11. **`AvailabilityContent`**: Internship status pill, 4 opportunity tracks, direct connectivity CTAs.
12. **`ContactContent`**: Conversation topics, 6 liquid-glass contact channels, banners.
13. **`FooterContent`**: Closing editorial statement, brand summary, social handles, legal/copyright.

---

## 4. Database Architecture & Recommendation

### Recommended Options:
1. **Option A: PostgreSQL via Supabase (Recommended)**:
   - Built-in PostgreSQL with Row-Level Security (RLS).
   - Built-in Authentication (email/password or GitHub OAuth).
   - Built-in Storage bucket for image uploads.
   - Generates TypeScript types automatically.
2. **Option B: SQLite / PostgreSQL via Prisma ORM**:
   - Zero external dependency for local development (SQLite).
   - Strict TypeScript safety with Prisma Client.
3. **Option C: MongoDB Atlas**:
   - Matches document structure of `PortfolioCMSContent` directly as JSON documents.

### Isolation Principle:
All database calls are quarantined within `CMSContentProvider` implementations (`lib/cms/provider.ts`). Neither the UI components nor the public API routes directly interact with database drivers.

---

## 5. Media Storage Architecture

Managed via `lib/cms/media.ts`:
- **Current (Step 1)**: Serves verified local static assets in `/images/*` and `/icon.svg`.
- **Future (Step 2/3)**: `resolveMediaUrl()` automatically handles external CDN URLs (Supabase Storage, Cloudinary, Uploadthing, AWS S3) with fallbacks.

---

## 6. Authentication Requirements (for Step 2)

The future `/admin` management portal requires secure administrative authentication:
- **Approach**: NextAuth.js (Auth.js) or Supabase Auth.
- **Admin Access Rule**: Restricted to verified email (e.g., `mddanish31.dev@gmail.com`) or single admin password hash (`ADMIN_PASSWORD_HASH`).
- **Protected Routes**: `/admin`, `/api/cms/*`.

---

## 7. What Must Be Configured Manually Later (Step 2 / Step 3)

When ready to connect live persistence, you will only need to supply:
1. **Database URL** (`DATABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`).
2. **Admin Auth Secret** (`AUTH_SECRET` or `ADMIN_PASSWORD`).
3. **Storage Bucket** (if using cloud upload instead of local `/public`).

*(No fake environment variables or speculative configurations have been created in Step 1).*

---

## 8. Migration Safety & Anti-Regression

- **Zero UI Regression**: All existing 10 public sections remain identical in rendering, styling, animations, and typography.
- **Preserved Seed Data**: All existing records in `data/*.ts` remain fully intact and serve as the initial database seeding script.
- **TypeScript Integrity**: Fully strict type coverage without `any`.
