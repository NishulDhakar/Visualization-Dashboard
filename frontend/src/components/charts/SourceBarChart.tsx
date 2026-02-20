'use client';

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell, LabelList,
} from 'recharts';
import type { SourceDatum } from '@/types/data';

interface Props { data: SourceDatum[]; loading: boolean }

const COLORS = ['#6C63FF', '#818CF8', '#A78BFA', '#C4B5FD', '#7C3AED', '#4F46E5', '#6366F1'];

interface CTProps { active?: boolean; payload?: Array<{ value: number; payload: SourceDatum }>; label?: string }

const CustomTooltip = ({ active, payload, label }: CTProps) => {
    if (!active || !payload?.length) return null;
    const d = payload[0]!.payload;
    return (
        <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-md text-xs">
            <p className="font-bold text-slate-800 mb-1">{label}</p>
            <p className="text-indigo-600 mb-0.5">Records: <span className="font-semibold text-slate-800">{d.count}</span></p>
            <p className="text-amber-500">Avg Intensity: <span className="font-semibold text-slate-800">{d.avgIntensity}</span></p>
        </div>
    );
};

function Skel() {
    return (
        <div className="h-[260px] flex gap-1 items-end py-2">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton flex-1" style={{ height: `${25 + ((i * 15) % 55)}%` }} />
            ))}
        </div>
    );
}

export default function SourceBarChart({ data, loading }: Props) {
    if (loading) return <Skel />;
    return (
        <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data} layout="vertical" margin={{ top: 4, right: 30, left: 8, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--line-soft)" horizontal={false} />
                <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis
                    dataKey="source" type="category"
                    tick={{ fill: 'var(--text-secondary)', fontSize: 10 }}
                    width={120} axisLine={false} tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(108,99,255,0.04)' }} />
                <Bar dataKey="count" radius={[0, 6, 6, 0]} maxBarSize={16}>
                    {data.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} fillOpacity={0.85} />
                    ))}
                    <LabelList dataKey="count" position="right" style={{ fill: 'var(--text-muted)', fontSize: 10 }} />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
