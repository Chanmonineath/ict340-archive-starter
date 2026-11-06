"use client";

import React from "react";
import { colors, label } from "../entry/entryStyles.js";
import EntryMeta from "../entry/EntryMeta.js";
import EntryProcessPreview from "../entry/EntryProcessPreview.js";
import EntryPhoto from "../EntryPhoto.js";
import EntryModal from "../EntryModal.js";
import ReviewDecisionButtons from "./ReviewDecisionButtons.js";

export default function ReviewEntryCard({ entry, onDecision }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState("");
  const steps = Array.isArray(entry.process) ? entry.process : [entry.process];

  const decide = async (decision) => {
    setIsSaving(true);
    setError("");
    await onDecision(entry.id, decision, () => {
      setIsSaving(false);
      setError("That change wasn't saved. Please try again.");
    });
  };

  return (
    <article
      className="wrap-content"
      style={{
        backgroundColor: colors.cream,
        borderRadius: 15,
        border: "1px solid #C49746",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <EntryPhoto src={entry.photo_url} label={entry.title} />

      {entry.khmer_name && (
        <p style={{ fontFamily: "var(--font-khmer), var(--font-body), sans-serif", fontSize: 13, color: colors.gold, margin: 0 }}>
          {entry.khmer_name}
        </p>
      )}
      <h2 style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, color: colors.teak, margin: 0 }}>
        {entry.title}
      </h2>

      <hr style={{ border: "none", borderTop: "1px solid " + colors.silk, margin: 0 }} />

      <EntryMeta contributor={entry.source} place={entry.place} ingredients={entry.ingredients} />

      <div>
        <p style={label}>Process ({steps.length} steps)</p>
        <EntryProcessPreview steps={steps} />
      </div>

      <hr style={{ border: "none", borderTop: "1px solid " + colors.silk, margin: 0 }} />

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          alignSelf: "flex-end",
          fontFamily: "var(--font-body), sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: colors.cream,
          backgroundColor: colors.button,
          border: "none",
          padding: "10px 20px",
          borderRadius: 9999,
          cursor: "pointer",
        }}
      >
        View Full Remedy →
      </button>

      <ReviewDecisionButtons
        isSaving={isSaving}
        onPublish={() => decide("published")}
        onReturn={() => decide("returned")}
        error={error}
      />

      {isOpen && (
        <EntryModal
          title={entry.title}
          khmerName={entry.khmer_name}
          contributor={entry.source}
          place={entry.place}
          ingredients={entry.ingredients}
          process={steps}
          benefit={entry.benefit}
          imageLabel={entry.photo_url}
          onClose={() => setIsOpen(false)}
        />
      )}
    </article>
  );
}
