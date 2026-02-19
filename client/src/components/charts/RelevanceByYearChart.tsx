'use client';

import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
} from 'recharts';
import type { RelevanceByYear } from '@/types/data';
import { ChartSkeleton } from '@/components/ui/SkeletonLoader';

interface Props {
    data: RelevanceByYear[];
    loading: boolean;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 shadow-xl text-sm">
                <p className="text-slate-300 font-medium">Year {label}</p>
                <p className="text-sky-400 font-bold mt-0.5">
                    Avg Relevance: <span className="text-white">{payload[0]?.value?.toFixed(2)}</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function RelevanceByYearChart({ data, loading }: Props) {
    if (loading) return <ChartSkeleton height={280} />;

    return (
        <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 5 }}>
                <defs>
                    <linearGradient id="relevanceGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.02} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                    type="monotone"
                    dataKey="avgRelevance"
                    stroke="#0ea5e9"
                    strokeWidth={2.5}
                    fill="url(#relevanceGrad)"
                    dot={{ fill: '#0ea5e9', r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: '#0ea5e9', stroke: '#fff', strokeWidth: 2 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
