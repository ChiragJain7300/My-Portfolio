import { CaseStudy } from "@/types/case-study";

export const justWalkIndiaCaseStudy: CaseStudy = {
  slug: "just-walk-india",
  title: "Just Walk India (JWI) — High-Concurrency Ticketing Platform",
  subtitle:
    "Nationwide Sports Registration Platform, Dynamic Multi-Participant Cart & Zero-Downtime Cache-Busting Architecture",
  tagline:
    "High-concurrency sports event registration, ticket checkout, and participant management web platform built on Next.js 15 (App Router) and React 19, serving 50,000+ endurance walkathon athletes across India.",
  category: "fullstack",
  categoryLabel: "High-Traffic Ticketing & SSR",
  role: "Lead Full Stack Engineer",
  timeline: "Production Active (2024 - Present)",
  teamSize: "4 Engineers (1 Lead Full Stack, 2 Frontend Developers, 1 DevOps)",
  status: "PRODUCTION_ACTIVE",
  isPrivate: true,
  liveUrl: "https://www.justwalkindia.com/",
  githubUrl: "https://github.com/ChiragJain7300",
  techStack: [
    "Next.js 15 (App Router)",
    "React 19",
    "TypeScript",
    "NextAuth.js v4",
    "Redux Toolkit",
    "Material UI v6",
    "Sentry",
    "Mixpanel",
    "react-cache-buster",
    "Razorpay API",
  ],
  tags: [
    "Next.js 15",
    "React 19",
    "High Concurrency",
    "Ticketing Platform",
    "Zero-Amount Bypass",
    "Cache Busting",
    "Redux Toolkit",
    "Sentry Telemetry",
  ],

  // 10-Second Recruiter HUD Metrics
  impactMetrics: [
    {
      value: "50K+",
      label: "Athletes Registered",
      detail:
        "Handled nationwide walkathon surges across Delhi, Mumbai, and Bangalore without platform downtime.",
      defenseInInterview:
        "Just Walk India organizes major endurance walkathons across tier-1 Indian cities. The platform had to handle traffic surges when registrations opened for limited participant slots with zero checkout latency.",
    },
    {
      value: "28%",
      label: "Checkout Drop-Off Reduction",
      detail:
        "Engineered an automated payment gateway bypass for 100% discount promotional coupons and zero-amount community registrations.",
      defenseInInterview:
        "For free community events or when users applied 100% promotional discount codes, sending a transaction of ₹0.00 to payment gateways like Razorpay would throw validation errors and fail. I added a conditional check: if net_amount == 0, we bypass the payment gateway entirely, call proceedWithZeroAmount(), issue the ticket immediately, and take the user to the confirmation page.",
    },
    {
      value: "0%",
      label: "ChunkLoadError 404s on Deploy",
      detail:
        "Eliminated client chunk load 404 errors during frequent continuous deployments using build-time version hashing with automated cache busting.",
      defenseInInterview:
        "When deploying new versions in Next.js, Webpack/Turbopack chunk hashes change. If a user had an old tab open, navigating would trigger a 404 on the old JavaScript chunks. We used react-cache-buster to generate a meta.json on each build. On page navigation, the client checks if its version matches the server; if not, it cleanly refreshes the browser cache.",
    },
    {
      value: "100%",
      label: "Edge Route Authorization",
      detail:
        "Next.js Edge Middleware inspects session tokens before SSR rendering, preventing flashes of unauthorized content.",
    },
  ],

  // 01 / Executive Summary
  executiveSummary: {
    overview:
      "Just Walk India (JWI) is a nationwide sports event registration, ticket checkout, and participant management web platform built on Next.js 15 (App Router), React 19, and NextAuth.js v4. The system is architected to handle high-traffic registration surges across multi-city walkathon events while orchestrating dynamic group cart calculations, payment gateway integrations, and client-side version synchronizations.",
    targetUsers:
      "Endurance athletes, corporate walkathon teams, event organizers, and on-site ticketing coordinators.",
    businessContext:
      "Walkathon registrations open on specific announcement dates, creating massive concurrent traffic spikes that strained legacy forms, caused payment gateway drops on free promotional passes, and triggered client 404 chunk errors following production redeploys.",
    coreProblem:
      "Legacy payment gateways rejected ₹0.00 transactions on promotional coupons, causing a 28% drop-off. Simultaneously, rapid deployments broke active client tabs through stale chunk hash 404s.",
    solutionStatement:
      "Built a high-performance Next.js 15 SSR platform featuring Redux dynamic participant schema validation, conditional zero-amount payment bypass, build-time cache busting, and isomorphic telemetry.",
  },

  // 02 / Key Capabilities & Feature Tree
  capabilities: [
    {
      category: "Multi-Participant Ticketing & Dynamic Cart",
      items: [
        "Dynamic multi-attendee registration arrays with independent participant data validation",
        "City route selection, event category mapping, and emergency contact verification",
        "Conditional payment bypass for 100% discount codes and free community registrations",
        "Instant e-ticket generation with printable badges and unique booking QR codes",
      ],
    },
    {
      category: "Edge Authorization & Isomorphic Architecture",
      items: [
        "Edge Middleware session validation intercepting protected routes before server rendering",
        "Environment-aware Axios client resolving session tokens across Node.js SSR and client browser",
        "Zero-downtime deployment versioning via react-cache-buster meta.json hash comparison",
        "Clean 401 session purge and redirect ensuring expired credentials never leave hanging state",
      ],
    },
    {
      category: "Full-Spectrum Telemetry & Observability",
      items: [
        "Sentry distributed tracing across Client DOM, Edge Middleware, and Node.js Server Component layers",
        "Mixpanel conversion funnels mapping exact drop-off points from event view to ticket confirmation",
        "Meta Pixel integration tracking ad conversions and audience retargeting signals",
        "Real-time checkout latency instrumentation logging payment gateway response durations",
      ],
    },
  ],

  // 03 / System Architecture & Blueprint
  architecture: {
    summary:
      "Next.js 15 App Router architecture combining Edge Middleware route validation, Server Components for pre-rendered event discovery, and hydrated client-side Redux booking engines.",
    components: [
      {
        name: "Cloudflare Edge & CDN",
        type: "CDN & Edge Cache",
        role: "Caches static assets, city images, and event landing routes while mitigating bot traffic.",
        tech: "Cloudflare Edge, HTTP/3, WAF",
        inputs: "Global athlete HTTP traffic",
        outputs: "Cached edge responses or proxy to Next.js origin",
        failureMode: "Serves stale-while-revalidate cached HTML during transient origin spikes.",
      },
      {
        name: "Next.js 15 Edge Middleware",
        type: "Edge Route Guard",
        role: "Intercepts incoming requests, validates NextAuth session JWTs, and redirects unauthorized users.",
        tech: "Next.js 15 Edge Runtime, nextauth.token",
        inputs: "Incoming request headers and cookies",
        outputs: "Request continuation or 307 redirect to /login",
        failureMode: "Fails closed to protect user profile and checkout routes.",
      },
      {
        name: "Redux Dynamic Cart Engine",
        type: "Client State Machine",
        role: "Manages multi-attendee forms, coupon calculations, and checkout states in browser memory.",
        tech: "Redux Toolkit, Yup/Zod schemas, React 19",
        inputs: "User form inputs, coupon codes",
        outputs: "Validated checkout payload",
        failureMode: "Maintains cart state in memory across tab reloads via persisted session state.",
      },
      {
        name: "Payment Gateway / Zero-Bypass",
        type: "Payment Processor",
        role: "Handles Razorpay card/UPI transactions, with conditional bypass on zero-amount balances.",
        tech: "Razorpay Checkout API, custom proceedWithZeroAmount() handler",
        inputs: "Calculated net amount, user details",
        outputs: "Payment confirmation or instant zero-amount registration token",
        failureMode: "Falls back to retry modal with detailed error telemetry to Sentry.",
      },
    ],
    dataFlowSteps: [
      {
        step: 1,
        from: "Athlete Browser",
        to: "Event Page (Next.js 15)",
        action: "Adds 3 participants to walkathon cart and applies coupon code 'COMMUNITY100'",
        protocolOrPayload: "Redux cart slice dispatch",
      },
      {
        step: 2,
        from: "Redux Cart Engine",
        to: "Checkout Validator",
        action: "Calculates total amount: ₹0.00. Evaluates net_amount === 0 conditional check",
        protocolOrPayload: "Client validation check",
      },
      {
        step: 3,
        from: "Checkout Component",
        to: "Backend API (/booking/zero-amount)",
        action: "Bypasses Razorpay gateway and calls zero-amount registration endpoint directly",
        protocolOrPayload: "HTTPS POST /api/booking/zero-amount",
      },
      {
        step: 4,
        from: "Backend Service",
        to: "Athlete Browser",
        action: "Issues confirmed ticket numbers, sends email confirmation, and redirects to success page",
        protocolOrPayload: "HTTP 200 { status: 'CONFIRMED', tickets: [...] }",
      },
    ],
  },

  // 04 / Database Design
  database: {
    engine: "PostgreSQL & MongoDB Hybrid Integration",
    designPhilosophy:
      "Relational schema for orders and ticket transactions with indexed composite keys, paired with document-based storage for flexible dynamic attendee metadata.",
    tables: [
      {
        name: "bookings",
        type: "table",
        description: "Stores primary event booking orders, payment statuses, and transaction receipts.",
        columns: [
          { name: "id", type: "uuid", key: "PK", description: "Unique booking identifier" },
          { name: "event_id", type: "uuid", key: "FK", description: "Reference to walkathon event" },
          { name: "user_id", type: "uuid", key: "FK", description: "Primary account holder placing the booking" },
          { name: "total_amount", type: "numeric(10,2)", description: "Gross total before discounts" },
          { name: "discount_amount", type: "numeric(10,2)", description: "Promotional discount deduction" },
          { name: "net_amount", type: "numeric(10,2)", description: "Final billed balance (0.00 on bypass)" },
          { name: "payment_status", type: "varchar(32)", description: "Status: PENDING / COMPLETED / ZERO_BYPASS" },
        ],
        indexes: ["idx_bookings_event_user (event_id, user_id)"],
      },
      {
        name: "participants",
        type: "table",
        description: "Stores individual attendee information under a single group booking order.",
        columns: [
          { name: "id", type: "uuid", key: "PK", description: "Unique participant ticket ID" },
          { name: "booking_id", type: "uuid", key: "FK", description: "Parent booking order reference" },
          { name: "full_name", type: "varchar(255)", description: "Attendee legal name" },
          { name: "bib_number", type: "varchar(32)", key: "INDEX", description: "Assigned marathon bib tracking number" },
          { name: "tshirt_size", type: "varchar(16)", description: "Merchandise size selection" },
        ],
        indexes: ["idx_participants_booking (booking_id)"],
      },
    ],
  },

  // 05 / Code Walkthrough
  codeWalkthrough: {
    summary:
      "Core implementations showcasing the zero-amount payment bypass and the isomorphic Axios authorization layer.",
    snippets: [
      {
        id: "zero-amount-bypass",
        filename: "checkout.tsx",
        language: "typescript",
        description: "Zero-amount payment gateway bypass eliminating checkout drop-offs for promotional passes.",
        explanation:
          "Checks if net amount is zero after discounts. If true, bypasses external gateway handshakes and directly triggers backend ticket issuance, reducing drop-offs by 28%.",
        code: `const handleProceedToPayment = async () => {
  const { netAmount, discountCode, participants } = cartState;

  // Conditional Payment Gateway Bypass:
  // If net amount is ₹0.00 (100% discount coupon or free community event),
  // bypass Razorpay/Stripe to avoid gateway rejection errors.
  if (netAmount === 0 || netAmount <= 0.01) {
    try {
      setIsProcessing(true);
      const response = await api.post('/api/booking/zero-amount', {
        eventId: selectedEvent.id,
        couponCode: discountCode,
        participants: participants.map(p => ({
          name: p.fullName,
          email: p.email,
          phone: p.phone,
          tshirtSize: p.tshirtSize
        }))
      });

      if (response.data.status === 'SUCCESS') {
        router.push(\`/booking/confirmation/\${response.data.bookingId}\`);
      }
    } catch (error) {
      toast.error('Zero-amount checkout failed. Please retry.');
    } finally {
      setIsProcessing(false);
    }
    return;
  }

  // Otherwise, initialize standard Razorpay checkout flow
  initiateRazorpayPayment({ amount: netAmount, orderId: serverOrderId });
};`,
      },
      {
        id: "isomorphic-axios",
        filename: "axiosInstance.ts",
        language: "typescript",
        description: "Environment-aware Axios interceptor resolving session tokens across SSR Node.js and client browser.",
        explanation:
          "Detects execution context. In the browser, it retrieves tokens from the client session; in Server Components, it imports getServerSession without breaking isomorphic builds.",
        code: `import axios from 'axios';
import { getSession } from 'next-auth/react';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  },
});

apiClient.interceptors.request.use(async (config) => {
  // Isomorphic Context Check:
  // Client browser uses getSession(); Server Components pass pre-resolved headers
  if (typeof window !== 'undefined') {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = \`Bearer \${session.accessToken}\`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== 'undefined') {
      window.location.href = '/login?expired=true';
    }
    return Promise.reject(err);
  }
);`,
      },
    ],
  },

  // 06 / API Architecture
  apiArchitecture: {
    summary: "Next.js 15 route handlers orchestrating ticket issuance and participant validations.",
    endpoints: [
      {
        method: "POST",
        path: "/api/booking/zero-amount",
        description: "Processes zero-amount bookings with valid 100% discount coupon tokens.",
        authRequired: true,
        statusCode: 200,
        responseSample: '{\n  "status": "SUCCESS",\n  "bookingId": "jwi-2025-88412",\n  "ticketCount": 3\n}',
      },
      {
        method: "GET",
        path: "/api/events/[slug]/availability",
        description: "Returns live remaining participant slot quotas for an event route.",
        authRequired: false,
        statusCode: 200,
        responseSample: '{\n  "eventId": "mumbai-10k-2025",\n  "remainingSlots": 240,\n  "isWaitlistActive": false\n}',
      },
    ],
  },

  // 07 / Architectural Decisions
  decisions: [
    {
      id: "ADR-01",
      title: "Conditional Payment Gateway Bypass vs. Zero-Amount Gateway Handshakes",
      status: "ACCEPTED",
      problem:
        "Payment gateways reject ₹0.00 charges with validation exceptions, failing legitimate promotional discount users.",
      chosenApproach:
        "Evaluate net amount on the client and server; if ₹0.00, invoke an isolated atomic booking endpoint that issues tickets immediately without touching gateway APIs.",
      alternativesConsidered: ["Charging a nominal ₹1 refundable fee", "Creating custom payment gateway dummy tokens"],
      rationale:
        "Reduced checkout drop-offs by 28% and completely eliminated customer confusion during community registration drives.",
      tradeoffsAndLimitations:
        "Requires strict backend validation of promotional discount coupons to prevent fraudulent zero-amount claims.",
    },
    {
      id: "ADR-02",
      title: "Automated Build Hash Cache-Busting vs. Blind Browser Caching",
      status: "ACCEPTED",
      problem:
        "Continuous production deployments updated JavaScript chunk hashes, causing 404 errors for visitors with open tabs.",
      chosenApproach:
        "Integrated react-cache-buster to generate build-time meta.json hashes. Client checks version on route transitions and clears stale cache cleanly.",
      alternativesConsidered: ["Disabling HTTP caching completely", "Forced page reloads on every route transition"],
      rationale:
        "Preserves performance caching benefits for active sessions while eliminating chunk load 404s after deployments.",
      tradeoffsAndLimitations:
        "Requires build-time script execution during deployment pipelines.",
    },
  ],

  // 09 / Security
  security: {
    measures: [
      {
        title: "Next.js Edge Middleware Session Gating",
        description: "Guards protected checkout and profile paths at the edge before server execution.",
        implemented: true,
      },
      {
        title: "Server-Side Coupon Signature Verification",
        description: "Promotional discount codes are validated against database records and quota limits on every request.",
        implemented: true,
      },
      {
        title: "Idempotent Transaction Keys",
        description: "Payment and zero-amount endpoints require unique idempotency tokens to prevent duplicate ticket issuance.",
        implemented: true,
      },
    ],
  },

  // 10 / Production Challenges
  challenges: [
    {
      title: "Handling 10,000+ Concurrent Athletes During Morning Registration Openings",
      difficulty: "High",
      problem:
        "When registrations opened at 10:00 AM for the Mumbai Walkathon, concurrent database queries for remaining slots caused lock contention.",
      investigation:
        "Discovered that every participant addition checked slot availability with heavy SQL COUNT queries.",
      solution:
        "Cached slot availability counters in Redis with atomic DECR operations, persisting to PostgreSQL in batch intervals.",
      outcome:
        "Reduced database query load by 85% and sustained peak concurrency without slowdowns.",
      lessonsLearned:
        "High-demand event ticketing requires atomic in-memory reservation counters separated from transactional databases.",
    },
  ],

  // 11 / Interview Talking Points
  interviewTalkingPoints: [
    {
      topic: "50,000+ Athletes Across India",
      claim: "Built a high-concurrency event registration platform handling 50,000+ participants",
      defense:
        "Just Walk India organizes major walkathons in cities like Delhi, Mumbai, and Bangalore. The platform handled traffic surges when limited participant slots opened.",
    },
    {
      topic: "28% Drop-Off Reduction via Zero-Amount Bypass",
      claim: "Reduced checkout drop-offs by 28% by engineering a conditional payment bypass",
      defense:
        "Sending ₹0.00 to payment gateways threw validation errors and failed. We added a conditional check: if net amount == 0, we bypass the gateway, call proceedWithZeroAmount(), issue the ticket immediately, and take the user to confirmation.",
    },
    {
      topic: "0% Chunk Load 404s on Deployment",
      claim: "Eliminated chunk load 404 errors during frequent continuous deployments",
      defense:
        "When deploying in Next.js, chunk hashes change. We used react-cache-buster to generate a meta.json on each build. On navigation, the client checks if its version matches the server; if not, it cleanly refreshes the browser cache.",
    },
  ],

  // 12 / Future Improvements
  futureImprovements: [
    "Introduce virtual waiting rooms (Cloudflare Waiting Room) for extreme ticket launch spikes",
    "Add Apple Wallet and Google Wallet pass generation for mobile event check-in",
    "Implement real-time bib number allocation with physical RFID timing chip synchronization",
  ],
};

