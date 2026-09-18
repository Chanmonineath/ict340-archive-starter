import { colors } from "./entryStyles.js";

export default function EntryModalHeader({ title, khmerName, onClose }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        {khmerName && (
          <p style={{ fontFamily: "var(--font-khmer), var(--font-body), sans-serif", fontSize: 13, color: colors.gold, margin: "0 0 4px" }}>
            {khmerName}
          </p>
        )}
        <h2 className="modal-title" style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, color: colors.teak, margin: 0, lineHeight: 1.25 }}>
          {title}
        </h2>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close remedy"
        style={{
          width: 36, height: 36, borderRadius: "50%", border: "none",
          backgroundColor: colors.box, color: colors.teak, fontSize: 22,
          fontWeight: 700, lineHeight: 1, cursor: "pointer", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 0,
        }}
      >
        ×
      </button>
    </div>
  );
}
