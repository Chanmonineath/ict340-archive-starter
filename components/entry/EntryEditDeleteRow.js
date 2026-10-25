"use client";

import React from "react";
import Link from "next/link";
import { colors } from "./entryStyles.js";
import { deleteEntry } from "./deleteEntry.js";
import EntryDeleteConfirm from "./EntryDeleteConfirm.js";

export default function EntryEditDeleteRow({ entryId, title, onDeleted, compact }) {
  const [isConfirming, setIsConfirming] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");
    try {
      await deleteEntry(entryId);
      onDeleted?.(entryId);
    } catch (err) {
      setError(err.message === "no-row" ? "That change wasn't saved" : "Couldn't delete this entry right now.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isConfirming) {
    return (
      <EntryDeleteConfirm
        title={title}
        error={error}
        isDeleting={isDeleting}
        onCancel={() => setIsConfirming(false)}
        onConfirm={handleDelete}
      />
    );
  }

  if (compact) {
    const iconBtn = {
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 40, height: 40, borderRadius: "50%", backgroundColor: colors.cream,
      cursor: "pointer", textDecoration: "none",
    };
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Link href={`/entries/${entryId}/edit`} aria-label="Edit entry" style={{ ...iconBtn, color: colors.teak, border: "1.5px solid " + colors.teak }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </Link>
        <button type="button" onClick={() => setIsConfirming(true)} aria-label="Delete entry" style={{ ...iconBtn, color: "#9C3B2E", border: "1.5px solid #D9A79B" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Link
        href={`/entries/${entryId}/edit`}
        style={{
          flex: "1 1 0", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5,
          fontFamily: "var(--font-body), sans-serif", fontSize: 12, fontWeight: 600, color: colors.teak,
          backgroundColor: colors.cream, border: "1px solid " + colors.teak, padding: "7px 10px",
          borderRadius: 9999, cursor: "pointer", textDecoration: "none",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
        Edit
      </Link>
      <button
        type="button"
        onClick={() => setIsConfirming(true)}
        aria-label="Delete entry"
        style={{
          flex: "1 1 0", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5,
          fontFamily: "var(--font-body), sans-serif", fontSize: 12, fontWeight: 600, color: "#9C3B2E",
          backgroundColor: colors.cream, border: "1px solid #D9A79B", padding: "7px 10px",
          borderRadius: 9999, cursor: "pointer",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
        Delete
      </button>
    </div>
  );
}
