# Development

## Prerequisites

- Node.js (for dependencies)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/)

```bash
npm install -g netlify-cli
```

## Setup

1. Clone the repository.
2. Copy environment template:

```bash
cp .env.sample .env
```

3. Add your OpenAI key to `.env`:

```
OPENAI_API_KEY=your-openai-api-key-here
```

Optional:

```
OPENAI_MODEL=gpt-4o-mini
```

4. Install dependencies:

```bash
npm install
```

## Local dev server

```bash
npm run dev
# or: netlify dev
```

- Static site: http://localhost:52873
- Functions sandbox: port `3999`
- Chat API: http://localhost:52873/.netlify/functions/chatbot

Test pages:

- http://localhost:52873/ — home demo
- http://localhost:52873/advanced/ — config generator
- http://localhost:52873/examples/resort.html — example embed

## Project layout

```
public/           # Static assets (published)
  embed.js        # Host-page embed loader
  widget.html     # Iframe chat UI
  docs/           # Copy of repo docs/ (served on live site)
  advanced/       # Config playground
  examples/       # Demo pages
docs/             # Source documentation (also copied to public/docs/)
netlify/
  functions/
    chatbot.js    # OpenAI proxy
netlify.toml      # Netlify config
```

When editing documentation, update files in `docs/` then copy to `public/docs/`:

```bash
cp -r docs public/docs
```

## Deploy

Push to the connected Netlify site, or deploy manually:

1. Set `OPENAI_API_KEY` (and optionally `OPENAI_MODEL`) in Netlify environment variables.
2. Publish directory: `public`
3. Functions directory: `netlify/functions`

Production URL: https://chat-widget.uft1.com

## Package for handoff

Create a zip excluding secrets and dependencies:

```bash
zip -r "chat-widget-$(date +%m%d%Y).zip" . \
  -x "node_modules/*" "node_modules/**" \
  -x "package-lock.json" \
  -x ".env" \
  -x "*.zip"
```

Includes `public/`, `netlify/`, `docs/`, and `README.md`.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Chat returns connection error locally | Ensure `netlify dev` is running and `.env` has `OPENAI_API_KEY` |
| Widget does not appear | Check browser console; confirm script URL matches dev server origin |
| CORS / function 404 | Functions only work through `netlify dev` or deployed Netlify site |
