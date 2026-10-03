export type ExperienceCategory = 'professional' | 'leadership' | 'hackathon';

export interface ExperienceItem {
  id: string;
  category: ExperienceCategory;
  number: string; // e.g. "01", "02", "03"
  role: string;
  organization: string;
  organizationType?: string; // e.g. "TECH STARTUP", "STUDENT BODY", "NATIONAL HACKATHON"
  location?: string;
  startDate: string; // e.g. "JUN 2026"
  endDate: string; // e.g. "AUG 2026" or "PRESENT"
  period: string; // e.g. "JUN 2026 — AUG 2026"
  isCurrent?: boolean;
  statusBadge?: string; // e.g. "CURRENT", "PREVIOUS", "LEAD", "PROJECT"
  description: string;
  contributions: string[];
  skills: string[];
  // Future-proof fields for portfolio admin portal
  companyUrl?: string;
  projectUrl?: string;
  certificateUrl?: string;
  logo?: string;
  highlight?: string;
}

export interface ExperienceCategoryGroup {
  id: ExperienceCategory;
  title: string;
  eyebrow: string;
  subtitle: string;
  items: ExperienceItem[];
}

// =========================================================================
// 1. PROFESSIONAL EXPERIENCE (EDITABLE PLACEHOLDERS)
// =========================================================================
export const professionalExperience: ExperienceItem[] = [
  {
    id: 'prof-01',
    category: 'professional',
    number: '01',
    role: 'FULL-STACK DEVELOPER INTERN',
    organization: 'YOUR ORGANIZATION / COMPANY',
    organizationType: 'SOFTWARE & CLOUD SYSTEMS',
    location: 'HYBRID / REMOTE',
    startDate: 'MONTH YEAR',
    endDate: 'PRESENT',
    period: 'MONTH YEAR — PRESENT',
    isCurrent: true,
    statusBadge: 'CURRENT',
    description:
      'Add your current professional role description here. Summarize key responsibilities, systems engineered, or core web applications developed.',
    contributions: [
      'Engineered responsive full-stack features using modern web frameworks and modular component architecture.',
      'Collaborated with cross-functional teams to design, test, and deploy production-ready RESTful APIs and database schemas.',
      'Optimized application performance, caching strategies, and Core Web Vitals across client-side interfaces.',
    ],
    skills: ['NEXT.JS', 'TYPESCRIPT', 'NODE.JS', 'POSTGRESQL', 'TAILWIND CSS', 'GIT'],
    companyUrl: '',
    certificateUrl: '',
    projectUrl: '',
    highlight: 'CORE ENGINEERING',
  },
  {
    id: 'prof-02',
    category: 'professional',
    number: '02',
    role: 'FRONTEND ENGINEERING INTERN',
    organization: 'YOUR ORGANIZATION / COMPANY',
    organizationType: 'DIGITAL PRODUCT STUDIO',
    location: 'LOCATION / REMOTE',
    startDate: 'MONTH YEAR',
    endDate: 'MONTH YEAR',
    period: 'MONTH YEAR — MONTH YEAR',
    isCurrent: false,
    statusBadge: 'PREVIOUS',
    description:
      'Add your previous work experience description here. Highlight frontend user interfaces built and design system implementations.',
    contributions: [
      'Implemented interactive UI components conforming to accessibility standards, design tokens, and fluid layout principles.',
      'Integrated third-party RESTful services, authentication endpoints, and asynchronous state management workflows.',
      'Participated in agile sprints, peer code reviews, and automated UI testing pipelines.',
    ],
    skills: ['REACT', 'JAVASCRIPT', 'TAILWIND CSS', 'REST APIS', 'FIGMA'],
    companyUrl: '',
    certificateUrl: '',
    projectUrl: '',
  },
  {
    id: 'prof-03',
    category: 'professional',
    number: '03',
    role: 'SOFTWARE DEVELOPER INTERN',
    organization: 'YOUR ORGANIZATION / COMPANY',
    organizationType: 'TECHNOLOGY SOLUTIONS',
    location: 'LOCATION',
    startDate: 'MONTH YEAR',
    endDate: 'MONTH YEAR',
    period: 'MONTH YEAR — MONTH YEAR',
    isCurrent: false,
    statusBadge: 'PREVIOUS',
    description:
      'Add your software engineering or web development internship experience here. Mention software tools and backend utilities built.',
    contributions: [
      'Built modular software utilities and automated data processing scripts with clean architectural patterns.',
      'Conducted unit testing, code refactoring, and bug triage across backend services and database connections.',
      'Documented technical specifications, architecture workflows, and integration guidelines for developer onboarding.',
    ],
    skills: ['PYTHON', 'SQL', 'DATA STRUCTURES', 'DOCKER', 'LINUX'],
    companyUrl: '',
    certificateUrl: '',
    projectUrl: '',
  },
];

