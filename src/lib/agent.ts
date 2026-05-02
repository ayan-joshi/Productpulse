import { Groq } from "groq-sdk";
import { searchReddit, fetchPostWithComments, type RedditPostWithComments } from "./reddit";
import { searchHN } from "./hn";

const SYSTEM_PROMPT = `You are an expert product research agent. Your job: surface real user pain points, frustrations, and unmet needs in a niche by mining Reddit and HN discussions.

TOOLS (use in this exact order):
1. suggest_subreddits — pick 4-5 REAL, EXISTING subreddits with active communities (100k+ members preferred). NEVER invent subreddit names. If unsure, use broader well-known subs (r/Parenting, r/Entrepreneur, r/startups, r/AskReddit) rather than guessing a niche sub that may not exist. Include one broad sub as a catch-all.
2. search_reddit — run targeted, frustration-focused queries. 5-6 searches total max.
3. search_hn — one search for technical/founder angle on the niche.
4. deep_read_posts — fetch full content for the 8-10 best posts by engagement + relevance.

SEARCH QUERY PATTERNS THAT WORK (use these templates):
- "[niche] frustrated with"
- "[niche] wish there was"
- "[niche] biggest problem"
- "why is [niche] so hard"
- "[niche] alternatives"
- "[niche] hate"
- "anyone else struggling with [niche]"

Run ONE high-signal query per subreddit. Do not repeat similar queries.

POST SELECTION FOR DEEP READ:
- Only pick posts where the TITLE signals a real complaint, question, or rant
- Skip posts with score < 15 or that look like promotions / tutorials / news
- Pick diverse posts (different pain points, not 5 posts about the same thing)
- Max 10 posts total — quality beats quantity

STOP CRITERIA (stop as soon as EITHER is true):
- You have deep-read 8+ posts with real user complaints
- You have covered 3+ different sources
Do NOT keep searching after you hit the stop criteria. Call deep_read_posts once, then stop.`;

const TOOLS = [
  {
    type: "function" as const,
    function: {
      name: "suggest_subreddits",
      description: "Identify 4-5 most relevant subreddits for a given niche",
      parameters: {
        type: "object",
        properties: {
          subreddits: {
            type: "array",
            items: { type: "string" },
            description: "Subreddit names without r/ prefix",
          },
        },
        required: ["subreddits"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "search_reddit",
      description: "Search Reddit posts by keyword, optionally in a specific subreddit",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query" },
          subreddit: {
            type: "string",
            description: "Subreddit name (omit for global search)",
          },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "search_hn",
      description: "Search Hacker News stories about a topic",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search query" },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "deep_read_posts",
      description: "Fetch full content + comments for selected Reddit post permalinks (max 10)",
      parameters: {
        type: "object",
        properties: {
          permalinks: {
            type: "array",
            items: { type: "string" },
            description:
              "Reddit post permalinks, e.g. /r/sub/comments/xyz/title/",
          },
        },
        required: ["permalinks"],
      },
    },
  },
];

type ProgressCallback = (msg: string) => void;

async function executeTool(
  name: string,
  args: Record<string, unknown>,
  progressCb: ProgressCallback
) {
  if (name === "suggest_subreddits") {
    const subs = (args.subreddits as string[]) ?? [];
    progressCb(`Subreddits identified: ${subs.map((s) => `r/${s}`).join(", ")}`);
    return { subreddits: subs };
  }

  if (name === "search_reddit") {
    const query = args.query as string;
    const subreddit = args.subreddit as string | undefined;
    const label = subreddit ? `r/${subreddit}` : "Reddit (global)";
    progressCb(`Searching ${label} — "${query}"`);
    const results = await searchReddit(query, subreddit, 15);
    progressCb(`  → ${results.length} posts found`);
    return results;
  }

  if (name === "search_hn") {
    const query = args.query as string;
    progressCb(`Searching HN — "${query}"`);
    const results = await searchHN(query, 10);
    progressCb(`  → ${results.length} HN posts found`);
    return results;
  }

  if (name === "deep_read_posts") {
    const permalinks = ((args.permalinks as string[]) ?? []).slice(0, 10);
    progressCb(`Deep-reading ${permalinks.length} posts + comments...`);
    const posts: RedditPostWithComments[] = [];
    for (const pl of permalinks) {
      const post = await fetchPostWithComments(pl);
      if (post) posts.push(post);
    }
    progressCb(`  → ${posts.length} posts read successfully`);
    return posts;
  }

  return {};
}

function stripJsonFences(raw: string): string {
  if (raw.includes("```")) {
    const parts = raw.split("```");
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.startsWith("json")) return trimStart(part.slice(4).trim());
      if (trimmed.startsWith("{")) return trimmed;
    }
  }
  return raw.trim();
}

const trimStart = (s: string) => s.replace(/^\s+/, "");

