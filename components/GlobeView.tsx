'use client';

import { useEffect, useMemo, useState } from 'react';
import type { FeatureCollection, Feature } from 'geojson';
import Globe from './Globe';
import HoverTooltip from './HoverTooltip';
import CountryPanel from './CountryPanel';
import Legend from './Legend';
import GlobeErrorBoundary from './GlobeErrorBoundary';
import countriesData from '@/data/countries.json';
import type { CountriesData } from '@/lib/types';

type CountryFeature = Feature & {
  properties: {
    ADM0_A3?: string;
    NAME?: string;
    NAME_LONG?: string;
    ISO_A2?: string;
    POP_EST?: number;
    CONTINENT?: string;
  };
};

type HoverInfo = {
  iso3: string;
  iso2?: string;
  fallbackName?: string;
};

export default function GlobeView() {
  const [features, setFeatures] = useState<CountryFeature[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hovered, setHovered] = useState<HoverInfo | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/data/world-110m.geojson')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: FeatureCollection) => {
        if (cancelled) return;
        setFeatures(data.features as CountryFeature[]);
      })
      .catch((err) => {
        if (cancelled) return;
        console.error('Failed to load GeoJSON:', err);
        setLoadError('Could not load the world map. Check your connection and refresh.');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCountry(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const { iso2ByIso3, fallbackNameByIso3 } = useMemo(() => {
    const iso2Map: Record<string, string> = {};
    const nameMap: Record<string, string> = {};
    if (!features) return { iso2ByIso3: iso2Map, fallbackNameByIso3: nameMap };
    for (const f of features) {
      const iso3 = f.properties?.ADM0_A3;
      if (!iso3) continue;
      const iso2 = f.properties?.ISO_A2;
      if (iso2 && iso2 !== '-99' && !iso2Map[iso3]) iso2Map[iso3] = iso2;
      const name = f.properties?.NAME_LONG ?? f.properties?.NAME;
      if (name && !nameMap[iso3]) nameMap[iso3] = name;
    }
    return { iso2ByIso3: iso2Map, fallbackNameByIso3: nameMap };
  }, [features]);

  if (loadError) {
    return (
      <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-slate-400">
        {loadError}
      </div>
    );
  }

  if (!features) {
    return (
      <div className="flex h-full w-full items-center justify-center gap-3 text-slate-400">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-blue-400" />
        <span className="text-sm tracking-wide">Loading globe…</span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <GlobeErrorBoundary>
        <Globe
          features={features}
          countriesData={countriesData as CountriesData}
          selectedCountry={selectedCountry}
          onHover={(feat) => {
            if (!feat) {
              setHovered(null);
              return;
            }
            const iso3 = feat.properties?.ADM0_A3;
            if (!iso3) {
              setHovered(null);
              return;
            }
            setHovered({
              iso3,
              iso2: feat.properties?.ISO_A2,
              fallbackName: feat.properties?.NAME_LONG ?? feat.properties?.NAME,
            });
          }}
          onSelect={setSelectedCountry}
        />
      </GlobeErrorBoundary>
      <HoverTooltip
        hovered={hovered}
        selectedCountry={selectedCountry}
        countriesData={countriesData as CountriesData}
      />
      <CountryPanel
        selectedCountry={selectedCountry}
        countriesData={countriesData as CountriesData}
        iso2ByIso3={iso2ByIso3}
        fallbackNameByIso3={fallbackNameByIso3}
        onSelectCountry={setSelectedCountry}
        onClose={() => setSelectedCountry(null)}
      />
      <Legend visible={selectedCountry !== null} />
    </div>
  );
}
