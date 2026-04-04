#[derive(Debug, Default, Clone)]
pub struct TelemetryService;

impl TelemetryService {
    pub fn service_name(&self) -> &'static str {
        "telemetry_service"
    }
}
