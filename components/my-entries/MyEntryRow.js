import EntryStatusBadge from "./EntryStatusBadge.js";
import EntryEditDeleteRow from "../entry/EntryEditDeleteRow.js";

const colors = { teak: "#1D3627", gold: "#B88C4B", silk: "#E7DEC9", cream: "#FAF7F0" };

export default function MyEntryRow({ id, title, khmerName, status, onDeleted }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 16,
        padding: "16px 20px",
        backgroundColor: colors.cream,
        border: "1px solid " + colors.silk,
        borderRadius: 12,
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
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
        <EntryStatusBadge status={status} />
        <EntryEditDeleteRow entryId={id} title={title} onDeleted={onDeleted} compact />
      </div>
    </div>
  );
}
