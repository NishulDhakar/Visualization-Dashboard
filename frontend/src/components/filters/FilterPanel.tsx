'use client';

import React from 'react';
import { SlidersHorizontal, RotateCcw, ChevronDown, X, PanelRightClose } from 'lucide-react';
import type { Filters, FilterOptions } from '@/types/data';

interface FilterConfig {
  label: string;
  key: keyof Filters;
}

const FILTER_CONFIG: FilterConfig[] = [
  { label: 'End Year', key: 'end_year' },
  { label: 'Topic', key: 'topic' },
  { label: 'Sector', key: 'sector' },
  { label: 'Region', key: 'region' },
  { label: 'PESTLE', key: 'pestle' },
  { label: 'Source', key: 'source' },
  { label: 'SWOT', key: 'swot' },
  { label: 'Country', key: 'country' },
  { label: 'City', key: 'city' },
  { label: 'Min Intensity', key: 'intensity_min' },
  { label: 'Min Likelihood', key: 'likelihood_min' },
];

interface FilterPanelProps {
  filters: Filters;
  options: FilterOptions;
  onChange: (f: Filters) => void;
  onReset: () => void;
  isOpen: boolean;
  desktopOpen: boolean;
  onClose: () => void;
  onToggleDesktop: () => void;
}

export default function FilterPanel({
  filters,
  options,
  onChange,
  onReset,
  isOpen,
  desktopOpen,
  onClose,
  onToggleDesktop,
}: FilterPanelProps) {
  const activeCount = Object.values(filters).filter((value) => value !== '').length;
  const setFilter = (key: keyof Filters, value: string) => onChange({ ...filters, [key]: value });

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/35 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`glass-panel fixed bottom-0 right-0 top-0 z-50 w-[286px] translate-x-full border-l border-slate-200/90 px-4 py-4 transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:right-5 lg:top-5 lg:h-[calc(100vh-2.5rem)] lg:rounded-2xl lg:border ${
          isOpen ? 'translate-x-0' : ''
        } ${
          desktopOpen ? 'lg:pointer-events-auto lg:translate-x-0' : 'lg:pointer-events-none lg:translate-x-[115%]'
        }`}
        aria-label="Filters panel"
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-teal-100 text-teal-700">
              <SlidersHorizontal size={14} />
            </div>
            <div>
              <p className="font-display text-sm font-bold text-slate-900">Filters</p>
              <p className="text-[11px] text-slate-500">Refine data scope</p>
            </div>
            {activeCount > 0 && (
              <span className="rounded-full bg-teal-700 px-2 py-0.5 text-[11px] font-bold text-white">
                {activeCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg border border-slate-300 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close filters"
          >
            <X size={14} />
          </button>
          <button
            onClick={onToggleDesktop}
            className="hidden h-8 w-8 place-items-center rounded-lg border border-slate-300 text-slate-500 hover:bg-slate-100 lg:grid"
            aria-label="Collapse filters panel"
          >
            <PanelRightClose size={14} />
          </button>
        </div>

        <button
          onClick={onReset}
          className="mb-4 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
        >
          <RotateCcw size={12} />
          Reset all filters
        </button>

        <div className="h-[calc(100%-110px)] overflow-y-auto pr-1">
          <div className="space-y-3">
            {FILTER_CONFIG.map(({ label, key }) => (
              <div key={key}>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500" htmlFor={`filter-${key}`}>
                  {label}
                </label>
                <div className="relative">
                  <select
                    id={`filter-${key}`}
                    value={filters[key]}
                    onChange={(event) => setFilter(key, event.target.value)}
                    className="w-full appearance-none rounded-lg border border-slate-300 bg-white py-2 pl-3 pr-8 text-sm text-slate-800 outline-none transition-colors focus:border-teal-600 focus:ring-2 focus:ring-teal-200"
                  >
                    <option value="">All</option>
                    {options[key].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
