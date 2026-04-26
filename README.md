# 💬 chat-widget

Embed a GPT-powered chatbot into any site.

## Quick Start

### 1. Most minimal

Load the widget script only. No config block.

```html
<script src="https://chat-widget.uft1.com/embed.js"></script>
```

For local development, use:

```html
<script src="http://localhost:52873/embed.js"></script>
```

### 2. Minimal with context

Add a small config block when you want a custom title and starter instructions.

```html
<script type="application/json" id="chat-widget-config">
{
  "chatbot": {
    "title": "Chat",
    "instructions": "You are the assistant for Zen Slice, an Asian-style pizza shop in Makati City, Philippines. Be friendly, help with menu questions, suggest best sellers, and guide customers to order."
  }
}
</script>
<script src="https://chat-widget.uft1.com/embed.js"></script>
```

### On the demo page

Visit [https://chat-widget.uft1.com/](https://chat-widget.uft1.com/) to see both minimal setups.

- `Use this` on the one-line snippet swaps the live demo to script-only mode.
- `Use this` on the config snippet swaps the live demo to the minimal JSON config.

## Advanced setup

If you want the generated snippet editor, theme selector, and optional config fields, open [`/advanced/`](https://chat-widget.uft1.com/advanced/).

```html
<script type="application/json" id="chat-widget-config">
{
  "chatbot": {
    "siteID": "tokyo-zen-pizza",
    "theme": "dark",
    "position": "bottom-right",
    "accentColor": "#7c5dff",
    "variant": "shop",
    "title": "Chat Widget",
    "tagline": "Fresh Asian-inspired pizza, ready to order.",
    "starterMessage": "Choose one to get started.",
    "instructions": "You are the assistant for Zen Slice, an Asian-style pizza shop in Makati City, Philippines. Help with menu, prices, delivery zones, and ordering.",
    "starterSuggestions": [
      "What can you help with?",
      "How do I get started?",
      "Show me examples."
    ],
    "quickLinks": [
      { "label": "Menu", "url": "https://example.com/menu", "description": "View all pizza flavors and sides." },
      { "label": "Promos", "url": "https://example.com/promos", "description": "See latest bundles and discounts." }
    ],
    "info": {
      "headline": "Zen Slice Makati",
      "summary": "Tokyo-inspired toppings, local ingredients, and fast delivery.",
      "stats": [
        { "label": "Branches", "value": "3" },
        { "label": "Open today", "value": "10AM-11PM" }
      ]
    }
  }
}
</script>
<script src="https://chat-widget.uft1.com/embed.js"></script>
```

## Extended widget v2

Need more than chat? The v2 bundle adds a tabbed panel with quick links and host info.

```html
<script type="application/json" id="chat-config-advanced-v2">
{
  "chatbot": {
    "siteID": "extended-v2-demo",
    "theme": "dark",
    "position": "bottom-right",
    "accentColor": "#4c6ef5",
    "variant": "pro",
    "tagline": "Chat, links, and context in a single panel.",
    "instructions": "You are a concierge assistant that shares updates and quick links.",
    "quickLinks": [
      { "label": "Launch checklist", "url": "https://chat-widget.uft1.com/checklist", "description": "What to do before you go live." },
      { "label": "Partner gallery", "url": "https://chat-widget.uft1.com/partners", "description": "Integrations, proofs, and co-marketing resources." },
      { "label": "Support desk", "url": "https://chat-widget.uft1.com/support", "description": "Chat with the team or file a quick ticket." }
    ],
    "info": {
      "headline": "The right context keeps visitors moving",
      "summary": "Share stats, updates, and helpful copy before they send a message.",
      "stats": [
        { "label": "Automations ready", "value": "120+" },
        { "label": "Response time", "value": "Instant" },
        { "label": "Active sites", "value": "450+" }
      ]
    }
  }
}
</script>
<script src="https://chat-widget.uft1.com/v2/embed.js"></script>
```

Visit [`public/v2/index.html`](/Users/jovyllebermudez/fore/lab/chatbot-widget/public/v2/index.html) to preview the experience and see the snippet rendered automatically.

## Host-style examples

See [`public/examples/`](/Users/jovyllebermudez/fore/lab/chatbot-widget/public/examples) for host-inspired demos:

- `resort.html`: hospitality layout with spa links and guest stats.
- `agency.html`: creative agency layout with campaign guides and media kits.
- `marketplace.html`: marketplace layout with makers, drops, and support links.

## Project Notes

- `netlify dev` starts the static server on port `52873` and the functions sandbox on `3999`.
- The canonical widget script is `https://chat-widget.uft1.com/embed.js`.
- The advanced page now shows copy-paste snippets using the current host origin.

## Config Options

| Field | Type | Description |
| --- | --- | --- |
| `siteID` | `string` | Optional ID to track source. |
| `theme` | `string` | `"light"` or `"dark"`, or omit for host auto-detect. |
| `position` | `string` | `"bottom-right"`, `"bottom-left"`, `"top-right"`, `"top-left"`. |
| `instructions` | `string` | Prompt given to the GPT assistant. |
| `accentColor` | `string` | Hex color for the button and widget accents. |
| `title` | `string` | Label shown in the widget. |
| `tagline` | `string` | Optional line above the instructions. |
| `starterMessage` | `string` | Short prompt above starter suggestions. |
| `starterSuggestions` | `array` | Up to three quick prompts shown before the first message. |
| `quickLinks` | `array` | Optional `{ label, url, description }` links for the v2 widget. |
| `info` | `object` | Optional `{ headline, summary, stats }` context card for the v2 widget. |
| `variant` | `string` | Optional label for the widget flavor. |

## Live Demo

Visit [https://chat-widget.uft1.com](https://chat-widget.uft1.com) and click the bubble.

## Source

[`github.com/jovylle/chatbot-widget`](https://github.com/jovylle/chatbot-widget)
