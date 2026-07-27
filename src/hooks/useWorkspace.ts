import { useCallback, useEffect, useState } from 'react';
import { fetchWorkspace } from '../services/api';
import type { Workspace } from '../types';

export function useWorkspace() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchWorkspace()
      .then(setWorkspace)
      .catch(() => setError("Impossible de charger l'espace de travail."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { workspace, loading, error, reload };
}