export interface ResearchReport {
  pain_points: { title: string; frequency: number; quotes: string[] }[];
  unmet_needs: string[];
  recurring_questions: string[];
  opportunities: { idea: string; rationale: string }[];
  sources: { title: string; url: string; score: number }[];
}

export async function runAgent(
  niche: string,
  apiKey: string,
  progressCb: ProgressCallback
): Promise<ResearchReport> {
  const client = new Groq({ apiKey });

  const messages: Groq.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: `Research pain points, complaints, and unmet needs for: ${niche}` },
  ];

  const allPosts: unknown[] = [];
  progressCb(`Agent started for niche: **${niche}**`);

  for (let i = 0; i < 10; i++) {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: messages,
      tools: TOOLS,
      tool_choice: "auto",
      max_tokens: 2000,
      temperature: 0.3,
    });

    const msg = response.choices[0].message;

    const assistantTurn: Record<string, unknown> = { role: "assistant", content: msg.content ?? "" };
    if (msg.tool_calls) {
      assistantTurn.tool_calls = msg.tool_calls.map((tc) => ({
        id: tc.id,
        type: tc.type,
        function: { name: tc.function.name, arguments: tc.function.arguments },
      }));
    }
    messages.push(assistantTurn as unknown as Groq.Chat.ChatCompletionMessageParam);

    if (!msg.tool_calls) break;

    for (const tc of msg.tool_calls) {
      const args = JSON.parse(tc.function.arguments);
      let result: unknown;
      try {
        result = await executeTool(tc.function.name, args, progressCb);
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "Tool failed";
        progressCb(`  ⚠ Skipped (${errMsg})`);
        result = [];
      }
      if (Array.isArray(result)) allPosts.push(...result);
      messages.push({
        role: "tool",
        tool_call_id: tc.id,
        content: JSON.stringify(result),
      });
    }
  }

  progressCb(`Collection complete — ${allPosts.length} posts gathered. Synthesizing...`);

  return synthesizeReport(niche, allPosts as Record<string, unknown>[], client, progressCb);
}

async function synthesizeReport(
  niche: string,
  posts: Record<string, unknown>[],
  client: Groq,
  progressCb: ProgressCallback
): Promise<ResearchReport> {
  let postsText = "";
  for (let i = 0; i < Math.min(posts.length, 40); i++) {
    const p = posts[i];
    const title = (p.title as string) ?? "";
    const body = ((p.selftext as string) ?? "").slice(0, 600);
    const score = (p.score as number) ?? 0;
    const comments = (p.comments as { body: string }[]) ?? [];
    const commentSnippets = comments
      .slice(0, 5)
      .map((c) => c.body?.slice(0, 200))
      .filter(Boolean)
      .join("\n- ");
    postsText += `\n[${i + 1}] (score: ${score}) ${title}\n${body}\nTop comments:\n- ${commentSnippets}\nURL: ${(p.url as string) ?? ""}\n`;
  }

  const prompt = `You are analyzing community discussions to extract product research insights.

Niche: "${niche}"

Raw community data:
${postsText}

Your task: extract genuine signal from the data above. Do NOT invent pain points — only report what is directly evidenced in the posts.

Return ONLY valid JSON with no markdown fences, no commentary:

{
  "pain_points": [
    {"title": "string", "frequency": number, "quotes": ["exact phrase from a post", "exact phrase from a post"]}
  ],
  "unmet_needs": ["string", "string", "string"],
  "recurring_questions": ["string", "string", "string", "string", "string"],
  "opportunities": [
    {"idea": "string", "rationale": "string"}
  ],
  "sources": [
    {"title": "string", "url": "string", "score": number}
  ]
}

Rules:
- pain_points: top 5, sorted by frequency (highest first). frequency = how many posts/comments mention this theme. quotes MUST be verbatim phrases lifted directly from the post data above — not paraphrases.
- unmet_needs: top 3 gaps that existing tools/solutions clearly fail to solve, based on what users say.
- recurring_questions: top 5 actual questions users ask (copy the phrasing from the data where possible).
- opportunities: 3-5 specific product or feature ideas directly justified by the pain points found. Each rationale must cite which pain point it addresses.
- sources: top 8 most relevant posts with their actual URLs and scores from the data.`;

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: "You are a precise JSON generator. Output only valid JSON." },
      { role: "user", content: prompt },
    ],
    max_tokens: 3000,
    temperature: 0.1,
  });

  const raw = stripJsonFences(response.choices[0].message.content ?? "");

  try {
    const report = JSON.parse(raw) as ResearchReport;
    progressCb("Report generated successfully");
    return report;
  } catch {
    progressCb("⚠️ JSON parse issue — returning partial report");
    return {
      pain_points: [],
      unmet_needs: [],
      recurring_questions: [],
      opportunities: [],
      sources: [],
    };
  }
}