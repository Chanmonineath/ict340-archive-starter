"use client";

import React from "react";
import EntryPhoto from "./EntryPhoto.js";

const colors = {
  teak: "#2E3B2A",
  gold: "#B8893A",
  cream: "#FDF8E9",
  silk: "#E8DCC0",
  box: "#F1E9D8",
};

export default function EntryModal({
  title, khmerName, contributor, place, ingredients, process, benefit, imageLabel, onClose,
}) {
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const overlay = {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(46, 59, 42, 0.55)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  };
  const modal = {
    backgroundColor: colors.cream,
    borderRadius: 16,
    maxWidth: 560,
    width: "100%",
    maxHeight: "85vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  };
  const label = {
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: colors.gold,
    margin: "0 0 4px",
  };
  const value = {
    fontFamily: "var(--font-heading), serif",
    fontSize: 15,
    fontWeight: 600,
    color: colors.teak,
    margin: 0,
  };
  const box = {
    padding: "12px 14px",
    backgroundColor: colors.box,
    border: "1px solid " + colors.silk,
    borderRadius: 10,
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 14,
    color: colors.teak + "CC",
    lineHeight: 1.5,
    margin: 0,
  };

  return (
    <div style={overlay} className="modal-overlay" onClick={onClose}>
      <div
        style={modal}
        className="modal-scroll"
        role="dialog"
        aria-modal="true"
        aria-label={"Full remedy: " + title}
        onClick={(e) => e.stopPropagation()}
      >
        <EntryPhoto label={imageLabel} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            {khmerName && (
              <p style={{ fontFamily: "var(--font-khmer), var(--font-body), sans-serif", fontSize: 13, color: colors.gold, margin: "0 0 4px" }}>
                {khmerName}
              </p>
            )}
            <h2 className="modal-title" style={{ fontFamily: "var(--font-heading), serif", fontWeight: 700, color: colors.teak, margin: 0 }}>
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close remedy"
            style={{
              width: 36, height: 36, borderRadius: "50%", border: "none",
              backgroundColor: colors.box, color: colors.teak, fontSize: 22,
              fontWeight: 700, lineHeight: 1, cursor: "pointer", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 0,
            }}
          >
            ×
          </button>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid " + colors.silk, margin: 0 }} />

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div>
            <p style={label}>Contributor</p>
            <p style={value}>{contributor}</p>
          </div>
          <div>
            <p style={label}>Place</p>
            <p style={value}>{place}</p>
          </div>
        </div>

        {ingredients && (
          <div>
            <p style={label}>Ingredients</p>
            <p style={box}>{ingredients}</p>
          </div>
        )}

        <div>
          <p style={label}>Preparation Process</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {process.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", backgroundColor: colors.box, border: "1px solid " + colors.silk, borderRadius: 10 }}>
                <span style={{ flexShrink: 0, width: 24, height: 24, borderRadius: "50%", backgroundColor: colors.silk, color: colors.teak, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {i + 1}
                </span>
                <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 14, color: colors.teak + "CC", lineHeight: 1.5 }}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {benefit && (
          <div>
            <p style={label}>Benefit &amp; Wellness Notes</p>
            <p style={{ ...box, fontStyle: "italic" }}>{benefit}</p>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          style={{
            alignSelf: "flex-end",
            fontFamily: "var(--font-body), sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: colors.cream,
            backgroundColor: colors.teak,
            border: "none",
            padding: "12px 24px",
            borderRadius: 9999,
            cursor: "pointer",
          }}
        >
          Close Remedy
        </button>
      </div>
    </div>
  );
}
