/* Backward-compatible loader for legacy /v1/embed.js */
(function () {
  const script = document.createElement('script');
  script.src = '/embed.js';
  script.async = false;
  document.head.appendChild(script);
})();
