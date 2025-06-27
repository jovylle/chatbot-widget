
# 💬 chat-widget

Instantly embed a GPT-powered chatbot into any site.

## 🚀 How to Use

Paste this into your HTML:

```html
<script type="application/json" id="chat-config">
{
  "chatbot": {
    "siteID": "your-site-id",
    "theme": "light",
    "position": "bottom-right",
    "instructions": "You're a helpful assistant for this site."
  }
}
</script>
<script src="https://chat-widget.uft1.com/embed.js"></script>
````

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

---

📂 [View Source Code](https://github.com/jovylle/chat-widget)
