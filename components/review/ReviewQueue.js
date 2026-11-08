import ReviewEntryRow from "./ReviewEntryRow.js";

const colors = { teak: "#2E3B2A" };

export default function ReviewQueue({ entries }) {
  if (entries.length === 0) {
    return (
      <p style={{ textAlign: "center", fontFamily: "var(--font-body), sans-serif", color: colors.teak + "99" }}>
        Nothing waiting for review right now.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {entries.map((entry) => (
        <ReviewEntryRow key={entry.id} {...entry} />
      ))}
    </div>
  );
}
