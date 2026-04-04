use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ObjectState {
    Draft,
    Active,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VersionStamp {
    pub version_id: String,
    pub changed_by: String,
    pub changed_device: String,
    pub change_reason: String,
    pub changed_at_utc: String,
}
