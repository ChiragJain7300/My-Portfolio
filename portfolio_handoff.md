# Chirag Jain Portfolio — Complete Repository Handoff Package


---

## 1. Developer Profile & Bio Metadata

| Field | Value |
| :--- | :--- |
| **Full Name** | Chirag Jain |
| **Role / Title** | Full Stack Developer & AI Automation Engineer |
| **Primary Focus** | Next.js · TypeScript · LLM Pipelines · Node.js · n8n Automation |
| **Location** | India (Open to Remote Worldwide) |
| **Email** | `chiragjain7300@gmail.com` |
| **GitHub** | [github.com/ChiragJain7300](https://github.com/ChiragJain7300) |
| **LinkedIn** | [linkedin.com/in/chirag-jain-7300](https://www.linkedin.com/in/chirag-jain-7300) |
| **Years in Prod** | 4+ Years (2022 - Present) |

---

## 2. Complete Data Store (`data/index.ts`)

Copy and paste this into `data/index.ts` in your target repository:

```typescript
export const projects = [
  {
    id: 1,
    title: "PromptPedia",
    category: "fullstack",
    categoryLabel: "Full Stack / AI",
    des: "A modern full-stack web application for discovering, creating, and sharing AI prompts with real-time tag filtering and user authentication.",
    img: "/Prompt.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "NextAuth"],
    link: "https://prompt-pedia-seven.vercel.app/",
    github: "https://github.com/ChiragJain7300",
    isPrivate: false,
    highlights: [
      "NextAuth OAuth integration",
      "Dynamic MongoDB search and tag indexing",
      "Mobile-first responsive design",
    ],
  },
  {
    id: 2,
    title: "SEO Recommendation & Content AI Engine",
    category: "ai",
    categoryLabel: "AI / Automation",
    des: "Production-grade automation engine and LLM pipeline that analyzes content and generates actionable SEO insights, keyword GAP analysis, and structured copy.",
    img: "/n8n-01.png",
    tags: ["n8n Automation", "JavaScript", "OpenAI Agents", "DataForSEO API", "Agentic AI"],
    link: "https://github.com/ChiragJain7300",
    github: "https://github.com/ChiragJain7300",
    isPrivate: true,
    highlights: [
      "LLM structured JSON output extraction",
      "Automated webhook workflows with n8n",
      "Actionable keyword and density analysis",
      "Real-time SEO keyword research and GAP Analysis",
    ],
  },
  {
    id: 3,
    title: "WDM Platform — Logistics & Integration Engine",
    category: "backend",
    categoryLabel: "Backend / Logistics API",
    des: "Mission-critical backend integration engine orchestrating high-volume catalog synchronization, report ingestion, and order operations between Bol.com and Monday.com.",
    img: "",
    graphicType: "logistics",
    tags: ["Node.js (ESM)", "Express.js 5", "MongoDB", "Bol.com API v10", "Monday.com GraphQL", "node-cron", "PM2"],
    link: "#contact",
    github: "https://github.com/ChiragJain7300",
    isPrivate: true,
    highlights: [
      "Race-free DB-cached OAuth2 token manager with 30s pre-expiry refresh buffer",
      "Self-healing cron recovery runner (CronLog) re-executing failed tasks in-place",
      "Hybrid concurrency engine: Promise.allSettled() + 8s chunked polling queue",
      "Streaming Node.js catalog ingestion parser with set-difference (A \\ B) delisting",
    ],
  },
  {
    id: 4,
    title: "Just Walk India — Sports Ticketing Platform",
    category: "fullstack",
    categoryLabel: "Full Stack / SSR App",
    des: "Production-grade sports ticketing and endurance event platform built to handle high-traffic registration spikes, dynamic group registrations, and real-time conversion telemetry.",
    img: "/jwi-01.png",
    graphicType: "ticketing",
    tags: ["Next.js 15", "React 19", "TypeScript", "Redux Toolkit", "NextAuth.js", "Material UI v6", "Sentry", "Mixpanel"],
    link: "https://www.justwalkindia.com/",
    github: "https://github.com/ChiragJain7300",
    isPrivate: true,
    highlights: [
      "Dynamic multi-participant booking engine in Redux Toolkit & Yup/Zod schemas",
      "Isomorphic Axios interceptor resolving session context (Client vs SSR Edge)",
      "Full-spectrum telemetry pipeline (Sentry, Mixpanel funnels & Meta Pixel)",
      "Zero-downtime bundle versioning (react-cache-buster) preventing ChunkLoadError",
    ],
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

export const socialMedia = [
  { id: 1, name: "GitHub", link: "https://www.github.com/ChiragJain7300" },
  { id: 2, name: "LinkedIn", link: "https://www.linkedin.com/in/chirag-jain-7300" },
];
```
