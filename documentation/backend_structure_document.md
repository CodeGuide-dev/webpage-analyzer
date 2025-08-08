# Backend Structure Document

This document outlines the backend setup of the Webpage Analyzer application. It describes the architecture, database management, APIs, hosting, infrastructure components, security, monitoring, and maintenance practices. The goal is to provide a clear, non-technical overview of how the backend works and why certain choices were made.

## 1. Backend Architecture

The backend is built using Next.js API Routes. This means we rely on Next.js both for serving pages and for handling server-side logic in dedicated API endpoints.

• Frameworks and Patterns
  - Next.js (App Router) for routing, server-side rendering (SSR), and API routes.
  - Separation of concerns: API routes handle business logic, `lib/` modules contain core functions (e.g., content fetching, AI calls), and React components focus on UI.
  - Environment variables (`.env`) store API keys and secrets, keeping them out of client code.

• Scalability, Maintainability, Performance
  - Serverless API Routes on Vercel automatically scale in response to traffic spikes.
  - Modular code structure (pages, components, lib, utils) eases future feature additions and bug fixes.
  - Third-party services (JinaAI, OpenAI) handle heavy processing, keeping our servers lightweight.

## 2. Database Management

Although the core analysis flow uses local browser storage for reports, we leverage Supabase (a hosted PostgreSQL service) for user-related data and future storage of analysis history.

• Database Technology
  - Type: SQL
  - System: Supabase (managed PostgreSQL)

• Data Handling
  - User accounts and sessions are managed by Clerk, with Supabase storing user profiles and access records.
  - In the current setup, analysis reports are saved locally in the browser. We plan to extend Supabase to store reports in the future.
  - Supabase uses Row-Level Security (RLS) to ensure users can only access their own data.

## 3. Database Schema

Below is a human-readable overview of the proposed SQL schema for storing users and analysis reports. You can run these statements in PostgreSQL via Supabase.

```sql
-- Table to store user profiles (supplied by Clerk integration)
CREATE TABLE profiles (
  id              uuid PRIMARY KEY,
  email           text UNIQUE NOT NULL,
  created_at      timestamp with time zone DEFAULT now(),
  updated_at      timestamp with time zone DEFAULT now()
);

-- Table to store analysis reports
CREATE TABLE analysis_reports (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid REFERENCES profiles(id) ON DELETE CASCADE,
  url             text NOT NULL,
  fetched_content text NOT NULL,
  analysis_markdown text NOT NULL,
  created_at      timestamp with time zone DEFAULT now(),
  updated_at      timestamp with time zone DEFAULT now()
);

-- Index to quickly retrieve reports by user
CREATE INDEX ON analysis_reports (user_id);
``` 

## 4. API Design and Endpoints

We use RESTful API routes built into Next.js to handle client-backend communication.

• Main Endpoint
  - `POST /api/analyze`
    • Purpose: Receive a URL, fetch its content, analyze it via JinaAI and OpenAI, and return the analysis in Markdown format.
    • Input: `{ url: string }`
    • Output: `{ analysis: string }` (Markdown text)
    • Logic: Calls `lib/analyze.ts` methods (`getWebsiteContent`, `analyzeContent`).

• (Future) Report Management Endpoints
  - `GET /api/reports`  — List a user’s saved reports
  - `POST /api/reports` — Save a new analysis report
  - `GET /api/reports/{id}` — Retrieve a specific report
  - `DELETE /api/reports/{id}` — Remove a report

• Authentication
  - Clerk middleware protects API routes, ensuring only signed-in users can call protected endpoints.

## 5. Hosting Solutions

• Application Hosting
  - Vercel: Hosts the Next.js app and API routes. Provides automatic SSL, global CDN, and seamless deployments from the Git repository.

• Database Hosting
  - Supabase: Managed PostgreSQL database with built-in authentication, storage, and edge functions.

• Authentication Service
  - Clerk: Hosted user management service handling sign-up, sign-in, password resets, and session management.

**Benefits**
  - Reliability: Vercel and Supabase offer high uptime SLAs.
  - Scalability: Serverless functions on Vercel scale automatically. Supabase scales vertically and horizontally as needed.
  - Cost-Effectiveness: Pay-as-you-go model and generous free tiers for early-stage projects.

## 6. Infrastructure Components

• Load Balancing & CDN
  - Vercel’s global CDN caches static assets and serverless responses close to users, reducing latency.

• Caching Mechanisms
  - Edge caching on Vercel for static assets and ISR (Incremental Static Regeneration) if adopted in future expansions.

• Networking
  - HTTPS enforced by default via Vercel’s SSL certificates.

• Storage
  - LocalStorage: Temporary client-side storage for analysis reports.
  - Supabase Storage (optional): For storing larger files or logs in the future.

## 7. Security Measures

• Authentication & Authorization
  - Clerk manages user identity, issuing secure JSON Web Tokens (JWT) for API access.
  - API routes check tokens and enforce user-specific data access with Supabase Row-Level Security.

• Data Encryption
  - In transit: HTTPS/TLS for all network traffic.
  - At rest: Supabase encrypts database storage by default.

• Secrets Management
  - API keys (OpenAI, JinaAI, Clerk, Supabase) kept in environment variables on Vercel, never exposed to the client.

• Rate Limiting & Abuse Prevention (Future)
  - Implement rate limiting on `/api/analyze` to avoid excessive AI calls.

## 8. Monitoring and Maintenance

• Logging
  - Vercel logs serverless function invocations and errors.
  - Supabase provides query and performance logs in its dashboard.

• Metrics and Alerts
  - Vercel Analytics: Tracks request volumes, latencies, and error rates.
  - Supabase Metrics: Monitors database performance and usage.

• Error Tracking (Recommended)
  - Integrate Sentry or Logflare for centralized error monitoring and alerting.

• Maintenance Practices
  - Automated deployments on Git pushes (continuous deployment).
  - Regular dependency updates and security scans.
  - Scheduled backups of Supabase database.

## 9. Conclusion and Overall Backend Summary

The Webpage Analyzer’s backend leverages modern, serverless technologies to deliver scalable, secure, and maintainable services:

• Next.js API Routes provide a unified framework for both frontend and backend logic, allowing rapid development and seamless deployment on Vercel.
• Supabase offers a robust PostgreSQL database with built-in authentication, ready to store user profiles and analysis history.
• Clerk handles user management, ensuring secure access to protected features.
• External AI services (JinaAI, OpenAI) perform content fetching and analysis, offloading heavy processing from our servers.

Together, these components form a cohesive and future-proof backend foundation that aligns with the project’s goals of reliability, performance, and ease of use. As the application grows, additional endpoints, caching strategies, and monitoring tools can be added without major architectural changes, ensuring long-term success.