import type { CountryData } from '@/lib/types';

type Props = { data: CountryData };

export default function PositionTab({ data }: Props) {
  const { current_position, strengths, weaknesses } = data;
  return (
    <div className="space-y-6 text-sm">
      <section>
        <h3 className="mb-2 text-xs uppercase tracking-wider text-slate-500">
          Where they stand
        </h3>
        <p className="text-slate-200 leading-relaxed">{current_position}</p>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="mb-2 text-xs uppercase tracking-wider text-slate-500">
            Strengths
          </h3>
          <ul className="space-y-1.5 text-slate-200">
            {strengths.map((s) => (
              <li key={s} className="flex gap-2">
                <span className="text-green-400">+</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-2 text-xs uppercase tracking-wider text-slate-500">
            Weaknesses
          </h3>
          <ul className="space-y-1.5 text-slate-200">
            {weaknesses.map((w) => (
              <li key={w} className="flex gap-2">
                <span className="text-red-400">−</span>
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
