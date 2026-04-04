PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS devices (
  id TEXT PRIMARY KEY,
  device_name TEXT NOT NULL,
  trust_grade TEXT NOT NULL,
  registered_at_utc TEXT NOT NULL,
  last_seen_utc TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  device_id TEXT NOT NULL,
  capability_level INTEGER NOT NULL,
  started_at_utc TEXT NOT NULL,
  ended_at_utc TEXT,
  FOREIGN KEY(device_id) REFERENCES devices(id)
);

CREATE TABLE IF NOT EXISTS missions (
  id TEXT PRIMARY KEY,
  mission_code TEXT NOT NULL UNIQUE,
  state TEXT NOT NULL,
  draft_payload_json TEXT,
  active_payload_json TEXT,
  updated_at_utc TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS object_versions (
  id TEXT PRIMARY KEY,
  object_type TEXT NOT NULL,
  object_id TEXT NOT NULL,
  state TEXT NOT NULL,
  old_value_json TEXT,
  new_value_json TEXT NOT NULL,
  changed_by TEXT NOT NULL,
  changed_device TEXT NOT NULL,
  change_reason TEXT NOT NULL,
  changed_at_utc TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_events (
  id TEXT PRIMARY KEY,
  actor_user_id TEXT NOT NULL,
  actor_device_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  created_at_utc TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS safety_events (
  id TEXT PRIMARY KEY,
  severity TEXT NOT NULL,
  source TEXT NOT NULL,
  description TEXT NOT NULL,
  acknowledged_by TEXT,
  created_at_utc TEXT NOT NULL
);
