use serde::{Deserialize, Serialize};

use crate::config::AppConfig;
use crate::error::AppError;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Post {
    pub id: Option<String>,
    pub title: Option<String>,
    pub slug: Option<String>,
    pub content: Option<String>,
    pub content_type: Option<String>,
    pub category: Option<String>,
    pub tags: Option<Vec<String>>,
    pub featured_image: Option<String>,
    pub meta_title: Option<String>,
    pub meta_description: Option<String>,
    pub published_at: Option<String>,
    pub view_count: Option<i64>,
    pub external_url: Option<String>,
}

/// Fetches published content from Supabase REST API.
/// Equivalent to the JS: supabase.from("content").select(...).eq("status","published").eq("content_type",ct).order("published_at",{ascending:false}).limit(limit)
pub async fn fetch_published_content(
    client: &reqwest::Client,
    config: &AppConfig,
    content_type: &str,
    limit: usize,
) -> Result<Vec<Post>, AppError> {
    let base_url = match &config.supabase_url {
        Some(u) => u,
        None => return Err(AppError::SupabaseNotConfigured),
    };
    let anon_key = match &config.supabase_anon_key {
        Some(k) => k,
        None => return Err(AppError::SupabaseNotConfigured),
    };

    let select = "id,title,slug,content,content_type,category,tags,featured_image,meta_title,meta_description,published_at,view_count,external_url";

    let url = format!(
        "{}/rest/v1/content?select={}&status=eq.published&content_type=eq.{}&order=published_at.desc&limit={}",
        base_url.trim_end_matches('/'),
        select,
        content_type,
        limit,
    );

    let resp = client
        .get(&url)
        .header("apikey", anon_key.as_str())
        .header("Authorization", format!("Bearer {}", anon_key))
        .header("Content-Type", "application/json")
        .send()
        .await?;

    let posts: Vec<Post> = resp.json().await?;
    Ok(posts)
}
