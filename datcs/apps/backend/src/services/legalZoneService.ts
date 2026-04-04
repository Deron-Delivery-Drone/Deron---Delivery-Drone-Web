import type { LegalZone } from '../domains/types.js';

const now = new Date().toISOString();

export const legalZones: LegalZone[] = [
  {
    zone_id: 'vn-hcm-airport-prohibited',
    zone_type: 'prohibited',
    geometry: [
      { lat: 10.798, lng: 106.645 },
      { lat: 10.818, lng: 106.645 },
      { lat: 10.818, lng: 106.676 },
      { lat: 10.798, lng: 106.676 }
    ],
    source: 'placeholder-dev-geojson',
    effective_from: now,
    version: 'dev-v1',
    priority: 100,
    notes: 'Development placeholder. Replace with official VN data.',
    created_at: now,
    updated_at: now
  }
];
