export interface AcademicSubject {
  code: string;
  name: string;
  credits: string;
  grade: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
}

export interface AcademicHighlight {
  title: string;
  description: string;
  tag: string;
}

export interface SemesterRecord {
  id: string;
  semester: string;
  semesterRoman: string;
  academicYear: string;
  term: string;
  status: 'COMPLETED' | 'IN PROGRESS' | 'UPCOMING';
  degree: string;
  institution: string;
  cgpa: string;
  sgpa: string;
  creditsEarned: string;
  totalCredits: string;
  subjects: AcademicSubject[];
  highlights: AcademicHighlight[];
  notes: string;
  pageNumber: {
    left: string;
    right: string;
  };
}

export const academicRecords: SemesterRecord[] = [
  {
    id: 'sem-01',
    semester: '01',
    semesterRoman: 'SEMESTER I',
    academicYear: '2024 — 2025',
    term: 'AUTUMN TERM',
    status: 'IN PROGRESS',
    degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    institution: 'ADAMAS UNIVERSITY',
    cgpa: '—',
    sgpa: '—',
    creditsEarned: '—',
    totalCredits: '—',
    subjects: [
      {
        code: 'CSE101',
        name: 'Programming Fundamentals & Problem Solving in C',
        credits: '4.0',
        grade: '—',
        status: 'In Progress',
      },
      {
        code: 'MAT101',
        name: 'Calculus & Linear Algebra for Engineers',
        credits: '4.0',
        grade: '—',
        status: 'In Progress',
      },
      {
        code: 'PHY101',
        name: 'Engineering Physics & Semiconductor Devices',
        credits: '3.0',
        grade: '—',
        status: 'In Progress',
      },
      {
        code: 'EEE101',
        name: 'Basic Electrical & Electronics Engineering',
        credits: '3.0',
        grade: '—',
        status: 'In Progress',
      },
      {
        code: 'ENG101',
        name: 'Technical Communication & Professional Ethics',
        credits: '2.0',
        grade: '—',
        status: 'In Progress',
      },
    ],
    highlights: [
      {
        title: 'Core Programming Foundation',
        description:
          'Deep dive into structured problem solving, memory models, pointers, and foundational algorithm design.',
        tag: 'CORE CS',
      },
      {
        title: 'Mathematical Rigor',
        description:
          'Applied linear algebra and vector calculus essential for future computational systems and algorithms.',
        tag: 'MATHEMATICS',
      },
      {
        title: 'Engineering Induction',
        description:
          'Initiated undergraduate engineering curriculum at Adamas University, building practical technical habits.',
        tag: 'MILESTONE',
      },
    ],
    notes:
      'Semester focus centers on strengthening foundational computer science concepts, low-level execution logic, and engineering mathematics.',
    pageNumber: {
      left: 'PAGE 01',
      right: 'PAGE 02',
    },
  },
  {
    id: 'sem-02',
    semester: '02',
    semesterRoman: 'SEMESTER II',
    academicYear: '2024 — 2025',
    term: 'SPRING TERM',
    status: 'UPCOMING',
    degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    institution: 'ADAMAS UNIVERSITY',
    cgpa: '—',
    sgpa: '—',
    creditsEarned: '—',
    totalCredits: '—',
    subjects: [
      {
        code: 'CSE102',
        name: 'Object-Oriented Programming (OOP) & Design',
        credits: '4.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE104',
        name: 'Data Structures & Algorithmic Analysis',
        credits: '4.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'MAT102',
        name: 'Discrete Mathematics & Graph Theory',
        credits: '4.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'ECE102',
        name: 'Digital Logic Design & Computer Arithmetic',
        credits: '3.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'ENV101',
        name: 'Environmental Science & Sustainable Technology',
        credits: '2.0',
        grade: '—',
        status: 'Upcoming',
      },
    ],
    highlights: [
      {
        title: 'Data Structures & Abstractions',
        description:
          'Mastering linear and non-linear data structures, asymptotic notation, and efficient object-oriented architectures.',
        tag: 'ALGORITHMS',
      },
      {
        title: 'Discrete Math & Logic',
        description:
          'Set theory, logic gates, combinatorics, and discrete structures supporting advanced computational theory.',
        tag: 'THEORY',
      },
      {
        title: 'Hardware-Software Interfacing',
        description:
          'Understanding Boolean algebra, digital circuitry, and foundational processor logic units.',
        tag: 'HARDWARE',
      },
    ],
    notes:
      'Transitioning to algorithmic complexity, abstract data types, and the mathematical foundations of computer science.',
    pageNumber: {
      left: 'PAGE 03',
      right: 'PAGE 04',
    },
  },
  {
    id: 'sem-03',
    semester: '03',
    semesterRoman: 'SEMESTER III',
    academicYear: '2025 — 2026',
    term: 'AUTUMN TERM',
    status: 'UPCOMING',
    degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    institution: 'ADAMAS UNIVERSITY',
    cgpa: '—',
    sgpa: '—',
    creditsEarned: '—',
    totalCredits: '—',
    subjects: [
      {
        code: 'CSE201',
        name: 'Design & Analysis of Algorithms',
        credits: '4.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE203',
        name: 'Computer Organization & Architecture',
        credits: '4.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE205',
        name: 'Database Management Systems (DBMS)',
        credits: '4.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'MAT201',
        name: 'Probability, Statistics & Stochastic Processes',
        credits: '3.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE207',
        name: 'Web Engineering & Modern Frontend Stacks',
        credits: '3.0',
        grade: '—',
        status: 'Upcoming',
      },
    ],
    highlights: [
      {
        title: 'Algorithmic Optimization',
        description:
          'Divide and conquer, greedy paradigms, dynamic programming, and amortized runtime complexity analysis.',
        tag: 'ADVANCED CS',
      },
      {
        title: 'Relational & Scalable Databases',
        description:
          'SQL querying, indexing, transaction processing, ACID guarantees, and database schema normal forms.',
        tag: 'DATABASES',
      },
      {
        title: 'Processor Architecture',
        description:
          'Instruction pipeline design, memory hierarchy, cache coherence, and microarchitectural organization.',
        tag: 'SYSTEMS',
      },
    ],
    notes:
      'Deepening system design, database architecture, and advanced algorithmic problem-solving competencies.',
    pageNumber: {
      left: 'PAGE 05',
      right: 'PAGE 06',
    },
  },
  {
    id: 'sem-04',
    semester: '04',
    semesterRoman: 'SEMESTER IV',
    academicYear: '2025 — 2026',
    term: 'SPRING TERM',
    status: 'UPCOMING',
    degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    institution: 'ADAMAS UNIVERSITY',
    cgpa: '—',
    sgpa: '—',
    creditsEarned: '—',
    totalCredits: '—',
    subjects: [
      {
        code: 'CSE202',
        name: 'Operating Systems & Concurrency',
        credits: '4.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE204',
        name: 'Computer Networks & Internet Protocols',
        credits: '4.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE206',
        name: 'Theory of Computation & Automata',
        credits: '4.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE208',
        name: 'Software Engineering & Agile Methodologies',
        credits: '3.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE210',
        name: 'Full-Stack Development Lab (Next.js/Node)',
        credits: '2.0',
        grade: '—',
        status: 'Upcoming',
      },
    ],
    highlights: [
      {
        title: 'Kernel & Process Management',
        description:
          'Process scheduling, virtual memory management, thread synchronization, mutexes, and deadlocks.',
        tag: 'OPERATING SYSTEMS',
      },
      {
        title: 'Networking & Socket Layer',
        description:
          'OSI model, TCP/IP stack, routing protocols, HTTP/HTTPS handshake, and packet transmission analysis.',
        tag: 'NETWORKS',
      },
      {
        title: 'Formal Language Theory',
        description:
          'Finite automata, context-free grammars, Turing machines, decidability, and complexity classes.',
        tag: 'THEORY',
      },
    ],
    notes:
      'Core focus on foundational infrastructure: operating system kernels, distributed networks, and computational automata.',
    pageNumber: {
      left: 'PAGE 07',
      right: 'PAGE 08',
    },
  },
  {
    id: 'sem-05',
    semester: '05',
    semesterRoman: 'SEMESTER V',
    academicYear: '2026 — 2027',
    term: 'AUTUMN TERM',
    status: 'UPCOMING',
    degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    institution: 'ADAMAS UNIVERSITY',
    cgpa: '—',
    sgpa: '—',
    creditsEarned: '—',
    totalCredits: '—',
    subjects: [
      {
        code: 'CSE301',
        name: 'Artificial Intelligence & Machine Learning',
        credits: '4.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE303',
        name: 'Compiler Design & Syntax-Directed Translation',
        credits: '4.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE305',
        name: 'Information Security & Cryptography',
        credits: '3.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE307',
        name: 'Cloud Computing & Distributed Systems',
        credits: '3.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE309',
        name: 'Elective I: UI/UX Architecture & Microfrontends',
        credits: '3.0',
        grade: '—',
        status: 'Upcoming',
      },
    ],
    highlights: [
      {
        title: 'AI & Predictive Modeling',
        description:
          'Supervised/unsupervised learning, neural network topologies, gradient descent, and feature engineering.',
        tag: 'AI / ML',
      },
      {
        title: 'Cloud & Distributed Clusters',
        description:
          'Microservices architecture, containerization with Docker, serverless patterns, and cloud orchestration.',
        tag: 'CLOUD SYSTEMS',
      },
      {
        title: 'Applied Cryptography',
        description:
          'Symmetric/asymmetric encryption, hashing algorithms, digital signatures, and authentication security.',
        tag: 'SECURITY',
      },
    ],
    notes:
      'Entering advanced engineering specializations: Artificial Intelligence, Distributed Cloud systems, and secure architectures.',
    pageNumber: {
      left: 'PAGE 09',
      right: 'PAGE 10',
    },
  },
  {
    id: 'sem-06',
    semester: '06',
    semesterRoman: 'SEMESTER VI',
    academicYear: '2026 — 2027',
    term: 'SPRING TERM',
    status: 'UPCOMING',
    degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    institution: 'ADAMAS UNIVERSITY',
    cgpa: '—',
    sgpa: '—',
    creditsEarned: '—',
    totalCredits: '—',
    subjects: [
      {
        code: 'CSE302',
        name: 'Deep Learning & Neural Networks',
        credits: '4.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE304',
        name: 'Data Mining & Big Data Analytics',
        credits: '4.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE306',
        name: 'DevOps, CI/CD & Infrastructure as Code',
        credits: '3.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE308',
        name: 'Elective II: Natural Language Processing (NLP)',
        credits: '3.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE310',
        name: 'Mini Project & Industry Research Sprint',
        credits: '3.0',
        grade: '—',
        status: 'Upcoming',
      },
    ],
    highlights: [
      {
        title: 'Deep Learning & Transformers',
        description:
          'Convolutional architectures, sequence-to-sequence transformers, attention mechanisms, and model fine-tuning.',
        tag: 'DEEP LEARNING',
      },
      {
        title: 'Big Data Pipeline Engineering',
        description:
          'Distributed data processing, streaming event pipelines, ETL workflows, and large-scale analytical engines.',
        tag: 'DATA ENGINEERING',
      },
      {
        title: 'Production DevOps Workflows',
        description:
          'Automated CI/CD pipelines, container orchestration, telemetry monitoring, and immutable infrastructure.',
        tag: 'DEVOPS',
      },
    ],
    notes:
      'Advanced specializations with deep learning, natural language processing, and production-grade DevOps engineering.',
    pageNumber: {
      left: 'PAGE 11',
      right: 'PAGE 12',
    },
  },
  {
    id: 'sem-07',
    semester: '07',
    semesterRoman: 'SEMESTER VII',
    academicYear: '2027 — 2028',
    term: 'AUTUMN TERM',
    status: 'UPCOMING',
    degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    institution: 'ADAMAS UNIVERSITY',
    cgpa: '—',
    sgpa: '—',
    creditsEarned: '—',
    totalCredits: '—',
    subjects: [
      {
        code: 'CSE401',
        name: 'Major Capstone Project (Phase I)',
        credits: '6.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE403',
        name: 'Enterprise Software Architecture & Scalability',
        credits: '4.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE405',
        name: 'Elective III: Quantum Computing & Emerging Paradigms',
        credits: '3.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE407',
        name: 'Engineering Management & Entrepreneurship',
        credits: '3.0',
        grade: '—',
        status: 'Upcoming',
      },
    ],
    highlights: [
      {
        title: 'Major Capstone Phase I',
        description:
          'Architectural formulation, requirements research, system modeling, and prototype verification of capstone project.',
        tag: 'CAPSTONE',
      },
      {
        title: 'Enterprise Scalability',
        description:
          'High-throughput architectures, fault-tolerant distributed consensus, resilience patterns, and system benchmarks.',
        tag: 'ENTERPRISE',
      },
    ],
    notes:
      'Final year capstone engineering phase, enterprise software patterns, and applied technological innovation.',
    pageNumber: {
      left: 'PAGE 13',
      right: 'PAGE 14',
    },
  },
  {
    id: 'sem-08',
    semester: '08',
    semesterRoman: 'SEMESTER VIII',
    academicYear: '2027 — 2028',
    term: 'SPRING TERM',
    status: 'UPCOMING',
    degree: 'B.TECH COMPUTER SCIENCE & ENGINEERING',
    institution: 'ADAMAS UNIVERSITY',
    cgpa: '—',
    sgpa: '—',
    creditsEarned: '—',
    totalCredits: '—',
    subjects: [
      {
        code: 'CSE402',
        name: 'Major Capstone Project (Phase II / Defense)',
        credits: '8.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE404',
        name: 'Industry Internship / Technical Practicum',
        credits: '6.0',
        grade: '—',
        status: 'Upcoming',
      },
      {
        code: 'CSE406',
        name: 'Comprehensive Academic Viva & Portfolio Review',
        credits: '2.0',
        grade: '—',
        status: 'Upcoming',
      },
    ],
    highlights: [
      {
        title: 'Graduation & Capstone Defense',
        description:
          'Final engineering defense of major capstone project and comprehensive technical viva.',
        tag: 'GRADUATION',
      },
      {
        title: 'Industry Practicum',
        description:
          'Real-world software engineering deployment and production digital product delivery.',
        tag: 'INDUSTRY',
      },
    ],
    notes:
      'Culmination of undergraduate B.Tech Computer Science & Engineering journey at Adamas University, Class of 2028.',
    pageNumber: {
      left: 'PAGE 15',
      right: 'PAGE 16',
    },
  },
];
