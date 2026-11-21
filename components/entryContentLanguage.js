const KHMER_CHAR = /[ក-៿]/g;
const LATIN_CHAR = /[A-Za-z]/g;

function countMatches(text, pattern) {
  const matches = text.match(pattern);
  return matches ? matches.length : 0;
}

// Looks at an entry's own written content (ingredients, process steps,
// benefit notes) and scores whether Khmer or Latin script dominates.
// Field labels and the required title/khmerName pair aren't used here,
// since nearly every entry has both and that wouldn't tell them apart.
export function entryContentLanguage(entry) {
  const steps = Array.isArray(entry.process) ? entry.process : [entry.process];
  const text = [entry.ingredients, ...steps, entry.benefit].filter(Boolean).join(" ");

  const khmerCount = countMatches(text, KHMER_CHAR);
  const latinCount = countMatches(text, LATIN_CHAR);

  if (khmerCount === 0 && latinCount === 0) return "unknown";
  return khmerCount >= latinCount ? "km" : "en";
}

// Stable sort: entries matching the active language come first, original
// order preserved within each group.
export function sortEntriesByLanguage(entries, language) {
  return entries
    .map((entry, index) => ({ entry, index }))
    .sort((a, b) => {
      const aMatches = entryContentLanguage(a.entry) === language;
      const bMatches = entryContentLanguage(b.entry) === language;
      if (aMatches === bMatches) return a.index - b.index;
      return aMatches ? -1 : 1;
    })
    .map(({ entry }) => entry);
}
