'use client';

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import type { RegionDatum } from '@/types/data';

interface Props { data: RegionDatum[]; loading: boolean }

interface CTProps { active?: boolean; payload?: Array<{ value: number }>; label?: string }

const CustomTooltip = ({ active, payload, label }: CTProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-md text-xs min-w-[140px]">
      <p className="text-slate-500 font-semibold mb-1">{label}</p>
      <p className="text-indigo-600 font-bold">
        Avg Intensity: <span className="text-slate-800">{payload[0]?.value?.toFixed(2)}</span>
      </p>
    </div>
  );
};

// Purple intensity gradient palette
const STOPS = ['#6C63FF', '#7B74FF', '#8A85FF', '#9996FF', '#A8A7FF', '#B7B8FF', '#C6C9FF', '#D5DAFF', '#E4EBFF'];

function Skel() {
  return (
    <div className="h-[320px] flex gap-1.5 py-2 items-end">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="skeleton flex-1 rounded-md" style={{ height: `${25 + ((i * 14) % 60)}%` }} />
      ))}
    </div>
  );
}

export default function RegionHeatBarChart({ data, loading }: Props) {
  if (loading) return <Skel />;
  const maxVal = Math.max(...data.map((d) => d.avgIntensity), 1);
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 8, right: 6, left: -18, bottom: 85 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--line-soft)" vertical={false} />
        <XAxis
          dataKey="region"
          tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
          angle={-45} textAnchor="end"
          axisLine={false} tickLine={false}
        />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(108,99,255,0.05)' }} />
        <Bar dataKey="avgIntensity" radius={[5, 5, 0, 0]} maxBarSize={36}>
          {data.map((d, i) => {
            const opacity = 0.35 + 0.65 * (d.avgIntensity / maxVal);
            return <Cell key={i} fill={STOPS[i % STOPS.length]} fillOpacity={opacity} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
