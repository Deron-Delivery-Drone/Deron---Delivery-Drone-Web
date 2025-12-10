// src/public/News.jsx
import React from "react";

export default function News({ items }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-12">Tin tức & Cập nhật từ Deron</h1>

      {items.length === 0 && (
        <p className="text-red-500">Không tải được tin tức</p>
      )}

      <div className="grid gap-6">
        {items.map((post) => (
          <a
            key={post.id}
            href={post.external_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block border rounded-lg p-6 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>

            <p className="text-sm text-gray-500">
              {new Date(post.published_at).toLocaleDateString("vi-VN")}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
