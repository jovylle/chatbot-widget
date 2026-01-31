
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

## 🧪 Live Demo

Visit: [https://chat-widget.uft1.com](https://chat-widget.uft1.com)

This page has the chatbot running — click the bubble.

## ⚙️ Config Options

| Field          | Type     | Description                                                              |
| -------------- | -------- | ------------------------------------------------------------------------ |
| `siteID`       | `string` | Optional ID to track source                                              |
| `theme`        | `string` | `"light"` (default) or `"dark"`                                          |
| `position`     | `string` | `"bottom-right"` (default), `"bottom-left"`, `"top-right"`, `"top-left"` |
| `instructions` | `string` | Prompt given to the GPT assistant                                        |

📂 [View Source Code](https://github.com/jovylle/chatbot-widget)
