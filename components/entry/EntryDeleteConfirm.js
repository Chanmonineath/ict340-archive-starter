import { colors } from "./entryStyles.js";

export default function EntryDeleteConfirm({ title, error, isDeleting, onCancel, onConfirm }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 12, backgroundColor: colors.box, border: "1px solid #D9A79B", borderRadius: 12 }}>
      <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 13, color: colors.teak }}>
        Delete &ldquo;{title}&rdquo;? This can&rsquo;t be undone.
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
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isDeleting}
          className="entry-delete-confirm"
          style={{ flex: 1, fontFamily: "var(--font-body), sans-serif", fontSize: 12, fontWeight: 700, color: colors.cream, border: "none", padding: "8px 12px", borderRadius: 9999, cursor: "pointer" }}
        >
          {isDeleting ? "Deleting…" : "Delete"}
        </button>
      </div>
    </div>
  );
}
