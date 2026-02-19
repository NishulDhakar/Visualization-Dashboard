'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import type { Filters } from '@/types/data';

interface FilterOption {
    label: string;
    key: keyof Filters;
    options: string[];
}

const FILTER_CONFIG: FilterOption[] = [
    {
        label: 'End Year',
        key: 'end_year',
        options: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2030', '2035', '2040', '2050'],
    },
    {
        label: 'Topic',
        key: 'topic',
        options: ['oil', 'gas', 'gdp', 'war', 'market', 'economy', 'production', 'export', 'growth', 'consumption', 'battery', 'robot', 'biofuel', 'policy', 'strategy', 'energy', 'economic'],
    },
    {
        label: 'Sector',
        key: 'sector',
        options: ['Energy', 'Environment', 'Government', 'Aerospace & defence', 'Manufacturing', 'Retail', 'Financial services', 'Healthcare', 'Information Technology', 'Support services'],
    },
    {
        label: 'Region',
        key: 'region',
        options: ['Northern America', 'Central America', 'Western Africa', 'Eastern Europe', 'Western Asia', 'Central Africa', 'World', 'Southern Africa', 'Southern Asia', 'Northern Africa', 'Central Asia'],
    },
    {
        label: 'PESTLE',
        key: 'pestle',
        options: ['Political', 'Economic', 'Social', 'Technological', 'Legal', 'Environmental', 'Industries', 'Healthcare', 'Organization'],
    },
    {
        label: 'Source',
        key: 'source',
        options: ['EIA', 'Reuters', 'World Bank', 'Bloomberg Business', 'CleanTechnica', 'therobotreport', 'Vanguard News', 'Yes Bank', 'Zero Hedge'],
    },
    {
        label: 'Country',
        key: 'country',
        options: ['United States of America', 'Mexico', 'Nigeria', 'Russia', 'Saudi Arabia', 'India', 'China', 'South Africa', 'Angola', 'Egypt', 'Ukraine', 'Azerbaijan', 'Lebanon'],
    },
    {
        label: 'City',
        key: 'city',
        options: [],
    },
];

interface FilterPanelProps {
    filters: Filters;
    onChange: (filters: Filters) => void;
    onReset: () => void;
    isOpen: boolean;
    onClose: () => void;
}

export default function FilterPanel({ filters, onChange, onReset, isOpen, onClose }: FilterPanelProps) {
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleChange = useCallback(
        (key: keyof Filters, value: string) => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                onChange({ ...filters, [key]: value });
            }, 300);
        },
        [filters, onChange]
    );

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    const activeCount = Object.values(filters).filter((v) => v !== '').length;

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
          fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-slate-900 border-r border-slate-700/60
          z-40 overflow-y-auto transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:h-auto lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <div className="p-5">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
                            <span className="text-white font-semibold text-sm">Filters</span>
                            {activeCount > 0 && (
                                <span className="bg-indigo-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                                    {activeCount}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={onReset}
                            className="flex items-center gap-1 text-xs text-slate-400 hover:text-indigo-400 transition-colors"
                        >
                            <RotateCcw className="w-3 h-3" />
                            Reset
                        </button>
                    </div>

                    <div className="space-y-4">
                        {FILTER_CONFIG.map(({ label, key, options }) => (
                            <div key={key}>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">
                                    {label}
                                </label>
                                <select
                                    value={filters[key]}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-lg px-3 py-2
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500
                    hover:border-slate-500 transition-colors cursor-pointer appearance-none"
                                >
                                    <option value="">All</option>
                                    {options.map((opt) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
        </>
    );
}
