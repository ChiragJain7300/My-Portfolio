import { CaseStudy } from "@/types/case-study";

export const eventcrmCaseStudy: CaseStudy = {
  slug: "eventcrm",
  title: "EventCRM — Event Lifecycle & Catering Intelligence Platform",
  subtitle:
    "Lead-to-Event Onboarding Wizard, Isomorphic NextAuth Authorization & Edge Role-Based Access Control",
  tagline:
    "Enterprise-scale event planning, catering operations, and customer relationship platform automating the end-to-end event lifecycle for high-volume hospitality and venue operations.",
  category: "fullstack",
  categoryLabel: "Enterprise CRM & Catering Operations",
  role: "Lead Full Stack Architect",
  timeline: "Production Active (2024 - 2025)",
  teamSize: "3 Engineers (1 Full Stack Architect, 1 Frontend Engineer, 1 QA)",
  status: "PRODUCTION_ACTIVE",
  isPrivate: true,
  liveUrl: undefined,
  githubUrl: "https://github.com/ChiragJain7300",
  techStack: [
    "Next.js 15 (App Router)",
    "React 19 / 18",
    "TypeScript",
    "Redux Toolkit",
    "TanStack Table",
    "Yup Validation",
    "NextAuth.js",
    "AWS S3 Pre-Signed URLs",
    "WhatsApp Business API",
  ],
  tags: [
    "Next.js App Router",
    "Enterprise RBAC",
    "Edge Middleware",
    "Isomorphic Axios",
    "Booking Wizard",
    "Catering Intelligence",
    "TanStack Table",
    "WhatsApp Dispatch",
  ],

  // 10-Second Recruiter HUD Metrics
  impactMetrics: [
    {
      value: "<2.5m",
      label: "Lead-to-Event Onboarding Time",
      detail:
        "Reduced onboarding time from 12 minutes down to under 2.5 minutes via a unified multi-step booking wizard with Yup validation.",
      defenseInInterview:
        "In catering and event planning, sales coordinators previously used separate tools to collect customer info, event dates, guest counts, and menu preferences. We designed a unified form wizard with Yup validation that bundles customer data, event details, and dietary choices into a single payload, creating both the customer and event records in one step.",
    },
    {
      value: "100%",
      label: "Unauthorized Route Access Prevention",
      detail:
        "Implemented a three-tier Role-Based Access Control (RBAC) system across Next.js Edge Middleware and declarative UI wrappers.",
      defenseInInterview:
        "We have different roles: master admins, event planners, and culinary chefs. Next.js Edge Middleware inspects session permissions before a page even renders on the server. If an unauthorized user tries to navigate to /events/create or billing tabs, they are redirected immediately, preventing any flash of unauthorized content.",
    },
    {
      value: "0 Stale",
      label: "Cached Event Statuses",
      detail:
        "Designed an isomorphic Axios authorization client that injects Bearer tokens across Server & Client Components with Cache-Control: no-store.",
      defenseInInterview:
        "Next.js App Router executes code in both Node.js (Server Components) and the browser. A standard Axios client that looks for localStorage crashes on the server. Our interceptor checks typeof window: in the browser it calls getSession(), and on the server it calls getServerSession(). We also set Cache-Control: no-store to ensure planners always see live event statuses.",
    },
    {
      value: "3-Tier",
      label: "Data Architecture Layers",
      detail:
        "Strict separation of concerns decoupling typed HTTP services, Redux Async Thunk state normalization, and declarative UI components.",
    },
  ],

  // 01 / Executive Summary
  executiveSummary: {
    overview:
      "EventCRM is an enterprise-scale event planning, catering operations, and customer relationship platform built on Next.js (App Router / SSR), React 19 / 18, TypeScript, and Redux Toolkit. The platform automates the end-to-end event lifecycle for high-volume hospitality and venue operations—unifying lead qualification, multi-step customer and event onboarding, culinary menu customizations, vendor coordination, and scheduled WhatsApp dispatch alerts.",
    targetUsers:
      "Hospitality sales directors, event coordinators, executive culinary chefs, and corporate event planners.",
    businessContext:
      "Event planning teams spent an average of 12 minutes manually re-keying customer information between CRM systems, kitchen menu spreadsheets, and venue contracts, creating frequent miscommunications and order delays.",
    coreProblem:
      "Siloed tools caused disjointed event onboarding, while insecure client-side role guards allowed unauthorized staff to view confidential billing margins before server pages rendered.",
    solutionStatement:
      "Architected an enterprise Next.js platform featuring Edge Middleware RBAC governance, an atomic lead-to-event onboarding wizard, and an isomorphic Axios authorization layer.",
  },

  // 02 / Key Capabilities & Feature Tree
  capabilities: [
    {
      category: "Atomic Event Onboarding & Culinary Wizard",
      items: [
        "Unified multi-step booking wizard converting prospective inquiries to confirmed events in <2.5m",
        "Dynamic dietary matrix assigning allergen flags, vegan preferences, and course selections",
        "Unix timestamp normalizations ensuring consistent scheduling across global client timezones",
        "AWS S3 pre-signed URL uploads for venue floorplans, contracts, and insurance certificates",
      ],
    },
    {
      category: "Edge Role-Based Access Control (RBAC)",
      items: [
        "Next.js Edge Middleware route guards inspecting session permissions prior to SSR hydration",
        "Declarative <HasAccess> UI wrappers cleanly masking restricted actions from chef and planner views",
        "Conditional useAccess() data-fetching hooks preventing unauthorized backend query dispatches",
        "Three distinct enterprise role profiles: Master Administrator, Event Planner, and Culinary Chef",
      ],
    },
    {
      category: "Isomorphic Authorization & Operations",
      items: [
        "Environment-aware Axios client resolving Bearer tokens across Server Components and Client DOM",
        "Enforced Cache-Control: no-store headers eliminating stale event booking state caching",
        "Automated WhatsApp Business API alerts notifying kitchen staff of 48-hour menu lockouts",
        "Virtualized TanStack Table data grid displaying 15,000+ past events with multi-column sorting",
      ],
    },
  ],

  // 03 / System Architecture & Blueprint
  architecture: {
    summary:
      "Next.js 15 App Router architecture combining Edge Middleware route validation, Server Components for pre-rendered event dashboards, and Redux Toolkit for complex multi-step form state management.",
    components: [
      {
        name: "Next.js Edge Middleware",
        type: "Edge Route Guard",
        role: "Evaluates session roles against route permission maps before request reaches server components.",
        tech: "Next.js Edge Runtime, middleware.ts",
        inputs: "Incoming request headers, session cookie",
        outputs: "NextResponse.next() or NextResponse.redirect()",
        failureMode: "Fails closed, immediately redirecting unauthenticated or unauthorized users to /login.",
      },
      {
        name: "Unified Onboarding Wizard",
        type: "Client State Machine",
        role: "Guides sales coordinators through customer details, venue dates, menu choices, and invoice deposits.",
        tech: "React 19, Redux Toolkit, Yup Schema Validation",
        inputs: "User form inputs across 4 sequential wizard steps",
        outputs: "Single atomic JSON payload dispatched to backend API",
        failureMode: "Validates each step independently, highlighting invalid inputs before step progression.",
      },
      {
        name: "Isomorphic HTTP Layer",
        type: "Data Client",
        role: "Injects valid Bearer authorization tokens across both Node.js SSR and client browser requests.",
        tech: "Axios Interceptor, NextAuth.js",
        inputs: "API request configurations",
        outputs: "Authenticated HTTP requests with Cache-Control: no-store",
        failureMode: "Detects 401/403 status codes and triggers automatic session expiration redirects.",
      },
      {
        name: "WhatsApp Dispatch Worker",
        type: "Automated Messaging Service",
        role: "Dispatches automated kitchen timeline reminders and menu locked confirmations to chef teams.",
        tech: "Node.js, WhatsApp Business API",
        inputs: "Event lock triggers, 48-hour cron countdowns",
        outputs: "Structured WhatsApp template messages with delivery receipts",
        failureMode: "Logs delivery failures in audit trail and falls back to urgent email alerts.",
      },
    ],
    dataFlowSteps: [
      {
        step: 1,
        from: "Sales Coordinator",
        to: "Onboarding Wizard",
        action: "Enters customer profile, event venue, guest headcount (250), and selects 3-course menu",
        protocolOrPayload: "Redux wizard state",
      },
      {
        step: 2,
        from: "Wizard Component",
        to: "Isomorphic Axios Client",
        action: "Bundles customer + event + dietary matrix into an atomic payload",
        protocolOrPayload: "Yup validated schema",
      },
      {
        step: 3,
        from: "Axios Client",
        to: "Backend API (/events/onboard)",
        action: "Dispatches authenticated POST with Bearer token and Cache-Control: no-store",
        protocolOrPayload: "HTTPS POST /api/events/onboard",
      },
      {
        step: 4,
        from: "Backend Service",
        to: "WhatsApp API",
        action: "Dispatches event confirmation alert to executive culinary chef with dietary summary",
        protocolOrPayload: "WhatsApp Business API template",
      },
    ],
  },

  // 04 / Database Design
  database: {
    engine: "PostgreSQL Relational Schema",
    designPhilosophy:
      "Strict relational integrity linking events, customers, venues, menu selections, and role permissions with foreign keys and date-range indexes.",
    tables: [
      {
        name: "events",
        type: "table",
        description: "Stores primary event records, event dates, headcount, venue allocations, and lock status.",
        columns: [
          { name: "id", type: "uuid", key: "PK", description: "Unique event record ID" },
          { name: "customer_id", type: "uuid", key: "FK", description: "Reference to booking client" },
          { name: "title", type: "varchar(255)", description: "Name of the event or celebration" },
          { name: "event_date", type: "date", key: "INDEX", description: "Scheduled date of execution" },
          { name: "guest_count", type: "integer", description: "Expected attendee headcount" },
          { name: "status", type: "varchar(32)", description: "LEAD / CONFIRMED / MENU_LOCKED / COMPLETED" },
          { name: "total_revenue", type: "numeric(10,2)", description: "Total contracted event cost" },
        ],
        indexes: ["idx_events_date_status (event_date, status)"],
      },
      {
        name: "menu_selections",
        type: "table",
        description: "Stores chosen culinary packages, item customizations, and dietary allergy flags.",
        columns: [
          { name: "id", type: "uuid", key: "PK", description: "Unique selection entry ID" },
          { name: "event_id", type: "uuid", key: "FK", description: "Parent event reference" },
          { name: "course_type", type: "varchar(32)", description: "APPETIZER / MAIN / DESSERT" },
          { name: "item_name", type: "varchar(255)", description: "Menu dish name" },
          { name: "dietary_flags", type: "varchar(128)", description: "Comma-separated allergen flags (Vegan, GF, Nut-Free)" },
        ],
        indexes: ["idx_menu_event (event_id)"],
      },
    ],
  },

  // 05 / Code Walkthrough
  codeWalkthrough: {
    summary:
      "Core implementations showcasing the Edge Middleware RBAC governance and the atomic onboarding payload dispatcher.",
    snippets: [
      {
        id: "edge-rbac-middleware",
        filename: "middleware.ts",
        language: "typescript",
        description: "Next.js Edge Middleware inspecting session roles prior to server-side rendering.",
        explanation:
          "Checks the user's role against a permission map before allowing navigation to restricted event management or financial routes, completely preventing unauthorized content flashes.",
        code: `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define route permissions by user role
const ROUTE_PERMISSIONS: Record<string, string[]> = {
  '/events/create': ['MASTER_ADMIN', 'EVENT_PLANNER'],
  '/billing': ['MASTER_ADMIN'],
  '/kitchen': ['MASTER_ADMIN', 'CULINARY_CHEF'],
};

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const pathname = req.nextUrl.pathname;

  // 1. Gating unauthenticated visitors
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const userRole = (token.role as string) || 'GUEST';

  // 2. Validate role against route permission map
  for (const [route, allowedRoles] of Object.entries(ROUTE_PERMISSIONS)) {
    if (pathname.startsWith(route) && !allowedRoles.includes(userRole)) {
      // Unauthorized: Redirect immediately at edge before SSR execution
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/events/create', '/billing/:path*', '/kitchen/:path*'],
};`,
      },
      {
        id: "atomic-onboarding",
        filename: "onboardingService.ts",
        language: "typescript",
        description: "Unified atomic event and customer onboarding payload dispatcher.",
        explanation:
          "Bundles customer profile, event dates, guest counts, and culinary menu matrices into a single atomic payload, reducing lead-to-event onboarding time from 12 minutes to under 2.5 minutes.",
        code: `export async function submitAtomicEventOnboarding(wizardData: EventWizardFormData) {
  // Bundles customer, event schedule, and menu selections into 1 atomic request
  const payload = {
    customer: {
      fullName: wizardData.clientName,
      email: wizardData.clientEmail,
      phone: wizardData.clientPhone,
      company: wizardData.companyName || null,
    },
    event: {
      title: wizardData.eventTitle,
      eventDate: wizardData.scheduledDate,
      guestCount: Number(wizardData.headcount),
      venueLocation: wizardData.venueAddress,
      depositAmount: Number(wizardData.initialDeposit),
    },
    menu: {
      packageId: wizardData.selectedPackageId,
      dietaryNotes: wizardData.allergenNotes,
      customCourseItems: wizardData.selectedDishes,
    },
  };

  const response = await apiClient.post('/api/events/onboard-atomic', payload);
  return response.data;
}`,
      },
    ],
  },

  // 06 / API Architecture
  apiArchitecture: {
    summary: "REST endpoints for atomic event onboarding and kitchen status tracking.",
    endpoints: [
      {
        method: "POST",
        path: "/api/events/onboard-atomic",
        description: "Creates customer profile and scheduled event record in a single atomic transaction.",
        authRequired: true,
        statusCode: 201,
        responseSample: '{\n  "success": true,\n  "eventId": "evt_9841",\n  "customerId": "cust_1204",\n  "onboardingDurationSeconds": 134\n}',
      },
      {
        method: "GET",
        path: "/api/kitchen/roster",
        description: "Returns upcoming 48-hour locked menus for executive culinary kitchen preparation.",
        authRequired: true,
        statusCode: 200,
        responseSample: '[\n  {\n    "eventId": "evt_9841",\n    "date": "2025-02-16",\n    "headcount": 250,\n    "menuLocked": true\n  }\n]',
      },
    ],
  },

  // 07 / Architectural Decisions
  decisions: [
    {
      id: "ADR-01",
      title: "Edge Middleware RBAC vs. Client-Side Page Component Guards",
      status: "ACCEPTED",
      problem:
        "Client-side role guards allowed unauthorized staff to see a momentary flash of financial billing pages and sensitive culinary margins during SSR hydration.",
      chosenApproach:
        "Execute RBAC evaluation at the edge inside Next.js middleware.ts before the request ever reaches Node.js page components.",
      alternativesConsidered: ["Client-only <ProtectedRoute> wrappers", "Inline getServerSideProps checks on every page"],
      rationale:
        "Completely prevents unauthorized page render, ensures 100% route access prevention, and centralizes permission maps into a single file.",
      tradeoffsAndLimitations:
        "Requires Edge-compatible JWT verification without Node.js crypto dependencies.",
    },
    {
      id: "ADR-02",
      title: "Atomic Onboarding Payload vs. Multi-Endpoint REST Chaining",
      status: "ACCEPTED",
      problem:
        "Sequential calls (/api/customers -> /api/events -> /api/menus) left orphaned customer records if the browser closed before completing step 3.",
      chosenApproach:
        "Consolidated the entire onboarding wizard into a single atomic payload processed inside a database transaction.",
      alternativesConsidered: ["Draft state saving in local storage", "Multi-endpoint sequential chaining"],
      rationale:
        "Guarantees that an event is never created without its associated customer and menu selections, cutting total coordination time from 12m to <2.5m.",
      tradeoffsAndLimitations:
        "Validation schema is larger and requires strict Yup synchronization.",
    },
  ],

  // 09 / Security
  security: {
    measures: [
      {
        title: "Next.js Edge Middleware Route Protection",
        description: "Evaluates session JWT claims at the edge before server execution to block unauthorized route access.",
        implemented: true,
      },
      {
        title: "Cache-Control: no-store Enforcement",
        description: "Prevents intermediate proxies or browsers from serving stale event or billing information.",
        implemented: true,
      },
      {
        title: "AWS S3 Pre-Signed Upload Signatures",
        description: "Client uploads event floorplans and contracts directly to S3 with short-lived (15m) cryptographically signed PUT URLs.",
        implemented: true,
      },
    ],
  },

  // 10 / Production Challenges
  challenges: [
    {
      title: "Preventing Stale Event Status Caching in Next.js 15 Server Components",
      difficulty: "Medium",
      problem:
        "Next.js aggressive default fetch caching caused sales coordinators to see 'CONFIRMED' on events that had recently been marked 'CANCELED' by managers.",
      investigation:
        "Found that Server Component data fetching defaulted to cache: 'force-cache' across dynamic page routes.",
      solution:
        "Configured `export const dynamic = 'force-dynamic'` on the event dashboard layout and enforced `Cache-Control: no-store` across isomorphic Axios interceptors.",
      outcome:
        "100% of event status updates reflect immediately across all planner and kitchen views.",
      lessonsLearned:
        "For operational CRMs with high-frequency mutations, always enforce dynamic server rendering and opt out of default static fetch caching.",
    },
  ],

  // 11 / Interview Talking Points
  interviewTalkingPoints: [
    {
      topic: "Onboarding Time from 12m to <2.5m",
      claim: "Reduced lead-to-event onboarding time from 12 minutes down to under 2.5 minutes",
      defense:
        "In catering and event planning, sales coordinators previously used separate tools to collect customer info, event dates, guest counts, and menu preferences. We designed a unified form wizard with Yup validation that bundles customer data, event details, and dietary choices into a single payload, creating both the customer and event records in one step.",
    },
    {
      topic: "100% Unauthorized Route Access Prevention",
      claim: "Implemented a three-tier RBAC system across Next.js Edge Middleware and UI wrappers",
      defense:
        "We have different roles: master admins, event planners, and culinary chefs. Next.js Edge Middleware inspects session permissions before a page renders on the server. If an unauthorized user navigates to /events/create or billing tabs, they are redirected immediately at the edge, preventing any flash of unauthorized content.",
    },
    {
      topic: "Isomorphic Axios Client",
      claim: "Designed an isomorphic Axios client resolving Bearer tokens across Server & Client Components",
      defense:
        "Next.js App Router executes code in both Node.js (Server Components) and the browser. A standard Axios client that looks for localStorage crashes on the server. Our interceptor checks typeof window: in the browser it calls getSession(), and on the server it calls getServerSession(). We also set Cache-Control: no-store to ensure planners always see live event statuses.",
    },
  ],

  // 12 / Future Improvements
  futureImprovements: [
    "Develop real-time drag-and-drop banquet floorplan designer with table seating allocations",
    "Integrate automated food cost margin calculators analyzing ingredient supplier market prices",
    "Add automated SMS and email RSVP collection portals for registered event attendees",
  ],
};

