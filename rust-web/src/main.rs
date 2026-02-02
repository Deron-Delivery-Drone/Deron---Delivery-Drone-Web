mod config;
mod error;
mod i18n;
mod supabase;

use axum::{extract::State, response::Html, routing::get, Router};
use std::sync::Arc;
use tower_http::services::ServeDir;
use tracing::info;

use crate::config::AppConfig;
use crate::i18n::{translations_vi, translations_en, translations_zh, Translations};
use crate::supabase::fetch_published_content;

#[derive(Clone)]
pub struct AppState {
    pub config: AppConfig,
    pub http_client: reqwest::Client,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Load .env if present
    let _ = dotenvy::dotenv();

    // Initialize tracing
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "deron_web=info,tower_http=info".into()),
        )
        .init();

    let config = AppConfig::from_env();
    let http_client = reqwest::Client::new();

    let state = Arc::new(AppState {
        config: config.clone(),
        http_client,
    });

    let app = Router::new()
        .route("/", get(index_handler))
        .nest_service("/static", ServeDir::new("public/static"))
        .fallback_service(ServeDir::new("public"));

    let addr = format!("{}:{}", config.host, config.port);
    info!("DERON web server starting on {}", addr);

    let listener = tokio::net::TcpListener::bind(&addr).await?;
    axum::serve(listener, app.with_state(state)).await?;

    Ok(())
}

async fn index_handler(State(state): State<Arc<AppState>>) -> Html<String> {
    let news = match fetch_published_content(&state.http_client, &state.config, "post", 6).await {
        Ok(posts) => posts,
        Err(e) => {
            tracing::error!("Failed to fetch news: {}", e);
            vec![]
        }
    };

    let vi = translations_vi();
    let en = translations_en();
    let zh = translations_zh();

    let html = render_index(&vi, &en, &zh, &news);
    Html(html)
}

