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
}

export interface PaginatedDataResponse {
    success: boolean;
    total: number;
    page: number;
    limit: number;
    pages: number;
    data: DataRecord[];
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

export interface Filters {
    end_year: string;
    topic: string;
    sector: string;
    region: string;
    pestle: string;
    source: string;
    country: string;
    city: string;
}

export interface AnalyticsResponse<T> {
    success: boolean;
    data: T[];
}
