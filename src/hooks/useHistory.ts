import { useCallback, useEffect, useState } from 'react';
import {
  fetchHistoryInvoices,
  fetchHistoryPayments,
  fetchHistoryQuotes,
  searchHistory,
  type Paginated,
} from '../services/api';
import type { HistoryInvoice, HistoryPayment, HistoryQuote, UnifiedDocument } from '../types';

export type HistoryTab = 'quotes' | 'invoices' | 'payments';

export function useHistoryTab(tab: HistoryTab) {
  const [quotes, setQuotes] = useState<Paginated<HistoryQuote>>({ items: [], meta: null });
  const [invoices, setInvoices] = useState<Paginated<HistoryInvoice>>({ items: [], meta: null });
  const [payments, setPayments] = useState<Paginated<HistoryPayment>>({ items: [], meta: null });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    const params = { page, per_page: 20 };
    const request =
      tab === 'quotes' ? fetchHistoryQuotes(params).then(setQuotes)
      : tab === 'invoices' ? fetchHistoryInvoices(params).then(setInvoices)
      : fetchHistoryPayments(params).then(setPayments);

    request.catch(() => setError("Impossible de charger l'historique.")).finally(() => setLoading(false));
  }, [tab, page]);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    setPage(1);
  }, [tab]);

  const meta = tab === 'quotes' ? quotes.meta : tab === 'invoices' ? invoices.meta : payments.meta;

  return { quotes: quotes.items, invoices: invoices.items, payments: payments.items, meta, page, setPage, loading, error };
}

export function useHistorySearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UnifiedDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function runSearch(q: string) {
    setQuery(q);
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError(null);
    searchHistory(q)
      .then((res) => setResults(res.items))
      .catch(() => setError('Recherche impossible.'))
      .finally(() => setLoading(false));
  }

  return { query, results, loading, error, runSearch };
}
