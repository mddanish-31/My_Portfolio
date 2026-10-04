export type ProficiencyLevel = 'Advanced' | 'Intermediate' | 'Beginner';

export type SkillCategoryId = string;

export interface TechSkill {
  id: string;
  name: string;
  category: string;
  categoryLabel?: string;
  level: ProficiencyLevel;
  role: string;
  description: string;
  usage?: string[];
  related?: string[];
  iconType: string;
  visible?: boolean;
  order?: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  label?: string;
  num?: string;
  order?: number;
  visible?: boolean;
}

export type SkillCategoryInfo = SkillCategory;

/**
 * Canonical Normalizer: Maps any technical or legacy category ID to consistent canonical category slug.
 */
export function normalizeSkillCategory(
  category: string | undefined | null
): string {
  if (!category) return 'development';
  const c = category.toLowerCase().trim();
  if (
    c === 'development' ||
    c === 'frontend' ||
    c === 'backend' ||
    c === 'computer-science' ||
    c === 'dev' ||
    c === 'fullstack'
  ) {
    return 'development';
  }
  if (c === 'languages' || c === 'language' || c === 'lang') {
    return 'languages';
  }
  if (c === 'ai-ml' || c === 'aiml' || c === 'ai' || c === 'ml' || c === 'ai_ml') {
    return 'ai-ml';
  }
  if (c === 'databases' || c === 'database' || c === 'db') {
    return 'databases';
  }
  if (
    c === 'tools-platforms' ||
    c === 'tools' ||
    c === 'platforms' ||
    c === 'tooling' ||
    c === 'platform' ||
    c === 'devops'
  ) {
    return 'tools-platforms';
  }
  return c;
}

export const skillCategoriesData: SkillCategory[] = [
  {
    id: 'development',
    name: 'Development',
    slug: 'development',
    order: 1,
    visible: true,
    num: '01',
    label: 'Full-Stack Web & Software Architecture',
    description: 'Modern frameworks, backend runtimes, APIs, and foundational computational problem solving.',
  },
  {
    id: 'languages',
    name: 'Languages',
    slug: 'languages',
    order: 2,
    visible: true,
    num: '02',
    label: 'Programming & Core Systems',
    description: 'Core compiled and interpreted languages for web systems, algorithms, and computational logic.',
  },
  {
    id: 'ai-ml',
    name: 'AI / ML',
    slug: 'ai-ml',
    order: 3,
    visible: true,
    num: '03',
    label: 'Computer Vision & Intelligent Systems',
    description: 'Computer vision, real-time gesture tracking, and machine learning pipelines.',
  },
  {
    id: 'databases',
    name: 'Databases',
    slug: 'databases',
    order: 4,
    visible: true,
    num: '04',
    label: 'Data Storage & Relational Engines',
    description: 'Relational and document database systems with normalized schema design and ACID integrity.',
  },
  {
    id: 'tools-platforms',
    name: 'Tools & Platforms',
    slug: 'tools-platforms',
    order: 5,
    visible: true,
    num: '05',
    label: 'DevOps & Collaboration Tooling',
    description: 'Distributed version control, remote collaboration, and cloud deployment pipelines.',
  },
];

