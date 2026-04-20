import type { CountryData } from '@/lib/types';

type OverviewTabProps = {
  data: CountryData;
};

export default function OverviewTab({ data }: OverviewTabProps) {
  const { basic, snapshot, identity } = data;
  return (
    <div className="space-y-6 text-sm">
      <p className="text-slate-200 leading-relaxed">{identity}</p>

      <section>
        <h3 className="mb-2 text-xs uppercase tracking-wider text-slate-500">
          Basics
        </h3>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-slate-300">
          <dt className="text-slate-500">Capital</dt>
          <dd>{basic.capital}</dd>
          <dt className="text-slate-500">Region</dt>
          <dd>{basic.region}</dd>
          <dt className="text-slate-500">Government</dt>
          <dd>{basic.government}</dd>
          <dt className="text-slate-500">Languages</dt>
          <dd>{basic.languages.join(', ')}</dd>
          <dt className="text-slate-500">Currency</dt>
          <dd>{basic.currency}</dd>
        </dl>
      </section>

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
    </div>
  );
}
