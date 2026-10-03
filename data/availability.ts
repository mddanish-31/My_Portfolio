export interface OpportunityTrack {
  number: string;
  title: string;
  subtitle?: string;
  tag?: string;
}

export interface AvailabilityData {
  chapter: string;
  eyebrow: string;
  statusLabel: string;
  statusBadge: string;
  statusTitle: string[];
  statusSubtitle: string;
  academicMeta: {
    status: string;
    degree: string;
    graduation: string;
    focus: string;
  };
  heading: string[];
  subheading: string;
  message: string;
  opportunitiesTitle: string;
  opportunities: OpportunityTrack[];
  cta: {
    title: string;
    subtitle: string;
    primaryText: string;
    primaryHref: string;
    secondaryText: string;
    secondaryHref: string;
  };
}

export const availabilityData: AvailabilityData = {
  chapter: 'CHAPTER 07',
  eyebrow: 'CURRENT AVAILABILITY',
  statusLabel: 'CURRENT STATUS',
  statusBadge: 'AVAILABLE',
  statusTitle: ['OPEN', 'FOR', 'INTERNSHIPS'],
  statusSubtitle: 'SOFTWARE DEVELOPMENT • FULL-STACK • AI/ML',
  academicMeta: {
    status: 'UNDERGRADUATE',
    degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    graduation: 'CLASS OF 2028',
    focus: 'FULL-STACK + AI/ML',
  },
  heading: ["LET'S BUILD", 'SOMETHING', 'USEFUL.'],
  subheading: 'OPPORTUNITY & COLLABORATION ARCHIVE',
  message:
    'Currently looking for internship opportunities where I can contribute to real-world products, strengthen my engineering skills, and learn from challenging technical environments.',
  opportunitiesTitle: "WHAT I'M LOOKING FOR",
  opportunities: [
    {
      number: '01',
      title: 'SOFTWARE DEVELOPMENT',
      subtitle: 'Core systems & algorithmic solutions',
      tag: 'CORE CS',
    },
    {
      number: '02',
      title: 'FULL-STACK DEVELOPMENT',
      subtitle: 'Responsive frontend & robust APIs',
      tag: 'WEB APPS',
    },
    {
      number: '03',
      title: 'AI / ML',
      subtitle: 'Machine learning & intelligent interfaces',
      tag: 'INTELLIGENCE',
    },
    {
      number: '04',
      title: 'BACKEND & SYSTEMS',
      subtitle: 'Scalable services & databases',
      tag: 'INFRASTRUCTURE',
    },
  ],
  cta: {
    title: 'AVAILABLE FOR NEW OPPORTUNITIES',
    subtitle: 'Internships • Freelance • Collaborative Projects',
    primaryText: "LET'S CONNECT",
    primaryHref: 'mailto:mddanish31.dev@gmail.com',
    secondaryText: 'GITHUB',
    secondaryHref: 'https://github.com/mddanish-31',
  },
};
