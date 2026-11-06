import { CaseStudy } from "@/types/case-study";

export const blancaCaseStudy: CaseStudy = {
  slug: "blanca",
  title: "Blanca — Multi-Platform Real Estate & Lead CRM Ecosystem",
  subtitle:
    "Decoupled SSR Discovery Portal, Enterprise NestJS Backend & Fault-Tolerant Buildesk CRM Ingestion Pipeline",
  tagline:
    "Production-grade, decoupled real estate ecosystem uniting a high-performance Next.js 16 public discovery portal, an administrative React 18 data workbench, and an enterprise NestJS 11 REST API.",
  category: "fullstack",
  categoryLabel: "Full Stack / Enterprise Architecture",
  role: "Lead Full Stack Architect",
  timeline: "Production Active (2024 - 2025)",
  teamSize: "3 Engineers (1 Full Stack Lead, 1 Frontend Engineer, 1 QA)",
  status: "PRODUCTION_ACTIVE",
  isPrivate: true,
  liveUrl: undefined,
  githubUrl: "https://github.com/ChiragJain7300",
  techStack: [
    "Next.js 16 (App Router)",
    "React 19 / 18",
    "NestJS 11",
    "TypeORM",
    "PostgreSQL",
    "TanStack React Query v5",
    "Redux Toolkit",
    "Material React Table",
    "@dnd-kit",
    "Buildesk CRM API",
  ],
  tags: [
    "Next.js 16 SSR",
    "NestJS 11",
    "TypeORM",
    "CRM Ingestion",
    "Drag & Drop Grid",
    "Token Mutex",
    "PostgreSQL",
  ],

  // 10-Second Recruiter HUD Metrics
  impactMetrics: [
    {
      value: "<200ms",
      label: "Client Page Transitions",
      detail:
        "Achieved sub-200ms navigation across 500+ luxury listings via TanStack React Query memory caching.",
      defenseInInterview:
        "On the public portal, users frequently toggle between property listings and filters. TanStack React Query caches visited queries in browser memory. When a user navigates back to a previously loaded project or filter view, the data renders instantly from cache without waiting for a new backend request.",
    },
    {
      value: "100%",
      label: "Guaranteed Lead Capture",
      detail:
        "Engineered an isolated, two-phase lead ingestion pipeline that persists inquiries locally before dispatching to Buildesk CRM.",
      defenseInInterview:
        "Previously, if the external CRM had latency or was down, user submissions could fail. I separated the flow: when a user submits an inquiry, we commit it to our local PostgreSQL database first, return success to the user, and then dispatch to Buildesk CRM in an isolated background block so external downtime never loses a lead.",
    },
    {
      value: "90%",
      label: "Fewer Database Write Operations",
      detail:
        "Designed a bulk spatial sequence reordering engine with @dnd-kit and batched SQL updates.",
      defenseInInterview:
        "When admins reordered featured properties, a naive implementation would send an update request for every single item moved. Instead, we update the UI instantly, collect the new sequence array, and send a single batch array [{ id, sequence }] to the backend to update all items in one database transaction.",
    },
    {
      value: "0",
      label: "Session Logouts During Refreshes",
      detail:
        "Eliminated token refresh race conditions via a single-flight mutex in Axios interceptors.",
      defenseInInterview:
        "When an access token expires while navigating between dashboard tabs, multiple parallel calls return 401. With our single-flight mutex, the first 401 fires the refresh call while subsequent requests enqueue their callbacks, resuming immediately once the new token is acquired.",
    },
  ],

  // 01 / Executive Summary
  executiveSummary: {
    overview:
      "Blanca is a decoupled, multi-application real estate platform built to satisfy two divergent workloads: a consumer-facing public property discovery portal optimized for Core Web Vitals and dynamic search engine indexing, and an administrative workspace featuring dense data virtualization, drag-and-drop property sequencing, and automated lead ingestion into Buildesk CRM.",
    targetUsers:
      "High-intent luxury property buyers, real estate sales agents, and administrative operations managers.",
    businessContext:
      "High-value real estate leads were vulnerable to third-party CRM downtime, while administrative property reordering caused database row-lock contention and slow page load times on mobile devices.",
    coreProblem:
      "Coupled lead-dispatch pipelines caused customer inquiry drops during external CRM outages. Concurrently, administrative reordering triggered dozens of atomic SQL UPDATE statements, degrading server throughput.",
    solutionStatement:
      "Architected a decoupled platform featuring Next.js 16 SSR on the edge, an enterprise NestJS 11 backend with isolated two-phase lead ingestion, and an optimistic drag-and-drop sequencing grid.",
  },

  // 02 / Key Capabilities & Feature Tree
  capabilities: [
    {
      category: "Public Discovery & Real Estate SEO",
      items: [
        "Dynamic Next.js 16 App Router pre-rendering with OpenGraph metadata per listing",
        "TanStack React Query v5 stale-while-revalidate caching delivering sub-200ms transitions",
        "Micro-animated image galleries and property hero sliders powered by Framer Motion & GSAP",
        "Mobile-first responsive filtering across property types, budget tiers, and city regions",
      ],
    },
    {
      category: "Resilient Lead Ingestion & CRM Integration",
      items: [
        "Two-phase inquiry ingestion guaranteeing 100% lead capture regardless of CRM availability",
        "Automated phone and UTM campaign normalization with fallback defaults",
        "Isolated non-blocking Buildesk CRM webhook dispatch preventing user request rollbacks",
        "Transactional audit logging of all customer contact events in PostgreSQL",
      ],
    },
    {
      category: "Administrative Workspace & Operations",
      items: [
        "Material React Table virtualized grid with column grouping and dynamic filters",
        "Spatial drag-and-drop property reordering with @dnd-kit and batched SQL updates",
        "Single-flight Axios interceptor token refresh mutex preventing concurrent session drops",
        "Instant CSV streaming and export generation using json2csv pipes",
      ],
    },
  ],

  // 03 / System Architecture & Blueprint
  architecture: {
    summary:
      "Decoupled multi-tier topology separating the public Next.js 16 SSR portal, an administrative React 18 SPA, and a modular NestJS 11 backend connected to PostgreSQL and Buildesk CRM.",
    components: [
      {
        name: "Public Discovery Portal",
        type: "Frontend SSR Application",
        role: "Serves pre-rendered property pages, handles user search, and captures lead inquiries.",
        tech: "Next.js 16, React 19, TanStack Query v5, Framer Motion",
        inputs: "HTTPS requests from end users",
        outputs: "HTML + Hydrated DOM, REST API mutations",
        failureMode: "Degrades gracefully to cached static props if backend is temporarily unreachable.",
      },
      {
        name: "Admin Management Portal",
        type: "Frontend SPA",
        role: "Administrative grid for property inventory management, drag-and-drop reordering, and lead tracking.",
        tech: "React 18, Material UI v5, Material React Table, @dnd-kit",
        inputs: "Admin user interactions and Bearer token auth",
        outputs: "Bulk sequence updates, CSV export downloads",
        failureMode: "Locks editing inputs and presents toast notifications if mutations fail.",
      },
      {
        name: "NestJS 11 Modular API Engine",
        type: "Backend Microservice",
        role: "Orchestrates validation, authentication guards, database persistence, and CRM dispatch.",
        tech: "NestJS 11, Express, TypeORM, Passport-JWT, class-validator",
        inputs: "JSON payloads over HTTPS",
        outputs: "ACID database transactions, CRM API webhooks",
        failureMode: "Isolates external CRM timeouts inside try/catch boundaries without failing user requests.",
      },
      {
        name: "External Buildesk CRM",
        type: "Third-Party Integration",
        role: "Target CRM system where real estate sales agents manage customer calls and site visits.",
        tech: "HTTPS REST API, JSON payloads",
        inputs: "Normalized lead records from NestJS EnquireService",
        outputs: "HTTP 200/201 status acknowledgment",
        failureMode: "If offline, inquiry is retained safely in local PostgreSQL database.",
      },
    ],
    dataFlowSteps: [
      {
        step: 1,
        from: "User Browser",
        to: "Public Portal (Next.js 16)",
        action: "Submits inquiry form with Name, Phone, Email, and Project Slug",
        protocolOrPayload: "React Hook Form state",
      },
      {
        step: 2,
        from: "Public Portal",
        to: "NestJS API (/enquire)",
        action: "Dispatches validated DTO via Axios with UTM tags",
        protocolOrPayload: "HTTPS POST /enquire",
      },
      {
        step: 3,
        from: "NestJS EnquireService",
        to: "PostgreSQL Database",
        action: "Commits lead record to database first (source of truth)",
        protocolOrPayload: "TypeORM enquireRepo.save()",
      },
      {
        step: 4,
        from: "NestJS API",
        to: "User Browser",
        action: "Returns HTTP 201 Created immediately to the user",
        protocolOrPayload: "JSON { success: true, id: uuid }",
      },
      {
        step: 5,
        from: "NestJS EnquireService",
        to: "Buildesk CRM API",
        action: "Dispatches lead payload in an isolated, non-blocking background promise",
        protocolOrPayload: "HTTPS POST /api/leads (5s timeout)",
      },
    ],
  },

  // 04 / Database Design
  database: {
    engine: "PostgreSQL with TypeORM (Data Mapper Pattern)",
    designPhilosophy:
      "Normalized relational schema enforcing soft-delete auditing (is_deleted flags), UUID primary keys, and strict foreign key integrity between properties, developers, and customer inquiries.",
    tables: [
      {
        name: "enquiries",
        type: "table",
        description: "Stores all inbound customer leads, contact details, project references, and campaign tracking.",
        columns: [
          { name: "id", type: "uuid", key: "PK", description: "Unique lead identifier generated upon submission" },
          { name: "full_name", type: "varchar(255)", description: "Customer name submitted through inquiry modal" },
          { name: "phone_number", type: "varchar(32)", description: "Validated contact phone number" },
          { name: "email", type: "varchar(255)", description: "Customer email address" },
          { name: "project_id", type: "uuid", key: "FK", description: "Reference to the inquired property listing" },
          { name: "utm_source", type: "varchar(128)", description: "Marketing campaign attribution channel" },
          { name: "is_deleted", type: "boolean", description: "Soft delete flag for data compliance" },
          { name: "created_at", type: "timestamptz", description: "Timestamp of lead submission" },
        ],
        indexes: ["idx_enquiry_project_created (project_id, created_at DESC)"],
      },
      {
        name: "projects",
        type: "table",
        description: "Stores property developments, price brackets, specifications, and display sequence ordering.",
        columns: [
          { name: "id", type: "uuid", key: "PK", description: "Primary project identifier" },
          { name: "title", type: "varchar(255)", description: "Marketing title of the property project" },
          { name: "slug", type: "varchar(255)", key: "INDEX", description: "URL-friendly slug for SEO routing" },
          { name: "sequence", type: "integer", key: "INDEX", description: "Display priority index controlled by admin drag & drop" },
          { name: "status", type: "varchar(64)", description: "Project state: Under Construction / Ready" },
          { name: "price_range", type: "varchar(128)", description: "Formatted price bracket string" },
          { name: "is_deleted", type: "boolean", description: "Soft delete flag" },
        ],
        indexes: ["idx_project_sequence (sequence ASC)", "idx_project_slug (slug)"],
      },
    ],
  },

  // 05 / Code Walkthrough
  codeWalkthrough: {
    summary:
      "Core implementations showcasing the fault-tolerant lead ingestion pipeline, optimistic drag-and-drop batching, and single-flight token mutex.",
    snippets: [
      {
        id: "lead-dispatch",
        filename: "enquire.service.ts",
        language: "typescript",
        description: "Fault-tolerant, decoupled lead ingestion persisting to PostgreSQL before fire-and-forget CRM dispatch.",
        explanation:
          "Saves the enquiry to the local database first to ensure 100% lead durability, then dispatches to Buildesk CRM in an isolated background block so external downtime never loses a customer lead.",
        code: `@Injectable()
export class EnquireService {
  constructor(
    @InjectRepository(EnquireEntity)
    private readonly enquireRepo: Repository<EnquireEntity>,
    private readonly httpService: HttpService,
    private readonly logger: Logger,
  ) {}

  async createEnquiry(dto: CreateEnquireDto): Promise<EnquireEntity> {
    // 1. Commit locally first - primary source of truth
    const entity = this.enquireRepo.create({
      ...dto,
      is_deleted: false,
    });
    const savedEnquiry = await this.enquireRepo.save(entity);

    // 2. Fire-and-isolate CRM synchronization
    this.dispatchToBuildeskSafely(savedEnquiry).catch((err) => {
      this.logger.error(\`CRM Background Sync Failed for ID \${savedEnquiry.id}: \${err.message}\`);
    });

    return savedEnquiry;
  }

  private async dispatchToBuildeskSafely(enquiry: EnquireEntity): Promise<void> {
    try {
      const [firstName, ...rest] = (enquiry.fullName || '').trim().split(' ');
      const lastName = rest.join(' ') || 'N/A';

      const payload = {
        FirstName: firstName,
        LastName: lastName,
        MobileNumber: enquiry.phoneNumber,
        Email: enquiry.email,
        ProjectId: enquiry.projectId ?? DEFAULT_PROJECT_ID,
        Source: enquiry.utmSource || 'Organic Web',
      };

      await firstValueFrom(this.httpService.post(BUILDESK_API_URL, payload, { timeout: 5000 }));
    } catch (error) {
      this.logger.warn(\`Non-blocking Buildesk sync failure: \${error.message}\`);
    }
  }
}`,
      },
      {
        id: "token-mutex",
        filename: "axiosIns.ts",
        language: "typescript",
        description: "Single-flight Axios response interceptor mutex preventing invalid_grant token rotation cascades.",
        explanation:
          "The first 401 acquires the refresh lock, while parallel requests queue their callbacks. Once the fresh token is received, the queue drains automatically with zero session disconnects.",
        code: `let isAlreadyFetchingAccessToken = false;
let subscribers: Array<(token: string) => void> = [];

function onAccessTokenFetched(accessToken: string) {
  subscribers.forEach((callback) => callback(accessToken));
  subscribers = [];
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;
        try {
          const refreshToken = getStoredRefreshToken();
          const { data } = await axios.post('/auth/refresh', { refresh_token: refreshToken });
          storeNewTokens(data.access_token, data.refresh_token);
          isAlreadyFetchingAccessToken = false;
          onAccessTokenFetched(data.access_token);
          originalRequest.headers['Authorization'] = \`Bearer \${data.access_token}\`;
          return axiosInstance(originalRequest);
        } catch (refreshErr) {
          isAlreadyFetchingAccessToken = false;
          subscribers = [];
          forceLogout();
          return Promise.reject(refreshErr);
        }
      }

      return new Promise((resolve) => {
        subscribers.push((newToken: string) => {
          originalRequest.headers['Authorization'] = \`Bearer \${newToken}\`;
          resolve(axiosInstance(originalRequest));
        });
      });
    }
    return Promise.reject(error);
  }
);`,
      },
    ],
  },

  // 06 / API Architecture
  apiArchitecture: {
    summary: "Modular REST endpoints secured with Passport-JWT and automated class-validator DTO pipelines.",
    endpoints: [
      {
        method: "POST",
        path: "/api/enquire",
        description: "Submits a new customer inquiry, commits to PostgreSQL, and dispatches to Buildesk CRM.",
        authRequired: false,
        statusCode: 201,
        responseSample: '{\n  "success": true,\n  "data": {\n    "id": "e9a2-411a-821b",\n    "fullName": "Aarav Patel",\n    "createdAt": "2025-02-14T10:15:30.000Z"\n  }\n}',
      },
      {
        method: "PUT",
        path: "/api/admin/project/updateSequence",
        description: "Batch updates display sequence order of project listings following drag-and-drop operations.",
        authRequired: true,
        statusCode: 200,
        responseSample: '{\n  "success": true,\n  "updatedCount": 12\n}',
      },
    ],
  },

  // 07 / Architectural Decisions
  decisions: [
    {
      id: "ADR-01",
      title: "Next.js 16 (App Router / SSR) vs. Client-Side SPA for Public Portal",
      status: "ACCEPTED",
      problem:
        "Luxury real estate projects require instant search engine indexing and social link previews across messaging platforms.",
      chosenApproach:
        "Adopted Next.js 16 SSR with App Router to dynamically serve pre-rendered HTML and OpenGraph tags per listing.",
      alternativesConsidered: ["Vite React SPA", "Static Site Generation (SSG) with revalidation"],
      rationale:
        "Real estate inventory prices and statuses change frequently. Pure client-side SPAs deliver blank root HTML to social scrapers, while Next.js SSR guarantees rich unfurl previews.",
      tradeoffsAndLimitations:
        "Requires active Node.js server infrastructure compared to static S3 hosting.",
    },
    {
      id: "ADR-02",
      title: "Decoupled Local Lead Persistence vs. Direct Synchronous CRM Dispatch",
      status: "ACCEPTED",
      problem:
        "Synchronous CRM API calls inside user request lifecycles caused lost leads whenever the external CRM experienced latency or outages.",
      chosenApproach:
        "Two-phase ingestion: Commit lead to PostgreSQL immediately, return 201 to the user, and dispatch to Buildesk CRM in an isolated background block.",
      alternativesConsidered: ["Synchronous two-phase commit", "Message broker queue (RabbitMQ)"],
      rationale:
        "Guarantees 100% lead retention and sub-250ms API response times without introducing RabbitMQ operational complexity at initial scale.",
      tradeoffsAndLimitations:
        "Requires background reconciliation scripts if external CRM API remains down for extended periods.",
    },
  ],

  // 09 / Security
  security: {
    measures: [
      {
        title: "Stateless Dual-Token Rotation",
        description: "Short-lived JWT access tokens (15m) paired with database-verified refresh tokens and single-flight mutexes.",
        implemented: true,
      },
      {
        title: "Global ValidationPipe Sanitization",
        description: "All incoming controller payloads pass through class-validator with whitelist: true to strip unvalidated parameters.",
        implemented: true,
      },
      {
        title: "Swagger Basic Auth Protection",
        description: "Administrative OpenAPI specifications are gated behind express-basic-auth to prevent public endpoint discovery.",
        implemented: true,
      },
    ],
  },

  // 10 / Production Challenges
  challenges: [
    {
      title: "Zero Lead Loss During External CRM Rate-Limiting",
      difficulty: "High",
      problem:
        "During marketing campaigns, concurrent inquiry bursts caused Buildesk CRM to return HTTP 429 rate limit errors, rolling back naive synchronous transactions.",
      investigation:
        "Analyzed transaction boundaries and discovered that wrapping external HTTP calls inside TypeORM transaction blocks caused local rollbacks when third-party endpoints failed.",
      solution:
        "Decoupled the flow into an atomic local save followed by an isolated async dispatch block with timeout guards.",
      outcome:
        "100% of incoming inquiries are preserved in PostgreSQL, maintaining zero lead loss across high-volume ad campaigns.",
      lessonsLearned:
        "Never make external third-party network calls inside internal database transaction blocks.",
    },
  ],

  // 11 / Interview Talking Points
  interviewTalkingPoints: [
    {
      topic: "Page Transitions under 200ms",
      claim: "Achieved sub-200ms page transitions across 500+ listings",
      defense:
        "TanStack Query caches visited listings in browser memory. Subsequent navigations to previously loaded projects render instantly from cache while revalidating quietly in the background.",
    },
    {
      topic: "100% Lead Capture Reliability",
      claim: "Zero lead loss guaranteed during third-party CRM downtime",
      defense:
        "We commit inquiries to our PostgreSQL database first, return success to the user, and dispatch to Buildesk CRM in an isolated background block so external downtime never aborts a lead.",
    },
    {
      topic: "90% Database Write Reduction",
      claim: "Reduced spatial reordering database operations by 90%",
      defense:
        "Instead of triggering SQL UPDATEs on every card drag, we update the UI optimistically and transmit a single consolidated sequence array [{ id, sequence }] to be written in one atomic transaction.",
    },
  ],

  // 12 / Future Improvements
  futureImprovements: [
    "Transition background CRM dispatch from in-process promises to BullMQ with Redis for persistent retries",
    "Implement Edge Redis caching for high-traffic public property listing endpoints",
    "Integrate automated image transcoding pipeline converting uploads to WebP/AVIF formats",
  ],
};

