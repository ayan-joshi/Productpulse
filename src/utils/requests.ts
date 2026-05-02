/**
 * HTTP client using native fetch with built-in retry + timeout.
 */
async function fetchWithTimeout(
  url: string,
  init?: RequestInit & { timeout?: number }
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), init?.timeout ?? 15000);

  try {
    const resp = await fetch(url, {
      ...init,
      signal: controller.signal,
    });
    return resp;
  } finally {
    clearTimeout(timer);
  }
}

export async function requests(
  url: string,
  init?: RequestInit & { timeout?: number; params?: Record<string, string | number> }
) {
  let finalUrl = url;
  if (init?.params) {
    const qs = new URLSearchParams(
      Object.entries(init.params).map(([k, v]) => [k, String(v)])
    ).toString();
    finalUrl = `${url}?${qs}`;
  }

  const resp = await fetchWithTimeout(finalUrl, {
    ...init,
    headers: {
      "User-Agent": "ProductPulse/1.0 (research tool)",
      ...(init?.headers ?? {}),
    },
  });

  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status}: ${resp.statusText}`);
  }

  return { data: await resp.json(), status: resp.status };
}