import Fastify from 'fastify';
import cors from '@fastify/cors';
import websocket from '@fastify/websocket';
import { env } from './config/env.js';
import { healthRoutes } from './routes/healthRoutes.js';
import { missionRoutes } from './routes/missionRoutes.js';
import { legalZoneRoutes } from './routes/legalZoneRoutes.js';
import { registerTelemetrySocket } from './realtime/wsTelemetry.js';

const app = Fastify({ logger: true });
await app.register(cors, { origin: env.corsOrigin });
await app.register(websocket);

app.get('/api/v1/release-metadata', async () => ({
  windows: process.env.DACTS_DOWNLOAD_WINDOWS ?? '',
  macos: process.env.DACTS_DOWNLOAD_MACOS ?? '',
  linux: process.env.DACTS_DOWNLOAD_LINUX ?? '',
  updated_at: new Date().toISOString()
}));

await app.register(async (v1) => {
  await healthRoutes(v1);
  await missionRoutes(v1);
  await legalZoneRoutes(v1);
}, { prefix: '/api/v1' });

await registerTelemetrySocket(app);

app.listen({ host: env.host, port: env.port }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
