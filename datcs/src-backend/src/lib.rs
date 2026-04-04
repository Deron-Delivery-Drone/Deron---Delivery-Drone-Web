pub mod api;
pub mod db;
pub mod devices;
pub mod domain;
pub mod services;
pub mod state;

use anyhow::Result;
use chrono::Utc;
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct HealthSignal {
    pub service: &'static str,
    pub status: &'static str,
    pub time_utc: String,
    pub db: String,
}

pub fn bootstrap_state(database_path: &str) -> Result<state::AppState> {
    state::AppState::bootstrap(database_path)
}

pub fn health_signal(database_path: &str) -> HealthSignal {
    HealthSignal {
        service: "datcs-backend",
        status: "ok",
        time_utc: Utc::now().to_rfc3339(),
        db: database_path.to_string(),
    }
}
