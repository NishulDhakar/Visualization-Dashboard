'use client';

import React from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import type { RelevanceByYear } from '@/types/data';
import { ChartSkeleton } from '@/components/ui/SkeletonLoader';

interface TooltipPayload { value: number }
interface CustomTooltipProps { active?: boolean; payload?: TooltipPayload[]; label?: string }

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-md min-w-[120px]">
            <p className="text-[11px] text-slate-500 mb-1 font-mono">
                Year {label ?? 'N/A'}
            </p>
            <p className="text-sm font-bold text-sky-600 font-mono">
                {payload[0]?.value?.toFixed(2)}
                <span className="text-[10px] text-slate-400 ml-1 font-normal font-sans">avg relevance</span>
            </p>
        </div>
    );
};

export default function RelevanceByYearChart({ data, loading }: { data: RelevanceByYear[]; loading: boolean }) {
    if (loading) return <ChartSkeleton height={260} />;
    return (
        <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 5 }}>
                <defs>
                    <linearGradient id="ryGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.35} />
                        <stop offset="90%" stopColor="#0ea5e9" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
                <XAxis
                    dataKey="year"
                    tick={{ fill: '#475569', fontSize: 10, fontFamily: "'Fira Code', monospace" }}
                    axisLine={false} tickLine={false}
                />
                <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                    type="monotone"
                    dataKey="avgRelevance"
                    stroke="#0ea5e9"
                    strokeWidth={2.5}
                    fill="url(#ryGrad)"
                    dot={false}
                    activeDot={{ r: 5, fill: '#0ea5e9', stroke: '#ffffff', strokeWidth: 2 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
