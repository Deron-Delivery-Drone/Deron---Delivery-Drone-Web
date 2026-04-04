export const mockMission = {
  mission_id: 'MIS-001',
  vehicle_id: 'DERON-001',
  created_by: 'ops.lead@deron.vn',
  status: 'draft',
  waypoints: [
    { id: 'WP1', lat: 10.765, lng: 106.695, alt_m: 35 },
    { id: 'WP2', lat: 10.778, lng: 106.701, alt_m: 40 },
    { id: 'WP3', lat: 10.804, lng: 106.661, alt_m: 40 }
  ],
  home_point: { lat: 10.765, lng: 106.695 },
  landing_point: { lat: 10.771, lng: 106.704 },
  validation_status: 'PASS',
  validation_details: [],
  created_at: '2026-04-04T00:00:00Z',
  updated_at: '2026-04-04T00:00:00Z',
  version: 1
};
