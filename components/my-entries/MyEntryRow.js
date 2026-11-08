"use client";

import React from "react";
import EntryStatusBadge from "./EntryStatusBadge.js";
import EntryEditDeleteRow from "../entry/EntryEditDeleteRow.js";
import EntryModal from "../EntryModal.js";

const colors = { teak: "#1D3627", gold: "#B88C4B", silk: "#E7DEC9", cream: "#FAF7F0" };

export default function MyEntryRow({
  id, title, khmerName, status, contributor, place, ingredients, process, benefit, duration, imageLabel, reviewNote, onDeleted,
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const steps = Array.isArray(process) ? process : [process];

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen(true);
        }}
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          padding: "16px 20px",
          backgroundColor: colors.cream,
          border: "1px solid #C49746",
          borderRadius: 12,
          cursor: "pointer",
        }}
      >
        <div>
          {khmerName && (
            <p style={{ margin: "0 0 2px", fontFamily: "var(--font-khmer), var(--font-body), sans-serif", fontSize: 13, color: colors.gold }}>
              {khmerName}
            </p>
          )}
          <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 16, fontWeight: 700, color: colors.teak }}>
            {title}
          </p>
          {status === "returned" && reviewNote && (
            <p style={{ margin: "6px 0 0", fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: colors.teak + "CC" }}>
              <span style={{ fontWeight: 600 }}>Reviewer note:</span> {reviewNote}
            </p>
          )}
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}
          onClick={(e) => e.stopPropagation()}
        >
          <EntryStatusBadge status={status} />
          <EntryEditDeleteRow entryId={id} title={title} onDeleted={onDeleted} compact />
        </div>
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
          imageLabel={imageLabel}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
