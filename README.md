# Rooted Khmer

A community archive of traditional Khmer home remedies and plant knowledge — coconut oil, kaffir lime hair mask, ponlai and turmeric scrubs, and more — each entry sourced from a real family member or community source, with a Khmer name, ingredients, step-by-step process, and a sourced benefit/caution note.

Built for ICT 340 (American University of Phnom Penh). Sprint 1 covers browsing and search.

## Pages

- **Home** — introduction and entry points into the archive
- **Discover** — who curated this archive and where the knowledge comes from
- **Archive** — every entry, with live search (English and Khmer, case-insensitive, multi-word) and category filtering
- **Contribute** — how to submit a new entry

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Structure

- `data/entries.js` — the archive's entries; each one has a title, Khmer name, category, contributor, place, ingredients, process steps, and a benefit note
- `collection.config.js` — site-wide identity (name, curator, source)
- `components/` — shared UI (nav, hero, entry cards, search/filter, modal)
- `app/` — the four pages (Next.js App Router)

## Rules of the road

You own what you ship. Every line that lands in this repository is yours to explain, whoever or whatever wrote it.
