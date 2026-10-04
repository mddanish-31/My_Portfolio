export interface ProjectStat {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  number?: string;
  title: string;
  subtitle: string;
  category: string;
  domain?: 'Full-Stack' | 'AI / IoT' | 'Commerce' | 'Creative Tech' | 'UI / UX' | string;
  year: string;
  // Canonical fields
  shortDescription?: string;
  detailedOverview?: string;
  coverImage?: string;
  secondaryImage?: string;
  liveDemoUrl?: string | null;
  githubUrl?: string | null;
  technologies: string[];
  featured?: boolean;
  visible?: boolean;
  order?: number;
  // Legacy aliases
  description?: string;
  overview?: string;
  image?: string;
  liveUrl?: string | null;
  // Extended case study fields
  role?: string[];
  features?: string[];
  challenges?: string[];
  solution?: string[];
  contribution?: string;
  gallery?: string[];
  accentColor?: string;
  stats?: ProjectStat[];
  tags?: string[];
}

export type Project = ProjectItem;

import { resolveMediaUrl } from '@/lib/cms/media';

/**
 * Normalizes any project record into a fully populated canonical object.
 * Ensures bidirectional compatibility between shortDescription/description,
 * detailedOverview/overview, coverImage/image, and liveDemoUrl/liveUrl.
 */
