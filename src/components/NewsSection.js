import React from "react";
import { ChevronRight } from "lucide-react";

export default function NewsSection({ t, news, loadingNews, newsError, localeDate }) {
  return (
    <section
      id="news"
      className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <p className="text-xs uppercase tracking-[0.25em] text-red-600 dark:text-red-400 mb-2">
          {t.news.sectionLabel}
        </p>
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
            {t.news.title}
          </h2>
          <div className="h-0.5 flex-1 ml-4 bg-gradient-to-r from-red-500/70 to-transparent rounded-full" />
        </div>

        {/* States */}
        {loadingNews && (
          <p className="text-gray-600 dark:text-gray-300">{t.news.loading}</p>
        )}
        {!loadingNews && newsError && (
          <p className="text-red-600 dark:text-red-400">{t.news.error}</p>
        )}
        {!loadingNews && !newsError && news.length === 0 && (
          <p className="text-gray-600 dark:text-gray-300">{t.news.empty}</p>
        )}

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-4">
          {news.map((post) => {
            const targetUrl =
              post.external_url || (post.slug ? `/news/${post.slug}` : null);
            const imageSrc = post.featured_image || "/Deron-logo.png";
            const isClickable = Boolean(targetUrl);

            const cardBody = (
              <div className="h-full rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg shadow-black/5 dark:shadow-black/40 flex flex-col">
                <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800">
                  <img
                    src={imageSrc}
                    alt={post.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/Deron-logo.png";
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col p-6 gap-3">
                  <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">
                    {localeDate(post.published_at)}
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {post.title}
                  </h3>
                  {post.meta_description && (
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm leading-relaxed">
                      {post.meta_description}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-sm text-red-600 dark:text-red-400 font-medium">
                      {t.news.open}
                    </span>
                    <ChevronRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </div>
            );

            if (!isClickable) {
              return (
                <div key={post.id} className="cursor-default">
                  {cardBody}
                </div>
              );
            }

            return (
              <a
                key={post.id}
                href={targetUrl}
                target={post.external_url ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:ring-red-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"
              >
                <div className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-2xl">
                  {cardBody}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
