-- =========================================================================
-- MD. DANISH RAZA PORTFOLIO CMS — DATABASE MIGRATION (STEP 2C)
-- Production PostgreSQL Schema & Row Level Security (RLS)
-- =========================================================================

-- 1. Create Admin Users / Roles Table (For Explicit Admin Authorization)
CREATE TABLE IF NOT EXISTS public.admin_users (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'superadmin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on Admin Users Table
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 2. Security Definer Helpers: is_admin() and is_superadmin()
-- Evaluates strictly the calling session's user (auth.uid()) against public.admin_users.
-- Zero arguments prevent arbitrary user ID probing / enumeration.
-- Uses SECURITY DEFINER with fixed search_path to prevent recursion and privilege escalation.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
STABLE
AS $$
BEGIN
    IF auth.uid() IS NULL THEN
        RETURN FALSE;
    END IF;

    RETURN EXISTS (
        SELECT 1
        FROM public.admin_users
        WHERE user_id = auth.uid()
          AND role IN ('admin', 'superadmin')
    );
END;
$$;

CREATE OR REPLACE FUNCTION public.is_superadmin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
STABLE
AS $$
BEGIN
    IF auth.uid() IS NULL THEN
        RETURN FALSE;
    END IF;

    RETURN EXISTS (
        SELECT 1
        FROM public.admin_users
        WHERE user_id = auth.uid()
          AND role = 'superadmin'
    );
END;
$$;

-- 3. RLS Policies on admin_users Table
-- Policy: Only verified admins can view the admin user registry
DROP POLICY IF EXISTS "Admin Read Admin Users" ON public.admin_users;
CREATE POLICY "Admin Read Admin Users"
    ON public.admin_users
    FOR SELECT
    TO authenticated
    USING (
        public.is_admin()
    );

-- Policy: Only superadmins can insert/modify/delete admin users
-- Uses public.is_superadmin() helper to eliminate RLS recursion
DROP POLICY IF EXISTS "Superadmin Manage Admin Users" ON public.admin_users;
CREATE POLICY "Superadmin Manage Admin Users"
    ON public.admin_users
    FOR ALL
    TO authenticated
    USING (
        public.is_superadmin()
    )
    WITH CHECK (
        public.is_superadmin()
    );

-- Table Access Privileges for admin_users (RLS enforces row-level policies)
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.admin_users TO authenticated;
GRANT ALL ON TABLE public.admin_users TO service_role;

-- 4. Create Portfolio CMS Sections Table
CREATE TABLE IF NOT EXISTS public.portfolio_sections (
    section_id TEXT PRIMARY KEY,
    data JSONB NOT NULL,
    is_published BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_by TEXT DEFAULT 'admin'
);

-- Enable Row Level Security (RLS) on Portfolio Sections
ALTER TABLE public.portfolio_sections ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies on portfolio_sections Table

-- A. PUBLIC / ANONYMOUS READ:
-- Anonymous visitors and non-admin authenticated users can ONLY read published sections.
-- Verified admins can read all sections (including drafts / unpublished).
DROP POLICY IF EXISTS "Public Read Published Portfolio Sections" ON public.portfolio_sections;
CREATE POLICY "Public Read Published Portfolio Sections"
    ON public.portfolio_sections
    FOR SELECT
    TO public
    USING (
        is_published = true OR public.is_admin()
    );

-- B. ADMIN INSERT:
-- Only verified admin users can create new sections.
DROP POLICY IF EXISTS "Admin Insert Portfolio Sections" ON public.portfolio_sections;
CREATE POLICY "Admin Insert Portfolio Sections"
    ON public.portfolio_sections
    FOR INSERT
    TO authenticated
    WITH CHECK (
        public.is_admin()
    );

-- C. ADMIN UPDATE:
-- Only verified admin users can mutate existing sections.
DROP POLICY IF EXISTS "Admin Update Portfolio Sections" ON public.portfolio_sections;
CREATE POLICY "Admin Update Portfolio Sections"
    ON public.portfolio_sections
    FOR UPDATE
    TO authenticated
    USING (
        public.is_admin()
    )
    WITH CHECK (
        public.is_admin()
    );

-- D. ADMIN DELETE:
-- Only verified admin users can delete sections.
DROP POLICY IF EXISTS "Admin Delete Portfolio Sections" ON public.portfolio_sections;
CREATE POLICY "Admin Delete Portfolio Sections"
    ON public.portfolio_sections
    FOR DELETE
    TO authenticated
    USING (
        public.is_admin()
    );

-- 6. Table Access Privileges (DCL)
-- Grant table-level access to Postgres roles; RLS policies above enforce row-level authorization.
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.portfolio_sections TO authenticated;
GRANT SELECT ON TABLE public.portfolio_sections TO anon;
GRANT ALL ON TABLE public.portfolio_sections TO service_role;

-- 7. Trigger: Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_portfolio_sections_updated ON public.portfolio_sections;
CREATE TRIGGER on_portfolio_sections_updated
    BEFORE UPDATE ON public.portfolio_sections
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 7. Helper: Grant Admin Role (For Trusted Server/Bootstrap Setup)
CREATE OR REPLACE FUNCTION public.grant_admin_role(target_user_id UUID, assigned_role TEXT DEFAULT 'admin')
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
    -- Validate role strictly to prevent unauthorized escalation
    IF assigned_role NOT IN ('admin', 'superadmin') THEN
        RAISE EXCEPTION 'Invalid role specified: %. Must be ''admin'' or ''superadmin''.', assigned_role;
    END IF;

    INSERT INTO public.admin_users (user_id, role)
    VALUES (target_user_id, assigned_role)
    ON CONFLICT (user_id) DO UPDATE
    SET role = EXCLUDED.role;
END;
$$;

-- Secure execution privileges for grant_admin_role
-- Explicitly revoke execution from PUBLIC, anon, and authenticated to prevent privilege escalation.
REVOKE EXECUTE ON FUNCTION public.grant_admin_role(UUID, TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.grant_admin_role(UUID, TEXT) FROM anon;
REVOKE EXECUTE ON FUNCTION public.grant_admin_role(UUID, TEXT) FROM authenticated;

-- Allow execution only for privileged service_role (used by server admin client / SQL editor bootstrap)
GRANT EXECUTE ON FUNCTION public.grant_admin_role(UUID, TEXT) TO service_role;
