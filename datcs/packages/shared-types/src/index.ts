export type Role = 'admin' | 'operator' | 'viewer';

export type ValidationStatus = 'PASS' | 'CAUTION' | 'RESTRICTED' | 'BLOCKED';

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
  effective_to?: string | null;
  version: string;
  priority: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}
