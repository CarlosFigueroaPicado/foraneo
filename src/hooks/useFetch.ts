import { useEffect, useState } from 'react';

import type { RequestOptions } from '@services/http/apiClient';
import { apiFetch } from '@services/http/apiClient';

export function useFetch<TResponse>(path: string, options?: RequestOptions) {
  const [data, setData] = useState<TResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    apiFetch<TResponse>(path, options)
      .then((response: TResponse) => {
        if (mounted) {
          setData(response);
        }
      })
      .catch((err: Error) => {
        if (mounted) {
          setError(err);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return { data, loading, error };
}
