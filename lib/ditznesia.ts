const BASE_URL = process.env.DITZNESIA_API_URL || "https://www.ditznesia.com/api/dev";

function apiKey(): string {
  const key = process.env.DITZNESIA_API_KEY;
  if (!key) throw new Error("DITZNESIA_API_KEY belum diatur di Environment Variables.");
  return key;
}

type Params = Record<string, string | number | undefined>;

export async function ditz(path: string, params: Params = {}) {
  const url = new URL(`${BASE_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`);
  url.searchParams.set("apikey", apiKey());

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
  }

  const response = await fetch(url.toString(), { cache: "no-store" });
  const text = await response.text();

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    data = { raw: text };
  }

  if (!response.ok) {
    const message = typeof data === "object" && data !== null && "message" in data
      ? String((data as { message?: unknown }).message)
      : `Provider HTTP ${response.status}`;
    throw new Error(message);
  }

  return data;
}
