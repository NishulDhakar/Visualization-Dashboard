'use client';

import React, { memo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { TrendDatum } from '@/types/data';

interface Props {
  data: TrendDatum[];
  loading: boolean;
}

interface TooltipPayload {
  name: string;
  value: number;
  color: string;
}

interface CTProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string | number;
}

const CustomTooltip = ({ active, payload, label }: CTProps) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 shadow-md text-xs">
      <p className="font-semibold text-slate-500 mb-1.5">
        Year {label ?? 'N/A'}
      </p>
      {payload.map((p) => (
        <p
          key={p.name}
          className="my-0.5 font-semibold"
          style={{ color: p.color }}
        >
          {p.name}:{' '}
          <span className="text-slate-800">
            {typeof p.value === 'number' ? p.value.toFixed(2) : p.value}
          </span>
        </p>
      ))}
    </div>
  );
};

function Skeleton() {
  return (
    <div className="h-[260px] flex items-end gap-1 py-2 animate-pulse">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="bg-slate-200 rounded-md flex-1"
          style={{ height: `${30 + ((i * 17) % 50)}%` }}
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-[260px] flex items-center justify-center text-sm text-slate-400">
      No trend data available
    </div>
  );
}

function SinglePointView({ point }: { point: TrendDatum }) {
  return (
    <div className="h-[260px] flex items-center justify-center gap-16">
      <div className="text-center">
        <p className="text-xs text-slate-400 mb-1">Avg Intensity</p>
        <p className="text-3xl font-semibold text-indigo-500">
          {point.avgIntensity.toFixed(2)}
        </p>
      </div>
      <div className="text-center">
        <p className="text-xs text-slate-400 mb-1">Avg Relevance</p>
        <p className="text-3xl font-semibold text-emerald-500">
          {point.avgRelevance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

function TrendChart({ data }: { data: TrendDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart
        data={data}
        margin={{ top: 8, right: 6, left: -18, bottom: 4 }}
      >
        <defs>
          <linearGradient id="ttInt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6C63FF" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#6C63FF" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="ttRel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#059669" stopOpacity={0.20} />
            <stop offset="100%" stopColor="#059669" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="var(--line-soft)"
          vertical={false}
        />

        <XAxis
          dataKey="year"
          tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip content={<CustomTooltip />} />

        <Legend
          iconType="circle"
          iconSize={6}
          formatter={(value) => (
            <span className="text-[11px] text-slate-500">
              {value}
            </span>
          )}
        />

        <Area
          type="monotone"
          dataKey="avgIntensity"
          name="Avg Intensity"
          stroke="#6C63FF"
          strokeWidth={2.5}
          fill="url(#ttInt)"
          dot={false}
          activeDot={{ r: 4, fill: '#6C63FF', strokeWidth: 0 }}
        />

        <Area
          type="monotone"
          dataKey="avgRelevance"
          name="Avg Relevance"
          stroke="#059669"
          strokeWidth={2}
          fill="url(#ttRel)"
          dot={false}
          activeDot={{ r: 4, fill: '#059669', strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function TimeTrendChart({ data, loading }: Props) {
  if (loading) return <Skeleton />;

  if (!data || data.length === 0) return <EmptyState />;

  if (data.length === 1) return <SinglePointView point={data[0]} />;

  return <TrendChart data={data} />;
}

export default memo(TimeTrendChart);