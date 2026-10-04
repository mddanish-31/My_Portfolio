-- =========================================================================
-- MD. DANISH RAZA PORTFOLIO CMS — INITIAL DATA SEED (STEP 2C)
-- Seeds all 13 sections with default data (is_published = true)
-- =========================================================================

-- Section: settings
INSERT INTO public.portfolio_sections (section_id, data, is_published, updated_by)
VALUES (
  'settings',
  '{
  "siteTitle": "MD. DANISH RAZA — Full-Stack Developer",
  "siteName": "MD. DANISH RAZA Portfolio",
  "tagline": "Building digital experiences that look sharp and work beautifully.",
  "description": "Full-Stack Developer specializing in high-performance web applications, responsive user interfaces, and robust digital products.",
  "keywords": [
    "Md Danish Raza",
    "Full-Stack Developer",
    "Frontend Developer",
    "Next.js",
    "React",
    "TypeScript",
    "UI/UX Designer",
    "Portfolio",
    "AI/ML"
  ],
  "author": "Md. Danish Raza",
  "authorUrl": "https://mddanish.dev",
  "faviconUrl": "/icon.svg",
  "ogImageUrl": "/images/portrait/danish-portrait-2x.png",
  "twitterHandle": "@mddanish_dev",
  "locale": "en_US",
  "themeColor": "#050505",
  "statusBadge": {
    "text": "AVAILABLE FOR WORK",
    "available": true,
    "dotPulse": true
  },
  "socialLinks": {
    "github": "https://github.com/mddanish-31",
    "linkedin": "https://linkedin.com/in/mddanish",
    "twitter": "https://x.com/mddanish_dev",
    "instagram": "https://instagram.com/mddanish.dev",
    "email": "mddanish31.dev@gmail.com",
    "whatsapp": "https://wa.me/919876543210"
  }
}'::jsonb,
  true,
  'system-seed'
)
ON CONFLICT (section_id) DO UPDATE
SET data = EXCLUDED.data,
    is_published = true,
    updated_at = timezone('utc'::text, now());

-- Section: sections
INSERT INTO public.portfolio_sections (section_id, data, is_published, updated_by)
VALUES (
  'sections',
  '[
  {
    "id": "home",
    "name": "Home / Hero",
    "navLabel": "Home",
    "order": 1,
    "enabled": true,
    "inNavigation": true
  },
  {
    "id": "about",
    "name": "About Me",
    "navLabel": "About",
    "order": 2,
    "enabled": true,
    "inNavigation": true
  },
  {
    "id": "academic",
    "name": "Academic Yearbook",
    "navLabel": "Yearbook",
    "order": 3,
    "enabled": true,
    "inNavigation": true
  },
  {
    "id": "skills",
    "name": "Skills & Tech Stack",
    "navLabel": "Skills",
    "order": 4,
    "enabled": true,
    "inNavigation": true
  },
  {
    "id": "projects",
    "name": "Projects Showcase",
    "navLabel": "Work",
    "order": 5,
    "enabled": true,
    "inNavigation": true
  },
  {
    "id": "experience",
    "name": "Experience & Leadership",
    "navLabel": "Experience",
    "order": 6,
    "enabled": true,
    "inNavigation": true
  },
  {
    "id": "education",
    "name": "Academic Background",
    "navLabel": "Education",
    "order": 7,
    "enabled": true,
    "inNavigation": true
  },
  {
    "id": "availability",
    "name": "Internship Availability",
    "navLabel": "Availability",
    "order": 8,
    "enabled": true,
    "inNavigation": true
  },
  {
    "id": "contact",
    "name": "Let''s Connect",
    "navLabel": "Contact",
    "order": 9,
    "enabled": true,
    "inNavigation": true
  },
  {
    "id": "footer",
    "name": "Footer & Closing CTA",
    "navLabel": "Footer",
    "order": 10,
    "enabled": true,
    "inNavigation": false
  }
]'::jsonb,
  true,
  'system-seed'
)
ON CONFLICT (section_id) DO UPDATE
SET data = EXCLUDED.data,
    is_published = true,
    updated_at = timezone('utc'::text, now());

-- Section: navigation
INSERT INTO public.portfolio_sections (section_id, data, is_published, updated_by)
VALUES (
  'navigation',
  '{
  "brandName": "MD. DANISH RAZA",
  "statusBadge": {
    "text": "AVAILABLE FOR WORK",
    "href": "#contact"
  },
  "ctaButton": {
    "text": "LET''S TALK",
    "href": "#contact"
  },
  "links": [
    {
      "name": "Home",
      "href": "#home",
      "id": "home",
      "order": 1,
      "visible": true
    },
    {
      "name": "About",
      "href": "#about",
      "id": "about",
      "order": 2,
      "visible": true
    },
    {
      "name": "Yearbook",
      "href": "#academic",
      "id": "academic",
      "order": 3,
      "visible": true
    },
    {
      "name": "Skills",
      "href": "#skills",
      "id": "skills",
      "order": 4,
      "visible": true
    },
    {
      "name": "Work",
      "href": "#projects",
      "id": "projects",
      "order": 5,
      "visible": true
    },
    {
      "name": "Experience",
      "href": "#experience",
      "id": "experience",
      "order": 6,
      "visible": true
    },
    {
      "name": "Education",
      "href": "#education",
      "id": "education",
      "order": 7,
      "visible": true
    },
    {
      "name": "Availability",
      "href": "#availability",
      "id": "availability",
      "order": 8,
      "visible": true
    },
    {
      "name": "Contact",
      "href": "#contact",
      "id": "contact",
      "order": 9,
      "visible": true
    }
  ]
}'::jsonb,
  true,
  'system-seed'
)
ON CONFLICT (section_id) DO UPDATE
SET data = EXCLUDED.data,
    is_published = true,
    updated_at = timezone('utc'::text, now());

-- Section: home
INSERT INTO public.portfolio_sections (section_id, data, is_published, updated_by)
VALUES (
  'home',
  '{
  "eyebrow": "Hello, I''m",
  "firstName": "MD.",
  "lastName": "DANISH RAZA",
  "fullName": "Md. Danish Raza",
  "role": "FULL-STACK DEVELOPER",
  "subtitle": "CREATIVE DESIGNER & DIGITAL PROFESSIONAL",
  "tagline": "Building digital experiences that look sharp and work beautifully.",
  "location": "INDIA",
  "portraitUrl": "/images/portrait/danish-portrait-2x.png",
  "posterText": "PORTFOLIO",
  "primaryCta": {
    "label": "View My Work",
    "href": "#projects"
  },
  "secondaryCta": {
    "label": "Let''s Talk",
    "href": "#contact"
  },
  "metadata": {
    "currently": {
      "label": "CURRENTLY",
      "items": [
        "UNDERGRADUATE",
        "B.TECH CSE"
      ]
    },
    "graduating": {
      "label": "GRADUATING",
      "items": [
        "CLASS OF",
        "2028"
      ]
    },
    "focusedOn": {
      "label": "FOCUSED ON",
      "value": "FULL-STACK + AI/ML"
    },
    "openFor": {
      "label": "OPEN FOR",
      "items": [
        "INTERNSHIPS &",
        "FREELANCE"
      ]
    }
  }
}'::jsonb,
  true,
  'system-seed'
)
ON CONFLICT (section_id) DO UPDATE
SET data = EXCLUDED.data,
    is_published = true,
    updated_at = timezone('utc'::text, now());

-- Section: about
INSERT INTO public.portfolio_sections (section_id, data, is_published, updated_by)
VALUES (
  'about',
  '{
  "chapter": "CHAPTER 01",
  "eyebrow": "PROFILE & PURPOSE",
  "headline": "WHO I AM & WHAT DRIVES ME",
  "subheading": "A curated summary of my background, focus, creative curiosity, and software engineering philosophy.",
  "slides": [
    {
      "id": "who-i-am",
      "number": "01",
      "category": "PROFILE",
      "title": "WHO I AM",
      "text": "Hi, I''m MD. Danish Raza — a Computer Science undergraduate who enjoys turning ideas into thoughtful digital experiences through code, design, and technology.",
      "bottomLabel": "FULL-STACK DEVELOPER",
      "order": 1,
      "visible": true
    },
    {
      "id": "education",
      "number": "02",
      "category": "ACADEMICS",
      "title": "EDUCATION",
      "text": "Building a strong foundation in computer science, software engineering principles, and emerging technologies.",
      "bottomLabel": "ADAMAS UNIVERSITY • CLASS OF 2028",
      "educationDetails": {
        "degree": "B.TECH COMPUTER SCIENCE & ENGINEERING",
        "institution": "ADAMAS UNIVERSITY",
        "cohort": "CLASS OF 2028"
      },
      "order": 2,
      "visible": true
    },
    {
      "id": "what-i-do",
      "number": "03",
      "category": "CAPABILITIES",
      "title": "WHAT I DO",
      "text": "Focused on engineering high-performance web applications, modern interfaces, and scalable digital products.",
      "bottomLabel": "ENGINEERING & DESIGN",
      "keywords": [
        "FULL-STACK DEVELOPMENT",
        "AI / ML",
        "UI / UX",
        "DIGITAL PRODUCTS"
      ],
      "order": 3,
      "visible": true
    },
    {
      "id": "my-journey",
      "number": "04",
      "category": "TRAJECTORY",
      "title": "MY JOURNEY",
      "text": "From learning the fundamentals of programming to building real projects, experimenting with new technologies, and turning ideas into working products.",
      "bottomLabel": "CONTINUOUS EVOLUTION",
      "order": 4,
      "visible": true
    },
    {
      "id": "beyond-code",
      "number": "05",
      "category": "PERSPECTIVE",
      "title": "BEYOND CODE",
      "text": "Curious by nature, I enjoy travelling, exploring new ideas, learning continuously, and finding creative ways to solve problems.",
      "bottomLabel": "CREATIVE CURIOSITY",
      "order": 5,
      "visible": true
    },
    {
      "id": "current-focus",
      "number": "06",
      "category": "ASPIRATIONS",
      "title": "CURRENT FOCUS",
      "text": "Currently focused on becoming a stronger full-stack developer while exploring AI/ML and building meaningful digital products.",
      "bottomLabel": "NEXT HORIZONS",
      "order": 6,
      "visible": true
    }
  ],
  "quote": {
    "text": "Great design and clean architecture do not just look good — they communicate, connect, and drive real results.",
    "author": "Md. Danish",
    "role": "Full-Stack Developer"
  }
}'::jsonb,
  true,
  'system-seed'
)
ON CONFLICT (section_id) DO UPDATE
SET data = EXCLUDED.data,
    is_published = true,
    updated_at = timezone('utc'::text, now());

