# ADR 002: Iframe isolation for embed safety

**Status:** Accepted

## Context

The widget runs on third-party sites with unknown CSS, z-index stacks, and global JavaScript. Injecting chat UI directly into the host DOM risks style conflicts, layout breakage, and accidental interference from host scripts.

## Decision

`embed.js` renders only a floating button and a wrapper on the host page. All chat UI loads inside an iframe pointing to `widget.html` on the widget origin.

Config and expand/collapse state sync via `postMessage`.

## Consequences

**Pros:**

- Widget styles are fully isolated from host CSS
- Predictable rendering across diverse host sites
- Clear security boundary between host and widget code

**Cons:**

- Extra round-trip to load iframe
- `postMessage` protocol required for config and layout sync
- Full-page expand mode needs parent/child coordination
- Slightly more complex than inline DOM injection

We consider isolation essential for a generic embed product.
