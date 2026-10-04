import { createClient } from '@supabase/supabase-js';
import { skillCategoriesData, allSkillsData } from '../data/skills.ts';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [k, ...v] = trimmed.split('=');
    if (k) env[k.trim()] = v.join('=').trim();
  }
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.SUPABASE_SECRET_KEY || env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Key not found in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log('Fetching existing skills section from Supabase...');
  const { data: row, error } = await supabase
    .from('portfolio_sections')
    .select('*')
    .eq('section_id', 'skills')
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching skills:', error);
    return;
  }

  console.log('Existing row found:', !!row);

  const categories = skillCategoriesData.map((cat, idx) => ({
    ...cat,
    order: idx + 1,
    visible: true,
  }));

  const skills = allSkillsData.map((skill, idx) => ({
    ...skill,
    order: idx + 1,
    visible: true,
  }));

  const newPayload = {
    chapter: row?.data?.chapter || 'CHAPTER 03',
    eyebrow: row?.data?.eyebrow || 'TECHNICAL DNA',
    heading: row?.data?.heading || ['TECH STACK', '& CORE', 'COMPETENCIES.'],
    subheading: row?.data?.subheading || 'A comprehensive matrix of programming languages, full-stack frameworks, databases, and developer tooling.',
    categories,
    skills,
  };

  console.log('Updating portfolio_sections with 5 canonical categories (UI/UX removed)...');
  const { error: upsertError } = await supabase
    .from('portfolio_sections')
    .upsert({
      section_id: 'skills',
      data: newPayload,
      is_published: true,
      updated_by: 'system_migration',
      updated_at: new Date().toISOString(),
    }, { onConflict: 'section_id' });

  if (upsertError) {
    console.error('Upsert failed:', upsertError);
  } else {
    console.log('✓ Successfully migrated Supabase skills record to canonical 5 categories!');
  }
}

migrate();
