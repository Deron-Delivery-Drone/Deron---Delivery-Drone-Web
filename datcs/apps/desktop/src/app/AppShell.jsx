import { NavLink, Route, Routes } from 'react-router-dom';
import { OverviewModule } from '../modules/overview/OverviewModule';
import { FleetModule } from '../modules/fleet/FleetModule';
import { MissionModule } from '../modules/mission/MissionModule';
import { SafetyModule } from '../modules/safety/SafetyModule';
import { EngineeringModule } from '../modules/engineering/EngineeringModule';
import { LogsModule } from '../modules/logs/LogsModule';

const navItems = [
  ['/', 'Overview'],
  ['/fleet', 'Fleet'],
  ['/mission', 'Mission'],
  ['/safety', 'Safety'],
  ['/engineering', 'Engineering'],
  ['/logs', 'Logs']
];

export function AppShell() {
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
          <span>Authority: Level 1 • Trusted Desktop</span>
          <span>Sync: Local Saved</span>
          <span>Safety: Advisory</span>
        </header>
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
        <p>Object: Mission DRAFT-2026-041</p>
        <p>Lock: Held by Operator-HN-04</p>
        <p>Last change: 2026-04-04T09:00:00Z</p>
      </aside>
    </div>
  );
}
