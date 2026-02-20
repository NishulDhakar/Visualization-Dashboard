'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { TopicDatum } from '@/types/data';

interface Props { data: TopicDatum[]; loading: boolean }

const PALETTE = [
  '#6C63FF', '#10B981', '#F59E0B', '#0EA5E9', '#F43F5E',
  '#8B5CF6', '#EC4899', '#14B8A6', '#F97316',
];

interface CTProps { active?: boolean; payload?: Array<{ name: string; value: number; payload: { percent?: number } }> }

const CustomTooltip = ({ active, payload }: CTProps) => {
  if (!active || !payload?.length) return null;
  const item = payload[0]!;
  return (
    <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-md text-xs">
      <p className="text-slate-500 mb-1 capitalize">{item.name}</p>
      <p className="text-indigo-600 font-bold">{item.value} records</p>
    </div>
  );
};

function Skel() {
  return (
    <div className="h-[200px] flex gap-4 items-center">
      <div className="skeleton w-40 h-40 rounded-full shrink-0" />
      <div className="flex-1 flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-3" style={{ width: `${50 + ((i * 13) % 35)}%` }} />
        ))}
      </div>
    </div>
  );
}

export default function TopicDistributionChart({ data, loading }: Props) {
  if (loading) return <Skel />;
  const total = data.reduce((s, d) => s + d.value, 0);
  return (
    <div className="topic-chart-wrap">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="topic"
            cx="50%" cy="50%"
            outerRadius={80} innerRadius={46}
            paddingAngle={3}
            stroke="none"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} fillOpacity={0.88} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <ul className="topic-legend">
        {data.map((d, i) => (
          <li key={d.topic}>
            <span style={{ background: PALETTE[i % PALETTE.length] }} />
            <span className="text-slate-800 font-medium capitalize overflow-hidden text-ellipsis whitespace-nowrap">
              {d.topic}
            </span>
            <em>{Math.round((d.value / total) * 100)}%</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
