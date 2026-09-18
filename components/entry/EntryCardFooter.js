import { colors } from "./entryStyles.js";

export default function EntryCardFooter({ duration, onReadMore }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
      <p style={{ fontFamily: "var(--font-body), sans-serif", fontStyle: "italic", fontSize: 13, color: "#70624E", margin: 0 }}>
        Takes {duration}
      </p>
      <button
        type="button"
        onClick={onReadMore}
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: colors.cream,
          backgroundColor: colors.button,
          border: "none",
          padding: "10px 20px",
          borderRadius: 9999,
          cursor: "pointer",
          transition: "background-color 0.2s ease, transform 0.1s ease",
        }}
      >
        Read Full Remedy →
      </button>
    </div>
  );
}
