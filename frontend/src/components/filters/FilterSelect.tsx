interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function FilterSelect({
  label,
  value,
  options,
  onChange,
  disabled = false,
}: FilterSelectProps) {
  return (
    <label className="flex flex-col gap-1">
      <span>{label}</span>
      <select className="w-full rounded-md border border-gray-300 bg-white py-1.5 px-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors" value={value} onChange={(event) => onChange(event.target.value)} disabled={disabled}>
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
