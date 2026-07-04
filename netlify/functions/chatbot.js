import fetch from "node-fetch";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 30;
const rateLimitMap = new Map();

function getClientIp(event) {
  return (
    event.headers["x-nf-client-connection-ip"]
    || event.headers["client-ip"]
    || event.headers["x-forwarded-for"]?.split(",")[0]?.trim()
    || "unknown"
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

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { messages = [], instructions, siteID } = JSON.parse(event.body || "{}");
    const clientIp = getClientIp(event);
    const rateKey = `${clientIp}:${siteID || "default"}`;

    if (isRateLimited(rateKey)) {
      console.warn("Rate limit exceeded:", { siteID, clientIp });
      return {
        statusCode: 429,
        body: JSON.stringify({
          reply: "Too many requests. Please wait a moment and try again.",
        }),
      };
    }

    console.log("Chat request:", { siteID: siteID || "unknown", messageCount: messages.length });

    const finalMessages = [
      { role: "system", content: instructions || "You're a helpful assistant." },
      ...messages,
    ];

    const model = process.env.OPENAI_MODEL || "gpt-3.5-turbo";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: finalMessages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const errMsg = data.error?.message || `HTTP ${response.status}`;
      console.error("OpenAI error:", { siteID, status: response.status, errMsg });
      return {
        statusCode: response.status,
        body: JSON.stringify({
          reply: `[Error from OpenAI: ${errMsg}]`,
        }),
      };
    }

    const content = data.choices?.[0]?.message?.content?.trim();

    if (!content) {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: "[No reply from model]" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: content }),
    };
  } catch (err) {
    console.error("Chatbot error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        reply: "Something went wrong. Please try again soon.",
      }),
    };
  }
}
