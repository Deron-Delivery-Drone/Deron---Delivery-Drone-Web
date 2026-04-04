export const severityOrder = {
  PASS: 0,
  CAUTION: 1,
  RESTRICTED: 2,
  BLOCKED: 3
};

function pointInPolygon(point, polygon) {
  let inside = false;
  const [x, y] = [point.lng, point.lat];
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng;
    const yi = polygon[i].lat;
    const xj = polygon[j].lng;
    const yj = polygon[j].lat;
    const hit = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi + Number.EPSILON) + xi;
    if (hit) inside = !inside;
  }
  return inside;
}

export function validateMissionAgainstLegalZones(waypoints, zones) {
  let status = 'PASS';
  const details = [];

  for (const wp of waypoints) {
    for (const zone of zones) {
      if (!pointInPolygon(wp, zone.geometry)) continue;

      const zoneStatus =
        zone.zone_type === 'prohibited' ? 'BLOCKED' : zone.zone_type === 'restricted' ? 'RESTRICTED' : 'CAUTION';

      if (severityOrder[zoneStatus] > severityOrder[status]) {
        status = zoneStatus;
      }

      details.push(`Waypoint ${wp.id} intersects ${zone.zone_type.toUpperCase()} zone ${zone.zone_id}.`);
    }
  }

  return {
    status,
    details: details.length ? details : ['Mission path clear of active legal zones.']
  };
}
