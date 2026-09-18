"use client";

import React from "react";
import SearchInput from "./SearchInput.js";
import CategoryPills from "./CategoryPills.js";

const colors = { teak: "#1D3627", leaf: "#3F5B3A" };

export default function SearchFilter({
  onFilterChange,
  initialCategory,
  initialQuery,
  resultsCount,
  categories = ["All"],
  entries = [],
}) {
  const [selectedCategory, setSelectedCategory] = React.useState(initialCategory || "All");
  const [searchQuery, setSearchQuery] = React.useState(initialQuery || "");
  const [isFocused, setIsFocused] = React.useState(false);

  React.useEffect(() => {
    onFilterChange({ category: selectedCategory, query: searchQuery });
  }, [selectedCategory, searchQuery, onFilterChange]);

  const trimmedQuery = searchQuery.trim();
  const queryTokens = trimmedQuery.normalize("NFC").toLowerCase().split(/\s+/).filter(Boolean);
  const suggestions =
    trimmedQuery.length > 2
      ? entries
          .filter((entry) => {
            const searchableText = (entry.title + " " + (entry.khmerName || "")).normalize("NFC").toLowerCase();
            return queryTokens.every((token) => searchableText.includes(token));
          })
          .slice(0, 6)
      : [];
  const showSuggestions = isFocused && suggestions.length > 0;

  const styles = {
    filterContainer: { display: "flex", flexDirection: "column", gap: 20, marginBottom: 32 },
    resultsCount: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      fontSize: 13,
      fontFamily: "var(--font-body), sans-serif",
      color: colors.leaf,
      gap: 6,
    },
    countBadge: {
      backgroundColor: colors.leaf,
      color: "white",
      padding: "2px 8px",
      borderRadius: "9999px",
      fontSize: 11,
      fontWeight: 600,
      minWidth: "24px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.filterContainer}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h2
          id="browse-heading"
          className="browse-heading"
          style={{
            margin: 0,
            fontWeight: 700,
            color: colors.teak,
            fontFamily: "var(--font-heading), serif",
            lineHeight: 1.2,
          }}
        >
          Explore entries
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "#7D6E5C",
            fontFamily: "var(--font-body), sans-serif",
          }}
        >
          Search and filter traditional practices
        </p>
      </div>

      <SearchInput
        searchQuery={searchQuery}
        onQueryChange={setSearchQuery}
        isFocused={isFocused}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        suggestions={suggestions}
        showSuggestions={showSuggestions}
        onSelectSuggestion={setSearchQuery}
      />

      <CategoryPills
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <div style={styles.resultsCount}>
        <span>Results</span>
        <span style={styles.countBadge}>{resultsCount ?? 0}</span>
      </div>
    </div>
  );
}
