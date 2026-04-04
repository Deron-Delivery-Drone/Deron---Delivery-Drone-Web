#[derive(Debug, Default, Clone)]
pub struct MissionService;

impl MissionService {
    pub fn service_name(&self) -> &'static str {
        "mission_service"
    }
}
