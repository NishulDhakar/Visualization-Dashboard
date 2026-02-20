'use client';

import React, { useMemo } from 'react';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import type { DataRecord } from '@/types/data';
import { ChartSkeleton } from '@/components/ui/SkeletonLoader';

const PALETTE = ['#6366f1', '#10b981', '#f59e0b', '#0ea5e9', '#f43f5e', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#a3e635'];

interface TooltipEntry { name: string; value: number; payload: { percent: number } }
interface CustomTooltipProps { active?: boolean; payload?: TooltipEntry[] }

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (!active || !payload?.length) return null;
    const item = payload[0]!;
    return (
        <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-md min-w-[130px]">
            <p className="text-[11px] text-slate-500 mb-1">{item.name}</p>
            <p className="text-[13px] font-bold text-slate-800 font-mono">
                {item.value} records
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
                {((item.payload.percent) * 100).toFixed(1)}% of total
            </p>
        </div>
    );
};

export default function SectorPieChart({ data, loading }: { data: DataRecord[]; loading: boolean }) {
    const pieData = useMemo(() => {
        const counts: Record<string, number> = {};
        data.forEach((d) => {
            if (d.sector) counts[d.sector] = (counts[d.sector] ?? 0) + 1;
        });
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 9)
            .map(([name, value]) => ({ name, value }));
    }, [data]);

    if (loading) return <ChartSkeleton height={260} />;

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={pieData}
                    cx="50%" cy="42%"
                    outerRadius={85} innerRadius={42}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                    strokeWidth={0}
                >
                    {pieData.map((_, i) => (
                        <Cell key={i} fill={PALETTE[i % PALETTE.length]} fillOpacity={0.85} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    iconType="circle"
                    iconSize={7}
                    formatter={(value: string) => (
                        <span className="text-[10px] text-slate-500 font-mono">
                            {value}
                        </span>
                    )}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}
