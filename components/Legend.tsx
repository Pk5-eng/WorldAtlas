'use client';

type LegendProps = {
  visible: boolean;
};

const items = [
  { color: 'rgba(59, 130, 246, 0.9)', label: 'Selected' },
  { color: 'rgba(34, 197, 94, 0.8)', label: 'Ally' },
  { color: 'rgba(249, 115, 22, 0.8)', label: 'Working partner' },
  { color: 'rgba(239, 68, 68, 0.85)', label: 'Tension' },
];

export default function Legend({ visible }: LegendProps) {
  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed bottom-6 left-6 z-40 rounded-md border border-slate-800 bg-slate-900/80 px-4 py-3 text-xs text-slate-200 shadow-lg backdrop-blur-md">
      <div className="mb-2 text-[11px] uppercase tracking-wider text-slate-500">
        Relationships
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-sm border border-slate-700/50"
              style={{ backgroundColor: item.color }}
            />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