-- Section: academic
INSERT INTO public.portfolio_sections (section_id, data, is_published, updated_by)
VALUES (
  'academic',
  '{
  "chapter": "CHAPTER 02",
  "eyebrow": "ACADEMIC YEARBOOK",
  "heading": [
    "SEMESTER",
    "ARCHIVE",
    "CHRONICLE."
  ],
  "subheading": "A comprehensive semester-by-semester academic record documenting coursework, performance, and key milestones.",
  "institution": "ADAMAS UNIVERSITY",
  "degree": "B.TECH COMPUTER SCIENCE & ENGINEERING",
  "records": [
    {
      "id": "sem-01",
      "semester": "01",
      "semesterRoman": "SEMESTER I",
      "academicYear": "2024 — 2025",
      "term": "AUTUMN TERM",
      "status": "IN PROGRESS",
      "degree": "B.TECH COMPUTER SCIENCE & ENGINEERING",
      "institution": "ADAMAS UNIVERSITY",
      "cgpa": "—",
      "sgpa": "—",
      "creditsEarned": "—",
      "totalCredits": "—",
      "subjects": [
        {
          "code": "CSE101",
          "name": "Programming Fundamentals & Problem Solving in C",
          "credits": "4.0",
          "grade": "—",
          "status": "In Progress"
        },
        {
          "code": "MAT101",
          "name": "Calculus & Linear Algebra for Engineers",
          "credits": "4.0",
          "grade": "—",
          "status": "In Progress"
        },
        {
          "code": "PHY101",
          "name": "Engineering Physics & Semiconductor Devices",
          "credits": "3.0",
          "grade": "—",
          "status": "In Progress"
        },
        {
          "code": "EEE101",
          "name": "Basic Electrical & Electronics Engineering",
          "credits": "3.0",
          "grade": "—",
          "status": "In Progress"
        },
        {
          "code": "ENG101",
          "name": "Technical Communication & Professional Ethics",
          "credits": "2.0",
          "grade": "—",
          "status": "In Progress"
        }
      ],
      "highlights": [
        {
          "title": "Core Programming Foundation",
          "description": "Deep dive into structured problem solving, memory models, pointers, and foundational algorithm design.",
          "tag": "CORE CS"
        },
        {
          "title": "Mathematical Rigor",
          "description": "Applied linear algebra and vector calculus essential for future computational systems and algorithms.",
          "tag": "MATHEMATICS"
        },
        {
          "title": "Engineering Induction",
          "description": "Initiated undergraduate engineering curriculum at Adamas University, building practical technical habits.",
          "tag": "MILESTONE"
        }
      ],
      "notes": "Semester focus centers on strengthening foundational computer science concepts, low-level execution logic, and engineering mathematics.",
      "pageNumber": {
        "left": "PAGE 01",
        "right": "PAGE 02"
      },
      "order": 1,
      "visible": true
    },
    {
      "id": "sem-02",
      "semester": "02",
      "semesterRoman": "SEMESTER II",
      "academicYear": "2024 — 2025",
      "term": "SPRING TERM",
      "status": "UPCOMING",
      "degree": "B.TECH COMPUTER SCIENCE & ENGINEERING",
      "institution": "ADAMAS UNIVERSITY",
      "cgpa": "—",
      "sgpa": "—",
      "creditsEarned": "—",
      "totalCredits": "—",
      "subjects": [
        {
          "code": "CSE102",
          "name": "Object-Oriented Programming (OOP) & Design",
          "credits": "4.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE104",
          "name": "Data Structures & Algorithmic Analysis",
          "credits": "4.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "MAT102",
          "name": "Discrete Mathematics & Graph Theory",
          "credits": "4.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "ECE102",
          "name": "Digital Logic Design & Computer Arithmetic",
          "credits": "3.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "ENV101",
          "name": "Environmental Science & Sustainable Technology",
          "credits": "2.0",
          "grade": "—",
          "status": "Upcoming"
        }
      ],
      "highlights": [
        {
          "title": "Data Structures & Abstractions",
          "description": "Mastering linear and non-linear data structures, asymptotic notation, and efficient object-oriented architectures.",
          "tag": "ALGORITHMS"
        },
        {
          "title": "Discrete Math & Logic",
          "description": "Set theory, logic gates, combinatorics, and discrete structures supporting advanced computational theory.",
          "tag": "THEORY"
        },
        {
          "title": "Hardware-Software Interfacing",
          "description": "Understanding Boolean algebra, digital circuitry, and foundational processor logic units.",
          "tag": "HARDWARE"
        }
      ],
      "notes": "Transitioning to algorithmic complexity, abstract data types, and the mathematical foundations of computer science.",
      "pageNumber": {
        "left": "PAGE 03",
        "right": "PAGE 04"
      },
      "order": 2,
      "visible": true
    },
    {
      "id": "sem-03",
      "semester": "03",
      "semesterRoman": "SEMESTER III",
      "academicYear": "2025 — 2026",
      "term": "AUTUMN TERM",
      "status": "UPCOMING",
      "degree": "B.TECH COMPUTER SCIENCE & ENGINEERING",
      "institution": "ADAMAS UNIVERSITY",
      "cgpa": "—",
      "sgpa": "—",
      "creditsEarned": "—",
      "totalCredits": "—",
      "subjects": [
        {
          "code": "CSE201",
          "name": "Design & Analysis of Algorithms",
          "credits": "4.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE203",
          "name": "Computer Organization & Architecture",
          "credits": "4.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE205",
          "name": "Database Management Systems (DBMS)",
          "credits": "4.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "MAT201",
          "name": "Probability, Statistics & Stochastic Processes",
          "credits": "3.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE207",
          "name": "Web Engineering & Modern Frontend Stacks",
          "credits": "3.0",
          "grade": "—",
          "status": "Upcoming"
        }
      ],
      "highlights": [
        {
          "title": "Algorithmic Optimization",
          "description": "Divide and conquer, greedy paradigms, dynamic programming, and amortized runtime complexity analysis.",
          "tag": "ADVANCED CS"
        },
        {
          "title": "Relational & Scalable Databases",
          "description": "SQL querying, indexing, transaction processing, ACID guarantees, and database schema normal forms.",
          "tag": "DATABASES"
        },
        {
          "title": "Processor Architecture",
          "description": "Instruction pipeline design, memory hierarchy, cache coherence, and microarchitectural organization.",
          "tag": "SYSTEMS"
        }
      ],
      "notes": "Deepening system design, database architecture, and advanced algorithmic problem-solving competencies.",
      "pageNumber": {
        "left": "PAGE 05",
        "right": "PAGE 06"
      },
      "order": 3,
      "visible": true
    },
    {
      "id": "sem-04",
      "semester": "04",
      "semesterRoman": "SEMESTER IV",
      "academicYear": "2025 — 2026",
      "term": "SPRING TERM",
      "status": "UPCOMING",
      "degree": "B.TECH COMPUTER SCIENCE & ENGINEERING",
      "institution": "ADAMAS UNIVERSITY",
      "cgpa": "—",
      "sgpa": "—",
      "creditsEarned": "—",
      "totalCredits": "—",
      "subjects": [
        {
          "code": "CSE202",
          "name": "Operating Systems & Concurrency",
          "credits": "4.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE204",
          "name": "Computer Networks & Internet Protocols",
          "credits": "4.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE206",
          "name": "Theory of Computation & Automata",
          "credits": "4.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE208",
          "name": "Software Engineering & Agile Methodologies",
          "credits": "3.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE210",
          "name": "Full-Stack Development Lab (Next.js/Node)",
          "credits": "2.0",
          "grade": "—",
          "status": "Upcoming"
        }
      ],
      "highlights": [
        {
          "title": "Kernel & Process Management",
          "description": "Process scheduling, virtual memory management, thread synchronization, mutexes, and deadlocks.",
          "tag": "OPERATING SYSTEMS"
        },
        {
          "title": "Networking & Socket Layer",
          "description": "OSI model, TCP/IP stack, routing protocols, HTTP/HTTPS handshake, and packet transmission analysis.",
          "tag": "NETWORKS"
        },
        {
          "title": "Formal Language Theory",
          "description": "Finite automata, context-free grammars, Turing machines, decidability, and complexity classes.",
          "tag": "THEORY"
        }
      ],
      "notes": "Core focus on foundational infrastructure: operating system kernels, distributed networks, and computational automata.",
      "pageNumber": {
        "left": "PAGE 07",
        "right": "PAGE 08"
      },
      "order": 4,
      "visible": true
    },
    {
      "id": "sem-05",
      "semester": "05",
      "semesterRoman": "SEMESTER V",
      "academicYear": "2026 — 2027",
      "term": "AUTUMN TERM",
      "status": "UPCOMING",
      "degree": "B.TECH COMPUTER SCIENCE & ENGINEERING",
      "institution": "ADAMAS UNIVERSITY",
      "cgpa": "—",
      "sgpa": "—",
      "creditsEarned": "—",
      "totalCredits": "—",
      "subjects": [
        {
          "code": "CSE301",
          "name": "Artificial Intelligence & Machine Learning",
          "credits": "4.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE303",
          "name": "Compiler Design & Syntax-Directed Translation",
          "credits": "4.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE305",
          "name": "Information Security & Cryptography",
          "credits": "3.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE307",
          "name": "Cloud Computing & Distributed Systems",
          "credits": "3.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE309",
          "name": "Elective I: UI/UX Architecture & Microfrontends",
          "credits": "3.0",
          "grade": "—",
          "status": "Upcoming"
        }
      ],
      "highlights": [
        {
          "title": "AI & Predictive Modeling",
          "description": "Supervised/unsupervised learning, neural network topologies, gradient descent, and feature engineering.",
          "tag": "AI / ML"
        },
        {
          "title": "Cloud & Distributed Clusters",
          "description": "Microservices architecture, containerization with Docker, serverless patterns, and cloud orchestration.",
          "tag": "CLOUD SYSTEMS"
        },
        {
          "title": "Applied Cryptography",
          "description": "Symmetric/asymmetric encryption, hashing algorithms, digital signatures, and authentication security.",
          "tag": "SECURITY"
        }
      ],
      "notes": "Entering advanced engineering specializations: Artificial Intelligence, Distributed Cloud systems, and secure architectures.",
      "pageNumber": {
        "left": "PAGE 09",
        "right": "PAGE 10"
      },
      "order": 5,
      "visible": true
    },
    {
      "id": "sem-06",
      "semester": "06",
      "semesterRoman": "SEMESTER VI",
      "academicYear": "2026 — 2027",
      "term": "SPRING TERM",
      "status": "UPCOMING",
      "degree": "B.TECH COMPUTER SCIENCE & ENGINEERING",
      "institution": "ADAMAS UNIVERSITY",
      "cgpa": "—",
      "sgpa": "—",
      "creditsEarned": "—",
      "totalCredits": "—",
      "subjects": [
        {
          "code": "CSE302",
          "name": "Deep Learning & Neural Networks",
          "credits": "4.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE304",
          "name": "Data Mining & Big Data Analytics",
          "credits": "4.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE306",
          "name": "DevOps, CI/CD & Infrastructure as Code",
          "credits": "3.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE308",
          "name": "Elective II: Natural Language Processing (NLP)",
          "credits": "3.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE310",
          "name": "Mini Project & Industry Research Sprint",
          "credits": "3.0",
          "grade": "—",
          "status": "Upcoming"
        }
      ],
      "highlights": [
        {
          "title": "Deep Learning & Transformers",
          "description": "Convolutional architectures, sequence-to-sequence transformers, attention mechanisms, and model fine-tuning.",
          "tag": "DEEP LEARNING"
        },
        {
          "title": "Big Data Pipeline Engineering",
          "description": "Distributed data processing, streaming event pipelines, ETL workflows, and large-scale analytical engines.",
          "tag": "DATA ENGINEERING"
        },
        {
          "title": "Production DevOps Workflows",
          "description": "Automated CI/CD pipelines, container orchestration, telemetry monitoring, and immutable infrastructure.",
          "tag": "DEVOPS"
        }
      ],
      "notes": "Advanced specializations with deep learning, natural language processing, and production-grade DevOps engineering.",
      "pageNumber": {
        "left": "PAGE 11",
        "right": "PAGE 12"
      },
      "order": 6,
      "visible": true
    },
    {
      "id": "sem-07",
      "semester": "07",
      "semesterRoman": "SEMESTER VII",
      "academicYear": "2027 — 2028",
      "term": "AUTUMN TERM",
      "status": "UPCOMING",
      "degree": "B.TECH COMPUTER SCIENCE & ENGINEERING",
      "institution": "ADAMAS UNIVERSITY",
      "cgpa": "—",
      "sgpa": "—",
      "creditsEarned": "—",
      "totalCredits": "—",
      "subjects": [
        {
          "code": "CSE401",
          "name": "Major Capstone Project (Phase I)",
          "credits": "6.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE403",
          "name": "Enterprise Software Architecture & Scalability",
          "credits": "4.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE405",
          "name": "Elective III: Quantum Computing & Emerging Paradigms",
          "credits": "3.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE407",
          "name": "Engineering Management & Entrepreneurship",
          "credits": "3.0",
          "grade": "—",
          "status": "Upcoming"
        }
      ],
      "highlights": [
        {
          "title": "Major Capstone Phase I",
          "description": "Architectural formulation, requirements research, system modeling, and prototype verification of capstone project.",
          "tag": "CAPSTONE"
        },
        {
          "title": "Enterprise Scalability",
          "description": "High-throughput architectures, fault-tolerant distributed consensus, resilience patterns, and system benchmarks.",
          "tag": "ENTERPRISE"
        }
      ],
      "notes": "Final year capstone engineering phase, enterprise software patterns, and applied technological innovation.",
      "pageNumber": {
        "left": "PAGE 13",
        "right": "PAGE 14"
      },
      "order": 7,
      "visible": true
    },
    {
      "id": "sem-08",
      "semester": "08",
      "semesterRoman": "SEMESTER VIII",
      "academicYear": "2027 — 2028",
      "term": "SPRING TERM",
      "status": "UPCOMING",
      "degree": "B.TECH COMPUTER SCIENCE & ENGINEERING",
      "institution": "ADAMAS UNIVERSITY",
      "cgpa": "—",
      "sgpa": "—",
      "creditsEarned": "—",
      "totalCredits": "—",
      "subjects": [
        {
          "code": "CSE402",
          "name": "Major Capstone Project (Phase II / Defense)",
          "credits": "8.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE404",
          "name": "Industry Internship / Technical Practicum",
          "credits": "6.0",
          "grade": "—",
          "status": "Upcoming"
        },
        {
          "code": "CSE406",
          "name": "Comprehensive Academic Viva & Portfolio Review",
          "credits": "2.0",
          "grade": "—",
          "status": "Upcoming"
        }
      ],
      "highlights": [
        {
          "title": "Graduation & Capstone Defense",
          "description": "Final engineering defense of major capstone project and comprehensive technical viva.",
          "tag": "GRADUATION"
        },
        {
          "title": "Industry Practicum",
          "description": "Real-world software engineering deployment and production digital product delivery.",
          "tag": "INDUSTRY"
        }
      ],
      "notes": "Culmination of undergraduate B.Tech Computer Science & Engineering journey at Adamas University, Class of 2028.",
      "pageNumber": {
        "left": "PAGE 15",
        "right": "PAGE 16"
      },
      "order": 8,
      "visible": true
    }
  ]
}'::jsonb,
  true,
  'system-seed'
)
ON CONFLICT (section_id) DO UPDATE
SET data = EXCLUDED.data,
    is_published = true,
    updated_at = timezone('utc'::text, now());

