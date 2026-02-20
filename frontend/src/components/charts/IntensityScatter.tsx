'use client';

import React from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, ZAxis,
} from 'recharts';
import type { ScatterDatum } from '@/types/data';

interface Props { data: ScatterDatum[]; loading: boolean }

interface CTProps { active?: boolean; payload?: Array<{ value: number; name: string; payload: ScatterDatum }> }

const CustomTooltip = ({ active, payload }: CTProps) => {
    if (!active || !payload || payload.length < 2) return null;
    const d = payload[0]!.payload;
    return (
        <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-md text-xs max-w-[220px]">
            <p className="font-semibold text-slate-800 mb-1">{d.topic}</p>
            <p className="text-slate-500 text-[11px] mb-1.5">{d.country}</p>
            <div className="grid grid-cols-2 gap-1 uppercase tracking-tight">
                <span className="text-indigo-600 font-medium">Intensity: {d.intensity}</span>
                <span className="text-emerald-500 font-medium">Likelihood: {d.likelihood}</span>
                <span className="text-amber-500 font-medium col-span-2">Relevance: {d.relevance}</span>
            </div>
        </div>
    );
};

function Skel() {
    return (
        <div className="h-[260px] grid place-items-center">
            <div className="flex gap-1.5 flex-wrap max-w-[300px] justify-center">
                {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className="skeleton rounded-full" style={{ width: 8 + (i % 4) * 3, height: 8 + (i % 4) * 3 }} />
                ))}
            </div>
        </div>
    );
}

export default function IntensityScatter({ data, loading }: Props) {
    if (loading) return <Skel />;
    return (
        <ResponsiveContainer width="100%" height={260}>
            <ScatterChart margin={{ top: 10, right: 8, left: -14, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--line-soft)" />
                <XAxis
                    dataKey="intensity" name="Intensity" type="number"
                    tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                    label={{ value: 'Intensity →', position: 'insideBottomRight', offset: -4, fill: 'var(--text-muted)', fontSize: 10 }}
                    axisLine={false} tickLine={false}
                />
                <YAxis
                    dataKey="likelihood" name="Likelihood" type="number"
                    tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
                    label={{ value: 'Likelihood →', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 10 }}
                    axisLine={false} tickLine={false}
                />
                <ZAxis dataKey="relevance" range={[20, 120]} name="Relevance" />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'var(--line)' }} />
                <Scatter data={data} fill="#6C63FF" fillOpacity={0.55} />
            </ScatterChart>
        </ResponsiveContainer>
    );
}
