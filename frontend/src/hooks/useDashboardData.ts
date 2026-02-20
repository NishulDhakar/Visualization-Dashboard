'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchData } from '@/lib/api';
import type { DataRecord, EnrichedDataRecord, Filters, FilterOptions, SwotLabel } from '../types/data';

const DEFAULT_FILTERS: Filters = {
  end_year: '', topic: '', sector: '', region: '',
  pestle: '', source: '', swot: '', country: '', city: '',
  intensity_min: '', likelihood_min: '',
};

function deriveSwot(r: DataRecord): SwotLabel {
  const score = (r.intensity ?? 0) * 0.4 + (r.likelihood ?? 0) * 0.35 + (r.relevance ?? 0) * 0.25;
  if (score >= 8) return 'Strength';
  if (score >= 5) return 'Opportunity';
  if (score >= 3) return 'Weakness';
  return 'Threat';
}

function unique(arr: string[]): string[] {
  return Array.from(new Set(arr.filter(Boolean))).sort();
}

export function useDashboardData() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [allRecords, setAllRecords] = useState<EnrichedDataRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchData({}, 1, 1000);
      const enriched: EnrichedDataRecord[] = res.data.map((r) => ({
        ...r,
        swot: deriveSwot(r),
        city: r.city ?? '',
      }));
      setAllRecords(enriched);
    } catch {
      setError('Cannot reach backend at http://localhost:5001 — ensure the server is running.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadAll(); }, [loadAll]);

  const records: EnrichedDataRecord[] = useMemo(() => {
    return allRecords.filter((r) => {
      if (filters.end_year && String(r.end_year ?? '') !== filters.end_year) return false;
      if (filters.topic && r.topic !== filters.topic) return false;
      if (filters.sector && r.sector !== filters.sector) return false;
      if (filters.region && r.region !== filters.region) return false;
      if (filters.pestle && r.pestle !== filters.pestle) return false;
      if (filters.source && r.source !== filters.source) return false;
      if (filters.country && r.country !== filters.country) return false;
      if (filters.city && (r.city || r.country) !== filters.city) return false;
      if (filters.swot && r.swot !== filters.swot) return false;
      if (filters.intensity_min && (r.intensity ?? 0) < Number(filters.intensity_min)) return false;
      if (filters.likelihood_min && (r.likelihood ?? 0) < Number(filters.likelihood_min)) return false;
      return true;
    });
  }, [allRecords, filters]);

  const options: FilterOptions = useMemo(() => ({
    end_year: unique(allRecords.map((r) => r.end_year == null ? '' : String(r.end_year))),
    topic: unique(allRecords.map((r) => r.topic)),
    sector: unique(allRecords.map((r) => r.sector)),
    region: unique(allRecords.map((r) => r.region)),
    pestle: unique(allRecords.map((r) => r.pestle)),
    source: unique(allRecords.map((r) => r.source)),
    country: unique(allRecords.map((r) => r.country)),
    city: unique(allRecords.map((r) => r.city || r.country)),
    swot: ['Strength', 'Weakness', 'Opportunity', 'Threat'],
    intensity_min: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    likelihood_min: ['1', '2', '3', '4', '5'],
  }), [allRecords]);

  const activeFilterCount = useMemo(
    () => Object.values(filters).filter((v) => v !== '').length,
    [filters]
  );

  const resetFilters = useCallback(() => setFilters(DEFAULT_FILTERS), []);

  return { filters, setFilters, options, loading, error, resetFilters, activeFilterCount, records };
}
