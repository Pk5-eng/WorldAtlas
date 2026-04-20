import type { CountryData } from '@/lib/types';

type Props = { data: CountryData };

export default function PoliticsTab({ data }: Props) {
  const { basic, current_position } = data;
  return (
    <div className="space-y-6 text-sm">
      <section>
        <h3 className="mb-2 text-xs uppercase tracking-wider text-slate-500">
          Government
        </h3>
        <p className="text-slate-200 leading-relaxed">{basic.government}</p>
      </section>

      <section>
        <h3 className="mb-2 text-xs uppercase tracking-wider text-slate-500">
          Capital
        </h3>
        <p className="text-slate-200">{basic.capital}</p>
      </section>

      <section>
        <h3 className="mb-2 text-xs uppercase tracking-wider text-slate-500">
          Official languages
        </h3>
        <p className="text-slate-200">{basic.languages.join(', ')}</p>
      </section>

      <section>
        <h3 className="mb-2 text-xs uppercase tracking-wider text-slate-500">
          Strategic position
        </h3>
        <p className="text-slate-200 leading-relaxed">{current_position}</p>
      </section>
    </div>
  );
}
