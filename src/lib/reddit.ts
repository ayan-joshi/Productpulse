import { requests } from "@/utils/requests";

const HEADERS = { "User-Agent": "ProductPulse/1.0 (research tool)" };

export interface RedditPost {
  title: string;
  selftext: string;
  permalink: string;
  url: string;
  score: number;
  num_comments: number;
  subreddit: string;
  source: "reddit";
}

export async function searchReddit(
  query: string,
  subreddit?: string,
  limit = 15
): Promise<RedditPost[]> {
  let url: string;
  let params: Record<string, string | number>;

  if (subreddit) {
    url = `https://www.reddit.com/r/${subreddit}/search.json`;
    params = { q: query, sort: "relevance", t: "year", limit, restrict_sr: 1 };
  } else {
    url = "https://www.reddit.com/search.json";
    params = { q: query, sort: "relevance", t: "year", limit };
  }

  let resp: Awaited<ReturnType<typeof requests>>;
  try {
    resp = await requests(url, { headers: HEADERS, params });
  } catch {
    return [];
  }
  const children = resp.data?.data?.children ?? [];
  const posts: RedditPost[] = [];

  for (const child of children) {
    const d = child.data ?? {};
    const permalink = d.permalink ?? "";
    posts.push({
      title: d.title ?? "",
      selftext: (d.selftext ?? "").slice(0, 500),
      permalink,
      url: `https://reddit.com${permalink}`,
      score: d.score ?? 0,
      num_comments: d.num_comments ?? 0,
      subreddit: d.subreddit ?? "",
      source: "reddit",
    });
  }

  await new Promise((r) => setTimeout(r, 1000));
  return posts;
}

export interface RedditPostWithComments extends RedditPost {
  comments: { body: string; score: number }[];
}

export async function fetchPostWithComments(
  permalink: string,
  maxComments = 15
): Promise<RedditPostWithComments | null> {
  try {
    const resp = await requests(`https://www.reddit.com${permalink}.json`, {
      headers: HEADERS,
    });
    const data = resp.data;
    const pd = data[0]?.data?.children?.[0]?.data ?? {};

    const comments: { body: string; score: number }[] = [];
    const rawComments = data[1]?.data?.children ?? [];

    for (const child of rawComments.slice(0, maxComments)) {
      const cd = child.data ?? {};
      const body = cd.body ?? "";
      if (body && body !== "[deleted]" && body !== "[removed]") {
        comments.push({ body: body.slice(0, 400), score: cd.score ?? 0 });
      }
    }

    await new Promise((r) => setTimeout(r, 500));

    return {
      title: pd.title ?? "",
      selftext: (pd.selftext ?? "").slice(0, 1000),
      permalink,
      url: `https://reddit.com${permalink}`,
      score: pd.score ?? 0,
      num_comments: pd.num_comments ?? 0,
      subreddit: pd.subreddit ?? "",
      source: "reddit",
      comments,
    };
  } catch {
    return null;
  }
}