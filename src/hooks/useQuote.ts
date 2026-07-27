import { useCallback, useEffect, useState } from 'react';
import { fetchQuote } from '../services/api';
import type { Quote } from '../types';

export function useQuote(id: string | undefined) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetchQuote(id)
      .then(setQuote)
      .catch(() => setError('Devis introuvable.'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { quote, loading, error, reload };
}
