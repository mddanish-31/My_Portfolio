import assert from 'node:assert';
import { allSkillsData, skillCategoriesData, normalizeSkillCategory, coreStackItems } from '../data/skills.ts';

console.log('================================================================');
console.log('RUNNING COMPLETE DYNAMIC SKILLS CATEGORY ARCHITECTURE VALIDATION');
console.log('================================================================\n');

// -----------------------------------------------------------------
// TEST 1: Initial 5 Canonical Categories (UI/UX completely removed)
// -----------------------------------------------------------------
assert.strictEqual(skillCategoriesData.length, 5, `Expected 5 initial categories, found ${skillCategoriesData.length}`);
const categorySlugs = skillCategoriesData.map(c => c.slug || c.id);
assert.deepStrictEqual(categorySlugs, ['development', 'languages', 'ai-ml', 'databases', 'tools-platforms']);

const uiUxFound = skillCategoriesData.find(c => (c.slug || c.id).includes('ui-ux') || c.name.toLowerCase().includes('ui / ux') || c.name.toLowerCase().includes('design'));
assert.strictEqual(uiUxFound, undefined, 'UI / UX Design must NOT exist in categories');
console.log('✓ TEST 1 PASSED: Exactly 5 initial categories (UI / UX completely removed).');

// -----------------------------------------------------------------
// TEST 2: Canonical Skills & Zero Duplicates
// -----------------------------------------------------------------
const pythons = allSkillsData.filter(s => s.name.toLowerCase() === 'python' || s.id.includes('python'));
const tsList = allSkillsData.filter(s => s.name.toLowerCase() === 'typescript' || s.id.includes('typescript'));
assert.strictEqual(pythons.length, 1, `Expected 1 Python entry, found ${pythons.length}`);
assert.strictEqual(tsList.length, 1, `Expected 1 TypeScript entry, found ${tsList.length}`);
assert.strictEqual(allSkillsData.length, 22, `Expected 22 canonical skills, found ${allSkillsData.length}`);
console.log('✓ TEST 2 PASSED: Exactly 22 canonical skills with 0 duplicates.');

// Helper to simulate Homepage resolution logic
function resolveHomepage(cmsCategories, cmsSkills) {
  const visibleCategories = cmsCategories
    .filter(c => c.visible !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((c, idx) => ({
      ...c,
      id: c.slug || c.id,
      num: c.num || String(idx + 1).padStart(2, '0'),
    }));

  const visibleSkills = cmsSkills
    .filter(s => s.visible !== false)
    .map(s => ({
      ...s,
      category: normalizeSkillCategory(s.category),
    }));

  const domainCounts = {};
  for (const cat of visibleCategories) {
    domainCounts[cat.id] = visibleSkills.filter(s => s.category === cat.id).length;
  }

  return { visibleCategories, visibleSkills, domainCounts };
}

// Initial state verification
const initialHp = resolveHomepage(skillCategoriesData, allSkillsData);
assert.deepStrictEqual(initialHp.domainCounts, {
  development: 8,
  languages: 6,
  'ai-ml': 2,
  databases: 3,
  'tools-platforms': 3,
});
console.log('✓ TEST 3 PASSED: Initial Homepage domain counts calculated dynamically:', initialHp.domainCounts);

// -----------------------------------------------------------------
// TEST 4: Dynamic Category Creation ("Cloud & DevOps")
// -----------------------------------------------------------------
const dynamicCategories = [
  ...skillCategoriesData,
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps',
    slug: 'cloud-devops',
    description: 'Cloud hosting, containerization, and automated deployments.',
    order: 6,
    visible: true,
    num: '06',
    label: 'Cloud Infrastructure & Pipelines',
  },
];

const dynamicSkills = [
  ...allSkillsData,
  {
    id: 'docker',
    name: 'Docker',
    category: 'cloud-devops',
    categoryLabel: 'CLOUD & DEVOPS',
    level: 'Intermediate',
    role: 'DevOps & Containerization',
    description: 'Container packaging, multi-stage Dockerfiles, and containerized dev environments.',
    visible: true,
  },
];

