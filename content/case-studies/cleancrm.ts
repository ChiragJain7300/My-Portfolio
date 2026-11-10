import { CaseStudy } from "@/types/case-study";

export const cleancrmCaseStudy: CaseStudy = {
  slug: "cleancrm",
  title: "Cleaning App — Property Turnover & Field Service Platform",
  subtitle:
    "Multi-Calendar Turnover Scheduling, Real-Time Socket.io Telemetry & High-Density Client Data Grids",
  tagline:
    "Enterprise-grade field service management and customer relationship platform engineered for on-demand property cleaning, vacation rental turnover operations (Airbnb / VRBO), and automated cleaner dispatch.",
  category: "fullstack",
  categoryLabel: "Full Stack & Field Service Operations",
  role: "Lead Frontend & Real-Time Systems Engineer",
  timeline: "Production Active (2024 - 2025)",
  teamSize: "4 Engineers (1 Lead Frontend, 1 Backend Lead, 1 Mobile Developer, 1 QA)",
  status: "PRODUCTION_ACTIVE",
  isPrivate: true,
  liveUrl: undefined,
  githubUrl: "https://github.com/ChiragJain7300",
  techStack: [
    "React (SPA)",
    "Redux Toolkit",
    "FullCalendar",
    "Socket.io Client",
    "Firebase Cloud Messaging (FCM)",
    "Ant Design",
    "Bootstrap 5",
    "Axios Mutex",
    "iCal Integration",
  ],
  tags: [
    "FullCalendar",
    "Redux Toolkit",
    "Socket.io",
    "Firebase FCM",
    "Property Turnover",
    "Airbnb Sync",
    "Server Pagination",
    "Real-Time Telemetry",
  ],

  // 10-Second Recruiter HUD Metrics
  impactMetrics: [
    {
      value: "<30s",
      label: "Turnover Booking Creation",
      detail:
        "Reduced cleaning booking creation time from 4 minutes down to under 30 seconds with FullCalendar multi-view templates.",
      defenseInInterview:
        "Property managers coordinate cleaning turnovers between guest checkout (10 AM) and next guest check-in (3 PM). Previously, they had to navigate multi-step forms across different pages. We integrated FullCalendar with pre-set property turnover templates, allowing managers to view unassigned slots and schedule bookings directly on the calendar with just a few clicks.",
    },
    {
      value: "64%",
      label: "Missed Turnover Reduction",
      detail:
        "Reduced missed property turnovers by 64% by implementing dual-channel telemetry combining Firebase push notifications with live Socket.io cleaner check-in alerts.",
      defenseInInterview:
        "Cleaners work in the field and don't sit in front of a computer. We registered Firebase device tokens to send high-priority push notifications for new jobs. When on site, cleaners tap 'Check In' on their phone, which emits a Socket.io event to the admin dashboard turning the booking badge from Blue to Green. Supervisors can immediately spot if a property isn't being cleaned on time.",
    },
    {
      value: "<50 KB",
      label: "Payload Per Filtered Page",
      detail:
        "Built a server-side paginated grid supporting multi-parameter filtering across 25,000+ client and property records.",
      defenseInInterview:
        "Instead of downloading the entire database and filtering on the client, all search terms, city dropdowns, and date ranges are converted to query parameters and sent to the API. We only fetch the active page (10, 25, or 50 records), keeping memory usage low and rendering instant.",
    },
    {
      value: "20+",
      label: "Redux Feature Slices",
      detail:
        "Engineered a modular, predictable state architecture managing bookings, cleaner dispatches, invoices, and live socket streams.",
    },
  ],

  // 01 / Executive Summary
  executiveSummary: {
    overview:
      "Cleaning App is an enterprise-grade field service management and customer relationship platform engineered for on-demand property cleaning, vacation rental turnover operations (Airbnb / VRBO), and commercial facility maintenance. The platform coordinates client onboarding, automated cleaner dispatch, calendar synchronization, real-time check-in/checkout telemetry, and multi-status invoice reconciliation.",
    targetUsers:
      "Property managers, vacation rental hosts, cleaning service supervisors, and distributed field cleaners.",
    businessContext:
      "Turnover gaps between vacation rental guest checkout (10:00 AM) and guest arrival (3:00 PM) are unforgiving. Missed cleanings resulted in severe Airbnb refund penalties and host reputational damage.",
    coreProblem:
      "Booking creation required navigating convoluted multi-step forms taking over 4 minutes per property. Furthermore, supervisors had no real-time visibility into whether cleaners had arrived on site, leading to missed turnovers.",
    solutionStatement:
      "Engineered an operational CRM featuring FullCalendar interactive scheduling templates, dual-channel mobile dispatch via FCM and Socket.io, and a server-paginated data grid managing 25,000+ records.",
  },

  // 02 / Key Capabilities & Feature Tree
  capabilities: [
    {
      category: "Multi-Calendar Scheduling Engine",
      items: [
        "Real-time synchronization across Month, Week, Day, and Year views with external iCal integrations",
        "Airbnb & VRBO booking calendar ingestion normalizing timezones and guest turnover slots",
        "Drag-and-drop booking slot rescheduling with automatic duration and pricing recalibrations",
        "Turnover templates reducing booking creation from 4 minutes to under 30 seconds",
      ],
    },
    {
      category: "Field Cleaner Dispatch & Telemetry",
      items: [
        "Dual-channel telemetry combining Firebase push notifications with live Socket.io events",
        "One-tap on-site cleaner check-in updating supervisor dashboard badges in real time",
        "64% reduction in missed property turnovers through automated unassigned slot alerts",
        "GPS coordinate and arrival timestamp validation logging proof-of-presence",
      ],
    },
    {
      category: "High-Density Data Grid & Billing",
      items: [
        "Server-side paginated tables supporting multi-parameter filtering across 25,000+ records",
        "Sub-50 KB network payloads per page ensuring instant render on mobile network connections",
        "Automated multi-status invoice lifecycle managing partial payments and reconciliation",
        "Granular Role-Based Access Control regulating billing exports and status toggles",
      ],
    },
  ],

  // 03 / System Architecture & Blueprint
  architecture: {
    summary:
      "Real-time event-driven architecture connecting mobile field cleaners, administrative dispatchers, Socket.io WebSocket hubs, and external iCal booking feeds.",
    components: [
      {
        name: "Admin Dispatch Dashboard",
        type: "Frontend React SPA",
        role: "Primary workspace for supervisors to schedule jobs, assign cleaners, and monitor real-time check-ins.",
        tech: "React, Redux Toolkit, FullCalendar, Socket.io Client",
        inputs: "Supervisor user actions, live WebSocket events",
        outputs: "Booking dispatches, invoice generations",
        failureMode: "Buffers offline changes locally and displays reconnect banners if WebSocket connection drops.",
      },
      {
        name: "Cleaner Field Web App",
        type: "Mobile Responsive Client",
        role: "Interface for field cleaners to view assigned jobs, receive push notifications, and tap check-in.",
        tech: "React, Firebase Cloud Messaging, Geolocation API",
        inputs: "FCM push payloads, cleaner touch gestures",
        outputs: "Check-in and completion event dispatches",
        failureMode: "Caches job details in local state for offline access in low-connectivity basements.",
      },
      {
        name: "Socket.io Real-Time Hub",
        type: "WebSocket Server",
        role: "Maintains active bidirectional connections with dispatch dashboards to push instant status changes.",
        tech: "Node.js, Socket.io Server, Redis Adapter",
        inputs: "Cleaner status event emissions",
        outputs: "Broadcasted room events to supervisor dashboards",
        failureMode: "Clients fall back to long-polling HTTP if WebSocket transport fails.",
      },
      {
        name: "iCal Sync Engine",
        type: "Integration Worker",
        role: "Polls external Airbnb and VRBO calendar links to extract new guest turnover dates.",
        tech: "Node.js cron, node-ical",
        inputs: "External .ics calendar URLs",
        outputs: "Scheduled cleaning slots in Cleaning App database",
        failureMode: "Retries failed iCal feeds up to 3 times before flagging calendar URL error.",
      },
    ],
    dataFlowSteps: [
      {
        step: 1,
        from: "Supervisor",
        to: "FullCalendar View",
        action: "Selects property turnover template and assigns cleaner with 2 clicks (<30s)",
        protocolOrPayload: "Redux booking dispatch",
      },
      {
        step: 2,
        from: "Backend API",
        to: "Firebase Cloud Messaging",
        action: "Sends high-priority push notification to assigned cleaner's mobile device",
        protocolOrPayload: "FCM HTTP v1 API payload",
      },
      {
        step: 3,
        from: "Cleaner Mobile App",
        to: "Socket.io Server",
        action: "Cleaner arrives on site and taps 'Check In', emitting GPS proof event",
        protocolOrPayload: "socket.emit('cleaner_checkin', payload)",
      },
      {
        step: 4,
        from: "Socket.io Hub",
        to: "Admin Dashboard",
        action: "Broadcasts arrival event; turnover badge shifts instantly from Blue to Green",
        protocolOrPayload: "WebSocket broadcast",
      },
    ],
  },

  // 04 / Database Design
  database: {
    engine: "PostgreSQL Relational Schema",
    designPhilosophy:
      "Strict relational integrity across properties, turnover bookings, cleaner assignments, and billing invoices with composite indexes for range and city queries.",
    tables: [
      {
        name: "bookings",
        type: "table",
        description: "Stores turnover cleaning jobs, assigned staff, status flags, and completion timestamps.",
        columns: [
          { name: "id", type: "uuid", key: "PK", description: "Unique booking identifier" },
          { name: "property_id", type: "uuid", key: "FK", description: "Reference to property being cleaned" },
          { name: "cleaner_id", type: "uuid", key: "FK", description: "Assigned field cleaner profile" },
          { name: "scheduled_date", type: "date", key: "INDEX", description: "Date of turnover cleaning" },
          { name: "status", type: "varchar(32)", description: "SCHEDULED / CHECKED_IN / COMPLETED / CANCELED" },
          { name: "check_in_time", type: "timestamptz", description: "Recorded cleaner arrival timestamp" },
        ],
        indexes: ["idx_bookings_date_status (scheduled_date, status)"],
      },
      {
        name: "properties",
        type: "table",
        description: "Stores client vacation homes, access lockbox codes, city locations, and iCal feed URLs.",
        columns: [
          { name: "id", type: "uuid", key: "PK", description: "Property identifier" },
          { name: "name", type: "varchar(255)", description: "Property name or unit number" },
          { name: "city", type: "varchar(128)", key: "INDEX", description: "City region for localized dispatch" },
          { name: "airbnb_ical_url", type: "text", description: "External iCal reservation sync feed" },
        ],
        indexes: ["idx_properties_city (city)"],
      },
    ],
  },

  // 05 / Code Walkthrough
  codeWalkthrough: {
    summary:
      "Core implementations showcasing the live Socket.io cleaner check-in listener and server-side paginated queries.",
    snippets: [
      {
        id: "socket-telemetry",
        filename: "useBookingSocket.ts",
        language: "typescript",
        description: "Real-time cleaner arrival event subscription and Redux state synchronization.",
        explanation:
          "Subscribes to cleaner_checkin events over Socket.io, immediately updating the active calendar booking badge from scheduled to checked-in, keeping supervisors updated in real time.",
        code: `import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { socket } from '@/lib/socket';
import { updateBookingStatus } from '@/redux/slices/bookingsSlice';
import { toast } from 'sonner';

export function useBookingSocket() {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();

    // Listen for real-time cleaner on-site arrival
    socket.on('cleaner_checkin', (data: { bookingId: string; timestamp: string; cleanerName: string }) => {
      dispatch(updateBookingStatus({
        id: data.bookingId,
        status: 'CHECKED_IN',
        checkInTime: data.timestamp
      }));

      toast.success(\`\${data.cleanerName} checked in on site.\`);
    });

    return () => {
      socket.off('cleaner_checkin');
      socket.disconnect();
    };
  }, [dispatch]);
}`,
      },
      {
        id: "server-pagination",
        filename: "clientApi.ts",
        language: "typescript",
        description: "Server-side paginated multi-parameter query builder keeping payloads under 50 KB.",
        explanation:
          "Transforms complex UI filter states into normalized query parameters so the server only streams the active 25 records, maintaining low memory footprints across 25,000+ entries.",
        code: `export async function fetchPaginatedClients(params: {
  page: number;
  pageSize: number;
  search?: string;
  city?: string;
  status?: string;
}) {
  const query = new URLSearchParams({
    page: String(params.page),
    limit: String(params.pageSize),
  });

  if (params.search) query.set('q', params.search.trim());
  if (params.city) query.set('city', params.city);
  if (params.status) query.set('status', params.status);

  // Transfers only active page payload (<50 KB)
  const response = await api.get(\`/api/clients?\${query.toString()}\`);
  return response.data;
}`,
      },
    ],
  },

  // 06 / API Architecture
  apiArchitecture: {
    summary: "REST endpoints for booking scheduling, paginated data grids, and cleaner status check-ins.",
    endpoints: [
      {
        method: "GET",
        path: "/api/bookings/calendar",
        description: "Fetches turnover cleaning jobs within a date range for FullCalendar rendering.",
        authRequired: true,
        statusCode: 200,
        responseSample: '[\n  {\n    "id": "b-401",\n    "title": "Villa Azure Turnover",\n    "start": "2025-02-14T10:00:00Z",\n    "end": "2025-02-14T15:00:00Z",\n    "status": "CHECKED_IN"\n  }\n]',
      },
      {
        method: "POST",
        path: "/api/bookings/check-in",
        description: "Field cleaner check-in endpoint recording GPS coordinates and arrival timestamp.",
        authRequired: true,
        statusCode: 200,
        responseSample: '{\n  "success": true,\n  "bookingId": "b-401",\n  "status": "CHECKED_IN"\n}',
      },
    ],
  },

  // 07 / Architectural Decisions
  decisions: [
    {
      id: "ADR-01",
      title: "Dual-Channel Telemetry (FCM + Socket.io) vs. Single Polling Channel",
      status: "ACCEPTED",
      problem:
        "Field cleaners missed jobs when relying on web dashboard notifications, and supervisors suffered 60-second polling delays before learning a cleaner had arrived.",
      chosenApproach:
        "FCM high-priority device pushes notify cleaners on their mobile phones, while Socket.io emits live arrival events to active supervisor dashboards.",
      alternativesConsidered: ["SMS text alerts", "HTTP short-polling every 10 seconds"],
      rationale:
        "Reduced missed property turnovers by 64% with zero SMS cost overhead and sub-second supervisor UI status updates.",
      tradeoffsAndLimitations:
        "Requires maintaining mobile device push tokens in the database.",
    },
    {
      id: "ADR-02",
      title: "Server-Side Paginated Grid vs. Client-Side Virtualized Memory Tables",
      status: "ACCEPTED",
      problem:
        "Downloading all 25,000+ client and property records to browser memory consumed over 85 MB RAM and caused mobile browser crashes.",
      chosenApproach:
        "Server-side pagination streaming only the active 10/25/50 rows per page (<50 KB payload).",
      alternativesConsidered: ["Full-dataset Redux caching with client filters"],
      rationale:
        "Enables instant initial page load regardless of total database size and preserves battery life on mobile devices.",
      tradeoffsAndLimitations:
        "Filter changes trigger an API network call instead of instant memory sorting.",
    },
  ],

  // 09 / Security
  security: {
    measures: [
      {
        title: "Role-Based Access Control (RBAC)",
        description: "Hierarchical permissions restrict billing data and CSV exports to administrators and regional supervisors.",
        implemented: true,
      },
      {
        title: "Device Token Signature Verification",
        description: "Firebase Cloud Messaging tokens are tied to authenticated cleaner user IDs to prevent unauthorized push delivery.",
        implemented: true,
      },
      {
        title: "Bearer Token Refresh Mutex",
        description: "Central Axios interceptor queues parallel 401s during admin session renewals to prevent session logouts.",
        implemented: true,
      },
    ],
  },

  // 10 / Production Challenges
  challenges: [
    {
      title: "Handling High-Frequency Socket.io Reconnect Storms During Wi-Fi Drops",
      difficulty: "Medium",
      problem:
        "When cleaners moved through basements with patchy connectivity, repeated rapid socket reconnect attempts overwhelmed server sockets.",
      investigation:
        "Found that socket client lacked exponential backoff jitter on reconnection retries.",
      solution:
        "Configured Socket.io client with randomizationFactor: 0.5, reconnectionDelay: 1000, and reconnectionDelayMax: 10000.",
      outcome:
        "Stabilized WebSocket connection volume and prevented server connection spikes.",
      lessonsLearned:
        "Always add random jitter and exponential backoff caps to mobile client WebSocket connections.",
    },
  ],

  // 11 / Interview Talking Points
  interviewTalkingPoints: [
    {
      topic: "Turnover Booking in <30 Seconds",
      claim: "Reduced cleaning booking creation time from 4 minutes down to under 30 seconds",
      defense:
        "Property managers coordinate cleanings between guest checkout (10 AM) and arrival (3 PM). Previously, they navigated multi-step forms across pages. We integrated FullCalendar with turnover templates, allowing managers to view unassigned slots and schedule bookings directly on the calendar with 2 clicks.",
    },
    {
      topic: "64% Missed Turnover Reduction",
      claim: "Reduced missed property turnovers by 64% using dual-channel telemetry",
      defense:
        "Cleaners work in the field and don't sit at desks. We registered Firebase device tokens to send high-priority push notifications for new jobs. On site, cleaners tap 'Check In', emitting a Socket.io event to the admin dashboard turning the booking badge from Blue to Green. Supervisors spot delays immediately.",
    },
    {
      topic: "25,000+ Records with <50 KB Payloads",
      claim: "Built a server-side paginated grid managing 25,000+ records with <50 KB payloads",
      defense:
        "Instead of downloading the entire database to the client, all search terms, city filters, and date ranges are query parameters sent to the API. We only fetch the active page, keeping payloads under 50 KB and rendering instant.",
    },
  ],

  // 12 / Future Improvements
  futureImprovements: [
    "Develop native offline mobile apps using React Native with background geofencing check-in",
    "Add automated laundry and linen inventory count tracking with bar code scanning",
    "Integrate dynamic cleaner payout calculations tied to completed room square-footage metrics",
  ],
};

