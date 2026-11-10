export interface Project {
  id: number;
  slug?: string;
  hasCaseStudy?: boolean;
  title: string;
  category: "fullstack" | "ai" | "backend";
  categoryLabel: string;
  des: string;
  img: string;
  graphicType?: "logistics" | "ticketing";
  tags: string[];
  link: string;
  liveUrl?: string; // Hosted live platform or deployment website URL
  github: string;
  isPrivate: boolean;
  highlights: string[];
}

export interface WorkExperience {
  id: number;
  title: string;
  company: string;
  duration: string;
  desc: string;
  bullets: string[];
  tech: string[];
}

export interface SocialMedia {
  id: number;
  name: string;
  link: string;
}

export const developerProfile = {
  name: "Chirag Jain",
  role: "Full Stack Developer & AI Automation Engineer",
  primaryFocus: "Next.js · TypeScript · LLM Pipelines · Node.js · n8n Automation",
  location: "India (Open to Remote Worldwide)",
  email: "chiragjain7300@gmail.com",
  github: "https://github.com/ChiragJain7300",
  linkedin: "https://www.linkedin.com/in/chirag-jain-7300",
  yearsInProd: "4+ Years (2022 - Present)",
  status: "OPEN_TO_OPPORTUNITIES",
  bio: "Full Stack Developer specializing in production Next.js applications, resilient Node.js microservices, and autonomous LLM/n8n automation pipelines.",
};

