import type { CountriesData } from './types';

export function getCountryColor(
  iso3: string,
  selected: string | null,
  data: CountriesData
): string {
  if (!selected) return 'rgba(100, 116, 139, 0.7)';
  if (iso3 === selected) return 'rgba(59, 130, 246, 0.9)';

  const sel = data[selected];
  if (!sel) return 'rgba(51, 65, 85, 0.4)';

  if (sel.relationships.allies.some((r) => r.country === iso3))
    return 'rgba(34, 197, 94, 0.8)';
  if (sel.relationships.working.some((r) => r.country === iso3))
    return 'rgba(249, 115, 22, 0.8)';
  if (sel.relationships.tensions.some((r) => r.country === iso3))
    return 'rgba(239, 68, 68, 0.85)';

  return 'rgba(51, 65, 85, 0.4)';
}
