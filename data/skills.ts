export type ProficiencyLevel = 'Advanced' | 'Intermediate' | 'Beginner';

export interface TechSkill {
  id: string;
  name: string;
  category: 'development' | 'languages' | 'aiml' | 'databases' | 'tools' | 'design';
  categoryLabel: string;
  level: ProficiencyLevel;
  role: string;
  description: string;
  usage: string[];
  related: string[];
  iconType: string;
}

export interface SkillCategoryInfo {
  id: 'development' | 'languages' | 'aiml' | 'databases' | 'tools' | 'design';
  num: string;
  name: string;
  label: string;
  description: string;
}

export const skillCategoriesData: SkillCategoryInfo[] = [
  {
    id: 'development',
    num: '01',
    name: 'DEVELOPMENT',
    label: 'Full-Stack Web Architecture',
    description: 'Modern frameworks, libraries, and runtime environments for building end-to-end web applications.',
  },
  {
    id: 'languages',
    num: '02',
    name: 'LANGUAGES',
    label: 'Programming & Scripting',
    description: 'Core compiled and interpreted languages for web systems, algorithms, and computer science foundations.',
  },
  {
    id: 'aiml',
    num: '03',
    name: 'AI / ML',
    label: 'Computer Vision & Intelligent Systems',
    description: 'Computer vision, gesture tracking, machine learning foundations, and AI API integrations.',
  },
  {
    id: 'databases',
    num: '04',
    name: 'DATABASES',
    label: 'Data Storage & ORM',
    description: 'Relational and document databases with schema design, indexing, and query operations.',
  },
  {
    id: 'tools',
    num: '05',
    name: 'TOOLS & PLATFORMS',
    label: 'DevOps & Tooling Ecosystem',
    description: 'Version control, cloud deployment, container workflows, and developer productivity tools.',
  },
  {
    id: 'design',
    num: '06',
    name: 'UI / UX DESIGN',
    label: 'Design Systems & Interfaces',
    description: 'Visual hierarchy, liquid-glass aesthetics, component tokens, and responsive layout prototyping.',
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
    role: 'FRONTEND LIBRARY',
    description: 'Building interactive and responsive interfaces with modular component architecture and declarative UI paradigms.',
    usage: [
      'Reusable modular component systems',
      'State management with hooks and context',
      'High-performance virtual DOM rendering',
      'Fluid interactive micro-animations',
    ],
    related: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    iconType: 'react',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    level: 'Intermediate',
    role: 'FULL-STACK FRAMEWORK',
    description: 'Production React framework using App Router for server-side rendering, route handlers, and performance optimization.',
    usage: [
      'Server-Side Rendering (SSR) & Static Generation',
      'App Router architecture & Route Handlers',
      'Image, font, and script optimization',
      'Full-stack API endpoints & middleware',
    ],
    related: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    iconType: 'nextjs',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    level: 'Intermediate',
    role: 'TYPED JAVASCRIPT',
    description: 'Strict type safety layer across frontend and backend codebases, preventing runtime bugs and enhancing DX.',
    usage: [
      'Strict interfaces and generic data types',
      'End-to-end API response contract validation',
      'Component prop validation & type safety',
      'Refactor confidence in growing codebases',
    ],
    related: ['React', 'Next.js', 'Node.js', 'Express.js'],
    iconType: 'typescript',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    level: 'Intermediate',
    role: 'BACKEND RUNTIME',
    description: 'Asynchronous event-driven runtime used for building scalable server-side applications and RESTful APIs.',
    usage: [
      'Asynchronous non-blocking I/O operations',
      'REST API server implementations',
      'Authentication, JWT, and session workflows',
      'Utility scripts and background processes',
    ],
    related: ['Express.js', 'MongoDB', 'TypeScript', 'Postman'],
    iconType: 'nodejs',
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    level: 'Intermediate',
    role: 'WEB BACKEND FRAMEWORK',
    description: 'Minimalist web framework for Node.js powering modular routing, middleware pipelines, and API services.',
    usage: [
      'Modular RESTful routing architecture',
      'Custom middleware for auth, CORS & logging',
      'Error handling and centralized controllers',
      'Database integration with Mongoose & Prisma',
    ],
    related: ['Node.js', 'MongoDB', 'TypeScript', 'Postman'],
    iconType: 'express',
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'development',
    categoryLabel: 'DEVELOPMENT',
    level: 'Advanced',
    role: 'UTILITY-FIRST CSS',
    description: 'Utility CSS framework used for building custom design systems, liquid-glass cards, and responsive layouts.',
    usage: [
      'Custom design token implementation',
      'Liquid-glass styling & backdrop blur filters',
      'Mobile-first responsive layout grids',
      'Fast compilation with JIT engine',
    ],
    related: ['React', 'Next.js', 'Figma', 'TypeScript'],
    iconType: 'tailwind',
  },

  // ==========================================
  // 02 LANGUAGES
  // ==========================================
  {
    id: 'lang-python',
    name: 'Python',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    level: 'Advanced',
    role: 'GENERAL PURPOSE & SCRIPTING',
    description: 'Versatile language used for scripting, data analysis, computer vision experimentation, and academic projects.',
    usage: [
      'Automation scripts and data processing',
      'Computer vision with OpenCV & MediaPipe',
      'Algorithm testing and rapid prototyping',
    ],
    related: ['OpenCV', 'MediaPipe', 'C++', 'Java'],
    iconType: 'python',
  },
  {
    id: 'lang-javascript',
    name: 'JavaScript (ES6+)',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    level: 'Advanced',
    role: 'CORE WEB LANGUAGE',
    description: 'Deep understanding of modern ECMAScript standards, asynchronous promises, event loop, and browser DOM APIs.',
    usage: [
      'Async/await, Promises, and fetch pipelines',
      'Functional array methods and destructuring',
      'Browser Web APIs and event handling',
    ],
    related: ['TypeScript', 'React', 'Node.js', 'Tailwind CSS'],
    iconType: 'javascript',
  },
  {
    id: 'lang-typescript',
    name: 'TypeScript',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    level: 'Intermediate',
    role: 'TYPED SCRIPTING',
    description: 'Primary language for modern web applications, combining JavaScript flexibility with compile-time type safety.',
    usage: [
      'Type definitions, Discriminated Unions & Generics',
      'Strict compiler configuration',
      'Full-stack type sharing between client and server',
    ],
    related: ['JavaScript', 'React', 'Node.js', 'Next.js'],
    iconType: 'typescript',
  },
  {
    id: 'lang-cpp',
    name: 'C++',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    level: 'Intermediate',
    role: 'OBJECT-ORIENTED SYSTEMS',
    description: 'High-performance programming language used for Object-Oriented Programming (OOP) and algorithmic problem solving.',
    usage: [
      'OOP principles: Encapsulation, Inheritance, Polymorphism',
      'Standard Template Library (STL) data structures',
      'Algorithm analysis and computational logic',
    ],
    related: ['C', 'Java', 'Python'],
    iconType: 'cpp',
  },
  {
    id: 'lang-java',
    name: 'Java',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    level: 'Intermediate',
    role: 'OBJECT-ORIENTED LANGUAGE',
    description: 'Class-based object-oriented programming language studied for robust software design and JVM architectures.',
    usage: [
      'Class hierarchies, interfaces, and abstractions',
      'Exception handling and multi-threading basics',
      'Data structures and design patterns',
    ],
    related: ['C++', 'Python', 'TypeScript'],
    iconType: 'java',
  },
  {
    id: 'lang-c',
    name: 'C',
    category: 'languages',
    categoryLabel: 'LANGUAGES',
    level: 'Intermediate',
    role: 'SYSTEMS PROGRAMMING',
    description: 'Foundational language studied for low-level memory management, pointers, and fundamental data structures.',
    usage: [
      'Pointers, dynamic memory allocation & structs',
      'Fundamental algorithm implementations',
      'Core academic problem solving',
    ],
    related: ['C++', 'Python', 'Java'],
    iconType: 'c',
  },

  // ==========================================
  // 03 AI / ML
  // ==========================================
  {
    id: 'ai-python',
    name: 'Python',
    category: 'aiml',
    categoryLabel: 'AI / ML',
    level: 'Advanced',
    role: 'AI / ML FOUNDATION',
    description: 'Core environment for numerical computations, data manipulation, and computer vision scripting.',
    usage: [
      'NumPy array operations and matrix calculations',
      'Data preprocessing and transformation pipelines',
      'Scripting image and video processing workflows',
    ],
    related: ['OpenCV', 'MediaPipe', 'AI / ML Foundations'],
    iconType: 'python',
  },
  {
    id: 'ai-opencv',
    name: 'OpenCV',
    category: 'aiml',
    categoryLabel: 'AI / ML',
    level: 'Intermediate',
    role: 'COMPUTER VISION',
    description: 'Open-source computer vision library used for real-time image processing, filtering, and video frame analysis.',
    usage: [
      'Image color space conversion and thresholding',
      'Contour detection and edge analysis',
      'Real-time webcam video stream processing',
    ],
    related: ['Python', 'MediaPipe', 'AI / ML Foundations'],
    iconType: 'opencv',
  },
  {
    id: 'ai-mediapipe',
    name: 'MediaPipe',
    category: 'aiml',
    categoryLabel: 'AI / ML',
    level: 'Intermediate',
    role: 'GESTURE & VISION PIPELINES',
    description: 'Framework by Google for building multimodal real-time vision pipelines such as hand landmark detection and pose estimation.',
    usage: [
      'Hand landmark tracking (21 3D points)',
      'Real-time gesture recognition experiments',
      'Facial and pose landmark detection',
    ],
    related: ['OpenCV', 'Python', 'AI / ML Foundations'],
    iconType: 'mediapipe',
  },
  {
    id: 'ai-foundations',
    name: 'AI / ML Foundations',
    category: 'aiml',
    categoryLabel: 'AI / ML',
    level: 'Intermediate',
    role: 'THEORY & MODELS',
    description: 'Understanding core machine learning principles, classification/regression models, and neural network basics.',
    usage: [
      'Supervised learning workflows (Linear/Logistic Regression)',
      'Model evaluation metrics (Accuracy, Precision, Recall)',
      'Neural network fundamentals and activation functions',
    ],
    related: ['Python', 'OpenCV', 'LLM & AI APIs'],
    iconType: 'neural',
  },
  {
    id: 'ai-llm-api',
    name: 'LLM & AI APIs',
    category: 'aiml',
    categoryLabel: 'AI / ML',
    level: 'Beginner',
    role: 'INTELLIGENT INTEGRATION',
    description: 'Integrating generative AI capabilities into modern web applications via structured prompts and streaming SDKs.',
    usage: [
      'Structured prompt design and deterministic JSON output',
      'Streaming responses to Next.js user interfaces',
      'Context-aware assistant and data extraction tools',
    ],
    related: ['Next.js', 'TypeScript', 'Node.js'],
    iconType: 'sparkles',
  },

  // ==========================================
  // 04 DATABASES
  // ==========================================
  {
    id: 'db-mongodb',
    name: 'MongoDB',
    category: 'databases',
    categoryLabel: 'DATABASES',
    level: 'Intermediate',
    role: 'NO-SQL DOCUMENT DATABASE',
    description: 'Document database for dynamic content schemas, user authentication records, and JSON-based application data.',
    usage: [
      'Schema modeling with Mongoose schemas',
      'Document indexing for query performance',
      'Cloud database management on MongoDB Atlas',
    ],
    related: ['Node.js', 'Express.js', 'Prisma ORM'],
    iconType: 'mongodb',
  },
  {
    id: 'db-mysql',
    name: 'MySQL',
    category: 'databases',
    categoryLabel: 'DATABASES',
    level: 'Intermediate',
    role: 'RELATIONAL SQL ENGINE',
    description: 'Relational database system studied in academic curriculum for table normalization, relational algebra, and ACID integrity.',
    usage: [
      'Normalized schema architectures (1NF to 3NF)',
      'Foreign keys, relational joins, and constraints',
      'Transaction rollbacks and commit management',
    ],
    related: ['PostgreSQL', 'Prisma ORM', 'Node.js'],
    iconType: 'mysql',
  },
  {
    id: 'db-postgresql',
    name: 'PostgreSQL',
    category: 'databases',
    categoryLabel: 'DATABASES',
    level: 'Intermediate',
    role: 'RELATIONAL DATABASE (ACID)',
    description: 'Advanced open-source relational database used for structured data schemas and dependable transactional integrity.',
    usage: [
      'Complex joins and filtered analytical queries',
      'Connection pooling with Prisma and cloud providers',
      'Relational constraints and indexing strategies',
    ],
    related: ['MySQL', 'Prisma ORM', 'Node.js'],
    iconType: 'postgresql',
  },
  {
    id: 'db-prisma',
    name: 'Prisma ORM',
    category: 'databases',
    categoryLabel: 'DATABASES',
    level: 'Intermediate',
    role: 'TYPE-SAFE ORM',
    description: 'Next-generation TypeScript ORM providing auto-generated types, declarative schema modeling, and safe migrations.',
    usage: [
      'Declarative schema modeling in schema.prisma',
      'Auto-generated typed client queries',
      'Automated schema migrations and database seeding',
    ],
    related: ['PostgreSQL', 'MySQL', 'TypeScript', 'Next.js'],
    iconType: 'prisma',
  },
  {
    id: 'db-redis',
    name: 'Redis',
    category: 'databases',
    categoryLabel: 'DATABASES',
    level: 'Beginner',
    role: 'IN-MEMORY STORE',
    description: 'In-memory key-value data structure store used for caching API responses, rate limiting, and temporary state.',
    usage: [
      'Key-value caching with TTL expiration',
      'API rate limiting and session storage',
      'Fast retrieval for high-frequency queries',
    ],
    related: ['Node.js', 'Express.js', 'MongoDB'],
    iconType: 'redis',
  },

  // ==========================================
  // 05 TOOLS & PLATFORMS
  // ==========================================
  {
    id: 'tool-git',
    name: 'Git',
    category: 'tools',
    categoryLabel: 'TOOLS & PLATFORMS',
    level: 'Advanced',
    role: 'VERSION CONTROL',
    description: 'Distributed version control system for source tracking, branching workflows, and commit history management.',
    usage: [
      'Feature branching and merge conflict resolution',
      'Semantic commit history and release tagging',
      'Staging and local repository maintenance',
    ],
    related: ['GitHub', 'VS Code', 'Vercel'],
    iconType: 'git',
  },
  {
    id: 'tool-github',
    name: 'GitHub',
    category: 'tools',
    categoryLabel: 'TOOLS & PLATFORMS',
    level: 'Advanced',
    role: 'CODE COLLABORATION',
    description: 'Cloud hosting for Git repositories, pull request reviews, project tracking, and automated CI workflows.',
    usage: [
      'Remote repository management and collaboration',
      'Pull requests and code reviews',
      'GitHub Actions automated build workflows',
    ],
    related: ['Git', 'VS Code', 'Vercel'],
    iconType: 'github',
  },
  {
    id: 'tool-vscode',
    name: 'VS Code',
    category: 'tools',
    categoryLabel: 'TOOLS & PLATFORMS',
    level: 'Advanced',
    role: 'PRIMARY IDE',
    description: 'Configured development environment with TypeScript IntelliSense, ESLint, Git integration, and debugging tools.',
    usage: [
      'Custom workspace settings and extensions',
      'ESLint, Prettier, and Tailwind linting integration',
      'Integrated terminal and breakpoint debugging',
    ],
    related: ['TypeScript', 'Git', 'GitHub'],
    iconType: 'vscode',
  },
  {
    id: 'tool-vercel',
    name: 'Vercel',
    category: 'tools',
    categoryLabel: 'TOOLS & PLATFORMS',
    level: 'Intermediate',
    role: 'CLOUD DEPLOYMENT',
    description: 'Hosting platform for Next.js and frontend applications with continuous deployment, preview branches, and edge CDN.',
    usage: [
      'Automated Git-push deployments',
      'Environment variable and domain management',
      'Serverless route hosting and performance telemetry',
    ],
    related: ['Next.js', 'React', 'GitHub'],
    iconType: 'vercel',
  },
  {
    id: 'tool-docker',
    name: 'Docker',
    category: 'tools',
    categoryLabel: 'TOOLS & PLATFORMS',
    level: 'Intermediate',
    role: 'CONTAINERIZATION',
    description: 'Containerization tool ensuring consistent environments across development, testing, and production.',
    usage: [
      'Writing multi-stage Dockerfiles for Node apps',
      'Docker Compose orchestration for multi-container apps',
      'Isolated reproducible development containers',
    ],
    related: ['Node.js', 'Git', 'MongoDB'],
    iconType: 'docker',
  },
  {
    id: 'tool-postman',
    name: 'Postman',
    category: 'tools',
    categoryLabel: 'TOOLS & PLATFORMS',
    level: 'Intermediate',
    role: 'API TESTING',
    description: 'Tool for designing, debugging, and documenting RESTful endpoints, validating request payloads, and testing headers.',
    usage: [
      'API endpoint testing with environment variables',
      'Bearer token and auth header verification',
      'API collection documentation and export',
    ],
    related: ['Express.js', 'Node.js', 'TypeScript'],
    iconType: 'postman',
  },

  // ==========================================
  // 06 UI / UX DESIGN
  // ==========================================
  {
    id: 'design-figma',
    name: 'Figma',
    category: 'design',
    categoryLabel: 'UI / UX DESIGN',
    level: 'Advanced',
    role: 'INTERFACE DESIGN',
    description: 'Creating high-fidelity UI mockups, auto-layout component libraries, interactive prototypes, and design specs.',
    usage: [
      'Auto-layout responsive component frames',
      'Design tokens: color palettes, typography scales',
      'Interactive prototype transitions and flows',
    ],
    related: ['UI / UX Design', 'Design Systems', 'Tailwind CSS'],
    iconType: 'figma',
  },
  {
    id: 'design-uiux',
    name: 'UI / UX Design',
    category: 'design',
    categoryLabel: 'UI / UX DESIGN',
    level: 'Intermediate',
    role: 'USER EXPERIENCE',
    description: 'Structuring user journeys, visual hierarchy, information architecture, and intuitive screen layouts.',
    usage: [
      'Visual hierarchy and typography rhythm',
      'User journey flow mapping and content prioritization',
      'Clean interface layouts with balanced whitespace',
    ],
    related: ['Figma', 'Design Systems', 'Responsive Architecture'],
    iconType: 'layout',
  },
  {
    id: 'design-systems',
    name: 'Design Systems',
    category: 'design',
    categoryLabel: 'UI / UX DESIGN',
    level: 'Intermediate',
    role: 'DESIGN TOKENS & ATOMS',
    description: 'Establishing harmonious color palettes, fluid typography hierarchies, consistent spacing systems, and liquid-glass tokens.',
    usage: [
      'Editorial serif typography scales',
      'Liquid-glass translucent surface specifications',
      'Consistent button, badge, and card atoms',
    ],
    related: ['Figma', 'Tailwind CSS', 'UI / UX Design'],
    iconType: 'palette',
  },
  {
    id: 'design-responsive',
    name: 'Responsive Architecture',
    category: 'design',
    categoryLabel: 'UI / UX DESIGN',
    level: 'Advanced',
    role: 'MULTI-DEVICE PERFECTION',
    description: 'Ensuring seamless visual and interaction experiences across ultra-wide desktop monitors, laptops, tablets, and mobile devices.',
    usage: [
      'Fluid clamp() typography and flexible grid layouts',
      'Mobile-specific touch target optimizations',
      'Zero layout shifts across viewport breakpoints',
    ],
    related: ['Tailwind CSS', 'React', 'Design Systems'],
    iconType: 'smartphone',
  },
  {
    id: 'design-wireframing',
    name: 'Wireframing',
    category: 'design',
    categoryLabel: 'UI / UX DESIGN',
    level: 'Intermediate',
    role: 'CONCEPT & PROTOTYPING',
    description: 'Rapid low-fidelity layout concepting to validate features and screen flow before visual polish.',
    usage: [
      'Low-fidelity wireframe concepting',
      'Component hierarchy and content planning',
      'Interactive screen flow validation',
    ],
    related: ['Figma', 'UI / UX Design', 'Design Systems'],
    iconType: 'layout',
  },
];

// Clean, focused Core Stack items representing Danish's primary stack
export const coreStackItems = [
  { name: 'React', role: 'Frontend', categoryId: 'development', skillId: 'react', icon: 'react' },
  { name: 'Next.js', role: 'Framework', categoryId: 'development', skillId: 'nextjs', icon: 'nextjs' },
  { name: 'TypeScript', role: 'Language', categoryId: 'development', skillId: 'typescript', icon: 'typescript' },
  { name: 'Node.js', role: 'Runtime', categoryId: 'development', skillId: 'nodejs', icon: 'nodejs' },
  { name: 'Express.js', role: 'Backend', categoryId: 'development', skillId: 'express', icon: 'express' },
  { name: 'MongoDB', role: 'Database', categoryId: 'databases', skillId: 'db-mongodb', icon: 'mongodb' },
  { name: 'Git', role: 'Version Control', categoryId: 'tools', skillId: 'tool-git', icon: 'git' },
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
