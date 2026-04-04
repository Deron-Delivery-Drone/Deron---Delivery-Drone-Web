use actix_web::{get, web, HttpResponse, Responder};
use chrono::Utc;

use crate::state::AppState;

pub fn routes(cfg: &mut web::ServiceConfig) {
    cfg.service(health);
}

#[get("/health")]
async fn health(state: web::Data<AppState>) -> impl Responder {
    let payload = serde_json::json!({
        "service": "datcs-backend",
        "status": "ok",
        "time_utc": Utc::now(),
        "db": state.database_path,
    });

    HttpResponse::Ok().json(payload)
}
