import type { HealthStatus } from '@types/api/health';
import { apiFetch } from '@services/http/apiClient';

export function fetchHealthStatus() {
  return apiFetch<HealthStatus>('/health');
}
