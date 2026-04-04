export type MissionValidationStatus = 'PASS' | 'CAUTION' | 'RESTRICTED' | 'BLOCKED';

export type MissionStatus =
  | 'draft'
  | 'validated'
  | 'blocked'
  | 'approved'
  | 'uploaded'
  | 'running'
  | 'paused'
  | 'completed'
  | 'aborted'
  | 'archived';

export type Role = 'admin' | 'operator' | 'viewer';

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface LegalZone {
  zone_id: string;
  zone_type: 'prohibited' | 'restricted' | 'caution';
  geometry: Coordinate[];
  source: string;
  effective_from: string;
  effective_to?: string;
  version: string;
  priority: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Mission {
  mission_id: string;
  vehicle_id: string;
  created_by: string;
  status: MissionStatus;
  waypoints: Coordinate[];
  home_point: Coordinate;
  landing_point: Coordinate;
  validation_status: MissionValidationStatus;
  validation_details: string[];
  created_at: string;
  updated_at: string;
  version: number;
}