-- Section: skills
INSERT INTO public.portfolio_sections (section_id, data, is_published, updated_by)
VALUES (
  'skills',
  '{
  "chapter": "CHAPTER 03",
  "eyebrow": "TECHNICAL DNA",
  "heading": [
    "TECH STACK",
    "& CORE",
    "COMPETENCIES."
  ],
  "subheading": "A comprehensive matrix of programming languages, full-stack frameworks, databases, and developer tooling.",
  "categories": [
    {
      "id": "development",
      "num": "01",
      "name": "DEVELOPMENT",
      "label": "Full-Stack Web Architecture",
      "description": "Modern frameworks, libraries, and runtime environments for building end-to-end web applications.",
      "order": 1,
      "visible": true
    },
    {
      "id": "languages",
      "num": "02",
      "name": "LANGUAGES",
      "label": "Programming & Scripting",
      "description": "Core compiled and interpreted languages for web systems, algorithms, and computer science foundations.",
      "order": 2,
      "visible": true
    },
    {
      "id": "aiml",
      "num": "03",
      "name": "AI / ML",
      "label": "Computer Vision & Intelligent Systems",
      "description": "Computer vision, gesture tracking, machine learning foundations, and AI API integrations.",
      "order": 3,
      "visible": true
    },
    {
      "id": "databases",
      "num": "04",
      "name": "DATABASES",
      "label": "Data Storage & ORM",
      "description": "Relational and document databases with schema design, indexing, and query operations.",
      "order": 4,
      "visible": true
    },
    {
      "id": "tools",
      "num": "05",
      "name": "TOOLS & PLATFORMS",
      "label": "DevOps & Tooling Ecosystem",
      "description": "Version control, cloud deployment, container workflows, and developer productivity tools.",
      "order": 5,
      "visible": true
    },
    {
      "id": "design",
      "num": "06",
      "name": "UI / UX DESIGN",
      "label": "Design Systems & Interfaces",
      "description": "Visual hierarchy, liquid-glass aesthetics, component tokens, and responsive layout prototyping.",
      "order": 6,
      "visible": true
    }
  ],
  "skills": [
    {
      "id": "react",
      "name": "React",
      "category": "development",
      "categoryLabel": "DEVELOPMENT",
      "level": "Intermediate",
      "role": "FRONTEND LIBRARY",
      "description": "Building interactive and responsive interfaces with modular component architecture and declarative UI paradigms.",
      "usage": [
        "Reusable modular component systems",
        "State management with hooks and context",
        "High-performance virtual DOM rendering",
        "Fluid interactive micro-animations"
      ],
      "related": [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Node.js"
      ],
      "iconType": "react",
      "order": 1,
      "visible": true
    },
    {
      "id": "nextjs",
      "name": "Next.js",
      "category": "development",
      "categoryLabel": "DEVELOPMENT",
      "level": "Intermediate",
      "role": "FULL-STACK FRAMEWORK",
      "description": "Production React framework using App Router for server-side rendering, route handlers, and performance optimization.",
      "usage": [
        "Server-Side Rendering (SSR) & Static Generation",
        "App Router architecture & Route Handlers",
        "Image, font, and script optimization",
        "Full-stack API endpoints & middleware"
      ],
      "related": [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Vercel"
      ],
      "iconType": "nextjs",
      "order": 2,
      "visible": true
    },
    {
      "id": "typescript",
      "name": "TypeScript",
      "category": "development",
      "categoryLabel": "DEVELOPMENT",
      "level": "Intermediate",
      "role": "TYPED JAVASCRIPT",
      "description": "Strict type safety layer across frontend and backend codebases, preventing runtime bugs and enhancing DX.",
      "usage": [
        "Strict interfaces and generic data types",
        "End-to-end API response contract validation",
        "Component prop validation & type safety",
        "Refactor confidence in growing codebases"
      ],
      "related": [
        "React",
        "Next.js",
        "Node.js",
        "Express.js"
      ],
      "iconType": "typescript",
      "order": 3,
      "visible": true
    },
    {
      "id": "nodejs",
      "name": "Node.js",
      "category": "development",
      "categoryLabel": "DEVELOPMENT",
      "level": "Intermediate",
      "role": "BACKEND RUNTIME",
      "description": "Asynchronous event-driven runtime used for building scalable server-side applications and RESTful APIs.",
      "usage": [
        "Asynchronous non-blocking I/O operations",
        "REST API server implementations",
        "Authentication, JWT, and session workflows",
        "Utility scripts and background processes"
      ],
      "related": [
        "Express.js",
        "MongoDB",
        "TypeScript",
        "Postman"
      ],
      "iconType": "nodejs",
      "order": 4,
      "visible": true
    },
    {
      "id": "express",
      "name": "Express.js",
      "category": "development",
      "categoryLabel": "DEVELOPMENT",
      "level": "Intermediate",
      "role": "WEB BACKEND FRAMEWORK",
      "description": "Minimalist web framework for Node.js powering modular routing, middleware pipelines, and API services.",
      "usage": [
        "Modular RESTful routing architecture",
        "Custom middleware for auth, CORS & logging",
        "Error handling and centralized controllers",
        "Database integration with Mongoose & Prisma"
      ],
      "related": [
        "Node.js",
        "MongoDB",
        "TypeScript",
        "Postman"
      ],
      "iconType": "express",
      "order": 5,
      "visible": true
    },
    {
      "id": "tailwind",
      "name": "Tailwind CSS",
      "category": "development",
      "categoryLabel": "DEVELOPMENT",
      "level": "Advanced",
      "role": "UTILITY-FIRST CSS",
      "description": "Utility CSS framework used for building custom design systems, liquid-glass cards, and responsive layouts.",
      "usage": [
        "Custom design token implementation",
        "Liquid-glass styling & backdrop blur filters",
        "Mobile-first responsive layout grids",
        "Fast compilation with JIT engine"
      ],
      "related": [
        "React",
        "Next.js",
        "Figma",
        "TypeScript"
      ],
      "iconType": "tailwind",
      "order": 6,
      "visible": true
    },
    {
      "id": "lang-python",
      "name": "Python",
      "category": "languages",
      "categoryLabel": "LANGUAGES",
      "level": "Advanced",
      "role": "GENERAL PURPOSE & SCRIPTING",
      "description": "Versatile language used for scripting, data analysis, computer vision experimentation, and academic projects.",
      "usage": [
        "Automation scripts and data processing",
        "Computer vision with OpenCV & MediaPipe",
        "Algorithm testing and rapid prototyping"
      ],
      "related": [
        "OpenCV",
        "MediaPipe",
        "C++",
        "Java"
      ],
      "iconType": "python",
      "order": 7,
      "visible": true
    },
    {
      "id": "lang-javascript",
      "name": "JavaScript (ES6+)",
      "category": "languages",
      "categoryLabel": "LANGUAGES",
      "level": "Advanced",
      "role": "CORE WEB LANGUAGE",
      "description": "Deep understanding of modern ECMAScript standards, asynchronous promises, event loop, and browser DOM APIs.",
      "usage": [
        "Async/await, Promises, and fetch pipelines",
        "Functional array methods and destructuring",
        "Browser Web APIs and event handling"
      ],
      "related": [
        "TypeScript",
        "React",
        "Node.js",
        "Tailwind CSS"
      ],
      "iconType": "javascript",
      "order": 8,
      "visible": true
    },
    {
      "id": "lang-typescript",
      "name": "TypeScript",
      "category": "languages",
      "categoryLabel": "LANGUAGES",
      "level": "Intermediate",
      "role": "TYPED SCRIPTING",
      "description": "Primary language for modern web applications, combining JavaScript flexibility with compile-time type safety.",
      "usage": [
        "Type definitions, Discriminated Unions & Generics",
        "Strict compiler configuration",
        "Full-stack type sharing between client and server"
      ],
      "related": [
        "JavaScript",
        "React",
        "Node.js",
        "Next.js"
      ],
      "iconType": "typescript",
      "order": 9,
      "visible": true
    },
    {
      "id": "lang-cpp",
      "name": "C++",
      "category": "languages",
      "categoryLabel": "LANGUAGES",
      "level": "Intermediate",
      "role": "OBJECT-ORIENTED SYSTEMS",
      "description": "High-performance programming language used for Object-Oriented Programming (OOP) and algorithmic problem solving.",
      "usage": [
        "OOP principles: Encapsulation, Inheritance, Polymorphism",
        "Standard Template Library (STL) data structures",
        "Algorithm analysis and computational logic"
      ],
      "related": [
        "C",
        "Java",
        "Python"
      ],
      "iconType": "cpp",
      "order": 10,
      "visible": true
    },
    {
      "id": "lang-java",
      "name": "Java",
      "category": "languages",
      "categoryLabel": "LANGUAGES",
      "level": "Intermediate",
      "role": "OBJECT-ORIENTED LANGUAGE",
      "description": "Class-based object-oriented programming language studied for robust software design and JVM architectures.",
      "usage": [
        "Class hierarchies, interfaces, and abstractions",
        "Exception handling and multi-threading basics",
        "Data structures and design patterns"
      ],
      "related": [
        "C++",
        "Python",
        "TypeScript"
      ],
      "iconType": "java",
      "order": 11,
      "visible": true
    },
    {
      "id": "lang-c",
      "name": "C",
      "category": "languages",
      "categoryLabel": "LANGUAGES",
      "level": "Intermediate",
      "role": "SYSTEMS PROGRAMMING",
      "description": "Foundational language studied for low-level memory management, pointers, and fundamental data structures.",
      "usage": [
        "Pointers, dynamic memory allocation & structs",
        "Fundamental algorithm implementations",
        "Core academic problem solving"
      ],
      "related": [
        "C++",
        "Python",
        "Java"
      ],
      "iconType": "c",
      "order": 12,
      "visible": true
    },
    {
      "id": "ai-python",
      "name": "Python",
      "category": "aiml",
      "categoryLabel": "AI / ML",
      "level": "Advanced",
      "role": "AI / ML FOUNDATION",
      "description": "Core environment for numerical computations, data manipulation, and computer vision scripting.",
      "usage": [
        "NumPy array operations and matrix calculations",
        "Data preprocessing and transformation pipelines",
        "Scripting image and video processing workflows"
      ],
      "related": [
        "OpenCV",
        "MediaPipe",
        "AI / ML Foundations"
      ],
      "iconType": "python",
      "order": 13,
      "visible": true
    },
    {
      "id": "ai-opencv",
      "name": "OpenCV",
      "category": "aiml",
      "categoryLabel": "AI / ML",
      "level": "Intermediate",
      "role": "COMPUTER VISION",
      "description": "Open-source computer vision library used for real-time image processing, filtering, and video frame analysis.",
      "usage": [
        "Image color space conversion and thresholding",
        "Contour detection and edge analysis",
        "Real-time webcam video stream processing"
      ],
      "related": [
        "Python",
        "MediaPipe",
        "AI / ML Foundations"
      ],
      "iconType": "opencv",
      "order": 14,
      "visible": true
    },
    {
      "id": "ai-mediapipe",
      "name": "MediaPipe",
      "category": "aiml",
      "categoryLabel": "AI / ML",
      "level": "Intermediate",
      "role": "GESTURE & VISION PIPELINES",
      "description": "Framework by Google for building multimodal real-time vision pipelines such as hand landmark detection and pose estimation.",
      "usage": [
        "Hand landmark tracking (21 3D points)",
        "Real-time gesture recognition experiments",
        "Facial and pose landmark detection"
      ],
      "related": [
        "OpenCV",
        "Python",
        "AI / ML Foundations"
      ],
      "iconType": "mediapipe",
      "order": 15,
      "visible": true
    },
    {
      "id": "ai-foundations",
      "name": "AI / ML Foundations",
      "category": "aiml",
      "categoryLabel": "AI / ML",
      "level": "Intermediate",
      "role": "THEORY & MODELS",
      "description": "Understanding core machine learning principles, classification/regression models, and neural network basics.",
      "usage": [
        "Supervised learning workflows (Linear/Logistic Regression)",
        "Model evaluation metrics (Accuracy, Precision, Recall)",
        "Neural network fundamentals and activation functions"
      ],
      "related": [
        "Python",
        "OpenCV",
        "LLM & AI APIs"
      ],
      "iconType": "neural",
      "order": 16,
      "visible": true
    },
    {
      "id": "ai-llm-api",
      "name": "LLM & AI APIs",
      "category": "aiml",
      "categoryLabel": "AI / ML",
      "level": "Beginner",
      "role": "INTELLIGENT INTEGRATION",
      "description": "Integrating generative AI capabilities into modern web applications via structured prompts and streaming SDKs.",
      "usage": [
        "Structured prompt design and deterministic JSON output",
        "Streaming responses to Next.js user interfaces",
        "Context-aware assistant and data extraction tools"
      ],
      "related": [
        "Next.js",
        "TypeScript",
        "Node.js"
      ],
      "iconType": "sparkles",
      "order": 17,
      "visible": true
    },
    {
      "id": "db-mongodb",
      "name": "MongoDB",
      "category": "databases",
      "categoryLabel": "DATABASES",
      "level": "Intermediate",
      "role": "NO-SQL DOCUMENT DATABASE",
      "description": "Document database for dynamic content schemas, user authentication records, and JSON-based application data.",
      "usage": [
        "Schema modeling with Mongoose schemas",
        "Document indexing for query performance",
        "Cloud database management on MongoDB Atlas"
      ],
      "related": [
        "Node.js",
        "Express.js",
        "Prisma ORM"
      ],
      "iconType": "mongodb",
      "order": 18,
      "visible": true
    },
    {
      "id": "db-mysql",
      "name": "MySQL",
      "category": "databases",
      "categoryLabel": "DATABASES",
      "level": "Intermediate",
      "role": "RELATIONAL SQL ENGINE",
      "description": "Relational database system studied in academic curriculum for table normalization, relational algebra, and ACID integrity.",
      "usage": [
        "Normalized schema architectures (1NF to 3NF)",
        "Foreign keys, relational joins, and constraints",
        "Transaction rollbacks and commit management"
      ],
      "related": [
        "PostgreSQL",
        "Prisma ORM",
        "Node.js"
      ],
      "iconType": "mysql",
      "order": 19,
      "visible": true
    },
    {
      "id": "db-postgresql",
      "name": "PostgreSQL",
      "category": "databases",
      "categoryLabel": "DATABASES",
      "level": "Intermediate",
      "role": "RELATIONAL DATABASE (ACID)",
      "description": "Advanced open-source relational database used for structured data schemas and dependable transactional integrity.",
      "usage": [
        "Complex joins and filtered analytical queries",
        "Connection pooling with Prisma and cloud providers",
        "Relational constraints and indexing strategies"
      ],
      "related": [
        "MySQL",
        "Prisma ORM",
        "Node.js"
      ],
      "iconType": "postgresql",
      "order": 20,
      "visible": true
    },
    {
      "id": "db-prisma",
      "name": "Prisma ORM",
      "category": "databases",
      "categoryLabel": "DATABASES",
      "level": "Intermediate",
      "role": "TYPE-SAFE ORM",
      "description": "Next-generation TypeScript ORM providing auto-generated types, declarative schema modeling, and safe migrations.",
      "usage": [
        "Declarative schema modeling in schema.prisma",
        "Auto-generated typed client queries",
        "Automated schema migrations and database seeding"
      ],
      "related": [
        "PostgreSQL",
        "MySQL",
        "TypeScript",
        "Next.js"
      ],
      "iconType": "prisma",
      "order": 21,
      "visible": true
    },
    {
      "id": "db-redis",
      "name": "Redis",
      "category": "databases",
      "categoryLabel": "DATABASES",
      "level": "Beginner",
      "role": "IN-MEMORY STORE",
      "description": "In-memory key-value data structure store used for caching API responses, rate limiting, and temporary state.",
      "usage": [
        "Key-value caching with TTL expiration",
        "API rate limiting and session storage",
        "Fast retrieval for high-frequency queries"
      ],
      "related": [
        "Node.js",
        "Express.js",
        "MongoDB"
      ],
      "iconType": "redis",
      "order": 22,
      "visible": true
    },
    {
      "id": "tool-git",
      "name": "Git",
      "category": "tools",
      "categoryLabel": "TOOLS & PLATFORMS",
      "level": "Advanced",
      "role": "VERSION CONTROL",
      "description": "Distributed version control system for source tracking, branching workflows, and commit history management.",
      "usage": [
        "Feature branching and merge conflict resolution",
        "Semantic commit history and release tagging",
        "Staging and local repository maintenance"
      ],
      "related": [
        "GitHub",
        "VS Code",
        "Vercel"
      ],
      "iconType": "git",
      "order": 23,
      "visible": true
    },
    {
      "id": "tool-github",
      "name": "GitHub",
      "category": "tools",
      "categoryLabel": "TOOLS & PLATFORMS",
      "level": "Advanced",
      "role": "CODE COLLABORATION",
      "description": "Cloud hosting for Git repositories, pull request reviews, project tracking, and automated CI workflows.",
      "usage": [
        "Remote repository management and collaboration",
        "Pull requests and code reviews",
        "GitHub Actions automated build workflows"
      ],
      "related": [
        "Git",
        "VS Code",
        "Vercel"
      ],
      "iconType": "github",
      "order": 24,
      "visible": true
    },
    {
      "id": "tool-vscode",
      "name": "VS Code",
      "category": "tools",
      "categoryLabel": "TOOLS & PLATFORMS",
      "level": "Advanced",
      "role": "PRIMARY IDE",
      "description": "Configured development environment with TypeScript IntelliSense, ESLint, Git integration, and debugging tools.",
      "usage": [
        "Custom workspace settings and extensions",
        "ESLint, Prettier, and Tailwind linting integration",
        "Integrated terminal and breakpoint debugging"
      ],
      "related": [
        "TypeScript",
        "Git",
        "GitHub"
      ],
      "iconType": "vscode",
      "order": 25,
      "visible": true
    },
    {
      "id": "tool-vercel",
      "name": "Vercel",
      "category": "tools",
      "categoryLabel": "TOOLS & PLATFORMS",
      "level": "Intermediate",
      "role": "CLOUD DEPLOYMENT",
      "description": "Hosting platform for Next.js and frontend applications with continuous deployment, preview branches, and edge CDN.",
      "usage": [
        "Automated Git-push deployments",
        "Environment variable and domain management",
        "Serverless route hosting and performance telemetry"
      ],
      "related": [
        "Next.js",
        "React",
        "GitHub"
      ],
      "iconType": "vercel",
      "order": 26,
      "visible": true
    },
    {
      "id": "tool-docker",
      "name": "Docker",
      "category": "tools",
      "categoryLabel": "TOOLS & PLATFORMS",
      "level": "Intermediate",
      "role": "CONTAINERIZATION",
      "description": "Containerization tool ensuring consistent environments across development, testing, and production.",
      "usage": [
        "Writing multi-stage Dockerfiles for Node apps",
        "Docker Compose orchestration for multi-container apps",
        "Isolated reproducible development containers"
      ],
      "related": [
        "Node.js",
        "Git",
        "MongoDB"
      ],
      "iconType": "docker",
      "order": 27,
      "visible": true
    },
    {
      "id": "tool-postman",
      "name": "Postman",
      "category": "tools",
      "categoryLabel": "TOOLS & PLATFORMS",
      "level": "Intermediate",
      "role": "API TESTING",
      "description": "Tool for designing, debugging, and documenting RESTful endpoints, validating request payloads, and testing headers.",
      "usage": [
        "API endpoint testing with environment variables",
        "Bearer token and auth header verification",
        "API collection documentation and export"
      ],
      "related": [
        "Express.js",
        "Node.js",
        "TypeScript"
      ],
      "iconType": "postman",
      "order": 28,
      "visible": true
    },
    {
      "id": "design-figma",
      "name": "Figma",
      "category": "design",
      "categoryLabel": "UI / UX DESIGN",
      "level": "Advanced",
      "role": "INTERFACE DESIGN",
      "description": "Creating high-fidelity UI mockups, auto-layout component libraries, interactive prototypes, and design specs.",
      "usage": [
        "Auto-layout responsive component frames",
        "Design tokens: color palettes, typography scales",
        "Interactive prototype transitions and flows"
      ],
      "related": [
        "UI / UX Design",
        "Design Systems",
        "Tailwind CSS"
      ],
      "iconType": "figma",
      "order": 29,
      "visible": true
    },
    {
      "id": "design-uiux",
      "name": "UI / UX Design",
      "category": "design",
      "categoryLabel": "UI / UX DESIGN",
      "level": "Intermediate",
      "role": "USER EXPERIENCE",
      "description": "Structuring user journeys, visual hierarchy, information architecture, and intuitive screen layouts.",
      "usage": [
        "Visual hierarchy and typography rhythm",
        "User journey flow mapping and content prioritization",
        "Clean interface layouts with balanced whitespace"
      ],
      "related": [
        "Figma",
        "Design Systems",
        "Responsive Architecture"
      ],
      "iconType": "layout",
      "order": 30,
      "visible": true
    },
    {
      "id": "design-systems",
      "name": "Design Systems",
      "category": "design",
      "categoryLabel": "UI / UX DESIGN",
      "level": "Intermediate",
      "role": "DESIGN TOKENS & ATOMS",
      "description": "Establishing harmonious color palettes, fluid typography hierarchies, consistent spacing systems, and liquid-glass tokens.",
      "usage": [
        "Editorial serif typography scales",
        "Liquid-glass translucent surface specifications",
        "Consistent button, badge, and card atoms"
      ],
      "related": [
        "Figma",
        "Tailwind CSS",
        "UI / UX Design"
      ],
      "iconType": "palette",
      "order": 31,
      "visible": true
    },
    {
      "id": "design-responsive",
      "name": "Responsive Architecture",
      "category": "design",
      "categoryLabel": "UI / UX DESIGN",
      "level": "Advanced",
      "role": "MULTI-DEVICE PERFECTION",
      "description": "Ensuring seamless visual and interaction experiences across ultra-wide desktop monitors, laptops, tablets, and mobile devices.",
      "usage": [
        "Fluid clamp() typography and flexible grid layouts",
        "Mobile-specific touch target optimizations",
        "Zero layout shifts across viewport breakpoints"
      ],
      "related": [
        "Tailwind CSS",
        "React",
        "Design Systems"
      ],
      "iconType": "smartphone",
      "order": 32,
      "visible": true
    },
    {
      "id": "design-wireframing",
      "name": "Wireframing",
      "category": "design",
      "categoryLabel": "UI / UX DESIGN",
      "level": "Intermediate",
      "role": "CONCEPT & PROTOTYPING",
      "description": "Rapid low-fidelity layout concepting to validate features and screen flow before visual polish.",
      "usage": [
        "Low-fidelity wireframe concepting",
        "Component hierarchy and content planning",
        "Interactive screen flow validation"
      ],
      "related": [
        "Figma",
        "UI / UX Design",
        "Design Systems"
      ],
      "iconType": "layout",
      "order": 33,
      "visible": true
    }
  ]
}'::jsonb,
  true,
  'system-seed'
)
ON CONFLICT (section_id) DO UPDATE
SET data = EXCLUDED.data,
    is_published = true,
    updated_at = timezone('utc'::text, now());

