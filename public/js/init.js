// Font swap is now handled by onload="this.media='all'" on the link tag itself.
// This fires earlier than waiting for init.js to execute.
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

  // Font swap: swap media from print to all as soon as the CSS file loads.
  // Using addEventListener instead of onload attribute for CSP compliance.
  var fontLink = document.getElementById('font-stylesheet');
  if (fontLink) {
    if (fontLink.sheet) {
      fontLink.media = 'all';
    } else {
      fontLink.addEventListener('load', function () { this.media = 'all'; });
      // Fallback in case load event was missed
      setTimeout(function () {
        if (fontLink.media === 'print') fontLink.media = 'all';
      }, 3000);
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
