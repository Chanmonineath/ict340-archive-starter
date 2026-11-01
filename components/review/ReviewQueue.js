"use client";

import React from "react";
import { createClient } from "../../lib/supabase/client.js";
import ReviewEntryCard from "./ReviewEntryCard.js";

const colors = { teak: "#2E3B2A" };

export default function ReviewQueue({ initialEntries }) {
  const [entries, setEntries] = React.useState(initialEntries);

  const handleDecision = async (entryId, decision, onFailure) => {
    const supabase = createClient();
    const { data: succeeded, error } = await supabase.rpc("review_entry", {
      entry_id: entryId,
      decision,
    });

    if (error || succeeded !== true) {
      onFailure();
      return;
    }

    setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
  };

  if (entries.length === 0) {
    return (
      <p style={{ textAlign: "center", fontFamily: "var(--font-body), sans-serif", color: colors.teak + "99" }}>
        Nothing waiting for review right now.
      </p>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {entries.map((entry) => (
        <ReviewEntryCard key={entry.id} entry={entry} onDecision={handleDecision} />
      ))}
    </div>
  );
}
