import assert from 'node:assert';

async function testHomepageSkills() {
  const res = await fetch('http://localhost:3000/');
  const html = await res.text();

  assert.strictEqual(res.status, 200);

  const skillsIdx = html.indexOf('id="skills"');
  assert.ok(skillsIdx !== -1, 'Skills section must be present');
  const nextSectionIdx = html.indexOf('id="projects"', skillsIdx);
  const skillsHtml = html.slice(skillsIdx, nextSectionIdx !== -1 ? nextSectionIdx : skillsIdx + 25000);

  console.log('--- SKILLS SECTION HTML AUDIT ---');

  // Verify all 5 canonical categories exist in the HTML
  assert.ok(skillsHtml.toLowerCase().includes('development'), 'Development must be in skills section');
  console.log('✓ Domain found: 01 Development');

  assert.ok(skillsHtml.toLowerCase().includes('languages'), 'Languages must be in skills section');
  console.log('✓ Domain found: 02 Languages');

  assert.ok(skillsHtml.toLowerCase().includes('ai / ml'), 'AI / ML must be in skills section');
  console.log('✓ Domain found: 03 AI / ML');

  assert.ok(skillsHtml.toLowerCase().includes('databases'), 'Databases must be in skills section');
  console.log('✓ Domain found: 04 Databases');

  assert.ok(skillsHtml.toLowerCase().includes('tools &amp; platforms') || skillsHtml.toLowerCase().includes('tools & platforms'), 'Tools & Platforms must be in skills section');
  console.log('✓ Domain found: 05 Tools & Platforms');

  // Verify UI / UX Design does NOT exist in the skills section
  assert.ok(!skillsHtml.toLowerCase().includes('ui / ux design'), 'UI / UX Design must NOT be present in skills section');
  console.log('✓ Verified: UI / UX Design is completely absent from Skills section.');

  // Verify skills are present in page payload / initial render
  assert.ok(skillsHtml.includes('React'), 'React must be in initial skills section render');
  assert.ok(html.includes('JavaScript'), 'JavaScript must be in skills dataset');
  assert.ok(html.includes('OpenCV'), 'OpenCV must be in skills dataset');
  assert.ok(html.includes('MongoDB'), 'MongoDB must be in skills dataset');
  assert.ok(html.includes('Git'), 'Git must be in skills dataset');
  console.log('✓ Verified: Canonical skills rendered successfully.');

  console.log('\n======================================================');
  console.log('LIVE HOMEPAGE SKILLS SECTION FULLY VERIFIED & CORRECT!');
  console.log('======================================================');
}

testHomepageSkills().catch(err => {
  console.error(err);
  process.exit(1);
});
