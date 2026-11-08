"use client";

import React from "react";
import { createClient } from "../lib/supabase/client.js";

function mapRow(row) {
  return {
    id: row.id,
    title: row.title,
    khmerName: row.khmer_name,
    status: row.status,
    contributor: row.source,
    place: row.place,
    ingredients: row.ingredients,
    process: row.process,
    benefit: row.benefit,
    duration: row.duration,
    imageLabel: row.photo_url,
    reviewNote: row.review_note,
  };
}

// Fetches the logged-in user's own entries, every status included — this is
// the one place a contributor can see their pending and returned work, not
// just what's already published.
export default function useMyEntries(userId) {
  const [entries, setEntries] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    const supabase = createClient();
    supabase
      .from("entries")
      .select("id, title, khmer_name, status, source, place, ingredients, process, benefit, duration, photo_url, review_note")
      .eq("owner", userId)
      .order("created_at", { ascending: false })
      .then(({ data, error: fetchError }) => {
        if (fetchError) {
          setError(fetchError);
        } else {
          setEntries((data ?? []).map(mapRow));
        }
        setIsLoading(false);
      });
  }, [userId]);

  const removeEntry = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return { entries, isLoading, error, removeEntry };
}
