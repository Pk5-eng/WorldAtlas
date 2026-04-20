'use client';

import { useState } from 'react';
import type { CountriesData, CountryData } from '@/lib/types';
import { isoToFlagEmoji } from '@/lib/flags';
import OverviewTab from './tabs/OverviewTab';
import EconomyTab from './tabs/EconomyTab';
import PoliticsTab from './tabs/PoliticsTab';
import HistoryTab from './tabs/HistoryTab';
import PositionTab from './tabs/PositionTab';
import RelationshipsTab from './tabs/RelationshipsTab';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'economy', label: 'Economy' },
  { id: 'politics', label: 'Politics' },
  { id: 'history', label: 'History' },
  { id: 'position', label: 'Position' },
  { id: 'relationships', label: 'Relationships' },
] as const;

type TabId = (typeof TABS)[number]['id'];

type CountryPanelProps = {
  selectedCountry: string | null;
  countriesData: CountriesData;
  iso2ByIso3: Record<string, string>;
  fallbackNameByIso3: Record<string, string>;
  onClose: () => void;
};

export default function CountryPanel({
  selectedCountry,
  countriesData,
  iso2ByIso3,
  fallbackNameByIso3,
  onClose,
}: CountryPanelProps) {
  const open = selectedCountry !== null;
  const data = selectedCountry ? countriesData[selectedCountry] : undefined;
  const iso2 = selectedCountry ? iso2ByIso3[selectedCountry] : undefined;
  const name =
    data?.basic.name ??
    (selectedCountry ? fallbackNameByIso3[selectedCountry] : undefined) ??
    selectedCountry ??
    '';
  const flag = iso2 ? isoToFlagEmoji(iso2) : '\u{1F3F3}\u{FE0F}';

  return (
    <aside
      aria-hidden={!open}
      className={`fixed right-0 top-0 z-40 flex h-full w-full max-w-[420px] transform flex-col border-l border-slate-800 bg-slate-900/80 text-slate-100 backdrop-blur-md transition-transform duration-300 ease-out ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <header className="flex items-start justify-between gap-3 border-b border-slate-800 px-6 pb-4 pt-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="text-2xl leading-none">{flag}</span>
          <h2 className="truncate font-serif text-2xl leading-tight">
            {name}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close panel"
          className="rounded-md px-2 py-1 text-lg text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
        >
          ×
        </button>
      </header>

      {data ? (
        <PanelBody key={selectedCountry ?? 'none'} data={data} />
      ) : (
        <div className="flex flex-1 items-center justify-center px-6">
          <p className="text-center text-sm text-slate-400">
            No data for{' '}
            <span className="text-slate-200">{name || 'this country'}</span>{' '}
            yet. Only Asian countries are populated in v1.
          </p>
        </div>
      )}
    </aside>
  );
}

function PanelBody({ data }: { data: CountryData }) {
  const [tab, setTab] = useState<TabId>('overview');
  return (
    <>
      <nav className="flex gap-1 overflow-x-auto border-b border-slate-800 px-4 pt-2 text-xs">
        {TABS.map((t) => {
          const active = t.id === tab;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap rounded-t px-3 py-2 transition ${
                active
                  ? 'border-b-2 border-blue-400 text-slate-100'
                  : 'border-b-2 border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </nav>
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {tab === 'overview' && <OverviewTab data={data} />}
        {tab === 'economy' && <EconomyTab data={data} />}
        {tab === 'politics' && <PoliticsTab data={data} />}
        {tab === 'history' && <HistoryTab data={data} />}
        {tab === 'position' && <PositionTab data={data} />}
        {tab === 'relationships' && <RelationshipsTab data={data} />}
      </div>
    </>
  );
}
