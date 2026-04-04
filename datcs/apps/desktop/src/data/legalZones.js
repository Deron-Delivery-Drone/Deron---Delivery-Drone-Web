export const legalZones = [
  {
    zone_id: 'VN-PROHIBITED-001',
    zone_type: 'prohibited',
    geometry: [
      { lat: 10.797, lng: 106.648 },
      { lat: 10.822, lng: 106.648 },
      { lat: 10.822, lng: 106.678 },
      { lat: 10.797, lng: 106.678 }
    ],
    source: 'dev-placeholder-geojson',
    effective_from: '2026-01-01T00:00:00Z',
    effective_to: null,
    version: 'dev-v1',
    priority: 100,
    notes: 'Placeholder only. Replace with official Vietnam legal feed.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    zone_id: 'VN-RESTRICTED-001',
    zone_type: 'restricted',
    geometry: [
      { lat: 10.77, lng: 106.68 },
      { lat: 10.79, lng: 106.68 },
      { lat: 10.79, lng: 106.71 },
      { lat: 10.77, lng: 106.71 }
    ],
    source: 'dev-placeholder-geojson',
    effective_from: '2026-01-01T00:00:00Z',
    effective_to: null,
    version: 'dev-v1',
    priority: 80,
    notes: 'Placeholder only. Replace with official Vietnam legal feed.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    zone_id: 'VN-CAUTION-001',
    zone_type: 'caution',
    geometry: [
      { lat: 10.752, lng: 106.715 },
      { lat: 10.775, lng: 106.715 },
      { lat: 10.775, lng: 106.742 },
      { lat: 10.752, lng: 106.742 }
    ],
    source: 'dev-placeholder-geojson',
    effective_from: '2026-01-01T00:00:00Z',
    effective_to: null,
    version: 'dev-v1',
    priority: 60,
    notes: 'Placeholder only. Replace with official Vietnam legal feed.',
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  }
];
