// Shared JavaScript for the Deron multi-page site.
// This script adds simple reveal animations using the
// Intersection Observer API. Elements with the class
// `.reveal` will fade in as they enter the viewport.

(function loadDeronChatbotAssets() {
  if (!document.getElementById('deron-chatbot-css')) {
    const link = document.createElement('link');
    link.id = 'deron-chatbot-css';
    link.rel = 'stylesheet';
    link.href = '/assets/css/chatbot.css';
    document.head.appendChild(link);
  }

  if (!document.getElementById('deron-chatbot-js')) {
    const script = document.createElement('script');
    script.id = 'deron-chatbot-js';
    script.src = '/assets/js/deron-chatbot.js';
    script.defer = true;
    document.head.appendChild(script);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  setupMobileNavigation();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

function setupMobileNavigation() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');

  if (!nav || !hamburger || !links || document.querySelector('.nav-mobile-menu')) return;

  const drawer = document.createElement('div');
  drawer.className = 'nav-mobile-drawer';
  drawer.setAttribute('aria-hidden', 'true');

  links.querySelectorAll('a, button, span').forEach(item => {
    const clone = item.cloneNode(true);
    clone.classList.add('nav-link');
    clone.addEventListener('click', closeDrawer);
    drawer.appendChild(clone);
  });

  const cta = nav.querySelector('.nav-right .nav-cta');
  if (cta) {
    const ctaClone = cta.cloneNode(true);
    ctaClone.classList.add('nav-cta');
    ctaClone.addEventListener('click', closeDrawer);
    drawer.appendChild(ctaClone);
  }

  document.body.appendChild(drawer);

  hamburger.setAttribute('role', 'button');
  hamburger.setAttribute('tabindex', '0');
  hamburger.setAttribute('aria-expanded', 'false');

  function openDrawer() {
    hamburger.classList.add('is-open');
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-drawer-open');
  }

  function closeDrawer() {
    hamburger.classList.remove('is-open');
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-drawer-open');
  }

  function toggleDrawer() {
    if (drawer.classList.contains('open')) closeDrawer();
    else openDrawer();
  }

  hamburger.addEventListener('click', toggleDrawer);
  hamburger.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDrawer();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeDrawer();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeDrawer();
  });
}
