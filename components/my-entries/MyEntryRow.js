"use client";

import React from "react";
import EntryStatusBadge from "./EntryStatusBadge.js";
import EntryEditDeleteRow from "../entry/EntryEditDeleteRow.js";
import EntryModal from "../EntryModal.js";

const colors = { teak: "#1D3627", gold: "#B88C4B", silk: "#E7DEC9", cream: "#FAF7F0" };

const NOTE_PREVIEW_MAX_CHARS = 20;
const NOTE_PREVIEW_MAX_WORDS = 5;

function firstSentence(text) {
  const words = text.trim().split(/\s+/).slice(0, NOTE_PREVIEW_MAX_WORDS).join(" ");
  if (words.length <= NOTE_PREVIEW_MAX_CHARS) return words;
  return words.slice(0, NOTE_PREVIEW_MAX_CHARS).trimEnd();
}

export default function MyEntryRow({
  id, title, khmerName, status, contributor, place, ingredients, process, benefit, duration, imageLabel, reviewNote, onDeleted,
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isNoteOpen, setIsNoteOpen] = React.useState(false);
  const noteRef = React.useRef(null);
  const steps = Array.isArray(process) ? process : [process];

  const notePreview = reviewNote ? firstSentence(reviewNote) : "";
  const hasMoreNote = reviewNote && notePreview.length < reviewNote.length;

  React.useEffect(() => {
    if (!isNoteOpen) return;
    const handleClickOutside = (e) => {
      if (noteRef.current && !noteRef.current.contains(e.target)) setIsNoteOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNoteOpen]);

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
        <div className="wrap-content">
          {khmerName && (
            <p style={{ margin: "0 0 2px", fontFamily: "var(--font-khmer), var(--font-body), sans-serif", fontSize: 13, color: colors.gold }}>
              {khmerName}
            </p>
          )}
          <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 16, fontWeight: 700, color: colors.teak }}>
            {title}
          </p>
          {status === "returned" && reviewNote && (
            <p
              ref={noteRef}
              style={{
                margin: "6px 0 0", position: "relative",
                fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: colors.teak + "CC",
              }}
            >
              <span style={{ fontWeight: 600 }}>Reviewer note:</span> {notePreview}
              {hasMoreNote && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsNoteOpen((open) => !open);
                  }}
                  style={{
                    background: "none", border: "none", padding: "0 0 0 2px", margin: 0,
                    font: "inherit", color: colors.gold, fontWeight: 700, cursor: "pointer",
                  }}
                  aria-label="Show full reviewer note"
                  aria-expanded={isNoteOpen}
                >
                  …
                </button>
              )}

              {isNoteOpen && (
                <span
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: "absolute", top: "100%", left: 0, marginTop: 6, zIndex: 5,
                    display: "block", width: 260, maxWidth: "80vw",
                    backgroundColor: colors.cream, border: "1px solid #C49746", borderRadius: 10,
                    padding: "10px 12px", boxShadow: "0 6px 16px rgba(29, 54, 39, 0.18)",
                    color: colors.teak, fontWeight: 400, whiteSpace: "normal",
                  }}
                >
                  {reviewNote}
                </span>
              )}
            </p>
          )}
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}
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
