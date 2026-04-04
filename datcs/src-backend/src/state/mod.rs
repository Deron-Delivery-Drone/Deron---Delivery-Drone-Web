use anyhow::Result;

use crate::db;
use crate::services::{
    audit_service::AuditService, command_service::CommandService,
    device_session_service::DeviceSessionService, mission_service::MissionService,
    safety_service::SafetyService, telemetry_service::TelemetryService,
};

#[derive(Clone)]
pub struct AppState {
    pub database_path: String,
    pub telemetry_service: TelemetryService,
    pub command_service: CommandService,
    pub mission_service: MissionService,
    pub safety_service: SafetyService,
    pub audit_service: AuditService,
    pub device_session_service: DeviceSessionService,
}

impl AppState {
    pub fn bootstrap(database_path: &str) -> Result<Self> {
        db::bootstrap(database_path)?;

        Ok(Self {
            database_path: database_path.to_string(),
            telemetry_service: TelemetryService,
            command_service: CommandService,
            mission_service: MissionService,
            safety_service: SafetyService,
            audit_service: AuditService,
            device_session_service: DeviceSessionService,
        })
    }
}
