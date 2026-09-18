"use client";

const colors = { active: "#2E5B3A", textInactive: "#615443" };

export default function CategoryPills({ categories, selectedCategory, onSelect }) {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", gap: 12, paddingTop: 8 }}
      role="tablist"
      aria-label="Filter by category"
    >
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            className={"category-pill" + (isActive ? " category-pill-active" : "")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "8px 16px",
              fontSize: 13,
              fontFamily: "var(--font-body), sans-serif",
              fontWeight: isActive ? 600 : 500,
              color: isActive ? "#FAF7F0" : colors.textInactive,
              backgroundColor: isActive ? colors.active : "#EBE3D3",
              border: `1px solid ${isActive ? colors.active : "#D8CBBA"}`,
              borderRadius: "9999px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              userSelect: "none",
            }}
            onClick={() => onSelect(category)}
            role="tab"
            aria-selected={isActive}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
