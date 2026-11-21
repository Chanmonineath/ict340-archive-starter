"use client";

import { colors } from "./entryStyles.js";
import useLanguage from "../../hooks/useLanguage.js";

export default function EntryDeleteConfirm({ title, error, isDeleting, onCancel, onConfirm }) {
  const { t } = useLanguage();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 12, backgroundColor: colors.box, border: "1px solid #D9A79B", borderRadius: 12 }}>
      <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: colors.teak }}>
        {t.entryCard.deleteConfirm(title)}
      </p>
      {error && <p style={{ margin: 0, fontSize: 12, color: "#9C3B2E" }}>{error}</p>}
      <div style={{ display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={onCancel}
          disabled={isDeleting}
          className="contribute-cancel"
          style={{ flex: 1, fontFamily: "var(--font-body), sans-serif", fontSize: 12, fontWeight: 600, color: "#FAF7F0", border: "none", padding: "8px 12px", borderRadius: 9999, cursor: "pointer" }}
        >
          {t.entryCard.cancel}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isDeleting}
          className="entry-delete-confirm"
          style={{ flex: 1, fontFamily: "var(--font-body), sans-serif", fontSize: 12, fontWeight: 700, color: colors.cream, border: "none", padding: "8px 12px", borderRadius: 9999, cursor: "pointer" }}
        >
          {isDeleting ? t.entryCard.deleting : t.entryCard.delete}
        </button>
      </div>
    </div>
  );
}
