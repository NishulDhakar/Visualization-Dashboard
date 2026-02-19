import React from 'react';

interface CardProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
    noPadding?: boolean;
}

export default function Card({ title, subtitle, children, className = '', noPadding = false }: CardProps) {
    return (
        <div className={`bg-slate-800 border border-slate-700/60 rounded-xl shadow-lg ${className}`}>
            {(title || subtitle) && (
                <div className="px-5 pt-5 pb-3 border-b border-slate-700/40">
                    {title && <h3 className="text-white font-semibold text-sm">{title}</h3>}
                    {subtitle && <p className="text-slate-400 text-xs mt-0.5">{subtitle}</p>}
                </div>
            )}
            <div className={noPadding ? '' : 'p-5'}>{children}</div>
        </div>
    );
}
