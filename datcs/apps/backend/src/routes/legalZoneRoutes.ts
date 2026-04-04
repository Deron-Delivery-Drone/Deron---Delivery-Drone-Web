import type { FastifyInstance } from 'fastify';
import { legalZones } from '../services/legalZoneService.js';

export async function legalZoneRoutes(app: FastifyInstance) {
  app.get('/legal-zones', async () => ({ data: legalZones, source: 'placeholder-dev-geojson' }));
}
