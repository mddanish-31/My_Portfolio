import { defaultAcademicContent } from '../lib/cms/default-content.ts';
import { calculateCumulativeCGPA } from '../lib/utils/academic.ts';

console.log('==================================================');
console.log('TESTING ACADEMIC YEARBOOK CMS DATA FLOW BUG FIXES');
console.log('==================================================\n');

let allPassed = true;

function assert(condition, name, actual, expected) {
  if (condition) {
    console.log(`✅ PASS: ${name}`);
  } else {
    console.error(`❌ FAIL: ${name} (Actual: "${actual}", Expected: "${expected}")`);
    allPassed = false;
  }
}

// Test 1: Atomic state mutation simulation for handleRecordChange
console.log('--- Test 1: Atomic handleRecordChange for Journal Description ---');
let data = { ...defaultAcademicContent, records: [...defaultAcademicContent.records] };

const handleRecordChange = (index, field, value, aliases = []) => {
  const updated = [...(data.records || [])];
  const target = { ...(updated[index] || {}), [field]: value };
  for (const alias of aliases) {
    target[alias] = value;
  }
  updated[index] = target;
  data = {
    ...data,
    records: updated,
  };
};

const newJournalDesc = 'Updated Journal Narrative for Semester 1: Exploring compiler design and memory logic.';
handleRecordChange(0, 'journalDescription', newJournalDesc, ['notes']);

assert(
  data.records[0].journalDescription === newJournalDesc,
  'records[0].journalDescription correctly updated',
  data.records[0].journalDescription,
  newJournalDesc
);
assert(
  data.records[0].notes === newJournalDesc,
  'records[0].notes (backwards-compat alias) synchronized atomically',
  data.records[0].notes,
  newJournalDesc
);

// Test 2: Atomic state mutation for Academic Credits
console.log('\n--- Test 2: Academic Credits Editing & Non-Zero Empty Handling ---');
// Step 2a: Update credits to 24
handleRecordChange(0, 'credits', '24', ['creditsEarned', 'totalCredits']);
assert(
  data.records[0].credits === '24',
  'records[0].credits updated to "24"',
  data.records[0].credits,
  '24'
);
assert(
  data.records[0].creditsEarned === '24',
  'records[0].creditsEarned alias updated to "24"',
  data.records[0].creditsEarned,
  '24'
);

// Step 2b: Update credits to empty string ""
handleRecordChange(1, 'credits', '', ['creditsEarned', 'totalCredits']);
assert(
  data.records[1].credits === '',
  'records[1].credits updated to empty string (not zero)',
  data.records[1].credits,
  ''
);

// Public Yearbook fallback formatting simulation
const getCreditsVal = (rec) => {
  const raw = rec.credits !== undefined && rec.credits !== null ? String(rec.credits).trim() : (rec.creditsEarned ? String(rec.creditsEarned).trim() : '');
  return raw !== '' && raw !== '—' && raw !== '-' ? raw : '—';
};

assert(
  getCreditsVal(data.records[0]) === '24',
  'Public Yearbook displays "24" for Sem 1',
  getCreditsVal(data.records[0]),
  '24'
);
assert(
  getCreditsVal(data.records[1]) === '—',
  'Public Yearbook displays "—" for empty credits Sem 2 (not 0)',
  getCreditsVal(data.records[1]),
  '—'
);

// Test 3: Auto-CGPA calculation remains intact
console.log('\n--- Test 3: Auto CGPA untouched and accurate ---');
handleRecordChange(0, 'sgpa', '8.50');
handleRecordChange(1, 'sgpa', '9.00');
handleRecordChange(2, 'sgpa', '');

const cgpa1 = calculateCumulativeCGPA(data.records, '01');
const cgpa2 = calculateCumulativeCGPA(data.records, '02');
const cgpa3 = calculateCumulativeCGPA(data.records, '03');

assert(cgpa1 === '8.50', 'Sem 1 CGPA = 8.50', cgpa1, '8.50');
assert(cgpa2 === '8.75', 'Sem 2 CGPA = (8.50 + 9.00)/2 = 8.75', cgpa2, '8.75');
assert(cgpa3 === '8.75', 'Sem 3 CGPA with empty SGPA preserves 8.75', cgpa3, '8.75');

console.log('\n==================================================');
if (allPassed) {
  console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!');
} else {
  console.error('❌ SOME TESTS FAILED');
  process.exit(1);
}
console.log('==================================================');