-- Section: projects
INSERT INTO public.portfolio_sections (section_id, data, is_published, updated_by)
VALUES (
  'projects',
  '{
  "chapter": "CHAPTER 04",
  "eyebrow": "FEATURED WORK",
  "heading": [
    "ENGINEERED",
    "PRODUCTS",
    "& SYSTEMS."
  ],
  "subheading": "Explore curated case studies spanning full-stack platforms, AI/ML integrations, and digital products.",
  "projects": [
    {
      "id": "saathi",
      "number": "01",
      "title": "SAATHI",
      "subtitle": "Community & Service Marketplace",
      "category": "FULL-STACK PLATFORM",
      "domain": "Full-Stack",
      "year": "2026",
      "description": "A comprehensive community service exchange ecosystem connecting local service providers with consumers through authenticated matchmaking, real-time availability scheduling, and intuitive booking flows.",
      "overview": "SAATHI is engineered to bridge the gap between verified local service artisans and urban households. By combining modular React/Next.js client architecture with scalable backend REST APIs and secure MongoDB persistence, the platform streamlines local service discovery, quotation management, and direct booking transactions.",
      "role": [
        "Full-Stack Architecture",
        "Database Modeling & Indexing",
        "Interactive UI/UX Design",
        "State Management & Auth Flow"
      ],
      "technologies": [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "Tailwind CSS",
        "Express.js"
      ],
      "features": [
        "Verified Provider Profiles & Geo-location filtering for local services",
        "Direct Request Matchmaking pipeline with custom price estimations",
        "Real-Time Notification dispatcher & secure session authentication",
        "Liquid-glass management dashboard for service history & customer reviews",
        "Mobile-responsive layout with sub-second page transitions"
      ],
      "challenges": [
        "Managing asynchronous multi-stage service booking states with concurrent user availability updates.",
        "Ensuring low latency search queries across diverse service categories and localized tags."
      ],
      "solution": [
        "Implemented optimistic UI updates with debounced search indexing and MongoDB compound indexes.",
        "Constructed a centralized booking state machine that eliminates race conditions during reservation slots."
      ],
      "contribution": "Architected the entire full-stack system from initial wireframing to database schemas, REST APIs, and the dark-mode liquid-glass user interface.",
      "image": "/images/projects/technexa.jpg",
      "secondaryImage": "/images/projects/urban-styles.jpg",
      "gallery": [
        "/images/projects/technexa.jpg",
        "/images/projects/urban-styles.jpg",
        "/images/projects/creative-studio.jpg"
      ],
      "githubUrl": "https://github.com/mddanish-31/saathi",
      "liveUrl": "https://saathi-marketplace.vercel.app",
      "featured": true,
      "accentColor": "#D7192F",
      "stats": [
        {
          "label": "Architecture",
          "value": "Full-Stack SSR"
        },
        {
          "label": "Database",
          "value": "MongoDB Atlas"
        },
        {
          "label": "Performance",
          "value": "98+ Lighthouse"
        }
      ],
      "order": 1,
      "visible": true
    },
    {
      "id": "smart-plant-monitoring",
      "number": "02",
      "title": "SMART PLANT MONITORING",
      "subtitle": "IoT & Precision Telemetry System",
      "category": "AI & IOT ARCHITECTURE",
      "domain": "AI / IoT",
      "year": "2025",
      "description": "An intelligent hardware-software IoT monitoring system that captures soil moisture, ambient humidity, temperature, and solar exposure to deliver real-time automated watering alerts and botanical health insights.",
      "overview": "Smart Plant Monitoring combines micro-controller sensor nodes with a Python/Node.js streaming backend and a real-time web dashboard. The system continuously polls environmental metrics, visualizes micro-climate fluctuations, and detects early signs of plant dehydration before visible distress occurs.",
      "role": [
        "IoT Sensor Telemetry",
        "Real-Time WebSocket Pipeline",
        "Data Visualization Engine",
        "Computer Vision Prototyping"
      ],
      "technologies": [
        "Python",
        "OpenCV",
        "React",
        "Node.js",
        "WebSockets",
        "Tailwind CSS",
        "Chart.js"
      ],
      "features": [
        "Multi-node environmental sensor polling (Moisture, Lux, Humidity, Temperature)",
        "Sub-second real-time telemetry streaming via WebSocket bidirectional channel",
        "Computer vision leaf anomaly detection module with OpenCV thresholding",
        "Historical metric aggregation graphs with 24-hour hydration forecast curve",
        "Configurable threshold alert triggers with visual anomaly flags"
      ],
      "challenges": [
        "Handling intermittent IoT connectivity spikes and maintaining chronological data fidelity on dashboard reloads.",
        "Rendering high-frequency sensor readings smoothly without freezing client-side DOM frames."
      ],
      "solution": [
        "Built a buffer-and-batch WebSocket aggregator on Node.js that throttles client broadcasts to 60fps chart updates.",
        "Utilized lightweight canvas rendering for historical multi-metric timeline visualization."
      ],
      "contribution": "Programmed micro-controller data polling, created the telemetry parsing server in Python/Node, and designed the real-time glassmorphic monitoring dashboard.",
      "image": "/images/projects/creative-studio.jpg",
      "secondaryImage": "/images/projects/technexa.jpg",
      "gallery": [
        "/images/projects/creative-studio.jpg",
        "/images/projects/technexa.jpg",
        "/images/projects/urban-styles.jpg"
      ],
      "githubUrl": "https://github.com/mddanish-31/smart-plant-monitoring",
      "liveUrl": null,
      "featured": true,
      "accentColor": "#10B981",
      "stats": [
        {
          "label": "Telemetry",
          "value": "Sub-Second Stream"
        },
        {
          "label": "Sensors",
          "value": "4 Environmental"
        },
        {
          "label": "Analytics",
          "value": "OpenCV Vision"
        }
      ],
      "order": 2,
      "visible": true
    },
    {
      "id": "technexa",
      "number": "03",
      "title": "TECHNEXA",
      "subtitle": "Cloud Platform & Intelligence Dashboard",
      "category": "CLOUD PLATFORM / SAAS",
      "domain": "Full-Stack",
      "year": "2026",
      "description": "High-performance cloud intelligence dashboard with real-time diagnostics, modular node monitoring, sub-second data streaming, and automated workload health analytics.",
      "overview": "TECHNEXA provides a unified operational command center for distributed cloud workloads. Designed with dark-mode editorial aesthetics and micro-animations, it delivers instant visibility into node compute capacity, network throughput, memory overhead, and active cloud instances.",
      "role": [
        "Frontend Architecture",
        "Modular Widget System",
        "Performance Optimization",
        "Interactive Visualizations"
      ],
      "technologies": [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "WebSockets",
        "Chart.js"
      ],
      "features": [
        "Sub-second WebSocket node diagnostics streaming with zero jitter",
        "Modular drag-and-drop customizable dashboard widget canvas",
        "Real-time memory heap telemetry and CPU thermal anomaly tracking",
        "Dark-mode glassmorphic interface with accessible high-contrast indicators",
        "Exportable audit logs & cluster deployment timeline checkpoints"
      ],
      "challenges": [
        "Managing simultaneous high-frequency graph renders across multiple active cloud nodes without UI frame drops."
      ],
      "solution": [
        "Employed React memoization with decoupled canvas render loops for independent widget telemetry updates."
      ],
      "contribution": "Designed the complete design language, constructed the modular widget pipeline, and engineered the high-performance Next.js frontend.",
      "image": "/images/projects/technexa.jpg",
      "secondaryImage": "/images/projects/creative-studio.jpg",
      "gallery": [
        "/images/projects/technexa.jpg",
        "/images/projects/creative-studio.jpg",
        "/images/projects/urban-styles.jpg"
      ],
      "githubUrl": "https://github.com/mddanish-31/technexa",
      "liveUrl": "https://technexa-demo.vercel.app",
      "featured": true,
      "accentColor": "#3B82F6",
      "stats": [
        {
          "label": "Latency",
          "value": "<50ms Stream"
        },
        {
          "label": "Architecture",
          "value": "Modular Micro-UI"
        },
        {
          "label": "Stack",
          "value": "Next.js 15"
        }
      ],
      "order": 3,
      "visible": true
    },
    {
      "id": "urban-styles",
      "number": "04",
      "title": "URBAN STYLES",
      "subtitle": "Editorial Luxury E-Commerce Experience",
      "category": "E-COMMERCE / CREATIVE COMMERCE",
      "domain": "Commerce",
      "year": "2026",
      "description": "Editorial luxury e-commerce experience featuring fluid layout transitions, optimized catalog search, persistent cart state, and a seamless checkout pipeline.",
      "overview": "Urban Styles redefines digital fashion retail with high-fashion editorial lookbooks, fluid visual interactions, and responsive multi-attribute product filters. Built for blazing speed and aesthetic elegance, it combines typography-driven curation with commercial utility.",
      "role": [
        "Storefront Engineering",
        "Product Filtering Engine",
        "Shopping Cart Pipeline",
        "Editorial Layout Design"
      ],
      "technologies": [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Stripe",
        "Framer Logic"
      ],
      "features": [
        "Fluid lookbook editorial grid with interactive hover previews",
        "Persistent client-side shopping bag with real-time stock availability check",
        "Dynamic multi-attribute catalog filtering (size, collection, palette, price)",
        "High-resolution zoom galleries with responsive mobile touch gestures",
        "Seamless checkout flow with automated discount validation"
      ],
      "challenges": [
        "Preserving editorial image fidelity while maintaining instant page loads on 3G/4G mobile devices."
      ],
      "solution": [
        "Implemented Next.js responsive image srcset pipelines with WebP conversion and blur-up placeholder effects."
      ],
      "contribution": "Built the entire storefront interface, catalog filtering algorithms, cart context state, and responsive checkout integration.",
      "image": "/images/projects/urban-styles.jpg",
      "secondaryImage": "/images/projects/technexa.jpg",
      "gallery": [
        "/images/projects/urban-styles.jpg",
        "/images/projects/technexa.jpg",
        "/images/projects/creative-studio.jpg"
      ],
      "githubUrl": "https://github.com/mddanish-31/urban-styles",
      "liveUrl": "https://urbanstyles-store.vercel.app",
      "featured": true,
      "accentColor": "#D7192F",
      "stats": [
        {
          "label": "Lookbook",
          "value": "Editorial Grid"
        },
        {
          "label": "Cart Speed",
          "value": "<10ms State"
        },
        {
          "label": "Optimization",
          "value": "100% WebP"
        }
      ],
      "order": 4,
      "visible": true
    },
    {
      "id": "restaurant-showcase",
      "number": "05",
      "title": "CULINARY SHOWCASE",
      "subtitle": "Immersive Gastronomy & Table Booking",
      "category": "INTERACTIVE WEB APP",
      "domain": "Creative Tech",
      "year": "2025",
      "description": "A modern gastronomy web experience featuring interactive tasting menus, sensory visual presentation, real-time table booking reservation system, and dietary customizer.",
      "overview": "Designed to elevate the culinary dining journey, this web application blends atmospheric dark-mode storytelling with practical reservation workflows. Guests can explore interactive course pairings, view ingredient origins, and secure reservations with instant calendar confirmations.",
      "role": [
        "Frontend Engineering",
        "Interactive Design System",
        "Table Reservation Logic",
        "Performance Optimization"
      ],
      "technologies": [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion"
      ],
      "features": [
        "Interactive tasting menu with sensory course pairing recommendations",
        "Real-time table reservation and party size booking flow with calendar sync",
        "Smooth atmospheric scroll transitions & seasonal dishes visual showcase",
        "Dietary restriction customizer with ingredient allergen filters",
        "Mobile-first responsive dining experience with click-to-reserve action"
      ],
      "challenges": [
        "Creating rich sensory visual presentations without overloading mobile memory or causing scroll jank."
      ],
      "solution": [
        "Optimized CSS hardware-accelerated animations and utilized CSS backdrop-filter with contain-intrinsic-size."
      ],
      "contribution": "Designed the UI/UX mockups in Figma and developed the entire Next.js application with interactive reservation forms.",
      "image": "/images/projects/creative-studio.jpg",
      "secondaryImage": "/images/projects/urban-styles.jpg",
      "gallery": [
        "/images/projects/creative-studio.jpg",
        "/images/projects/urban-styles.jpg",
        "/images/projects/technexa.jpg"
      ],
      "githubUrl": "https://github.com/mddanish-31/restaurant-showcase",
      "liveUrl": "https://culinary-showcase.vercel.app",
      "featured": true,
      "accentColor": "#F59E0B",
      "stats": [
        {
          "label": "Experience",
          "value": "Sensory UI"
        },
        {
          "label": "Reservations",
          "value": "Instant Confirm"
        },
        {
          "label": "Responsiveness",
          "value": "Mobile-First"
        }
      ],
      "order": 5,
      "visible": true
    },
    {
      "id": "teachers-day-tribute",
      "number": "06",
      "title": "TEACHERS'' DAY PORTAL",
      "subtitle": "Interactive Commemorative Tribute",
      "category": "CREATIVE TECH / EVENT PLATFORM",
      "domain": "Creative Tech",
      "year": "2026",
      "description": "An interactive digital tribute platform created to honor educators, featuring dynamic digital cards, multimedia student submissions, audio-visual tributes, and celebratory confetti interactions.",
      "overview": "Built as a campus commemorative hub, this project enabled students to author personalized thank-you messages, attach audio-visual memories, and generate customized gratitude cards with interactive canvas animations.",
      "role": [
        "Creative Engineering",
        "Canvas Animation Engine",
        "Interactive Tribute Wall",
        "Responsive Design"
      ],
      "technologies": [
        "JavaScript",
        "HTML5 Canvas",
        "CSS3",
        "Web Audio API",
        "Tailwind CSS"
      ],
      "features": [
        "Interactive digital appreciation card generator with custom themes",
        "Dynamic physics-based particle & celebratory confetti canvas engine",
        "Curated tribute wall with filterable departmental educator tags",
        "Audio-visual memory gallery with ambient background tribute score",
        "Instant social share & card download export utility"
      ],
      "challenges": [
        "Generating high-frame-rate celebratory particle explosions smoothly on low-power mobile devices."
      ],
      "solution": [
        "Built a custom lightweight HTML5 Canvas 2D particle manager with object pooling and delta-time updates."
      ],
      "contribution": "Developed the entire interactive tribute application, created the canvas animation effects, and managed deployment.",
      "image": "/images/projects/technexa.jpg",
      "secondaryImage": "/images/projects/creative-studio.jpg",
      "gallery": [
        "/images/projects/technexa.jpg",
        "/images/projects/creative-studio.jpg",
        "/images/projects/urban-styles.jpg"
      ],
      "githubUrl": "https://github.com/mddanish-31/teachers-day-tribute",
      "liveUrl": "https://teachers-day-tribute.vercel.app",
      "featured": true,
      "accentColor": "#8B5CF6",
      "stats": [
        {
          "label": "Interactivity",
          "value": "Canvas 2D Engine"
        },
        {
          "label": "Tributes",
          "value": "100+ Messages"
        },
        {
          "label": "Engagement",
          "value": "Campus Wide"
        }
      ],
      "order": 6,
      "visible": true
    }
  ]
}'::jsonb,
  true,
  'system-seed'
)
ON CONFLICT (section_id) DO UPDATE
SET data = EXCLUDED.data,
    is_published = true,
    updated_at = timezone('utc'::text, now());

