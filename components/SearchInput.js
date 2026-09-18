"use client";

const colors = {
  text: "#1D3627",
  cream: "#FAF7F0",
  silk: "#E7DEC9",
  active: "#2E5B3A",
};

export default function SearchInput({
  searchQuery,
  onQueryChange,
  isFocused,
  onFocus,
  onBlur,
  suggestions,
  showSuggestions,
  onSelectSuggestion,
}) {
  const styles = {
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
      boxShadow: isFocused ? "0 0 0 3px rgba(27, 59, 43, 0.15)" : "none",
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
      boxShadow: "0 8px 24px rgba(61, 44, 30, 0.12)",
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
  };

  return (
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
        onChange={(e) => onQueryChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
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
              onMouseDown={() => onSelectSuggestion(entry.title)}
            >
              {entry.title}
              {entry.khmerName && (
                <span style={{ color: "#B88C4B", marginLeft: 8 }}>{entry.khmerName}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
