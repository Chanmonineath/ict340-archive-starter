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
  const query = filter.query.trim().toLowerCase();

  return entries.filter((entry) => {
    const matchesCategory = filter.category === "All" || entry.category === filter.category;

    if (!query) {
      return matchesCategory;
    }

    const processText = Array.isArray(entry.process) ? entry.process.join(" ") : entry.process;
    const searchableText = [
      entry.title,
      entry.khmerName,
      entry.contributor,
      entry.place,
      entry.ingredients,
      processText,
      entry.benefit,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return matchesCategory && searchableText.includes(query);
  });
}

const styles = {
  page: { backgroundColor: colors.paper, minHeight: "100vh" },
  main: { maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px" },
  stripRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 24,
  },
};

export default function ArchivePage() {
  const [filter, setFilter] = React.useState({ category: "All", query: "" });
  const filteredEntries = React.useMemo(() => filterEntries(entries, filter), [filter]);

  return (
    <div style={styles.page}>
      <NavBar brand="Rooted Khmer" />
      <main style={styles.main}>
        <SearchFilter
          categories={categories}
          initialCategory={filter.category}
          initialQuery={filter.query}
          onFilterChange={setFilter}
          resultsCount={filteredEntries.length}
        />

        {filteredEntries.length > 0 ? (
          <div style={styles.stripRow}>
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