export const projects: Project[] = [
  {
    id: 1,
    slug: "prompt-pedia",
    title: "PromptPedia",
    category: "fullstack",
    categoryLabel: "Full Stack / AI",
    des: "A modern full-stack web application for discovering, creating, and sharing AI prompts with real-time tag filtering and user authentication.",
    img: "/Prompt.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "NextAuth"],
    link: "https://prompt-pedia-seven.vercel.app/",
    liveUrl: "https://prompt-pedia-seven.vercel.app/",
    github: "https://github.com/ChiragJain7300",
    isPrivate: false,
    hasCaseStudy: false,
    highlights: [
      "NextAuth OAuth integration",
      "Dynamic MongoDB search and tag indexing",
      "Mobile-first responsive design",
    ],
  },
  {
    id: 2,
    slug: "seo-engine",
    title: "SEO Recommendation & Content AI Engine",
    category: "ai",
    categoryLabel: "AI / Automation",
    des: "Production-grade automation engine and LLM pipeline that analyzes content and generates actionable SEO insights, keyword GAP analysis, and structured copy.",
    img: "/n8n-01.png",
    tags: ["n8n Automation", "JavaScript", "OpenAI Agents", "DataForSEO API", "Agentic AI"],
    link: "https://github.com/ChiragJain7300",
    github: "https://github.com/ChiragJain7300",
    isPrivate: true,
    hasCaseStudy: false,
    highlights: [
      "LLM structured JSON output extraction",
      "Automated webhook workflows with n8n",
      "Actionable keyword and density analysis",
      "Real-time SEO keyword research and GAP Analysis",
    ],
  },
  {
    id: 3,
    slug: "wdm-platform",
    title: "WDM Platform — Logistics & Integration Engine",
    category: "backend",
    categoryLabel: "Backend / Logistics API",
    des: "Mission-critical backend integration engine orchestrating high-volume catalog synchronization, report ingestion, and order operations between Bol.com and Monday.com.",
    img: "/projects/wdm-platform.png",
    graphicType: "logistics",
    tags: ["Node.js (ESM)", "Express.js 5", "MongoDB", "Bol.com API v10", "Monday.com GraphQL", "node-cron", "PM2"],
    link: "/projects/wdm-platform",
    github: "https://github.com/ChiragJain7300",
    isPrivate: true,
    hasCaseStudy: true,
    highlights: [
      "Race-free DB-cached OAuth2 token manager with 30s pre-expiry refresh buffer",
      "Self-healing cron recovery runner (CronLog) re-executing failed tasks in-place",
      "Hybrid concurrency engine: Promise.allSettled() + 8s chunked polling queue",
      "Streaming Node.js catalog ingestion parser with set-difference (A \\ B) delisting",
    ],
  },
  {
    id: 4,
    slug: "just-walk-india",
    title: "Just Walk India — Sports Ticketing Platform",
    category: "fullstack",
    categoryLabel: "Full Stack / SSR App",
    des: "Production-grade sports ticketing and endurance event platform built to handle high-traffic registration spikes, dynamic group registrations, and real-time conversion telemetry.",
    img: "/projects/jwi-01.png",
    graphicType: "ticketing",
    tags: ["Next.js 15", "React 19", "TypeScript", "Redux Toolkit", "NextAuth.js", "Material UI v6", "Sentry", "Mixpanel"],
    link: "/projects/just-walk-india",
    liveUrl: "https://www.justwalkindia.com/",
    github: "https://github.com/ChiragJain7300",
    isPrivate: true,
    hasCaseStudy: true,
    highlights: [
      "Dynamic multi-participant booking engine in Redux Toolkit & Yup/Zod schemas",
      "Isomorphic Axios interceptor resolving session context (Client vs SSR Edge)",
      "Full-spectrum telemetry pipeline (Sentry, Mixpanel funnels & Meta Pixel)",
      "Zero-downtime bundle versioning (react-cache-buster) preventing ChunkLoadError",
    ],
  },
  {
    id: 5,
    slug: "blanca",
    title: "Blanca — Real Estate Discovery & Lead CRM Ecosystem",
    category: "fullstack",
    categoryLabel: "Full Stack / Enterprise Architecture",
    des: "A decoupled multi-platform real estate portal uniting a high-performance Next.js 16 public discovery frontend, a dense React 18 data workbench, and an enterprise NestJS 11 REST API.",
    img: "/projects/blanca.png",
    tags: ["Next.js 16 (App Router)", "NestJS 11", "TypeORM", "PostgreSQL", "TanStack Query v5", "Redux Toolkit", "@dnd-kit", "Buildesk CRM"],
    link: "/projects/blanca",
    github: "https://github.com/ChiragJain7300",
    isPrivate: true,
    hasCaseStudy: true,
    highlights: [
      "Sub-200ms page transitions via TanStack React Query memory caching",
      "Two-phase decoupled lead ingestion guaranteeing 100% lead capture during CRM downtime",
      "Optimistic drag-and-drop property sequencing with @dnd-kit cutting DB writes by 90%",
      "Single-flight Axios response interceptor mutex preventing token refresh race conditions",
    ],
  },
  {
    id: 6,
    slug: "inventam-hrms",
    title: "Inventam HRMS — Statutory Payroll & Telemetry Ecosystem",
    category: "fullstack",
    categoryLabel: "Enterprise Systems & Telemetry",
    des: "Enterprise-grade HRMS consolidating statutory payroll automation, Slack-driven operational workflows, and low-level cross-platform desktop tracking daemons.",
    img: "/projects/inventam-hrms.svg",
    tags: ["FastAPI (Python 3.11)", "AsyncSQLAlchemy 2.0", "PostgreSQL (asyncpg)", "WeasyPrint", "Slack Bolt", "pynput", "APScheduler", "React 19"],
    link: "/projects/inventam-hrms",
    github: "https://github.com/ChiragJain7300",
    isPrivate: true,
    hasCaseStudy: true,
    highlights: [
      "Asynchronous WeasyPrint payroll engine compiling 450+ payslips in <12s with 0 MB disk writes",
      "Cross-platform desktop telemetry agents (pynput) with encrypted local disk queues (99.9% delivery)",
      "Automated Slack Bolt HR workflows cutting leave approval turnaround from ~4.5h to <10 minutes",
      "Loss of Pay (LOP) and weekend sandwich rule evaluation engine with Indian Rupee conversion",
    ],
  },
  {
    id: 7,
    slug: "vectalk-ai",
    title: "RAG Studio Forge (VecTalk AI) — Enterprise AI Studio & Widget",
    category: "ai",
    categoryLabel: "AI / RAG Studio & Embeddables",
    des: "Enterprise AI and Retrieval-Augmented Generation (RAG) platform empowering organizations to construct, evaluate, and embed domain-specific AI assistants across multi-channel data sources.",
    img: "/projects/vectalk-ai.svg",
    tags: ["Vite 5", "React 18", "TypeScript", "Redux Toolkit", "Tailwind CSS", "Radix UI", "react-grid-layout", "Recharts", "react-markdown"],
    link: "/projects/vectalk-ai",
    github: "https://github.com/ChiragJain7300",
    isPrivate: true,
    hasCaseStudy: true,
    highlights: [
      "Maintained constant 60 FPS across 10,000+ conversation logs via memoized data slicing",
      "Lightweight embeddable chat widget (<180 KB) inside sandboxed iframe with UUID v4 session isolation",
      "Store-injected Axios response interceptor sanitizing raw database stack traces (sqlalchemy/asyncpg)",
      "Defensive RAG citation normalizer with interactive document source badges",
    ],
  },
  {
    id: 8,
    slug: "verified-inbox",
    title: "Verified Inbox (SCREEN) — Email Intelligence & Security Platform",
    category: "backend",
    categoryLabel: "Backend & Systems Security",
    des: "Enterprise email intelligence and inbox security platform intercepting, classifying, and trust-scoring inbound correspondence with parallel batch synchronization and sender gating.",
    img: "/projects/verified-inbox.svg",
    tags: ["NestJS 11", "TypeORM", "PostgreSQL", "React 19 (Vite 7)", "TanStack Query v5", "Tiptap v3", "Google OAuth 2.0", "Gmail API v1"],
    link: "/projects/verified-inbox",
    github: "https://github.com/ChiragJain7300",
    isPrivate: true,
    hasCaseStudy: true,
    highlights: [
      "Synchronized 500+ emails in under 6.5s using parallel batches of 50 concurrent requests (Promise.allSettled)",
      "Promise-coalescing lock map eliminating OAuth token refresh race conditions (0 invalid_grant errors)",
      "Atomic single-use auth code exchange (DELETE ... RETURNING) resolving SameSite cookie drops",
      "Multi-factor sender trust scoring (0-100) analyzing Google Contacts, SPF, DKIM, and DMARC",
    ],
  },
  {
    id: 9,
    slug: "cleancrm",
    title: "CleanCRM — Property Turnover & Field Service Platform",
    category: "fullstack",
    categoryLabel: "Full Stack & Field Service Operations",
    des: "Enterprise field service management platform for vacation rental turnover operations (Airbnb / VRBO), automated cleaner dispatch, multi-calendar scheduling, and live telemetry.",
    img: "/projects/cleancrm.svg",
    tags: ["React (SPA)", "Redux Toolkit (20+ Slices)", "FullCalendar", "Socket.io", "Firebase Cloud Messaging", "Ant Design", "Bootstrap 5", "iCal"],
    link: "/projects/cleancrm",
    github: "https://github.com/ChiragJain7300",
    isPrivate: true,
    hasCaseStudy: true,
    highlights: [
      "Reduced turnover booking creation from 4 minutes to under 30 seconds with FullCalendar templates",
      "Reduced missed property turnovers by 64% through dual-channel telemetry (FCM + Socket.io check-ins)",
      "Server-side paginated grid managing 25,000+ client and property records with <50 KB payloads per page",
      "Automated Airbnb and VRBO iCal reservation calendar synchronization with timezone normalizations",
    ],
  },
  {
    id: 10,
    slug: "eventcrm",
    title: "EventCRM — Event Lifecycle & Catering Intelligence Platform",
    category: "fullstack",
    categoryLabel: "Enterprise CRM & Catering Operations",
    des: "Enterprise-scale event planning, catering operations, and customer relationship platform automating the end-to-end event lifecycle for high-volume hospitality and venue operations.",
    img: "/projects/eventcrm.svg",
    tags: ["Next.js 15 (App Router)", "React 19 / 18", "TypeScript", "Redux Toolkit", "TanStack Table", "Yup Validation", "NextAuth.js", "AWS S3 Pre-Signed"],
    link: "/projects/eventcrm",
    github: "https://github.com/ChiragJain7300",
    isPrivate: true,
    hasCaseStudy: true,
    highlights: [
      "Unified multi-step booking wizard with Yup validation reducing onboarding from 12m to <2.5 minutes",
      "Three-tier Role-Based Access Control (RBAC) across Next.js Edge Middleware ensuring 100% route access gating",
      "Isomorphic Axios authorization client dynamically resolving Bearer tokens with Cache-Control: no-store",
      "Automated WhatsApp Business API alerts notifying executive culinary chefs of 48-hour menu lockouts",
    ],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectById(id: number) {
  return projects.find((p) => p.id === id);
}

export const testimonials = [
  {
    quote:
      "Collaborating with Chirag was an absolute pleasure. His attention to detail, strong problem-solving skills, and ability to deliver clean, scalable React code made a huge impact on our project's success. He is highly communicative and dedicated to building great products.",
    name: "Aarav Mehta",
    title: "Lead Engineer at Inventam Tech",
  },
  {
    quote:
      "Chirag brought invaluable expertise to our ERP software project. He understood the complex business logic quickly and delivered modular Oracle ADF and React components that significantly improved the overall performance. A solid full stack developer.",
    name: "Rohan Sharma",
    title: "Project Manager at Mastek",
  },
  {
    quote:
      "Working with Chirag on our web platform was seamless. He has a great command over the MERN stack and Next.js, and his ability to turn Figma designs into responsive, high-performance web pages is outstanding.",
    name: "Priya Patel",
    title: "Founder of TechVibe Solutions",
  },
];

export const companies = [
  {
    id: 1,
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Web Developer Intern",
    company: "Internship",
    duration: "May 2021 - July 2021",
    desc: "Assisted in the development of a web-based platform using MERN stack, enhancing interactivity.",
    bullets: [
      "Assisted in the development of a web-based platform using the MERN stack, enhancing interactive capabilities.",
      "Collaborated closely with senior developers to construct reusable React components and client-side form validations.",
      "Implemented REST APIs and optimized database queries using MongoDB for faster data loading and rendering."
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Redux"],
  },
  {
    id: 2,
    title: "Associate Consultant (Technical)",
    company: "Mastek (Evosys)",
    duration: "January 2022 - October 2022",
    desc: "Developed & deployed secure and scalable systems tailored to client needs using Node.js, Express, and SQL databases.",
    bullets: [
      "Developed and deployed secure, scalable systems tailored to specific client business requirements.",
      "Engineered backend APIs with Node.js and Express, improving data handling efficiency by 35%.",
      "Integrated third-party services to streamline workflows and enhance UI responsiveness.",
      "Designed and implemented stored procedures and functions in MySQL/PostgreSQL for automated reporting.",
      "Actively collaborated in Agile teams and mentored junior developers during onboarding."
    ],
    tech: ["Node.js", "Express.js", "MySQL", "PostgreSQL", "APIs", "Agile", "SQL Stored Procedures"],
  },
  {
    id: 3,
    title: "Freelance Full Stack Developer",
    company: "Freelance",
    duration: "February 2023 - July 2025",
    desc: "Built and deployed full-stack web applications using MERN & Next.js frameworks.",
    bullets: [
      "Built and deployed full-stack web applications using MongoDB, Express.js, React, Node.js, and Next.js.",
      "Developed Promptpedia (AI prompt-sharing app) and QuillQuest (bookstore platform).",
      "Created a Gemini AI clone with conversational UI and OpenAI API integration using Next.js and Tailwind CSS.",
      "Deployed projects on Vercel/Render following mobile-first design patterns."
    ],
    tech: ["React", "Next.js", "MongoDB", "Express.js", "Node.js", "Tailwind CSS", "OpenAI API", "GitHub"],
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "Inventam Tech Solutions",
    duration: "August 2025 - Present",
    desc: "Built production-grade automation workflows, LLM engines, Gmail automation platforms, and full stack applications.",
    bullets: [
      "Built production-grade automation workflows using n8n and Make to streamline business processes.",
      "Developed an AI-powered SEO Recommendation Engine that analyzed content using LLM-driven pipelines.",
      "Engineered an SEO-Optimized Content Generator leveraging LLMs for search-friendly content.",
      "Created web scraping pipelines and custom data extraction frontends.",
      "Designed and managed a Gmail Inbox Management Platform as backend module lead.",
      "Managed backend operations and lightweight data analytics for a Netherlands-based client."
    ],
    tech: ["Next.js", "Node.js", "TypeScript", "n8n", "Make.com", "LLMs", "OpenAI", "Web Scraping", "React"],
  },
];

export const socialMedia: SocialMedia[] = [
  { id: 1, name: "GitHub", link: "https://www.github.com/ChiragJain7300" },
  { id: 2, name: "LinkedIn", link: "https://www.linkedin.com/in/chirag-jain-7300" },
];
