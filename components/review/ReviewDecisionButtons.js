import React from "react";
import { colors } from "../entry/entryStyles.js";

const MAX_NOTE_WORDS = 500;

function countWords(text) {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export default function ReviewDecisionButtons({ isSaving, onPublish, onReturn, error }) {
  const [note, setNote] = React.useState("");
  const wordCount = countWords(note);
  const isOverLimit = wordCount > MAX_NOTE_WORDS;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <label
          htmlFor="review-note"
          style={{
            display: "block", marginBottom: 6, fontFamily: "var(--font-body), sans-serif",
            fontSize: 12, fontWeight: 600, color: colors.teak,
          }}
        >
          Note for the contributor (optional, shown if returned)
        </label>
        <textarea
          id="review-note"
          className="auth-input"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={isSaving}
          rows={2}
          placeholder="e.g. Please add a photo of the finished remedy."
          style={{ width: "100%", resize: "vertical", borderRadius: 15, boxSizing: "border-box" }}
        />
        <p
          style={{
            margin: "4px 0 0", textAlign: "right", fontFamily: "var(--font-body), sans-serif",
            fontSize: 11, color: isOverLimit ? "#9C3B2E" : colors.teak + "99",
          }}
        >
          {wordCount}/{MAX_NOTE_WORDS} words
        </p>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button
          type="button"
          className="btn-secondary-pill"
          onClick={() => onReturn(note)}
          disabled={isSaving || isOverLimit}
          style={{
            flex: 1, fontFamily: "var(--font-body), sans-serif", fontSize: 13, fontWeight: 600,
            color: colors.teak, backgroundColor: "transparent", border: "1px solid " + colors.teak,
            padding: "12px 24px", borderRadius: 9999, cursor: "pointer",
          }}
        >
          Return for Changes
        </button>
        <button
          type="button"
          className="btn-primary-pill"
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
      </div>

      {error && (
        <p className="auth-error" style={{ margin: 0, textAlign: "center" }}>
          {error}
        </p>
      )}
    </div>
  );
}
