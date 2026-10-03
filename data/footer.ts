export interface FooterNavLink {
  name: string;
  href: string;
}

export interface FooterSocialLink {
  name: string;
  handle: string;
  href: string;
}

export interface FooterData {
  cta: {
    chapter: string;
    eyebrow: string;
    heading: string[];
    subheading: string;
    availability: string;
    metadata: {
      availableFor: string;
      profile: string;
    };
    primaryCta: {
      text: string;
      href: string;
    };
    secondaryCta: {
      text: string;
      href: string;
    };
  };
  brand: {
    name: string;
    role: string;
    specialization: string;
    academic: string;
  };
  navigation: FooterNavLink[];
  socials: FooterSocialLink[];
  admin: {
    text: string;
    href: string;
  };
  bottom: {
    copyright: string;
    tagline: string;
    backToTop: string;
  };
}

export const footerData: FooterData = {
  cta: {
    chapter: 'FINAL CHAPTER',
    eyebrow: 'GET IN TOUCH',
    heading: ["LET'S BUILD", 'SOMETHING', 'WORTH REMEMBERING.'],
    subheading:
      "Have an idea, opportunity, or project in mind? Let's turn it into something meaningful.",
    availability: 'AVAILABLE FOR OPPORTUNITIES',
    metadata: {
      availableFor: 'INTERNSHIPS • FREELANCE • COLLABORATIONS',
      profile: 'MD. DANISH RAZA • FULL-STACK DEVELOPER • AI/ML • CREATIVE TECHNOLOGY',
    },
    primaryCta: {
      text: "LET'S TALK",
      href: 'mailto:mddanish31.dev@gmail.com',
    },
    secondaryCta: {
      text: 'VIEW MY WORK',
      href: '#projects',
    },
  },
  brand: {
    name: 'MD. DANISH RAZA',
    role: 'FULL-STACK DEVELOPER',
    specialization: 'AI/ML • CREATIVE TECHNOLOGY',
    academic: 'B.TECH COMPUTER SCIENCE & ENGINEERING • CLASS OF 2028',
  },
  navigation: [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'YEARBOOK', href: '#academic' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'WORK', href: '#projects' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'EDUCATION', href: '#education' },
    { name: 'AVAILABILITY', href: '#availability' },
    { name: 'CONTACT', href: '#contact' },
  ],
  socials: [
    {
      name: 'GITHUB',
      handle: '@mddanish-31',
      href: 'https://github.com/mddanish-31',
    },
    {
      name: 'LINKEDIN',
      handle: 'in/mddanish',
      href: 'https://linkedin.com/in/mddanish',
    },
    {
      name: 'INSTAGRAM',
      handle: '@mddanish.dev',
      href: 'https://instagram.com/mddanish.dev',
    },
    {
      name: 'X',
      handle: '@mddanish_dev',
      href: 'https://x.com/mddanish_dev',
    },
  ],
  admin: {
    text: 'ADMIN PORTAL',
    href: '/admin',
  },
  bottom: {
    copyright: '© 2026 MD. DANISH RAZA. ALL RIGHTS RESERVED.',
    tagline: 'BUILT WITH CODE & CURIOSITY',
    backToTop: 'BACK TO TOP',
  },
};
