export function isoToFlagEmoji(iso2: string): string {
  if (!iso2 || iso2.length !== 2 || iso2 === '-99') return '\u{1F3F3}\u{FE0F}';
  return iso2
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}
