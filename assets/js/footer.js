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

  function scoutLink() {
    if (isSPA()) {
      return '<span class="footer-link" data-i18n="footer.l12" onclick="window.location.href=\'/deron-scout/\'">Deron Scout</span>';
    }
    return '<a class="footer-link" href="/deron-scout/" data-i18n="footer.l12">Deron Scout</a>';
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

  function socialMarkup() {
    var rowStyle = 'display:flex;flex-direction:row;flex-wrap:nowrap;align-items:center;justify-content:flex-end;gap:clamp(10px,1.2vw,18px);margin:clamp(-44px,-3.5vw,-12px) 0 clamp(22px,3vw,34px);width:100%;max-width:100%;overflow:hidden;';
    var linkStyle = 'display:inline-flex;align-items:center;justify-content:center;line-height:0;flex:0 0 auto;';
    var imgStyle = 'height:clamp(34px,3.2vw,64px);width:auto;max-width:clamp(150px,16vw,300px);display:block;border-radius:8px;object-fit:contain;';
    var iconImgStyle = 'height:clamp(34px,3.2vw,64px);width:clamp(34px,3.2vw,64px);display:block;border-radius:10px;object-fit:contain;';
    var zaloStyle = 'height:clamp(34px,3.2vw,64px);width:clamp(34px,3.2vw,64px);display:block;border-radius:12px;object-fit:contain;background:#fff;padding:clamp(4px,.45vw,7px);box-sizing:border-box;';
    return '' +
      '<div class="footer-social" aria-label="Kết nối với Deron" style="' + rowStyle + '">' +
        '<a class="footer-social-link" style="' + linkStyle + '" href="https://unikorn.vn/p/deron" target="_blank" rel="noopener" aria-label="Unikorn">' +
          '<img src="/public/Unikorn.webp" alt="Unikorn" loading="lazy" decoding="async" style="' + iconImgStyle + '">' +
        '</a>' +
        '<a class="footer-social-link" style="' + linkStyle + '" href="https://www.facebook.com/profile.php?id=61583590713232" target="_blank" rel="noopener" aria-label="Facebook">' +
          '<img src="/public/find-us-on-facebook.svg" alt="Find us on Facebook" loading="lazy" decoding="async" style="' + imgStyle + '">' +
        '</a>' +
        '<a class="footer-social-link" style="' + linkStyle + '" href="http://zaloapp.com/qr/p/fd908iz06f5z" target="_blank" rel="noopener" aria-label="Zalo">' +
          '<img class="footer-zalo-logo" src="/public/zalo-1.svg" alt="Zalo" loading="lazy" decoding="async" style="' + zaloStyle + '">' +
        '</a>' +
        '<a class="footer-social-link" style="' + linkStyle + '" href="https://www.linkedin.com/in/nguy%E1%BB%85n-ph%C3%BAc-huy-1417222a8/" target="_blank" rel="noopener" aria-label="LinkedIn">' +
          '<img src="/public/linkedin-icon-2.svg" alt="LinkedIn" loading="lazy" decoding="async" style="' + iconImgStyle + '">' +
        '</a>' +
      '</div>';
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
              (showBackHome ? '<div class="footer-back-home">' + backHomeMarkup() + '</div>' : '') +
            '</div>' +
            '<div>' +
              '<div class="footer-col-title" data-i18n="footer.col1">Sứ mệnh</div>' +
              '<div class="footer-links" data-i18n-skip>' +
                navLink('about', 'footer.l1', 'Về chúng tôi') +
                navLink('about', 'footer.l2', 'Giá trị cốt lõi') +
                navLink('about', 'footer.l3', 'Lộ trình') +
              '</div>' +
            '</div>' +
            '<div>' +
              '<div class="footer-col-title" data-i18n="footer.col2">Sản phẩm</div>' +
              '<div class="footer-links" data-i18n-skip>' +
                scoutLink() +
                navLink('technology', 'footer.l4', 'Công nghệ') +
                navLink('usecases', 'footer.l5', 'Ứng dụng') +
                navLink('technology', 'footer.l6', 'Triết lý an toàn') +
                navLink('usecases', 'footer.l10', 'Deron Agriculture') +
                '<a href="https://datcs.deron.vn" target="_blank" rel="noopener" class="footer-link" data-i18n="footer.l11">DATCS</a>' +
              '</div>' +
            '</div>' +
            '<div>' +
              '<div class="footer-col-title" data-i18n="footer.col_info">Thông tin</div>' +
              '<div class="footer-links" data-i18n-skip>' +
                blogLink() +
              '</div>' +
            '</div>' +
            '<div>' +
              '<div class="footer-col-title" data-i18n="footer.col3">Đầu tư</div>' +
              '<div class="footer-links" data-i18n-skip>' +
                navLink('investor', 'footer.l7', 'Nhà đầu tư') +
                '<a class="footer-link" data-i18n="footer.l8" href="/public/Deron_Pitch.pdf" target="_blank" rel="noopener">Tải Pitch Deck</a>' +
                navLink('investor', 'footer.l9', 'Lộ trình vốn') +
              '</div>' +
            '</div>' +
            '<div>' +
              '<div class="footer-col-title" data-i18n="footer.col4">Liên hệ</div>' +
              '<div class="footer-links" data-i18n-skip>' +
                '<a class="footer-link" href="mailto:ceo.deron@gmail.com">ceo.deron@gmail.com</a>' +
                '<a class="footer-link" href="tel:0363045747">0363 045 747</a>' +
                '<span class="footer-link">deron.vn</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          socialMarkup() +
          '<div class="footer-bottom">' +
            '<div class="footer-copy" data-i18n="footer.copy">© 2025–2026 Deron. Delivering Vietnam\'s future.</div>' +
            '<div class="footer-copy" data-i18n="footer.founder">Founder: Nguyễn Phúc Huy</div>' +
            '<div class="footer-location" data-i18n="footer.location">Ho Chi Minh City · Vietnam</div>' +
          '</div>' +
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
