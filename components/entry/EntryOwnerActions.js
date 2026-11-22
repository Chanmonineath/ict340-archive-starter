"use client";

import { colors } from "./entryStyles.js";
import EntryEditDeleteRow from "./EntryEditDeleteRow.js";
import useLanguage from "../../hooks/useLanguage.js";

export default function EntryOwnerActions({ entryId, title, onReadMore, onDeleted }) {
  const { t } = useLanguage();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "stretch" }}>
      <button
        type="button"
        className="btn-primary-pill"
        onClick={onReadMore}
        style={{
          fontFamily: "var(--font-body), var(--font-khmer), sans-serif", fontSize: 13, fontWeight: 600,
          color: colors.cream, backgroundColor: colors.button, border: "none",
          padding: "10px 20px", borderRadius: 9999, cursor: "pointer", whiteSpace: "nowrap",
        }}
      >
        {t.entryCard.readFullRemedy}
      </button>

      <EntryEditDeleteRow entryId={entryId} title={title} onDeleted={onDeleted} />
    </div>
  );
}
