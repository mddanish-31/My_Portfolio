export interface AboutSlide {
  id: string;
  number: string;
  category: string;
  title: string;
  text: string;
  bottomLabel: string;
  educationDetails?: {
    degree: string;
    institution: string;
    cohort: string;
  };
  keywords?: string[];
}

export const aboutSlides: AboutSlide[] = [
  {
    id: 'who-i-am',
    number: '01',
    category: 'PROFILE',
    title: 'WHO I AM',
    text: "Hi, I'm MD. Danish Raza — a Computer Science undergraduate who enjoys turning ideas into thoughtful digital experiences through code, design, and technology.",
    bottomLabel: 'FULL-STACK DEVELOPER',
  },
  {
    id: 'education',
    number: '02',
    category: 'ACADEMICS',
    title: 'EDUCATION',
    text: 'Building a strong foundation in computer science, software engineering principles, and emerging technologies.',
    bottomLabel: 'ADAMAS UNIVERSITY • CLASS OF 2028',
    educationDetails: {
      degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
      institution: 'ADAMAS UNIVERSITY',
      cohort: 'CLASS OF 2028',
    },
  },
  {
    id: 'what-i-do',
    number: '03',
    category: 'CAPABILITIES',
    title: 'WHAT I DO',
    text: 'Focused on engineering high-performance web applications, modern interfaces, and scalable digital products.',
    bottomLabel: 'ENGINEERING & DESIGN',
    keywords: ['FULL-STACK DEVELOPMENT', 'AI / ML', 'UI / UX', 'DIGITAL PRODUCTS'],
  },
  {
    id: 'my-journey',
    number: '04',
    category: 'TRAJECTORY',
    title: 'MY JOURNEY',
    text: 'From learning the fundamentals of programming to building real projects, experimenting with new technologies, and turning ideas into working products.',
    bottomLabel: 'CONTINUOUS EVOLUTION',
  },
  {
    id: 'beyond-code',
    number: '05',
    category: 'PERSPECTIVE',
    title: 'BEYOND CODE',
    text: 'Curious by nature, I enjoy travelling, exploring new ideas, learning continuously, and finding creative ways to solve problems.',
    bottomLabel: 'CREATIVE CURIOSITY',
  },
  {
    id: 'current-focus',
    number: '06',
    category: 'ASPIRATIONS',
    title: 'CURRENT FOCUS',
    text: 'Currently focused on becoming a stronger full-stack developer while exploring AI/ML and building meaningful digital products.',
    bottomLabel: 'NEXT HORIZONS',
  },
];
