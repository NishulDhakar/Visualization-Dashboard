'use client';

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import type { LikelihoodByCountry } from '@/types/data';
import { ChartSkeleton } from '@/components/ui/SkeletonLoader';

const COLORS = ['#10b981', '#34d399', '#6ee7b7', '#059669', '#047857', '#065f46', '#a7f3d0', '#d1fae5', '#ecfdf5', '#14b8a6'];

interface Props {
    data: LikelihoodByCountry[];
    loading: boolean;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 shadow-xl text-sm">
                <p className="text-slate-300 font-medium">{label}</p>
                <p className="text-emerald-400 font-bold mt-0.5">
                    Avg Likelihood: <span className="text-white">{payload[0]?.value?.toFixed(2)}</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function LikelihoodByCountryChart({ data, loading }: Props) {
    if (loading) return <ChartSkeleton height={300} />;

    const top15 = data.slice(0, 15);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={top15}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 80, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} domain={[0, 5]} />
                <YAxis
                    dataKey="country"
                    type="category"
                    tick={{ fill: '#94a3b8', fontSize: 11 }}
                    width={75}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(16,185,129,0.08)' }} />
                <Bar dataKey="avgLikelihood" radius={[0, 4, 4, 0]}>
                    {top15.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
