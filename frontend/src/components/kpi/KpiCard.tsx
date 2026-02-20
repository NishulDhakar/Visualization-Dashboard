'use client';

import React from 'react';
import type { ElementType } from 'react';

interface Props {
  label: string;
  value: string;
  tone: 'blue' | 'green' | 'amber' | 'rose';
  icon: ElementType;
}

export default function KpiCard({ label, value, tone, icon: Icon }: Props) {
  const toneMap = {
    blue: 'bg-indigo-50 text-indigo-600',
    green: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-600',
  };

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-tight text-slate-700">{label}</p>
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${toneMap[tone]}`}>
          <Icon size={16} />
        </div>
      </div>
      <p className="font-display mb-1 text-[1.7rem] font-bold leading-none text-slate-900">{value}</p>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">{label}</p>
    </div>
  );
}
