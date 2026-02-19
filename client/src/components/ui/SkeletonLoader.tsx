export function ChartSkeleton({ height = 280 }: { height?: number }) {
    return (
        <div className="animate-pulse" style={{ height }}>
            <div className="h-4 bg-slate-700 rounded w-1/3 mb-4" />
            <div className="flex items-end gap-2 h-[calc(100%-2rem)]">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex-1 bg-slate-700 rounded-t"
                        style={{ height: `${30 + Math.random() * 60}%` }}
                    />
                ))}
            </div>
        </div>
    );
}

export function FilterSkeleton() {
    return (
        <div className="animate-pulse space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i}>
                    <div className="h-3 bg-slate-700 rounded w-2/3 mb-1.5" />
                    <div className="h-9 bg-slate-700 rounded" />
                </div>
            ))}
        </div>
    );
}

export function StatSkeleton() {
    return (
        <div className="animate-pulse space-y-2">
            <div className="h-3 bg-slate-700 rounded w-1/2" />
            <div className="h-8 bg-slate-700 rounded w-3/4" />
        </div>
    );
}