-- Section: experience
INSERT INTO public.portfolio_sections (section_id, data, is_published, updated_by)
VALUES (
  'experience',
  '{
  "chapter": "CHAPTER 05",
  "eyebrow": "EXPERIENCE & LEADERSHIP",
  "heading": [
    "EXPERIENCE",
    "& MILESTONES."
  ],
  "subheading": "Real-world experience, engineering roles, leadership, collaborative community building, and hackathon milestones.",
  "groups": [
    {
      "id": "professional",
      "title": "PROFESSIONAL EXPERIENCE",
      "eyebrow": "WORK HISTORY & INDUSTRY",
      "subtitle": "Practical industry experience, engineering internships, and real-world system development.",
      "items": [
        {
          "id": "prof-01",
          "category": "professional",
          "number": "01",
          "role": "FULL-STACK DEVELOPER INTERN",
          "organization": "YOUR ORGANIZATION / COMPANY",
          "organizationType": "SOFTWARE & CLOUD SYSTEMS",
          "location": "HYBRID / REMOTE",
          "startDate": "MONTH YEAR",
          "endDate": "PRESENT",
          "period": "MONTH YEAR — PRESENT",
          "isCurrent": true,
          "statusBadge": "CURRENT",
          "description": "Add your current professional role description here. Summarize key responsibilities, systems engineered, or core web applications developed.",
          "contributions": [
            "Engineered responsive full-stack features using modern web frameworks and modular component architecture.",
            "Collaborated with cross-functional teams to design, test, and deploy production-ready RESTful APIs and database schemas.",
            "Optimized application performance, caching strategies, and Core Web Vitals across client-side interfaces."
          ],
          "skills": [
            "NEXT.JS",
            "TYPESCRIPT",
            "NODE.JS",
            "POSTGRESQL",
            "TAILWIND CSS",
            "GIT"
          ],
          "companyUrl": "",
          "certificateUrl": "",
          "projectUrl": "",
          "highlight": "CORE ENGINEERING",
          "order": 1,
          "visible": true
        },
        {
          "id": "prof-02",
          "category": "professional",
          "number": "02",
          "role": "FRONTEND ENGINEERING INTERN",
          "organization": "YOUR ORGANIZATION / COMPANY",
          "organizationType": "DIGITAL PRODUCT STUDIO",
          "location": "LOCATION / REMOTE",
          "startDate": "MONTH YEAR",
          "endDate": "MONTH YEAR",
          "period": "MONTH YEAR — MONTH YEAR",
          "isCurrent": false,
          "statusBadge": "PREVIOUS",
          "description": "Add your previous work experience description here. Highlight frontend user interfaces built and design system implementations.",
          "contributions": [
            "Implemented interactive UI components conforming to accessibility standards, design tokens, and fluid layout principles.",
            "Integrated third-party RESTful services, authentication endpoints, and asynchronous state management workflows.",
            "Participated in agile sprints, peer code reviews, and automated UI testing pipelines."
          ],
          "skills": [
            "REACT",
            "JAVASCRIPT",
            "TAILWIND CSS",
            "REST APIS",
            "FIGMA"
          ],
          "companyUrl": "",
          "certificateUrl": "",
          "projectUrl": "",
          "order": 2,
          "visible": true
        },
        {
          "id": "prof-03",
          "category": "professional",
          "number": "03",
          "role": "SOFTWARE DEVELOPER INTERN",
          "organization": "YOUR ORGANIZATION / COMPANY",
          "organizationType": "TECHNOLOGY SOLUTIONS",
          "location": "LOCATION",
          "startDate": "MONTH YEAR",
          "endDate": "MONTH YEAR",
          "period": "MONTH YEAR — MONTH YEAR",
          "isCurrent": false,
          "statusBadge": "PREVIOUS",
          "description": "Add your software engineering or web development internship experience here. Mention software tools and backend utilities built.",
          "contributions": [
            "Built modular software utilities and automated data processing scripts with clean architectural patterns.",
            "Conducted unit testing, code refactoring, and bug triage across backend services and database connections.",
            "Documented technical specifications, architecture workflows, and integration guidelines for developer onboarding."
          ],
          "skills": [
            "PYTHON",
            "SQL",
            "DATA STRUCTURES",
            "DOCKER",
            "LINUX"
          ],
          "companyUrl": "",
          "certificateUrl": "",
          "projectUrl": "",
          "order": 3,
          "visible": true
        }
      ],
      "order": 1,
      "visible": true
    },
    {
      "id": "leadership",
      "title": "LEADERSHIP & RESPONSIBILITY",
      "eyebrow": "COMMUNITY & TEAMS",
      "subtitle": "Technical leadership, open-source initiatives, team mentorship, and organizational execution.",
      "items": [
        {
          "id": "lead-01",
          "category": "leadership",
          "number": "01",
          "role": "TECHNICAL LEAD / LEAD ORGANIZER",
          "organization": "STUDENT DEVELOPER CLUB / TECH COMMUNITY",
          "organizationType": "STUDENT INITIATIVE",
          "location": "CAMPUS / HYBRID",
          "startDate": "YEAR",
          "endDate": "PRESENT",
          "period": "YEAR — PRESENT",
          "isCurrent": true,
          "statusBadge": "LEAD",
          "description": "Add your leadership role summary here. Describe community impact, team mentorship, and tech initiatives managed.",
          "contributions": [
            "Led a multidisciplinary team of developers and designers to build community web portals and open-source tools.",
            "Organized technical bootcamps, hands-on coding workshops, and hackathon preparation sessions for 100+ peers.",
            "Mentored junior developers in version control, modern web stacks, and clean software design principles."
          ],
          "skills": [
            "TEAM LEADERSHIP",
            "PROJECT MANAGEMENT",
            "MENTORSHIP",
            "COMMUNICATION",
            "EVENT STRATEGY"
          ],
          "highlight": "COMMUNITY IMPACT",
          "order": 1,
          "visible": true
        },
        {
          "id": "lead-02",
          "category": "leadership",
          "number": "02",
          "role": "OPEN-SOURCE PROGRAM LEAD",
          "organization": "CAMPUS TECH INITIATIVE / COMMUNITY",
          "organizationType": "DEVELOPER NETWORK",
          "location": "CAMPUS",
          "startDate": "YEAR",
          "endDate": "YEAR",
          "period": "YEAR — YEAR",
          "isCurrent": false,
          "statusBadge": "COMPLETED",
          "description": "Add your open-source community coordination or student ambassador experience here.",
          "contributions": [
            "Coordinated campus-wide open-source contribution drives and collaborative developer meetups.",
            "Reviewed pull requests, maintained documentation, and guided contributors through Git and GitHub workflows.",
            "Fostered an inclusive collaborative environment for beginner programmers to build real projects."
          ],
          "skills": [
            "OPEN SOURCE",
            "GIT / GITHUB",
            "COMMUNITY BUILDING",
            "CODE REVIEW"
          ],
          "order": 2,
          "visible": true
        },
        {
          "id": "lead-03",
          "category": "leadership",
          "number": "03",
          "role": "CREATIVE & TECHNICAL COORDINATOR",
          "organization": "ANNUAL TECH FESTIVAL / UNIVERSITY GUILD",
          "organizationType": "CAMPUS ORGANIZATION",
          "location": "CAMPUS",
          "startDate": "YEAR",
          "endDate": "YEAR",
          "period": "YEAR — YEAR",
          "isCurrent": false,
          "statusBadge": "COMPLETED",
          "description": "Add your event leadership, creative direction, or hackathon coordination experience here.",
          "contributions": [
            "Spearheaded tech infrastructure and real-time event scoring platforms for university-level technical competitions.",
            "Managed cross-team communication between logistics, marketing, and engineering tracks.",
            "Ensured seamless execution of high-attendance coding competitions and tech exhibitions."
          ],
          "skills": [
            "EVENT COORDINATION",
            "CROSS-FUNCTIONAL ALIGNMENT",
            "PROBLEM SOLVING",
            "STRATEGIC PLANNING"
          ],
          "order": 3,
          "visible": true
        }
      ],
      "order": 2,
      "visible": true
    },
    {
      "id": "hackathon",
      "title": "COMPETITIONS & HACKATHONS",
      "eyebrow": "SPRINTS & MILESTONES",
      "subtitle": "Competitive coding sprints, rapid prototyping challenges, and algorithmic milestones.",
      "items": [
        {
          "id": "hack-01",
          "category": "hackathon",
          "number": "01",
          "role": "PROJECT LEAD & FULL-STACK ARCHITECT",
          "organization": "NATIONAL HACKATHON / INNOVATION CHALLENGE",
          "organizationType": "COMPETITIVE SPRINT",
          "location": "NATIONAL / HYBRID",
          "startDate": "YEAR",
          "endDate": "YEAR",
          "period": "YEAR",
          "isCurrent": false,
          "statusBadge": "PROJECT",
          "description": "Add your hackathon project or competition summary here. Highlight the problem tackled and technical solution built.",
          "contributions": [
            "Architected and delivered an end-to-end prototype within a 36-hour sprint deadline under competitive evaluation.",
            "Integrated real-time database synchronization and intuitive dashboard visualizations for end users.",
            "Pitched the technical solution to industry judges, demonstrating live functional workflows and architecture."
          ],
          "skills": [
            "PROTOTYPING",
            "FULL-STACK ARCHITECTURE",
            "RAPID ITERATION",
            "PITCH & DEMO"
          ],
          "highlight": "RAPID PROTOTYPING",
          "order": 1,
          "visible": true
        },
        {
          "id": "hack-02",
          "category": "hackathon",
          "number": "02",
          "role": "FRONTEND DEVELOPER & UI DESIGNER",
          "organization": "UNIVERSITY HACKATHON / CODEFEST",
          "organizationType": "INTER-COLLEGE SPRINT",
          "location": "REGIONAL",
          "startDate": "YEAR",
          "endDate": "YEAR",
          "period": "YEAR",
          "isCurrent": false,
          "statusBadge": "PROJECT",
          "description": "Add details about a collaborative hackathon or coding contest participation and role.",
          "contributions": [
            "Designed user journeys and implemented responsive client-side interface under strict time constraints.",
            "Connected frontend components with machine learning inference API endpoints for real-time predictions.",
            "Resolved real-time state synchronization bottlenecks during final deployment."
          ],
          "skills": [
            "REACT",
            "API INTEGRATION",
            "UI/UX DESIGN",
            "COLLABORATIVE CODING"
          ],
          "order": 2,
          "visible": true
        },
        {
          "id": "hack-03",
          "category": "hackathon",
          "number": "03",
          "role": "COMPETITIVE PROGRAMMING PARTICIPANT",
          "organization": "ALGORITHMIC CHALLENGE / CODE SPRINT",
          "organizationType": "ALGORITHMIC COMPETITION",
          "location": "ONLINE",
          "startDate": "YEAR",
          "endDate": "YEAR",
          "period": "YEAR",
          "isCurrent": false,
          "statusBadge": "MILESTONE",
          "description": "Add details about algorithmic coding contests, datathons, or technical challenges.",
          "contributions": [
            "Solved algorithmic problems involving dynamic programming, graph theory, and greedy algorithms.",
            "Demonstrated fast computational problem-solving and clean algorithmic implementation.",
            "Ranked consistently in top percentile among collegiate participants."
          ],
          "skills": [
            "C++",
            "ALGORITHMS",
            "DATA STRUCTURES",
            "COMPLEXITY ANALYSIS"
          ],
          "order": 3,
          "visible": true
        }
      ],
      "order": 3,
      "visible": true
    }
  ],
  "allExperiences": [
    {
      "id": "prof-01",
      "category": "professional",
      "number": "01",
      "role": "FULL-STACK DEVELOPER INTERN",
      "organization": "YOUR ORGANIZATION / COMPANY",
      "organizationType": "SOFTWARE & CLOUD SYSTEMS",
      "location": "HYBRID / REMOTE",
      "startDate": "MONTH YEAR",
      "endDate": "PRESENT",
      "period": "MONTH YEAR — PRESENT",
      "isCurrent": true,
      "statusBadge": "CURRENT",
      "description": "Add your current professional role description here. Summarize key responsibilities, systems engineered, or core web applications developed.",
      "contributions": [
        "Engineered responsive full-stack features using modern web frameworks and modular component architecture.",
        "Collaborated with cross-functional teams to design, test, and deploy production-ready RESTful APIs and database schemas.",
        "Optimized application performance, caching strategies, and Core Web Vitals across client-side interfaces."
      ],
      "skills": [
        "NEXT.JS",
        "TYPESCRIPT",
        "NODE.JS",
        "POSTGRESQL",
        "TAILWIND CSS",
        "GIT"
      ],
      "companyUrl": "",
      "certificateUrl": "",
      "projectUrl": "",
      "highlight": "CORE ENGINEERING",
      "order": 1,
      "visible": true
    },
    {
      "id": "prof-02",
      "category": "professional",
      "number": "02",
      "role": "FRONTEND ENGINEERING INTERN",
      "organization": "YOUR ORGANIZATION / COMPANY",
      "organizationType": "DIGITAL PRODUCT STUDIO",
      "location": "LOCATION / REMOTE",
      "startDate": "MONTH YEAR",
      "endDate": "MONTH YEAR",
      "period": "MONTH YEAR — MONTH YEAR",
      "isCurrent": false,
      "statusBadge": "PREVIOUS",
      "description": "Add your previous work experience description here. Highlight frontend user interfaces built and design system implementations.",
      "contributions": [
        "Implemented interactive UI components conforming to accessibility standards, design tokens, and fluid layout principles.",
        "Integrated third-party RESTful services, authentication endpoints, and asynchronous state management workflows.",
        "Participated in agile sprints, peer code reviews, and automated UI testing pipelines."
      ],
      "skills": [
        "REACT",
        "JAVASCRIPT",
        "TAILWIND CSS",
        "REST APIS",
        "FIGMA"
      ],
      "companyUrl": "",
      "certificateUrl": "",
      "projectUrl": "",
      "order": 2,
      "visible": true
    },
    {
      "id": "prof-03",
      "category": "professional",
      "number": "03",
      "role": "SOFTWARE DEVELOPER INTERN",
      "organization": "YOUR ORGANIZATION / COMPANY",
      "organizationType": "TECHNOLOGY SOLUTIONS",
      "location": "LOCATION",
      "startDate": "MONTH YEAR",
      "endDate": "MONTH YEAR",
      "period": "MONTH YEAR — MONTH YEAR",
      "isCurrent": false,
      "statusBadge": "PREVIOUS",
      "description": "Add your software engineering or web development internship experience here. Mention software tools and backend utilities built.",
      "contributions": [
        "Built modular software utilities and automated data processing scripts with clean architectural patterns.",
        "Conducted unit testing, code refactoring, and bug triage across backend services and database connections.",
        "Documented technical specifications, architecture workflows, and integration guidelines for developer onboarding."
      ],
      "skills": [
        "PYTHON",
        "SQL",
        "DATA STRUCTURES",
        "DOCKER",
        "LINUX"
      ],
      "companyUrl": "",
      "certificateUrl": "",
      "projectUrl": "",
      "order": 3,
      "visible": true
    },
    {
      "id": "lead-01",
      "category": "leadership",
      "number": "01",
      "role": "TECHNICAL LEAD / LEAD ORGANIZER",
      "organization": "STUDENT DEVELOPER CLUB / TECH COMMUNITY",
      "organizationType": "STUDENT INITIATIVE",
      "location": "CAMPUS / HYBRID",
      "startDate": "YEAR",
      "endDate": "PRESENT",
      "period": "YEAR — PRESENT",
      "isCurrent": true,
      "statusBadge": "LEAD",
      "description": "Add your leadership role summary here. Describe community impact, team mentorship, and tech initiatives managed.",
      "contributions": [
        "Led a multidisciplinary team of developers and designers to build community web portals and open-source tools.",
        "Organized technical bootcamps, hands-on coding workshops, and hackathon preparation sessions for 100+ peers.",
        "Mentored junior developers in version control, modern web stacks, and clean software design principles."
      ],
      "skills": [
        "TEAM LEADERSHIP",
        "PROJECT MANAGEMENT",
        "MENTORSHIP",
        "COMMUNICATION",
        "EVENT STRATEGY"
      ],
      "highlight": "COMMUNITY IMPACT",
      "order": 4,
      "visible": true
    },
    {
      "id": "lead-02",
      "category": "leadership",
      "number": "02",
      "role": "OPEN-SOURCE PROGRAM LEAD",
      "organization": "CAMPUS TECH INITIATIVE / COMMUNITY",
      "organizationType": "DEVELOPER NETWORK",
      "location": "CAMPUS",
      "startDate": "YEAR",
      "endDate": "YEAR",
      "period": "YEAR — YEAR",
      "isCurrent": false,
      "statusBadge": "COMPLETED",
      "description": "Add your open-source community coordination or student ambassador experience here.",
      "contributions": [
        "Coordinated campus-wide open-source contribution drives and collaborative developer meetups.",
        "Reviewed pull requests, maintained documentation, and guided contributors through Git and GitHub workflows.",
        "Fostered an inclusive collaborative environment for beginner programmers to build real projects."
      ],
      "skills": [
        "OPEN SOURCE",
        "GIT / GITHUB",
        "COMMUNITY BUILDING",
        "CODE REVIEW"
      ],
      "order": 5,
      "visible": true
    },
    {
      "id": "lead-03",
      "category": "leadership",
      "number": "03",
      "role": "CREATIVE & TECHNICAL COORDINATOR",
      "organization": "ANNUAL TECH FESTIVAL / UNIVERSITY GUILD",
      "organizationType": "CAMPUS ORGANIZATION",
      "location": "CAMPUS",
      "startDate": "YEAR",
      "endDate": "YEAR",
      "period": "YEAR — YEAR",
      "isCurrent": false,
      "statusBadge": "COMPLETED",
      "description": "Add your event leadership, creative direction, or hackathon coordination experience here.",
      "contributions": [
        "Spearheaded tech infrastructure and real-time event scoring platforms for university-level technical competitions.",
        "Managed cross-team communication between logistics, marketing, and engineering tracks.",
        "Ensured seamless execution of high-attendance coding competitions and tech exhibitions."
      ],
      "skills": [
        "EVENT COORDINATION",
        "CROSS-FUNCTIONAL ALIGNMENT",
        "PROBLEM SOLVING",
        "STRATEGIC PLANNING"
      ],
      "order": 6,
      "visible": true
    },
    {
      "id": "hack-01",
      "category": "hackathon",
      "number": "01",
      "role": "PROJECT LEAD & FULL-STACK ARCHITECT",
      "organization": "NATIONAL HACKATHON / INNOVATION CHALLENGE",
      "organizationType": "COMPETITIVE SPRINT",
      "location": "NATIONAL / HYBRID",
      "startDate": "YEAR",
      "endDate": "YEAR",
      "period": "YEAR",
      "isCurrent": false,
      "statusBadge": "PROJECT",
      "description": "Add your hackathon project or competition summary here. Highlight the problem tackled and technical solution built.",
      "contributions": [
        "Architected and delivered an end-to-end prototype within a 36-hour sprint deadline under competitive evaluation.",
        "Integrated real-time database synchronization and intuitive dashboard visualizations for end users.",
        "Pitched the technical solution to industry judges, demonstrating live functional workflows and architecture."
      ],
      "skills": [
        "PROTOTYPING",
        "FULL-STACK ARCHITECTURE",
        "RAPID ITERATION",
        "PITCH & DEMO"
      ],
      "highlight": "RAPID PROTOTYPING",
      "order": 7,
      "visible": true
    },
    {
      "id": "hack-02",
      "category": "hackathon",
      "number": "02",
      "role": "FRONTEND DEVELOPER & UI DESIGNER",
      "organization": "UNIVERSITY HACKATHON / CODEFEST",
      "organizationType": "INTER-COLLEGE SPRINT",
      "location": "REGIONAL",
      "startDate": "YEAR",
      "endDate": "YEAR",
      "period": "YEAR",
      "isCurrent": false,
      "statusBadge": "PROJECT",
      "description": "Add details about a collaborative hackathon or coding contest participation and role.",
      "contributions": [
        "Designed user journeys and implemented responsive client-side interface under strict time constraints.",
        "Connected frontend components with machine learning inference API endpoints for real-time predictions.",
        "Resolved real-time state synchronization bottlenecks during final deployment."
      ],
      "skills": [
        "REACT",
        "API INTEGRATION",
        "UI/UX DESIGN",
        "COLLABORATIVE CODING"
      ],
      "order": 8,
      "visible": true
    },
    {
      "id": "hack-03",
      "category": "hackathon",
      "number": "03",
      "role": "COMPETITIVE PROGRAMMING PARTICIPANT",
      "organization": "ALGORITHMIC CHALLENGE / CODE SPRINT",
      "organizationType": "ALGORITHMIC COMPETITION",
      "location": "ONLINE",
      "startDate": "YEAR",
      "endDate": "YEAR",
      "period": "YEAR",
      "isCurrent": false,
      "statusBadge": "MILESTONE",
      "description": "Add details about algorithmic coding contests, datathons, or technical challenges.",
      "contributions": [
        "Solved algorithmic problems involving dynamic programming, graph theory, and greedy algorithms.",
        "Demonstrated fast computational problem-solving and clean algorithmic implementation.",
        "Ranked consistently in top percentile among collegiate participants."
      ],
      "skills": [
        "C++",
        "ALGORITHMS",
        "DATA STRUCTURES",
        "COMPLEXITY ANALYSIS"
      ],
      "order": 9,
      "visible": true
    }
  ]
}'::jsonb,
  true,
  'system-seed'
)
ON CONFLICT (section_id) DO UPDATE
SET data = EXCLUDED.data,
    is_published = true,
    updated_at = timezone('utc'::text, now());