fn render_index(
    vi: &Translations,
    en: &Translations,
    zh: &Translations,
    news: &[supabase::Post],
) -> String {
    let news_json = serde_json::to_string(news).unwrap_or_else(|_| "[]".to_string());

    format!(
        r##"<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <title>DERON</title>
    <link rel="canonical" href="https://deron.vn/" />
    <meta name="description" content="chiến dịch Điện Biên Phủ trong lĩnh vực logistics" />
    <meta property="og:site_name" content="DERON" />
    <meta property="og:title" content="DERON" />
    <meta property="og:description" content="chiến dịch Điện Biên Phủ trong lĩnh vực logistics" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://deron.vn/" />
    <meta property="og:image" content="https://deron.vn/og-image.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="DERON" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="DERON" />
    <meta name="twitter:description" content="chiến dịch Điện Biên Phủ trong lĩnh vực logistics" />
    <meta name="twitter:image" content="https://deron.vn/og-image.jpg" />
    <link rel="icon" href="/Deron-logo.png" sizes="any" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="stylesheet" href="/static/style.css" />
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">
      <div class="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white text-gray-900 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 transition-colors duration-500">

        <!-- NAVBAR -->
        <nav class="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
          <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
              <div class="flex items-center space-x-3">
                <img src="/Deron-logo.png" alt="Deron logo" class="h-10 w-auto" />
                <span class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">DERON</span>
              </div>
              <div class="hidden md:flex items-center space-x-8">
                {nav_buttons_desktop}
                <button onclick="scrollToSection('contact')" class="px-4 py-2 bg-red-600 text-white rounded-full text-sm hover:bg-red-700 transition-colors shadow-sm">
                  <span data-lang="vi">{vi_nav_contact}</span><span data-lang="en" class="hidden">{en_nav_contact}</span><span data-lang="zh" class="hidden">{zh_nav_contact}</span>
                </button>
                <div class="flex items-center opacity-80 hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-gray-500 dark:text-gray-300"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
                  <select id="language-select" aria-label="Change language" class="ml-2 border border-gray-200/80 dark:border-gray-700/80 rounded-full pl-3 pr-6 py-2 text-sm bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500" onchange="switchLanguage(this.value)">
                    <option value="vi">🇻🇳 Việt Nam</option>
                    <option value="en">🇺🇸 English</option>
                    <option value="zh">🇨🇳 中国</option>
                  </select>
                </div>
              </div>
              <button id="mobile-menu-btn" class="md:hidden text-gray-800 dark:text-gray-200" onclick="toggleMobileMenu()">
                <svg id="menu-icon-open" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                <svg id="menu-icon-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
          </div>
          <div id="mobile-menu" class="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 hidden">
            <div class="px-6 py-4 space-y-3">
              {mobile_nav_buttons}
              <div class="pt-3 border-t border-gray-200 dark:border-gray-800">
                <label class="block text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2">Language</label>
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-gray-500 dark:text-gray-300"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>
                  <select id="mobile-language-select" class="w-full border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500" onchange="switchLanguage(this.value)">
                    <option value="vi">🇻🇳 Việt Nam</option>
                    <option value="en">🇺🇸 English</option>
                    <option value="zh">🇨🇳 中国</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <!-- HERO -->
        <section id="home" class="min-h-screen flex items-center justify-center px-6 pt-20 pb-16">
          <div class="max-w-4xl text-center">
            <div class="inline-flex items-center gap-2 mb-5 px-4 py-2 border border-red-500/50 text-red-600 dark:text-red-300 text-xs uppercase tracking-[0.25em] rounded-full bg-white/70 dark:bg-gray-900/60 shadow-sm">
              <span data-lang="vi">{vi_hero_badge}</span><span data-lang="en" class="hidden">{en_hero_badge}</span><span data-lang="zh" class="hidden">{zh_hero_badge}</span>
            </div>
            <h1 class="text-5xl md:text-7xl font-semibold mb-6 leading-tight text-gray-900 dark:text-white">
              <span data-lang="vi">{vi_hero_title}</span><span data-lang="en" class="hidden">{en_hero_title}</span><span data-lang="zh" class="hidden">{zh_hero_title}</span>
            </h1>
            <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10">
              <span data-lang="vi">{vi_hero_subtitle}</span><span data-lang="en" class="hidden">{en_hero_subtitle}</span><span data-lang="zh" class="hidden">{zh_hero_subtitle}</span>
            </p>
            <button onclick="scrollToSection('contact')" class="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors shadow-lg shadow-red-500/10">
              <span data-lang="vi">{vi_hero_cta}</span><span data-lang="en" class="hidden">{en_hero_cta}</span><span data-lang="zh" class="hidden">{zh_hero_cta}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 h-5 w-5"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </section>

        <!-- MISSION -->
        <section id="mission" class="py-24 px-6 bg-gray-50/80 dark:bg-gray-900/60">
          <div class="max-w-6xl mx-auto">
            <div class="text-center max-w-3xl mx-auto mb-12">
              <h2 class="text-4xl md:text-5xl font-semibold mb-4 text-gray-900 dark:text-white">
                <span data-lang="vi">{vi_mission_title}</span><span data-lang="en" class="hidden">{en_mission_title}</span><span data-lang="zh" class="hidden">{zh_mission_title}</span>
              </h2>
              <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                <span data-lang="vi">{vi_mission_desc}</span><span data-lang="en" class="hidden">{en_mission_desc}</span><span data-lang="zh" class="hidden">{zh_mission_desc}</span>
              </p>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
              {mission_stats}
            </div>
          </div>
        </section>

        <!-- TECHNOLOGY -->
        <section id="technology" class="py-24 px-6">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl md:text-5xl font-semibold mb-14 text-center text-gray-900 dark:text-white">
              <span data-lang="vi">{vi_tech_title}</span><span data-lang="en" class="hidden">{en_tech_title}</span><span data-lang="zh" class="hidden">{zh_tech_title}</span>
            </h2>
            <div class="space-y-10">
              {tech_items}
            </div>
          </div>
        </section>

        <!-- ROADMAP -->
        <section id="roadmap" class="py-24 px-6 bg-gray-50/80 dark:bg-gray-900/60">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl md:text-5xl font-semibold mb-14 text-center text-gray-900 dark:text-white">
              <span data-lang="vi">{vi_roadmap_title}</span><span data-lang="en" class="hidden">{en_roadmap_title}</span><span data-lang="zh" class="hidden">{zh_roadmap_title}</span>
            </h2>
            <div class="space-y-8">
              {roadmap_phases}
            </div>
          </div>
        </section>

        <!-- NEWS -->
        <section id="news" class="py-24 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
          <div class="max-w-6xl mx-auto">
            <div class="flex items-center justify-between flex-wrap gap-4 mb-6">
              <h2 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
                <span data-lang="vi">{vi_news_title}</span><span data-lang="en" class="hidden">{en_news_title}</span><span data-lang="zh" class="hidden">{zh_news_title}</span>
              </h2>
              <div class="h-0.5 flex-1 ml-4 bg-gradient-to-r from-red-500/70 to-transparent rounded-full"></div>
            </div>
            <div id="news-container" class="grid md:grid-cols-3 gap-8 mt-8"></div>
            <p id="news-empty" class="text-gray-600 dark:text-gray-300 hidden">
              <span data-lang="vi">{vi_news_empty}</span><span data-lang="en" class="hidden">{en_news_empty}</span><span data-lang="zh" class="hidden">{zh_news_empty}</span>
            </p>
          </div>
        </section>

        <!-- CONTACT -->
        <section id="contact" class="py-24 px-6">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-4xl md:text-5xl font-semibold mb-6 text-gray-900 dark:text-white">
              <span data-lang="vi">{vi_contact_headline}</span><span data-lang="en" class="hidden">{en_contact_headline}</span><span data-lang="zh" class="hidden">{zh_contact_headline}</span>
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-12">
              <span data-lang="vi">{vi_contact_cta}</span><span data-lang="en" class="hidden">{en_contact_cta}</span><span data-lang="zh" class="hidden">{zh_contact_cta}</span>
            </p>
            <div class="bg-gray-50 dark:bg-gray-900/70 rounded-3xl p-8 md:p-10 mb-10 border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/5 dark:shadow-black/40">
              <h3 class="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Nguyễn Phúc Huy (Harry / 阿辉)</h3>
              <div class="space-y-4">
                <a href="mailto:ceo.deron@gmail.com" class="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <span>ceo.deron@gmail.com</span>
                </a>
                <a href="tel:+84 363 045 747" class="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>+84 363 045 747</span>
                </a>
                <div class="flex items-center justify-center gap-3 text-gray-700 dark:text-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                  <span>deron.vn</span>
                </div>
              </div>
            </div>
            <button onclick="window.location.href='mailto:ceo.deron@gmail.com'" class="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors shadow-lg shadow-red-500/10">
              <span data-lang="vi">{vi_contact_button}</span><span data-lang="en" class="hidden">{en_contact_button}</span><span data-lang="zh" class="hidden">{zh_contact_button}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 h-5 w-5"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </section>

        <!-- FOOTER -->
        <footer class="py-12 px-6 border-t border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/80">
          <div class="max-w-6xl mx-auto text-center text-gray-600 dark:text-gray-300">
            <p class="mb-2">&copy; 2025 Deron. Delivering Vietnam&apos;s future.</p>
            <p class="text-sm">Ho Chi Minh City, Vietnam</p>
          </div>
        </footer>
      </div>
    </div>
    <script>
    // === DERON Client-Side Interactivity (Zero Behavior Change) ===
    (function() {{
      var NEWS_DATA = {news_json};

      // Language
      var currentLang = localStorage.getItem("deron-language") || "vi";

      function applyLanguage(lang) {{
        currentLang = lang;
        localStorage.setItem("deron-language", lang);
        var langs = ["vi", "en", "zh"];
        for (var i = 0; i < langs.length; i++) {{
          var els = document.querySelectorAll("[data-lang='" + langs[i] + "']");
          for (var j = 0; j < els.length; j++) {{
            els[j].classList.toggle("hidden", langs[i] !== lang);
          }}
        }}
        // Sync selects
        var sel = document.getElementById("language-select");
        var msel = document.getElementById("mobile-language-select");
        if (sel) sel.value = lang;
        if (msel) msel.value = lang;
        renderNews();
      }}

      window.switchLanguage = function(lang) {{
        applyLanguage(lang);
      }};

      // Theme
      var currentTheme = localStorage.getItem("deron-theme") || "system";

      function applyTheme() {{
        var mq = window.matchMedia("(prefers-color-scheme: dark)");
        var isDark = currentTheme === "dark" || (currentTheme === "system" && mq.matches);
        document.documentElement.classList.toggle("dark", isDark);
        document.body.dataset.theme = currentTheme;
      }}

      applyTheme();
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function() {{
        if (currentTheme === "system") applyTheme();
      }});

      // Mobile menu
      var menuOpen = false;
      window.toggleMobileMenu = function() {{
        menuOpen = !menuOpen;
        document.getElementById("mobile-menu").classList.toggle("hidden", !menuOpen);
        document.getElementById("menu-icon-open").classList.toggle("hidden", menuOpen);
        document.getElementById("menu-icon-close").classList.toggle("hidden", !menuOpen);
      }};

      // Scroll
      window.scrollToSection = function(id) {{
        var el = document.getElementById(id);
        if (el) el.scrollIntoView({{ behavior: "smooth" }});
        if (menuOpen) window.toggleMobileMenu();
      }};

      // Locale date
      function localeDate(dateStr) {{
        if (!dateStr) return "";
        var locale = currentLang === "en" ? "en-US" : currentLang === "zh" ? "zh-CN" : "vi-VN";
        return new Date(dateStr).toLocaleDateString(locale);
      }}

      // News labels
      var newsLabels = {{
        vi: {{ open: "Xem chi tiết", empty: "Hiện chưa có bài viết nào được xuất bản." }},
        en: {{ open: "Open story", empty: "No published articles yet." }},
        zh: {{ open: "查看详情", empty: "尚未有发布的文章。" }}
      }};

      // Render news
      function renderNews() {{
        var container = document.getElementById("news-container");
        var emptyEl = document.getElementById("news-empty");
        if (!container) return;

        if (!NEWS_DATA || NEWS_DATA.length === 0) {{
          container.innerHTML = "";
          if (emptyEl) emptyEl.classList.remove("hidden");
          return;
        }}
        if (emptyEl) emptyEl.classList.add("hidden");

        var labels = newsLabels[currentLang] || newsLabels.vi;
        var html = "";
        for (var i = 0; i < NEWS_DATA.length; i++) {{
          var post = NEWS_DATA[i];
          var targetUrl = post.external_url || (post.slug ? "/news/" + post.slug : null);
          var imageSrc = post.featured_image || "/Deron-logo.png";
          var isClickable = !!targetUrl;

          var cardInner = '<div class="h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg shadow-black/5 dark:shadow-black/40 flex flex-col">' +
            '<div class="relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800">' +
            '<img src="' + escapeHtml(imageSrc) + '" alt="' + escapeHtml(post.title || '') + '" onerror="this.onerror=null;this.src=\'/Deron-logo.png\';" class="absolute inset-0 h-full w-full object-cover" />' +
            '</div>' +
            '<div class="flex-1 flex flex-col p-6 gap-3">' +
            '<p class="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">' + localeDate(post.published_at) + '</p>' +
            '<h3 class="text-xl font-semibold text-gray-900 dark:text-white">' + escapeHtml(post.title || '') + '</h3>' +
            (post.meta_description ? '<p class="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm leading-relaxed">' + escapeHtml(post.meta_description) + '</p>' : '') +
            '<div class="mt-auto flex items-center justify-between pt-2">' +
            '<span class="text-sm text-red-600 dark:text-red-400 font-medium">' + labels.open + '</span>' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-red-600 dark:text-red-400"><path d="m9 18 6-6-6-6"/></svg>' +
            '</div></div></div>';

          if (isClickable) {{
            var target = post.external_url ? '_blank' : '_self';
            html += '<a href="' + escapeHtml(targetUrl) + '" target="' + target + '" rel="noopener noreferrer" class="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-red-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900">' +
              '<div class="transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">' + cardInner + '</div></a>';
          }} else {{
            html += '<div class="cursor-default">' + cardInner + '</div>';
          }}
        }}
        container.innerHTML = html;
      }}

      function escapeHtml(str) {{
        if (!str) return "";
        return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
      }}

      // Init
      applyLanguage(currentLang);
    }})();
    </script>
  </body>
</html>"##,
        // Nav desktop buttons
        nav_buttons_desktop = gen_nav_buttons_desktop(vi, en, zh),
        // Nav mobile buttons
        mobile_nav_buttons = gen_mobile_nav_buttons(vi, en, zh),
        // Hero
        vi_hero_badge = vi.hero.badge,
        en_hero_badge = en.hero.badge,
        zh_hero_badge = zh.hero.badge,
        vi_hero_title = vi.hero.title,
        en_hero_title = en.hero.title,
        zh_hero_title = zh.hero.title,
        vi_hero_subtitle = vi.hero.subtitle,
        en_hero_subtitle = en.hero.subtitle,
        zh_hero_subtitle = zh.hero.subtitle,
        vi_hero_cta = vi.hero.cta,
        en_hero_cta = en.hero.cta,
        zh_hero_cta = zh.hero.cta,
        // Nav contact
        vi_nav_contact = vi.nav.contact,
        en_nav_contact = en.nav.contact,
        zh_nav_contact = zh.nav.contact,
        // Mission
        vi_mission_title = vi.mission.title,
        en_mission_title = en.mission.title,
        zh_mission_title = zh.mission.title,
        vi_mission_desc = vi.mission.description,
        en_mission_desc = en.mission.description,
        zh_mission_desc = zh.mission.description,
        mission_stats = gen_mission_stats(vi, en, zh),
        // Technology
        vi_tech_title = vi.technology.title,
        en_tech_title = en.technology.title,
        zh_tech_title = zh.technology.title,
        tech_items = gen_tech_items(vi, en, zh),
        // Roadmap
        vi_roadmap_title = vi.roadmap.title,
        en_roadmap_title = en.roadmap.title,
        zh_roadmap_title = zh.roadmap.title,
        roadmap_phases = gen_roadmap_phases(vi, en, zh),
        // News
        vi_news_title = vi.news.title,
        en_news_title = en.news.title,
        zh_news_title = zh.news.title,
        vi_news_empty = vi.news.empty,
        en_news_empty = en.news.empty,
        zh_news_empty = zh.news.empty,
        // Contact
        vi_contact_headline = vi.contact.headline,
        en_contact_headline = en.contact.headline,
        zh_contact_headline = zh.contact.headline,
        vi_contact_cta = vi.contact.cta,
        en_contact_cta = en.contact.cta,
        zh_contact_cta = zh.contact.cta,
        vi_contact_button = vi.contact.button,
        en_contact_button = en.contact.button,
        zh_contact_button = zh.contact.button,
        // News JSON
        news_json = news_json,
    )
}

