export function SafetyModule({ telemetry, legalValidation }) {
  const alerts = [
    telemetry.battery < 25 ? 'LOW_BATTERY' : null,
    telemetry.linkQuality < 45 ? 'CONNECTION_DEGRADED' : null,
    telemetry.gps !== 'RTK_FLOAT' ? 'GPS_DEGRADED' : null,
    legalValidation.status === 'BLOCKED' ? 'BLOCKED_ZONE_ENTRY' : null
  ].filter(Boolean);

  return (
    <section className="module">
      <h2>Safety + UTM Enforcement</h2>
      <div className="panel-grid tri">
        <article className="panel">
          <h3>Active Alerts</h3>
          {alerts.length ? (
            <ul>
              {alerts.map((alert) => (
                <li key={alert} className="alert critical">
                  {alert}
                </li>
              ))}
            </ul>
          ) : (
            <p className="badge badge-pass">No active safety alerts.</p>
          )}
        </article>
        <article className="panel">
          <h3>Authority Boundaries</h3>
          <ul>
            <li>DACTS: command + planning + supervision only</li>
            <li>DMA: onboard authority chain remains intact</li>
            <li>No raw actuator path from UI</li>
            <li>Safety MCU retains final kill authority</li>
          </ul>
        </article>
        <article className="panel">
          <h3>Preflight Gate</h3>
          <p>
            Legal gate status: <strong>{legalValidation.status}</strong>
          </p>
          <p>BLOCKED: cannot arm/launch by default.</p>
          <p>RESTRICTED: explicit approval workflow required.</p>
          <p>CAUTION: warning and acknowledgement required.</p>
        </article>
      </div>
    </section>
  );
}
