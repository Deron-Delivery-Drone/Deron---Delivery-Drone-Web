import type { FastifyInstance } from 'fastify';
import { missionCreateSchema } from '../schemas/missionSchemas.js';
import { createMission, listMissions } from '../services/missionService.js';

export async function missionRoutes(app: FastifyInstance) {
  app.get('/missions', async () => ({ data: listMissions() }));

  app.post('/missions', async (request, reply) => {
    const parsed = missionCreateSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.code(400).send({ error: 'invalid_mission_payload', details: parsed.error.flatten() });
    }

    const mission = createMission(parsed.data);
    return reply.code(201).send({ data: mission });
  });
}
