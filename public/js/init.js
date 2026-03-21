// Fonts loaded normally via <link> in <head>. GTM deferred to interaction.
(function () {
  // Fade-in root once React mounts (or immediately if pre-rendered)
  var root = document.getElementById('root');
  if (root) {
    if (root.children.length > 0) {
      root.style.opacity = '1';
    } else {
      var observer = new MutationObserver(function () {
        if (root.children.length > 0) {
          root.style.opacity = '1';
          observer.disconnect();
        }
      });
      observer.observe(root, { childList: true });
    }
  }

  // Deferred GTM: load only after first user interaction OR 5s timeout.
  // requestIdleCallback fires too early — browser is idle before LCP completes
  // on fast connections, so GTM ends up in the critical window.
  function loadGTM() {
    if (window._gtmLoaded) return;
    window._gtmLoaded = true;

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-CNQXQMRQ1V');

    var s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-CNQXQMRQ1V';
    s.async = true;
    document.head.appendChild(s);
  }

  // Fire on first interaction or after 5s, whichever comes first
  var interactionEvents = ['scroll', 'click', 'touchstart', 'keydown'];
  function onInteraction() {
    interactionEvents.forEach(function(e) {
      window.removeEventListener(e, onInteraction);
    });
    loadGTM();
  }
  interactionEvents.forEach(function(e) {
    window.addEventListener(e, onInteraction, { once: true, passive: true });
  });
  setTimeout(loadGTM, 5000);
})();
