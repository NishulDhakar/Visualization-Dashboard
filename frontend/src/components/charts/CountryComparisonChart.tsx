'use client';

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import type { CountryDatum } from '@/types/data';

interface Props { data: CountryDatum[]; loading: boolean }

interface CTProps { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }

const CustomTooltip = ({ active, payload, label }: CTProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-md text-xs min-w-[140px]">
      <p className="text-slate-500 font-semibold mb-1.5">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="my-0.5 font-semibold" style={{ color: p.color }}>
          {p.name}: <span className="text-slate-800">{p.value?.toFixed(2)}</span>
        </p>
      ))}
    </div>
  );
};

function Skel() {
  return (
    <div className="h-[320px] flex gap-1 py-2 items-end">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="skeleton flex-1" style={{ height: `${25 + ((i * 14) % 60)}%` }} />
      ))}
    </div>
  );
}

export default function CountryComparisonChart({ data, loading }: Props) {
  if (loading) return <Skel />;
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 8, right: 6, left: -18, bottom: 85 }} barGap={2}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--line-soft)" vertical={false} />
        <XAxis
          dataKey="country"
          tick={{ fill: 'var(--text-muted)', fontSize: 10 }}
          angle={-45} textAnchor="end"
          axisLine={false} tickLine={false}
        />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
        <Legend iconType="circle" iconSize={6} formatter={(v) => <span className="text-[11px] text-slate-500">{v}</span>} />
        <Bar dataKey="avgLikelihood" name="Avg Likelihood" fill="#6C63FF" fillOpacity={0.9} radius={[4, 4, 0, 0]} maxBarSize={14} />
        <Bar dataKey="avgRelevance" name="Avg Relevance" fill="#10B981" fillOpacity={0.9} radius={[4, 4, 0, 0]} maxBarSize={14} />
      </BarChart>
    </ResponsiveContainer>
  );
}
