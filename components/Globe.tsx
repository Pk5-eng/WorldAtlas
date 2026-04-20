'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import type { Feature } from 'geojson';
import type { CountriesData } from '@/lib/types';
import { getCountryColor } from '@/lib/colorMap';

const ReactGlobe = dynamic(() => import('react-globe.gl'), { ssr: false });

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

type GlobeProps = {
  features: CountryFeature[];
  countriesData: CountriesData;
  selectedCountry: string | null;
  onHover: (iso3: string | null) => void;
  onSelect: (iso3: string) => void;
};

export default function Globe({
  features,
  countriesData,
  selectedCountry,
  onHover,
  onSelect,
}: GlobeProps) {
  const globeRef = useRef<unknown>(null);

  useEffect(() => {
    const globe = globeRef.current as
      | { controls?: () => { autoRotate: boolean; autoRotateSpeed: number } }
      | null;
    if (!globe?.controls) return;
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
  }, []);

  return (
    <ReactGlobe
      ref={globeRef as never}
      globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg"
      backgroundColor="#000010"
      polygonsData={features}
      polygonAltitude={0.01}
      polygonCapColor={(feat: object) => {
        const iso3 = (feat as CountryFeature).properties?.ADM0_A3 ?? '';
        return getCountryColor(iso3, selectedCountry, countriesData);
      }}
      polygonSideColor={() => 'rgba(0, 0, 0, 0.15)'}
      polygonStrokeColor={() => '#111'}
      polygonLabel={() => ''}
      onPolygonHover={(feat: object | null) => {
        const iso3 = (feat as CountryFeature | null)?.properties?.ADM0_A3 ?? null;
        onHover(iso3);
      }}
      onPolygonClick={(feat: object) => {
        const iso3 = (feat as CountryFeature).properties?.ADM0_A3;
        if (iso3) onSelect(iso3);
      }}
      polygonsTransitionDuration={400}
      atmosphereColor="#60a5fa"
      atmosphereAltitude={0.15}
    />
  );
}
