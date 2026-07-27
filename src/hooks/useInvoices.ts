import { useCallback, useEffect, useState } from 'react';
import { fetchInvoices, type Paginated } from '../services/api';
import type { Invoice } from '../types';

export function useInvoices(statusFilter: string) {
  const [result, setResult] = useState<Paginated<Invoice>>({ items: [], meta: null });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchInvoices({ page, per_page: 20, status_filter: statusFilter || undefined })
      .then(setResult)
      .catch(() => setError('Impossible de charger les factures.'))
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
