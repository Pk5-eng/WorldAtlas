'use client';

import { useEffect, useState } from 'react';
import type { FeatureCollection, Feature } from 'geojson';
import Globe from './Globe';
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

export default function GlobeView() {
  const [features, setFeatures] = useState<CountryFeature[] | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [, setHoveredCountry] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/data/world-110m.geojson')
      .then((res) => res.json())
      .then((data: FeatureCollection) => {
        if (cancelled) return;
        setFeatures(data.features as CountryFeature[]);
      })
      .catch((err) => {
        console.error('Failed to load GeoJSON:', err);
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

  if (!features) {
    return (
      <div className="flex h-full w-full items-center justify-center text-slate-400">
        Loading globe…
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <Globe
        features={features}
        countriesData={countriesData as CountriesData}
        selectedCountry={selectedCountry}
        onHover={setHoveredCountry}
        onSelect={setSelectedCountry}
      />
    </div>
  );
}
