import { colors } from "./entryStyles.js";
import EntryEditDeleteRow from "./EntryEditDeleteRow.js";

export default function EntryOwnerActions({ entryId, title, onReadMore, onDeleted }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "stretch" }}>
      <button
        type="button"
        onClick={onReadMore}
        style={{
          fontFamily: "var(--font-body), sans-serif", fontSize: 13, fontWeight: 600,
          color: colors.cream, backgroundColor: colors.button, border: "none",
          padding: "10px 20px", borderRadius: 9999, cursor: "pointer", whiteSpace: "nowrap",
        }}
      >
        Read Full Remedy →
      </button>

      <EntryEditDeleteRow entryId={entryId} title={title} onDeleted={onDeleted} />
    </div>
  );
}
