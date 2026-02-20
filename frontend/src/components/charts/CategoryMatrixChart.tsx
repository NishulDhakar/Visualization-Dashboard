'use client';

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts';
import type { CategoryDatum } from '@/types/data';

interface Props { data: CategoryDatum[]; loading: boolean }

interface CTProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CTProps) => {
  if (!active || !payload) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-md text-xs min-w-[140px]">
      <p className="font-bold text-slate-800 mb-1.5">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="my-0.5" style={{ color: p.color }}>
          {p.name}: <span className="font-semibold text-slate-800">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

const SWOT_COLORS = { Strength: '#10B981', Opportunity: '#6C63FF', Weakness: '#F59E0B', Threat: '#F43F5E' };

function Skel() {
  return (
    <div className="h-[260px] flex gap-1.5 py-2 items-end">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton flex-1" style={{ height: `${40 + ((i * 11) % 45)}%` }} />
      ))}
    </div>
  );
}

export default function CategoryMatrixChart({ data, loading }: Props) {
  if (loading) return <Skel />;
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 5 }} barSize={12}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--line-soft)" vertical={false} />
        <XAxis dataKey="category" tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
        <Legend
          iconType="circle" iconSize={7}
          formatter={(v) => <span className="text-[11px] text-slate-500">{v}</span>}
        />
        <Bar dataKey="Strength" stackId="s" fill={SWOT_COLORS.Strength} fillOpacity={0.9} radius={[0, 0, 0, 0]} />
        <Bar dataKey="Opportunity" stackId="s" fill={SWOT_COLORS.Opportunity} fillOpacity={0.9} radius={[0, 0, 0, 0]} />
        <Bar dataKey="Weakness" stackId="s" fill={SWOT_COLORS.Weakness} fillOpacity={0.9} radius={[0, 0, 0, 0]} />
        <Bar dataKey="Threat" stackId="s" fill={SWOT_COLORS.Threat} fillOpacity={0.9} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
