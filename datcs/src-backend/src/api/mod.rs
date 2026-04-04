use actix_web::{get, web, HttpResponse, Responder};

use crate::{health_signal, state::AppState};

pub fn routes(cfg: &mut web::ServiceConfig) {
    cfg.service(health);
}

#[get("/health")]
async fn health(state: web::Data<AppState>) -> impl Responder {
    HttpResponse::Ok().json(health_signal(&state.database_path))
}
