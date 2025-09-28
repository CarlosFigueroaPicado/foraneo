export type HealthStatus = {
  status: 'ok' | 'degraded' | 'down';
  timestamp: string;
};
