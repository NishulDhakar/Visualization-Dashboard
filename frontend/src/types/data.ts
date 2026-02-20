export interface DataRecord {
    _id: string;
    end_year: number | null;
    intensity: number;
    sector: string;
    topic: string;
    insight: string;
    url: string;
    region: string;
    start_year: number | null;
    impact: number | null;
    added: string;
    published: string;
    country: string;
    relevance: number;
    pestle: string;
    source: string;
    title: string;
    likelihood: number;
    city?: string;
}

export type SwotLabel = 'Strength' | 'Weakness' | 'Opportunity' | 'Threat';

export interface EnrichedDataRecord extends DataRecord {
    swot: SwotLabel;
    city: string;
}

export interface PaginatedDataResponse {
    success: boolean;
    total: number;
    page: number;
    limit: number;
    pages: number;
    data: DataRecord[];
}

export interface Filters {
    end_year: string;
    topic: string;
    sector: string;
    region: string;
    pestle: string;
    source: string;
    swot: string;
    country: string;
    city: string;
    intensity_min: string;
    likelihood_min: string;
}

export interface FilterOptions {
    end_year: string[];
    topic: string[];
    sector: string[];
    region: string[];
    pestle: string[];
    source: string[];
    swot: string[];
    country: string[];
    city: string[];
    intensity_min: string[];
    likelihood_min: string[];
}

export interface KpiSummary {
    totalRecords: number;
    avgIntensity: number;
    avgLikelihood: number;
    avgRelevance: number;
    topRegion: string;
    uniqueTopics: number;
    uniqueCountries: number;
    highImpactCount: number;
}

export interface TrendDatum {
    year: number;
    avgIntensity: number;
    avgRelevance: number;
    avgLikelihood: number;
    count: number;
}

export interface RegionDatum {
    region: string;
    avgIntensity: number;
    avgLikelihood: number;
    avgRelevance: number;
    count: number;
}

export interface CountryDatum {
    country: string;
    avgLikelihood: number;
    avgRelevance: number;
    avgIntensity: number;
    count: number;
}

export interface TopicDatum {
    topic: string;
    value: number;
}

export interface CategoryDatum {
    category: string;
    Strength: number;
    Weakness: number;
    Opportunity: number;
    Threat: number;
}

export interface CityDatum {
    city: string;
    records: number;
    avgIntensity: number;
    avgLikelihood: number;
    avgRelevance: number;
}

export interface SectorDatum {
    sector: string;
    avgIntensity: number;
    avgLikelihood: number;
    avgRelevance: number;
    count: number;
}

export interface SourceDatum {
    source: string;
    count: number;
    avgIntensity: number;
}

export interface ScatterDatum {
    intensity: number;
    likelihood: number;
    relevance: number;
    topic: string;
    country: string;
}

export interface IntensityByRegion {
    region: string;
    avgIntensity: number;
    count: number;
}

export interface LikelihoodByCountry {
    country: string;
    avgLikelihood: number;
    count: number;
}

export interface RelevanceByYear {
    year: number;
    avgRelevance: number;
    count: number;
}

export interface AnalyticsResponse<T> {
    success: boolean;
    data: T[];
}
