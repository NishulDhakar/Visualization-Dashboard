import { fetchData } from '@/lib/api';
import type { DataRecord, FilterOptions, Filters, SwotLabel } from '../types/data';

const PAGE_SIZE = 500;
const MAX_PAGES = 20;

export function deriveSwot(record: DataRecord): SwotLabel {
  const intensity = record.intensity ?? 0;
  const likelihood = record.likelihood ?? 0;
  const relevance = record.relevance ?? 0;

  if (relevance >= 4 && likelihood >= 4) return 'Opportunity';
  if (intensity >= 4 && likelihood >= 3) return 'Threat';
  if (relevance >= 3 && intensity <= 2) return 'Strength';
  return 'Weakness';
}

function normalizeCity(value: string | undefined): string {
  return value && value.trim() ? value.trim() : 'Unavailable';
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b));
}

function toApiFilters(filters: Filters): Partial<Filters> {
  return {
    end_year: filters.end_year,
    topic: filters.topic,
    sector: filters.sector,
    region: filters.region,
    pestle: filters.pestle,
    source: filters.source,
    country: filters.country,
    city: filters.city === 'Unavailable' ? '' : filters.city,
  };
}

export async function fetchAllRecords(filters: Filters): Promise<DataRecord[]> {
  const apiFilters = toApiFilters(filters);

  const firstPage = await fetchData(apiFilters, 1, PAGE_SIZE);
  if (firstPage.pages <= 1) return firstPage.data;

  const pagesToLoad = Math.min(firstPage.pages, MAX_PAGES);
  const pageRequests: Promise<{ data: DataRecord[] }>[] = [];

  for (let page = 2; page <= pagesToLoad; page += 1) {
    pageRequests.push(fetchData(apiFilters, page, PAGE_SIZE));
  }

  const responses = await Promise.all(pageRequests);
  return [
    ...firstPage.data,
    ...responses.flatMap((response) => response.data),
  ];
}

export async function fetchFilterOptions(): Promise<FilterOptions> {
  const emptyFilters: Filters = {
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
    city: '',
    intensity_min: '',
    likelihood_min: '',
  };

  const records = await fetchAllRecords(emptyFilters);

  return {
    end_year: uniqueSorted(
      records
        .map((record) => String(record.end_year ?? ''))
        .filter((year) => year && year !== 'null')
    ),
    topic: uniqueSorted(records.map((record) => record.topic?.trim() ?? '')),
    sector: uniqueSorted(records.map((record) => record.sector?.trim() ?? '')),
    region: uniqueSorted(records.map((record) => record.region?.trim() ?? '')),
    pestle: uniqueSorted(records.map((record) => record.pestle?.trim() ?? '')),
    source: uniqueSorted(records.map((record) => record.source?.trim() ?? '')),
    swot: ['Strength', 'Weakness', 'Opportunity', 'Threat'],
    country: uniqueSorted(records.map((record) => record.country?.trim() ?? '')),
    city: uniqueSorted(records.map((record) => normalizeCity(record.city))),
    intensity_min: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    likelihood_min: ['1', '2', '3', '4', '5'],
  };
}

export function applyLocalFilters(records: DataRecord[], filters: Filters): DataRecord[] {
  return records.filter((record) => {
    const swotMatch = !filters.swot || deriveSwot(record) === filters.swot;
    const city = normalizeCity(record.city);
    const cityMatch = !filters.city || city === filters.city;
    return swotMatch && cityMatch;
  });
}

export function enrichRecord(record: DataRecord) {
  return {
    ...record,
    swot: deriveSwot(record),
    city: normalizeCity(record.city),
  };
}
