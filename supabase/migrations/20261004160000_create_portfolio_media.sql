-- =========================================================================
-- MD. DANISH RAZA PORTFOLIO CMS — STORAGE & MEDIA ASSETS MIGRATION (STEP 2F)
-- Production Supabase Storage Bucket, Policies, and Media Metadata Table
-- =========================================================================

-- 1. Create Supabase Storage Bucket for Portfolio Media
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'portfolio-media',
    'portfolio-media',
    true,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
)
ON CONFLICT (id) DO UPDATE
SET public = true,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

-- 2. Storage RLS Policies for portfolio-media Bucket
-- A. Public Read Policy: Anyone (public / anon) can view/download media in portfolio-media
DROP POLICY IF EXISTS "Public Read Portfolio Media" ON storage.objects;
CREATE POLICY "Public Read Portfolio Media"
    ON storage.objects
    FOR SELECT
    TO public
    USING (bucket_id = 'portfolio-media');

-- B. Admin Upload Policy: Only verified admins can upload media
DROP POLICY IF EXISTS "Admin Upload Portfolio Media" ON storage.objects;
CREATE POLICY "Admin Upload Portfolio Media"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'portfolio-media'
        AND public.is_admin()
    );

-- C. Admin Update Policy: Only verified admins can update media
DROP POLICY IF EXISTS "Admin Update Portfolio Media" ON storage.objects;
CREATE POLICY "Admin Update Portfolio Media"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'portfolio-media'
        AND public.is_admin()
    )
    WITH CHECK (
        bucket_id = 'portfolio-media'
        AND public.is_admin()
    );

-- D. Admin Delete Policy: Only verified admins can delete media
DROP POLICY IF EXISTS "Admin Delete Portfolio Media" ON storage.objects;
CREATE POLICY "Admin Delete Portfolio Media"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'portfolio-media'
        AND public.is_admin()
    );

-- 3. Create Media Assets Metadata Table
CREATE TABLE IF NOT EXISTS public.media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    storage_path TEXT UNIQUE NOT NULL,
    file_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    alt_text TEXT DEFAULT '',
    folder TEXT NOT NULL DEFAULT 'general',
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_media_assets_folder ON public.media_assets(folder);
CREATE INDEX IF NOT EXISTS idx_media_assets_created_at ON public.media_assets(created_at DESC);

-- Enable RLS on media_assets Table
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies on media_assets Table
DROP POLICY IF EXISTS "Admin Read Media Assets" ON public.media_assets;
CREATE POLICY "Admin Read Media Assets"
    ON public.media_assets
    FOR SELECT
    TO authenticated
    USING (
        public.is_admin()
    );

DROP POLICY IF EXISTS "Admin Insert Media Assets" ON public.media_assets;
CREATE POLICY "Admin Insert Media Assets"
    ON public.media_assets
    FOR INSERT
    TO authenticated
    WITH CHECK (
        public.is_admin()
    );

DROP POLICY IF EXISTS "Admin Update Media Assets" ON public.media_assets;
CREATE POLICY "Admin Update Media Assets"
    ON public.media_assets
    FOR UPDATE
    TO authenticated
    USING (
        public.is_admin()
    )
    WITH CHECK (
        public.is_admin()
    );

DROP POLICY IF EXISTS "Admin Delete Media Assets" ON public.media_assets;
CREATE POLICY "Admin Delete Media Assets"
    ON public.media_assets
    FOR DELETE
    TO authenticated
    USING (
        public.is_admin()
    );

-- 5. Table Access Privileges (DCL)
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.media_assets TO authenticated;
GRANT ALL ON TABLE public.media_assets TO service_role;

-- 6. Trigger: Auto-update updated_at timestamp on media_assets
DROP TRIGGER IF EXISTS on_media_assets_updated ON public.media_assets;
CREATE TRIGGER on_media_assets_updated
    BEFORE UPDATE ON public.media_assets
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();
