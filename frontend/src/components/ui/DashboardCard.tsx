import React from 'react';

interface Props {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function DashboardCard({ title, subtitle, action, children, className = '' }: Props) {
  return (
    <section className={`flex min-h-[100px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md ${className}`}>
      <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-100 px-5 pb-3 pt-4">
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-slate-800 text-[15px] leading-tight m-0">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-1 leading-snug m-0">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="relative min-h-0 shrink-0 flex-1 p-5">{children}</div>
    </section>
  );
}
