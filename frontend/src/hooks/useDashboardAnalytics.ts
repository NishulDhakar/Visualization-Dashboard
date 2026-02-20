'use client';

import { useMemo } from 'react';
import type {
  EnrichedDataRecord, KpiSummary, TrendDatum, RegionDatum,
  CountryDatum, TopicDatum, CategoryDatum, CityDatum,
  SectorDatum, SourceDatum, ScatterDatum,
} from '../types/data';

function avg(arr: number[]): number {
  if (!arr.length) return 0;
  return arr.reduce((s, v) => s + v, 0) / arr.length;
}

function topKey<T extends Record<string, number>>(obj: T): string {
  return Object.entries(obj).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';
}

export function useDashboardAnalytics(records: EnrichedDataRecord[]) {

  // ── KPI Summary ──
  const summary: KpiSummary = useMemo(() => {
    const regionCounts: Record<string, number> = {};
    const topicSet = new Set<string>();
    const countrySet = new Set<string>();
    let highImpact = 0;
    records.forEach((r) => {
      if (r.region) regionCounts[r.region] = (regionCounts[r.region] ?? 0) + 1;
      if (r.topic) topicSet.add(r.topic);
      if (r.country) countrySet.add(r.country);
      if ((r.intensity ?? 0) >= 7 && (r.likelihood ?? 0) >= 3) highImpact++;
    });
    return {
      totalRecords: records.length,
      avgIntensity: Number(avg(records.map((r) => r.intensity ?? 0)).toFixed(2)),
      avgLikelihood: Number(avg(records.map((r) => r.likelihood ?? 0)).toFixed(2)),
      avgRelevance: Number(avg(records.map((r) => r.relevance ?? 0)).toFixed(2)),
      topRegion: topKey(regionCounts),
      uniqueTopics: topicSet.size,
      uniqueCountries: countrySet.size,
      highImpactCount: highImpact,
    };
  }, [records]);

  // ── Yearly Trend (Intensity + Relevance + Likelihood) ──
  const trendData: TrendDatum[] = useMemo(() => {
    const byYear: Record<number, { i: number[]; r: number[]; l: number[]; c: number }> = {};
    records.forEach((rec) => {
      const y = rec.end_year ?? rec.start_year;
      if (!y) return;
      if (!byYear[y]) byYear[y] = { i: [], r: [], l: [], c: 0 };
      byYear[y]!.i.push(rec.intensity ?? 0);
      byYear[y]!.r.push(rec.relevance ?? 0);
      byYear[y]!.l.push(rec.likelihood ?? 0);
      byYear[y]!.c += 1;
    });
    return Object.entries(byYear)
      .map(([year, d]) => ({
        year: Number(year),
        avgIntensity: Number(avg(d.i).toFixed(2)),
        avgRelevance: Number(avg(d.r).toFixed(2)),
        avgLikelihood: Number(avg(d.l).toFixed(2)),
        count: d.c,
      }))
      .sort((a, b) => a.year - b.year);
  }, [records]);

  // ── Region ──
  const regionData: RegionDatum[] = useMemo(() => {
    const map: Record<string, { i: number[]; l: number[]; r: number[] }> = {};
    records.forEach((rec) => {
      if (!rec.region) return;
      if (!map[rec.region]) map[rec.region] = { i: [], l: [], r: [] };
      map[rec.region]!.i.push(rec.intensity ?? 0);
      map[rec.region]!.l.push(rec.likelihood ?? 0);
      map[rec.region]!.r.push(rec.relevance ?? 0);
    });
    return Object.entries(map)
      .map(([region, d]) => ({
        region,
        avgIntensity: Number(avg(d.i).toFixed(2)),
        avgLikelihood: Number(avg(d.l).toFixed(2)),
        avgRelevance: Number(avg(d.r).toFixed(2)),
        count: d.i.length,
      }))
      .sort((a, b) => b.avgIntensity - a.avgIntensity);
  }, [records]);

  // ── Country (top 15) ──
  const countryData: CountryDatum[] = useMemo(() => {
    const map: Record<string, { l: number[]; r: number[]; i: number[] }> = {};
    records.forEach((rec) => {
      if (!rec.country) return;
      if (!map[rec.country]) map[rec.country] = { l: [], r: [], i: [] };
      map[rec.country]!.l.push(rec.likelihood ?? 0);
      map[rec.country]!.r.push(rec.relevance ?? 0);
      map[rec.country]!.i.push(rec.intensity ?? 0);
    });
    return Object.entries(map)
      .map(([country, d]) => ({
        country,
        avgLikelihood: Number(avg(d.l).toFixed(2)),
        avgRelevance: Number(avg(d.r).toFixed(2)),
        avgIntensity: Number(avg(d.i).toFixed(2)),
        count: d.l.length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);
  }, [records]);

  // ── Topics (top 10) ──
  const topicData: TopicDatum[] = useMemo(() => {
    const counts: Record<string, number> = {};
    records.forEach((r) => { if (r.topic) counts[r.topic] = (counts[r.topic] ?? 0) + 1; });
    return Object.entries(counts)
      .map(([topic, value]) => ({ topic, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [records]);

  // ── PESTLE × SWOT matrix ──
  const categoryData: CategoryDatum[] = useMemo(() => {
    const map: Record<string, { Strength: number; Weakness: number; Opportunity: number; Threat: number }> = {};
    records.forEach((r) => {
      const cat = r.pestle || 'Unknown';
      if (!map[cat]) map[cat] = { Strength: 0, Weakness: 0, Opportunity: 0, Threat: 0 };
      map[cat]![r.swot] += 1;
    });
    return Object.entries(map)
      .map(([category, vals]) => ({ category, ...vals }))
      .sort((a, b) => (b.Strength + b.Opportunity) - (a.Strength + a.Opportunity))
      .slice(0, 8);
  }, [records]);

  // ── City ──
  const cityData: CityDatum[] = useMemo(() => {
    const map: Record<string, { c: number; i: number[]; l: number[]; r: number[] }> = {};
    records.forEach((rec) => {
      const city = rec.city || rec.country || 'Unknown';
      if (!map[city]) map[city] = { c: 0, i: [], l: [], r: [] };
      map[city]!.c += 1;
      map[city]!.i.push(rec.intensity ?? 0);
      map[city]!.l.push(rec.likelihood ?? 0);
      map[city]!.r.push(rec.relevance ?? 0);
    });
    return Object.entries(map)
      .map(([city, d]) => ({
        city,
        records: d.c,
        avgIntensity: Number(avg(d.i).toFixed(2)),
        avgLikelihood: Number(avg(d.l).toFixed(2)),
        avgRelevance: Number(avg(d.r).toFixed(2)),
      }))
      .sort((a, b) => b.records - a.records)
      .slice(0, 30);
  }, [records]);

  // ── Sector (radar chart data) ──
  const sectorData: SectorDatum[] = useMemo(() => {
    const map: Record<string, { i: number[]; l: number[]; r: number[] }> = {};
    records.forEach((rec) => {
      if (!rec.sector) return;
      if (!map[rec.sector]) map[rec.sector] = { i: [], l: [], r: [] };
      map[rec.sector]!.i.push(rec.intensity ?? 0);
      map[rec.sector]!.l.push(rec.likelihood ?? 0);
      map[rec.sector]!.r.push(rec.relevance ?? 0);
    });
    return Object.entries(map)
      .map(([sector, d]) => ({
        sector,
        avgIntensity: Number(avg(d.i).toFixed(2)),
        avgLikelihood: Number(avg(d.l).toFixed(2)),
        avgRelevance: Number(avg(d.r).toFixed(2)),
        count: d.i.length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [records]);

  // ── Source (bar chart data) ──
  const sourceData: SourceDatum[] = useMemo(() => {
    const map: Record<string, { c: number; i: number[] }> = {};
    records.forEach((rec) => {
      if (!rec.source) return;
      if (!map[rec.source]) map[rec.source] = { c: 0, i: [] };
      map[rec.source]!.c += 1;
      map[rec.source]!.i.push(rec.intensity ?? 0);
    });
    return Object.entries(map)
      .map(([source, d]) => ({
        source,
        count: d.c,
        avgIntensity: Number(avg(d.i).toFixed(2)),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 12);
  }, [records]);

  // ── Scatter: Intensity vs Likelihood ──
  const scatterData: ScatterDatum[] = useMemo(() => {
    return records
      .filter((r) => r.intensity > 0 && r.likelihood > 0)
      .slice(0, 250)
      .map((r) => ({
        intensity: r.intensity,
        likelihood: r.likelihood,
        relevance: r.relevance,
        topic: r.topic || '—',
        country: r.country || '—',
      }));
  }, [records]);

  return {
    summary, trendData, regionData, countryData, topicData,
    categoryData, cityData, sectorData, sourceData, scatterData,
  };
}
