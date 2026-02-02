use std::env;

#[derive(Clone, Debug)]
pub struct AppConfig {
    pub host: String,
    pub port: u16,
    pub supabase_url: Option<String>,
    pub supabase_anon_key: Option<String>,
}

impl AppConfig {
    pub fn from_env() -> Self {
        let supabase_url = env::var("SUPABASE_URL")
            .or_else(|_| env::var("REACT_APP_SUPABASE_URL"))
            .ok();
        let supabase_anon_key = env::var("SUPABASE_ANON_KEY")
            .or_else(|_| env::var("REACT_APP_SUPABASE_ANON_KEY"))
            .ok();

        if supabase_url.is_none() || supabase_anon_key.is_none() {
            tracing::warn!("Missing Supabase environment variables!");
        }

        Self {
            host: env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string()),
            port: env::var("PORT")
                .ok()
                .and_then(|p| p.parse().ok())
                .unwrap_or(3000),
            supabase_url,
            supabase_anon_key,
        }
    }
}
