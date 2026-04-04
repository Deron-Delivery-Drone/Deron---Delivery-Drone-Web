import type { Coordinate, LegalZone, ValidationStatus } from '../../shared-types/src/index';

const rank: Record<ValidationStatus, number> = {
  PASS: 0,
  CAUTION: 1,
  RESTRICTED: 2,
  BLOCKED: 3
};

export interface ValidationResult {
  status: ValidationStatus;
  details: string[];
}

export function validateRoute(waypoints: Coordinate[], zones: LegalZone[]): ValidationResult {
  let status: ValidationStatus = 'PASS';
  const details: string[] = [];

  const pointInPolygon = (point: Coordinate, polygon: Coordinate[]) => {
    let inside = false;
    const x = point.lng;
    const y = point.lat;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].lng;
      const yi = polygon[i].lat;
      const xj = polygon[j].lng;
      const yj = polygon[j].lat;
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi + Number.EPSILON) + xi) inside = !inside;
    }
    return inside;
  };

  for (const wp of waypoints) {
    for (const zone of zones) {
      if (!pointInPolygon(wp, zone.geometry)) continue;
      const zoneStatus: ValidationStatus =
        zone.zone_type === 'prohibited' ? 'BLOCKED' : zone.zone_type === 'restricted' ? 'RESTRICTED' : 'CAUTION';
      if (rank[zoneStatus] > rank[status]) status = zoneStatus;
      details.push(`Waypoint at ${wp.lat},${wp.lng} intersects zone ${zone.zone_id}`);
    }
  }

  return { status, details: details.length ? details : ['No legal conflicts.'] };
}