-- Section: education
INSERT INTO public.portfolio_sections (section_id, data, is_published, updated_by)
VALUES (
  'education',
  '{
  "chapter": "CHAPTER 06",
  "eyebrow": "ACADEMIC BACKGROUND",
  "heading": [
    "EDUCATION",
    "& MILESTONES."
  ],
  "subheading": "Consistent academic growth with a strong foundation in computer science, mathematics, and technology.",
  "items": [
    {
      "id": "secondary",
      "number": "01",
      "selectorLabel": "SECONDARY",
      "selectorTitle": "CLASS X • 82%",
      "level": "SECONDARY EDUCATION",
      "degree": "CLASS X",
      "institution": "ST. MARY''S SCHOOL",
      "timeline": "COMPLETED",
      "score": "82%",
      "scoreType": "SCORE",
      "scoreScale": "OVERALL PERCENTAGE",
      "scoreBadgeLabel": "SECONDARY ACADEMIC STANDING",
      "isCurrent": false,
      "statusBadge": "COMPLETED",
      "description": "Completed secondary schooling with balanced academic excellence across mathematics, sciences, and fundamental computer concepts.",
      "highlights": [
        "Rigorous foundation in mathematics, science, and analytical thinking",
        "Consistent academic excellence across all core school subjects"
      ],
      "order": 1,
      "visible": true
    },
    {
      "id": "higherSecondary",
      "number": "02",
      "selectorLabel": "HIGHER SECONDARY",
      "selectorTitle": "CLASS XII • 82%",
      "level": "HIGHER SECONDARY",
      "degree": "CLASS XII",
      "institution": "ST. MARY''S SCHOOL",
      "timeline": "COMPLETED",
      "score": "82%",
      "scoreType": "SCORE",
      "scoreScale": "OVERALL PERCENTAGE",
      "scoreBadgeLabel": "HIGHER SECONDARY ACADEMIC STANDING",
      "isCurrent": false,
      "statusBadge": "COMPLETED",
      "description": "Completed higher secondary academic curriculum with strong grounding in science disciplines, mathematics, and computational reasoning.",
      "highlights": [
        "Built strong analytical foundation in advanced mathematics and sciences",
        "Developed disciplined study habits and algorithmic problem-solving methodology"
      ],
      "order": 2,
      "visible": true
    },
    {
      "id": "undergraduate",
      "number": "03",
      "selectorLabel": "CURRENT",
      "selectorTitle": "B.TECH CSE • 8.525 CGPA",
      "level": "UNDERGRADUATE",
      "degree": "B.TECH",
      "field": "COMPUTER SCIENCE & ENGINEERING",
      "institution": "ADAMAS UNIVERSITY",
      "timeline": "CLASS OF 2028",
      "score": "8.525",
      "scoreScale": "/ 10.00",
      "scoreType": "CGPA",
      "scoreBadgeLabel": "CGPA ACADEMIC STANDING",
      "isCurrent": true,
      "statusBadge": "CURRENT PROGRAM",
      "description": "Pursuing comprehensive undergraduate studies with intensive focus on algorithmic problem solving, software engineering architecture, database systems, and modern full-stack development.",
      "highlights": [
        "Core focus on Data Structures, Algorithms, and Software Architecture",
        "Consistent academic performance with active full-stack practical projects"
      ],
      "order": 3,
      "visible": true
    }
  ],
  "records": {
    "undergraduate": {
      "id": "undergraduate",
      "number": "03",
      "selectorLabel": "CURRENT",
      "selectorTitle": "B.TECH CSE • 8.525 CGPA",
      "level": "UNDERGRADUATE",
      "degree": "B.TECH",
      "field": "COMPUTER SCIENCE & ENGINEERING",
      "institution": "ADAMAS UNIVERSITY",
      "timeline": "CLASS OF 2028",
      "score": "8.525",
      "scoreScale": "/ 10.00",
      "scoreType": "CGPA",
      "scoreBadgeLabel": "CGPA ACADEMIC STANDING",
      "isCurrent": true,
      "statusBadge": "CURRENT PROGRAM",
      "description": "Pursuing comprehensive undergraduate studies with intensive focus on algorithmic problem solving, software engineering architecture, database systems, and modern full-stack development.",
      "highlights": [
        "Core focus on Data Structures, Algorithms, and Software Architecture",
        "Consistent academic performance with active full-stack practical projects"
      ],
      "order": 3,
      "visible": true
    },
    "higherSecondary": {
      "id": "higherSecondary",
      "number": "02",
      "selectorLabel": "HIGHER SECONDARY",
      "selectorTitle": "CLASS XII • 82%",
      "level": "HIGHER SECONDARY",
      "degree": "CLASS XII",
      "institution": "ST. MARY''S SCHOOL",
      "timeline": "COMPLETED",
      "score": "82%",
      "scoreType": "SCORE",
      "scoreScale": "OVERALL PERCENTAGE",
      "scoreBadgeLabel": "HIGHER SECONDARY ACADEMIC STANDING",
      "isCurrent": false,
      "statusBadge": "COMPLETED",
      "description": "Completed higher secondary academic curriculum with strong grounding in science disciplines, mathematics, and computational reasoning.",
      "highlights": [
        "Built strong analytical foundation in advanced mathematics and sciences",
        "Developed disciplined study habits and algorithmic problem-solving methodology"
      ],
      "order": 2,
      "visible": true
    },
    "secondary": {
      "id": "secondary",
      "number": "01",
      "selectorLabel": "SECONDARY",
      "selectorTitle": "CLASS X • 82%",
      "level": "SECONDARY EDUCATION",
      "degree": "CLASS X",
      "institution": "ST. MARY''S SCHOOL",
      "timeline": "COMPLETED",
      "score": "82%",
      "scoreType": "SCORE",
      "scoreScale": "OVERALL PERCENTAGE",
      "scoreBadgeLabel": "SECONDARY ACADEMIC STANDING",
      "isCurrent": false,
      "statusBadge": "COMPLETED",
      "description": "Completed secondary schooling with balanced academic excellence across mathematics, sciences, and fundamental computer concepts.",
      "highlights": [
        "Rigorous foundation in mathematics, science, and analytical thinking",
        "Consistent academic excellence across all core school subjects"
      ],
      "order": 1,
      "visible": true
    }
  }
}'::jsonb,
  true,
  'system-seed'
)
ON CONFLICT (section_id) DO UPDATE
SET data = EXCLUDED.data,
    is_published = true,
    updated_at = timezone('utc'::text, now());

