'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
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
  onHover: (feat: CountryFeature | null) => void;
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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const globe = globeRef.current as
      | {
          controls?: () => { autoRotate: boolean; autoRotateSpeed: number };
          globeMaterial?: () => { bumpScale?: number; needsUpdate?: boolean };
        }
      | null;
    if (!globe?.controls) return;
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    const material = globe.globeMaterial?.();
    if (material) {
      material.bumpScale = 2.5;
      material.needsUpdate = true;
    }
  }, [size.width]);

  return (
    <div ref={containerRef} className="h-full w-full">
      {size.width > 0 && size.height > 0 && (
        <ReactGlobe
          ref={globeRef as never}
          width={size.width}
          height={size.height}
          globeImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg"
          bumpImageUrl="//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          polygonsData={features}
          polygonAltitude={(feat: object) => {
            const iso3 = (feat as CountryFeature).properties?.ADM0_A3 ?? '';
            return iso3 === selectedCountry ? 0.012 : 0.006;
          }}
          polygonCapColor={(feat: object) => {
            const iso3 = (feat as CountryFeature).properties?.ADM0_A3 ?? '';
            return getCountryColor(iso3, selectedCountry, countriesData);
          }}
          polygonSideColor={() => 'rgb(15, 23, 42)'}
          polygonStrokeColor={() => 'rgb(148, 163, 184)'}
          polygonLabel={() => ''}
          onPolygonHover={(feat: object | null) => {
            onHover((feat as CountryFeature | null) ?? null);
          }}
          onPolygonClick={(feat: object) => {
            const iso3 = (feat as CountryFeature).properties?.ADM0_A3;
            if (iso3) onSelect(iso3);
          }}
          polygonsTransitionDuration={400}
          atmosphereColor="#3b82f6"
          atmosphereAltitude={0.12}
        />
      )}
    </div>
  );
}
