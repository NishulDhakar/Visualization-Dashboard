import React from 'react';

interface CardProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
    noPadding?: boolean;
    accentColor?: string;
}

export default function Card({
    title,
    subtitle,
    children,
    className = '',
    noPadding = false,
    accentColor,
}: CardProps) {
    return (
        <div
            className={`card relative overflow-hidden bg-white/5 border border-white/5 rounded-2xl shadow-sm ${className}`}
        >
            {accentColor && (
                <div
                    className="absolute top-0 left-0 w-[3px] h-full rounded-l-2xl"
                    style={{ background: accentColor }}
                />
            )}

            {(title || subtitle) && (
                <div
                    className={`pt-4 pb-3 border-b border-white/5 flex flex-col gap-0.5 ${accentColor ? 'pl-6 pr-5' : 'px-5'}`}
                >
                    {title && (
                        <h3 className="font-mono font-semibold text-[13px] text-slate-200 tracking-[-0.01em]">
                            {title}
                        </h3>
                    )}
                    {subtitle && (
                        <p className="text-[11px] text-slate-500">{subtitle}</p>
                    )}
                </div>
            )}

            <div className={`${noPadding ? '' : `py-4 ${accentColor ? 'pl-6 pr-5' : 'px-5'}`}`}>
                {children}
            </div>
        </div>
    );
}
