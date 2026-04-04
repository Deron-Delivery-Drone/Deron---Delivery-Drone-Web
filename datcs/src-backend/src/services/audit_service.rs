#[derive(Debug, Default, Clone)]
pub struct AuditService;

impl AuditService {
    pub fn service_name(&self) -> &'static str {
        "audit_service"
    }
}
