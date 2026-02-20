'use client';

import React from 'react';
import { X } from 'lucide-react';
import type { CityDatum } from '@/types/data';

interface Props {
  open: boolean;
  onClose: () => void;
  data: CityDatum[];
}

function badge(value: number, max: number) {
  const pct = max ? value / max : 0;
  const colorClass = pct > 0.66 ? 'bg-emerald-500' : pct > 0.33 ? 'bg-amber-500' : 'bg-rose-500';
  return (
    <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${colorClass}`} />
  );
}

export default function CityDrilldownModal({ open, onClose, data }: Props) {
  if (!open) return null;
  const maxRecords = Math.max(...data.map((d) => d.records), 1);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm grid place-items-center p-4" onClick={onClose}>
      <div className="w-[96vw] max-w-[900px] max-h-[88vh] overflow-hidden rounded-[20px] bg-white border border-slate-100 shadow-xl flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100 bg-slate-50">
          <h4 className="font-space-grotesk text-base font-bold text-slate-800 m-0">City / Country Drill-down</h4>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1"
          >
            <X size={16} />
            Close
          </button>
        </div>
        <div className="overflow-auto flex-1 p-0">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead className="bg-white sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-5 py-3 text-xs font-bold tracking-wider text-slate-400 uppercase border-b border-slate-100">#</th>
                <th className="px-5 py-3 text-xs font-bold tracking-wider text-slate-400 uppercase border-b border-slate-100">Location</th>
                <th className="px-5 py-3 text-xs font-bold tracking-wider text-slate-400 uppercase border-b border-slate-100">Records</th>
                <th className="px-5 py-3 text-xs font-bold tracking-wider text-slate-400 uppercase border-b border-slate-100">Avg Intensity</th>
                <th className="px-5 py-3 text-xs font-bold tracking-wider text-slate-400 uppercase border-b border-slate-100">Avg Likelihood</th>
                <th className="px-5 py-3 text-xs font-bold tracking-wider text-slate-400 uppercase border-b border-slate-100">Avg Relevance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {data.map((row, i) => (
                <tr key={row.city} className="hover:bg-slate-50/60 transition-colors">
                  <td className="px-5 py-3 text-sm text-slate-400 font-medium">{i + 1}</td>
                  <td className="px-5 py-3 text-sm font-semibold text-slate-800">{row.city}</td>
                  <td className="px-5 py-3 text-sm text-slate-600 flex items-center">
                    {badge(row.records, maxRecords)}
                    {row.records}
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600 font-mono">{row.avgIntensity}</td>
                  <td className="px-5 py-3 text-sm text-slate-600 font-mono">{row.avgLikelihood}</td>
                  <td className="px-5 py-3 text-sm text-slate-600 font-mono">{row.avgRelevance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
