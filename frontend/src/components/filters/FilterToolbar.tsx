'use client';

import React from 'react';
import type { Filters, FilterOptions } from '@/types/data';
import { RotateCcw, ChevronDown } from 'lucide-react';

interface Props {
  filters: Filters;
  options: FilterOptions;
  onChange: (f: Filters) => void;
  onReset: () => void;
}

const PRIMARY_KEYS: Array<{ key: keyof Filters; label: string }> = [
  { key: 'end_year', label: 'End Year' },
  { key: 'sector', label: 'Sector' },
  { key: 'region', label: 'Region' },
  { key: 'topic', label: 'Topic' },
  { key: 'country', label: 'Country' },
];

const ADVANCED_KEYS: Array<{ key: keyof Filters; label: string }> = [
  { key: 'pestle', label: 'PEST' },
  { key: 'source', label: 'Source' },
  { key: 'swot', label: 'SWOT' },
  { key: 'city', label: 'City' },
  { key: 'intensity_min', label: 'Min Intensity' },
  { key: 'likelihood_min', label: 'Min Likelihood' },
];

function FilterSelect({ label, value, optionsList, onChange }: {
  label: string; value: string; optionsList: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="relative">
        <select
          className="w-full appearance-none rounded-md border border-slate-300 bg-white py-1.5 pl-3 pr-8 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">All</option>
          {optionsList.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown
          size={12}
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"
        />
      </div>
    </div>
  );
}

export default function FilterToolbar({ filters, options, onChange, onReset }: Props) {
  const activeCount = Object.values(filters).filter((v) => v !== '').length;
  const set = (key: keyof Filters, value: string) => onChange({ ...filters, [key]: value });

  return (
    <div className="bg-white border border-slate-100 rounded-[16px] px-5 py-4 mb-5 shadow-sm">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-slate-800 m-0">
            Filters
          </p>
          {activeCount > 0 && (
            <span className="bg-indigo-500 text-white rounded-full text-[0.68rem] font-bold px-[0.42rem] py-[0.08rem]">{activeCount} active</span>
          )}
        </div>
        <button className="flex items-center gap-1 border border-slate-200 bg-white text-slate-500 rounded-lg cursor-pointer font-inter text-xs px-2.5 py-1.5 transition-colors font-medium hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 shadow-sm" onClick={onReset}>
          <RotateCcw size={11} />
          Reset all
        </button>
      </div>

      {/* Primary filters — 5 columns */}
      <div className="grid gap-[0.65rem] grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {PRIMARY_KEYS.map(({ key, label }) => (
          <FilterSelect key={key} label={label} value={filters[key]} optionsList={options[key]} onChange={(v) => set(key, v)} />
        ))}
      </div>

      {/* Advanced filters — collapsible */}
      <details className="mt-3 outline-none group">
        <summary className="cursor-pointer text-[0.82rem] text-indigo-600 font-semibold hover:text-indigo-700 transition-colors inline-flex items-center gap-1 select-none py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded px-1 -ml-1">
          <ChevronDown size={14} className="group-open:rotate-180 transition-transform duration-200" />
          More filters (PEST, SWOT, Source, City, Thresholds)
        </summary>
        <div className="grid gap-[0.65rem] grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-[0.65rem]">
          {ADVANCED_KEYS.map(({ key, label }) => (
            <FilterSelect key={key} label={label} value={filters[key]} optionsList={options[key]} onChange={(v) => set(key, v)} />
          ))}
        </div>
      </details>
    </div>
  );
}
