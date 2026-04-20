import type { CountryData } from '@/lib/types';

type Props = { data: CountryData };

export default function EconomyTab({ data }: Props) {
  const { snapshot, strengths, weaknesses } = data;
  return (
    <div className="space-y-6 text-sm">
      <section>
        <h3 className="mb-2 text-xs uppercase tracking-wider text-slate-500">
          Snapshot
        </h3>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-slate-300">
          <dt className="text-slate-500">Population</dt>
          <dd>{snapshot.population}</dd>
          <dt className="text-slate-500">GDP</dt>
          <dd>{snapshot.gdp}</dd>
          <dt className="text-slate-500">GDP / capita</dt>
          <dd>{snapshot.gdp_per_capita}</dd>
          <dt className="text-slate-500">Economy</dt>
          <dd>{snapshot.economy_type}</dd>
        </dl>
      </section>

      <section>
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
      </section>

      <section>
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
      </section>
    </div>
  );
}
