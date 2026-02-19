import { Request, Response, NextFunction } from 'express';
import DataRecord from '../models/DataRecord';
import { AppError } from '../utils/errorHandler';

interface FilterQuery {
    end_year?: number;
    topic?: string;
    sector?: string;
    region?: string;
    pestle?: string;
    source?: string;
    country?: string;
    city?: string;
}

export const getData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { end_year, topic, sector, region, pestle, source, country, city, page, limit } = req.query;

        const query: Record<string, unknown> = {};

        if (end_year && end_year !== '') query['end_year'] = Number(end_year);
        if (topic && topic !== '') query['topic'] = topic;
        if (sector && sector !== '') query['sector'] = sector;
        if (region && region !== '') query['region'] = region;
        if (pestle && pestle !== '') query['pestle'] = pestle;
        if (source && source !== '') query['source'] = source;
        if (country && country !== '') query['country'] = country;
        if (city && city !== '') query['city'] = city;

        const pageNum = Math.max(1, parseInt(String(page ?? '1'), 10));
        const limitNum = Math.min(500, Math.max(1, parseInt(String(limit ?? '50'), 10)));
        const skip = (pageNum - 1) * limitNum;

        const [data, total] = await Promise.all([
            DataRecord.find(query).skip(skip).limit(limitNum).lean(),
            DataRecord.countDocuments(query),
        ]);

        res.status(200).json({
            success: true,
            total,
            page: pageNum,
            limit: limitNum,
            pages: Math.ceil(total / limitNum),
            data,
        });
    } catch (error) {
        next(error);
    }
};

export const getIntensityByRegion = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await DataRecord.aggregate([
            { $match: { region: { $ne: '' }, intensity: { $gt: 0 } } },
            {
                $group: {
                    _id: '$region',
                    avgIntensity: { $avg: '$intensity' },
                    count: { $sum: 1 },
                },
            },
            { $sort: { avgIntensity: -1 } },
            {
                $project: {
                    _id: 0,
                    region: '$_id',
                    avgIntensity: { $round: ['$avgIntensity', 2] },
                    count: 1,
                },
            },
        ]);

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

export const getLikelihoodByCountry = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await DataRecord.aggregate([
            { $match: { country: { $ne: '' }, likelihood: { $gt: 0 } } },
            {
                $group: {
                    _id: '$country',
                    avgLikelihood: { $avg: '$likelihood' },
                    count: { $sum: 1 },
                },
            },
            { $sort: { avgLikelihood: -1 } },
            {
                $project: {
                    _id: 0,
                    country: '$_id',
                    avgLikelihood: { $round: ['$avgLikelihood', 2] },
                    count: 1,
                },
            },
        ]);

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

export const getRelevanceByYear = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await DataRecord.aggregate([
            { $match: { end_year: { $ne: null, $gt: 0 }, relevance: { $gt: 0 } } },
            {
                $group: {
                    _id: '$end_year',
                    avgRelevance: { $avg: '$relevance' },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
            {
                $project: {
                    _id: 0,
                    year: '$_id',
                    avgRelevance: { $round: ['$avgRelevance', 2] },
                    count: 1,
                },
            },
        ]);

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};
