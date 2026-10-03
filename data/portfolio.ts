export interface PortfolioData {
  personal: {
    firstName: string;
    lastName: string;
    fullName: string;
    title: string;
    subtitle: string;
    tagline: string;
    location: string;
    availability: string;
    status: string;
    email: string;
    phone: string;
    social: {
      github: string;
      linkedin: string;
      twitter: string;
      instagram?: string;
    };
  };
  metadata: {
    currently: {
      label: string;
      items: string[];
    };
    graduating: {
      label: string;
      items: string[];
    };
    focusedOn: {
      label: string;
      value: string;
    };
    openFor: {
      label: string;
      items: string[];
    };
  };
  about: {
    headline: string;
    description: string[];
    philosophy: string;
    highlights: Array<{
      number: string;
      title: string;
      description: string;
    }>;
  };
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

export const portfolioData: PortfolioData = {
  personal: {
    firstName: 'MD.',
    lastName: 'DANISH RAZA',
    fullName: 'Md. Danish Raza',
    title: 'FULL-STACK DEVELOPER',
    subtitle: 'CREATIVE DESIGNER & DIGITAL PROFESSIONAL',
    tagline: 'Building digital experiences that look sharp and work beautifully.',
    location: 'INDIA',
    availability: 'AVAILABLE FOR PROJECTS',
    status: 'AVAILABLE FOR WORK',
    email: 'mddanish31.dev@gmail.com',
    phone: '+91 98765 43210',
    social: {
      github: 'https://github.com/mddanish-31',
      linkedin: 'https://linkedin.com/in/mddanish',
      twitter: 'https://x.com/mddanish_dev',
      instagram: 'https://instagram.com/mddanish.dev',
    },
  },
  metadata: {
    currently: {
      label: 'CURRENTLY',
      items: ['UNDERGRADUATE', 'B.TECH CSE'],
    },
    graduating: {
      label: 'GRADUATING',
      items: ['CLASS OF', '2028'],
    },
    focusedOn: {
      label: 'FOCUSED ON',
      value: 'FULL-STACK + AI/ML',
    },
    openFor: {
      label: 'OPEN FOR',
      items: ['INTERNSHIPS &', 'FREELANCE'],
    },
  },
  about: {
    headline: 'ENGINEERING DIGITAL EXPERIENCES WITH PRECISION & PURPOSE',
    description: [
      'I am a Full-Stack Developer specializing in crafting high-performance web applications, responsive user interfaces, and robust backend systems.',
      'My focus is on bridging aesthetic design with rock-solid engineering — turning complex requirements into intuitive, blazing-fast, and scalable digital solutions.',
      'From architectural strategy and clean APIs to pixel-perfect design systems, I build software that not only functions reliably but leaves a memorable impression.',
    ],
    philosophy: 'Great code and thoughtful design do not just solve problems — they communicate value, connect with users, and create measurable impact.',
    highlights: [
      {
        number: '01',
        title: 'Modern Frontend Architecture',
        description: 'Next.js, React, TypeScript, and responsive CSS with focus on Core Web Vitals and fluid interactions.',
      },
      {
        number: '02',
        title: 'Robust Backend & APIs',
        description: 'Scalable RESTful services, database schemas, authentication workflows, and cloud deployments.',
      },
      {
        number: '03',
        title: 'Design Systems & UI/UX',
        description: 'Editorial aesthetics, component libraries, accessibility compliance, and consistent design tokens.',
      },
    ],
  },
  education: [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      institution: 'State University',
      year: 'Graduated with Honors',
    },
    {
      degree: 'Full-Stack Web Development & Modern UI Architecture',
      institution: 'Specialized Certification Track',
      year: '2023 - Present',
    },
  ],
  quote: {
    text: 'Great design and clean architecture do not just look good — they communicate, connect, and drive real results.',
    author: 'Md. Danish',
    role: 'Full-Stack Developer',
  },
};
