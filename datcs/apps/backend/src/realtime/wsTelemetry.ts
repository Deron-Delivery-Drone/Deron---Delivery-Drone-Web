import type { FastifyInstance } from 'fastify';

export async function registerTelemetrySocket(app: FastifyInstance) {
  app.get('/realtime/telemetry', { websocket: true }, (connection) => {
    const start = Date.now();
    const interval = setInterval(() => {
      const t = (Date.now() - start) / 1000;
      connection.send(
        JSON.stringify({
          vehicle_id: 'DERON-001',
          mode: 'AUTO',
          battery: Math.max(19, 95 - t * 0.1),
          heading: (t * 15) % 360,
          groundspeed: 12 + Math.sin(t * 0.3) * 2,
          position: { lat: 10.776 + Math.cos(t * 0.02) * 0.01, lng: 106.700 + Math.sin(t * 0.02) * 0.01 },
          ts: new Date().toISOString()
        })
      );
    }, 1000);

    connection.on('close', () => clearInterval(interval));
  });
}