fn gen_nav_buttons_desktop(vi: &Translations, en: &Translations, zh: &Translations) -> String {
    let sections = ["home", "mission", "technology", "roadmap", "news"];
    let mut out = String::new();
    for section in &sections {
        let vi_label = vi.nav.get(section);
        let en_label = en.nav.get(section);
        let zh_label = zh.nav.get(section);
        out.push_str(&format!(
            r#"<button onclick="scrollToSection('{section}')" class="text-sm text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors"><span data-lang="vi">{vi}</span><span data-lang="en" class="hidden">{en}</span><span data-lang="zh" class="hidden">{zh}</span></button>"#,
            section = section,
            vi = vi_label,
            en = en_label,
            zh = zh_label,
        ));
    }
    out
}

fn gen_mobile_nav_buttons(vi: &Translations, en: &Translations, zh: &Translations) -> String {
    let sections = ["home", "mission", "technology", "roadmap", "news", "contact"];
    let mut out = String::new();
    for section in &sections {
        let vi_label = vi.nav.get(section);
        let en_label = en.nav.get(section);
        let zh_label = zh.nav.get(section);
        out.push_str(&format!(
            r#"<button onclick="scrollToSection('{section}')" class="block w-full text-left py-2 text-gray-800 dark:text-gray-100"><span data-lang="vi">{vi}</span><span data-lang="en" class="hidden">{en}</span><span data-lang="zh" class="hidden">{zh}</span></button>"#,
            section = section,
            vi = vi_label,
            en = en_label,
            zh = zh_label,
        ));
    }
    out
}

