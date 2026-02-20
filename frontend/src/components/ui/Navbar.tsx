'use client';

import React from 'react';
import { BarChart3, Bell, Search } from 'lucide-react';

export default function Navbar() {
    return (
        <header
            className="fixed top-3 left-3 right-3 z-50 h-14 bg-slate-900/85 backdrop-blur-xl border border-indigo-500/15 rounded-[14px] flex items-center px-5 gap-3 shadow-[0_4px_24px_rgba(0,0,0,0.4),inner_0_1px_0_rgba(255,255,255,0.04)] transition-all"
        >
            {/* Logo */}
            <div className="flex items-center gap-2.5">
                <div
                    className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                >
                    <BarChart3 size={16} color="#fff" />
                </div>
                <div className="flex items-baseline">
                    <span className="font-mono font-semibold text-[15px] text-slate-100 tracking-[-0.02em]">
                        Blackcoffer
                    </span>
                    <span className="font-mono text-xs text-indigo-400 ml-1.5 opacity-80">
                        v2.0
                    </span>
                </div>
            </div>

            {/* Search bar */}
            <div
                className="hidden sm:flex flex-1 max-w-[320px] mx-auto items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 transition-colors focus-within:border-indigo-500/50 focus-within:bg-white/10"
            >
                <Search size={13} className="text-slate-400" />
                <span className="text-[13px] text-slate-400">Search insights...</span>
                <span
                    className="ml-auto font-mono text-[11px] text-slate-300 bg-white/5 px-1.5 py-[1px] rounded border border-white/10"
                >
                    ⌘K
                </span>
            </div>

            {/* Right side */}
            <div className="ml-auto flex items-center gap-2">
                <button
                    className="relative w-[34px] h-[34px] flex items-center justify-center bg-white/5 border border-white/10 rounded-lg cursor-pointer transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    aria-label="Notifications"
                >
                    <Bell size={15} className="text-slate-400" />
                    <span
                        className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full border-[1.5px] border-[#0d1321]"
                    />
                </button>

                {/* Separator */}
                <div className="w-px h-5 bg-white/10" />

                {/* Avatar */}
                <div
                    className="flex items-center gap-2 cursor-pointer p-1 rounded-lg transition-colors hover:bg-white/5"
                >
                    <div
                        className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-xs font-bold text-white font-mono"
                    >
                        VD
                    </div>
                    <div className="hidden lg:block">
                        <div className="text-xs font-semibold text-slate-200 leading-tight">Admin</div>
                        <div className="text-[10px] text-slate-500 leading-tight">Global Analytics</div>
                    </div>
                </div>
            </div>
        </header>
    );
}
