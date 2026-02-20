export function ChartSkeleton({ height = 280 }: { height?: number }) {
    return (
        <div className="flex flex-col gap-3 py-1" style={{ height }}>
            <div className="flex gap-2 items-end h-full">
                {Array.from({ length: 9 }).map((_, i) => (
                    <div
                        key={i}
                        className="skeleton flex-1 rounded-t-md"
                        style={{
                            height: `${35 + ((i * 13) % 55)}%`,
                        }}
                    />
                ))}
            </div>
            <div className="skeleton h-[3px] rounded-sm opacity-50" />
        </div>
    );
}

export function FilterSkeleton() {
    return (
        <div className="flex flex-col gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                    <div className="skeleton h-2.5 w-[55%]" />
                    <div className="skeleton h-9" />
                </div>
            ))}
        </div>
    );
}

export function StatSkeleton() {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="skeleton h-2.5 w-[60%]" />
            <div className="skeleton h-7 w-[80%]" />
            <div className="skeleton h-2 w-[45%]" />
        </div>
    );
}
