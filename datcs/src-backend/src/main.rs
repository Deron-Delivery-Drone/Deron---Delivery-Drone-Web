mod api;
mod db;
mod devices;
mod domain;
mod services;
mod state;

use actix_web::{web, App, HttpServer};
use anyhow::Context;
use state::AppState;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let bind_addr = std::env::var("DATCS_BIND").unwrap_or_else(|_| "127.0.0.1:8080".to_string());

    let app_state = AppState::bootstrap("datcs.db").context("failed to initialize DATCS state");
    let app_state = match app_state {
        Ok(state) => web::Data::new(state),
        Err(err) => {
            eprintln!("startup error: {err:#}");
            return Err(std::io::Error::other(err.to_string()));
        }
    };

    println!("DATCS backend listening on http://{bind_addr}");

    HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .configure(api::routes)
    })
    .bind(&bind_addr)?
    .run()
    .await
}
