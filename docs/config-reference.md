# Config reference

All options live under the `chatbot` key in the JSON config block.

```html
<script type="application/json" id="chat-widget-config">
{ "chatbot": { /* options below */ } }
</script>
```

## Core

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `instructions` | `string` | Generic assistant prompt | System prompt sent to GPT on every request |
| `title` | `string` | `"Chat Widget"` | Label on the chat tab and widget title |
| `siteID` | `string` | `"demo"` | Identifier for logging and session storage; forwarded to the API |
| `variant` | `string` | `"v2"` | Optional label for the widget flavor |

## Appearance

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `theme` | `string` | auto-detect | `"light"` or `"dark"`; omit to detect from host page |
| `position` | `string` | `"bottom-right"` | `"bottom-right"`, `"bottom-left"`, `"top-right"`, `"top-left"` |
| `accentColor` | `string` | `"#3f51b5"` | Hex color for accents and the floating button |
| `tagline` | `string` | — | Optional header line above instructions |

## Chat UX

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `starterMessage` | `string` | `"Choose one to get started."` | Prompt above starter suggestion buttons |
| `starterSuggestions` | `string[]` | 3 defaults | Up to 3 quick prompts before the first message |
| `loadingMessage` | `string` | `"Thinking..."` | Text shown while waiting for a reply |
| `autoOpen` | `boolean` | `false` | Open the widget panel immediately after load |
| `includePageContext` | `boolean` | `false` | Send host page URL and title with chat requests |

## Content tabs

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `quickLinks` | `object[]` | `[]` | `{ label, url, description }` — shown on Quick links tab |
| `info` | `object` | `null` | `{ headline, summary, stats: [{ label, value }] }` — More tab |

Tabs without content are hidden automatically.

## Config element IDs

The embed script reads config from the first matching element:

1. `chat-widget-config` (recommended)
2. `chat-config-advanced-v2`
3. `chat-config-advanced`
4. `chat-config`

## Host API

Not part of JSON config — available on `window.ChatWidget` after embed loads:

| Method | Returns | Description |
|--------|---------|-------------|
| `open()` | `void` | Show the chat panel |
| `close()` | `void` | Hide the chat panel |
| `toggle()` | `void` | Toggle panel visibility |
| `isOpen()` | `boolean` | Whether the panel is visible |

## Server environment (Netlify)

These are set in Netlify dashboard or `.env` locally — not in embed config:

| Variable | Default | Description |
|----------|---------|-------------|
| `OPENAI_API_KEY` | — | Required. OpenAI API key |
| `OPENAI_MODEL` | `gpt-3.5-turbo` | Model for chat completions |
