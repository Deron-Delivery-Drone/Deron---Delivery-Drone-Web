import { z } from 'zod';

export const coordinateSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180)
});

export const missionCreateSchema = z.object({
  vehicle_id: z.string().min(1),
  created_by: z.string().min(1),
  waypoints: z.array(coordinateSchema).min(2),
  home_point: coordinateSchema,
  landing_point: coordinateSchema
});

export type MissionCreateInput = z.infer<typeof missionCreateSchema>;
