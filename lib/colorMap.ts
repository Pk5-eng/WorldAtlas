import type { CountriesData } from './types';

export function getCountryColor(
  iso3: string,
  selected: string | null,
  data: CountriesData
): string {
  if (!selected) return 'rgb(51, 65, 85)';
  if (iso3 === selected) return 'rgb(59, 130, 246)';

  const sel = data[selected];
  if (!sel) return 'rgb(30, 41, 59)';

  if (sel.relationships.allies.some((r) => r.country === iso3))
    return 'rgb(34, 197, 94)';
  if (sel.relationships.working.some((r) => r.country === iso3))
    return 'rgb(249, 115, 22)';
  if (sel.relationships.tensions.some((r) => r.country === iso3))
    return 'rgb(239, 68, 68)';

  return 'rgb(30, 41, 59)';
}