-- Section: availability
INSERT INTO public.portfolio_sections (section_id, data, is_published, updated_by)
VALUES (
  'availability',
  '{
  "chapter": "CHAPTER 07",
  "eyebrow": "CURRENT AVAILABILITY",
  "statusLabel": "CURRENT STATUS",
  "statusBadge": "AVAILABLE",
  "statusTitle": [
    "OPEN",
    "FOR",
    "INTERNSHIPS"
  ],
  "statusSubtitle": "SOFTWARE DEVELOPMENT • FULL-STACK • AI/ML",
  "academicMeta": {
    "status": "UNDERGRADUATE",
    "degree": "B.TECH COMPUTER SCIENCE & ENGINEERING",
    "graduation": "CLASS OF 2028",
    "focus": "FULL-STACK + AI/ML"
  },
  "heading": [
    "LET''S BUILD",
    "SOMETHING",
    "USEFUL."
  ],
  "subheading": "OPPORTUNITY & COLLABORATION ARCHIVE",
  "message": "Currently looking for internship opportunities where I can contribute to real-world products, strengthen my engineering skills, and learn from challenging technical environments.",
  "opportunitiesTitle": "WHAT I''M LOOKING FOR",
  "opportunities": [
    {
      "number": "01",
      "title": "SOFTWARE DEVELOPMENT",
      "subtitle": "Core systems & algorithmic solutions",
      "tag": "CORE CS"
    },
    {
      "number": "02",
      "title": "FULL-STACK DEVELOPMENT",
      "subtitle": "Responsive frontend & robust APIs",
      "tag": "WEB APPS"
    },
    {
      "number": "03",
      "title": "AI / ML",
      "subtitle": "Machine learning & intelligent interfaces",
      "tag": "INTELLIGENCE"
    },
    {
      "number": "04",
      "title": "BACKEND & SYSTEMS",
      "subtitle": "Scalable services & databases",
      "tag": "INFRASTRUCTURE"
    }
  ],
  "cta": {
    "title": "AVAILABLE FOR NEW OPPORTUNITIES",
    "subtitle": "Internships • Freelance • Collaborative Projects",
    "primaryText": "LET''S CONNECT",
    "primaryHref": "mailto:mddanish31.dev@gmail.com",
    "secondaryText": "GITHUB",
    "secondaryHref": "https://github.com/mddanish-31"
  },
  "visible": true
}'::jsonb,
  true,
  'system-seed'
)
ON CONFLICT (section_id) DO UPDATE
SET data = EXCLUDED.data,
    is_published = true,
    updated_at = timezone('utc'::text, now());

