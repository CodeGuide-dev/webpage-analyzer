flowchart TD
  A[User Opens App] --> B[Clerk Auth Gate]
  B --> C[URL Submission Form]
  C --> D[POST to api analyze]
  D --> E[JinaAI Fetch Content]
  E --> F[OpenAI Analyze Content]
  F --> G[API Returns Markdown]
  G --> H[Render AnalysisResult]
  H --> I[Download Markdown Report]