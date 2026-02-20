'use client';

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import type { LikelihoodByCountry } from '@/types/data';
import { ChartSkeleton } from '@/components/ui/SkeletonLoader';

interface TooltipPayload { value: number }
interface CustomTooltipProps { active?: boolean; payload?: TooltipPayload[]; label?: string }

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-slate-900 border border-emerald-500/25 rounded-xl px-3.5 py-2.5 shadow-lg min-w-[120px]">
            <p className="text-[11px] text-slate-400 mb-1">{label}</p>
            <p className="text-sm font-bold text-emerald-500 font-mono">
                {payload[0]?.value?.toFixed(2)}
                <span className="text-[10px] text-slate-500 ml-1 font-normal">/ 5.0</span>
            </p>
        </div>
    );
};

const PALETTE = ['#10b981', '#059669', '#34d399', '#047857', '#6ee7b7', '#065f46', '#a7f3d0', '#14b8a6', '#0d9488', '#0f766e'];

export default function LikelihoodByCountryChart({ data, loading }: { data: LikelihoodByCountry[]; loading: boolean }) {
    if (loading) return <ChartSkeleton height={300} />;
    const top15 = data.slice(0, 15);
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={top15} layout="vertical" margin={{ top: 5, right: 16, left: 10, bottom: 5 }}>
                <defs>
                    {PALETTE.map((c, i) => (
                        <linearGradient key={i} id={`lcg${i}`} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor={c} stopOpacity={0.5} />
                            <stop offset="100%" stopColor={c} stopOpacity={0.9} />
                        </linearGradient>
                    ))}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" domain={[0, 5]} tick={{ fill: '#334155', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis
                    dataKey="country" type="category"
                    tick={{ fill: '#64748b', fontSize: 10, fontFamily: "'Fira Code', monospace" }}
                    width={130} axisLine={false} tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(16,185,129,0.05)' }} />
                <Bar dataKey="avgLikelihood" radius={[0, 6, 6, 0]} maxBarSize={15}>
                    {top15.map((_, i) => (
                        <Cell key={i} fill={`url(#lcg${i % PALETTE.length})`} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
