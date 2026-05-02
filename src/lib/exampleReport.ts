import type { ResearchReport } from "./agent";

export const EXAMPLE_NICHE = "solopreneur productivity tools";

export const EXAMPLE_REPORT: ResearchReport = {
  pain_points: [
    {
      title: "Context-switching between too many disconnected tools",
      frequency: 34,
      quotes: [
        "I spend more time managing my tools than actually working. Notion for docs, Linear for tasks, Slack for comms — none of them talk to each other.",
        "Every morning I have to manually sync what I did yesterday across 4 apps. There has to be a better way.",
        "The context switch cost is real. By the time I've opened my 6th tab, I've forgotten what I was doing.",
      ],
    },
    {
      title: "No single source of truth for daily priorities",
      frequency: 27,
      quotes: [
        "I wish there was one place I could see: here's what matters today, here's what's blocked, here's what's done.",
        "My to-do list, my calendar, and my project tracker all say different things. I just pick one and hope for the best.",
      ],
    },
    {
      title: "Automations break silently and you don't find out until it's too late",
      frequency: 19,
      quotes: [
        "Zapier looked fine for 3 weeks. Then I found out 200 leads never made it to my CRM. No alert, no error, nothing.",
        "Why does every no-code automation tool just silently fail? Give me an error log at least.",
      ],
    },
    {
      title: "Time tracking feels punishing and never reflects real work",
      frequency: 15,
      quotes: [
        "I tried Toggl for a month. I spent 20% of my time just remembering to start/stop the timer.",
        "Time tracking tools assume you work on one thing at a time. Solopreneurs don't — I'm context-switching every 20 minutes.",
      ],
    },
    {
      title: "AI tools produce generic output that still needs heavy editing",
      frequency: 12,
      quotes: [
        "ChatGPT gives me a first draft that sounds like everyone else's first draft. The editing takes longer than writing from scratch.",
        "I wanted AI to save me time on client emails. Instead I spend 15 minutes prompting and 10 minutes editing. Net zero.",
      ],
    },
  ],
  unmet_needs: [
    "A single 'daily cockpit' view that pulls tasks, calendar, and key metrics into one read-only morning briefing — no data entry required",
    "Automation monitoring with real alerts: proactive failure detection, retry logs, and Slack/email notifications when a workflow silently breaks",
    "Context-aware AI that learns your writing style and client tone so it requires minimal editing, not just generic prompt-response loops",
  ],
  recurring_questions: [
    "What's the best all-in-one tool for solopreneurs that doesn't cost $200/month?",
    "How do you handle client communication without losing hours to email?",
    "Is there a Zapier alternative that actually tells you when something breaks?",
    "How do you track time without it feeling like surveillance?",
    "What does your daily startup routine look like as a solopreneur?",
  ],
  opportunities: [
    {
      idea: "Silent Automation Monitor",
      rationale:
        "Addresses the 'automations break silently' pain point (19 mentions). A lightweight service that pings your Zapier/Make workflows and sends Slack/email alerts on failures, retries, or unexpected silence. Zero-setup SaaS with a free tier.",
    },
    {
      idea: "Morning Cockpit Dashboard",
      rationale:
        "Addresses the 'no single source of truth' pain point (27 mentions). Pulls tasks from Linear/Notion, events from Google Calendar, and key metrics from Stripe/Plausible into a read-only daily briefing. No data entry — just a morning clarity snapshot.",
    },
    {
      idea: "Style-trained AI email composer",
      rationale:
        "Addresses the 'AI output is too generic' pain point (12 mentions). Learns your past email style per client/context and generates replies that sound like you, not ChatGPT. Integrates with Gmail.",
    },
    {
      idea: "Passive time tracker via calendar + Git commits",
      rationale:
        "Addresses the 'time tracking feels punishing' pain point (15 mentions). Auto-reconstructs a time log from calendar events, git commits, and browser activity — no manual timer required. Exports to invoice-ready format.",
    },
  ],
  sources: [
    {
      title: "I've tried every productivity app. Here's why I always go back to plain text",
      url: "https://reddit.com/r/solopreneur/comments/example1",
      score: 847,
    },
    {
      title: "Zapier silently failed for 3 weeks and I lost 200 leads — story time",
      url: "https://reddit.com/r/Entrepreneur/comments/example2",
      score: 612,
    },
    {
      title: "What does your actual morning routine look like as a solopreneur?",
      url: "https://reddit.com/r/solopreneur/comments/example3",
      score: 534,
    },
    {
      title: "Ask HN: What's the one SaaS tool you wish existed for indie hackers?",
      url: "https://news.ycombinator.com/item?id=example4",
      score: 489,
    },
    {
      title: "I quit using AI for writing and my productivity went up — here's why",
      url: "https://reddit.com/r/SideProject/comments/example5",
      score: 401,
    },
    {
      title: "Context switching is destroying my focus. How do you handle it?",
      url: "https://reddit.com/r/Entrepreneur/comments/example6",
      score: 378,
    },
    {
      title: "Honest review: 6 months of time tracking as a solo founder",
      url: "https://reddit.com/r/SideProject/comments/example7",
      score: 299,
    },
    {
      title: "The hidden cost of no-code tools nobody talks about",
      url: "https://news.ycombinator.com/item?id=example8",
      score: 241,
    },
  ],
};
