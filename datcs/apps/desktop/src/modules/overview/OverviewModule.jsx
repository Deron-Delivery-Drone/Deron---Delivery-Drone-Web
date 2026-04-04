import { MapLayerCard } from '../../components/MapLayerCard';

export function OverviewModule({ telemetry, mission, legalValidation, legalZones }) {
  return (
    <section className="module">
      <h2>Mission Control Overview</h2>
      <div className="panel-grid tri">
        <article className="panel">
          <h3>Vehicle Status Bar</h3>
          <ul>
            <li>Connection: {telemetry.linkQuality}%</li>
            <li>Mode: {telemetry.mode}</li>
            <li>Armed: {telemetry.armed ? 'Yes' : 'No'}</li>
            <li>GPS: {telemetry.gps}</li>
            <li>Battery: {telemetry.battery}%</li>
            <li>Sats: {telemetry.sats}</li>
            <li>Mission Time: {telemetry.missionTimeSec}s</li>
          </ul>
        </article>
        <article className="panel">
          <h3>Telemetry Panel</h3>
          <ul>
            <li>Groundspeed: {telemetry.groundspeed} m/s</li>
            <li>Altitude: {telemetry.altitude} m</li>
            <li>Heading: {telemetry.heading.toFixed(0)}°</li>
            <li>
              Position: {telemetry.position.lat.toFixed(5)}, {telemetry.position.lng.toFixed(5)}
            </li>
          </ul>
        </article>
        <article className="panel">
          <h3>Legal Validation</h3>
          <p className={`badge badge-${legalValidation.status.toLowerCase()}`}>{legalValidation.status}</p>
          <ul>
            {legalValidation.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </article>
      </div>
      <MapLayerCard mission={mission} telemetry={telemetry} zones={legalZones} />
    </section>
  );
}
