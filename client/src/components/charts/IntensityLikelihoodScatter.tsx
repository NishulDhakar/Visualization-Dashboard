'use client';

import React from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis,
} from 'recharts';
import type { DataRecord } from '@/types/data';
import { ChartSkeleton } from '@/components/ui/SkeletonLoader';

interface Props {
    data: DataRecord[];
    loading: boolean;
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
    if (active && payload && payload.length >= 2) {
        return (
            <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 shadow-xl text-sm">
                <p className="text-amber-400 font-bold">
                    Intensity: <span className="text-white">{payload[0]?.value}</span>
                </p>
                <p className="text-rose-400 font-bold mt-0.5">
                    Likelihood: <span className="text-white">{payload[1]?.value}</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function IntensityLikelihoodScatter({ data, loading }: Props) {
    if (loading) return <ChartSkeleton height={280} />;

    const scatterData = data
        .filter((d) => d.intensity > 0 && d.likelihood > 0)
        .slice(0, 200)
        .map((d) => ({ x: d.intensity, y: d.likelihood, name: d.title?.slice(0, 40) ?? '' }));

    return (
        <ResponsiveContainer width="100%" height={280}>
            <ScatterChart margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis
                    dataKey="x"
                    name="Intensity"
                    type="number"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    label={{ value: 'Intensity', position: 'insideBottom', offset: -2, fill: '#64748b', fontSize: 11 }}
                />
                <YAxis
                    dataKey="y"
                    name="Likelihood"
                    type="number"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    label={{ value: 'Likelihood', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11 }}
                />
                <ZAxis range={[30, 30]} />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#475569' }} />
                <Scatter data={scatterData} fill="#f59e0b" fillOpacity={0.65} />
            </ScatterChart>
        </ResponsiveContainer>
    );
}
