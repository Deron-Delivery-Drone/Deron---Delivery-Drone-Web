#[derive(Debug, thiserror::Error)]
pub enum AppError {
    #[error("Supabase request failed: {0}")]
    Supabase(#[from] reqwest::Error),

    #[error("Supabase not configured")]
    SupabaseNotConfigured,

    #[error("JSON parse error: {0}")]
    Json(#[from] serde_json::Error),
}
