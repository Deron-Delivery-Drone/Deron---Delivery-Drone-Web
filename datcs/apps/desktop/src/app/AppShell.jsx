import { useEffect, useMemo, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { OverviewModule } from '../modules/overview/OverviewModule';
import { FleetModule } from '../modules/fleet/FleetModule';
import { MissionModule } from '../modules/mission/MissionModule';
import { SafetyModule } from '../modules/safety/SafetyModule';
import { EngineeringModule } from '../modules/engineering/EngineeringModule';
import { LogsModule } from '../modules/logs/LogsModule';
import { loadDesktopHealth } from '../services/desktopHealth';
import { useMockTelemetry } from '../hooks/useMockTelemetry';
import { legalZones } from '../data/legalZones';
import { mockMission } from '../data/mockMission';
import { validateMissionAgainstLegalZones } from '../core/legalEngine';

const navItems = [
  ['/', 'Overview'],
  ['/fleet', 'Fleet'],
  ['/mission', 'Mission'],
  ['/safety', 'Safety + UTM'],
  ['/engineering', 'Engineering'],
  ['/logs', 'Logs']
];

export function AppShell() {
  const [health, setHealth] = useState(null);
  const telemetry = useMockTelemetry();

  useEffect(() => {
    loadDesktopHealth().then(setHealth);
  }, []);

  const legalValidation = useMemo(
    () => validateMissionAgainstLegalZones(mockMission.waypoints, legalZones),
    []
  );

  return (
    <div className="layout">
      <aside className="left-rail">
        <h1>DACTS</h1>
        <p className="subtitle">Deron Autonomous Command & Traffic System</p>
        <nav>
          {navItems.map(([path, label]) => (
            <NavLink key={path} to={path} end={path === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="work-canvas">
        <header className="top-bar">
          <span>Human Safety {'>'} Legal {'>'} System {'>'} Mission {'>'} Asset {'>'} Convenience</span>
          <span>Authority: DACTS supervises. DMA executes.</span>
          <span>Data mode: MOCK (explicit)</span>
        </header>
        <section className="status-strip">
          <span>Shell: {health?.shell ?? 'loading'}</span>
          <span>Backend: {health?.backend?.status ?? 'loading'}</span>
          <span>DB: {health?.backend?.db ?? 'resolving'}</span>
          <span>Vehicle: {telemetry.vehicle_id}</span>
          <span>Link: {telemetry.linkQuality}%</span>
          <span>Legal Gate: {legalValidation.status}</span>
        </section>
        <Routes>
          <Route
            path="/"
            element={
              <OverviewModule
                telemetry={telemetry}
                mission={mockMission}
                legalValidation={legalValidation}
                legalZones={legalZones}
              />
            }
          />
          <Route path="/fleet" element={<FleetModule telemetry={telemetry} />} />
          <Route path="/mission" element={<MissionModule mission={mockMission} legalValidation={legalValidation} />} />
          <Route path="/safety" element={<SafetyModule telemetry={telemetry} legalValidation={legalValidation} />} />
          <Route path="/engineering" element={<EngineeringModule />} />
          <Route path="/logs" element={<LogsModule legalValidation={legalValidation} />} />
        </Routes>
      </main>
      <aside className="inspector">
        <h2>Inspector</h2>
        <p>Legal zone source: {legalZones[0].source}</p>
        <p>Validation status: {legalValidation.status}</p>
        <p>Position: {telemetry.position.lat.toFixed(5)}, {telemetry.position.lng.toFixed(5)}</p>
        <p>Health timestamp: {health?.backend?.time_utc ?? 'loading...'}</p>
      </aside>
    </div>
  );
}
