'use client';

import React from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis,
} from 'recharts';
import type { DataRecord } from '@/types/data';
import { ChartSkeleton } from '@/components/ui/SkeletonLoader';

interface TooltipPayload { name: string; value: number }
interface CustomTooltipProps { active?: boolean; payload?: TooltipPayload[] }

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (!active || !payload || payload.length < 2) return null;
    return (
        <div style={{
            background: '#0d1321',
            border: '1px solid rgba(245,158,11,0.25)',
            borderRadius: '10px',
            padding: '10px 14px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        }}>
            <p style={{ fontSize: '11px', color: '#f59e0b', fontFamily: "'Fira Code', monospace" }}>
                Intensity <span style={{ color: '#e2e8f0', fontWeight: 700 }}>{payload[0]?.value}</span>
            </p>
            <p style={{ fontSize: '11px', color: '#818cf8', fontFamily: "'Fira Code', monospace", marginTop: '2px' }}>
                Likelihood <span style={{ color: '#e2e8f0', fontWeight: 700 }}>{payload[1]?.value}</span>
            </p>
        </div>
    );
};

export default function IntensityLikelihoodScatter({ data, loading }: { data: DataRecord[]; loading: boolean }) {
    if (loading) return <ChartSkeleton height={260} />;

    const pts = data
        .filter((d) => d.intensity > 0 && d.likelihood > 0)
        .slice(0, 200)
        .map((d) => ({ x: d.intensity, y: d.likelihood }));

    return (
        <ResponsiveContainer width="100%" height={260}>
            <ScatterChart margin={{ top: 10, right: 8, left: -16, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis
                    dataKey="x" name="Intensity" type="number"
                    tick={{ fill: '#475569', fontSize: 10 }}
                    label={{ value: 'Intensity', position: 'insideBottom', offset: -1, fill: '#334155', fontSize: 10 }}
                    axisLine={false} tickLine={false}
                />
                <YAxis
                    dataKey="y" name="Likelihood" type="number"
                    tick={{ fill: '#475569', fontSize: 10 }}
                    label={{ value: 'Likelihood', angle: -90, position: 'insideLeft', fill: '#334155', fontSize: 10 }}
                    axisLine={false} tickLine={false}
                />
                <ZAxis range={[24, 24]} />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#1e293b' }} />
                <Scatter data={pts} fill="#f59e0b" fillOpacity={0.55} />
            </ScatterChart>
        </ResponsiveContainer>
    );
}
