import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import { OverviewModule } from '../modules/overview/OverviewModule';
import { FleetModule } from '../modules/fleet/FleetModule';
import { MissionModule } from '../modules/mission/MissionModule';
import { SafetyModule } from '../modules/safety/SafetyModule';
import { EngineeringModule } from '../modules/engineering/EngineeringModule';
import { LogsModule } from '../modules/logs/LogsModule';
import { loadDesktopHealth } from '../services/desktopHealth';

const navItems = [
  ['/', 'Overview'],
  ['/fleet', 'Fleet'],
  ['/mission', 'Mission'],
  ['/safety', 'Safety'],
  ['/engineering', 'Engineering'],
  ['/logs', 'Logs']
];

export function AppShell() {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    loadDesktopHealth().then(setHealth);
  }, []);

  return (
    <div className="layout">
      <aside className="left-rail">
        <h1>DATCS</h1>
        <p className="subtitle">Deron Air Traffic Control Station</p>
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
          <span>Authority: Mission supervision only (no motor authority)</span>
          <span>Sync: Local persistence enabled</span>
          <span>Safety: Human-in-the-loop required</span>
        </header>
        <section className="status-strip">
          <span>Shell: {health?.shell ?? 'loading'}</span>
          <span>Backend: {health?.backend?.status ?? 'loading'}</span>
          <span>DB: {health?.backend?.db ?? 'resolving'}</span>
        </section>
        <Routes>
          <Route path="/" element={<OverviewModule />} />
          <Route path="/fleet" element={<FleetModule />} />
          <Route path="/mission" element={<MissionModule />} />
          <Route path="/safety" element={<SafetyModule />} />
          <Route path="/engineering" element={<EngineeringModule />} />
          <Route path="/logs" element={<LogsModule />} />
        </Routes>
      </main>
      <aside className="inspector">
        <h2>Inspector</h2>
        <p>Authority Boundary: DMA supervised mission layer</p>
        <p>Current lock: Mission draft template</p>
        <p>Health timestamp: {health?.backend?.time_utc ?? 'loading...'}</p>
      </aside>
    </div>
  );
}
