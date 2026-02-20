'use client';

import React from 'react';
import {
  SlidersHorizontal,
  RefreshCw,
  Download,
  Search,
  PanelLeftClose,
  PanelRightClose,
} from 'lucide-react';

interface Props {
  activeFilterCount: number;
  onOpenFilters: () => void;
  onToggleSidebar: () => void;
  onToggleFiltersDesktop: () => void;
  sidebarOpen: boolean;
  filtersOpen: boolean;
}

export default function TopNavbar({
  activeFilterCount,
  onOpenFilters,
  onToggleSidebar,
  onToggleFiltersDesktop,
  sidebarOpen,
  filtersOpen,
}: Props) {
  return (
    <div className="mb-6 space-y-4">
      <div className="glass-panel flex h-14 items-center gap-2 rounded-xl px-3 sm:px-4">
        <div className="relative min-w-0 flex-1">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search insights, sectors, or countries"
            className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 outline-none transition-colors focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
          />
        </div>

        <button
          className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 lg:flex"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <PanelLeftClose size={14} />
          {sidebarOpen ? 'Menu' : 'Open'}
        </button>

        <button
          className="hidden items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 lg:flex"
          onClick={onToggleFiltersDesktop}
          aria-label="Toggle filters panel"
        >
          <PanelRightClose size={14} />
          {filtersOpen ? 'Filters' : 'Open'}
        </button>

        <button
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 lg:hidden"
          onClick={onOpenFilters}
          aria-label="Open filters"
        >
          <SlidersHorizontal size={14} />
          Filters
          {activeFilterCount > 0 && (
            <span className="rounded-full bg-teal-600 px-2 py-0.5 text-xs font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        <button
          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          title="Reload data"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={15} />
        </button>

        <button className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white transition-colors hover:bg-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600">
          <Download size={14} />
          Export
        </button>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Analytics Workspace</p>
        <h1 className="font-display text-2xl font-bold leading-tight text-slate-900">
          Global Insights Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Clear business-friendly visuals connected directly to your backend data.
        </p>
      </div>
    </div>
  );
}
