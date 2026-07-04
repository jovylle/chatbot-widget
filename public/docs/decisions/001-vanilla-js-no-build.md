# ADR 001: Vanilla JS with no build step

**Status:** Accepted

## Context

chat-widget must be embeddable on any website with a single `<script>` tag. Host sites may use WordPress, static HTML, React, or legacy stacks. Adding a build toolchain (Webpack, Vite) would complicate adoption and deployment.

## Decision

Use vanilla HTML, CSS, and JavaScript in `public/`. No bundler, no transpilation, no npm publish step for the widget itself. Netlify serves files as-is.

The only npm dependencies serve the Netlify Function (`node-fetch`).

## Consequences

**Pros:**

- Zero build time for static assets
- Easy to read, fork, and debug in browser DevTools
- Smallest possible integration surface for host sites

**Cons:**

- No TypeScript or component framework ergonomics
- Manual duplication if the codebase grows significantly
- Markdown rendering and other features must stay lightweight (inline parser vs. heavy libs)

We accept these trade-offs while the project remains a focused embed widget.
