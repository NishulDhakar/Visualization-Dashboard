'use client';

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import type { IntensityByRegion } from '@/types/data';
import { ChartSkeleton } from '@/components/ui/SkeletonLoader';

interface TooltipPayload { value: number }
interface CustomTooltipProps { active?: boolean; payload?: TooltipPayload[]; label?: string }

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-md min-w-[120px]">
            <p className="text-[11px] text-slate-500 mb-1 max-w-[180px] break-words">{label}</p>
            <p className="text-sm font-bold text-indigo-600 font-mono">
                {payload[0]?.value?.toFixed(2)}
                <span className="text-[10px] text-slate-400 ml-1 font-normal font-sans">avg intensity</span>
            </p>
        </div>
    );
};

const PALETTE = ['#6366f1', '#7c3aed', '#8b5cf6', '#4f46e5', '#a78bfa', '#818cf8', '#c4b5fd', '#5b21b6', '#4338ca', '#3730a3'];

export default function IntensityByRegionChart({ data, loading }: { data: IntensityByRegion[]; loading: boolean }) {
    if (loading) return <ChartSkeleton height={300} />;
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 64 }}>
                <defs>
                    {PALETTE.map((c, i) => (
                        <linearGradient key={i} id={`irg${i}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={c} stopOpacity={0.9} />
                            <stop offset="100%" stopColor={c} stopOpacity={0.4} />
                        </linearGradient>
                    ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
                <XAxis
                    dataKey="region"
                    tick={{ fill: '#475569', fontSize: 10, fontFamily: "'Fira Code', monospace" }}
                    angle={-40} textAnchor="end" interval={0}
                    axisLine={false} tickLine={false}
                />
                <YAxis
                    tick={{ fill: '#475569', fontSize: 10 }}
                    axisLine={false} tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.05)' }} />
                <Bar dataKey="avgIntensity" radius={[6, 6, 0, 0]} maxBarSize={40}>
                    {data.map((_, i) => (
                        <Cell key={i} fill={`url(#irg${i % PALETTE.length})`} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
