// src/public/News.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function NewsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("content")
          .select("id, title, published_at, external_url")
          .eq("status", "published")
          .eq("content_type", "post")
          .order("published_at", { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (err) {
        console.error(err);
        setError("Không tải được tin tức");
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-gray-500">Đang tải tin tức...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">Tin tức & Cập nhật từ Deron</h1>

      {posts.length === 0 && (
        <p className="text-gray-500">Hiện chưa có bài viết nào.</p>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {posts.map((post) => {
          const hasLink = !!post.external_url;

          // Nếu có external_url thì bọc bằng <a>, không thì chỉ là <div>
          const Wrapper = hasLink ? "a" : "div";
          const wrapperProps = hasLink
            ? {
                href: post.external_url,
                target: "_blank",
                rel: "noopener noreferrer",
              }
            : {};

          return (
            <Wrapper
              key={post.id}
              {...wrapperProps}
              className={`block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md ${
                hasLink ? "cursor-pointer hover:border-red-500" : "cursor-default"
              }`}
            >
              <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-500">
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString("vi-VN")
                  : ""}
              </p>

              {!hasLink && (
                <p className="mt-2 text-xs text-gray-400">
                  (Bài này chưa có link external_url)
                </p>
              )}
            </Wrapper>
          );
        })}
      </div>
    </main>
  );
}