const hpWithCloud = resolveHomepage(dynamicCategories, dynamicSkills);
assert.strictEqual(hpWithCloud.visibleCategories.length, 6);
assert.strictEqual(hpWithCloud.visibleCategories[5].name, 'Cloud & DevOps');
assert.strictEqual(hpWithCloud.domainCounts['cloud-devops'], 1);
const dockerSkill = hpWithCloud.visibleSkills.find(s => s.id === 'docker');
assert.ok(dockerSkill && dockerSkill.category === 'cloud-devops');
console.log('✓ TEST 4 PASSED: Dynamic Category "Cloud & DevOps" rendered on Homepage with skill count = 1.');

// -----------------------------------------------------------------
// TEST 5: Category Deletion Safety
// -----------------------------------------------------------------
function attemptDeleteCategory(catId, slug, currentCategories, currentSkills) {
  const targetSlug = slug || catId;
  const count = currentSkills.filter(s => normalizeSkillCategory(s.category) === targetSlug || s.category === targetSlug).length;
  if (count > 0) {
    return { success: false, error: `This category contains ${count} skill(s). Reassign or remove these skills before deleting.` };
  }
  return { success: true, categories: currentCategories.filter(c => c.id !== catId && c.slug !== targetSlug) };
}

const deleteFailResult = attemptDeleteCategory('cloud-devops', 'cloud-devops', dynamicCategories, dynamicSkills);
assert.strictEqual(deleteFailResult.success, false);
assert.ok(deleteFailResult.error.includes('contains 1 skill(s)'));
console.log('✓ TEST 5 PASSED: Deletion safety prevents deleting non-empty categories.');

// Remove the skill and re-attempt delete
const skillsWithoutDocker = dynamicSkills.filter(s => s.id !== 'docker');
const deleteSuccessResult = attemptDeleteCategory('cloud-devops', 'cloud-devops', dynamicCategories, skillsWithoutDocker);
assert.strictEqual(deleteSuccessResult.success, true);
assert.strictEqual(deleteSuccessResult.categories.length, 5);
console.log('✓ TEST 6 PASSED: Clean deletion allowed when category contains 0 skills.');

// -----------------------------------------------------------------
// TEST 7: Category Visibility Toggle
// -----------------------------------------------------------------
const categoriesWithHiddenDb = skillCategoriesData.map(c => (c.slug === 'databases' ? { ...c, visible: false } : c));
const hpHiddenDb = resolveHomepage(categoriesWithHiddenDb, allSkillsData);
assert.strictEqual(hpHiddenDb.visibleCategories.find(c => c.id === 'databases'), undefined);
assert.strictEqual(hpHiddenDb.visibleCategories.length, 4);
console.log('✓ TEST 7 PASSED: Toggling visibility OFF hides domain from Homepage.');

// -----------------------------------------------------------------
// TEST 8: Reordering Categories
// -----------------------------------------------------------------
const reorderedCategories = [
  { ...skillCategoriesData[1], order: 1 }, // Languages first
  { ...skillCategoriesData[0], order: 2 }, // Development second
  ...skillCategoriesData.slice(2),
];
const hpReordered = resolveHomepage(reorderedCategories, allSkillsData);
assert.strictEqual(hpReordered.visibleCategories[0].name, 'Languages');
assert.strictEqual(hpReordered.visibleCategories[1].name, 'Development');
console.log('✓ TEST 8 PASSED: Category reordering sorts Homepage domains correctly.');

// -----------------------------------------------------------------
// TEST 9: Core Stack References
// -----------------------------------------------------------------
for (const item of coreStackItems) {
  const match = allSkillsData.find(s => s.id === item.skillId);
  assert.ok(match, `Core stack item "${item.name}" must reference valid canonical skill ID "${item.skillId}"`);
}
console.log('✓ TEST 9 PASSED: All Core Stack items reference canonical skill IDs.');

console.log('\n================================================================');
console.log('ALL DYNAMIC CATEGORY TESTS PASSED PERFECTLY!');
console.log('================================================================');
