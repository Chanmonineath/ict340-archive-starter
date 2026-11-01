import { colors } from "../entry/entryStyles.js";

export default function ReviewDecisionButtons({ isSaving, onPublish, onReturn, error }) {
  return (
    <>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          type="button"
          onClick={onPublish}
          disabled={isSaving}
          style={{
            flex: 1, fontFamily: "var(--font-body), sans-serif", fontSize: 13, fontWeight: 600,
            color: colors.cream, backgroundColor: colors.button, border: "none",
            padding: "12px 24px", borderRadius: 9999, cursor: "pointer",
          }}
        >
          Publish
        </button>
        <button
          type="button"
          onClick={onReturn}
          disabled={isSaving}
          style={{
            flex: 1, fontFamily: "var(--font-body), sans-serif", fontSize: 13, fontWeight: 600,
            color: colors.teak, backgroundColor: "transparent", border: "1px solid " + colors.teak,
            padding: "12px 24px", borderRadius: 9999, cursor: "pointer",
          }}
        >
          Return for Changes
        </button>
      </div>

      {error && (
        <p className="auth-error" style={{ margin: 0, textAlign: "center" }}>
          {error}
        </p>
      )}
    </>
  );
}
