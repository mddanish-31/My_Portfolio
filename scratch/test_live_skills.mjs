import assert from 'node:assert';

async function testLive() {
  const res = await fetch('http://localhost:3000/');
  const html = await res.text();

  console.log('Homepage status:', res.status);
  assert.strictEqual(res.status, 200);

  // Check that the skills section rendered
  assert.ok(html.includes('id="skills"'), 'Skills section should be present');
  assert.ok(html.includes('TECHNICAL PROFICIENCY'), 'Technical proficiency heading should be present');
  assert.ok(html.includes('CHAPTER 03'), 'Chapter 03 should be present');
  assert.ok(html.includes('TECH STACK'), 'Tech stack heading should be present');
  assert.ok(html.includes('MY CORE STACK'), 'My core stack should be present');

  // Verify all 6 domain names are present in HTML
  assert.ok(html.includes('DEVELOPMENT'), 'DEVELOPMENT domain should be present');
  assert.ok(html.includes('LANGUAGES'), 'LANGUAGES domain should be present');
  assert.ok(html.includes('AI / ML'), 'AI / ML domain should be present');
  assert.ok(html.includes('DATABASES'), 'DATABASES domain should be present');
  assert.ok(html.includes('TOOLS &amp; PLATFORMS') || html.includes('TOOLS & PLATFORMS'), 'TOOLS & PLATFORMS domain should be present');
  assert.ok(html.includes('UI / UX DESIGN'), 'UI / UX DESIGN domain should be present');

  // Verify skills are present
  assert.ok(html.includes('JavaScript'), 'JavaScript should be present');
  assert.ok(html.includes('React'), 'React should be present');
  assert.ok(html.includes('MongoDB'), 'MongoDB should be present');
  assert.ok(html.includes('OpenCV'), 'OpenCV should be present');
  assert.ok(html.includes('Git'), 'Git should be present');

  console.log('✓ Live Homepage Skills Section successfully rendered all 6 domains and canonical skills!');
}

testLive().catch(err => {
  console.error(err);
  process.exit(1);
});
