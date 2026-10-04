import { calculateCumulativeCGPA } from '../lib/utils/academic.ts';

console.log('==================================================');
console.log('RUNNING COMPREHENSIVE CGPA CALCULATION TESTS');
console.log('==================================================\n');

let allPassed = true;

function assert(condition, testName, actual, expected) {
  if (condition) {
    console.log(`✅ PASS: ${testName} (Actual: "${actual}", Expected: "${expected}")`);
  } else {
    console.error(`❌ FAIL: ${testName} (Actual: "${actual}", Expected: "${expected}")`);
    allPassed = false;
  }
}

// Test Suite 1: Standard Progression
console.log('--- Test Suite 1: Standard Progression (8.0, 8.5, 9.0, 8.0) ---');
const records1 = [
  { semester: '01', sgpa: '8.0' },
  { semester: '02', sgpa: '8.5' },
  { semester: '03', sgpa: '9.0' },
  { semester: '04', sgpa: '8.0' },
  { semester: '05', sgpa: '—' },
  { semester: '06', sgpa: '—' },
  { semester: '07', sgpa: '—' },
  { semester: '08', sgpa: '—' },
];

const sem1_cgpa = calculateCumulativeCGPA(records1, '01');
assert(sem1_cgpa === '8.00', 'Sem 1 CGPA = 8.00', sem1_cgpa, '8.00');

const sem2_cgpa = calculateCumulativeCGPA(records1, '02');
assert(sem2_cgpa === '8.25', 'Sem 2 CGPA = (8.0 + 8.5)/2 = 8.25', sem2_cgpa, '8.25');

const sem3_cgpa = calculateCumulativeCGPA(records1, '03');
assert(sem3_cgpa === '8.50', 'Sem 3 CGPA = (8.0 + 8.5 + 9.0)/3 = 8.50', sem3_cgpa, '8.50');

const sem4_cgpa = calculateCumulativeCGPA(records1, '04');
assert(sem4_cgpa === '8.38', 'Sem 4 CGPA = (8.0 + 8.5 + 9.0 + 8.0)/4 = 8.38', sem4_cgpa, '8.38');

// Test Suite 2: Missing SGPA (Non-zero handling)
console.log('\n--- Test Suite 2: Missing SGPA Non-Zero Handling (8.5, 9.0, empty) ---');
const records2 = [
  { semester: '01', sgpa: '8.5' },
  { semester: '02', sgpa: '9.0' },
  { semester: '03', sgpa: '' },
  { semester: '04', sgpa: '—' },
];

const sem1_cgpa2 = calculateCumulativeCGPA(records2, 1);
assert(sem1_cgpa2 === '8.50', 'Sem 1 CGPA = 8.50', sem1_cgpa2, '8.50');

const sem2_cgpa2 = calculateCumulativeCGPA(records2, 2);
assert(sem2_cgpa2 === '8.75', 'Sem 2 CGPA = (8.5 + 9.0)/2 = 8.75', sem2_cgpa2, '8.75');

const sem3_cgpa2 = calculateCumulativeCGPA(records2, 3);
assert(sem3_cgpa2 === '8.75', 'Sem 3 CGPA (empty sem 3) = (8.5 + 9.0)/2 = 8.75', sem3_cgpa2, '8.75');

const sem4_cgpa2 = calculateCumulativeCGPA(records2, 4);
assert(sem4_cgpa2 === '8.75', 'Sem 4 CGPA (dash sem 4) = (8.5 + 9.0)/2 = 8.75', sem4_cgpa2, '8.75');

// Test Suite 3: All Empty / Future Semesters
console.log('\n--- Test Suite 3: All Empty / Future Semesters ---');
const records3 = [
  { semester: '01', sgpa: '—' },
  { semester: '02', sgpa: '' },
  { semester: '03', sgpa: null },
  { semester: '04', sgpa: undefined },
];
const emptyCgpa = calculateCumulativeCGPA(records3, 1);
assert(emptyCgpa === '—', 'All empty Sem 1 returns "—"', emptyCgpa, '—');
const emptyCgpa4 = calculateCumulativeCGPA(records3, 4);
assert(emptyCgpa4 === '—', 'All empty Sem 4 returns "—"', emptyCgpa4, '—');

// Test Suite 4: Unordered Records
console.log('\n--- Test Suite 4: Out-of-Order Array Handling ---');
const records4 = [
  { semester: '04', sgpa: '8.0' },
  { semester: '02', sgpa: '8.5' },
  { semester: '01', sgpa: '8.0' },
  { semester: '03', sgpa: '9.0' },
];
const outOfOrderSem3 = calculateCumulativeCGPA(records4, '03');
assert(outOfOrderSem3 === '8.50', 'Out of order Sem 3 resolves to (8.0 + 8.5 + 9.0)/3 = 8.50', outOfOrderSem3, '8.50');

const outOfOrderSem4 = calculateCumulativeCGPA(records4, '04');
assert(outOfOrderSem4 === '8.38', 'Out of order Sem 4 resolves to 8.38', outOfOrderSem4, '8.38');

// Test Suite 5: Full 8 Semester Sequence
console.log('\n--- Test Suite 5: Full 8 Semester Sequence ---');
const records5 = [
  { semester: '01', sgpa: '8.20' },
  { semester: '02', sgpa: '8.40' },
  { semester: '03', sgpa: '8.60' },
  { semester: '04', sgpa: '8.80' },
  { semester: '05', sgpa: '9.00' },
  { semester: '06', sgpa: '9.20' },
  { semester: '07', sgpa: '9.40' },
  { semester: '08', sgpa: '9.60' },
];
// Sem 1: 8.20
// Sem 2: (8.2+8.4)/2 = 8.30
// Sem 3: (8.2+8.4+8.6)/3 = 8.40
// Sem 4: (8.2+8.4+8.6+8.8)/4 = 8.50
// Sem 5: (8.2+8.4+8.6+8.8+9.0)/5 = 8.60
// Sem 6: (8.2+8.4+8.6+8.8+9.0+9.2)/6 = 8.70
// Sem 7: (8.2+8.4+8.6+8.8+9.0+9.2+9.4)/7 = 8.80
// Sem 8: (8.2+8.4+8.6+8.8+9.0+9.2+9.4+9.6)/8 = 8.90
assert(calculateCumulativeCGPA(records5, 1) === '8.20', 'Full Sem 1 = 8.20', calculateCumulativeCGPA(records5, 1), '8.20');
assert(calculateCumulativeCGPA(records5, 2) === '8.30', 'Full Sem 2 = 8.30', calculateCumulativeCGPA(records5, 2), '8.30');
assert(calculateCumulativeCGPA(records5, 4) === '8.50', 'Full Sem 4 = 8.50', calculateCumulativeCGPA(records5, 4), '8.50');
assert(calculateCumulativeCGPA(records5, 8) === '8.90', 'Full Sem 8 = 8.90', calculateCumulativeCGPA(records5, 8), '8.90');

console.log('\n==================================================');
if (allPassed) {
  console.log('🎉 ALL 14 CGPA TEST ASSERTIONS PASSED!');
} else {
  console.error('❌ SOME TESTS FAILED');
  process.exit(1);
}
console.log('==================================================');
