import 'dotenv/config';

export const env = {
  host: process.env.DACTS_BACKEND_HOST ?? '0.0.0.0',
  port: Number(process.env.DACTS_BACKEND_PORT ?? 4300),
  corsOrigin: process.env.DACTS_CORS_ORIGIN ?? '*',
  supabaseUrl: process.env.SUPABASE_URL ?? '',
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY ?? '',
  supabaseServiceRole: process.env.SUPABASE_SERVICE_ROLE ?? ''
};
