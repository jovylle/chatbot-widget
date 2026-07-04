# ADR 005: Single canonical embed path

**Status:** Accepted

## Context

The project evolved through v1 and v2 embed paths (`/v1/embed.js`, `/v2/embed.js`). Maintaining separate bundles duplicated logic and confused documentation.

## Decision

- **Canonical script:** `/embed.js`
- **Canonical widget:** `/widget.html`
- **Legacy shims:** `/v1/embed.js` and `/v2/embed.js` inject `/embed.js` dynamically
- **Config ID:** `chat-widget-config` (canonical); older IDs still read

All new documentation and examples use canonical paths only.

## Consequences

**Pros:**

- One source of truth for embed behavior
- Existing integrations keep working via shims
- README and docs stay accurate

**Cons:**

- Old blog posts or snippets may still reference `/v2/embed.js`
- Redirect HTML pages in `/v1/` and `/v2/` add minor maintenance surface

We will not remove legacy shims without a deprecation period.
