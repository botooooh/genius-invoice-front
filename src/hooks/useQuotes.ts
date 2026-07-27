import { useCallback, useEffect, useState } from 'react';
import { fetchQuotes, type Paginated } from '../services/api';
import type { Quote } from '../types';

export function useQuotes(statusFilter: string) {
  const [result, setResult] = useState<Paginated<Quote>>({ items: [], meta: null });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchQuotes({ page, per_page: 20, status_filter: statusFilter || undefined })
      .then(setResult)
      .catch(() => setError('Impossible de charger les devis.'))
      .finally(() => setLoading(false));
  }, [page, statusFilter]);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  return { ...result, page, setPage, loading, error, reload };
}
