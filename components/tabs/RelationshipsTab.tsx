import type { CountryData, CountriesData, Relationship } from '@/lib/types';
import { isoToFlagEmoji } from '@/lib/flags';

type Props = {
  data: CountryData;
  countriesData: CountriesData;
  iso2ByIso3: Record<string, string>;
  fallbackNameByIso3: Record<string, string>;
  onSelectCountry: (iso3: string) => void;
};

type Bucket = {
  label: string;
  accent: string;
  dot: string;
  items: Relationship[];
};

export default function RelationshipsTab({
  data,
  countriesData,
  iso2ByIso3,
  fallbackNameByIso3,
  onSelectCountry,
}: Props) {
  const buckets: Bucket[] = [
    {
      label: 'Allies',
      accent: 'text-green-400',
      dot: 'bg-green-500',
      items: data.relationships.allies,
    },
    {
      label: 'Working partners',
      accent: 'text-orange-400',
      dot: 'bg-orange-500',
      items: data.relationships.working,
    },
    {
      label: 'Tensions',
      accent: 'text-red-400',
      dot: 'bg-red-500',
      items: data.relationships.tensions,
    },
  ];

  return (
    <div className="space-y-6 text-sm">
      {buckets.map((bucket) => (
        <section key={bucket.label}>
          <h3
            className={`mb-2 flex items-center gap-2 text-xs uppercase tracking-wider ${bucket.accent}`}
          >
            <span className={`h-2 w-2 rounded-full ${bucket.dot}`} />
            {bucket.label}
          </h3>
          {bucket.items.length === 0 ? (
            <p className="text-slate-500">None.</p>
          ) : (
            <ul className="space-y-2">
              {bucket.items.map((rel) => {
                const name =
                  countriesData[rel.country]?.basic.name ??
                  fallbackNameByIso3[rel.country] ??
                  rel.country;
                const iso2 = iso2ByIso3[rel.country];
                const flag = iso2 ? isoToFlagEmoji(iso2) : '\u{1F3F3}\u{FE0F}';
                return (
                  <li key={rel.country}>
                    <button
                      type="button"
                      onClick={() => onSelectCountry(rel.country)}
                      className="group flex w-full items-start gap-3 rounded-md border border-slate-800 bg-slate-900/40 px-3 py-2 text-left transition hover:border-slate-700 hover:bg-slate-800/60"
                    >
                      <span className="text-xl leading-none">{flag}</span>
                      <span className="flex min-w-0 flex-col">
                        <span className="font-medium text-slate-100 group-hover:text-white">
                          {name}
                        </span>
                        <span className="text-xs text-slate-400">
                          {rel.reason}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