export const allSkillsData: TechSkill[] = [
  // ==========================================
  // 01 DEVELOPMENT
  // ==========================================
  {
    id: 'react',
    name: 'React',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    level: 'Intermediate',
    role: 'Frontend Development',
    description: 'Building interactive and responsive interfaces with modular component architecture and declarative UI paradigms.',
    usage: [
      'Reusable modular component systems',
      'State management with hooks and context',
      'High-performance virtual DOM rendering',
      'Fluid interactive micro-animations',
    ],
    related: ['Next.js', 'TypeScript', 'Node.js'],
    iconType: 'react',
    visible: true,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    level: 'Intermediate',
    role: 'Frontend Development',
    description: 'Production React framework using App Router for server-side rendering, route handlers, and performance optimization.',
    usage: [
      'Server-Side Rendering (SSR) & Static Generation',
      'App Router architecture & Route Handlers',
      'Image, font, and script optimization',
      'Full-stack API endpoints & middleware',
    ],
    related: ['React', 'TypeScript', 'Vercel'],
    iconType: 'nextjs',
    visible: true,
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    level: 'Intermediate',
    role: 'Backend Development',
    description: 'Asynchronous event-driven runtime used for building scalable server-side applications and RESTful APIs.',
    usage: [
      'Asynchronous non-blocking I/O operations',
      'REST API server implementations',
      'Authentication, JWT, and session workflows',
      'Utility scripts and background processes',
    ],
    related: ['Express.js', 'MongoDB', 'TypeScript'],
    iconType: 'nodejs',
    visible: true,
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    level: 'Intermediate',
    role: 'Backend Development',
    description: 'Minimalist web framework for Node.js powering modular routing, middleware pipelines, and API services.',
    usage: [
      'Modular RESTful routing architecture',
      'Custom middleware for auth, CORS & logging',
      'Error handling and centralized controllers',
      'Database integration with Mongoose',
    ],
    related: ['Node.js', 'MongoDB', 'TypeScript'],
    iconType: 'express',
    visible: true,
  },
  {
    id: 'rest-apis',
    name: 'REST APIs',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    level: 'Intermediate',
    role: 'Backend Development',
    description: 'Designing and integrating scalable RESTful web services with standardized HTTP methods, JSON schemas, and clean status codes.',
    usage: [
      'RESTful architecture and clean URL endpoint conventions',
      'CRUD operations and JSON request/response payloads',
      'Token-based authentication headers and CORS handling',
      'API endpoint testing and documentation',
    ],
    related: ['Node.js', 'Express.js', 'Postman'],
    iconType: 'postman',
    visible: true,
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    level: 'Intermediate',
    role: 'Computer Science & Problem Solving',
    description: 'Core computational fundamentals including arrays, linked lists, trees, graphs, dynamic programming, and asymptotic complexity.',
    usage: [
      'Time and space complexity analysis (Big-O)',
      'Linear and non-linear data structures implementation',
      'Graph traversal (BFS/DFS) and shortest path logic',
      'Divide and conquer algorithmic strategies',
    ],
    related: ['C++', 'Competitive Programming', 'Python'],
    iconType: 'cpp',
    visible: true,
  },
  {
    id: 'competitive-programming',
    name: 'Competitive Programming',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    level: 'Intermediate',
    role: 'Computer Science & Problem Solving',
    description: 'Algorithmic problem solving under strict execution time and memory limits on competitive platforms like LeetCode and Codeforces.',
    usage: [
      'Fast I/O and optimal time complexity implementations',
      'Mathematical computations and modular arithmetic',
      'Greedy algorithms, two pointers, and binary search',
      'Debugging edge cases and performance bottlenecks',
    ],
    related: ['C++', 'Data Structures & Algorithms', 'Python'],
    iconType: 'code2',
    visible: true,
  },
  {
    id: 'oop',
    name: 'Object-Oriented Programming',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    level: 'Intermediate',
    role: 'Computer Science & Problem Solving',
    description: 'Modular software engineering using OOP principles: encapsulation, inheritance, polymorphism, and abstraction.',
    usage: [
      'Class hierarchies, interfaces, and abstract classes',
      'Design patterns (Singleton, Factory, Observer)',
      'Coupling reduction and high cohesion architecture',
      'Code reusability and maintainable systems',
    ],
    related: ['Java', 'C++', 'TypeScript'],
    iconType: 'java',
    visible: true,
  },

  // ==========================================
  // 02 LANGUAGES
  // ==========================================
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    level: 'Advanced',
    role: 'Programming & Development',
    description: 'Deep understanding of modern ECMAScript standards, asynchronous promises, event loop, and browser DOM APIs.',
    usage: [
      'Async/await, Promises, and fetch pipelines',
      'Functional array methods and destructuring',
      'Browser Web APIs and event handling',
      'Dynamic client-side interactivity',
    ],
    related: ['TypeScript', 'React', 'Node.js'],
    iconType: 'javascript',
    visible: true,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    level: 'Intermediate',
    role: 'Programming & Development',
    description: 'Primary language for modern web applications, combining JavaScript flexibility with compile-time type safety.',
    usage: [
      'Type definitions, Discriminated Unions & Generics',
      'Strict compiler configuration and linting',
      'End-to-end API response contract validation',
      'Full-stack type sharing between client and server',
    ],
    related: ['JavaScript', 'React', 'Node.js', 'Next.js'],
    iconType: 'typescript',
    visible: true,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    level: 'Advanced',
    role: 'Programming & Development',
    description: 'Versatile language used for scripting, data analysis, computer vision experimentation, and academic projects.',
    usage: [
      'Automation scripts and data processing',
      'Computer vision with OpenCV & MediaPipe',
      'Algorithm testing and rapid prototyping',
    ],
    related: ['OpenCV', 'MediaPipe', 'C++'],
    iconType: 'python',
    visible: true,
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    level: 'Intermediate',
    role: 'Programming & Development',
    description: 'High-performance programming language used for Object-Oriented Programming (OOP) and algorithmic problem solving.',
    usage: [
      'OOP principles: Encapsulation, Inheritance, Polymorphism',
      'Standard Template Library (STL) data structures',
      'Algorithm analysis and computational logic',
    ],
    related: ['C', 'Java', 'Python'],
    iconType: 'cpp',
    visible: true,
  },
  {
    id: 'java',
    name: 'Java',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    level: 'Intermediate',
    role: 'Programming & Development',
    description: 'Class-based object-oriented programming language studied for robust software design and JVM architectures.',
    usage: [
      'Class hierarchies, interfaces, and abstractions',
      'Exception handling and multi-threading basics',
      'Data structures and design patterns',
    ],
    related: ['C++', 'Python', 'TypeScript'],
    iconType: 'java',
    visible: true,
  },
  {
    id: 'c',
    name: 'C',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    level: 'Intermediate',
    role: 'Programming & Development',
    description: 'Foundational language studied for low-level memory management, pointers, and fundamental data structures.',
    usage: [
      'Pointers, dynamic memory allocation & structs',
      'Fundamental algorithm implementations',
      'Core academic problem solving',
    ],
    related: ['C++', 'Python', 'Java'],
    iconType: 'c',
    visible: true,
  },

  // ==========================================
  // 03 AI / ML
  // ==========================================
  {
    id: 'opencv',
    name: 'OpenCV',
    category: 'ai-ml',
    categoryLabel: 'AI / ML',
    level: 'Intermediate',
    role: 'AI & Computer Vision',
    description: 'Open-source computer vision library used for real-time image processing, filtering, and video frame analysis.',
    usage: [
      'Image color space conversion and thresholding',
      'Contour detection and edge analysis',
      'Real-time webcam video stream processing',
    ],
    related: ['Python', 'MediaPipe'],
    iconType: 'opencv',
    visible: true,
  },
  {
    id: 'mediapipe',
    name: 'MediaPipe',
    category: 'ai-ml',
    categoryLabel: 'AI / ML',
    level: 'Intermediate',
    role: 'AI & Computer Vision',
    description: 'Framework by Google for building multimodal real-time vision pipelines such as hand landmark detection and pose estimation.',
    usage: [
      'Hand landmark tracking (21 3D points)',
      'Real-time gesture recognition experiments',
      'Facial and pose landmark detection',
    ],
    related: ['OpenCV', 'Python'],
    iconType: 'mediapipe',
    visible: true,
  },

  // ==========================================
  // 04 DATABASES
  // ==========================================
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'databases',
    categoryLabel: 'DATABASES',
    level: 'Intermediate',
    role: 'Database Development',
    description: 'Document database for dynamic content schemas, user authentication records, and JSON-based application data.',
    usage: [
      'Schema modeling with Mongoose schemas',
      'Document indexing for query performance',
      'Cloud database management on MongoDB Atlas',
    ],
    related: ['Node.js', 'Express.js', 'MySQL'],
    iconType: 'mongodb',
    visible: true,
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'databases',
    categoryLabel: 'DATABASES',
    level: 'Intermediate',
    role: 'Database Development',
    description: 'Relational database system studied in academic curriculum for table normalization, relational algebra, and ACID integrity.',
    usage: [
      'Normalized schema architectures (1NF to 3NF)',
      'Foreign keys, relational joins, and constraints',
      'Transaction rollbacks and commit management',
    ],
    related: ['SQL', 'MongoDB', 'Node.js'],
    iconType: 'mysql',
    visible: true,
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'databases',
    categoryLabel: 'DATABASES',
    level: 'Intermediate',
    role: 'Database Development',
    description: 'Structured Query Language for querying, aggregating, and manipulating relational database management systems.',
    usage: [
      'Complex multi-table SELECT queries with JOINs',
      'Data definition (DDL) and manipulation (DML)',
      'Aggregate functions, subqueries, and views',
    ],
    related: ['MySQL', 'MongoDB', 'Node.js'],
    iconType: 'database',
    visible: true,
  },

  // ==========================================
  // 05 TOOLS & PLATFORMS
  // ==========================================
  {
    id: 'git',
    name: 'Git',
    category: 'tools-platforms',
    categoryLabel: 'TOOLS & PLATFORMS',
    level: 'Advanced',
    role: 'Development & Collaboration',
    description: 'Distributed version control system for source tracking, branching workflows, and commit history management.',
    usage: [
      'Feature branching and merge conflict resolution',
      'Semantic commit history and release tagging',
      'Staging and local repository maintenance',
    ],
    related: ['GitHub', 'VS Code', 'Vercel'],
    iconType: 'git',
    visible: true,
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'tools-platforms',
    categoryLabel: 'TOOLS & PLATFORMS',
    level: 'Advanced',
    role: 'Development & Collaboration',
    description: 'Cloud hosting for Git repositories, pull request reviews, project tracking, and automated CI workflows.',
    usage: [
      'Remote repository management and collaboration',
      'Pull requests and code reviews',
      'GitHub Actions automated build workflows',
    ],
    related: ['Git', 'VS Code', 'Vercel'],
    iconType: 'github',
    visible: true,
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'tools-platforms',
    categoryLabel: 'TOOLS & PLATFORMS',
    level: 'Intermediate',
    role: 'Development & Collaboration',
    description: 'Hosting platform for Next.js and frontend applications with continuous deployment, preview branches, and edge CDN.',
    usage: [
      'Automated Git-push deployments',
      'Environment variable and domain management',
      'Serverless route hosting and performance telemetry',
    ],
    related: ['Next.js', 'React', 'GitHub'],
    iconType: 'vercel',
    visible: true,
  },
];

