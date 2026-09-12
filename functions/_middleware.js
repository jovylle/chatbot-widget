// Legacy Netlify function path compat.
// (public/_redirects also declares this rewrite, but a middleware forward is
// deterministic — it doesn't depend on redirects→Functions proxy semantics.)
import { onRequestPost } from "./api/chatbot.js";

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.pathname === "/.netlify/functions/chatbot") {
    if (context.request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }
    return onRequestPost(context);
  }
  return context.next();
}
