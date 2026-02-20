'use client';

import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import type { TrendDatum } from '@/types/data';

interface Props { data: TrendDatum[]; loading: boolean }

interface TooltipPayload { name: string; value: number; color: string }
interface CTProps { active?: boolean; payload?: TooltipPayload[]; label?: string }

const CustomTooltip = ({ active, payload, label }: CTProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-md text-xs">
      <p className="font-semibold text-slate-500 mb-1.5">Year {label}</p>
      {payload.map((p) => (
        <p key={p.name} className="my-0.5 font-semibold" style={{ color: p.color }}>
          {p.name}: <span className="text-slate-800">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

function Skel() {
  return (
    <div className="h-[260px] flex items-end gap-1 py-2">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="skeleton flex-1" style={{ height: `${30 + ((i * 17) % 50)}%` }} />
      ))}
    </div>
  );
}

export default function TimeTrendChart({ data, loading }: Props) {
  if (loading) return <Skel />;
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 8, right: 6, left: -18, bottom: 4 }}>
        <defs>
          <linearGradient id="ttInt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6C63FF" stopOpacity={0.22} />
            <stop offset="100%" stopColor="#6C63FF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="ttRel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10B981" stopOpacity={0.18} />
            <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--line-soft)" vertical={false} />
        <XAxis dataKey="year" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend iconType="circle" iconSize={6} formatter={(v) => <span className="text-[11px] text-slate-500">{v}</span>} />
        <Area type="monotone" dataKey="avgIntensity" name="Avg Intensity" stroke="#6C63FF" strokeWidth={2} fill="url(#ttInt)" dot={false} activeDot={{ r: 4, fill: '#6C63FF', strokeWidth: 0 }} />
        <Area type="monotone" dataKey="avgRelevance" name="Avg Relevance" stroke="#10B981" strokeWidth={2} fill="url(#ttRel)" dot={false} activeDot={{ r: 4, fill: '#10B981', strokeWidth: 0 }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}
