export interface AcademicHighlight {
  id?: string;
  label?: string;
  tag?: string; // backwards-compatible alias
  title: string;
  description: string;
}

export interface SemesterRecord {
  id: string;
  semester: string;
  semesterRoman?: string;
  academicYear: string;
  term: string;
  title?: string;
  status: 'COMPLETED' | 'IN PROGRESS' | 'UPCOMING' | string;
  university?: string;
  institution?: string; // backwards-compatible alias
  program?: string;
  degree?: string;      // backwards-compatible alias

  sgpa: string;
  cgpa: string;
  credits?: string;
  creditsEarned?: string; // backwards-compatible alias
  totalCredits?: string;

  overview?: string;
  academicFocus?: string;

  journalTitle?: string;
  journalDescription?: string;
  notes?: string; // backwards-compatible alias

  highlights: AcademicHighlight[];

  pageNumber?: {
    left: string;
    right: string;
  };
  order?: number;
  visible?: boolean;
}

export { calculateCumulativeCGPA } from '@/lib/utils/academic';

export const academicRecords: SemesterRecord[] = [
  {
    id: 'sem-01',
    semester: '01',
    semesterRoman: 'SEMESTER I',
    title: 'SEMESTER I',
    academicYear: '2024 — 2025',
    term: 'AUTUMN TERM',
    status: 'IN PROGRESS',
    university: 'ADAMAS UNIVERSITY',
    institution: 'ADAMAS UNIVERSITY',
    program: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    cgpa: '—',
    sgpa: '—',
    credits: '—',
    creditsEarned: '—',
    totalCredits: '—',
    overview:
      'Semester I marks the beginning of my undergraduate engineering journey, focusing on core programming paradigms, structured computational thinking, and engineering mathematics.',
    academicFocus: 'Foundational Programming, Problem Solving & Engineering Mathematics',
    journalTitle: 'SEMESTER HIGHLIGHTS',
    journalDescription:
      'Semester focus centers on strengthening foundational computer science concepts, low-level execution logic, and engineering mathematics.',
    notes:
      'Semester focus centers on strengthening foundational computer science concepts, low-level execution logic, and engineering mathematics.',
    highlights: [
      {
        id: 'h-1-1',
        label: 'CORE CS',
        tag: 'CORE CS',
        title: 'Core Programming Foundation',
        description:
          'Deep dive into structured problem solving, memory models, pointers, and foundational algorithm design.',
      },
      {
        id: 'h-1-2',
        label: 'MATHEMATICS',
        tag: 'MATHEMATICS',
        title: 'Mathematical Rigor',
        description:
          'Applied linear algebra and vector calculus essential for computational systems and algorithms.',
      },
      {
        id: 'h-1-3',
        label: 'MILESTONE',
        tag: 'MILESTONE',
        title: 'Engineering Induction',
        description:
          'Initiated undergraduate engineering curriculum at Adamas University, building practical technical habits.',
      },
    ],
    pageNumber: {
      left: 'PAGE 01',
      right: 'PAGE 02',
    },
    visible: true,
  },
  {
    id: 'sem-02',
    semester: '02',
    semesterRoman: 'SEMESTER II',
    title: 'SEMESTER II',
    academicYear: '2024 — 2025',
    term: 'SPRING TERM',
    status: 'UPCOMING',
    university: 'ADAMAS UNIVERSITY',
    institution: 'ADAMAS UNIVERSITY',
    program: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    cgpa: '—',
    sgpa: '—',
    credits: '—',
    creditsEarned: '—',
    totalCredits: '—',
    overview:
      'Transitioning into core algorithmic complexity, object-oriented software design, and digital logic architecture.',
    academicFocus: 'Data Structures, Object-Oriented Design & Discrete Mathematics',
    journalTitle: 'SEMESTER HIGHLIGHTS',
    journalDescription:
      'Transitioning to algorithmic complexity, abstract data types, and the mathematical foundations of computer science.',
    notes:
      'Transitioning to algorithmic complexity, abstract data types, and the mathematical foundations of computer science.',
    highlights: [
      {
        id: 'h-2-1',
        label: 'ALGORITHMS',
        tag: 'ALGORITHMS',
        title: 'Data Structures & Abstractions',
        description:
          'Mastering linear and non-linear data structures, asymptotic notation, and efficient object-oriented architectures.',
      },
      {
        id: 'h-2-2',
        label: 'THEORY',
        tag: 'THEORY',
        title: 'Discrete Math & Logic',
        description:
          'Set theory, logic gates, combinatorics, and discrete structures supporting advanced computational theory.',
      },
      {
        id: 'h-2-3',
        label: 'HARDWARE',
        tag: 'HARDWARE',
        title: 'Hardware-Software Interfacing',
        description:
          'Understanding Boolean algebra, digital circuitry, and foundational processor logic units.',
      },
    ],
    pageNumber: {
      left: 'PAGE 03',
      right: 'PAGE 04',
    },
    visible: true,
  },
  {
    id: 'sem-03',
    semester: '03',
    semesterRoman: 'SEMESTER III',
    title: 'SEMESTER III',
    academicYear: '2025 — 2026',
    term: 'AUTUMN TERM',
    status: 'UPCOMING',
    university: 'ADAMAS UNIVERSITY',
    institution: 'ADAMAS UNIVERSITY',
    program: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    cgpa: '—',
    sgpa: '—',
    credits: '—',
    creditsEarned: '—',
    totalCredits: '—',
    overview:
      'Deepening competencies in algorithm analysis, database schema architectures, and modern computer organization.',
    academicFocus: 'Design & Analysis of Algorithms, DBMS & Computer Architecture',
    journalTitle: 'SEMESTER HIGHLIGHTS',
    journalDescription:
      'Deepening system design, database architecture, and advanced algorithmic problem-solving competencies.',
    notes:
      'Deepening system design, database architecture, and advanced algorithmic problem-solving competencies.',
    highlights: [
      {
        id: 'h-3-1',
        label: 'ADVANCED CS',
        tag: 'ADVANCED CS',
        title: 'Algorithmic Optimization',
        description:
          'Divide and conquer, greedy paradigms, dynamic programming, and amortized runtime complexity analysis.',
      },
      {
        id: 'h-3-2',
        label: 'DATABASES',
        tag: 'DATABASES',
        title: 'Relational & Scalable Databases',
        description:
          'SQL querying, indexing, transaction processing, ACID guarantees, and database schema normal forms.',
      },
      {
        id: 'h-3-3',
        label: 'SYSTEMS',
        tag: 'SYSTEMS',
        title: 'Processor Architecture',
        description:
          'Instruction pipeline design, memory hierarchy, cache coherence, and microarchitectural organization.',
      },
    ],
    pageNumber: {
      left: 'PAGE 05',
      right: 'PAGE 06',
    },
    visible: true,
  },
  {
    id: 'sem-04',
    semester: '04',
    semesterRoman: 'SEMESTER IV',
    title: 'SEMESTER IV',
    academicYear: '2025 — 2026',
    term: 'SPRING TERM',
    status: 'UPCOMING',
    university: 'ADAMAS UNIVERSITY',
    institution: 'ADAMAS UNIVERSITY',
    program: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    cgpa: '—',
    sgpa: '—',
    credits: '—',
    creditsEarned: '—',
    totalCredits: '—',
    overview:
      'Core focus on foundational infrastructure: operating system kernels, distributed networks, and computational automata.',
    academicFocus: 'Operating Systems, Computer Networks & Theory of Computation',
    journalTitle: 'SEMESTER HIGHLIGHTS',
    journalDescription:
      'Core focus on foundational infrastructure: operating system kernels, distributed networks, and computational automata.',
    notes:
      'Core focus on foundational infrastructure: operating system kernels, distributed networks, and computational automata.',
    highlights: [
      {
        id: 'h-4-1',
        label: 'OPERATING SYSTEMS',
        tag: 'OPERATING SYSTEMS',
        title: 'Kernel & Process Management',
        description:
          'Process scheduling, virtual memory management, thread synchronization, mutexes, and deadlocks.',
      },
      {
        id: 'h-4-2',
        label: 'NETWORKS',
        tag: 'NETWORKS',
        title: 'Networking & Socket Layer',
        description:
          'OSI model, TCP/IP stack, routing protocols, HTTP/HTTPS handshake, and packet transmission analysis.',
      },
      {
        id: 'h-4-3',
        label: 'THEORY',
        tag: 'THEORY',
        title: 'Formal Language Theory',
        description:
          'Finite automata, context-free grammars, Turing machines, decidability, and complexity classes.',
      },
    ],
    pageNumber: {
      left: 'PAGE 07',
      right: 'PAGE 08',
    },
    visible: true,
  },
  {
    id: 'sem-05',
    semester: '05',
    semesterRoman: 'SEMESTER V',
    title: 'SEMESTER V',
    academicYear: '2026 — 2027',
    term: 'AUTUMN TERM',
    status: 'UPCOMING',
    university: 'ADAMAS UNIVERSITY',
    institution: 'ADAMAS UNIVERSITY',
    program: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    cgpa: '—',
    sgpa: '—',
    credits: '—',
    creditsEarned: '—',
    totalCredits: '—',
    overview:
      'Entering advanced engineering specializations: Artificial Intelligence, Distributed Cloud systems, and secure architectures.',
    academicFocus: 'AI & Machine Learning, Compiler Design & Cloud Systems',
    journalTitle: 'SEMESTER HIGHLIGHTS',
    journalDescription:
      'Entering advanced engineering specializations: Artificial Intelligence, Distributed Cloud systems, and secure architectures.',
    notes:
      'Entering advanced engineering specializations: Artificial Intelligence, Distributed Cloud systems, and secure architectures.',
    highlights: [
      {
        id: 'h-5-1',
        label: 'AI / ML',
        tag: 'AI / ML',
        title: 'AI & Predictive Modeling',
        description:
          'Supervised/unsupervised learning, neural network topologies, gradient descent, and feature engineering.',
      },
      {
        id: 'h-5-2',
        label: 'CLOUD SYSTEMS',
        tag: 'CLOUD SYSTEMS',
        title: 'Cloud & Distributed Clusters',
        description:
          'Microservices architecture, containerization with Docker, serverless patterns, and cloud orchestration.',
      },
      {
        id: 'h-5-3',
        label: 'SECURITY',
        tag: 'SECURITY',
        title: 'Applied Cryptography',
        description:
          'Symmetric/asymmetric encryption, hashing algorithms, digital signatures, and authentication security.',
      },
    ],
    pageNumber: {
      left: 'PAGE 09',
      right: 'PAGE 10',
    },
    visible: true,
  },
  {
    id: 'sem-06',
    semester: '06',
    semesterRoman: 'SEMESTER VI',
    title: 'SEMESTER VI',
    academicYear: '2026 — 2027',
    term: 'SPRING TERM',
    status: 'UPCOMING',
    university: 'ADAMAS UNIVERSITY',
    institution: 'ADAMAS UNIVERSITY',
    program: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    cgpa: '—',
    sgpa: '—',
    credits: '—',
    creditsEarned: '—',
    totalCredits: '—',
    overview:
      'Advanced specializations with deep learning, natural language processing, and production-grade DevOps engineering.',
    academicFocus: 'Deep Learning, Big Data Analytics & DevOps CI/CD',
    journalTitle: 'SEMESTER HIGHLIGHTS',
    journalDescription:
      'Advanced specializations with deep learning, natural language processing, and production-grade DevOps engineering.',
    notes:
      'Advanced specializations with deep learning, natural language processing, and production-grade DevOps engineering.',
    highlights: [
      {
        id: 'h-6-1',
        label: 'DEEP LEARNING',
        tag: 'DEEP LEARNING',
        title: 'Deep Learning & Transformers',
        description:
          'Convolutional architectures, sequence-to-sequence transformers, attention mechanisms, and model fine-tuning.',
      },
      {
        id: 'h-6-2',
        label: 'DATA ENGINEERING',
        tag: 'DATA ENGINEERING',
        title: 'Big Data Pipeline Engineering',
        description:
          'Distributed data processing, streaming event pipelines, ETL workflows, and large-scale analytical engines.',
      },
      {
        id: 'h-6-3',
        label: 'DEVOPS',
        tag: 'DEVOPS',
        title: 'Production DevOps Workflows',
        description:
          'Automated CI/CD pipelines, container orchestration, telemetry monitoring, and immutable infrastructure.',
      },
    ],
    pageNumber: {
      left: 'PAGE 11',
      right: 'PAGE 12',
    },
    visible: true,
  },
  {
    id: 'sem-07',
    semester: '07',
    semesterRoman: 'SEMESTER VII',
    title: 'SEMESTER VII',
    academicYear: '2027 — 2028',
    term: 'AUTUMN TERM',
    status: 'UPCOMING',
    university: 'ADAMAS UNIVERSITY',
    institution: 'ADAMAS UNIVERSITY',
    program: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    cgpa: '—',
    sgpa: '—',
    credits: '—',
    creditsEarned: '—',
    totalCredits: '—',
    overview:
      'Final year capstone engineering phase, enterprise software patterns, and applied technological innovation.',
    academicFocus: 'Major Capstone Project Phase I & Enterprise Architecture',
    journalTitle: 'SEMESTER HIGHLIGHTS',
    journalDescription:
      'Final year capstone engineering phase, enterprise software patterns, and applied technological innovation.',
    notes:
      'Final year capstone engineering phase, enterprise software patterns, and applied technological innovation.',
    highlights: [
      {
        id: 'h-7-1',
        label: 'CAPSTONE',
        tag: 'CAPSTONE',
        title: 'Major Capstone Phase I',
        description:
          'Architectural formulation, requirements research, system modeling, and prototype verification of capstone project.',
      },
      {
        id: 'h-7-2',
        label: 'ENTERPRISE',
        tag: 'ENTERPRISE',
        title: 'Enterprise Scalability',
        description:
          'High-throughput architectures, fault-tolerant distributed consensus, resilience patterns, and system benchmarks.',
      },
    ],
    pageNumber: {
      left: 'PAGE 13',
      right: 'PAGE 14',
    },
    visible: true,
  },
  {
    id: 'sem-08',
    semester: '08',
    semesterRoman: 'SEMESTER VIII',
    title: 'SEMESTER VIII',
    academicYear: '2027 — 2028',
    term: 'SPRING TERM',
    status: 'UPCOMING',
    university: 'ADAMAS UNIVERSITY',
    institution: 'ADAMAS UNIVERSITY',
    program: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    cgpa: '—',
    sgpa: '—',
    credits: '—',
    creditsEarned: '—',
    totalCredits: '—',
    overview:
      'Culmination of undergraduate B.Tech Computer Science & Engineering journey at Adamas University, Class of 2028.',
    academicFocus: 'Capstone Project Defense & Industry Practicum',
    journalTitle: 'SEMESTER HIGHLIGHTS',
    journalDescription:
      'Culmination of undergraduate B.Tech Computer Science & Engineering journey at Adamas University, Class of 2028.',
    notes:
      'Culmination of undergraduate B.Tech Computer Science & Engineering journey at Adamas University, Class of 2028.',
    highlights: [
      {
        id: 'h-8-1',
        label: 'GRADUATION',
        tag: 'GRADUATION',
        title: 'Graduation & Capstone Defense',
        description:
          'Final engineering defense of major capstone project and comprehensive technical viva.',
      },
      {
        id: 'h-8-2',
        label: 'INDUSTRY',
        tag: 'INDUSTRY',
        title: 'Industry Practicum',
        description:
          'Real-world software engineering deployment and production digital product delivery.',
      },
    ],
    pageNumber: {
      left: 'PAGE 15',
      right: 'PAGE 16',
    },
    visible: true,
  },
];
