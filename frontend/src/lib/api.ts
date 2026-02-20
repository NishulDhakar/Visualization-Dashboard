import axios from 'axios';
import type {
  AnalyticsResponse,
  Filters,
  IntensityByRegion,
  LikelihoodByCountry,
  PaginatedDataResponse,
  RelevanceByYear,
} from '../types/data';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5001',
  timeout: 20000,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchData(
  filters: Partial<Filters> = {},
  page = 1,
  limit = 100
): Promise<PaginatedDataResponse> {
  const params: Record<string, string | number> = { page, limit };

  Object.entries(filters).forEach(([key, value]) => {
    if (value && value !== '') {
      params[key] = value;
    }
  });

  const { data } = await api.get<PaginatedDataResponse>('/api/data', { params });
  return data;
}

export async function fetchIntensityByRegion(): Promise<IntensityByRegion[]> {
  const { data } = await api.get<AnalyticsResponse<IntensityByRegion>>('/api/analytics/intensity-by-region');
  return data.data;
}

export async function fetchLikelihoodByCountry(): Promise<LikelihoodByCountry[]> {
  const { data } = await api.get<AnalyticsResponse<LikelihoodByCountry>>('/api/analytics/likelihood-by-country');
  return data.data;
}

export async function fetchRelevanceByYear(): Promise<RelevanceByYear[]> {
  const { data } = await api.get<AnalyticsResponse<RelevanceByYear>>('/api/analytics/relevance-by-year');
  return data.data;
}

export default api;
