export type EducationLevelId = 'secondary' | 'higherSecondary' | 'undergraduate';

export interface EducationItem {
  id: EducationLevelId;
  number: string; // e.g., '01', '02', '03'
  selectorLabel: string; // e.g., 'SECONDARY', 'HIGHER SECONDARY', 'CURRENT'
  selectorTitle: string; // e.g., 'CLASS X • 82%', 'CLASS XII • 82%', 'B.TECH CSE • 8.525 CGPA'
  level: string; // e.g., 'SECONDARY EDUCATION', 'HIGHER SECONDARY', 'UNDERGRADUATE'
  degree: string; // e.g., 'CLASS X', 'CLASS XII', 'B.TECH'
  field?: string; // e.g., 'COMPUTER SCIENCE & ENGINEERING'
  institution: string; // e.g., "ST. MARY'S SCHOOL", 'ADAMAS UNIVERSITY'
  location?: string;
  startYear?: string;
  endYear?: string;
  timeline: string; // e.g., 'COMPLETED', 'CLASS OF 2028'
  score: string; // e.g., '82%', '8.525'
  scoreScale?: string; // e.g., '/ 10.00', 'OVERALL PERCENTAGE'
  scoreType: string; // e.g., 'SCORE', 'CGPA'
  scoreBadgeLabel: string; // e.g., 'SECONDARY ACADEMIC STANDING', 'CGPA ACADEMIC STANDING'
  isCurrent?: boolean;
  statusBadge: string; // e.g., 'COMPLETED', 'CURRENT PROGRAM'
  description?: string;
  highlights?: string[];
  logo?: string;
}

export interface EducationSectionData {
  undergraduate: EducationItem;
  higherSecondary: EducationItem;
  secondary: EducationItem;
  items: EducationItem[];
}

export const educationRecords: Record<EducationLevelId, EducationItem> = {
  secondary: {
    id: 'secondary',
    number: '01',
    selectorLabel: 'SECONDARY',
    selectorTitle: 'CLASS X • 82%',
    level: 'SECONDARY EDUCATION',
    degree: 'CLASS X',
    institution: "ST. MARY'S SCHOOL",
    timeline: 'COMPLETED',
    score: '82%',
    scoreType: 'SCORE',
    scoreScale: 'OVERALL PERCENTAGE',
    scoreBadgeLabel: 'SECONDARY ACADEMIC STANDING',
    isCurrent: false,
    statusBadge: 'COMPLETED',
    description:
      'Completed secondary schooling with balanced academic excellence across mathematics, sciences, and fundamental computer concepts.',
    highlights: [
      'Rigorous foundation in mathematics, science, and analytical thinking',
      'Consistent academic excellence across all core school subjects',
    ],
  },
  higherSecondary: {
    id: 'higherSecondary',
    number: '02',
    selectorLabel: 'HIGHER SECONDARY',
    selectorTitle: 'CLASS XII • 82%',
    level: 'HIGHER SECONDARY',
    degree: 'CLASS XII',
    institution: "ST. MARY'S SCHOOL",
    timeline: 'COMPLETED',
    score: '82%',
    scoreType: 'SCORE',
    scoreScale: 'OVERALL PERCENTAGE',
    scoreBadgeLabel: 'HIGHER SECONDARY ACADEMIC STANDING',
    isCurrent: false,
    statusBadge: 'COMPLETED',
    description:
      'Completed higher secondary academic curriculum with strong grounding in science disciplines, mathematics, and computational reasoning.',
    highlights: [
      'Built strong analytical foundation in advanced mathematics and sciences',
      'Developed disciplined study habits and algorithmic problem-solving methodology',
    ],
  },
  undergraduate: {
    id: 'undergraduate',
    number: '03',
    selectorLabel: 'CURRENT',
    selectorTitle: 'B.TECH CSE • 8.525 CGPA',
    level: 'UNDERGRADUATE',
    degree: 'B.TECH',
    field: 'COMPUTER SCIENCE & ENGINEERING',
    institution: 'ADAMAS UNIVERSITY',
    timeline: 'CLASS OF 2028',
    score: '8.525',
    scoreScale: '/ 10.00',
    scoreType: 'CGPA',
    scoreBadgeLabel: 'CGPA ACADEMIC STANDING',
    isCurrent: true,
    statusBadge: 'CURRENT PROGRAM',
    description:
      'Pursuing comprehensive undergraduate studies with intensive focus on algorithmic problem solving, software engineering architecture, database systems, and modern full-stack development.',
    highlights: [
      'Core focus on Data Structures, Algorithms, and Software Architecture',
      'Consistent academic performance with active full-stack practical projects',
    ],
  },
};

export const educationList: EducationItem[] = [
  educationRecords.secondary,
  educationRecords.higherSecondary,
  educationRecords.undergraduate,
];

export const educationData: EducationSectionData = {
  undergraduate: educationRecords.undergraduate,
  higherSecondary: educationRecords.higherSecondary,
  secondary: educationRecords.secondary,
  items: educationList,
};
