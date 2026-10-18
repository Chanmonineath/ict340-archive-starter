"use client";

import React from "react";
import PROVINCES from "./PROVINCES.js";

const colors = { teak: "#1D3627", placeholder: "#615443", silk: "#E7DEC9" };

export default function ProvinceSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const wrapRef = React.useRef(null);
  const searchRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) searchRef.current?.focus();
  }, [isOpen]);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setIsOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectProvince = (province) => {
    onChange(province);
    setIsOpen(false);
    setQuery("");
  };

  const normalizedQuery = query.trim().normalize("NFC").toLowerCase();
  const visibleProvinces = normalizedQuery
    ? PROVINCES.filter((province) => province.normalize("NFC").toLowerCase().startsWith(normalizedQuery))
    : PROVINCES;

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <button
        type="button"
        className="auth-input contribute-select"
        style={{ textAlign: "left", color: value ? colors.teak : colors.placeholder }}
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {value || "Select a province"}
      </button>

      {isOpen && (
        <div
          className="province-select-panel"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid " + colors.silk,
          }}
        >
          <input
            ref={searchRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by letter…"
            className="province-select-search"
            style={{ color: colors.teak, borderBottom: "1px solid " + colors.silk }}
          />

          <ul role="listbox" className="province-select-list">
            {visibleProvinces.length > 0 ? (
              visibleProvinces.map((province) => (
                <li key={province} role="option" aria-selected={value === province}>
                  <button
                    type="button"
                    className="province-select-option"
                    onClick={() => selectProvince(province)}
                  >
                    {province}
                  </button>
                </li>
              ))
            ) : (
              <li className="province-select-empty" style={{ color: colors.placeholder }}>
                No province starts with &ldquo;{query.trim()}&rdquo;
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
