import { invoke } from '@tauri-apps/api/core';

export async function loadDesktopHealth() {
  try {
    return await invoke('health_signal_cmd');
  } catch {
    return {
      shell: 'datcs-desktop',
      status: 'degraded',
      backend: {
        service: 'datcs-backend',
        status: 'offline',
        db: 'unavailable (web mode)',
        time_utc: new Date().toISOString()
      }
    };
  }
}
