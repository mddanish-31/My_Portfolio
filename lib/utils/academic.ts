/**
 * Academic & CGPA Utility Functions
 * MD. Danish Raza Portfolio
 */

export interface SemesterSGPAItem {
  semester?: string | number | unknown;
  sgpa?: string | number | null | unknown;
}

/**
 * Calculates the cumulative CGPA from semester 1 up to the specified target semester.
 *
 * Formula:
 * Cumulative CGPA(n) = (SGPA_1 + SGPA_2 + ... + SGPA_n) / count(valid SGPAs)
 *
 * Rules:
 * 1. Takes all valid numeric SGPA values from semester 1 through the target semester.
 * 2. Normalizes & sorts records safely by chronological semester sequence (SEM 01..08).
 * 3. Safely converts numeric string SGPAs to floats.
 * 4. Ignores empty, undefined, null, or placeholder SGPAs (e.g., '—', '', '-').
 * 5. Does NOT treat missing semester values as zero (averages only available valid semesters).
 * 6. Returns '—' if no valid SGPAs exist up to the target semester.
 * 7. Returns a display-ready string rounded to 2 decimal places (e.g. "8.50").
 */
export function calculateCumulativeCGPA(
  records: SemesterSGPAItem[],
  targetSemesterOrIndex: number | string
): string {
  if (!records || !Array.isArray(records) || records.length === 0) {
    return '—';
  }

  // Determine the target semester number (1-based: 1..8)
  let targetNum = 1;

  if (typeof targetSemesterOrIndex === 'string') {
    const parsed = parseInt(targetSemesterOrIndex.replace(/\D/g, ''), 10);
    targetNum = !isNaN(parsed) && parsed > 0 ? parsed : 1;
  } else if (typeof targetSemesterOrIndex === 'number') {
    if (targetSemesterOrIndex === 0) {
      // 0-based index 0 corresponds to Semester 1
      targetNum = 1;
    } else if (targetSemesterOrIndex > 0) {
      targetNum = Math.floor(targetSemesterOrIndex);
    }
  }

  // Sort records safely by numeric semester
  const sorted = [...records].sort((a, b) => {
    const semA = parseInt(String(a.semester || '0').replace(/\D/g, ''), 10) || 0;
    const semB = parseInt(String(b.semester || '0').replace(/\D/g, ''), 10) || 0;
    return semA - semB;
  });

  const validSgpas: number[] = [];

  for (const rec of sorted) {
    const semNum = parseInt(String(rec.semester || '0').replace(/\D/g, ''), 10);
    if (!isNaN(semNum) && semNum > 0 && semNum <= targetNum) {
      if (rec.sgpa !== undefined && rec.sgpa !== null) {
        const rawStr = String(rec.sgpa).trim();
        if (rawStr !== '' && rawStr !== '—' && rawStr !== '-' && rawStr.toLowerCase() !== 'nan') {
          const val = parseFloat(rawStr);
          if (!isNaN(val) && isFinite(val) && val >= 0 && val <= 10) {
            validSgpas.push(val);
          }
        }
      }
    }
  }

  if (validSgpas.length === 0) {
    return '—';
  }

  const sum = validSgpas.reduce((acc, curr) => acc + curr, 0);
  const avg = sum / validSgpas.length;

  return avg.toFixed(2);
}
