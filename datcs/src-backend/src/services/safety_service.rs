#[derive(Debug, Default, Clone)]
pub struct SafetyService;

impl SafetyService {
    pub fn service_name(&self) -> &'static str {
        "safety_service"
    }
}
