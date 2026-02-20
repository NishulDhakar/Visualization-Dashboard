import 'dotenv/config';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import DataRecord from '../models/DataRecord';

interface RawRecord {
    end_year: number | string;
    intensity: number;
    sector: string;
    topic: string;
    insight: string;
    url: string;
    region: string;
    start_year: number | string;
    impact: number | string;
    added: string;
    published: string;
    country: string;
    relevance: number;
    pestle: string;
    source: string;
    city: string;
    title: string;
    likelihood: number;
}

const parseOptionalNumber = (val: number | string): number | null => {
    if (val === '' || val === null || val === undefined) return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
};

const importData = async (): Promise<void> => {
    const mongoUrl = process.env['MONGO_URL'];
    if (!mongoUrl) {
        process.stderr.write('MONGO_URL environment variable is not defined\n');
        process.exit(1);
    }

    await mongoose.connect(mongoUrl);
    process.stdout.write('Connected to MongoDB\n');

    const filePath = path.join(__dirname, '../../jsondata.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const records: RawRecord[] = JSON.parse(raw) as RawRecord[];

    await DataRecord.deleteMany({});
    process.stdout.write('Cleared existing collection\n');

    const sanitized = records.map((record) => ({
        end_year: parseOptionalNumber(record.end_year),
        intensity: record.intensity ?? 0,
        sector: record.sector ?? '',
        topic: record.topic ?? '',
        insight: record.insight ?? '',
        url: record.url ?? '',
        region: record.region ?? '',
        start_year: parseOptionalNumber(record.start_year),
        impact: parseOptionalNumber(record.impact),
        added: record.added ?? '',
        published: record.published ?? '',
        country: record.country ?? '',
        relevance: record.relevance ?? 0,
        pestle: record.pestle ?? '',
        source: record.source ?? '',
        city: record.city ?? '',
        title: record.title ?? '',
        likelihood: record.likelihood ?? 0,
    }));

    await DataRecord.insertMany(sanitized);
    process.stdout.write(`Inserted ${sanitized.length} records\n`);

    await mongoose.disconnect();
    process.stdout.write('Disconnected from MongoDB\n');
};

importData().catch((err: Error) => {
    process.stderr.write(`Import failed: ${err.message}\n`);
    process.exit(1);
});
