// Cloudflare Pages Function — POST /api/chatbot
// Port of netlify/functions/chatbot.js (OpenAI proxy with per-IP+site rate limiting).
// Legacy path /.netlify/functions/chatbot is rewritten here via public/_redirects
// so old cached embed copies keep working.

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;
const rateLimitMap = new Map();

function getClientIp(request) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function isRateLimited(key) {
  const now = Date.now();
  const entry = rateLimitMap.get(key) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };

  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + RATE_LIMIT_WINDOW_MS;
  }

  entry.count += 1;
  rateLimitMap.set(key, entry);
  return entry.count > RATE_LIMIT_MAX;
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let payload = {};
  try {
    payload = await request.json();
  } catch {
    return json({ reply: "[Invalid request body]" }, 400);
  }

  const { messages = [], instructions, siteID } = payload;
  const clientIp = getClientIp(request);
  const rateKey = `${clientIp}:${siteID || "default"}`;

  if (isRateLimited(rateKey)) {
    console.warn("Rate limit exceeded:", { siteID, clientIp });
    return json({ reply: "Too many requests. Please wait a moment and try again." }, 429);
  }

  console.log("Chat request:", { siteID: siteID || "unknown", messageCount: messages.length });

  const finalMessages = [
    { role: "system", content: instructions || "You're a helpful assistant." },
    ...messages,
  ];

  const model = env.OPENAI_MODEL || "gpt-5-nano";

  let response;
  try {
    response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ model, messages: finalMessages }),
    });
  } catch (err) {
    console.error("OpenAI fetch failed:", { siteID, err: String(err) });
    return json({ reply: "[Chat service unreachable. Please try again soon.]" }, 502);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errMsg = data.error?.message || `HTTP ${response.status}`;
    console.error("OpenAI error:", { siteID, status: response.status, errMsg });
    return json({ reply: `[Error from OpenAI: ${errMsg}]` }, response.status);
  }

  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) {
    return json({ reply: "[No reply from model]" });
  }

  return json({ reply: content });
}

// Any non-POST method → 405, same as the Netlify handler.
export function onRequest(context) {
  if (context.request.method === "POST") return onRequestPost(context);
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
}
