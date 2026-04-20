'use client';

import { useEffect, useState } from 'react';
import type { CountriesData, Relationship } from '@/lib/types';
import { isoToFlagEmoji } from '@/lib/flags';

type HoverInfo = {
  iso3: string;
  iso2?: string;
  fallbackName?: string;
};

type HoverTooltipProps = {
  hovered: HoverInfo | null;
  selectedCountry: string | null;
  countriesData: CountriesData;
};

function findRelationship(
  iso3: string,
  selected: string | null,
  data: CountriesData
): { label: string; reason: string } | null {
  if (!selected || selected === iso3) return null;
  const sel = data[selected];
  if (!sel) return null;
  const find = (list: Relationship[]) => list.find((r) => r.country === iso3);
  const ally = find(sel.relationships.allies);
  if (ally) return { label: 'Ally', reason: ally.reason };
  const working = find(sel.relationships.working);
  if (working) return { label: 'Working partner', reason: working.reason };
  const tension = find(sel.relationships.tensions);
  if (tension) return { label: 'Tension', reason: tension.reason };
  return null;
}

export default function HoverTooltip({
  hovered,
  selectedCountry,
  countriesData,
}: HoverTooltipProps) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (!hovered || !pos) return null;

  const data = countriesData[hovered.iso3];
  const name = data?.basic.name ?? hovered.fallbackName ?? hovered.iso3;
  const flag = hovered.iso2 ? isoToFlagEmoji(hovered.iso2) : '\u{1F3F3}\u{FE0F}';
  const rel = findRelationship(hovered.iso3, selectedCountry, countriesData);

  const style: React.CSSProperties = {
    left: pos.x + 16,
    top: pos.y + 16,
  };

  return (
    <div
      className="pointer-events-none fixed z-50 max-w-xs rounded-md border border-slate-800 bg-slate-900/85 px-3 py-2 text-sm text-slate-100 shadow-lg backdrop-blur-md"
      style={style}
    >
      <div className="flex items-center gap-2 text-base font-medium">
        <span className="text-lg leading-none">{flag}</span>
        <span>{name}</span>
      </div>
      {data && (
        <div className="mt-1 space-y-0.5 text-xs text-slate-300">
          <div>
            <span className="text-slate-500">Capital:</span> {data.basic.capital}
          </div>
          <div>
            <span className="text-slate-500">Population:</span>{' '}
            {data.snapshot.population}
          </div>
        </div>
      )}
      {rel && (
        <div className="mt-2 border-t border-slate-800 pt-2 text-xs">
          <div className="font-medium text-slate-200">{rel.label}</div>
          <div className="text-slate-400">{rel.reason}</div>
        </div>
      )}
      {!data && (
        <div className="mt-1 text-xs text-slate-500">No v1 data</div>
      )}
    </div>
  );
}
