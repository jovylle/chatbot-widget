# ADR 004: postMessage for config delivery

**Status:** Accepted

## Context

Widget config can include long `instructions`, arrays of links, and nested `info` objects. Passing everything via iframe URL query strings hits length limits and exposes config in server logs and referrer headers.

## Decision

1. Embed passes minimal params in iframe URL (`siteID`, `theme`) for initial paint.
2. On iframe load, embed sends full config via:

```javascript
iframe.contentWindow.postMessage({
  type: 'chat-config-v2',
  payload: { /* full config */ }
}, targetOrigin);
```

3. Widget listens for `chat-config-v2` and applies settings.
4. Both sides validate `event.origin` against the widget script origin when possible.

## Consequences

**Pros:**

- No URL length limits for large configs
- Config can update without reloading iframe (e.g. advanced playground)
- Clear typed message protocol for expand/focus events

**Cons:**

- Must document and maintain message types
- Origin validation adds complexity vs. wildcard `'*'`
- Misconfigured origins can block config delivery in strict setups

Legacy config element IDs (`chat-config`, `chat-config-advanced-v2`, etc.) remain supported for backward compatibility.
