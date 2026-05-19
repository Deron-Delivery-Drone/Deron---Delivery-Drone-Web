#!/usr/bin/env node
/**
 * Build static blog pages from markdown sources.
 *
 * Reads:  <src>/*.md            (default: content/blogs)
 * Writes: <dst>/blog/<slug>/index.html   (one per post)
 *         <dst>/content/blogs/index.json (manifest for listing page)
 *         <dst>/sitemap.xml              (rewritten with /blog and /blog/<slug> entries)
 *
 * Usage:
 *   node scripts/build-blog.js --src content/blogs --dst build
 *
 * Local preview:
 *   node scripts/build-blog.js --src content/blogs --dst .
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const SITE_ORIGIN = 'https://deron.vn';

function parseArgs(argv) {
  const args = { src: 'content/blogs', dst: 'build' };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--src') args.src = argv[++i];
    else if (a === '--dst') args.dst = argv[++i];
  }
  return args;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readField(data, name) {
  const value = data && data[name];
  return value === undefined || value === null ? '' : String(value).trim();
}

function buildTranslations(data, body) {
  const vi = {
    title: readField(data, 'title'),
    summary: readField(data, 'summary'),
    body: String(body || '').trim(),
  };

  return {
    vi,
    en: {
      title: readField(data, 'title_en') || vi.title,
      summary: readField(data, 'summary_en') || vi.summary,
      body: readField(data, 'body_en') || vi.body,
    },
    zh: {
      title: readField(data, 'title_zh') || vi.title,
      summary: readField(data, 'summary_zh') || vi.summary,
      body: readField(data, 'body_zh') || vi.body,
    },
  };
}

function normalizeCategory(value) {
  const category = String(value || 'updates').trim().toLowerCase();
  return ['info', 'news', 'updates', 'press'].includes(category) ? category : 'updates';
}

function jsonForScript(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function readPosts(srcDir) {
  if (!fs.existsSync(srcDir)) {
    console.warn(`[build-blog] Source dir not found: ${srcDir}`);
    return [];
  }
  const files = fs
    .readdirSync(srcDir)
    .filter((f) => f.endsWith('.md'))
    .sort();

  const posts = [];
  for (const file of files) {
    const filePath = path.join(srcDir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const slug = file.replace(/\.md$/, '');
    const data = parsed.data || {};
    const body = (parsed.content || '').trim();
    const translations = buildTranslations(data, body);
    if (!data.title || !data.date) {
      console.warn(`[build-blog] Skipping ${file}: missing title or date`);
      continue;
    }
    posts.push({
      slug,
      category: normalizeCategory(data.category),
      title: translations.vi.title,
      date: String(data.date),
      date_display: String(data.date_display || data.date),
      summary: translations.vi.summary,
      body: translations.vi.body,
      translations,
    });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  return posts;
}

function renderPostHtml(template, post) {
  const localizedPosts = Object.fromEntries(
    Object.entries(post.translations || {}).map(([lang, value]) => [
      lang,
      {
        title: value.title || post.title,
        summary: value.summary || post.summary,
        bodyHtml: marked.parse(value.body || post.body || ''),
      },
    ])
  );
  const bodyHtml = localizedPosts.vi ? localizedPosts.vi.bodyHtml : marked.parse(post.body || '');
  const canonical = `${SITE_ORIGIN}/blog/${post.slug}`;
  const replacements = {
    TITLE: escapeHtml(post.title),
    SUMMARY: escapeHtml(post.summary),
    DATE: escapeHtml(post.date),
    DATE_DISPLAY: escapeHtml(post.date_display),
    SLUG: escapeHtml(post.slug),
    CANONICAL_URL: canonical,
    BODY_HTML: bodyHtml,
    POST_TRANSLATIONS_JSON: jsonForScript(localizedPosts),
    JSON_LD: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Organization',
        name: 'Deron',
        url: SITE_ORIGIN,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Deron',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_ORIGIN}/Deron-logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonical,
      },
      inLanguage: ['vi', 'en', 'zh'],
    }),
  };

  return template.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    Object.prototype.hasOwnProperty.call(replacements, key) ? replacements[key] : ''
  );
}

function writeManifest(dst, posts) {
  const outDir = path.join(dst, 'content', 'blogs');
  ensureDir(outDir);
  const manifest = posts.map(({ slug, category, title, date, date_display, summary, translations }) => ({
    slug,
    category,
    title,
    date,
    date_display,
    summary,
    translations: {
      vi: {
        title: translations.vi.title,
        summary: translations.vi.summary,
      },
      en: {
        title: translations.en.title,
        summary: translations.en.summary,
      },
      zh: {
        title: translations.zh.title,
        summary: translations.zh.summary,
      },
    },
  }));
  fs.writeFileSync(
    path.join(outDir, 'index.json'),
    JSON.stringify(manifest, null, 2),
    'utf8'
  );
}

function writePostHtmls(dst, posts, template) {
  for (const post of posts) {
    const outDir = path.join(dst, 'blog', post.slug);
    ensureDir(outDir);
    fs.writeFileSync(path.join(outDir, 'index.html'), renderPostHtml(template, post), 'utf8');
  }
}

function rewriteSitemap(dst, posts) {
  const srcSitemap = path.join(process.cwd(), 'sitemap.xml');
  const dstSitemap = path.join(dst, 'sitemap.xml');
  if (!fs.existsSync(srcSitemap)) {
    console.warn(`[build-blog] sitemap.xml not found at ${srcSitemap}; skipping`);
    return;
  }
  let xml = fs.readFileSync(srcSitemap, 'utf8');

  // Strip any previously-generated blog post entries so re-runs stay clean.
  xml = xml.replace(
    /\n\s*<!-- BEGIN_BLOG_POSTS -->[\s\S]*?<!-- END_BLOG_POSTS -->/g,
    ''
  );

  const postEntries = posts
    .map(
      (p) =>
        `  <url>\n    <loc>${SITE_ORIGIN}/blog/${p.slug}</loc>\n    <lastmod>${p.date}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`
    )
    .join('\n');

  if (postEntries) {
    const block = `\n  <!-- BEGIN_BLOG_POSTS -->\n${postEntries}\n  <!-- END_BLOG_POSTS -->`;
    xml = xml.replace('</urlset>', `${block}\n</urlset>`);
  }

  ensureDir(path.dirname(dstSitemap));
  fs.writeFileSync(dstSitemap, xml, 'utf8');
}

function main() {
  const { src, dst } = parseArgs(process.argv);
  const srcAbs = path.resolve(process.cwd(), src);
  const dstAbs = path.resolve(process.cwd(), dst);
  const templatePath = path.resolve(__dirname, 'blog-post-template.html');

  if (!fs.existsSync(templatePath)) {
    console.error(`[build-blog] Template not found: ${templatePath}`);
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, 'utf8');

  marked.setOptions({ gfm: true, breaks: false, headerIds: true, mangle: false });

  const posts = readPosts(srcAbs);
  console.log(`[build-blog] Found ${posts.length} post(s) in ${srcAbs}`);

  writeManifest(dstAbs, posts);
  writePostHtmls(dstAbs, posts, template);
  rewriteSitemap(dstAbs, posts);

  console.log(`[build-blog] Done. Output written under ${dstAbs}`);
  for (const p of posts) {
    console.log(`  - /blog/${p.slug}/`);
  }
}

main();
