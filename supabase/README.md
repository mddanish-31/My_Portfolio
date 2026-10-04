# Supabase Portfolio CMS Schema & Migrations (Step 2C Security Corrected)

This directory contains the production-ready PostgreSQL database schema, Row Level Security (RLS) policies, and initial data seed for the MD. Danish Raza Portfolio CMS.

## Directory Structure

```
supabase/
├── migrations/
│   └── 20261004130000_create_portfolio_cms.sql  # DDL, RLS policies, helper functions & triggers
├── seed.sql                                     # Complete initial dataset (all 13 sections)
├── schema.sql                                   # Consolidated migration + seed for single-click execution
└── README.md                                    # Documentation & setup instructions
```

## Security & Access Control Architecture

| Role | Entity | Permitted Operations | Conditions |
| :--- | :--- | :--- | :--- |
| **Anonymous / Public** | `public.portfolio_sections` | `SELECT` (Read-only) | Only rows where `is_published = true` |
| **Anonymous / Public** | `public.portfolio_sections` | `INSERT`, `UPDATE`, `DELETE` | ❌ **DENIED** |
| **Anonymous / Public** | `public.admin_users` | `SELECT`, `INSERT`, `UPDATE`, `DELETE` | ❌ **DENIED** |
| **Authenticated (Non-Admin)** | `public.portfolio_sections` | `SELECT` | Only rows where `is_published = true` |
| **Authenticated (Non-Admin)** | `public.portfolio_sections` | `INSERT`, `UPDATE`, `DELETE` | ❌ **DENIED** |
| **Authorized Admin** | `public.portfolio_sections` | `SELECT` | ✅ **ALLOWED** (both published & draft rows) |
| **Authorized Admin** | `public.portfolio_sections` | `INSERT`, `UPDATE`, `DELETE` | ✅ **ALLOWED** (validated via `is_admin()`) |
| **Authorized Admin** | `public.admin_users` | `SELECT` | ✅ **ALLOWED** |
| **Superadmin** | `public.admin_users` | `INSERT`, `UPDATE`, `DELETE` | ✅ **ALLOWED** |

## How to Apply Schema to Your Supabase Project

> [!NOTE]
> Do NOT apply SQL until you are ready. When ready:

1. Open your [Supabase Dashboard](https://app.supabase.com) and select your project.
2. In the left navigation, click on **SQL Editor**.
3. Open [`supabase/schema.sql`](./schema.sql), copy its entire contents, and paste it into the editor.
4. Click **Run**.

## Step 2D Admin Bootstrap (Preview)

When you sign up / log in with Supabase Auth in Step 2D:
To designate your account as the authorized administrator, run:

```sql
-- Replace with your Supabase Auth User UUID (found under Authentication -> Users in Supabase Dashboard)
SELECT public.grant_admin_role('YOUR-AUTH-USER-UUID-HERE', 'superadmin');
```

Or call the server-side bootstrap function using `SUPABASE_SECRET_KEY`.
