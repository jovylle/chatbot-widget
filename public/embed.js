/**
 * Extended v2 embed
 *
 * Minimal usage:
 *
 * <script type="application/json" id="chat-widget-config">
 * {
 *   "chatbot": {
 *     "instructions": "A concierge assistant that keeps visitors informed and links them to helpful places."
 *   }
 * }
 * </script>
 * <script src="/embed.js"></script>
 *
 * Config reference:
 * - siteID (string): Optional identifier for tracking or reporting.
 * - theme (string): "light" (default) or "dark".
 * - position (string): "bottom-right" (default), "bottom-left", "top-right", "top-left".
 * - accentColor (string): Hex color for borders, pills, and the floating button accent.
 * - variant (string): Any label that describes the widget flavor (e.g. "pro", "agency").
 * - title (string): Label shown on the chat tab and page title inside the widget.
 * - tagline (string): Header line that sits above the instructions text.
 * - starterMessage (string): Short prompt shown above the starter suggestions.
 * - starterSuggestions (array): Up to three quick prompts shown before the first message.
 * - instructions (string): Core system prompt for the GPT assistant.
 * - quickLinks (array): Each entry { label, url, description } to surface CTAs inside the widget.
 * - info (object): { headline, summary, stats: [{ label, value }] } to show context cards underneath the links.
 * - autoOpen (boolean): When true, opens the widget immediately after load.
 *
 * This script renders the floating button and iframe, then posts `chat-config-v2` with
 * the sanitized payload to `public/widget.html`.
 */
