const assert = require('assert');
const { allSkillsData, skillCategoriesData, normalizeSkillCategory, coreStackItems } = require('../data/skills.ts');

console.log('====================================================');
console.log('RUNNING COMPLETE SKILLS DATA SYNC AUDIT & VALIDATION');
console.log('====================================================\n');

// ----------------------------------------------------
// TEST 11: No duplicate Python or TypeScript records
// ----------------------------------------------------
const pythons = allSkillsData.filter(s => s.name.toLowerCase() === 'python' || s.id.includes('python'));
const tsList = allSkillsData.filter(s => s.name.toLowerCase() === 'typescript' || s.id.includes('typescript'));
assert.strictEqual(pythons.length, 1, `Expected 1 Python entry, found ${pythons.length}`);
assert.strictEqual(tsList.length, 1, `Expected 1 TypeScript entry, found ${tsList.length}`);
console.log('✓ TEST 11 PASSED: Exactly 1 canonical Python and 1 canonical TypeScript entry.');

// ----------------------------------------------------
// TEST 12: All categories resolvable to 6 canonical IDs
// ----------------------------------------------------
const validCategoryIds = new Set(['development', 'languages', 'ai-ml', 'databases', 'tools-platforms', 'ui-ux']);
for (const s of allSkillsData) {
  const norm = normalizeSkillCategory(s.category);
  assert.ok(validCategoryIds.has(norm), `Invalid resolved category "${norm}" for skill ${s.name}`);
}
console.log('✓ TEST 12 PASSED: All skill categories resolve to canonical domain IDs.');

// Helper function to simulate Homepage filter & count logic
function getHomepageDomainData(skills) {
  const visibleSkills = skills.filter(s => s.visible !== false).map(s => ({
    ...s,
    category: normalizeSkillCategory(s.category),
  }));

  const counts = {};
  for (const cat of skillCategoriesData) {
    counts[cat.id] = visibleSkills.filter(s => s.category === cat.id).length;
  }

  return { visibleSkills, counts };
}

// ----------------------------------------------------
// Initial state verification
// ----------------------------------------------------
const initialData = getHomepageDomainData(allSkillsData);

// TEST 1: JavaScript in LANGUAGES
const jsInLang = initialData.visibleSkills.find(s => s.name === 'JavaScript' && s.category === 'languages');
assert.ok(jsInLang, 'JavaScript should be in languages');
console.log('✓ TEST 1 PASSED: JavaScript appears in Homepage LANGUAGES domain.');

// TEST 2: React in DEVELOPMENT
const reactInDev = initialData.visibleSkills.find(s => s.name === 'React' && s.category === 'development');
assert.ok(reactInDev, 'React should be in development');
console.log('✓ TEST 2 PASSED: React appears in Homepage DEVELOPMENT domain.');

// TEST 3: MongoDB in DATABASES
const mongoInDb = initialData.visibleSkills.find(s => s.name === 'MongoDB' && s.category === 'databases');
assert.ok(mongoInDb, 'MongoDB should be in databases');
console.log('✓ TEST 3 PASSED: MongoDB appears in Homepage DATABASES domain.');

// TEST 4: OpenCV in AI / ML
const opencvInAi = initialData.visibleSkills.find(s => s.name === 'OpenCV' && s.category === 'ai-ml');
assert.ok(opencvInAi, 'OpenCV should be in ai-ml');
console.log('✓ TEST 4 PASSED: OpenCV appears in Homepage AI / ML domain.');

// TEST 5: Git in TOOLS & PLATFORMS
const gitInTools = initialData.visibleSkills.find(s => s.name === 'Git' && s.category === 'tools-platforms');
assert.ok(gitInTools, 'Git should be in tools-platforms');
console.log('✓ TEST 5 PASSED: Git appears in Homepage TOOLS & PLATFORMS domain.');

// TEST 6: UI/UX domain count = 0
assert.strictEqual(initialData.counts['ui-ux'], 0, `Expected UI/UX count to be 0, got ${initialData.counts['ui-ux']}`);
console.log('✓ TEST 6 PASSED: UI/UX domain count correctly shows 0.');

// ----------------------------------------------------
// TEST 7: Turn a skill's "VISIBLE IN SKILLS MATRIX" OFF
// ----------------------------------------------------
const devCountBefore = initialData.counts['development'];
const mutatedSkillsVisibility = allSkillsData.map(s => s.id === 'react' ? { ...s, visible: false } : s);
const afterToggleData = getHomepageDomainData(mutatedSkillsVisibility);
const reactAfterToggle = afterToggleData.visibleSkills.find(s => s.id === 'react');
assert.strictEqual(reactAfterToggle, undefined, 'React should not be visible when visible=false');
assert.strictEqual(afterToggleData.counts['development'], devCountBefore - 1, 'Development count should decrease by 1');
console.log('✓ TEST 7 PASSED: Toggle visibility OFF removes skill and decreases domain count.');

// ----------------------------------------------------
// TEST 8: Edit a skill name in Admin
// ----------------------------------------------------
const mutatedSkillsRename = allSkillsData.map(s => s.id === 'react' ? { ...s, name: 'React 19 Core' } : s);
const afterRenameData = getHomepageDomainData(mutatedSkillsRename);
const renamedReact = afterRenameData.visibleSkills.find(s => s.id === 'react');
assert.strictEqual(renamedReact.name, 'React 19 Core', 'Renamed skill should reflect on homepage');
console.log('✓ TEST 8 PASSED: Admin name update reflects on Homepage.');

// ----------------------------------------------------
// TEST 9: Delete a skill
// ----------------------------------------------------
const deletedSkills = allSkillsData.filter(s => s.id !== 'opencv');
const afterDeleteData = getHomepageDomainData(deletedSkills);
assert.strictEqual(afterDeleteData.visibleSkills.find(s => s.id === 'opencv'), undefined);
assert.strictEqual(afterDeleteData.counts['ai-ml'], initialData.counts['ai-ml'] - 1);
console.log('✓ TEST 9 PASSED: Skill deletion removes entry and updates count.');

// ----------------------------------------------------
// TEST 10: Add a new skill to an existing category
// ----------------------------------------------------
const addedSkills = [
  ...allSkillsData,
  {
    id: 'figma',
    name: 'Figma',
    category: 'ui-ux',
    categoryLabel: 'UI / UX DESIGN',
    level: 'Intermediate',
    role: 'UI Design',
    description: 'Interface prototyping and design token definition.',
    visible: true,
  }
];
const afterAddData = getHomepageDomainData(addedSkills);
assert.strictEqual(afterAddData.counts['ui-ux'], 1, 'UI/UX count should be 1 after adding Figma');
const figmaInUi = afterAddData.visibleSkills.find(s => s.id === 'figma');
assert.ok(figmaInUi && figmaInUi.category === 'ui-ux');
console.log('✓ TEST 10 PASSED: New skill addition dynamically updates domain count and skill list.');

// ----------------------------------------------------
// Core Stack Canonical IDs verification
// ----------------------------------------------------
for (const item of coreStackItems) {
  const match = allSkillsData.find(s => s.id === item.skillId);
  assert.ok(match, `Core stack item "${item.name}" must reference valid canonical skill ID "${item.skillId}"`);
}
console.log('✓ CORE STACK PASSED: All core stack items reference canonical skill IDs.');

console.log('\n====================================================');
console.log('ALL 12 TESTS PASSED PERFECTLY!');
console.log('====================================================');
