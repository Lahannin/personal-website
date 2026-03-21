// Font swap: switch from print to all once loaded
(function () {
  var fontLink = document.getElementById('font-stylesheet');
  if (fontLink) {
    // If already loaded (sheet exists), swap immediately
    // Note: cssRules is not accessible on cross-origin sheets, so just check .sheet
    if (fontLink.sheet) {
      fontLink.media = 'all';
    } else {
      fontLink.addEventListener('load', function () {
        this.media = 'all';
      });
      // Fallback: check again after a delay in case load event was missed
      setTimeout(function () {
        if (fontLink.media === 'print') fontLink.media = 'all';
      }, 3000);
    }
  }

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

  // Deferred GTM: load after page is interactive to keep it off the critical path.
  // This saves ~128 KiB from blocking FCP/LCP and ~52 KiB unused JS.
  function loadGTM() {
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-CNQXQMRQ1V');

    var s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-CNQXQMRQ1V';
    s.async = true;
    document.head.appendChild(s);
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadGTM, { timeout: 3500 });
  } else {
    setTimeout(loadGTM, 3500);
  }
})();
