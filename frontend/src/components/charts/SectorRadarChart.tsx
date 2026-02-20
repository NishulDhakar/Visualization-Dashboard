'use client';

import React from 'react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, Tooltip, Legend,
} from 'recharts';
import type { SectorDatum } from '@/types/data';

interface Props { data: SectorDatum[]; loading: boolean }

interface CTProps { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }

const CustomTooltip = ({ active, payload, label }: CTProps) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-md text-xs min-w-[140px]">
            <p className="text-slate-800 font-bold mb-1.5">{label}</p>
            {payload.map((p) => (
                <p key={p.name} className="my-0.5" style={{ color: p.color }}>
                    {p.name}: <span className="font-semibold text-slate-800">{p.value}</span>
                </p>
            ))}
        </div>
    );
};

function Skel() {
    return (
        <div className="h-[280px] grid place-items-center">
            <div className="skeleton w-[200px] h-[200px] rounded-full" />
        </div>
    );
}

export default function SectorRadarChart({ data, loading }: Props) {
    if (loading) return <Skel />;
    return (
        <ResponsiveContainer width="100%" height={280}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                <PolarGrid stroke="var(--line)" />
                <PolarAngleAxis
                    dataKey="sector"
                    tick={{ fill: 'var(--text-muted)', fontSize: 9 }}
                />
                <PolarRadiusAxis
                    tick={{ fill: 'var(--text-muted)', fontSize: 9 }}
                    axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    iconType="circle" iconSize={6}
                    formatter={(v) => <span className="text-[11px] text-slate-500">{v}</span>}
                />
                <Radar name="Intensity" dataKey="avgIntensity" stroke="#6C63FF" fill="#6C63FF" fillOpacity={0.2} strokeWidth={2} />
                <Radar name="Likelihood" dataKey="avgLikelihood" stroke="#10B981" fill="#10B981" fillOpacity={0.15} strokeWidth={2} />
                <Radar name="Relevance" dataKey="avgRelevance" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.1} strokeWidth={2} />
            </RadarChart>
        </ResponsiveContainer>
    );
}
