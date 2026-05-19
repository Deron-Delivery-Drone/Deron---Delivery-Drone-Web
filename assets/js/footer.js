/**
 * Deron unified site footer.
 * Auto-mounts into any element matching [data-deron-footer].
 *
 * Attributes:
 *   data-deron-footer       : presence marks the mount point (value ignored)
 *   data-back-home="true"   : render the "← Trang chủ" button row below footer-bottom
 *
 * Rendering mode is auto-detected:
 *   - SPA mode  (index.html)  : detected via window.navigate, uses navigate('about') etc.
 *   - Static mode (other pages): uses /#anchor links to land on index.html sections.
 */
(function () {
  'use strict';

  function isSPA() {
    return typeof window.navigate === 'function';
  }

  function navLink(anchor, i18nKey, label) {
    if (isSPA()) {
      return '<span class="footer-link" data-i18n="' + i18nKey + '" onclick="navigate(\'' + anchor + '\')">' + label + '</span>';
    }
    return '<a class="footer-link" href="/#' + anchor + '" data-i18n="' + i18nKey + '">' + label + '</a>';
  }

  function blogLink() {
    if (isSPA()) {
      return '<span class="footer-link" data-i18n="footer.l_blog" onclick="window.location.href=\'/blog/\'">Blog</span>';
    }
    return '<a class="footer-link" href="/blog/" data-i18n="footer.l_blog">Blog</a>';
  }

  function logoMarkup() {
    var inner =
      '<img src="/public/Deron-logo-dark.png" alt="Deron logo" class="footer-logo-img footer-logo-dark" loading="lazy" decoding="async">' +
      '<img src="/public/Deron-logo-light.png" alt="Deron logo" class="footer-logo-img footer-logo-light" loading="lazy" decoding="async">' +
      '<span>DERON</span>';
    if (isSPA()) {
      return '<div class="footer-logo" onclick="navigate(\'home\')" style="cursor:pointer;">' + inner + '</div>';
    }
    return '<a href="/" class="footer-logo">' + inner + '</a>';
  }

  function backHomeMarkup() {
    if (isSPA()) {
      return '<button type="button" class="btn btn-outline footer-back-btn" onclick="navigate(\'home\')" data-i18n="nav.backHome">← Trang chủ</button>';
    }
    return '<a class="btn btn-outline footer-back-btn" href="/" data-i18n="nav.backHome">← Trang chủ</a>';
  }

  function renderFooter(opts) {
    opts = opts || {};
    var showBackHome = !!opts.backHome;

    var html = '' +
      '<footer class="footer site-footer">' +
        '<div class="footer-inner">' +
          '<div class="footer-top">' +
            '<div class="footer-brand">' +
              logoMarkup() +
              '<p class="footer-brand-desc" data-i18n="footer.desc">Xây dựng lớp hạ tầng logistics tầm thấp đầu tiên của Việt Nam — cho y tế, cứu trợ, và tương lai.</p>' +
              '<div class="footer-tagline" data-i18n="footer.tagline">Made in Vietnam · Built for Vietnam</div>' +
            '</div>' +
            '<div>' +
              '<div class="footer-col-title" data-i18n="footer.col1">Sứ mệnh</div>' +
              '<div class="footer-links">' +
                navLink('about', 'footer.l1', 'Về chúng tôi') +
                navLink('about', 'footer.l2', 'Giá trị cốt lõi') +
                navLink('about', 'footer.l3', 'Lộ trình') +
              '</div>' +
            '</div>' +
            '<div>' +
              '<div class="footer-col-title" data-i18n="footer.col2">Sản phẩm</div>' +
              '<div class="footer-links">' +
                navLink('technology', 'footer.l4', 'Công nghệ') +
                navLink('usecases', 'footer.l5', 'Ứng dụng') +
                navLink('technology', 'footer.l6', 'Triết lý an toàn') +
                navLink('usecases', 'footer.l10', 'Deron Agriculture') +
                '<a href="https://datcs.deron.vn" target="_blank" rel="noopener" class="footer-link" data-i18n="footer.l11">DATCS</a>' +
              '</div>' +
            '</div>' +
            '<div>' +
              '<div class="footer-col-title" data-i18n="footer.col_info">Thông tin</div>' +
              '<div class="footer-links">' +
                blogLink() +
              '</div>' +
            '</div>' +
            '<div>' +
              '<div class="footer-col-title" data-i18n="footer.col3">Đầu tư</div>' +
              '<div class="footer-links">' +
                navLink('investor', 'footer.l7', 'Nhà đầu tư') +
                '<a class="footer-link" data-i18n="footer.l8" href="/public/Deron_Pitch.pdf" target="_blank" rel="noopener">Tải Pitch Deck</a>' +
                navLink('investor', 'footer.l9', 'Lộ trình vốn') +
              '</div>' +
            '</div>' +
            '<div>' +
              '<div class="footer-col-title" data-i18n="footer.col4">Liên hệ</div>' +
              '<div class="footer-links">' +
                '<a class="footer-link" href="mailto:ceo.deron@gmail.com">ceo.deron@gmail.com</a>' +
                '<a class="footer-link" href="tel:0363045747">0363 045 747</a>' +
                '<span class="footer-link">deron.vn</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="footer-bottom">' +
            '<div class="footer-copy" data-i18n="footer.copy">© 2025–2026 Deron. Delivering Vietnam\'s future.</div>' +
            '<div class="footer-copy" data-i18n="footer.founder">Founder: Nguyễn Phúc Huy</div>' +
            '<div class="footer-location" data-i18n="footer.location">Ho Chi Minh City · Vietnam</div>' +
          '</div>' +
          (showBackHome ? '<div class="footer-back-home">' + backHomeMarkup() + '</div>' : '') +
        '</div>' +
      '</footer>';

    return html;
  }

  function mount() {
    var mounts = document.querySelectorAll('[data-deron-footer]');
    if (!mounts.length) return;
    mounts.forEach(function (el) {
      var backHome = el.getAttribute('data-back-home') === 'true';
      var wrap = document.createElement('div');
      wrap.innerHTML = renderFooter({ backHome: backHome });
      var footerEl = wrap.firstElementChild;
      el.replaceWith(footerEl);
    });
    var lang = 'vi';
    try {
      var stored = localStorage.getItem('deron_lang');
      if (stored && ['vi', 'en', 'zh'].indexOf(stored) !== -1) lang = stored;
    } catch (e) {}
    if (typeof window.applyDeronTranslations === 'function') {
      try { window.applyDeronTranslations(lang); } catch (e) {}
    } else if (typeof window.applyTranslations === 'function') {
      try { window.applyTranslations(lang); } catch (e) {}
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  window.DeronFooter = { renderFooter: renderFooter, mount: mount };
})();
