import type { CountryData } from '@/lib/types';

type Props = { data: CountryData };

export default function HistoryTab({ data }: Props) {
  return (
    <div className="space-y-4 text-sm">
      <h3 className="text-xs uppercase tracking-wider text-slate-500">
        In brief
      </h3>
      <p className="text-slate-200 leading-relaxed">{data.history_brief}</p>
    </div>
  );
}
