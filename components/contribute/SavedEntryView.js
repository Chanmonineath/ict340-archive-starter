import Link from "next/link";
import { colors, label, box } from "../entry/entryStyles.js";
import EntryMeta from "../entry/EntryMeta.js";
import EntryProcessList from "../entry/EntryProcessList.js";

export default function SavedEntryView({ entry, onReset, isEditing }) {
  return (
    <div
      style={{
        backgroundColor: colors.cream,
        borderRadius: 15,
        border: "1px solid " + colors.silk,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 13, fontWeight: 600, color: colors.button }}>
        {isEditing ? "Changes saved." : "Entry saved — thank you for sharing!"}
      </p>

      {entry.photo_url && (
        <img
          src={entry.photo_url}
          alt={entry.title}
          style={{ width: "100%", maxHeight: 280, objectFit: "cover", borderRadius: 15 }}
        />
      )}

      {entry.khmer_name && (
        <p style={{ fontFamily: "var(--font-khmer), var(--font-body), sans-serif", fontSize: 13, color: colors.gold, margin: 0 }}>
          {entry.khmer_name}
        </p>
      )}
      <h2 style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, color: colors.teak, margin: 0, lineHeight: 1.25 }}>
        {entry.title}
      </h2>

      <hr style={{ border: "none", borderTop: "1px solid " + colors.silk, margin: 0 }} />

      <EntryMeta contributor={entry.source} place={entry.place} ingredients={entry.ingredients} />

      <div>
        <p style={label}>Preparation Process</p>
        <EntryProcessList steps={entry.process} />
      </div>

      {entry.benefit && (
        <div>
          <p style={label}>Benefit &amp; Wellness Notes</p>
          <p style={box}>{entry.benefit}</p>
        </div>
      )}

      {isEditing ? (
        <div style={{ display: "flex", gap: 12 }}>
          <Link
            href="/archive"
            style={{
              flex: 1,
              display: "block",
              textAlign: "center",
              fontFamily: "var(--font-body), sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: colors.cream,
              backgroundColor: colors.button,
              border: "none",
              padding: "12px 24px",
              borderRadius: 9999,
              cursor: "pointer",
              textDecoration: "none",
              boxSizing: "border-box",
            }}
          >
            Back
          </Link>
          <Link
            href={`/entries/${entry.id}/edit`}
            style={{
              flex: 1,
              display: "block",
              textAlign: "center",
              fontFamily: "var(--font-body), sans-serif",
              fontSize: 13,
              fontWeight: 600,
              color: colors.button,
              backgroundColor: "transparent",
              border: "1px solid " + colors.button,
              padding: "12px 24px",
              borderRadius: 9999,
              cursor: "pointer",
              textDecoration: "none",
              boxSizing: "border-box",
            }}
          >
            Edit Again
          </Link>
        </div>
      ) : (
        <button
          type="button"
          onClick={onReset}
          style={{
            alignSelf: "flex-start",
            fontFamily: "var(--font-body), sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: colors.cream,
            backgroundColor: colors.button,
            border: "none",
            padding: "12px 24px",
            borderRadius: 9999,
            cursor: "pointer",
          }}
        >
          Share Another Entry
        </button>
      )}
    </div>
  );
}
