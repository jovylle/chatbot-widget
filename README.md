
# 💬 chat-widget

Instantly embed a GPT-powered chatbot into any site.

## 🚀 How to Use

Basic config:

```html
<script type="application/json" id="chat-config">
{
  "chatbot": {
    "theme": "light",
    "instructions": "You're a helpful assistant for this site."
  }
}
</script>
<script src="https://chat-widget.uft1.com/embed.js"></script>
````

Optional config with `siteID` and `position`:

```html
<script type="application/json" id="chat-widget-config-001">
{
  "chatbot": {
    "instructions": "You're a helpful assistant for this site."
  }
}
</script>
<script src="https://chat-widget.uft1.com/embed.js"></script>

```

## ✨ Advanced widget

If you want the tabbed interface with notifications and a full-page expand toggle, add a second config block and reference the extended embed bundle.

```html
<script type="application/json" id="chat-config-advanced">
{
  "chatbot": {
    "theme": "dark",
    "instructions": "You are an advanced assistant that keeps the site visitors informed."
  }
}
</script>
<script src="https://chat-widget.uft1.com/embed-extended.js"></script>
```

The advanced widget points to `widget-advanced.html`, which exposes the `Chat`, `About`, and `Notifications` tabs plus the “Full page” button inside the widget.

## ✨ Extended widget v2

Need more than chat? The v2 bundle introduces a brand new `embed-extended-v2.js` that targets `widget-advanced-v2.html`. It keeps the chat core but adds:

- a header with a tagline and instructions
- multi-tab layout (`Chat`, `Quick links`, `Host info`)
- curated quick links and host stats that you pass via the config
- an accent color, variant label, and full-page toggle for partners

Drop this snippet to run the new experience (the same one powering `public/extended-v2.html`):

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
<script src="https://chat-widget.uft1.com/embed-extended-v2.js"></script>
```

Visit `public/extended-v2.html` to preview the experience, see the snippet rendered automatically, and read quick tips for customizing the links and host info for each site.

## 🏠 Host-style examples

Want to see how actual landing pages might embed the new experience? Check `public/examples/` for host-inspired demos:

- `resort.html`: a warm hospitality landing page with spa links and guest stats.
- `agency.html`: a creative agency desk that surfaces campaign guides and media kits.
- `marketplace.html`: a premium marketplace flow that highlights makers, drops, and support links.

Each page includes its own `chat-config-advanced-v2` block and loads `embed-extended-v2.js` via a relative path so you can inspect how the quick links, info cards, and accent color change per host.

## 🧪 Live Demo

Visit: [https://chat-widget.uft1.com](https://chat-widget.uft1.com)

This page has the chatbot running — click the bubble.

## 🎯 Project Goals

- Keep the core chatbot widget lean, reliable, and helpful to site visitors while hosting the GPT service ourselves.
- Build a richer experience around that widget with a new extended bundle (think “version 2” or a separate embed file) so we can add new tabs, show quick links, surface more information, and let each host site customize the experience.
- Give visitors control over the layout (maximize/full-page mode) and lets partners tweak the look, tabs, and extra content without touching the original `embed.js`.

## ⚙️ Config Options

| Field          | Type     | Description                                                              |
| -------------- | -------- | ------------------------------------------------------------------------ |
| `siteID`       | `string` | Optional ID to track source                                              |
| `theme`        | `string` | `"light"` (default) or `"dark"`                                          |
| `position`     | `string` | `"bottom-right"` (default), `"bottom-left"`, `"top-right"`, `"top-left"` |
| `instructions` | `string` | Prompt given to the GPT assistant                                        |

### Optional v1 extras

`embed.js` also accepts a few extra fields so you can polish the floating trigger and add nicer controls without touching the widget:

| Field          | Type      | Description |
|----------------|-----------|-------------|
| `accentColor`  | `string`  | Hex color for the button border, tooltip, and header gradient (defaults to `#3f51b5`). |
| `buttonLabel`  | `string`  | Tiny label under the icon (`Chat` by default). |
| `tooltipText`  | `string`  | Hover text shown above the button (`Ask anything` by default). |
| `widgetTitle`  | `string`  | Title placed inside the header above the iframe (`Chat with us`). |
| `autoOpen`     | `boolean` | If `true`, the widget opens automatically after loading (defaults to `false`). |
| `closeOnBlur`  | `boolean` | When `true`, clicking outside the panel or pressing `Esc` closes it (defaults to `true`). |

These additions also include a pulsing status dot, hovered tooltip, and a close button inside the header so the experience feels a little more like a concierge tool.

📂 [View Source Code](https://github.com/jovylle/chatbot-widget)
