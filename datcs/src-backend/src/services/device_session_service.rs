#[derive(Debug, Default, Clone)]
pub struct DeviceSessionService;

impl DeviceSessionService {
    pub fn service_name(&self) -> &'static str {
        "device_session_service"
    }
}
