// connection_manager.rs

// This module handles the management of multiple vehicle connections, providing
// automatic failover and health monitoring functionality.

use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::{Duration, Instant};

#[derive(Debug)]
pub struct ConnectionManager {
    connections: Arc<Mutex<HashMap<String, VehicleConnection>>>,
    health_check_interval: Duration,
}

#[derive(Debug)]
struct VehicleConnection {
    id: String,
    last_heartbeat: Instant,
    active: bool,
}

impl ConnectionManager {
    pub fn new(health_check_interval: Duration) -> Self {
        Self {
            connections: Arc::new(Mutex::new(HashMap::new())),
            health_check_interval,
        }
    }

    pub fn add_vehicle(&self, id: String) {
        let mut connections = self.connections.lock().unwrap();
        connections.insert(id.clone(), VehicleConnection {
            id,
            last_heartbeat: Instant::now(),
            active: true,
        });
    }

    pub fn remove_vehicle(&self, id: &str) {
        let mut connections = self.connections.lock().unwrap();
        connections.remove(id);
    }

    pub fn receive_heartbeat(&self, id: &str) {
        let mut connections = self.connections.lock().unwrap();
        if let Some(connection) = connections.get_mut(id) {
            connection.last_heartbeat = Instant::now();
            connection.active = true;
        }
    }

    pub fn health_monitor(&self) {
        let connections = Arc::clone(&self.connections);
        let interval = self.health_check_interval;
        thread::spawn(move || loop {
            thread::sleep(interval);
            let mut connections = connections.lock().unwrap();
            let now = Instant::now();
            for connection in connections.values_mut() {
                if now.duration_since(connection.last_heartbeat) > interval {
                    connection.active = false;
                    println!("Vehicle {} is inactive, switching to failover mode.", connection.id);
                }
            }
        });
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::time::Duration;

    #[test]
    fn test_connection_manager() {
        let manager = ConnectionManager::new(Duration::from_secs(5));
        manager.add_vehicle("drone_1".to_string());

        // Simulate heartbeat
        manager.receive_heartbeat("drone_1");
        assert_eq!(manager.connections.lock().unwrap().get("drone_1").unwrap().active, true);

        // Wait for health check
        thread::sleep(Duration::from_secs(6));
        assert_eq!(manager.connections.lock().unwrap().get("drone_1").unwrap().active, false);
    }
}