-- Section: contact
INSERT INTO public.portfolio_sections (section_id, data, is_published, updated_by)
VALUES (
  'contact',
  '{
  "chapter": "CHAPTER 08",
  "eyebrow": "REACH OUT",
  "heading": [
    "LET''S",
    "CONNECT"
  ],
  "subheading": "Open to collaborations, internship opportunities, projects, and meaningful conversations about technology and ideas.",
  "topicsTitle": "OPEN FOR CONVERSATIONS",
  "topics": [
    {
      "id": "t-1",
      "label": "INTERNSHIP OPPORTUNITIES"
    },
    {
      "id": "t-2",
      "label": "PROJECT COLLABORATIONS"
    },
    {
      "id": "t-3",
      "label": "TECHNICAL DISCUSSIONS"
    },
    {
      "id": "t-4",
      "label": "OPEN SOURCE CONTRIBUTIONS"
    },
    {
      "id": "t-5",
      "label": "JUST A FRIENDLY CHAT"
    }
  ],
  "cards": [
    {
      "id": "contact-email",
      "number": "01",
      "title": "Email",
      "handle": "mddanish31.dev@gmail.com",
      "description": "Drop me a message directly for inquiries or opportunities.",
      "buttonText": "Send Email",
      "href": "mailto:mddanish31.dev@gmail.com",
      "isExternal": false,
      "brandType": "gmail"
    },
    {
      "id": "contact-github",
      "number": "02",
      "title": "GitHub",
      "handle": "@mddanish-31",
      "description": "Check out my repositories, code architectures, and open-source contributions.",
      "buttonText": "View Profile",
      "href": "https://github.com/mddanish-31",
      "isExternal": true,
      "brandType": "github"
    },
    {
      "id": "contact-linkedin",
      "number": "03",
      "title": "LinkedIn",
      "handle": "in/mddanish",
      "description": "Let''s connect professionally, share industry insights, and grow together.",
      "buttonText": "View Profile",
      "href": "https://linkedin.com/in/mddanish",
      "isExternal": true,
      "brandType": "linkedin"
    },
    {
      "id": "contact-whatsapp",
      "number": "04",
      "title": "WhatsApp",
      "handle": "+91 98765 43210",
      "description": "Quick questions, direct discussions, or instant asynchronous communication.",
      "buttonText": "Chat Now",
      "href": "https://wa.me/919876543210",
      "isExternal": true,
      "brandType": "whatsapp"
    },
    {
      "id": "contact-instagram",
      "number": "05",
      "title": "Instagram",
      "handle": "@mddanish.dev",
      "description": "Follow for project previews, behind-the-scenes engineering, and updates.",
      "buttonText": "View Profile",
      "href": "https://instagram.com/mddanish.dev",
      "isExternal": true,
      "brandType": "instagram"
    },
    {
      "id": "contact-x",
      "number": "06",
      "title": "X",
      "handle": "@mddanish_dev",
      "description": "My thoughts, software learnings, technical breakthroughs, and tech updates.",
      "buttonText": "View Profile",
      "href": "https://x.com/mddanish_dev",
      "isExternal": true,
      "brandType": "x"
    }
  ],
  "openToBanner": {
    "eyebrow": "CURRENTLY OPEN TO",
    "title": "INTERNSHIP OPPORTUNITIES",
    "subtracks": "Software Development • Full-Stack • AI / ML • Open Source",
    "rightTitle": "LET''S BUILD TOGETHER",
    "rightMessage": "If you have an opportunity, a project idea, or just want to talk about tech, feel free to reach out."
  },
  "visible": true
}'::jsonb,
  true,
  'system-seed'
)
ON CONFLICT (section_id) DO UPDATE
SET data = EXCLUDED.data,
    is_published = true,
    updated_at = timezone('utc'::text, now());

-- Section: footer
INSERT INTO public.portfolio_sections (section_id, data, is_published, updated_by)
VALUES (
  'footer',
  '{
  "cta": {
    "chapter": "FINAL CHAPTER",
    "eyebrow": "GET IN TOUCH",
    "heading": [
      "LET''S BUILD",
      "SOMETHING",
      "WORTH REMEMBERING."
    ],
    "subheading": "Have an idea, opportunity, or project in mind? Let''s turn it into something meaningful.",
    "availability": "AVAILABLE FOR OPPORTUNITIES",
    "metadata": {
      "availableFor": "INTERNSHIPS • FREELANCE • COLLABORATIONS",
      "profile": "MD. DANISH RAZA • FULL-STACK DEVELOPER • AI/ML • CREATIVE TECHNOLOGY"
    },
    "primaryCta": {
      "text": "LET''S TALK",
      "href": "mailto:mddanish31.dev@gmail.com"
    },
    "secondaryCta": {
      "text": "VIEW MY WORK",
      "href": "#projects"
    }
  },
  "brand": {
    "name": "MD. DANISH RAZA",
    "role": "FULL-STACK DEVELOPER",
    "specialization": "AI/ML • CREATIVE TECHNOLOGY",
    "academic": "B.TECH COMPUTER SCIENCE & ENGINEERING • CLASS OF 2028"
  },
  "navigation": [
    {
      "name": "HOME",
      "href": "#home"
    },
    {
      "name": "ABOUT",
      "href": "#about"
    },
    {
      "name": "YEARBOOK",
      "href": "#academic"
    },
    {
      "name": "SKILLS",
      "href": "#skills"
    },
    {
      "name": "WORK",
      "href": "#projects"
    },
    {
      "name": "EXPERIENCE",
      "href": "#experience"
    },
    {
      "name": "EDUCATION",
      "href": "#education"
    },
    {
      "name": "AVAILABILITY",
      "href": "#availability"
    },
    {
      "name": "CONTACT",
      "href": "#contact"
    }
  ],
  "socials": [
    {
      "name": "GITHUB",
      "handle": "@mddanish-31",
      "href": "https://github.com/mddanish-31"
    },
    {
      "name": "LINKEDIN",
      "handle": "in/mddanish",
      "href": "https://linkedin.com/in/mddanish"
    },
    {
      "name": "INSTAGRAM",
      "handle": "@mddanish.dev",
      "href": "https://instagram.com/mddanish.dev"
    },
    {
      "name": "X",
      "handle": "@mddanish_dev",
      "href": "https://x.com/mddanish_dev"
    }
  ],
  "admin": {
    "text": "ADMIN PORTAL",
    "href": "/admin"
  },
  "bottom": {
    "copyright": "© 2026 MD. DANISH RAZA. ALL RIGHTS RESERVED.",
    "tagline": "BUILT WITH CODE & CURIOSITY",
    "backToTop": "BACK TO TOP"
  },
  "visible": true
}'::jsonb,
  true,
  'system-seed'
)
ON CONFLICT (section_id) DO UPDATE
SET data = EXCLUDED.data,
    is_published = true,
    updated_at = timezone('utc'::text, now());

