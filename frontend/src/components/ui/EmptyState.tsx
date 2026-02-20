import React from 'react';
import { InboxIcon } from 'lucide-react';

interface Props {
  title: string;
  description?: string;
}

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="bg-white border border-dashed border-slate-200 rounded-2xl py-10 px-6 text-center mb-4 flex flex-col items-center justify-center min-h-[250px] shadow-sm">
      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-3 text-indigo-600">
        <InboxIcon size={20} />
      </div>
      <p className="font-space-grotesk text-base font-bold text-slate-800 mb-1.5">{title}</p>
      {description && <p className="text-sm text-slate-500 max-w-sm mx-auto">{description}</p>}
    </div>
  );
}
