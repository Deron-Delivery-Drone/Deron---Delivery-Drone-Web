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
