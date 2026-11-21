"use client";

import React from "react";
import EntryCard from "./EntryCard.js";
import SearchFilter from "./SearchFilter.js";
import BookView from "./BookView.js";
import useEntries from "../hooks/useEntries.js";
import useLanguage from "../hooks/useLanguage.js";

const colors = {
  teak: "#2E3B2A",
  silk: "#E8DCC0",
  paper: "#FAF6EC",
};

function filterEntries(entries, filter) {
  const queryTokens = filter.query.trim().normalize("NFC").toLowerCase().split(/\s+/).filter(Boolean);

  return entries.filter((entry) => {
    const matchesCategory = filter.category === "All" || entry.category === filter.category;

    if (queryTokens.length === 0) {
      return matchesCategory;
    }

    const searchableText = (entry.title + " " + (entry.khmerName || "")).normalize("NFC").toLowerCase();
    const matchesName = queryTokens.every((token) => searchableText.includes(token));

    return matchesCategory && matchesName;
  });
}

const styles = {
  main: { maxWidth: 1100, margin: "0 auto" },
  stripRow: { display: "grid", gap: 24 },
};

export default function ArchiveSection() {
  const { t } = useLanguage();
  const { entries, isLoading, error, removeEntry } = useEntries();
  const [filter, setFilter] = React.useState({ category: "All", query: "" });
  const [view, setView] = React.useState("cards");
  const categories = React.useMemo(
    () => ["All", ...new Set(entries.map((entry) => entry.category))],
    [entries]
  );
  const filteredEntries = React.useMemo(() => filterEntries(entries, filter), [entries, filter]);

  return (
    <div id="archive" style={{ backgroundColor: colors.paper }}>
      <header className="archive-header">
        <p className="archive-eyebrow">{t.archive.eyebrow}</p>
        <h1 className="archive-khmer-title">បណ្ណាសារការអនុវត្តតាមផ្ទះ</h1>

        <div className="view-toggle" role="tablist" aria-label={t.archive.chooseDisplay}>
          <button
            type="button"
            role="tab"
            aria-selected={view === "cards"}
            className={"view-toggle-btn" + (view === "cards" ? " view-toggle-btn-active" : "")}
            onClick={() => setView("cards")}
          >
            {t.archive.recipeCardsTab}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={view === "book"}
            className={"view-toggle-btn" + (view === "book" ? " view-toggle-btn-active" : "")}
            onClick={() => setView("book")}
          >
            {t.archive.folioBookTab}
          </button>
        </div>
      </header>

      <main
        style={styles.main}
        className={"archive-main" + (view === "book" ? " archive-main-book" : "")}
      >
        {isLoading ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontSize: 16, color: colors.teak + "99", fontFamily: "var(--font-body), sans-serif" }}>
              {t.archive.loading}
            </p>
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontSize: 16, color: colors.teak + "99", fontFamily: "var(--font-body), sans-serif" }}>
              {t.archive.loadError}
            </p>
          </div>
        ) : view === "book" ? (
          <BookView entries={entries} />
        ) : (
          <>
            <SearchFilter
              categories={categories}
              entries={entries}
              initialCategory={filter.category}
              initialQuery={filter.query}
              onFilterChange={setFilter}
              resultsCount={filteredEntries.length}
            />

            {filteredEntries.length > 0 ? (
              <div style={styles.stripRow} className="entries-grid">
                {filteredEntries.map((entry) => (
                  <EntryCard key={entry.id} {...entry} onDeleted={removeEntry} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <p style={{ fontSize: 16, color: colors.teak + "99", fontFamily: "var(--font-body), sans-serif" }}>
                  {t.archive.empty}
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
