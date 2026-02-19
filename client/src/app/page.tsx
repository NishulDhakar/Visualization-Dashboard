'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Menu, X, Database, Globe, Zap, BarChart2 } from 'lucide-react';
import FilterPanel from '@/components/filters/FilterPanel';
import Card from '@/components/ui/Card';
import { StatSkeleton } from '@/components/ui/SkeletonLoader';
import IntensityByRegionChart from '@/components/charts/IntensityByRegionChart';
import LikelihoodByCountryChart from '@/components/charts/LikelihoodByCountryChart';
import RelevanceByYearChart from '@/components/charts/RelevanceByYearChart';
import IntensityLikelihoodScatter from '@/components/charts/IntensityLikelihoodScatter';
import SectorPieChart from '@/components/charts/SectorPieChart';
import {
  fetchData,
  fetchIntensityByRegion,
  fetchLikelihoodByCountry,
  fetchRelevanceByYear,
} from '@/lib/api';
import type {
  Filters,
  DataRecord,
  IntensityByRegion,
  LikelihoodByCountry,
  RelevanceByYear,
} from '@/types/data';

const DEFAULT_FILTERS: Filters = {
  end_year: '',
  topic: '',
  sector: '',
  region: '',
  pestle: '',
  source: '',
  country: '',
  city: '',
};

interface LoadingState {
  data: boolean;
  intensityByRegion: boolean;
  likelihoodByCountry: boolean;
  relevanceByYear: boolean;
}

interface ErrorState {
  data: string | null;
  analytics: string | null;
}

export default function DashboardPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [records, setRecords] = useState<DataRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [intensityByRegion, setIntensityByRegion] = useState<IntensityByRegion[]>([]);
  const [likelihoodByCountry, setLikelihoodByCountry] = useState<LikelihoodByCountry[]>([]);
  const [relevanceByYear, setRelevanceByYear] = useState<RelevanceByYear[]>([]);

  const [loading, setLoading] = useState<LoadingState>({
    data: true,
    intensityByRegion: true,
    likelihoodByCountry: true,
    relevanceByYear: true,
  });
  const [errors, setErrors] = useState<ErrorState>({ data: null, analytics: null });

  const loadData = useCallback(async (currentFilters: Filters) => {
    setLoading((prev) => ({ ...prev, data: true }));
    setErrors((prev) => ({ ...prev, data: null }));
    try {
      const result = await fetchData(currentFilters, 1, 500);
      setRecords(result.data);
      setTotal(result.total);
    } catch {
      setErrors((prev) => ({ ...prev, data: 'Failed to load data. Check your backend connection.' }));
    } finally {
      setLoading((prev) => ({ ...prev, data: false }));
    }
  }, []);

  const loadAnalytics = useCallback(async () => {
    setLoading((prev) => ({ ...prev, intensityByRegion: true, likelihoodByCountry: true, relevanceByYear: true }));
    setErrors((prev) => ({ ...prev, analytics: null }));
    try {
      const [irData, lcData, ryData] = await Promise.all([
        fetchIntensityByRegion(),
        fetchLikelihoodByCountry(),
        fetchRelevanceByYear(),
      ]);
      setIntensityByRegion(irData);
      setLikelihoodByCountry(lcData);
      setRelevanceByYear(ryData);
    } catch {
      setErrors((prev) => ({ ...prev, analytics: 'Failed to load analytics.' }));
    } finally {
      setLoading((prev) => ({ ...prev, intensityByRegion: false, likelihoodByCountry: false, relevanceByYear: false }));
    }
  }, []);

  useEffect(() => {
    void loadData(filters);
  }, [filters, loadData]);

  useEffect(() => {
    void loadAnalytics();
  }, [loadAnalytics]);

  const handleFiltersChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const avgIntensity = useMemo(() => {
    if (!records.length) return 0;
    return records.reduce((s, r) => s + r.intensity, 0) / records.length;
  }, [records]);

  const avgLikelihood = useMemo(() => {
    if (!records.length) return 0;
    return records.reduce((s, r) => s + r.likelihood, 0) / records.length;
  }, [records]);

  const uniqueRegions = useMemo(() => new Set(records.map((r) => r.region).filter(Boolean)).size, [records]);

  const statsLoading = loading.data;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <FilterPanel
        filters={filters}
        onChange={handleFiltersChange}
        onReset={handleReset}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 lg:ml-72 p-5 lg:p-6 max-w-[1600px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Global Insights Dashboard</h1>
            <p className="text-slate-400 text-sm mt-0.5">Real-time analytics from {total.toLocaleString()} data points</p>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-200 text-sm px-3 py-2 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <Menu className="w-4 h-4" />
            Filters
          </button>
        </div>

        {(errors.data || errors.analytics) && (
          <div className="mb-4 p-4 bg-rose-900/30 border border-rose-700/50 rounded-xl text-rose-300 text-sm flex items-center gap-2">
            <X className="w-4 h-4 flex-shrink-0" />
            {errors.data ?? errors.analytics}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: 'Total Records',
              value: statsLoading ? null : total.toLocaleString(),
              sub: 'matching filters',
              icon: Database,
              color: 'text-indigo-400',
              bg: 'bg-indigo-500/10',
            },
            {
              label: 'Avg Intensity',
              value: statsLoading ? null : avgIntensity.toFixed(2),
              sub: 'across filtered data',
              icon: Zap,
              color: 'text-amber-400',
              bg: 'bg-amber-500/10',
            },
            {
              label: 'Avg Likelihood',
              value: statsLoading ? null : avgLikelihood.toFixed(2),
              sub: 'scale of 1–5',
              icon: BarChart2,
              color: 'text-emerald-400',
              bg: 'bg-emerald-500/10',
            },
            {
              label: 'Regions',
              value: statsLoading ? null : uniqueRegions.toString(),
              sub: 'unique regions',
              icon: Globe,
              color: 'text-sky-400',
              bg: 'bg-sky-500/10',
            },
          ].map(({ label, value, sub, icon: Icon, color, bg }) => (
            <Card key={label} className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-slate-400 text-xs font-medium">{label}</p>
                {value === null ? (
                  <StatSkeleton />
                ) : (
                  <>
                    <p className={`text-xl font-bold ${color}`}>{value}</p>
                    <p className="text-slate-500 text-xs">{sub}</p>
                  </>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">
          <Card
            title="Average Intensity by Region"
            subtitle="Comparing mean intensity across global regions"
          >
            <IntensityByRegionChart data={intensityByRegion} loading={loading.intensityByRegion} />
          </Card>
          <Card
            title="Average Likelihood by Country"
            subtitle="Top 15 countries by average likelihood score"
          >
            <LikelihoodByCountryChart data={likelihoodByCountry} loading={loading.likelihoodByCountry} />
          </Card>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">
          <Card
            className="xl:col-span-2"
            title="Average Relevance by Year"
            subtitle="Trend of relevance scores over time"
          >
            <RelevanceByYearChart data={relevanceByYear} loading={loading.relevanceByYear} />
          </Card>
          <Card
            title="Sector Distribution"
            subtitle="Proportion of records per sector"
          >
            <SectorPieChart data={records} loading={loading.data} />
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <Card
            title="Intensity vs Likelihood"
            subtitle="Scatter plot of filtered data — up to 200 samples shown"
          >
            <IntensityLikelihoodScatter data={records} loading={loading.data} />
          </Card>
        </div>
      </main>
    </div>
  );
}
