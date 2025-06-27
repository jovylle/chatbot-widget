(function () {
  // 1. Parse config JSON from the embedding site
  const configScript = document.getElementById('chat-config');
  let config = {
    instructions: 'You are a helpful assistant.',
    siteID: 'default',
    theme: 'light'
  };

  if (configScript && configScript.textContent) {
    try {
      config = { ...config, ...JSON.parse(configScript.textContent) };
    } catch (e) {
      console.error('Invalid JSON in #chat-config', e);
    }
  }

  // 2. Create floating chat button
  const button = document.createElement('div');
  button.innerHTML = '💬';
  button.style = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    background: #111;
    color: #fff;
    font-size: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 9999;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  `;
  document.body.appendChild(button);

  // 3. Create floating wrapper for iframe
  const wrapper = document.createElement('div');
  wrapper.style = `
    position: fixed;
    bottom: 84px;
    right: 24px;
    width: 360px;
    height: 480px;
    display: none;
    z-index: 9998;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  `;

  // 4. Create iframe
  const iframe = document.createElement('iframe');
  iframe.src = `https://your-site.netlify.app/widget.html?siteID=${encodeURIComponent(config.siteID)}&theme=${config.theme}`;
  iframe.style = `
    width: 100%;
    height: 100%;
    border: none;
  `;

  wrapper.appendChild(iframe);
  document.body.appendChild(wrapper);

  // 5. Toggle visibility on button click
  let open = false;
  button.onclick = () => {
    open = !open;
    wrapper.style.display = open ? 'block' : 'none';
  };

  // 6. Optional: pass instructions via postMessage
  iframe.onload = () => {
    iframe.contentWindow.postMessage({
      type: 'chat-config',
      payload: {
        instructions: config.instructions,
        siteID: config.siteID,
        theme: config.theme
      }
    }, '*');
  };
})();
