'use client';

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell,
} from 'recharts';
import type { CityDatum } from '@/types/data';

interface Props {
    data: CityDatum[];
    loading: boolean;
    onCityClick?: (city: string) => void;
}

const COLORS = ['#6C63FF', '#10B981', '#F59E0B', '#0EA5E9', '#F43F5E', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316', '#84CC16'];

interface CTProps { active?: boolean; payload?: Array<{ value: number; payload: CityDatum }>; label?: string }

const CustomTooltip = ({ active, payload, label }: CTProps) => {
    if (!active || !payload?.length) return null;
    const d = payload[0]!.payload;
    return (
        <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-md text-xs">
            <p className="font-bold text-slate-800 mb-1.5">{label}</p>
            <p className="text-indigo-600 my-0.5">Records: <span className="font-semibold text-slate-800">{d.records}</span></p>
            <p className="text-emerald-500 my-0.5">Avg Intensity: <span className="font-semibold text-slate-800">{d.avgIntensity}</span></p>
            <p className="text-amber-500 my-0.5">Avg Likelihood: <span className="font-semibold text-slate-800">{d.avgLikelihood}</span></p>
        </div>
    );
};

function Skel() {
    return (
        <div className="h-[260px] flex gap-1 py-2 items-end">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="skeleton flex-1" style={{ height: `${20 + ((i * 17) % 60)}%` }} />
            ))}
        </div>
    );
}

export default function CityBarChart({ data, loading, onCityClick }: Props) {
    if (loading) return <Skel />;
    const top10 = data.slice(0, 10);
    return (
        <ResponsiveContainer width="100%" height={260}>
            <BarChart data={top10} margin={{ top: 8, right: 6, left: -18, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--line-soft)" vertical={false} />
                <XAxis
                    dataKey="city"
                    tick={{ fill: 'var(--text-muted)', fontSize: 9 }}
                    angle={-35} textAnchor="end"
                    axisLine={false} tickLine={false}
                />
                <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(108,99,255,0.04)' }} />
                <Bar
                    dataKey="records"
                    radius={[5, 5, 0, 0]}
                    maxBarSize={30}
                    cursor={onCityClick ? 'pointer' : 'default'}
                    onClick={(datum) => {
                        if (!onCityClick) return;
                        const payload = datum as { city?: string };
                        if (payload.city) onCityClick(payload.city);
                    }}
                >
                    {top10.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.8} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
