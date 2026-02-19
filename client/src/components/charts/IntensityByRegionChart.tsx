'use client';

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import type { IntensityByRegion } from '@/types/data';
import { ChartSkeleton } from '@/components/ui/SkeletonLoader';

const COLORS = [
    '#6366f1', '#8b5cf6', '#a78bfa', '#818cf8', '#4f46e5',
    '#7c3aed', '#5b21b6', '#c4b5fd', '#ddd6fe', '#3730a3',
];

interface Props {
    data: IntensityByRegion[];
    loading: boolean;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 shadow-xl text-sm">
                <p className="text-slate-300 font-medium truncate max-w-[180px]">{label}</p>
                <p className="text-indigo-400 font-bold mt-0.5">
                    Avg Intensity: <span className="text-white">{payload[0]?.value?.toFixed(2)}</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function IntensityByRegionChart({ data, loading }: Props) {
    if (loading) return <ChartSkeleton height={300} />;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis
                    dataKey="region"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    angle={-40}
                    textAnchor="end"
                    interval={0}
                />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.08)' }} />
                <Bar dataKey="avgIntensity" radius={[4, 4, 0, 0]}>
                    {data.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
