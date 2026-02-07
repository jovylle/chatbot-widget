(function () {
  const DEFAULT_QUICK_LINKS = [
    { label: "Launch checklist", url: "https://chat-widget.uft1.com/checklist", description: "Step-by-step items to review before going live.", category: "Checklist" },
    { label: "Support hub", url: "https://chat-widget.uft1.com/support", description: "Contact the team, share logs, or request a feature.", category: "Help" },
    { label: "Partner tools", url: "https://chat-widget.uft1.com/partners", description: "Integrations, docs, and co-marketing resources in one place.", category: "Resources" }
  ];

  const DEFAULT_INFO = {
    headline: "Share context that matters",
    summary: "Drop links, updates, or quick stats so visitors learn what’s new while chatting.",
    stats: [
      { label: "Automations ready", value: "120+" },
      { label: "Response time", value: "Instant" },
      { label: "Active sites", value: "450+" }
    ]
  };

  const DEFAULT_CONFIG = {
    chatbot: {
      instructions: "You're a helpful assistant that can walk visitors through product updates.",
      siteID: "demo",
      theme: "light",
      position: "bottom-right",
      accentColor: "#3f51b5",
      variant: "v2",
      tagline: "Details, quick links, and the chatbot in one panel.",
      quickLinks: DEFAULT_QUICK_LINKS,
      info: DEFAULT_INFO
    }
  };

  const CONFIG_IDS = [
    'chat-config-advanced-v2',
    'chat-config-advanced',
    'chat-config'
  ];
  let configScript = null;

  for (const id of CONFIG_IDS) {
    configScript = document.getElementById(id);
    if (configScript) break;
  }

  let config = DEFAULT_CONFIG;
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
      console.error("Failed to parse chat-config for embed-extended-v2:", error);
    }
  } else {
    console.warn("No config script found for embed-extended-v2; using defaults.");
  }

  const botConfig = config.chatbot || {};
  const instructions = botConfig.instructions || DEFAULT_CONFIG.chatbot.instructions;
  const siteID = botConfig.siteID || DEFAULT_CONFIG.chatbot.siteID;
  const theme = botConfig.theme || DEFAULT_CONFIG.chatbot.theme;
  const position = botConfig.position || DEFAULT_CONFIG.chatbot.position;
  const accentColor = botConfig.accentColor || DEFAULT_CONFIG.chatbot.accentColor;
  const quickLinks = Array.isArray(botConfig.quickLinks) && botConfig.quickLinks.length
    ? botConfig.quickLinks
    : DEFAULT_QUICK_LINKS;
  const info = typeof botConfig.info === 'object' && botConfig.info !== null
    ? botConfig.info
    : DEFAULT_INFO;
  const variant = botConfig.variant || DEFAULT_CONFIG.chatbot.variant;
  const tagline = botConfig.tagline || DEFAULT_CONFIG.chatbot.tagline;

  const isBottom = position.includes('bottom');
  const isRight = position.includes('right');

  const buttonOffset = `
    ${isBottom ? 'bottom' : 'top'}: 24px;
    ${isRight ? 'right' : 'left'}: 24px;
  `;

  const button = document.createElement('div');
  button.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 5v4l3-3-3-3zm0 14v-4l3 3-3 3zM5 12h4l-3 3 3 3 3-3h4" />
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
    : new URL('/embed-extended-v2.js', window.location.origin);
  const baseUrl = scriptUrl.origin + scriptUrl.pathname.replace(/\/[^\/]+$/, '');
  iframe.src = `${baseUrl}/widget-advanced-v2.html?siteID=${encodeURIComponent(siteID)}&theme=${theme}`;
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
        tagline
      }
    }, '*');
  };

  window.addEventListener('message', (event) => {
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
  });

  if (window.location.hostname.includes('localhost')) {
    console.log('💬 extended chat v2 config loaded:', { siteID, theme, position, instructions });
  }
})();
