import { colors } from "./entryStyles.js";
import EntryOwnerActions from "./EntryOwnerActions.js";

export default function EntryCardFooter({ duration, onReadMore, isOwner, entryId, title, onDeleted }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
      <p style={{ fontFamily: "var(--font-body), sans-serif", fontStyle: "italic", fontSize: 13, color: "#70624E", margin: 0, paddingTop: isOwner ? 10 : 0 }}>
        Takes {duration}
      </p>

      {isOwner ? (
        <EntryOwnerActions entryId={entryId} title={title} onReadMore={onReadMore} onDeleted={onDeleted} />
      ) : (
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
      )}
    </div>
  );
}
