export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Experience", link: "#experience" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building a Job Tracking and Management App",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

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
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
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
      "Designed and implemented stored procedures and functions in MySQL/PostgreSQL for automated reporting, batch processing, and business logic encapsulation.",
      "Actively collaborated in Agile teams and mentored junior developers during onboarding."
    ],
    tech: ["Node.js", "Express.js", "MySQL", "PostgreSQL", "APIs", "Agile", "SQL Stored Procedures"],
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "Freelance Full Stack Developer",
    company: "Freelance",
    duration: "February 2023 - July 2025",
    desc: "Built and deployed full-stack web applications using MERN & Next.js frameworks.",
    bullets: [
      "Built and deployed full-stack web applications using MongoDB, Express.js, React, Node.js, and Next.js.",
      "Developed Promptpedia (AI prompt-sharing app) and QuillQuest (bookstore platform), implementing user authentication, CRUD functionality, and responsive UI.",
      "Created a Gemini AI clone with conversational UI and OpenAI API integration using Next.js and Tailwind CSS.",
      "Deployed projects on Vercel/Render, followed mobile-first design patterns, and used GitHub for version control."
    ],
    tech: ["React", "Next.js", "MongoDB", "Express.js", "Node.js", "Tailwind CSS", "OpenAI API", "GitHub"],
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "Inventam Tech Solutions",
    duration: "August 2025 - Present",
    desc: "Built production-grade automation workflows, LLM engines, Gmail automation platforms, and full stack applications.",
    bullets: [
      "Built production-grade automation workflows using n8n and Make to streamline business processes and improve operational efficiency.",
      "Developed an AI-powered SEO Recommendation Engine that analyzed content and generated actionable SEO insights using LLM-driven pipelines.",
      "Engineered an SEO-Optimized Content Generator leveraging Large Language Models (LLMs) to create structured, scalable, and search-friendly content.",
      "Created web scraping pipelines and custom data extraction frontends for automated client-side data collection and processing.",
      "Designed and managed a Gmail Inbox Management Platform with advanced capabilities beyond native Gmail functionality; led backend architecture and served as module lead for the project.",
      "Managed backend operations and lightweight data analytics for a Netherlands-based client, including data pipeline management, reporting, and operational backend support.",
      "Delivered ongoing support, optimization, and maintenance for multiple live production applications and automation systems."
    ],
    tech: ["Next.js", "Node.js", "TypeScript", "n8n", "Make.com", "LLMs", "OpenAI", "Web Scraping", "React"],
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://www.github.com/ChiragJain7300",
  },
  {
    id: 2,
    img: "/twit.svg",
    link: "#",
  },
  {
    id: 3,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/chirag-jain-7300",
  },
];