// =========================================================================
// 2. LEADERSHIP & RESPONSIBILITY (EDITABLE PLACEHOLDERS)
// =========================================================================
export const leadershipExperience: ExperienceItem[] = [
  {
    id: 'lead-01',
    category: 'leadership',
    number: '01',
    role: 'TECHNICAL LEAD / LEAD ORGANIZER',
    organization: 'STUDENT DEVELOPER CLUB / TECH COMMUNITY',
    organizationType: 'STUDENT INITIATIVE',
    location: 'CAMPUS / HYBRID',
    startDate: 'YEAR',
    endDate: 'PRESENT',
    period: 'YEAR — PRESENT',
    isCurrent: true,
    statusBadge: 'LEAD',
    description:
      'Add your leadership role summary here. Describe community impact, team mentorship, and tech initiatives managed.',
    contributions: [
      'Led a multidisciplinary team of developers and designers to build community web portals and open-source tools.',
      'Organized technical bootcamps, hands-on coding workshops, and hackathon preparation sessions for 100+ peers.',
      'Mentored junior developers in version control, modern web stacks, and clean software design principles.',
    ],
    skills: ['TEAM LEADERSHIP', 'PROJECT MANAGEMENT', 'MENTORSHIP', 'COMMUNICATION', 'EVENT STRATEGY'],
    highlight: 'COMMUNITY IMPACT',
  },
  {
    id: 'lead-02',
    category: 'leadership',
    number: '02',
    role: 'OPEN-SOURCE PROGRAM LEAD',
    organization: 'CAMPUS TECH INITIATIVE / COMMUNITY',
    organizationType: 'DEVELOPER NETWORK',
    location: 'CAMPUS',
    startDate: 'YEAR',
    endDate: 'YEAR',
    period: 'YEAR — YEAR',
    isCurrent: false,
    statusBadge: 'COMPLETED',
    description:
      'Add your open-source community coordination or student ambassador experience here.',
    contributions: [
      'Coordinated campus-wide open-source contribution drives and collaborative developer meetups.',
      'Reviewed pull requests, maintained documentation, and guided contributors through Git and GitHub workflows.',
      'Fostered an inclusive collaborative environment for beginner programmers to build real projects.',
    ],
    skills: ['OPEN SOURCE', 'GIT / GITHUB', 'COMMUNITY BUILDING', 'CODE REVIEW'],
  },
  {
    id: 'lead-03',
    category: 'leadership',
    number: '03',
    role: 'CREATIVE & TECHNICAL COORDINATOR',
    organization: 'ANNUAL TECH FESTIVAL / UNIVERSITY GUILD',
    organizationType: 'CAMPUS ORGANIZATION',
    location: 'CAMPUS',
    startDate: 'YEAR',
    endDate: 'YEAR',
    period: 'YEAR — YEAR',
    isCurrent: false,
    statusBadge: 'COMPLETED',
    description:
      'Add your event leadership, creative direction, or hackathon coordination experience here.',
    contributions: [
      'Spearheaded tech infrastructure and real-time event scoring platforms for university-level technical competitions.',
      'Managed cross-team communication between logistics, marketing, and engineering tracks.',
      'Ensured seamless execution of high-attendance coding competitions and tech exhibitions.',
    ],
    skills: ['EVENT COORDINATION', 'CROSS-FUNCTIONAL ALIGNMENT', 'PROBLEM SOLVING', 'STRATEGIC PLANNING'],
  },
];

