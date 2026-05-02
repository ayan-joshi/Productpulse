# ProductPulse

**AI research agent that mines Reddit and Hacker News for real user pain points — results in ~90 seconds.**

🔗 **Live:** https://productpulse-60fo.onrender.com

---

## What it does

You type a niche. ProductPulse autonomously:

1. Identifies the most relevant subreddits
2. Runs targeted frustration-focused searches across Reddit + Hacker News
3. Deep-reads the highest-signal posts and comments
4. Returns a structured report with ranked pain points, unmet needs, recurring questions, and product opportunities

No surveys. No Google Trends. Real people, real complaints.

---

## Demo

Visit [`/research`](https://productpulse-60fo.onrender.com/research) and type any niche — e.g. `standing desk ergonomics`, `B2B sales automation`, `Indian baby products`.

You can also share a pre-run link:
```
https://productpulse-60fo.onrender.com/research?niche=solopreneur+productivity
```
The agent auto-runs on load.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| AI / Agent | Groq API — Llama 3.3 70B with tool use |
| Data sources | Reddit JSON API + HN Algolia API |
| Streaming | Server-Sent Events (SSE) |
| Deployment | Render |

---

## Features

- **Agentic pipeline** — multi-step tool use (suggest subreddits → search → deep-read → synthesize)
- **Live activity log** — watch the agent work in real time
- **Structured report** — pain points with frequency + verbatim quotes, unmet needs, recurring questions, product opportunities, top sources
- **Shareable links** — `/research?niche=X` auto-runs the agent
- **Export** — download report as JSON or copy as Markdown
- **Search history** — last 5 niches saved locally
- **Example report** — pre-loaded demo on first visit so the page is never blank

---

## Local Setup

### 1. Clone and install

```bash
git clone https://github.com/ayan-joshi/Productpulse.git
cd Productpulse
npm install
```

### 2. Add environment variables

Create `.env.local` in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Get a free API key at [console.groq.com](https://console.groq.com).

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── research/
│   │   ├── page.tsx              # Suspense wrapper
│   │   ├── ResearchClient.tsx    # Research workspace (client)
│   │   └── layout.tsx            # Route metadata
│   └── api/research/route.ts     # SSE streaming endpoint
├── components/
│   ├── research/
│   │   ├── ResearchForm.tsx      # Niche input + history
│   │   ├── ActivityLog.tsx       # Live agent log
│   │   └── ReportDisplay.tsx     # Report with export buttons
│   ├── ReportPreview.tsx         # Landing page output preview
│   └── Logo.tsx                  # SVG logo component
└── lib/
    ├── agent.ts                  # Groq agent orchestrator
    ├── reddit.ts                 # Reddit search + post fetcher
    ├── hn.ts                     # HN Algolia search
    └── exampleReport.ts          # Static demo report data
```

---

## How the Agent Works

```
User input (niche)
      ↓
suggest_subreddits → finds 4-5 real communities
      ↓
search_reddit (5-6 targeted queries with frustration keywords)
search_hn (1 query for technical/founder angle)
      ↓
deep_read_posts → fetches full content + top comments for 8-10 best posts
      ↓
synthesizeReport → Groq extracts structured JSON report
      ↓
Streamed to frontend via SSE
```

Agent uses a stop-early strategy — halts as soon as 8+ high-signal posts are read, keeping runs under 90 seconds.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | Yes | From [console.groq.com](https://console.groq.com) — free tier available |

---

## Built by

[Ayan Joshi](https://github.com/ayan-joshi)
