export function MissionModule({ mission, legalValidation }) {
  const blocked = legalValidation.status === 'BLOCKED';

  return (
    <section className="module">
      <h2>Mission Domain</h2>
      <div className="panel-grid tri">
        <article className="panel">
          <h3>Mission Controls</h3>
          <div className="button-grid">
            <button disabled={blocked}>Arm</button>
            <button>Disarm</button>
            <button disabled={blocked}>Takeoff</button>
            <button>Pause</button>
            <button>RTL</button>
            <button>Upload Mission</button>
            <button disabled={blocked}>Start Mission</button>
            <button>Cancel Mission</button>
          </div>
          {blocked && (
            <p className="alert critical">Launch is blocked by legal airspace policy. Manual override is not allowed by default.</p>
          )}
        </article>
        <article className="panel">
          <h3>Mission Metadata</h3>
          <ul>
            <li>Mission ID: {mission.mission_id}</li>
            <li>Vehicle: {mission.vehicle_id}</li>
            <li>Status: {mission.status}</li>
            <li>Validation: {legalValidation.status}</li>
            <li>Version: {mission.version}</li>
          </ul>
        </article>
        <article className="panel">
          <h3>Waypoints</h3>
          <ol>
            {mission.waypoints.map((wp) => (
              <li key={wp.id}>
                {wp.id}: {wp.lat.toFixed(5)}, {wp.lng.toFixed(5)} @ {wp.alt_m}m
              </li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  );
}
