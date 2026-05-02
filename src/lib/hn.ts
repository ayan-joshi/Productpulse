import { requests } from "@/utils/requests";

export interface HNPost {
  title: string;
  url: string;
  hn_url: string;
  score: number;
  num_comments: number;
  selftext: string;
  subreddit: "HackerNews";
  source: "hackernews";
}

export async function searchHN(query: string, limit = 10): Promise<HNPost[]> {
  const resp = await requests("https://hn.algolia.com/api/v1/search", {
    params: { query, tags: "story", hitsPerPage: limit },
  });

  const hits = resp.data?.hits ?? [];
  const posts: HNPost[] = [];

  for (const h of hits) {
    const oid = h.objectID ?? "";
    posts.push({
      title: h.title ?? "",
      url: h.url ?? `https://news.ycombinator.com/item?id=${oid}`,
      hn_url: `https://news.ycombinator.com/item?id=${oid}`,
      score: h.points ?? 0,
      num_comments: h.num_comments ?? 0,
      selftext: (h.story_text ?? "").slice(0, 400),
      subreddit: "HackerNews",
      source: "hackernews",
    });
  }

  return posts;
}