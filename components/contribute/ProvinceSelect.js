"use client";

import React from "react";
import PROVINCES from "./PROVINCES.js";

const colors = { teak: "#1D3627", placeholder: "#615443", silk: "#E7DEC9" };

export default function ProvinceSelect({ value, onChange }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectProvince = (province) => {
    onChange(province);
    setIsOpen(false);
  };

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
        <ul
          role="listbox"
          className="province-select-list"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid " + colors.silk,
          }}
        >
          {PROVINCES.map((province) => (
            <li key={province} role="option" aria-selected={value === province}>
              <button
                type="button"
                className="province-select-option"
                onClick={() => selectProvince(province)}
              >
                {province}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
