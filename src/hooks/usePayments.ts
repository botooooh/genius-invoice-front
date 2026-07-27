import { useCallback, useEffect, useState } from 'react';
import { fetchEscrows, fetchPayments, type Paginated } from '../services/api';
import type { Escrow, Payment } from '../types';

export function usePayments() {
  const [result, setResult] = useState<Paginated<Payment>>({ items: [], meta: null });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchPayments({ page, per_page: 20 })
      .then(setResult)
      .catch(() => setError('Impossible de charger les paiements.'))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { ...result, page, setPage, loading, error, reload };
}

export function useEscrows() {
  const [escrows, setEscrows] = useState<Escrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchEscrows()
      .then(setEscrows)
      .catch(() => setError('Impossible de charger les séquestres.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { escrows, loading, error, reload };
}
