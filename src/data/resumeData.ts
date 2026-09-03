export interface ContactInfo {
  name: string;
  role: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  linkedinUrl: string;
  github: string;
  githubUrl: string;
  resumeUrl: string;
}

export interface EducationInfo {
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  status: string;
}

export interface SkillCategory {
  title: string;
  tag: string;
  skills: {
    name: string;
    category: string;
    description: string;
    featured?: boolean;
  }[];
}

export interface EngineeringMission {
  id: string;
  missionNumber: string;
  title: string;
  platform: string;
  challenge: string;
  solution: string;
  impact: string;
  tags: string[];
  metrics: string[];
}

export interface ArchitectureNode {
  id: string;
  label: string;
  tech: string;
  role: string;
  whyExists: string;
  whatItSolves: string;
  shivUsage: string;
}

export interface ProjectData {
  id: string;
  title: string;
  date: string;
  subtitle: string;
  overview: string;
  tags: string[];
  nodes: ArchitectureNode[];
  pipeline: {
    step: string;
    title: string;
    detail: string;
  }[];
  metrics: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface LeadershipRole {
  title: string;
  organization: string;
  period: string;
  linkText?: string;
  bullets: string[];
  impactPoints: {
    metric: string;
    label: string;
    detail: string;
  }[];
}

export interface AchievementItem {
  id: string;
  rankOrBadge: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  tag: string;
}

export const RESUME_DATA = {
  contact: {
    name: "SHIV KANT DHAKRE",
    role: "Full-Stack Engineer & AI/Systems Builder",
    tagline: "Building production systems, AI workflows & digital experiences.",
    email: "dhakreshivkant@gmail.com",
    phone: "+91 63961-07509",
    location: "Agra, Uttar Pradesh, India",
    linkedin: "in/shivkantdhakre",
    linkedinUrl: "https://www.linkedin.com/in/shivkantdhakre",
    github: "shivkantdhakre",
    githubUrl: "https://github.com/shivkantdhakre",
    resumeUrl: "/resume.pdf",
  } as ContactInfo,

  summary:
    "Forward-thinking Computer Science undergraduate with hands-on industry experience across full-stack web, mobile, and AI-driven systems. Adept at leveraging modern frameworks (React.js, React Native, Node.js, FastAPI) to build secure, production-grade applications. Demonstrated strong problem-solving skills — from resolving critical production defects to architecting multi-tenant systems from scratch — alongside cross-functional leadership in technical and community initiatives. Passionate about secure backend infrastructure (OAuth, JWT), CI/CD, and integrating Machine Learning pipelines (RAG) for data-driven solutions.",

  education: {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    institution: "Madan Mohan Malaviya University of Technology, Gorakhpur",
    period: "09/2023 – Present",
    cgpa: "7.62 / 10.0",
    status: "Undergraduate (Final Years)",
  } as EducationInfo,

  skillCategories: [
    {
      title: "Programming Languages",
      tag: "CORE_SYNTAX",
      skills: [
        { name: "TypeScript", category: "Languages", description: "Strict typing for production full-stack systems", featured: true },
        { name: "JavaScript", category: "Languages", description: "ES6+, event loop, async runtime architecture", featured: true },
        { name: "Python", category: "Languages", description: "Data science, NLP pipelines & microservices", featured: true },
        { name: "C++", category: "Languages", description: "DSA, algorithmic optimization, memory models", featured: true },
        { name: "HTML5 / CSS3", category: "Languages", description: "Semantic web, responsive layouts, accessibility", featured: false },
      ],
    },
    {
      title: "Frameworks & Libraries",
      tag: "APPLICATION_LAYER",
      skills: [
        { name: "React.js", category: "Frontend", description: "Component state architecture, hooks, virtual DOM", featured: true },
        { name: "Next.js", category: "Full-Stack", description: "App Router, SSR, SSG, Server Actions, API routes", featured: true },
        { name: "React Native (Expo)", category: "Mobile", description: "Cross-platform mobile apps for ERP & consumer", featured: true },
        { name: "Node.js", category: "Backend", description: "High-throughput asynchronous event-driven services", featured: true },
        { name: "NestJS", category: "Backend", description: "Modular enterprise TypeScript backend framework", featured: true },
        { name: "FastAPI", category: "Backend", description: "High-performance Python API microservices", featured: false },
        { name: "Tailwind CSS", category: "Styling", description: "Modern utility-first styling & design token systems", featured: false },
        { name: "Pandas & PyPDF", category: "Data Tools", description: "Contract ingestion & structured tabular analysis", featured: false },
      ],
    },
    {
      title: "Databases & Infrastructure",
      tag: "STORAGE_PIPELINES",
      skills: [
        { name: "PostgreSQL", category: "Database", description: "Relational persistence, nested transactions, ACID", featured: true },
        { name: "MongoDB", category: "Database", description: "Document data store for rapid schema evolution", featured: false },
        { name: "Redis", category: "Cache / Queue", description: "In-memory caching, token locks, latency reduction", featured: true },
        { name: "Prisma ORM", category: "ORM", description: "Type-safe database client and migrations", featured: true },
        { name: "BullMQ", category: "Queues", description: "Redis-backed distributed async job processing", featured: true },
        { name: "CI/CD & Git", category: "DevOps", description: "GitHub Actions, automated test gates, Husky pre-commit hooks", featured: true },
        { name: "Firebase / FCM", category: "Cloud", description: "Push notification management and realtime events", featured: false },
      ],
    },
    {
      title: "AI, ML & Security",
      tag: "INTELLIGENCE_LAYER",
      skills: [
        { name: "Hugging Face (BART/BERT)", category: "AI/NLP", description: "Transformer pipelines, embeddings, text summarization", featured: true },
        { name: "Zero-Shot Classification", category: "AI/NLP", description: "Dynamic document categorisation without retraining", featured: true },
        { name: "RAG Systems", category: "AI/ML", description: "Retrieval-Augmented Generation for grounded answers", featured: true },
        { name: "JWT & OAuth 2.0", category: "Security", description: "Stateless auth, refresh token engines, request locks", featured: true },
      ],
    },
  ] as SkillCategory[],

  experience: {
    company: "Groww You",
    role: "Full Stack Developer Intern",
    period: "06/2026 – 08/2026",
    location: "Remote / Hybrid",
    summary:
      "Architected multi-tenant business systems, debugged mission-critical production concurrency bugs, introduced CI/CD pipelines, and shipped real-time customer and partner mobile workflows across ride-hailing and home-services apps.",
    missions: [
      {
        id: "mission-1",
        missionNumber: "01",
        title: "Multi-Tenant Enterprise ERP Platform",
        platform: "Web Dashboard + React Native / Expo Mobile App",
        challenge:
          "SMEs needed a centralized system to manage inventory, branches, and financial ledgers with strict regulatory compliance across mobile and web.",
        solution:
          "Architected a unified multi-tenant ERP platform from scratch. Designed unified schemas for inventory, branch separation, and ledger double-entry bookkeeping. Implemented GST/E-Way billing and dual-format (standard A4 and POS Thermal) receipt generation.",
        impact:
          "Allowed cross-branch business operations with instant thermal receipt generation and automated GST calculations.",
        tags: ["Next.js", "React Native", "Expo", "PostgreSQL", "Multi-Tenancy", "GST Billing"],
        metrics: ["Web + Mobile Parity", "A4 & Thermal Dual Invoicing", "Multi-Branch Isolation"],
      },
      {
        id: "mission-2",
        missionNumber: "02",
        title: "Token-Refresh Race Condition & Reliability Engine",
        platform: "Live Ride-Hailing Mobile App",
        challenge:
          "Drivers and riders suffered from frequent unexpected logouts during live trips whenever multiple concurrent API requests fired during access token expiration.",
        solution:
          "Root-caused the token-refresh race condition where duplicate refresh requests invalidated session tokens. Engineered a unified refresh engine with mutex-style request locking, request queueing, and staged rollout with real-time error telemetry.",
        impact:
          "Eliminated intermittent user logouts across the live mobile app and guaranteed zero session drop during active rides.",
        tags: ["Concurrency", "Mutex Request Locking", "JWT Rotation", "Staged Rollout", "Observability"],
        metrics: ["100% Elimination of Logout Bug", "Zero Drop in Active Rides", "Queued Request Retry"],
      },
      {
        id: "mission-3",
        missionNumber: "03",
        title: "Offline Sync Data-Integrity & CI/CD Gates",
        platform: "Mobile Field & Warehouse Operations",
        challenge:
          "Field workers created orders and status updates offline, leading to duplicate ID collisions and silent data sync corruptions during OTA updates.",
        solution:
          "Engineered an OTA-safe pure-JS UUID generator and a dual-trigger retry synchronization logic that reconciled offline data queues. Established the repository's first CI/CD quality gates using Husky and GitHub Actions.",
        impact:
          "Guaranteed offline record integrity without native module re-linking crashes, and enforced strict lint/test gates across team PRs.",
        tags: ["Offline Sync", "Pure-JS UUID", "Husky", "GitHub Actions", "OTA Safe"],
        metrics: ["Zero Sync Collisions", "Automated CI/CD Gates", "OTA Compatible"],
      },
      {
        id: "mission-4",
        missionNumber: "04",
        title: "Real-Time Broadcast & Notification System",
        platform: "Ride-Hailing Admin Operations",
        challenge:
          "Operations dispatchers lacked an immediate mechanism to send targeted announcements, alerts, and emergency updates to active drivers and riders.",
        solution:
          "Designed and shipped a Broadcast & Notification Management System on the administrative dashboard, supporting geo-targeted announcements, template management, and low-latency delivery.",
        impact:
          "Enabled instant operational alerts for traffic disruptions and peak surge promotions.",
        tags: ["WebSockets", "FCM", "Admin Dashboard", "Real-Time", "Geo-Targeting"],
        metrics: ["Instant Delivery", "Multi-Segment Targeting", "Audited Delivery Logs"],
      },
      {
        id: "mission-5",
        missionNumber: "05",
        title: "End-to-End Home-Services Marketplace",
        platform: "Client App + Service Partner App",
        challenge:
          "Required a dual-sided booking system supporting both instantaneous dispatch and scheduled appointments with financial trust.",
        solution:
          "Built the complete booking engine covering instant & appointment workflows, verified Ratings & Reviews, FCM background push notifications, and integrated Wallet/Bank Account payout management.",
        impact:
          "Created an autonomous dispatch cycle from service discovery to customer confirmation and partner bank balance disbursement.",
        tags: ["React Native", "Node.js", "Wallet Integration", "FCM Push", "Ratings Engine"],
        metrics: ["Dual-sided Client/Partner", "Scheduled & Instant Booking", "Secure Wallet/Bank Ledger"],
      },
      {
        id: "mission-6",
        missionNumber: "06",
        title: "Production Infrastructure & Live Release Maintenance",
        platform: "Ride-Hailing, Home-Services & E-Commerce Deployments",
        challenge:
          "Maintaining uninterrupted uptime, clean database migrations, and hotfixes across three active production consumer apps.",
        solution:
          "Managed automated database migrations, zero-downtime backups, APK/bundle releases, and monitored live error logs to push urgent hotfixes.",
        impact:
          "Preserved system stability and operational uptime across multi-product production ecosystems.",
        tags: ["Database Migrations", "Production Hotfixes", "Release Engineering", "Observability"],
        metrics: ["High Availability", "Automated Backups", "Cross-App Deployments"],
      },
    ] as EngineeringMission[],
  },

  projects: [
    {
      id: "seo-health-scanner",
      title: "SEO Health Scanner",
      date: "August 2025",
      subtitle: "Enterprise Web Performance & AI Audit Engine",
      overview:
        "Full-stack asynchronous performance analyzer utilizing NestJS, Next.js, and Prisma ORM to evaluate web performance metrics via Google Lighthouse API, backed by BullMQ workers, Redis caching, and Gemini AI actionable reporting.",
      tags: ["Next.js", "NestJS", "Prisma ORM", "BullMQ", "Redis", "Google Lighthouse API", "Gemini AI"],
      nodes: [
        {
          id: "node-client",
          label: "Next.js UI",
          tech: "Next.js App Router",
          role: "User Interface & Realtime Stream",
          whyExists: "Provides responsive real-time audit triggers and live progress polling.",
          whatItSolves: "Avoids long HTTP timeouts by decoupling audit triggering from job completion.",
          shivUsage: "Created dashboard with instant score gauges and structured metric tabs.",
        },
        {
          id: "node-api",
          label: "NestJS Core",
          tech: "NestJS (TypeScript)",
          role: "API Gateway & Validation",
          whyExists: "Structured modular backend with dependency injection and DTO validation.",
          whatItSolves: "Prevents malformed domain scans and coordinates access security.",
          shivUsage: "Built controller endpoints, domain sanitization, and database models.",
        },
        {
          id: "node-queue",
          label: "BullMQ Pipeline",
          tech: "BullMQ + Redis",
          role: "Asynchronous Task Scheduler",
          whyExists: "Google Lighthouse scans take 15–30 seconds and require dedicated compute.",
          whatItSolves: "Prevents node event-loop starvation by delegating heavy jobs to background workers.",
          shivUsage: "Engineered distributed queue with automatic retries and concurrency limits.",
        },
        {
          id: "node-lighthouse",
          label: "Lighthouse Engine",
          tech: "Google Lighthouse API",
          role: "Metric Evaluator",
          whyExists: "Industry standard audit for Performance, Accessibility, Best Practices & SEO.",
          whatItSolves: "Extracts real Core Web Vitals (FCP, LCP, CLS, TBT, Speed Index).",
          shivUsage: "Parsed multi-megabyte audit JSON into structured normalized performance models.",
        },
        {
          id: "node-cache",
          label: "Redis Cache Layer",
          tech: "Redis In-Memory",
          role: "Centralized Result Cache",
          whyExists: "Repeated audits of identical URLs waste external quota and time.",
          whatItSolves: "Reduces audit response latency from 25s to 40ms on fresh cached runs.",
          shivUsage: "Implemented TTL-based caching and job state synchronization.",
        },
        {
          id: "node-ai",
          label: "Gemini AI Synthesis",
          tech: "Google Gemini AI",
          role: "Automated Diagnostic Engine",
          whyExists: "Raw JSON metrics are hard for non-technical stakeholders to act upon.",
          whatItSolves: "Translates technical Core Web Vitals into prioritized, plain-English code recommendations.",
          shivUsage: "Engineered prompt pipelines instructing Gemini to output actionable markdown solutions.",
        },
        {
          id: "node-db",
          label: "Prisma & PostgreSQL",
          tech: "PostgreSQL + Prisma",
          role: "Persistent Audit Store",
          whyExists: "Historical tracking of domain score improvements over time.",
          whatItSolves: "Ensures ACID reliability across nested audit reports and score snapshots.",
          shivUsage: "Used nested database transactions to save audit logs atomically.",
        },
      ],
      pipeline: [
        { step: "01", title: "Target URL Ingestion", detail: "Client requests domain scan; NestJS validates URL and checks Redis cache." },
        { step: "02", title: "Asynchronous Queueing", detail: "Job is dispatched to BullMQ worker pool with unique job ID and rate limiting." },
        { step: "03", title: "Lighthouse Execution", detail: "Worker invokes headless Chromium/Lighthouse audit across mobile & desktop." },
        { step: "04", title: "Gemini AI Diagnostic", detail: "Raw metrics fed into Gemini AI to generate prioritized developer remediation steps." },
        { step: "05", title: "Atomic Storage & Live Broadcast", detail: "Prisma executes nested transaction; results stored and cached; client receives notification." },
      ],
      metrics: [
        "Sub-second cached audit responses (down from ~25s)",
        "Zero event-loop starvation via BullMQ isolation",
        "Automated Gemini AI remediation plans",
      ],
    },
    {
      id: "legal-risk-analyzer",
      title: "AI-Powered Legal Risk Analyzer",
      date: "November 2025",
      subtitle: "NLP Contract Parsing & Zero-Shot Anomaly Detection",
      overview:
        "AI document analyzer developed with Python and Hugging Face NLP pipelines. Features a custom text-chunking algorithm bypassing transformer token constraints to perform zero-shot risk classification, named entity recognition (NER), and contractual liability scoring.",
      tags: ["Python", "Hugging Face", "BART", "BERT", "Zero-Shot Classification", "NER", "PyPDF"],
      nodes: [
        {
          id: "node-doc",
          label: "Document Ingestion",
          tech: "PyPDF & OCR Parser",
          role: "Raw PDF Text Extraction",
          whyExists: "Contracts exist in varied formatting, headers, footers, and multi-column layouts.",
          whatItSolves: "Extracts clean unstructured legal text while preserving clause boundaries.",
          shivUsage: "Engineered text cleaning routines to strip formatting artifacts and table noise.",
        },
        {
          id: "node-chunk",
          label: "Custom Semantic Chunking",
          tech: "Custom Algorithmic Boundary Parser",
          role: "Token Limit Bypass",
          whyExists: "Hugging Face models (BERT/BART) have rigid 512-token context windows.",
          whatItSolves: "Prevents arbitrary truncation of legal clauses which could miss hidden liability risks.",
          shivUsage: "Developed sliding-window chunker with semantic clause overlap preservation.",
        },
        {
          id: "node-zero",
          label: "Zero-Shot Classifier",
          tech: "BART-Large-MNLI",
          role: "Dynamic Risk Categorization",
          whyExists: "Legal language varies widely without massive labeled training datasets.",
          whatItSolves: "Classifies clauses into Indemnification, Termination, Non-Compete, and Jurisdiction without retraining.",
          shivUsage: "Configured classification thresholds and confidence calibrations.",
        },
        {
          id: "node-ner",
          label: "Legal Entity Extractor",
          tech: "BERT-NER Pipeline",
          role: "Named Entity Recognition",
          whyExists: "Must identify parties, monetary figures, penalty liabilities, and governing jurisdictions.",
          whatItSolves: "Flags missing parties, mismatched definitions, and unbounded indemnity limits.",
          shivUsage: "Mapped extracted entities to structured legal risk matrices.",
        },
        {
          id: "node-score",
          label: "Risk Matrix Scoring",
          tech: "Python Analytical Engine",
          role: "Composite Liability Scorer",
          whyExists: "Lawyers and compliance officers need a high-level executive risk index.",
          whatItSolves: "Aggregates weighted clause scores into a 0–100 risk heat index with red-flag callouts.",
          shivUsage: "Created deterministic scoring model flagging high-severity liabilities.",
        },
      ],
      pipeline: [
        { step: "01", title: "PDF Ingestion", detail: "Contract ingested, cleaned of layout noise, and structured into textual clauses." },
        { step: "02", title: "Semantic Chunking", detail: "Custom algorithm breaks text into optimal sliding windows with clause context preservation." },
        { step: "03", title: "Zero-Shot Classification", detail: "BART evaluates each chunk against risk classes (liability, indemnification, termination)." },
        { step: "04", title: "Entity Extraction", detail: "BERT extracts legal entities, governing laws, jurisdiction clauses, and financial penalties." },
        { step: "05", title: "Risk Score & Red Flags", detail: "Aggregates findings into executive summary highlighting critical contractual hazards." },
      ],
      metrics: [
        "Successfully bypassed 512-token limit across 50+ page documents",
        "High-confidence zero-shot classification without retraining",
        "Actionable red-flag detection across indemnification & liability",
      ],
    },
  ] as ProjectData[],

  leadership: [
    {
      title: "Secretary",
      organization: "National Service Scheme (NSS) Cell, MMMUT",
      period: "07/2025 – Present",
      bullets: [
        "Directed cross-functional student teams executing large-scale university initiatives including PARARTH'26 and GOONJ'26, coordinating logistics and outreach.",
        "Spearheaded structured technical skill development workshops that raised student digital proficiencies across modern software and digital tools.",
        "Spearheaded community outreach operations and established secure, compliant documentation pipelines for volunteer hours and activity records.",
        "Mentored incoming cohorts in technical problem-solving, structured teamwork, and mitigating logistical bottlenecks during campus events.",
      ],
      impactPoints: [
        { metric: "PARARTH'26 & GOONJ'26", label: "Flagship Initiatives", detail: "Directed university-wide student initiatives and cultural/technical gatherings." },
        { metric: "Documentation Pipeline", label: "Governance & Compliance", detail: "Established structured digital records for volunteer attendance and activity tracking." },
        { metric: "Cohort Mentorship", label: "Talent Development", detail: "Conducted workshops in algorithmic problem-solving and software tooling." },
      ],
    },
    {
      title: "Technical Co-ordinator",
      organization: "IIMS-2025 (International Conference), MMMUT",
      period: "01/2025 – 04/2025",
      bullets: [
        "Architected and reliably maintained the official international conference website, ensuring high availability and secure handling of global participant paper submissions.",
        "Engineered automated workflows for bulk communication and data management, streamlining conference logistics and cross-departmental coordination.",
        "Awarded official Certificate of Appreciation by the Department of Civil Engineering, MMMUT (April 2025) for flawless technical execution.",
      ],
      impactPoints: [
        { metric: "100% Uptime", label: "Conference Portal", detail: "Maintained portal for international researcher submissions and reviews." },
        { metric: "Automated Communication", label: "Workflow Automation", detail: "Engineered batch messaging and submission confirmation pipelines." },
        { metric: "Official Commendation", label: "Civil Eng. Dept Award", detail: "Formally recognized for technical leadership and execution." },
      ],
    },
  ] as LeadershipRole[],

  achievements: [
    {
      id: "ach-1",
      rankOrBadge: "3RD PLACE",
      title: "Flip Flop (Duo Coding Event)",
      organization: "ENNEXUS'24 — Technical Fest",
      date: "April 2024",
      description: "Secured 3rd place in intense competitive duo programming challenge testing collaborative debugging, algorithmic speed, and data structure mastery under strict time limits.",
      tag: "COMPETITIVE PROGRAMMING",
    },
    {
      id: "ach-2",
      rankOrBadge: "CERTIFICATE",
      title: "Technical Coordination Commendation",
      organization: "Dept. of Civil Engineering, MMMUT (IIMS-2025)",
      date: "April 2025",
      description: "Awarded formal Certificate of Appreciation for successfully architecting, securing, and maintaining the international conference web infrastructure and submission workflows.",
      tag: "COMMENDATION",
    },
    {
      id: "ach-3",
      rankOrBadge: "AIR 61,134",
      title: "Joint Entrance Examination (JEE) Mains",
      organization: "National Testing Agency (NTA)",
      date: "April 2023",
      description: "Ranked among the top percentile nationwide in one of the most competitive engineering entrance exams, demonstrating foundational excellence in mathematics and analytical problem-solving.",
      tag: "NATIONAL EXAM",
    },
    {
      id: "ach-4",
      rankOrBadge: "ADVANCED C++",
      title: "Data Structures & Algorithmic Problem Solving",
      organization: "Competitive Programming & Problem Solving",
      date: "2023 – Present",
      description: "Consistently solve complex algorithmic challenges utilizing advanced patterns in C++ (graphs, dynamic programming, trees, greedy heuristics) for optimal asymptotic performance.",
      tag: "CORE ENGINEERING",
    },
  ] as AchievementItem[],

  philosophy: {
    quote: "Stories taught me to think in worlds. Engineering taught me to build them.",
    principles: [
      {
        title: "Systems Over Screens",
        desc: "A stunning UI is meaningless if the backend token engine drops sessions or the offline queue corrupts user ledgers. True craftsmanship bridges both.",
      },
      {
        title: "Resilience in Production",
        desc: "Production bugs aren't anomalies; they are stress-tests of system architecture. From mutex locks to idempotent sync, stability must be engineered.",
      },
      {
        title: "Code Builds Systems, People Build Communities",
        desc: "Technical excellence amplifies when shared. Organizing student initiatives and mentoring cohorts builds the ecosystem around the software.",
      },
    ],
  },
};
