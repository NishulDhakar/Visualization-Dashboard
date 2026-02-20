'use client';

import React from 'react';
import { BarChart3, LayoutDashboard, TrendingUp, Globe, Settings, HelpCircle } from 'lucide-react';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: TrendingUp, label: 'Analytics' },
  { icon: Globe, label: 'Regions' },
  { icon: BarChart3, label: 'Reports' },
];

const BOTTOM_ITEMS = [
  { icon: Settings, label: 'Settings' },
  { icon: HelpCircle, label: 'Help' },
];

interface SidebarNavProps {
  className?: string;
}

export default function SidebarNav({ className = '' }: SidebarNavProps) {
  const navRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const focusable = nav.querySelectorAll<HTMLButtonElement>('button[tabindex="0"]');
        const active = document.activeElement;
        const idx = Array.from(focusable).indexOf(active as HTMLButtonElement);
        let nextIdx = idx;
        if (e.key === 'ArrowDown') nextIdx = (idx + 1) % focusable.length;
        if (e.key === 'ArrowUp') nextIdx = (idx - 1 + focusable.length) % focusable.length;
        focusable[nextIdx]?.focus();
        e.preventDefault();
      }
    };
    nav.addEventListener('keydown', handleKeyDown);
    return () => nav.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <aside
      className={`glass-panel flex h-screen w-[256px] flex-col overflow-hidden border-r border-slate-200/90 px-4 py-5 ${className}`}
      aria-label="Sidebar navigation"
      ref={navRef}
    >
      <div className="mb-2 flex select-none items-center gap-2.5 px-2">
        <div className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[9px] bg-gradient-to-br from-teal-700 to-sky-600 text-white shadow-md">
          <BarChart3 size={18} />
        </div>
        <div>
          <p className="font-display text-[0.96rem] font-bold text-slate-900">Blackcoffer</p>
          <p className="mt-[1px] text-[0.7rem] text-slate-500">Global Analytics Lab</p>
        </div>
      </div>

      <span className="mb-1 mt-10 px-3 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-slate-500">Main</span>
      <nav className="flex flex-1 flex-col gap-2" aria-label="Main navigation">
        {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            className={`group flex w-full items-center gap-[0.6rem] rounded-lg px-3 py-[0.58rem] text-left text-sm font-medium transition-all duration-200 outline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${active ? 'bg-teal-50 text-teal-800 shadow-sm' : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}`}
            aria-current={active ? 'page' : undefined}
            tabIndex={0}
            aria-label={label + (active ? ' (current page)' : '')}
          >
            <Icon size={16} className={`transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-105'}`} />
            <span className="truncate">{label}</span>
            {active && (
              <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-teal-600" aria-hidden="true" />
            )}
          </button>
        ))}
      </nav>

      <span className="mb-1 mt-4 px-3 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-slate-500">Account</span>
      <nav className="flex flex-col gap-[2px]" aria-label="Account navigation">
        {BOTTOM_ITEMS.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="group flex w-full items-center gap-[0.6rem] rounded-lg px-3 py-[0.55rem] text-left text-sm font-medium transition-all duration-200 outline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 hover:bg-slate-100/80 hover:text-slate-900"
            tabIndex={0}
            aria-label={label}
          >
            <Icon size={16} className="text-slate-500 transition-transform duration-200 group-hover:scale-105 group-hover:text-slate-800" />
            <span className="truncate text-slate-600 group-hover:text-slate-900">{label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto flex select-none items-center gap-2.5 border-t border-slate-200 pt-4 px-3">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-gradient-to-br from-teal-700 to-sky-600 text-[11px] font-bold text-white shadow-sm">
          B
        </div>
        <div className="min-w-0">
          <p className="mb-0.5 text-[0.78rem] font-semibold text-slate-900">Admin User</p>
          <p className="truncate text-[0.7rem] text-slate-500">
            Global Analytics
          </p>
        </div>
      </div>
    </aside>
  );
}