(function () {
  const BUTTON_ID = 'chat-widget-floating-button';
  const WRAPPER_ID = 'chat-widget-floating-wrapper';
  const EXPAND_HANDLER_KEY = '__chatWidgetExpandHandler';

  document.getElementById(BUTTON_ID)?.remove();
  document.getElementById(WRAPPER_ID)?.remove();
  if (window[EXPAND_HANDLER_KEY]) {
    window.removeEventListener('message', window[EXPAND_HANDLER_KEY]);
    delete window[EXPAND_HANDLER_KEY];
  }

  const DEFAULT_QUICK_LINKS = [];
  const DEFAULT_INFO = null;
  const DEFAULT_STARTER_SUGGESTIONS = [
    'What can you help with?',
    'How to lose weight?',
  ];

  const DEFAULT_CONFIG = {
    chatbot: {
      instructions: "You're a helpful assistant that can walk visitors through product updates.",
      siteID: "demo",
      theme: "light",
      position: "bottom-right",
      accentColor: "#3f51b5",
      variant: "v2",
      title: "Chat Widget",
      tagline: "Details, quick links, and the chatbot in one panel.",
      starterMessage: 'Choose one to get started.',
      starterSuggestions: DEFAULT_STARTER_SUGGESTIONS,
      quickLinks: DEFAULT_QUICK_LINKS,
      info: DEFAULT_INFO
    }
  };

  const CONFIG_IDS = [
    'chat-widget-config',
    'chat-config-advanced-v2',
    'chat-config-advanced',
    'chat-config'
  ];
  let configScript = null;

  for (const id of CONFIG_IDS) {
    configScript = document.getElementById(id);
    if (configScript) break;
  }

  let config = { chatbot: {} };
  if (configScript) {
    try {
      const raw = configScript.textContent || configScript.innerText || '';
      const parsed = JSON.parse(raw);
      if (parsed.chatbot) {
        config = parsed;
      } else {
        console.warn("chat-config JSON missing 'chatbot'. Using defaults.");
      }
    } catch (error) {
      console.error("Failed to parse chat-config for v2 embed:", error);
    }
  }

  const detectHostTheme = () => {
    const html = document.documentElement;
    const body = document.body;
    const selectors = [
      html,
      body
    ];

    for (const node of selectors) {
      if (!node) continue;
      const classText = (node.className || '').toString().toLowerCase();
      const dataTheme = (node.getAttribute('data-theme') || '').toLowerCase();
      const colorScheme = (node.getAttribute('data-color-scheme') || '').toLowerCase();
      if (classText.includes('dark') || dataTheme === 'dark' || colorScheme === 'dark') return 'dark';
      if (classText.includes('light') || dataTheme === 'light' || colorScheme === 'light') return 'light';
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return DEFAULT_CONFIG.chatbot.theme;
  };

  const botConfig = config.chatbot || {};
  const instructions = botConfig.instructions || DEFAULT_CONFIG.chatbot.instructions;
  const siteID = botConfig.siteID || DEFAULT_CONFIG.chatbot.siteID;
  const rawTheme = typeof botConfig.theme === 'string' ? botConfig.theme.toLowerCase().trim() : '';
  const theme = rawTheme === 'dark' || rawTheme === 'light' ? rawTheme : detectHostTheme();
  const position = botConfig.position || DEFAULT_CONFIG.chatbot.position;
  const accentColor = botConfig.accentColor || DEFAULT_CONFIG.chatbot.accentColor;
  const quickLinks = Array.isArray(botConfig.quickLinks) ? botConfig.quickLinks : DEFAULT_QUICK_LINKS;
  const info = typeof botConfig.info === 'object' && botConfig.info !== null ? botConfig.info : DEFAULT_INFO;
  const variant = botConfig.variant || DEFAULT_CONFIG.chatbot.variant;
  const title = typeof botConfig.title === 'string' ? botConfig.title : DEFAULT_CONFIG.chatbot.title;
  const tagline = botConfig.tagline || DEFAULT_CONFIG.chatbot.tagline;
  const starterMessage = typeof botConfig.starterMessage === 'string'
    ? botConfig.starterMessage
    : DEFAULT_CONFIG.chatbot.starterMessage;
  const starterSuggestions = Array.isArray(botConfig.starterSuggestions)
    ? botConfig.starterSuggestions.slice(0, 3)
    : DEFAULT_CONFIG.chatbot.starterSuggestions;

  const isBottom = position.includes('bottom');
  const isRight = position.includes('right');

  const buttonOffset = `
    ${isBottom ? 'bottom' : 'top'}: 24px;
    ${isRight ? 'right' : 'left'}: 24px;
  `;

  const button = document.createElement('div');
  button.id = BUTTON_ID;
  button.innerHTML = `
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: scaleX(-1); transform-origin: 50% 50%;">
      <path d="M12 4.5c-4.42 0-8 2.98-8 6.67 0 2.18 1.25 4.1 3.19 5.31L7 20l3.12-1.75c.91.18 1.46.26 1.88.26 4.42 0 8-2.98 8-6.67S16.42 4.5 12 4.5z" />
      <circle cx="9.5" cy="11.2" r="0.8" fill="#555" stroke="none" />
      <circle cx="12" cy="11.2" r="0.8" fill="#555" stroke="none" />
      <circle cx="14.5" cy="11.2" r="0.8" fill="#555" stroke="none" />
    </svg>
  `;
  button.style = `
    ${buttonOffset}
    position: fixed;
    width: 50px;
    height: 50px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10000;
    box-shadow: 0 6px 18px rgba(0,0,0,0.2);
    transition: transform 0.2s;
  `;
  button.onmouseenter = () => button.style.transform = 'translateY(-1px)';
  button.onmouseleave = () => button.style.transform = '';
  button.setAttribute('aria-label', 'Toggle extended chat widget');
  document.body.appendChild(button);

  const wrapper = document.createElement('div');
  wrapper.id = WRAPPER_ID;
  wrapper.style.cssText = `
    position: fixed;
    z-index: 9999;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 12px 40px rgba(0,0,0,0.35);
    transition: all 0.35s ease;
    background: #fff;
    min-width: 340px;
    max-width: 100vw;
    max-height: 100vh;
    display: none;
    flex-direction: column;
  `;
  wrapper.style.display = 'none';

  const content = document.createElement('div');
  content.style = 'position:relative; flex:1; min-height:0;';

  const iframe = document.createElement('iframe');
  const thisScript = document.currentScript
    || Array.from(document.getElementsByTagName('script'))
      .find(s => s.src && s.src.match(/\/embed(?:-extended)?(?:-v2)?\.js(\?.*)?$/));
  const scriptUrl = thisScript
    ? new URL(thisScript.src, window.location.href)
    : new URL('/embed.js', window.location.origin);
  const baseUrl = scriptUrl.origin + scriptUrl.pathname.replace(/\/[^\/]+$/, '');
  iframe.src = `${baseUrl}/widget.html?siteID=${encodeURIComponent(siteID)}&theme=${theme}`;
  iframe.style = 'width:100%; height:100%; border:none; display:block;';
  content.appendChild(iframe);

  wrapper.appendChild(content);
  document.body.appendChild(wrapper);

  let open = false;
  let expanded = false;

  const setStandardPosition = () => {
    wrapper.style.width = '440px';
    wrapper.style.height = '560px';
    wrapper.style.borderRadius = '18px';
    wrapper.style.top = isBottom ? 'auto' : '84px';
    wrapper.style.bottom = isBottom ? '84px' : 'auto';
    wrapper.style.left = isRight ? 'auto' : '24px';
    wrapper.style.right = isRight ? '24px' : 'auto';
  };

  const setExpandedPosition = () => {
    wrapper.style.top = '0';
    wrapper.style.bottom = '0';
    wrapper.style.left = '0';
    wrapper.style.right = '0';
    wrapper.style.width = '100vw';
    wrapper.style.height = '100vh';
    wrapper.style.borderRadius = '0';
  };

  const updateExpandedState = () => {
    if (expanded) {
      setExpandedPosition();
    } else {
      setStandardPosition();
    }
    iframe.contentWindow?.postMessage({ type: 'chat-advanced-expand-state', payload: { expanded } }, '*');
  };

  setStandardPosition();

  button.onclick = () => {
    open = !open;
    wrapper.style.display = open ? 'flex' : 'none';
    if (open) {
      iframe.contentWindow?.postMessage({ type: 'chat-focus-input' }, '*');
    }
    if (!open && expanded) {
      expanded = false;
      updateExpandedState();
    }
  };

  iframe.onload = () => {
    sendConfig();
    updateExpandedState();
  };

  const sendConfig = () => {
    iframe.contentWindow?.postMessage({
      type: 'chat-config-v2',
      payload: {
        siteID,
        theme,
        position,
        instructions,
        accentColor,
        quickLinks,
        info,
        variant,
        tagline,
        title,
        starterMessage,
        starterSuggestions
      }
    }, '*');
  };

  const handleExpandMessage = (event) => {
    const data = event.data || {};
    if (data.type === 'chat-advanced-v2-expand') {
      const next = !!data.payload?.expanded;
      if (expanded !== next) {
        expanded = next;
        updateExpandedState();
        if (!expanded && !open) {
          wrapper.style.display = 'none';
        } else if (!open) {
          open = true;
          wrapper.style.display = 'flex';
        }
      }
    }
  };
  window[EXPAND_HANDLER_KEY] = handleExpandMessage;
  window.addEventListener('message', handleExpandMessage);

  if (window.location.hostname.includes('localhost')) {
    console.log('💬 extended chat v2 config loaded:', { siteID, theme, position, instructions, title });
  }
})();
