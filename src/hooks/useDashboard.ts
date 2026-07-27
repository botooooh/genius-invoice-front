import { useState, useEffect } from 'react';
import { fetchDashboardPipeline, fetchDashboardRevenue, fetchDashboardSummary } from '../services/api';
import { getApiKey } from '../services/apiKey';
import { isLoggedIn } from '../services/session';
import type { DashboardSummary, PipelineData, RevenuePoint } from '../types';

export function useDashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [pipeline, setPipeline] = useState<PipelineData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const hasApiKey = isLoggedIn() || Boolean(getApiKey());

  useEffect(() => {
    if (!hasApiKey) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([fetchDashboardSummary(), fetchDashboardRevenue(), fetchDashboardPipeline()])
      .then(([summaryData, revenueData, pipelineData]) => {
        if (cancelled) return;
        setSummary(summaryData);
        setRevenue(revenueData);
        setPipeline(pipelineData);
      })
      .catch(() => {
        if (!cancelled) setError('Impossible de charger le tableau de bord. Vérifiez votre clé API.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [hasApiKey]);

  return {
    summary,
    revenue,
    pipeline,
    error,
    loading,
    hasApiKey,
  };
}