export function normalizeProject(p: Partial<ProjectItem>, idx: number = 0): ProjectItem {
  const shortDesc = p.shortDescription || p.description || '';
  const detailed = p.detailedOverview || p.overview || '';
  const cover = resolveMediaUrl(p.coverImage || p.image, '/images/projects/technexa.jpg');
  const secondary = p.secondaryImage ? resolveMediaUrl(p.secondaryImage) : '';
  const live = p.liveDemoUrl !== undefined ? p.liveDemoUrl : (p.liveUrl ?? null);
  const num = p.number || (idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`);

  let techArray: string[] = [];
  if (Array.isArray(p.technologies)) {
    techArray = p.technologies;
  } else if (typeof p.technologies === 'string') {
    techArray = (p.technologies as string).split(',').map((t) => t.trim()).filter(Boolean);
  }

  const galleryList = Array.isArray(p.gallery) && p.gallery.length > 0
    ? p.gallery.map((g) => resolveMediaUrl(g))
    : (secondary ? [cover, secondary] : [cover]);

  return {
    id: p.id || `project-${idx + 1}`,
    number: num,
    title: p.title || 'Untitled Project',
    subtitle: p.subtitle || '',
    year: p.year || '2026',
    category: p.category || 'FULL-STACK PLATFORM',
    domain: p.domain || p.category || 'Full-Stack',
    shortDescription: shortDesc,
    description: shortDesc,
    detailedOverview: detailed,
    overview: detailed,
    coverImage: cover,
    image: cover,
    secondaryImage: secondary,
    gallery: galleryList,
    liveDemoUrl: live,
    liveUrl: live,
    githubUrl: p.githubUrl ?? null,
    technologies: techArray,
    featured: p.featured ?? true,
    visible: p.visible ?? true,
    order: typeof p.order === 'number' ? p.order : idx + 1,
    role: Array.isArray(p.role) ? p.role : [],
    features: Array.isArray(p.features) ? p.features : [],
    challenges: Array.isArray(p.challenges) ? p.challenges : [],
    solution: Array.isArray(p.solution) ? p.solution : [],
    contribution: p.contribution || '',
    accentColor: p.accentColor || '#D7192F',
    stats: Array.isArray(p.stats) ? p.stats : [],
    tags: Array.isArray(p.tags) ? p.tags : [],
  };
}

export const projectsData: ProjectItem[] = [
  {
    id: 'saathi',
    number: '01',
    title: 'SAATHI',
    subtitle: 'Community & Service Marketplace',
    category: 'FULL-STACK PLATFORM',
    domain: 'Full-Stack',
    year: '2026',
    shortDescription:
      'A comprehensive community service exchange ecosystem connecting local service providers with consumers through authenticated matchmaking, real-time availability scheduling, and intuitive booking flows.',
    description:
      'A comprehensive community service exchange ecosystem connecting local service providers with consumers through authenticated matchmaking, real-time availability scheduling, and intuitive booking flows.',
    detailedOverview:
      'SAATHI is engineered to bridge the gap between verified local service artisans and urban households. By combining modular React/Next.js client architecture with scalable backend REST APIs and secure MongoDB persistence, the platform streamlines local service discovery, quotation management, and direct booking transactions.',
    overview:
      'SAATHI is engineered to bridge the gap between verified local service artisans and urban households. By combining modular React/Next.js client architecture with scalable backend REST APIs and secure MongoDB persistence, the platform streamlines local service discovery, quotation management, and direct booking transactions.',
    role: [
      'Full-Stack Architecture',
      'Database Modeling & Indexing',
      'Interactive UI/UX Design',
      'State Management & Auth Flow',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Express.js'],
    features: [
      'Verified Provider Profiles & Geo-location filtering for local services',
      'Direct Request Matchmaking pipeline with custom price estimations',
      'Real-Time Notification dispatcher & secure session authentication',
      'Liquid-glass management dashboard for service history & customer reviews',
      'Mobile-responsive layout with sub-second page transitions',
    ],
    challenges: [
      'Managing asynchronous multi-stage service booking states with concurrent user availability updates.',
      'Ensuring low latency search queries across diverse service categories and localized tags.',
    ],
    solution: [
      'Implemented optimistic UI updates with debounced search indexing and MongoDB compound indexes.',
      'Constructed a centralized booking state machine that eliminates race conditions during reservation slots.',
    ],
    contribution:
      'Architected the entire full-stack system from initial wireframing to database schemas, REST APIs, and the dark-mode liquid-glass user interface.',
    coverImage: '/images/projects/technexa.jpg',
    image: '/images/projects/technexa.jpg',
    secondaryImage: '/images/projects/urban-styles.jpg',
    gallery: [
      '/images/projects/technexa.jpg',
      '/images/projects/urban-styles.jpg',
      '/images/projects/creative-studio.jpg',
    ],
    githubUrl: 'https://github.com/mddanish-31/saathi',
    liveDemoUrl: 'https://saathi-marketplace.vercel.app',
    liveUrl: 'https://saathi-marketplace.vercel.app',
    featured: true,
    visible: true,
    order: 1,
    accentColor: '#D7192F',
    stats: [
      { label: 'Architecture', value: 'Full-Stack SSR' },
      { label: 'Database', value: 'MongoDB Atlas' },
      { label: 'Performance', value: '98+ Lighthouse' },
    ],
  },
  {
    id: 'smart-plant-monitoring',
    number: '02',
    title: 'SMART PLANT MONITORING',
    subtitle: 'IoT & Precision Telemetry System',
    category: 'AI & IOT ARCHITECTURE',
    domain: 'AI / IoT',
    year: '2025',
    shortDescription:
      'An intelligent hardware-software IoT monitoring system that captures soil moisture, ambient humidity, temperature, and solar exposure to deliver real-time automated watering alerts and botanical health insights.',
    description:
      'An intelligent hardware-software IoT monitoring system that captures soil moisture, ambient humidity, temperature, and solar exposure to deliver real-time automated watering alerts and botanical health insights.',
    detailedOverview:
      'Smart Plant Monitoring combines micro-controller sensor nodes with a Python/Node.js streaming backend and a real-time web dashboard. The system continuously polls environmental metrics, visualizes micro-climate fluctuations, and detects early signs of plant dehydration before visible distress occurs.',
    overview:
      'Smart Plant Monitoring combines micro-controller sensor nodes with a Python/Node.js streaming backend and a real-time web dashboard. The system continuously polls environmental metrics, visualizes micro-climate fluctuations, and detects early signs of plant dehydration before visible distress occurs.',
    role: [
      'IoT Sensor Telemetry',
      'Real-Time WebSocket Pipeline',
      'Data Visualization Engine',
      'Computer Vision Prototyping',
    ],
    technologies: ['Python', 'OpenCV', 'React', 'Node.js', 'WebSockets', 'Tailwind CSS', 'Chart.js'],
    features: [
      'Multi-node environmental sensor polling (Moisture, Lux, Humidity, Temperature)',
      'Sub-second real-time telemetry streaming via WebSocket bidirectional channel',
      'Computer vision leaf anomaly detection module with OpenCV thresholding',
      'Historical metric aggregation graphs with 24-hour hydration forecast curve',
      'Configurable threshold alert triggers with visual anomaly flags',
    ],
    challenges: [
      'Handling intermittent IoT connectivity spikes and maintaining chronological data fidelity on dashboard reloads.',
      'Rendering high-frequency sensor readings smoothly without freezing client-side DOM frames.',
    ],
    solution: [
      'Built a buffer-and-batch WebSocket aggregator on Node.js that throttles client broadcasts to 60fps chart updates.',
      'Utilized lightweight canvas rendering for historical multi-metric timeline visualization.',
    ],
    contribution:
      'Programmed micro-controller data polling, created the telemetry parsing server in Python/Node, and designed the real-time glassmorphic monitoring dashboard.',
    coverImage: '/images/projects/creative-studio.jpg',
    image: '/images/projects/creative-studio.jpg',
    secondaryImage: '/images/projects/technexa.jpg',
    gallery: [
      '/images/projects/creative-studio.jpg',
      '/images/projects/technexa.jpg',
      '/images/projects/urban-styles.jpg',
    ],
    githubUrl: 'https://github.com/mddanish-31/smart-plant-monitoring',
    liveDemoUrl: null,
    liveUrl: null,
    featured: true,
    visible: true,
    order: 2,
    accentColor: '#10B981',
    stats: [
      { label: 'Telemetry', value: 'Sub-Second Stream' },
      { label: 'Sensors', value: '4 Environmental' },
      { label: 'Analytics', value: 'OpenCV Vision' },
    ],
  },
  {
    id: 'technexa',
    number: '03',
    title: 'TECHNEXA',
    subtitle: 'Cloud Platform & Intelligence Dashboard',
    category: 'CLOUD PLATFORM / SAAS',
    domain: 'Full-Stack',
    year: '2026',
    shortDescription:
      'High-performance cloud intelligence dashboard with real-time diagnostics, modular node monitoring, sub-second data streaming, and automated workload health analytics.',
    description:
      'High-performance cloud intelligence dashboard with real-time diagnostics, modular node monitoring, sub-second data streaming, and automated workload health analytics.',
    detailedOverview:
      'TECHNEXA provides a unified operational command center for distributed cloud workloads. Designed with dark-mode editorial aesthetics and micro-animations, it delivers instant visibility into node compute capacity, network throughput, memory overhead, and active cloud instances.',
    overview:
      'TECHNEXA provides a unified operational command center for distributed cloud workloads. Designed with dark-mode editorial aesthetics and micro-animations, it delivers instant visibility into node compute capacity, network throughput, memory overhead, and active cloud instances.',
    role: [
      'Frontend Architecture',
      'Modular Widget System',
      'Performance Optimization',
      'Interactive Visualizations',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Chart.js'],
    features: [
      'Sub-second WebSocket node diagnostics streaming with zero jitter',
      'Modular drag-and-drop customizable dashboard widget canvas',
      'Real-time memory heap telemetry and CPU thermal anomaly tracking',
      'Dark-mode glassmorphic interface with accessible high-contrast indicators',
      'Exportable audit logs & cluster deployment timeline checkpoints',
    ],
    challenges: [
      'Managing simultaneous high-frequency graph renders across multiple active cloud nodes without UI frame drops.',
    ],
    solution: [
      'Employed React memoization with decoupled canvas render loops for independent widget telemetry updates.',
    ],
    contribution:
      'Designed the complete design language, constructed the modular widget pipeline, and engineered the high-performance Next.js frontend.',
    coverImage: '/images/projects/technexa.jpg',
    image: '/images/projects/technexa.jpg',
    secondaryImage: '/images/projects/creative-studio.jpg',
    gallery: [
      '/images/projects/technexa.jpg',
      '/images/projects/creative-studio.jpg',
      '/images/projects/urban-styles.jpg',
    ],
    githubUrl: 'https://github.com/mddanish-31/technexa',
    liveDemoUrl: 'https://technexa-demo.vercel.app',
    liveUrl: 'https://technexa-demo.vercel.app',
    featured: true,
    visible: true,
    order: 3,
    accentColor: '#3B82F6',
    stats: [
      { label: 'Latency', value: '<50ms Stream' },
      { label: 'Architecture', value: 'Modular Micro-UI' },
      { label: 'Stack', value: 'Next.js 15' },
    ],
  },
  {
    id: 'urban-styles',
    number: '04',
    title: 'URBAN STYLES',
    subtitle: 'Editorial Luxury E-Commerce Experience',
    category: 'E-COMMERCE / CREATIVE COMMERCE',
    domain: 'Commerce',
    year: '2026',
    shortDescription:
      'Editorial luxury e-commerce experience featuring fluid layout transitions, optimized catalog search, persistent cart state, and a seamless checkout pipeline.',
    description:
      'Editorial luxury e-commerce experience featuring fluid layout transitions, optimized catalog search, persistent cart state, and a seamless checkout pipeline.',
    detailedOverview:
      'Urban Styles redefines digital fashion retail with high-fashion editorial lookbooks, fluid visual interactions, and responsive multi-attribute product filters. Built for blazing speed and aesthetic elegance, it combines typography-driven curation with commercial utility.',
    overview:
      'Urban Styles redefines digital fashion retail with high-fashion editorial lookbooks, fluid visual interactions, and responsive multi-attribute product filters. Built for blazing speed and aesthetic elegance, it combines typography-driven curation with commercial utility.',
    role: [
      'Storefront Engineering',
      'Product Filtering Engine',
      'Shopping Cart Pipeline',
      'Editorial Layout Design',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Framer Logic'],
    features: [
      'Fluid lookbook editorial grid with interactive hover previews',
      'Persistent client-side shopping bag with real-time stock availability check',
      'Dynamic multi-attribute catalog filtering (size, collection, palette, price)',
      'High-resolution zoom galleries with responsive mobile touch gestures',
      'Seamless checkout flow with automated discount validation',
    ],
    challenges: [
      'Preserving editorial image fidelity while maintaining instant page loads on 3G/4G mobile devices.',
    ],
    solution: [
      'Implemented Next.js responsive image srcset pipelines with WebP conversion and blur-up placeholder effects.',
    ],
    contribution:
      'Built the entire storefront interface, catalog filtering algorithms, cart context state, and responsive checkout integration.',
    coverImage: '/images/projects/urban-styles.jpg',
    image: '/images/projects/urban-styles.jpg',
    secondaryImage: '/images/projects/technexa.jpg',
    gallery: [
      '/images/projects/urban-styles.jpg',
      '/images/projects/technexa.jpg',
      '/images/projects/creative-studio.jpg',
    ],
    githubUrl: 'https://github.com/mddanish-31/urban-styles',
    liveDemoUrl: 'https://urbanstyles-store.vercel.app',
    liveUrl: 'https://urbanstyles-store.vercel.app',
    featured: true,
    visible: true,
    order: 4,
    accentColor: '#D7192F',
    stats: [
      { label: 'Lookbook', value: 'Editorial Grid' },
      { label: 'Cart Speed', value: '<10ms State' },
      { label: 'Optimization', value: '100% WebP' },
    ],
  },
  {
    id: 'restaurant-showcase',
    number: '05',
    title: 'CULINARY SHOWCASE',
    subtitle: 'Immersive Gastronomy & Table Booking',
    category: 'INTERACTIVE WEB APP',
    domain: 'Creative Tech',
    year: '2025',
    shortDescription:
      'A modern gastronomy web experience featuring interactive tasting menus, sensory visual presentation, real-time table booking reservation system, and dietary customizer.',
    description:
      'A modern gastronomy web experience featuring interactive tasting menus, sensory visual presentation, real-time table booking reservation system, and dietary customizer.',
    detailedOverview:
      'Designed to elevate the culinary dining journey, this web application blends atmospheric dark-mode storytelling with practical reservation workflows. Guests can explore interactive course pairings, view ingredient origins, and secure reservations with instant calendar confirmations.',
    overview:
      'Designed to elevate the culinary dining journey, this web application blends atmospheric dark-mode storytelling with practical reservation workflows. Guests can explore interactive course pairings, view ingredient origins, and secure reservations with instant calendar confirmations.',
    role: [
      'Frontend Engineering',
      'Interactive Design System',
      'Table Reservation Logic',
      'Performance Optimization',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    features: [
      'Interactive tasting menu with sensory course pairing recommendations',
      'Real-time table reservation and party size booking flow with calendar sync',
      'Smooth atmospheric scroll transitions & seasonal dishes visual showcase',
      'Dietary restriction customizer with ingredient allergen filters',
      'Mobile-first responsive dining experience with click-to-reserve action',
    ],
    challenges: [
      'Creating rich sensory visual presentations without overloading mobile memory or causing scroll jank.',
    ],
    solution: [
      'Optimized CSS hardware-accelerated animations and utilized CSS backdrop-filter with contain-intrinsic-size.',
    ],
    contribution:
      'Designed the UI/UX mockups in Figma and developed the entire Next.js application with interactive reservation forms.',
    coverImage: '/images/projects/creative-studio.jpg',
    image: '/images/projects/creative-studio.jpg',
    secondaryImage: '/images/projects/urban-styles.jpg',
    gallery: [
      '/images/projects/creative-studio.jpg',
      '/images/projects/urban-styles.jpg',
      '/images/projects/technexa.jpg',
    ],
    githubUrl: 'https://github.com/mddanish-31/restaurant-showcase',
    liveDemoUrl: 'https://culinary-showcase.vercel.app',
    liveUrl: 'https://culinary-showcase.vercel.app',
    featured: true,
    visible: true,
    order: 5,
    accentColor: '#F59E0B',
    stats: [
      { label: 'Experience', value: 'Sensory UI' },
      { label: 'Reservations', value: 'Instant Confirm' },
      { label: 'Responsiveness', value: 'Mobile-First' },
    ],
  },
  {
    id: 'teachers-day-tribute',
    number: '06',
    title: "TEACHERS' DAY PORTAL",
    subtitle: 'Interactive Commemorative Tribute',
    category: 'CREATIVE TECH / EVENT PLATFORM',
    domain: 'Creative Tech',
    year: '2026',
    shortDescription:
      'An interactive digital tribute platform created to honor educators, featuring dynamic digital cards, multimedia student submissions, audio-visual tributes, and celebratory confetti interactions.',
    description:
      'An interactive digital tribute platform created to honor educators, featuring dynamic digital cards, multimedia student submissions, audio-visual tributes, and celebratory confetti interactions.',
    detailedOverview:
      'Built as a campus commemorative hub, this project enabled students to author personalized thank-you messages, attach audio-visual memories, and generate customized gratitude cards with interactive canvas animations.',
    overview:
      'Built as a campus commemorative hub, this project enabled students to author personalized thank-you messages, attach audio-visual memories, and generate customized gratitude cards with interactive canvas animations.',
    role: [
      'Creative Engineering',
      'Canvas Animation Engine',
      'Interactive Tribute Wall',
      'Responsive Design',
    ],
    technologies: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Web Audio API', 'Tailwind CSS'],
    features: [
      'Interactive digital appreciation card generator with custom themes',
      'Dynamic physics-based particle & celebratory confetti canvas engine',
      'Curated tribute wall with filterable departmental educator tags',
      'Audio-visual memory gallery with ambient background tribute score',
      'Instant social share & card download export utility',
    ],
    challenges: [
      'Generating high-frame-rate celebratory particle explosions smoothly on low-power mobile devices.',
    ],
    solution: [
      'Built a custom lightweight HTML5 Canvas 2D particle manager with object pooling and delta-time updates.',
    ],
    contribution:
      'Developed the entire interactive tribute application, created the canvas animation effects, and managed deployment.',
    coverImage: '/images/projects/technexa.jpg',
    image: '/images/projects/technexa.jpg',
    secondaryImage: '/images/projects/creative-studio.jpg',
    gallery: [
      '/images/projects/technexa.jpg',
      '/images/projects/creative-studio.jpg',
      '/images/projects/urban-styles.jpg',
    ],
    githubUrl: 'https://github.com/mddanish-31/teachers-day-tribute',
    liveDemoUrl: 'https://teachers-day-tribute.vercel.app',
    liveUrl: 'https://teachers-day-tribute.vercel.app',
    featured: true,
    visible: true,
    order: 6,
    accentColor: '#8B5CF6',
    stats: [
      { label: 'Interactivity', value: 'Canvas 2D Engine' },
      { label: 'Tributes', value: '100+ Messages' },
      { label: 'Engagement', value: 'Campus Wide' },
    ],
  },
];

export const projectDomains = [
  'ALL',
  'Full-Stack',
  'AI / IoT',
  'Commerce',
  'Creative Tech',
] as const;

