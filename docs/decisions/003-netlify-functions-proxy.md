# ADR 003: Netlify Functions as OpenAI proxy

**Status:** Accepted

## Context

OpenAI API keys must not ship to browsers. Every chat request needs server-side authentication. The project already deploys to Netlify as static + functions.

## Decision

Proxy chat through `netlify/functions/chatbot.js`:

- Accept `{ messages, instructions, siteID }` from the widget
- Prepend system message from `instructions`
- Call OpenAI Chat Completions API with `OPENAI_API_KEY`
- Return `{ reply }` to the client

Use raw `fetch` rather than the OpenAI SDK to keep the function bundle small.

## Consequences

**Pros:**

- API key stays server-side only
- Simple deployment on existing Netlify stack
- Easy to add rate limiting and logging in one place

**Cons:**

- Tied to Netlify (or compatible serverless) for the default deployment
- Shared API key across all embed sites unless we add per-site auth later
- Cold starts on serverless invocations

Model selection via `OPENAI_MODEL` env var allows upgrades without code changes.
