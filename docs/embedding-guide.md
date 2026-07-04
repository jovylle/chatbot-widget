# Embedding guide

## Minimal embed

Load the widget with no configuration:

```html
<script src="https://chat-widget.uft1.com/embed.js"></script>
```

Local development:

```html
<script src="http://localhost:52873/embed.js"></script>
```

## Minimal with context

Add a JSON config block before the script for custom title and assistant instructions:

```html
<script type="application/json" id="chat-widget-config">
{
  "chatbot": {
    "title": "Chat",
    "instructions": "You are the assistant for Zen Slice, an Asian-style pizza shop in Makati City, Philippines."
  }
}
</script>
<script src="https://chat-widget.uft1.com/embed.js"></script>
```

## Full configuration

See [config reference](./config-reference.md) for all fields. Example with tabs, links, and info cards:

```html
<script type="application/json" id="chat-widget-config">
{
  "chatbot": {
    "siteID": "my-site",
    "theme": "dark",
    "position": "bottom-right",
    "accentColor": "#7c5dff",
    "title": "Chat Widget",
    "instructions": "You are a helpful assistant.",
    "quickLinks": [
      { "label": "Menu", "url": "https://example.com/menu", "description": "View all items." }
    ],
    "info": {
      "headline": "Welcome",
      "summary": "We are here to help.",
      "stats": [{ "label": "Hours", "value": "9AM–6PM" }]
    }
  }
}
</script>
<script src="https://chat-widget.uft1.com/embed.js"></script>
```

Use the [advanced setup page](https://chat-widget.uft1.com/advanced/) to generate snippets interactively.

## Host-page JavaScript API

After `embed.js` loads, control the widget programmatically:

```javascript
// Open the chat panel
window.ChatWidget.open();

// Close the chat panel
window.ChatWidget.close();

// Toggle open/closed
window.ChatWidget.toggle();

// Check if panel is open
window.ChatWidget.isOpen(); // boolean
```

Wire a custom button:

```html
<button onclick="window.ChatWidget?.open()">Chat with us</button>
```

## Auto-open on load

Set `autoOpen: true` in config to show the widget immediately:

```json
{
  "chatbot": {
    "autoOpen": true,
    "instructions": "You are a helpful assistant."
  }
}
```

## Page context

Set `includePageContext: true` so the assistant receives the host page URL and title with each request. Useful for site-wide assistants that should know which page the visitor is on.

## Theme behavior

- `"theme": "light"` or `"theme": "dark"` — force widget theme
- Omit `theme` — auto-detect from host page (`class="dark"`, `data-theme`, `prefers-color-scheme`)

## Legacy paths

Prefer canonical `/embed.js`. Legacy `/v1/embed.js` and `/v2/embed.js` still work and load the same script.

## Examples

Host-style demos live in `public/examples/`:

- [Resort](https://chat-widget.uft1.com/examples/resort.html)
- [Agency](https://chat-widget.uft1.com/examples/agency.html)
- [Marketplace](https://chat-widget.uft1.com/examples/marketplace.html)
