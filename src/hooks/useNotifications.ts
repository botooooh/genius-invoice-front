import { useCallback, useEffect, useState } from 'react';
import { fetchNotifications, fetchReminders, type Paginated } from '../services/api';
import type { Notification, Reminder } from '../types';

export function useNotifications() {
  const [result, setResult] = useState<Paginated<Notification>>({ items: [], meta: null });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchNotifications({ page, per_page: 20 })
      .then(setResult)
      .catch(() => setError('Impossible de charger les notifications.'))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { ...result, page, setPage, loading, error, reload };
}

export function useReminders() {
  const [result, setResult] = useState<Paginated<Reminder>>({ items: [], meta: null });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchReminders({ page, per_page: 20 })
      .then(setResult)
      .catch(() => setError('Impossible de charger les relances.'))
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { ...result, page, setPage, loading, error, reload };
}
