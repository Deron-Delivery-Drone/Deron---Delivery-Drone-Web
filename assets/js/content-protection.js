(function () {
  if (window.__DERON_CONTENT_PROTECTION__) return;
  window.__DERON_CONTENT_PROTECTION__ = true;

  var allowSelector = 'input, textarea, select, option, [contenteditable="true"], .allow-copy';

  function isAllowedTarget(target) {
    return target && target.closest && target.closest(allowSelector);
  }

  function blockEvent(event) {
    if (isAllowedTarget(event.target)) return;
    event.preventDefault();
    return false;
  }

  ['contextmenu', 'copy', 'cut', 'selectstart', 'dragstart'].forEach(function (eventName) {
    document.addEventListener(eventName, blockEvent, true);
  });

  document.addEventListener('keydown', function (event) {
    if (isAllowedTarget(event.target)) return;

    var key = String(event.key || '').toLowerCase();
    var mod = event.ctrlKey || event.metaKey;
    var blockedCombo = mod && ['a', 'c', 'x', 's', 'u', 'p'].indexOf(key) !== -1;
    var blockedDevToolsCombo = mod && event.shiftKey && ['i', 'j', 'c'].indexOf(key) !== -1;

    if (key === 'f12' || blockedCombo || blockedDevToolsCombo) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);

  function hardenMedia() {
    document.querySelectorAll('img, video, canvas').forEach(function (node) {
      node.setAttribute('draggable', 'false');
    });
  }

  var style = document.createElement('style');
  style.textContent = [
    'body, body *:not(input):not(textarea):not(select):not(option):not([contenteditable="true"]):not(.allow-copy) {',
    '  -webkit-user-select: none;',
    '  -moz-user-select: none;',
    '  -ms-user-select: none;',
    '  user-select: none;',
    '}',
    'img, video, canvas {',
    '  -webkit-user-drag: none;',
    '  user-drag: none;',
    '}'
  ].join('\n');

  if (document.head) document.head.appendChild(style);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hardenMedia);
  } else {
    hardenMedia();
  }
})();
