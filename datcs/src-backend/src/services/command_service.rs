#[derive(Debug, Default, Clone)]
pub struct CommandService;

impl CommandService {
    pub fn service_name(&self) -> &'static str {
        "command_service"
    }
}
