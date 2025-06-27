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


  const position = config.position || 'bottom-right'; // default

  const isBottom = position.includes('bottom');
  const isRight = position.includes('right');

  const buttonOffset = `
  ${isBottom ? 'bottom' : 'top'}: 24px;
  ${isRight ? 'right' : 'left'}: 24px;
`;


  // 2. Create floating chat button
  const button = document.createElement('div');
  button.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  `;
  button.style = `
  ${buttonOffset}
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9999;
  transition: box-shadow 0.2s;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

  button.onmouseenter = () => {
    button.style.boxShadow = '0 0 6px rgba(0,0,0,0.15)';
  };
  button.onmouseleave = () => {
    button.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
  };

  document.body.appendChild(button);



  const wrapperOffset = `
    ${isBottom ? 'bottom' : 'top'}: 84px;
    ${isRight ? 'right' : 'left'}: 24px;
  `;
  // 3. Create floating wrapper for iframe
  const wrapper = document.createElement('div');
  wrapper.style = `
    position: fixed;
    ${wrapperOffset}
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

  const origin = window.location.origin;

  iframe.src = `${origin}/widget.html?siteID=${encodeURIComponent(config.siteID)}&theme=${config.theme}`;

  // iframe.src = `https://your-site.netlify.app/widget.html?siteID=${encodeURIComponent(config.siteID)}&theme=${config.theme}`;
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
