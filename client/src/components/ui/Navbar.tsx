'use client';

import React from 'react';
import { BarChart3, LayoutDashboard, TrendingUp } from 'lucide-react';

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-900 border-b border-slate-700/60 flex items-center px-6 gap-4 shadow-lg">
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold text-lg tracking-tight">DataViz</span>
                <span className="text-slate-500 text-sm font-medium">Dashboard</span>
            </div>

            <div className="ml-auto flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-1.5 text-slate-400 text-sm">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Analytics</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span className="hidden sm:inline">Insights</span>
                </div>
                <div className="w-px h-5 bg-slate-600" />
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    VD
                </div>
            </div>
        </header>
    );
}
