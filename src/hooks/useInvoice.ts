import { useCallback, useEffect, useState } from 'react';
import { fetchInvoice } from '../services/api';
import type { Invoice } from '../types';

export function useInvoice(id: string | undefined) {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetchInvoice(id)
      .then(setInvoice)
      .catch(() => setError('Facture introuvable.'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { invoice, loading, error, reload };
}
