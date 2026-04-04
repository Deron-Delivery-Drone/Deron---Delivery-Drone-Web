import { useEffect, useState } from 'react';

const seed = {
  vehicle_id: 'DERON-001',
  mode: 'AUTO',
  armed: true,
  gps: 'RTK_FLOAT',
  battery: 92,
  sats: 18,
  linkQuality: 96,
  groundspeed: 12,
  altitude: 35,
  heading: 120,
  missionTimeSec: 0,
  position: { lat: 10.765, lng: 106.695 }
};

export function useMockTelemetry() {
  const [state, setState] = useState(seed);

  useEffect(() => {
    const started = Date.now();
    const timer = setInterval(() => {
      const t = (Date.now() - started) / 1000;
      setState((prev) => ({
        ...prev,
        battery: Math.max(19, Number((prev.battery - 0.03).toFixed(2))),
        sats: 16 + Math.round(Math.sin(t * 0.2) * 3),
        linkQuality: Math.max(30, Math.round(90 + Math.sin(t * 0.35) * 8)),
        groundspeed: Number((12 + Math.sin(t * 0.35) * 2.1).toFixed(2)),
        altitude: Number((35 + Math.sin(t * 0.1) * 3).toFixed(2)),
        heading: (prev.heading + 5) % 360,
        missionTimeSec: Math.floor(t),
        position: {
          lat: 10.765 + Math.sin(t * 0.02) * 0.02,
          lng: 106.695 + Math.cos(t * 0.02) * 0.02
        },
        gps: t % 45 > 35 ? 'GNSS_DEGRADED' : 'RTK_FLOAT'
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return state;
}