fn gen_mission_stats(vi: &Translations, en: &Translations, zh: &Translations) -> String {
    let mut out = String::new();
    for i in 0..3 {
        out.push_str(&format!(
            r#"<div class="text-center p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg shadow-black/5 dark:shadow-black/30 border border-gray-100 dark:border-gray-700"><div class="text-4xl font-semibold text-gray-900 dark:text-white mb-2">{value}</div><div class="text-gray-600 dark:text-gray-300"><span data-lang="vi">{vi}</span><span data-lang="en" class="hidden">{en}</span><span data-lang="zh" class="hidden">{zh}</span></div></div>"#,
            value = vi.mission.stats[i].value,
            vi = vi.mission.stats[i].label,
            en = en.mission.stats[i].label,
            zh = zh.mission.stats[i].label,
        ));
    }
    out
}

fn gen_tech_items(vi: &Translations, en: &Translations, zh: &Translations) -> String {
    let mut out = String::new();
    for i in 0..3 {
        out.push_str(&format!(
            r#"<div class="flex flex-col md:flex-row items-start gap-8 p-8 bg-white/80 dark:bg-gray-900/70 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl shadow-black/5 dark:shadow-black/40"><div class="flex-1"><h3 class="text-2xl font-semibold mb-3 text-gray-900 dark:text-white"><span data-lang="vi">{vi_title}</span><span data-lang="en" class="hidden">{en_title}</span><span data-lang="zh" class="hidden">{zh_title}</span></h3><p class="text-gray-600 dark:text-gray-300 leading-relaxed"><span data-lang="vi">{vi_desc}</span><span data-lang="en" class="hidden">{en_desc}</span><span data-lang="zh" class="hidden">{zh_desc}</span></p></div></div>"#,
            vi_title = vi.technology.items[i].title,
            en_title = en.technology.items[i].title,
            zh_title = zh.technology.items[i].title,
            vi_desc = vi.technology.items[i].description,
            en_desc = en.technology.items[i].description,
            zh_desc = zh.technology.items[i].description,
        ));
    }
    out
}

