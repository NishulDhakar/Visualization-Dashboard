
import { Schema, model, Document, Model } from 'mongoose';

export interface IDataRecord extends Document {
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
    city: string;
    title: string;
    likelihood: number;
}

export interface RawRecord {
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

const DataRecordSchema = new Schema<IDataRecord>(
    {
        end_year: { type: Number, default: null },
        intensity: { type: Number, default: 0 },
        sector: { type: String, default: '' },
        topic: { type: String, default: '' },
        insight: { type: String, default: '' },
        url: { type: String, default: '' },
        region: { type: String, default: '' },
        start_year: { type: Number, default: null },
        impact: { type: Number, default: null },
        added: { type: String, default: '' },
        published: { type: String, default: '' },
        country: { type: String, default: '' },
        relevance: { type: Number, default: 0 },
        pestle: { type: String, default: '' },
        source: { type: String, default: '' },
        city: { type: String, default: '' },
        title: { type: String, default: '' },
        likelihood: { type: Number, default: 0 },
    },
    {
        timestamps: false,
        versionKey: false,
    }
);

DataRecordSchema.index({ sector: 1 });
DataRecordSchema.index({ topic: 1 });
DataRecordSchema.index({ country: 1 });
DataRecordSchema.index({ region: 1 });
DataRecordSchema.index({ city: 1 });
DataRecordSchema.index({ end_year: 1 });

DataRecordSchema.index({ sector: 1, region: 1 });
DataRecordSchema.index({ country: 1, end_year: 1 });
DataRecordSchema.index({ pestle: 1, source: 1 });
DataRecordSchema.index({ intensity: 1 });
DataRecordSchema.index({ likelihood: 1 });
DataRecordSchema.index({ relevance: 1 });

const DataRecord: Model<IDataRecord> = model<IDataRecord>('DataRecord', DataRecordSchema);

export default DataRecord;
