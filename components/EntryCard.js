"use client";

import React from "react";
import EntryModal from "./EntryModal.js";

const colors = {
  teak: "#2E3B2A",
  gold: "#B8893A",
  cream: "#FDF8E9",
  silk: "#E8DCC0",
  box: "#F1E9D8",
};

export default function EntryCard({
  title, khmerName, contributor, place, ingredients, process, benefit, duration,
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const steps = Array.isArray(process) ? process : [process];
  const preview = steps.slice(0, 2);

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
  const stepLine = {
    margin: 0,
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 1,
    WebkitBoxOrient: "vertical",
    textOverflow: "ellipsis",
  };

  return (
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: 24,
        backgroundColor: colors.cream,
        border: "1px solid " + colors.silk,
        borderRadius: 16,
      }}
    >
      {khmerName && (
        <p style={{ fontFamily: "var(--font-khmer), var(--font-body), sans-serif", fontSize: 13, color: colors.gold, margin: 0 }}>
          {khmerName}
        </p>
      )}
      <h3 style={{ fontFamily: "var(--font-heading), serif", fontSize: 24, fontWeight: 700, color: colors.teak, margin: 0, lineHeight: 1.25 }}>
        {title}
      </h3>

      <hr style={{ border: "none", borderTop: "1px solid " + colors.silk, margin: 0 }} />

      <div style={{ display: "flex", gap: 24 }}>
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <p style={label}>Process ({steps.length} steps)</p>
          <span style={{ fontFamily: "var(--font-body), sans-serif", fontSize: 12, color: colors.teak + "88" }}>
            Summary view
          </span>
        </div>
        <div style={{ ...box, display: "flex", flexDirection: "column", gap: 6 }}>
          {preview.map((step, i) => (
            <p key={i} style={stepLine}>
              {String(i + 1).padStart(2, "0")} {step}
            </p>
          ))}
        </div>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid " + colors.silk, margin: 0 }} />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontFamily: "var(--font-body), sans-serif", fontStyle: "italic", fontSize: 13, color: colors.teak + "99", margin: 0 }}>
          Takes {duration}
        </p>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: colors.cream,
            backgroundColor: colors.teak,
            border: "none",
            padding: "10px 20px",
            borderRadius: 9999,
            cursor: "pointer",
          }}
        >
          Read Full Remedy →
        </button>
      </div>

      {isOpen && (
        <EntryModal
          title={title}
          khmerName={khmerName}
          contributor={contributor}
          place={place}
          ingredients={ingredients}
          process={steps}
          benefit={benefit}
          onClose={() => setIsOpen(false)}
        />
      )}
    </article>
  );
}
