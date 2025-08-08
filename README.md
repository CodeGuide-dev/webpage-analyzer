# 🔍 Webpage Analyzer

An AI-powered web application that analyzes landing pages and provides actionable copywriting and layout improvement suggestions. Simply enter any webpage URL to get instant, detailed feedback to optimize your content.

## ✨ Features

- 🤖 **AI-Powered Analysis** - Uses JinaAI for content extraction and OpenAI for intelligent insights
- 🔒 **Secure Authentication** - User management powered by Clerk
- 📝 **Markdown Reports** - Detailed analysis reports in readable Markdown format
- 💾 **Report History** - Save and revisit past analyses locally
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast Analysis** - Get results in under 10 seconds
- 📥 **Download Reports** - Export analysis as `.md` files for offline use
- 🎨 **Beautiful UI** - Modern interface with smooth animations

## 🛠 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) with App Router
- **Authentication:** [Clerk](https://clerk.com/)
- **AI Services:** [JinaAI](https://jina.ai/) + [OpenAI](https://openai.com/)
- **UI/UX:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) + [Framer Motion](https://framer.com/motion)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Markdown:** [marked](https://marked.js.org/) + [react-markdown](https://github.com/remarkjs/react-markdown)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Database:** [Supabase](https://supabase.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- [Clerk](https://clerk.com/) account for authentication
- [JinaAI](https://jina.ai/) API key for content extraction
- [OpenAI](https://openai.com/) API key for analysis
- [Supabase](https://supabase.com/) project (optional, for future database features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd webpage-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (see Configuration section)

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## ⚙ Configuration

### Required Environment Variables

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# AI Services
JINAAI_API_KEY=your_jinaai_api_key
OPENAI_API_KEY=your_openai_api_key

# Supabase (Optional)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Setup Instructions

#### 1. Clerk Authentication
- Visit [Clerk Dashboard](https://dashboard.clerk.com/)
- Create a new application
- Copy your Publishable Key and Secret Key from the API Keys section

#### 2. JinaAI Setup
- Sign up at [JinaAI](https://jina.ai/)
- Generate an API key from your dashboard
- Add to environment variables

#### 3. OpenAI Setup  
- Create account at [OpenAI](https://openai.com/)
- Generate an API key from your API keys section
- Add to environment variables

#### 4. Supabase (Optional)
- Create project at [Supabase Dashboard](https://app.supabase.com/)
- Copy Project URL and anon key from Project Settings > API

## 📁 Project Structure

```
webpage-analyzer/
├── app/                          # Next.js 14 App Router
│   ├── api/analyze/             # API route for webpage analysis
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main analyzer page
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   ├── analysis-result.tsx      # Markdown report renderer
│   └── url-analyzer.tsx         # URL input component
├── lib/                         # Utilities and helpers
│   ├── analyze.ts               # JinaAI & OpenAI integration
│   └── utils.ts                 # General utilities
├── hooks/                       # Custom React hooks
├── types/                       # TypeScript type definitions
├── documentation/               # Project documentation
└── supabase/                    # Database config & migrations
```

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Adding New Features

1. **API Routes**: Add new endpoints in `app/api/`
2. **Components**: Create reusable components in `components/`
3. **AI Integration**: Extend `lib/analyze.ts` for new AI features
4. **Styling**: Use Tailwind classes with shadcn/ui components

## 🚀 Usage

1. **Sign In**: Create an account or log in with Clerk authentication
2. **Enter URL**: Paste any webpage URL in the input field
3. **Analyze**: Click analyze and wait for AI-powered insights
4. **Review**: Read the detailed analysis with improvement suggestions
5. **Download**: Save the report as a Markdown file
6. **History**: Access previous analyses from your report history

## 📊 Performance

- **Analysis Time**: ~5-10 seconds average
- **Supported URLs**: Any publicly accessible webpage
- **Report Storage**: Local browser storage (up to ~5MB)
- **Concurrent Users**: Scalable serverless architecture

## 🛡️ Security Features

- 🔐 Secure API key storage (server-side only)
- 🔒 HTTPS enforcement
- 🧹 XSS protection with sanitized Markdown
- ⚡ Rate limiting on API endpoints
- 🛠 Input validation with Zod schemas

## 📖 API Documentation

### POST `/api/analyze`

Analyzes a webpage and returns improvement suggestions.

```typescript
// Request
{
  url: string // The webpage URL to analyze
}

// Response
{
  analysis: string // Markdown-formatted analysis report
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [JinaAI](https://jina.ai/) for content extraction
- [OpenAI](https://openai.com/) for intelligent analysis
- [Vercel](https://vercel.com/) for seamless deployment
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
