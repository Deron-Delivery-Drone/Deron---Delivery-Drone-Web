const colors = {
  prohibited: '#ea5d5d',
  restricted: '#e7a83f',
  caution: '#f2d35a'
};

function normalize(value, min, max, size, offset = 0) {
  return ((value - min) / (max - min + Number.EPSILON)) * size + offset;
}

export function MapLayerCard({ mission, telemetry, zones }) {
  const allPoints = [
    ...mission.waypoints.map((wp) => ({ lat: wp.lat, lng: wp.lng })),
    telemetry.position,
    ...zones.flatMap((zone) => zone.geometry)
  ];

  const latitudes = allPoints.map((p) => p.lat);
  const longitudes = allPoints.map((p) => p.lng);
  const minLat = Math.min(...latitudes) - 0.005;
  const maxLat = Math.max(...latitudes) + 0.005;
  const minLng = Math.min(...longitudes) - 0.005;
  const maxLng = Math.max(...longitudes) + 0.005;

  return (
    <article className="panel map-panel">
      <div className="panel-header">
        <h3>Operational Map (Mock Provider Abstraction Active)</h3>
        <span className="tag">Layer priority enforced</span>
      </div>
      <svg viewBox="0 0 820 420" className="map-svg" role="img" aria-label="Mission and legal zone map">
        <rect x="0" y="0" width="820" height="420" fill="#0f1725" />

        {zones.map((zone) => {
          const points = zone.geometry
            .map((point) => {
              const x = normalize(point.lng, minLng, maxLng, 780, 20);
              const y = 410 - normalize(point.lat, minLat, maxLat, 380, 20);
              return `${x},${y}`;
            })
            .join(' ');
          return (
            <polygon
              key={zone.zone_id}
              points={points}
              fill={`${colors[zone.zone_type]}44`}
              stroke={colors[zone.zone_type]}
              strokeWidth="2"
            />
          );
        })}

        <polyline
          points={mission.waypoints
            .map((wp) => {
              const x = normalize(wp.lng, minLng, maxLng, 780, 20);
              const y = 410 - normalize(wp.lat, minLat, maxLat, 380, 20);
              return `${x},${y}`;
            })
            .join(' ')}
          fill="none"
          stroke="#6ea8fe"
          strokeWidth="3"
        />

        {mission.waypoints.map((wp) => {
          const x = normalize(wp.lng, minLng, maxLng, 780, 20);
          const y = 410 - normalize(wp.lat, minLat, maxLat, 380, 20);
          return (
            <g key={wp.id}>
              <circle cx={x} cy={y} r="5" fill="#6ea8fe" />
              <text x={x + 8} y={y - 8} fill="#d7e3ff" fontSize="12">
                {wp.id}
              </text>
            </g>
          );
        })}

        <circle
          cx={normalize(telemetry.position.lng, minLng, maxLng, 780, 20)}
          cy={410 - normalize(telemetry.position.lat, minLat, maxLat, 380, 20)}
          r="7"
          fill="#35c26b"
        />
      </svg>
      <p className="muted">
        Layer stack: base map → telemetry → vehicle → route → landing points → legal airspace(locked high priority).
      </p>
    </article>
  );
}
