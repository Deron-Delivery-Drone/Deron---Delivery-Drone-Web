use anyhow::Context;
use datcs_backend::{bootstrap_state, health_signal};
use serde::Serialize;
use std::sync::Mutex;
use tauri::Manager;

#[derive(Debug)]
struct RuntimeState {
    db_path: String,
}

#[derive(Debug, Serialize)]
struct DesktopHealth {
    shell: &'static str,
    status: &'static str,
    backend: datcs_backend::HealthSignal,
}

#[tauri::command]
fn health_signal_cmd(state: tauri::State<'_, Mutex<RuntimeState>>) -> Result<DesktopHealth, String> {
    let runtime = state.lock().map_err(|_| "failed to lock runtime state")?;

    Ok(DesktopHealth {
        shell: "datcs-desktop",
        status: "ok",
        backend: health_signal(&runtime.db_path),
    })
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let mut data_dir = app
                .path()
                .app_data_dir()
                .context("resolve app data directory")?;
            std::fs::create_dir_all(&data_dir).context("create app data directory")?;
            data_dir.push("datcs-desktop.db");

            let db_path = data_dir.to_string_lossy().to_string();
            bootstrap_state(&db_path).context("bootstrap local sqlite state")?;

            app.manage(Mutex::new(RuntimeState { db_path }));
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![health_signal_cmd])
        .run(tauri::generate_context!())
        .expect("error while running DATCS desktop");
}
