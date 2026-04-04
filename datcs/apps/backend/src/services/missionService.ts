import { randomUUID } from 'node:crypto';
import type { Mission, MissionValidationStatus } from '../domains/types.js';
import type { MissionCreateInput } from '../schemas/missionSchemas.js';
import { legalZones } from './legalZoneService.js';

const missions: Mission[] = [];

function pointInZone(lat: number, lng: number, polygon: { lat: number; lng: number }[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng;
    const yi = polygon[i].lat;
    const xj = polygon[j].lng;
    const yj = polygon[j].lat;
    const intersects = yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi + Number.EPSILON) + xi;
    if (intersects) inside = !inside;
  }
  return inside;
}

function evaluateValidation(input: MissionCreateInput): { status: MissionValidationStatus; details: string[] } {
  const details: string[] = [];
  let status: MissionValidationStatus = 'PASS';

  for (const wp of input.waypoints) {
    for (const zone of legalZones) {
      if (!pointInZone(wp.lat, wp.lng, zone.geometry)) continue;
      if (zone.zone_type === 'prohibited') {
        status = 'BLOCKED';
        details.push(`Waypoint intersects prohibited zone ${zone.zone_id}`);
      } else if (zone.zone_type === 'restricted' && status !== 'BLOCKED') {
        status = 'RESTRICTED';
        details.push(`Waypoint intersects restricted zone ${zone.zone_id}`);
      } else if (zone.zone_type === 'caution' && status === 'PASS') {
        status = 'CAUTION';
        details.push(`Waypoint intersects caution zone ${zone.zone_id}`);
      }
    }
  }

  return { status, details: details.length ? details : ['Route clear against active legal zones.'] };
}

export function createMission(input: MissionCreateInput): Mission {
  const now = new Date().toISOString();
  const validation = evaluateValidation(input);
  const status = validation.status === 'BLOCKED' ? 'blocked' : validation.status === 'PASS' ? 'validated' : 'draft';

  const mission: Mission = {
    mission_id: randomUUID(),
    vehicle_id: input.vehicle_id,
    created_by: input.created_by,
    status,
    waypoints: input.waypoints,
    home_point: input.home_point,
    landing_point: input.landing_point,
    validation_status: validation.status,
    validation_details: validation.details,
    created_at: now,
    updated_at: now,
    version: 1
  };

  missions.push(mission);
  return mission;
}

export function listMissions() {
  return missions;
}
