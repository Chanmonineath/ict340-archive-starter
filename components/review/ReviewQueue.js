"use client";

import ReviewEntryRow from "./ReviewEntryRow.js";
import useLanguage from "../../hooks/useLanguage.js";

const colors = { teak: "#2E3B2A" };

export default function ReviewQueue({ entries }) {
  const { t } = useLanguage();

  if (entries.length === 0) {
    return (
      <p style={{ textAlign: "center", fontFamily: "var(--font-body), sans-serif", color: colors.teak + "99" }}>
        {t.review.empty}
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
