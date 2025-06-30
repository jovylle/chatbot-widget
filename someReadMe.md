
### Netlify CLI Setup

To run the local dev server:

```bash
npm install -g netlify-cli
netlify dev
````


# 📦 ZIP Command

```bash
zip -r "chat-widget-$(date +%m%d%Y).zip" . \
  -x "node_modules/*" "node_modules/**" \
  -x "package-lock.json" \
  -x ".env" \
  -x "*.zip"
```

# 🧠 Notes

* Excludes sensitive files
* Include `public/`, `netlify/`, `README.md`
* Upload to Netlify or hand off to teammates
