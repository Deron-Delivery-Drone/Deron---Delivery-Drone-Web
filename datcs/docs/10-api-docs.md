# DACTS API Docs (v1 foundation)

Base URL: `/api/v1`

## Health
### GET `/health`
Returns service status and UTC time.

## Legal zones
### GET `/legal-zones`
Returns currently loaded legal zones and source descriptor.

## Missions
### GET `/missions`
Returns in-memory mission list (development mode).

### POST `/missions`
Creates mission with legal validation.

Payload:
```json
{
  "vehicle_id": "DERON-001",
  "created_by": "ops@deron.vn",
  "waypoints": [
    { "lat": 10.76, "lng": 106.69 },
    { "lat": 10.77, "lng": 106.70 }
  ],
  "home_point": { "lat": 10.76, "lng": 106.69 },
  "landing_point": { "lat": 10.765, "lng": 106.695 }
}
```

Validation statuses:
- PASS
- CAUTION
- RESTRICTED
- BLOCKED

## Release metadata
### GET `/release-metadata`
Returns OS-specific download URLs.

## Realtime
### WS `/realtime/telemetry`
Streams mock telemetry packets each second.
