"use client";

import React from "react";
import EntryCard from "../../components/EntryCard.js";
import NavBar from "../../components/NavBar.js";
import SearchFilter from "../../components/SearchFilter.js";
import entries from "../../data/entries.js";

const colors = {
  teak: "#2E3B2A",
  silk: "#E8DCC0",
  paper: "#FAF6EC",
};

const categories = ["All", ...new Set(entries.map((entry) => entry.category))];

function filterEntries(entries, filter) {
  const queryTokens = filter.query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  return entries.filter((entry) => {
    const matchesCategory = filter.category === "All" || entry.category === filter.category;

    if (queryTokens.length === 0) {
      return matchesCategory;
    }

    const searchableText = (entry.title + " " + (entry.khmerName || "")).toLowerCase();
    const matchesName = queryTokens.every((token) => searchableText.includes(token));

    return matchesCategory && matchesName;
  });
}

const styles = {
  page: { backgroundColor: colors.paper, minHeight: "100vh" },
  main: { maxWidth: 1100, margin: "0 auto" },
  stripRow: { display: "grid", gap: 24 },
};

export default function ArchivePage() {
  const [filter, setFilter] = React.useState({ category: "All", query: "" });
  const filteredEntries = React.useMemo(() => filterEntries(entries, filter), [filter]);

  return (
    <div style={styles.page}>
      <NavBar brand="Rooted Khmer" />
      <main style={styles.main} className="archive-main">
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
              <EntryCard key={entry.id} {...entry} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontSize: 16, color: colors.teak + "99", fontFamily: "var(--font-body), sans-serif" }}>
              No entries found matching your search or filter.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