// =========================================================================
// 3. COMPETITIONS & HACKATHONS (EDITABLE PLACEHOLDERS)
// =========================================================================
export const hackathonExperience: ExperienceItem[] = [
  {
    id: 'hack-01',
    category: 'hackathon',
    number: '01',
    role: 'PROJECT LEAD & FULL-STACK ARCHITECT',
    organization: 'NATIONAL HACKATHON / INNOVATION CHALLENGE',
    organizationType: 'COMPETITIVE SPRINT',
    location: 'NATIONAL / HYBRID',
    startDate: 'YEAR',
    endDate: 'YEAR',
    period: 'YEAR',
    isCurrent: false,
    statusBadge: 'PROJECT',
    description:
      'Add your hackathon project or competition summary here. Highlight the problem tackled and technical solution built.',
    contributions: [
      'Architected and delivered an end-to-end prototype within a 36-hour sprint deadline under competitive evaluation.',
      'Integrated real-time database synchronization and intuitive dashboard visualizations for end users.',
      'Pitched the technical solution to industry judges, demonstrating live functional workflows and architecture.',
    ],
    skills: ['PROTOTYPING', 'FULL-STACK ARCHITECTURE', 'RAPID ITERATION', 'PITCH & DEMO'],
    highlight: 'RAPID PROTOTYPING',
  },
  {
    id: 'hack-02',
    category: 'hackathon',
    number: '02',
    role: 'FRONTEND DEVELOPER & UI DESIGNER',
    organization: 'UNIVERSITY HACKATHON / CODEFEST',
    organizationType: 'INTER-COLLEGE SPRINT',
    location: 'REGIONAL',
    startDate: 'YEAR',
    endDate: 'YEAR',
    period: 'YEAR',
    isCurrent: false,
    statusBadge: 'PROJECT',
    description:
      'Add details about a collaborative hackathon or coding contest participation and role.',
    contributions: [
      'Designed user journeys and implemented responsive client-side interface under strict time constraints.',
      'Connected frontend components with machine learning inference API endpoints for real-time predictions.',
      'Resolved real-time state synchronization bottlenecks during final deployment.',
    ],
    skills: ['REACT', 'API INTEGRATION', 'UI/UX DESIGN', 'COLLABORATIVE CODING'],
  },
  {
    id: 'hack-03',
    category: 'hackathon',
    number: '03',
    role: 'COMPETITIVE PROGRAMMING PARTICIPANT',
    organization: 'ALGORITHMIC CHALLENGE / CODE SPRINT',
    organizationType: 'ALGORITHMIC COMPETITION',
    location: 'ONLINE',
    startDate: 'YEAR',
    endDate: 'YEAR',
    period: 'YEAR',
    isCurrent: false,
    statusBadge: 'MILESTONE',
    description:
      'Add details about algorithmic coding contests, datathons, or technical challenges.',
    contributions: [
      'Solved algorithmic problems involving dynamic programming, graph theory, and greedy algorithms.',
      'Demonstrated fast computational problem-solving and clean algorithmic implementation.',
      'Ranked consistently in top percentile among collegiate participants.',
    ],
    skills: ['C++', 'ALGORITHMS', 'DATA STRUCTURES', 'COMPLEXITY ANALYSIS'],
  },
];

// Grouped data structure for structured rendering
export const experienceGroups: ExperienceCategoryGroup[] = [
  {
    id: 'professional',
    title: 'PROFESSIONAL EXPERIENCE',
    eyebrow: 'WORK HISTORY & INDUSTRY',
    subtitle: 'Practical industry experience, engineering internships, and real-world system development.',
    items: professionalExperience,
  },
  {
    id: 'leadership',
    title: 'LEADERSHIP & RESPONSIBILITY',
    eyebrow: 'COMMUNITY & TEAMS',
    subtitle: 'Technical leadership, open-source initiatives, team mentorship, and organizational execution.',
    items: leadershipExperience,
  },
  {
    id: 'hackathon',
    title: 'COMPETITIONS & HACKATHONS',
    eyebrow: 'SPRINTS & MILESTONES',
    subtitle: 'Competitive coding sprints, rapid prototyping challenges, and algorithmic milestones.',
    items: hackathonExperience,
  },
];

export const allExperiences: ExperienceItem[] = [
  ...professionalExperience,
  ...leadershipExperience,
  ...hackathonExperience,
];

export const experienceFilters = [
  { id: 'ALL', label: 'ALL ARCHIVE', count: allExperiences.length },
  { id: 'professional', label: 'PROFESSIONAL', count: professionalExperience.length },
  { id: 'leadership', label: 'LEADERSHIP', count: leadershipExperience.length },
  { id: 'hackathon', label: 'HACKATHONS', count: hackathonExperience.length },
] as const;