fn gen_roadmap_phases(vi: &Translations, en: &Translations, zh: &Translations) -> String {
    let mut out = String::new();
    let chevron_svg = r#"<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5"><path d="m9 18 6-6-6-6"/></svg>"#;

    for i in 0..3 {
        let mut goals_html = String::new();
        for g in 0..vi.roadmap.phases[i].goals.len() {
            goals_html.push_str(&format!(
                r#"<li class="flex items-start gap-2 text-gray-700 dark:text-gray-200">{chevron}<span><span data-lang="vi">{vi}</span><span data-lang="en" class="hidden">{en}</span><span data-lang="zh" class="hidden">{zh}</span></span></li>"#,
                chevron = chevron_svg,
                vi = vi.roadmap.phases[i].goals[g],
                en = en.roadmap.phases[i].goals[g],
                zh = zh.roadmap.phases[i].goals[g],
            ));
        }

        out.push_str(&format!(
            r#"<div class="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg shadow-black/5 dark:shadow-black/30 border border-gray-100 dark:border-gray-700"><div class="flex items-start gap-4 mb-4"><div class="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md shadow-red-500/30">{num}</div><div class="flex-1"><h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-white"><span data-lang="vi">{vi_name}</span><span data-lang="en" class="hidden">{en_name}</span><span data-lang="zh" class="hidden">{zh_name}</span></h3><p class="text-gray-600 dark:text-gray-300 text-sm mb-4"><span data-lang="vi">{vi_period}</span><span data-lang="en" class="hidden">{en_period}</span><span data-lang="zh" class="hidden">{zh_period}</span></p><ul class="space-y-2">{goals}</ul></div></div></div>"#,
            num = i + 1,
            vi_name = vi.roadmap.phases[i].name,
            en_name = en.roadmap.phases[i].name,
            zh_name = zh.roadmap.phases[i].name,
            vi_period = vi.roadmap.phases[i].period,
            en_period = en.roadmap.phases[i].period,
            zh_period = zh.roadmap.phases[i].period,
            goals = goals_html,
        ));
    }
    out
}
