1. BLANCA — Real Estate Discovery & Management Portal
Tech Stack: Next.js 16 (App Router / SSR), React 18, NestJS 11, PostgreSQL, TypeORM, TanStack React Query v5, Redux Toolkit, Material React Table

• Resume Bullets:
  - Architected a decoupled real estate platform using Next.js 16 and NestJS, achieving sub-200ms page transitions with TanStack Query caching across 500+ property listings.
  - Engineered an isolated lead ingestion pipeline that syncs customer inquiries to PostgreSQL and Buildesk CRM, maintaining 100% lead capture during third-party CRM downtime.
  - Built an administrative drag-and-drop property reordering table using @dnd-kit and batched SQL updates, reducing database write operations by 90%.


2. INVENTAM HRMS — HR Management & Employee Telemetry Ecosystem
Tech Stack: FastAPI (Python 3.11), AsyncSQLAlchemy 2.0, PostgreSQL, Vite 6, React 19, WeasyPrint, Slack Bolt, pynput, APScheduler

• Resume Bullets:
  - Engineered an asynchronous payroll engine in FastAPI and WeasyPrint that generates and compiles 450+ employee payslips into an in-memory ZIP archive in under 12 seconds with 0 MB server disk writes.
  - Developed cross-platform desktop telemetry agents in Python (pynput) logging activity metrics, utilizing encrypted local disk queues to guarantee 99.9% data delivery during network outages.
  - Automated Slack HR workflows (leaves, attendance, standups) using Slack Bolt and APScheduler, cutting employee leave approval turnaround from ~4.5 hours to under 10 minutes.

3. JUST WALK INDIA (JWI) — Sports Event Registration & Ticketing Platform
Tech Stack: Next.js 15 (App Router / SSR), React 19, NextAuth.js v4, Redux Toolkit, Material UI v6, Sentry, Mixpanel

• Resume Bullets:
  - Built a high-concurrency event registration and ticketing platform in Next.js 15 supporting 50,000+ participants across nationwide walkathon events.
  - Reduced checkout drop-offs by 28% by engineering a conditional payment bypass for 100% discount coupons and zero-amount community registrations.
  - Eliminated chunk load 404 errors during frequent continuous deployments by integrating build-time version hashing with automated client cache busting.

4. RAG STUDIO FORGE (VECTALK AI) — Enterprise AI Studio & Embeddable Widget
Tech Stack: Vite 5, React 18, TypeScript, Redux Toolkit, TailwindCSS v3, Shadcn UI (Radix Primitives), react-markdown, react-grid-layout

• Resume Bullets:
  - Developed an enterprise RAG AI studio and embeddable chat widget in React 18, maintaining a smooth 60 FPS across 10,000+ conversation logs via memoized data slicing.
  - Architected a lightweight embeddable chat widget (<180 KB bundle size) inside a sandboxed iframe with UUID v4 session validation, ensuring complete session isolation across host sites.
  - Created a store-injected Axios response interceptor that sanitizes raw database stack traces (sqlalchemy, asyncpg), preventing internal schema exposure to end users.

5. WDM PLATFORM — E-Commerce Warehouse & Data Synchronization
Tech Stack: Node.js (ES Modules), Express.js 5, MongoDB, Mongoose v8, node-cron v4, Bol.com Retailer API v10, Monday.com GraphQL API

• Resume Bullets:
  - Engineered an automated e-commerce data pipeline in Express.js 5 and MongoDB, reducing redundant OAuth roundtrips by 98% through a database token cache with a 30-second pre-expiry buffer.
  - Maintained 100% catalogue consistency across Bol.com listings by designing a set-difference reconciliation algorithm that automatically deletes delisted products from the database.
  - Formulated a self-healing morning cron architecture that automatically retries only failed jobs at 7:00 AM, saving ~1.5 hours of daily manual engineering maintenance.

6. VERIFIED INBOX (SCREEN) — Gmail Intelligence & Sender Security Platform
Tech Stack: NestJS 11, TypeORM, PostgreSQL, React 19 (Vite 7 + React Compiler), TanStack React Query v5, Tiptap v3, Google OAuth 2.0

• Resume Bullets:
  - Built a Gmail security and inbox intelligence platform in NestJS 11 and React 19 that synchronizes 500+ emails in under 6.5 seconds using parallel batches of 50 concurrent API requests.
  - Eliminated OAuth token refresh race conditions by implementing a Promise-coalescing lock map, preventing Google invalid_grant errors and user session logouts during concurrent syncs.
  - Designed an atomic, single-use authentication code exchange (DELETE ... RETURNING) that resolved cross-origin SameSite cookie drops on Google OAuth redirects.

7. CLEANCRM — Property Cleaning & Turnover Management Platform
Tech Stack: React, Redux Toolkit (20+ feature slices), FullCalendar, Socket.io, Firebase Cloud Messaging (FCM), Bootstrap 5, Ant Design

• Resume Bullets:
  - Developed a vacation rental turnover CRM in React and Redux Toolkit, reducing cleaning booking creation time from 4 minutes to under 30 seconds with FullCalendar multi-view templates.
  - Reduced missed property turnovers by 64% by implementing dual-channel telemetry combining Firebase push notifications with live Socket.io cleaner check-in alerts.
  - Built a server-side paginated grid supporting multi-parameter filtering across 25,000+ client and property records while keeping payload sizes under 50 KB per page.

8. EVENTCRM — Event Lifecycle & Catering Intelligence Platform
Tech Stack: Next.js (App Router / SSR), React 19/18, TypeScript, Redux Toolkit, TanStack Table, Yup, AWS S3 Pre-signed URLs

• Resume Bullets:
  - Architected an enterprise catering and event management CRM in Next.js and TypeScript, reducing lead-to-event onboarding time from 12 minutes to under 2.5 minutes via a unified multi-step booking wizard.
  - Implemented a three-tier Role-Based Access Control (RBAC) system across Next.js Edge Middleware and declarative UI wrappers, ensuring 100% unauthorized route access prevention.
  - Designed an isomorphic Axios authorization client that seamlessly injects Bearer tokens across Server Components and Client Components with zero caching of stale event records.
