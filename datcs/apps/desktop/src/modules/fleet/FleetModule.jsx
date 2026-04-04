export function FleetModule({ telemetry }) {
  return (
    <section className="module">
      <h2>Fleet Domain</h2>
      <div className="panel-grid tri">
        <article className="panel">
          <h3>Vehicle Summary</h3>
          <table className="dense-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Mode</th>
                <th>Battery</th>
                <th>Link</th>
                <th>GPS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{telemetry.vehicle_id}</td>
                <td>{telemetry.mode}</td>
                <td>{telemetry.battery}%</td>
                <td>{telemetry.linkQuality}%</td>
                <td>{telemetry.gps}</td>
              </tr>
            </tbody>
          </table>
        </article>
        <article className="panel">
          <h3>Assignment State</h3>
          <p>Current assignment: urban corridor monitoring.</p>
          <p>Connectivity: {telemetry.linkQuality > 50 ? 'Nominal' : 'Degraded'}.</p>
        </article>
        <article className="panel">
          <h3>Future Conflict Engine Hook</h3>
          <p>Trajectory slots and corridor reservation are scaffolded for multi-vehicle UTM in vNext.</p>
        </article>
      </div>
    </section>
  );
}
