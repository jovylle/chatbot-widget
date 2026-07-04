# chat-widget

Embed a GPT-powered chatbot into any site with one script tag.

**Live demo:** https://chat-widget.uft1.com

## Quick start

### Script only

```html
<script src="https://chat-widget.uft1.com/embed.js"></script>
```

Local dev:

```html
<script src="http://localhost:52873/embed.js"></script>
```

### With config

```html
<script type="application/json" id="chat-widget-config">
{
  "chatbot": {
    "title": "Chat",
    "instructions": "You are a helpful assistant for this website."
  }
}
</script>
<script src="https://chat-widget.uft1.com/embed.js"></script>
```

## Documentation

| Doc | Description |
|-----|-------------|
| [Architecture](docs/architecture.md) | System overview, components, message protocol |
| [Embedding guide](docs/embedding-guide.md) | Embed patterns, host JS API, auto-open |
| [Config reference](docs/config-reference.md) | All config fields |
| [Development](docs/development.md) | Local setup, deploy, troubleshooting |
| [Decisions](docs/decisions/README.md) | Architecture decision records |

## Pages

- [Home / demo](https://chat-widget.uft1.com/)
- [Advanced setup](https://chat-widget.uft1.com/advanced/) — interactive config generator
- [About](https://chat-widget.uft1.com/about/)
- [Examples](https://chat-widget.uft1.com/examples/resort.html) — resort, agency, marketplace demos

## Local development

```bash
cp .env.sample .env   # add OPENAI_API_KEY
npm install
npm run dev           # http://localhost:52873
```

See [docs/development.md](docs/development.md) for full setup.

## Source

[github.com/jovylle/chatbot-widget](https://github.com/jovylle/chatbot-widget)
