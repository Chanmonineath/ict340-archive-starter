"use client";

import React from "react";
import { colors, label, box } from "./entry/entryStyles.js";
import EntryModalHeader from "./entry/EntryModalHeader.js";
import EntryMeta from "./entry/EntryMeta.js";
import EntryProcessList from "./entry/EntryProcessList.js";
// Re-enable once real photos replace the placeholder text:
// import EntryPhoto from "./EntryPhoto.js";

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
        {/* <EntryPhoto label={imageLabel} /> */}

        <EntryModalHeader title={title} khmerName={khmerName} onClose={onClose} />

        <hr style={{ border: "none", borderTop: "1px solid " + colors.silk, margin: 0 }} />

        <EntryMeta contributor={contributor} place={place} ingredients={ingredients} />

        <div>
          <p style={label}>Preparation Process</p>
          <EntryProcessList steps={process} />
        </div>

        {benefit && (
          <div>
            <p style={label}>Benefit &amp; Wellness Notes</p>
            <p style={box}>{benefit}</p>
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
            backgroundColor: colors.button,
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
