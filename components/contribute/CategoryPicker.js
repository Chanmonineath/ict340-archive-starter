"use client";

import React from "react";
import { KNOWN_CATEGORIES, pillStyle } from "./categoryPillStyle.js";

export default function CategoryPicker({ value, onChange }) {
  const [isAdding, setIsAdding] = React.useState(false);
  const [customValue, setCustomValue] = React.useState("");
  const isCustom = value && !KNOWN_CATEGORIES.includes(value);

  const confirmCustom = () => {
    const trimmed = customValue.trim();
    if (trimmed) onChange(trimmed);
    setIsAdding(false);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }} role="group" aria-label="Category">
      {KNOWN_CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          className={"category-pill" + (value === category ? " category-pill-active" : "")}
          style={pillStyle(value === category)}
          onClick={() => {
            onChange(value === category ? "" : category);
            setIsAdding(false);
          }}
        >
          {category}
        </button>
      ))}

      {isCustom && (
        <button
          type="button"
          className="category-pill category-pill-active"
          style={pillStyle(true)}
          onClick={() => onChange("")}
          aria-label={`Remove category ${value}`}
        >
          {value}
        </button>
      )}

      {isAdding ? (
        <input
          type="text"
          autoFocus
          className="auth-input"
          style={{ width: 160, padding: "8px 16px" }}
          placeholder="New category"
          value={customValue}
          onChange={(e) => setCustomValue(e.target.value)}
          onBlur={confirmCustom}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              confirmCustom();
            }
          }}
        />
      ) : (
        <button
          type="button"
          className="category-pill"
          style={pillStyle(false)}
          onClick={() => setIsAdding(true)}
          aria-label="Add a new category"
        >
          + Add
        </button>
      )}
    </div>
  );
}
