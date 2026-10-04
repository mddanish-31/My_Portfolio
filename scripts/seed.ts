/**
 * Supabase CMS Data Seeder (Step 2C)
 * MD. DANISH RAZA Portfolio
 *
 * Populates all 13 portfolio sections directly from defaultCMSContent into Supabase.
 * Uses native Node.js standard library + @supabase/supabase-js.
 * Usage: npx tsx scripts/seed.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import { defaultCMSContent } from '../lib/cms/default-content';

// Load .env.local safely using standard library
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const match = line.match(/^\s*([\w]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      const val = (match[2] || '').trim().replace(/^["']|["']$/g, '');
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Supabase environment variables are missing in .env.local.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const sections = [
  { section_id: 'settings', data: defaultCMSContent.settings },
  { section_id: 'sections', data: defaultCMSContent.sections },
  { section_id: 'navigation', data: defaultCMSContent.navigation },
  { section_id: 'home', data: defaultCMSContent.hero },
  { section_id: 'about', data: defaultCMSContent.about },
  { section_id: 'academic', data: defaultCMSContent.academic },
  { section_id: 'skills', data: defaultCMSContent.skills },
  { section_id: 'projects', data: defaultCMSContent.projects },
  { section_id: 'experience', data: defaultCMSContent.experience },
  { section_id: 'education', data: defaultCMSContent.education },
  { section_id: 'availability', data: defaultCMSContent.availability },
  { section_id: 'contact', data: defaultCMSContent.contact },
  { section_id: 'footer', data: defaultCMSContent.footer },
];

async function seedDatabase() {
  console.log('🌱 Starting Supabase Portfolio CMS Seeding...');
  console.log(`📡 Connecting to Supabase project...`);

  let successCount = 0;

  for (const sec of sections) {
    const { error } = await supabase
      .from('portfolio_sections')
      .upsert(
        {
          section_id: sec.section_id,
          data: sec.data,
          is_published: true,
          updated_by: 'system-seed',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'section_id' }
      );

    if (error) {
      console.error(`❌ Failed to seed section "${sec.section_id}": ${error.message}`);
    } else {
      console.log(`✅ Seeded section: "${sec.section_id}"`);
      successCount++;
    }
  }

  console.log(`\n✨ Seeding process finished: ${successCount}/${sections.length} sections successfully synchronized!`);
}

seedDatabase().catch((err) => {
  console.error('Unexpected seeding error:', err);
  process.exit(1);
});
