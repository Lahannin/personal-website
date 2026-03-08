// Font swap: switch from print to all once loaded
var fontLink = document.getElementById('font-stylesheet');
if (fontLink) {
  if (fontLink.sheet) {
    fontLink.media = 'all';
  } else {
    fontLink.addEventListener('load', function () {
      this.media = 'all';
    });
  }
}

// Fade-in root once React mounts
var root = document.getElementById('root');
if (root) {
  var observer = new MutationObserver(function () {
    if (root.children.length > 0) {
      root.style.opacity = '1';
      observer.disconnect();
    }
  });
  observer.observe(root, { childList: true });
}