// Clean, focused Core Stack items referencing canonical skill IDs
export const coreStackItems = [
  { name: 'React', role: 'Frontend', categoryId: 'development', skillId: 'react', icon: 'react' },
  { name: 'Next.js', role: 'Framework', categoryId: 'development', skillId: 'nextjs', icon: 'nextjs' },
  { name: 'TypeScript', role: 'Language', categoryId: 'languages', skillId: 'typescript', icon: 'typescript' },
  { name: 'Node.js', role: 'Runtime', categoryId: 'development', skillId: 'nodejs', icon: 'nodejs' },
  { name: 'Express.js', role: 'Backend', categoryId: 'development', skillId: 'express', icon: 'express' },
  { name: 'MongoDB', role: 'Database', categoryId: 'databases', skillId: 'mongodb', icon: 'mongodb' },
  { name: 'Git', role: 'Version Control', categoryId: 'tools-platforms', skillId: 'git', icon: 'git' },
];

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'DISCOVER',
    description: 'Understand technical scope, project goals, audience needs, and parameters in depth.',
  },
  {
    step: '02',
    title: 'RESEARCH',
    description: 'Analyze performance standards, benchmark requirements, and define architectural stack.',
  },
  {
    step: '03',
    title: 'STRATEGY',
    description: 'Plan technology choices, type contracts, data schemas, and user journey flows.',
  },
  {
    step: '04',
    title: 'DESIGN',
    description: 'Craft bold editorial layouts, liquid-glass cards, component systems, and responsive views.',
  },
  {
    step: '05',
    title: 'DEVELOP',
    description: 'Build clean, type-safe, optimized code with modern Next.js, React, and modular architecture.',
  },
  {
    step: '06',
    title: 'DELIVER',
    description: 'Rigorous testing, SEO optimization, Core Web Vitals tuning, and seamless production deployment.',
  },
];
