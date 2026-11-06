import { CaseStudy } from "@/types/case-study";

export const verifiedInboxCaseStudy: CaseStudy = {
  slug: "verified-inbox",
  title: "Verified Inbox (SCREEN) — Email Intelligence & Security Platform",
  subtitle:
    "Gmail Dual-Sync Architecture, Promise-Coalescing OAuth Token Refresh & Atomic Sender Verification",
  tagline:
    "Enterprise email intelligence and inbox security platform intercepting, classifying, and trust-scoring inbound correspondence with parallel batch synchronization and sender gating.",
  category: "backend",
  categoryLabel: "Backend & Systems Security",
  role: "Backend & Security Lead",
  timeline: "Production Active (2024 - 2025)",
  teamSize: "3 Engineers (1 Backend Lead, 1 Frontend Engineer, 1 Security Specialist)",
  status: "PRODUCTION_ACTIVE",
  isPrivate: true,
  liveUrl: undefined,
  githubUrl: "https://github.com/ChiragJain7300",
  techStack: [
    "NestJS 11",
    "TypeORM",
    "PostgreSQL",
    "React 19 (Vite 7)",
    "TanStack React Query v5",
    "Tiptap v3",
    "Google OAuth 2.0",
    "Gmail API v1",
    "Crypto (AES-256)",
  ],
  tags: [
    "Gmail API",
    "Parallel Batches",
    "Promise Coalescing",
    "OAuth Refresh Lock",
    "Atomic Code Exchange",
    "Sender Gating",
    "Trust Scoring",
    "NestJS 11",
  ],

  // 10-Second Recruiter HUD Metrics
  impactMetrics: [
    {
      value: "<6.5s",
      label: "500+ Email Sync Duration",
      detail:
        "Synchronized 500+ emails in under 6.5s using parallel batches of 50 concurrent API requests (Promise.allSettled).",
      defenseInInterview:
        "Fetching full email payloads sequentially over HTTP is slow. When doing the initial sync, we list message IDs and then fetch full RFC822 payloads in parallel batches of 50 using Promise.allSettled. This gives high throughput without exceeding Google's per-second rate limits.",
    },
    {
      value: "0",
      label: "OAuth invalid_grant Errors",
      detail:
        "Eliminated token refresh race conditions via a Promise-coalescing lock map, preventing session logouts during concurrent background syncs.",
      defenseInInterview:
        "When a user opens the inbox, multiple background syncs and UI widgets fire at once. If the token is expired, all callers detect expiry at the same time and attempt to call Google's refresh endpoint. Google invalidates old refresh tokens upon first use, so the second call fails and logs the user out. With a Map<userId, Promise<string>>, the first caller creates the refresh promise, and all other callers await that exact same promise.",
    },
    {
      value: "100%",
      label: "Cross-Origin Cookie Retention",
      detail:
        "Designed an atomic, single-use authentication code exchange (DELETE ... RETURNING) that resolved cross-origin SameSite cookie drops on OAuth redirects.",
      defenseInInterview:
        "Setting an httpOnly session cookie during a 302 cross-origin redirect from Google fails in many modern browsers due to SameSite restrictions. Instead, the backend generates a 2-minute UUID code in auth_code_exchange and redirects the user to /login?code=UUID. The frontend calls /auth/exchange, and the backend runs DELETE ... WHERE code = :code RETURNING user_id. This validates and deletes the code in a single SQL operation, making it impossible to reuse.",
    },
    {
      value: "0-100",
      label: "Multi-Factor Trust Score",
      detail:
        "Automated sender classification scoring legitimacy based on Google Contacts presence, interaction history, DMARC/DKIM signals, and newsletter headers.",
    },
  ],

  // 01 / Executive Summary
  executiveSummary: {
    overview:
      "Verified Inbox (SCREEN) is an enterprise email intelligence and inbox security platform that intercepts, classifies, and trust-scores inbound email correspondence. Operating on a sender gating and verification-challenge model, the platform shields users from unsolicited senders, phishing attempts, and cold outbound noise while automatically surfacing authenticated, high-trust communications.",
    targetUsers:
      "Executives, founders, security officers, and high-volume email power users seeking inbox signal clarity.",
    businessContext:
      "Executives receive hundreds of unsolicited inbound pitches, phishing attempts, and automated spam daily, drowning critical high-priority communications in operational noise.",
    coreProblem:
      "Google API synchronization rate-limits caused long loading delays on initial mailbox ingestion. Furthermore, simultaneous background syncs triggered OAuth race conditions (invalid_grant), and browser SameSite cookie restrictions broke post-login redirects.",
    solutionStatement:
      "Architected a modular NestJS 11 backend featuring parallel batching with Promise.allSettled, an in-memory Promise-coalescing token lock map, an atomic single-use auth code exchange bridge, and a headless Tiptap v3 composer.",
  },

  // 02 / Key Capabilities & Feature Tree
  capabilities: [
    {
      category: "Dual-Sync Gmail Engine & Recovery",
      items: [
        "High-throughput initial sync fetching 500+ messages in under 6.5s via parallel 50x batches",
        "Heartbeat-driven incremental delta synchronization querying the Gmail History API",
        "Self-healing 7-day History API reset handlers automatically recovering expired history IDs",
        "Fast-path reply detection immediately updating thread state upon outbound message delivery",
      ],
    },
    {
      category: "OAuth Concurrency & Session Security",
      items: [
        "Promise-coalescing token refresh lock map merging parallel renewal requests into a single flight",
        "Elimination of Google invalid_grant errors caused by concurrent refresh token rotation",
        "Atomic single-use code exchange (DELETE ... RETURNING) circumventing SameSite cookie drops",
        "AES-256 encrypted token persistence with isolated database credentials",
      ],
    },
    {
      category: "Rules-Based Sender Gating & Trust Scoring",
      items: [
        "Multi-factor trust score (0-100) analyzing Google Contacts, SPF, DKIM, and DMARC headers",
        "Automated Challenge Queue isolating unknown senders until verified by recipient",
        "Headless Tiptap v3 email composer with rich formatting and auto-draft saving",
        "React 19 / TanStack Query frontend with in-memory thread caching delivering instant navigation",
      ],
    },
  ],

  // 03 / System Architecture & Blueprint
  architecture: {
    summary:
      "Modular NestJS 11 backend communicating with Google Workspace / Gmail APIs, featuring a Promise-coalescing refresh lock, dual-sync ingestion, and atomic code exchange.",
    components: [
      {
        name: "Google Workspace / Gmail API",
        type: "External API Integration",
        role: "Primary message provider for message listings, RFC822 payloads, and delta history events.",
        tech: "Gmail API v1, OAuth2 PKCE",
        inputs: "HTTPS requests with Bearer tokens",
        outputs: "JSON message lists, raw email payloads, History ID events",
        failureMode: "Throttled requests back off with exponential jitter to satisfy Google rate limits.",
      },
      {
        name: "NestJS 11 Modular Core",
        type: "Backend API Engine",
        role: "Orchestrates batch ingestion, token refresh locking, trust scoring, and database transactions.",
        tech: "NestJS 11, TypeORM, RxJS, Passport",
        inputs: "REST requests, Gmail webhook events",
        outputs: "Normalized thread records, trust classifications",
        failureMode: "Dual-guard sync mutex prevents overlapping sync cycles per user.",
      },
      {
        name: "Promise-Coalescing Token Lock",
        type: "In-Memory Concurrency Manager",
        role: "Merges simultaneous token refresh requests per user into a single promise.",
        tech: "TypeScript Map<userId, Promise<string>>",
        inputs: "Concurrent 401 token refresh triggers",
        outputs: "Single fresh access token broadcast to all waiting callers",
        failureMode: "Clears user promise entry in finally block, even if refresh fails.",
      },
      {
        name: "Atomic Auth Code Exchange",
        type: "Security Bridge",
        role: "Exchanges temporary UUID tokens for session credentials in a single atomic SQL transaction.",
        tech: "PostgreSQL, TypeORM DELETE ... RETURNING",
        inputs: "Temporary exchange code from redirect query param",
        outputs: "Validated user session without SameSite cookie drop risks",
        failureMode: "Codes expire automatically after 2 minutes; single-use prevents replay attacks.",
      },
    ],
    dataFlowSteps: [
      {
        step: 1,
        from: "User Browser",
        to: "Google OAuth",
        action: "Completes Google authentication; redirected to backend callback",
        protocolOrPayload: "OAuth 302 redirect",
      },
      {
        step: 2,
        from: "Backend Callback",
        to: "PostgreSQL (auth_code_exchange)",
        action: "Generates 2-minute UUID code in DB and redirects browser to /login?code=UUID",
        protocolOrPayload: "INSERT INTO auth_code_exchange (code, user_id)",
      },
      {
        step: 3,
        from: "Frontend (/login)",
        to: "Backend (/auth/exchange)",
        action: "Exchanges code via atomic query: DELETE ... WHERE code = :code RETURNING user_id",
        protocolOrPayload: "HTTPS POST /auth/exchange",
      },
      {
        step: 4,
        from: "Sync Engine",
        to: "Gmail API v1",
        action: "Executes initial sync: fetches 500 emails in 10 parallel chunks (50 per batch) via Promise.allSettled",
        protocolOrPayload: "HTTPS GET /gmail/v1/users/me/messages/batch",
      },
    ],
  },

  // 04 / Database Design
  database: {
    engine: "PostgreSQL with TypeORM v0.3",
    designPhilosophy:
      "Relational schema with encrypted credential columns, composite indexing on thread lookup paths, and atomic exchange token tables.",
    tables: [
      {
        name: "auth_code_exchange",
        type: "table",
        description: "Temporary cryptographic tokens for cross-origin authentication code exchange.",
        columns: [
          { name: "code", type: "uuid", key: "PK", description: "Cryptographically random exchange token" },
          { name: "user_id", type: "uuid", key: "FK", description: "Reference to authenticated user" },
          { name: "expires_at", type: "timestamptz", description: "Expiration timestamp (2-minute TTL)" },
        ],
        indexes: ["idx_auth_code_expires (expires_at)"],
      },
      {
        name: "email_threads",
        type: "table",
        description: "Stored email conversations, message counts, sender trust scores, and folder status.",
        columns: [
          { name: "id", type: "uuid", key: "PK", description: "Primary thread identifier" },
          { name: "google_thread_id", type: "varchar(64)", key: "INDEX", description: "Gmail thread ID from Google API" },
          { name: "user_id", type: "uuid", key: "FK", description: "Inbox account owner" },
          { name: "sender_email", type: "varchar(255)", description: "Originating sender address" },
          { name: "trust_score", type: "integer", description: "Computed sender score (0-100)" },
          { name: "is_verified", type: "boolean", description: "Sender gating status flag" },
          { name: "last_message_at", type: "timestamptz", description: "Timestamp of latest interaction" },
        ],
        indexes: ["idx_threads_user_last (user_id, last_message_at DESC)"],
      },
    ],
  },

  // 05 / Code Walkthrough
  codeWalkthrough: {
    summary:
      "Core implementations showcasing the Promise-coalescing token refresh lock and the atomic auth code exchange.",
    snippets: [
      {
        id: "promise-coalescing",
        filename: "google-auth.service.ts",
        language: "typescript",
        description: "Promise-coalescing token refresh map merging parallel renewal calls into a single flight.",
        explanation:
          "Stores in-flight refresh promises in an in-memory map keyed by userId. All concurrent calls await the exact same promise, completely eliminating Google invalid_grant race conditions.",
        code: `@Injectable()
export class GoogleAuthService {
  // In-memory Promise-coalescing lock map
  private tokenRefreshLocks = new Map<string, Promise<string>>();

  async getValidAccessToken(userId: string): Promise<string> {
    const user = await this.userRepo.findOneBy({ id: userId });
    
    // Check if token is still valid (with 60s buffer)
    if (user.tokenExpiry > Date.now() + 60000) {
      return this.decryptToken(user.encryptedAccessToken);
    }

    // If a refresh is already in-flight for this user, join the existing promise
    if (this.tokenRefreshLocks.has(userId)) {
      return this.tokenRefreshLocks.get(userId)!;
    }

    // First caller creates and registers the refresh promise
    const refreshPromise = (async () => {
      try {
        const refreshToken = this.decryptToken(user.encryptedRefreshToken);
        const { credentials } = await this.oauthClient.refreshToken(refreshToken);
        
        await this.userRepo.update(userId, {
          encryptedAccessToken: this.encryptToken(credentials.access_token!),
          tokenExpiry: credentials.expiry_date!,
        });

        return credentials.access_token!;
      } finally {
        // Always clean up lock map when promise resolves or rejects
        this.tokenRefreshLocks.delete(userId);
      }
    })();

    this.tokenRefreshLocks.set(userId, refreshPromise);
    return refreshPromise;
  }
}`,
      },
      {
        id: "atomic-code-exchange",
        filename: "auth.service.ts",
        language: "typescript",
        description: "Atomic single-use code exchange preventing replay attacks and SameSite cookie drops.",
        explanation:
          "Executes DELETE ... WHERE code = :code RETURNING user_id in a single atomic SQL statement, ensuring codes can never be reused or intercepted.",
        code: `@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async exchangeCodeForSession(code: string): Promise<{ accessToken: string }> {
    // Atomic validation & deletion: single SQL operation
    const result = await this.dataSource.query(
      \`DELETE FROM auth_code_exchange 
       WHERE code = $1 AND expires_at > NOW() 
       RETURNING user_id\`,
      [code]
    );

    if (!result || result.length === 0) {
      throw new UnauthorizedException('Invalid or expired authentication code.');
    }

    const userId = result[0].user_id;
    const accessToken = this.jwtService.sign({ sub: userId }, { expiresIn: '15d' });

    return { accessToken };
  }
}`,
      },
    ],
  },

  // 06 / API Architecture
  apiArchitecture: {
    summary: "NestJS REST endpoints for inbox sync, thread filtering, and atomic code exchange.",
    endpoints: [
      {
        method: "POST",
        path: "/api/auth/exchange",
        description: "Exchanges single-use UUID code for a 15-day session JWT.",
        authRequired: false,
        statusCode: 200,
        responseSample: '{\n  "accessToken": "eyJhbGciOiJIUzI1Ni...",\n  "expiresIn": 1296000\n}',
      },
      {
        method: "POST",
        path: "/api/sync/mailbox",
        description: "Triggers parallel batch synchronization for the authenticated mailbox.",
        authRequired: true,
        statusCode: 200,
        responseSample: '{\n  "syncedMessages": 500,\n  "durationMs": 6240,\n  "status": "COMPLETED"\n}',
      },
    ],
  },

  // 07 / Architectural Decisions
  decisions: [
    {
      id: "ADR-01",
      title: "Promise-Coalescing Token Refresh vs. Optimistic Unlocked Retries",
      status: "ACCEPTED",
      problem:
        "Google OAuth revokes older refresh tokens upon use. Concurrent background syncs triggered parallel refreshes, causing invalid_grant errors and logging out active users.",
      chosenApproach:
        "Created an in-memory Map<userId, Promise<string>> that deduplicates simultaneous refresh requests into a single flight per user.",
      alternativesConsidered: ["Redis distributed lock", "Serializing all API calls through a FIFO queue"],
      rationale:
        "Completely eliminated invalid_grant session drops without the network overhead of distributed Redis locks.",
      tradeoffsAndLimitations:
        "Locks are memory-resident per node; suited for single-cluster worker setups.",
    },
    {
      id: "ADR-02",
      title: "Atomic Code Exchange vs. Direct Cross-Origin Cookie Set",
      status: "ACCEPTED",
      problem:
        "Modern browsers drop SameSite=None cookies during 302 redirects from third-party OAuth providers, breaking direct login redirects.",
      chosenApproach:
        "Backend redirects to frontend with a short-lived UUID code, which the client immediately exchanges via DELETE ... RETURNING.",
      alternativesConsidered: ["Disabling SameSite security flags", "Passing raw JWTs in URL query parameters"],
      rationale:
        "Single-use tokens with immediate atomic deletion prevent token interception and URL history leakage while guaranteeing 100% login success.",
      tradeoffsAndLimitations:
        "Requires one additional HTTP roundtrip on initial authentication.",
    },
  ],

  // 09 / Security
  security: {
    measures: [
      {
        title: "AES-256 Encrypted Token Storage",
        description: "Google OAuth access and refresh tokens are encrypted at rest using AES-256-GCM before database write.",
        implemented: true,
      },
      {
        title: "Atomic Single-Use Exchange Tokens",
        description: "Authentication codes are deleted in the same SQL statement that validates them, preventing replay attacks.",
        implemented: true,
      },
      {
        title: "DMARC, DKIM & SPF Signal Verification",
        description: "Sender authentication headers are evaluated before computing trust scores to detect spoofed domains.",
        implemented: true,
      },
    ],
  },

  // 10 / Production Challenges
  challenges: [
    {
      title: "Recovering from Expired Gmail History IDs After Extended User Inactivity",
      difficulty: "High",
      problem:
        "Google invalidates Gmail History IDs older than 7 days. When users returned after a week, incremental delta sync threw HTTP 404 History ID Expired errors.",
      investigation:
        "Discovered that naive error handlers halted sync cycles entirely when history.list returned 404.",
      solution:
        "Implemented an automatic catch handler: if History ID expired, the service automatically clears the stored pointer and triggers a full fallback initial sync.",
      outcome:
        "Self-healing recovery restores mailbox parity without user intervention or manual database resets.",
      lessonsLearned:
        "Always build self-healing fallback mechanisms for stateful external history and cursor pointers.",
    },
  ],

  // 11 / Interview Talking Points
  interviewTalkingPoints: [
    {
      topic: "500+ Emails in <6.5s",
      claim: "Synchronized 500+ emails in under 6.5s using parallel batches of 50 concurrent requests",
      defense:
        "Fetching email payloads sequentially over HTTP is slow. We list message IDs and fetch full payloads in parallel batches of 50 using Promise.allSettled, achieving high throughput without exceeding Google's rate limits.",
    },
    {
      topic: "Promise Coalescing Token Lock",
      claim: "Eliminated OAuth token refresh race conditions via a Promise-coalescing lock map",
      defense:
        "When an expired session makes parallel requests, all callers try to refresh at once. Google invalidates old tokens upon use, so subsequent calls fail and log the user out. With a Map<userId, Promise<string>>, all callers await the exact same promise.",
    },
    {
      topic: "Atomic Auth Code Exchange",
      claim: "Designed an atomic single-use code exchange (DELETE ... RETURNING) for SameSite redirects",
      defense:
        "Setting cookies during a 302 cross-origin redirect fails in modern browsers. The backend generates a 2-minute UUID code, redirects to /login?code=UUID, and the frontend exchanges it via DELETE ... RETURNING in a single SQL operation.",
    },
  ],

  // 12 / Future Improvements
  futureImprovements: [
    "Integrate on-device vector search for instantaneous local mailbox search queries",
    "Deploy automated outbound reply categorization using small fine-tuned BERT models",
    "Add support for Microsoft Outlook / Graph API dual-sync pipelines",
  ],
};

