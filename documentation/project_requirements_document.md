# Project Requirements Document (PRD)

## 1. Project Overview

**Paragraph 1:**
Webpage Analyzer is a web application that lets users enter any webpage URL and instantly get actionable copywriting and layout improvement suggestions. Under the hood, it fetches the raw HTML and text of the target site using JinaAI, sends that content to OpenAI for natural language analysis, and then presents a structured report in Markdown format. Users can read the feedback online or download the report for offline use.

**Paragraph 2:**
This tool is being built to help marketers, copywriters, and designers quickly audit web pages without manual inspection. Key objectives include ease of use (single URL form), secure handling of API keys (all AI calls go through server-side Next.js API routes), and fast turnaround (aiming for report generation under 10 seconds). Success will be measured by user adoption, average response time, and the accuracy/relevance of suggestions as judged by early testers.

---

## 2. In-Scope vs. Out-of-Scope

**In-Scope (MVP):**
- User sign-up, sign-in, and session management (Clerk)  
- Single-page interface with URL submission form (React Hook Form + Zod validation)  
- Next.js API route (`/api/analyze`) that:  
  • Fetches content via JinaAI  
  • Analyzes text via OpenAI  
- Markdown rendering of analysis results (`marked` library)  
- Downloadable Markdown report  
- Client-side local persistence of past reports (`useLocalStorage` hook)  
- Responsive UI with Tailwind CSS, shadcn/ui, Framer Motion, Lucide icons  
- Deployment on Vercel with environment-based API keys

**Out-of-Scope (Phase 2+):**
- Team collaboration features (sharing, commenting)  
- Multi-page project management or versioning  
- In-app editing of page content  
- Additional AI models (e.g., for layout mockups)  
- Mobile native or desktop application  
- Analytics dashboard with usage metrics  
- Multi-language support beyond English  

---

## 3. User Flow

**Paragraph 1:**
A new user lands on the homepage and is prompted to sign up or log in via Clerk’s authentication widgets. After authentication, they’re redirected to the main analyzer page, where they see a simple form at the top—an input field labeled "Enter webpage URL" and a submit button. Input is validated in real time: empty or invalid URLs trigger an inline error message.

**Paragraph 2:**
When the user hits "Analyze," the form sends a `POST` request to the Next.js `/api/analyze` endpoint. The server fetches and analyzes content, then returns a Markdown report. The front end displays a loading spinner (Framer Motion) until the response arrives. Once ready, the Markdown is rendered in the main content area using the `marked` library. The user can read suggestions, click a "Download .md" button to save the report locally, or view past reports stored in localStorage below the current result.

---

## 4. Core Features

- **Authentication (Clerk):** Sign-up, login, session management, protected routes  
- **URL Submission Form:** React Hook Form + Zod for real-time validation and error handling  
- **Server-Side API Layer:** Next.js API route `/api/analyze` to keep AI keys secure  
- **Content Fetching (JinaAI):** `getWebsiteContent(url)` helper in `lib/analyze.ts`  
- **AI Analysis (OpenAI):** `analyzeContent(text)` helper in `lib/analyze.ts`  
- **Markdown Rendering:** Use `marked` to convert Markdown to sanitized HTML  
- **Report Download:** Client-side generation of `.md` file and download link  
- **Local Persistence:** Custom `useLocalStorage` hook to store and retrieve past reports  
- **Responsive UI:** Tailwind CSS + shadcn/ui for design, Framer Motion for animations, Lucide React for icons  
- **Deployment Pipeline:** Vercel integration with environment variables for API keys  
- **Basic Error Handling & Notifications:** Inline form errors, toast messages for network/AI failures

---

## 5. Tech Stack & Tools

- Frontend: Next.js 14 (App Router), React 18  
- Styling: Tailwind CSS, shadcn/ui components  
- Animations: Framer Motion, Lucide React icons  
- Forms & Validation: React Hook Form, Zod  
- Auth & User Management: Clerk  
- Backend/API: Next.js API Routes (`app/api/analyze/route.ts`)  
- AI Services: JinaAI (content fetch), OpenAI (analysis) via `lib/analyze.ts`  
- Persistence: Browser localStorage (custom hook), Supabase client setup (future DB integration)  
- Markdown Parser: marked  
- Deployment: Vercel  
- IDE/Plugins (Optional): Cursor.ai, Windsurf for AI-assisted coding and navigation

---

## 6. Non-Functional Requirements

- **Performance:** 90th percentile response time ≤ 10s for analysis; initial page load ≤ 2s at 3G speeds  
- **Security:** All AI API keys stored server-side; enforce HTTPS; sanitize Markdown output to prevent XSS  
- **Scalability:** Rate limiting on `/api/analyze`; stateless serverless functions to scale with demand  
- **Usability:** WCAG 2.1 AA accessibility; mobile-first responsive design; clear form error messages  
- **Reliability:** 99.9% uptime on Vercel; retry logic for AI API calls (up to 2 retries with exponential backoff)  
- **Maintainability:** TypeScript across codebase; modular folder structure; JSDoc on key functions

---

## 7. Constraints & Assumptions

- JinaAI and OpenAI API credentials are available and have sufficient quota  
- The environment supports Next.js 14 serverless functions (Vercel)  
- LocalStorage capacity (~5MB) is enough for storing text-only reports  
- Users will only analyze publicly accessible URLs (no auth-protected pages)  
- No on-premise hosting; relies on Vercel’s managed infrastructure  
- Supabase is set up but only client initialization is in scope (no database schema changes yet)

---

## 8. Known Issues & Potential Pitfalls

- **API Rate Limits:** JinaAI/OpenAI quotas may be exhausted; implement monitoring and notify admins  
- **Large Page Content:** Fetching very large websites could hit memory/time limits; consider chunking or summary first  
- **Markdown Security:** Untrusted HTML injection via Markdown; use a sanitizer like DOMPurify  
- **Network Failures:** Flaky connections can cause timeouts; implement retry/backoff logic and user messaging  
- **LocalStorage Limits:** Users with many reports could exceed browser storage; warn or prune old entries  
- **Edge Cases in URL Validation:** Some valid URLs may fail Zod checks; maintain a whitelist of URL patterns or fallback parsing logic

---

*End of PRD*