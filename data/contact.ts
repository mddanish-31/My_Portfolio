export type ContactBrandType =
  | 'gmail'
  | 'github'
  | 'linkedin'
  | 'whatsapp'
  | 'instagram'
  | 'x';

export interface ContactCardItem {
  id: string;
  number: string;
  title: string;
  handle?: string;
  description: string;
  buttonText: string;
  href: string;
  isExternal: boolean;
  brandType: ContactBrandType;
}

export interface ContactTopic {
  id: string;
  label: string;
}

export interface ContactData {
  chapter: string;
  eyebrow: string;
  heading: string[];
  subheading: string;
  topicsTitle: string;
  topics: ContactTopic[];
  cards: ContactCardItem[];
  openToBanner: {
    eyebrow: string;
    title: string;
    subtracks: string;
    rightTitle: string;
    rightMessage: string;
  };
}

export const contactData: ContactData = {
  chapter: 'CHAPTER 08',
  eyebrow: 'REACH OUT',
  heading: ["LET'S", 'CONNECT'],
  subheading:
    'Open to collaborations, internship opportunities, projects, and meaningful conversations about technology and ideas.',
  topicsTitle: 'OPEN FOR CONVERSATIONS',
  topics: [
    { id: 't-1', label: 'INTERNSHIP OPPORTUNITIES' },
    { id: 't-2', label: 'PROJECT COLLABORATIONS' },
    { id: 't-3', label: 'TECHNICAL DISCUSSIONS' },
    { id: 't-4', label: 'OPEN SOURCE CONTRIBUTIONS' },
    { id: 't-5', label: 'JUST A FRIENDLY CHAT' },
  ],
  cards: [
    {
      id: 'contact-email',
      number: '01',
      title: 'Email',
      handle: 'mddanish31.dev@gmail.com',
      description: 'Drop me a message directly for inquiries or opportunities.',
      buttonText: 'Send Email',
      href: 'mailto:mddanish31.dev@gmail.com',
      isExternal: false,
      brandType: 'gmail',
    },
    {
      id: 'contact-github',
      number: '02',
      title: 'GitHub',
      handle: '@mddanish-31',
      description: 'Check out my repositories, code architectures, and open-source contributions.',
      buttonText: 'View Profile',
      href: 'https://github.com/mddanish-31',
      isExternal: true,
      brandType: 'github',
    },
    {
      id: 'contact-linkedin',
      number: '03',
      title: 'LinkedIn',
      handle: 'in/mddanish',
      description: "Let's connect professionally, share industry insights, and grow together.",
      buttonText: 'View Profile',
      href: 'https://linkedin.com/in/mddanish',
      isExternal: true,
      brandType: 'linkedin',
    },
    {
      id: 'contact-whatsapp',
      number: '04',
      title: 'WhatsApp',
      handle: '+91 98765 43210',
      description: 'Quick questions, direct discussions, or instant asynchronous communication.',
      buttonText: 'Chat Now',
      href: 'https://wa.me/919876543210',
      isExternal: true,
      brandType: 'whatsapp',
    },
    {
      id: 'contact-instagram',
      number: '05',
      title: 'Instagram',
      handle: '@mddanish.dev',
      description: 'Follow for project previews, behind-the-scenes engineering, and updates.',
      buttonText: 'View Profile',
      href: 'https://instagram.com/mddanish.dev',
      isExternal: true,
      brandType: 'instagram',
    },
    {
      id: 'contact-x',
      number: '06',
      title: 'X',
      handle: '@mddanish_dev',
      description: 'My thoughts, software learnings, technical breakthroughs, and tech updates.',
      buttonText: 'View Profile',
      href: 'https://x.com/mddanish_dev',
      isExternal: true,
      brandType: 'x',
    },
  ],
  openToBanner: {
    eyebrow: 'CURRENTLY OPEN TO',
    title: 'INTERNSHIP OPPORTUNITIES',
    subtracks: 'Software Development • Full-Stack • AI / ML • Open Source',
    rightTitle: "LET'S BUILD TOGETHER",
    rightMessage:
      'If you have an opportunity, a project idea, or just want to talk about tech, feel free to reach out.',
  },
};
