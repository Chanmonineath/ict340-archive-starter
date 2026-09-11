"use client";

import React from "react";

const colors = {
  teak: "#2E3B2A",
  leaf: "#3F5B3A",
  silk: "#E8DCC0",
  cream: "#FDF8E9",
  active: "#2E5B3A",
  text: "#2E3B2A",
  textInactive: "#6B6B6B",
};

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
  const queryTokens = trimmedQuery.toLowerCase().split(/\s+/).filter(Boolean);
  const suggestions =
    trimmedQuery.length > 2
      ? entries
          .filter((entry) => {
            const searchableText = (entry.title + " " + (entry.khmerName || "")).toLowerCase();
            return queryTokens.every((token) => searchableText.includes(token));
          })
          .slice(0, 6)
      : [];
  const showSuggestions = isFocused && suggestions.length > 0;

  const selectSuggestion = (title) => {
    setSearchQuery(title);
  };

  const styles = {
    filterContainer: { display: "flex", flexDirection: "column", gap: 20, marginBottom: 32 },
    searchContainer: { position: "relative" },
    searchInput: {
      width: "100%",
      padding: "14px 20px 14px 46px",
      fontSize: 16,
      fontFamily: "var(--font-body), sans-serif",
      fontWeight: 500,
      color: colors.text,
      backgroundColor: colors.cream,
      border: "1px solid " + (isFocused ? colors.active : colors.silk),
      borderRadius: "9999px",
      outline: "none",
      boxShadow: isFocused ? "0 0 0 3px rgba(46, 91, 58, 0.15)" : "none",
      transition: "border-color 0.2s, box-shadow 0.2s",
    },
    searchIcon: {
      position: "absolute",
      left: "16px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "18px",
      height: "18px",
      opacity: 0.4,
    },
    suggestionsList: {
      position: "absolute",
      top: "calc(100% + 6px)",
      left: 0,
      right: 0,
      backgroundColor: colors.cream,
      border: "1px solid " + colors.silk,
      borderRadius: 16,
      boxShadow: "0 8px 24px rgba(46, 59, 42, 0.12)",
      overflow: "hidden",
      zIndex: 20,
      margin: 0,
      padding: 6,
      listStyle: "none",
    },
    suggestionItem: {
      padding: "10px 14px",
      borderRadius: 10,
      fontFamily: "var(--font-body), sans-serif",
      fontSize: 14,
      color: colors.text,
      cursor: "pointer",
    },
    categoriesContainer: { display: "flex", flexWrap: "wrap", gap: 12, paddingTop: 8 },
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
            color: colors.teak + "99",
            fontFamily: "var(--font-body), sans-serif",
          }}
        >
          Search and filter traditional practices
        </p>
      </div>

      <div style={styles.searchContainer}>
        <svg
          style={styles.searchIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          style={styles.searchInput}
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search entries"
          role="combobox"
          aria-expanded={showSuggestions}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
        />
        {showSuggestions && (
          <ul id="search-suggestions" style={styles.suggestionsList} role="listbox">
            {suggestions.map((entry) => (
              <li
                key={entry.id}
                role="option"
                aria-selected={false}
                className="search-suggestion-item"
                style={styles.suggestionItem}
                onMouseDown={() => selectSuggestion(entry.title)}
              >
                {entry.title}
                {entry.khmerName && (
                  <span style={{ color: colors.textInactive, marginLeft: 8 }}>
                    {entry.khmerName}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={styles.categoriesContainer} role="tablist" aria-label="Filter by category">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "8px 16px",
                fontSize: 13,
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                color: isActive ? "#ffffff" : colors.textInactive,
                backgroundColor: isActive ? colors.active : "transparent",
                border: `1px solid ${isActive ? colors.active : colors.silk}`,
                borderRadius: "9999px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                userSelect: "none",
              }}
              onClick={() => setSelectedCategory(category)}
              role="tab"
              aria-selected={isActive}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div style={styles.resultsCount}>
        <span>Results</span>
        <span style={styles.countBadge}>{resultsCount ?? 0}</span>
      </div>
    </div>
  );
}
