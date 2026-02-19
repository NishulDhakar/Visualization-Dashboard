'use client';

import React, { useMemo } from 'react';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import type { DataRecord } from '@/types/data';
import { ChartSkeleton } from '@/components/ui/SkeletonLoader';

const COLORS = [
    '#6366f1', '#10b981', '#f59e0b', '#ef4444', '#0ea5e9',
    '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#a3e635',
];

interface Props {
    data: DataRecord[];
    loading: boolean;
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { percent: number } }> }) => {
    if (active && payload && payload.length) {
        const item = payload[0];
        return (
            <div className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 shadow-xl text-sm">
                <p className="text-slate-300 font-medium">{item?.name}</p>
                <p className="text-indigo-400 font-bold mt-0.5">
                    Count: <span className="text-white">{item?.value}</span>
                </p>
                <p className="text-slate-400 text-xs mt-0.5">
                    {((item?.payload.percent ?? 0) * 100).toFixed(1)}% of total
                </p>
            </div>
        );
    }
    return null;
};

export default function SectorPieChart({ data, loading }: Props) {
    if (loading) return <ChartSkeleton height={280} />;

    const pieData = useMemo(() => {
        const counts: Record<string, number> = {};
        data.forEach((d) => {
            if (d.sector && d.sector !== '') {
                counts[d.sector] = (counts[d.sector] ?? 0) + 1;
            }
        });
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([name, value]) => ({ name, value }));
    }, [data]);

    return (
        <ResponsiveContainer width="100%" height={280}>
            <PieChart>
                <Pie
                    data={pieData}
                    cx="50%"
                    cy="45%"
                    outerRadius={90}
                    innerRadius={45}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                >
                    {pieData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    formatter={(value) => (
                        <span className="text-slate-300 text-xs">{value}</span>
                    )}
                    iconType="circle"
                    iconSize={8}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}
