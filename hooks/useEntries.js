"use client";

import React from "react";
import { createClient } from "../lib/supabase/client.js";

function mapRow(row) {
  return {
    id: row.id,
    title: row.title,
    khmerName: row.khmer_name,
    category: row.category,
    contributor: row.source,
    place: row.place,
    ingredients: row.ingredients,
    process: row.process,
    benefit: row.benefit,
    duration: row.duration,
    imageLabel: row.photo_url,
    ownerName: row.profiles?.name ?? null,
  };
}

// Fetches all entries from Supabase, newest first (title as a tiebreaker),
// joined with each owner's public profile name, mapping snake_case columns
// to the camelCase shape every entry component already expects.
export default function useEntries() {
  const [entries, setEntries] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const supabase = createClient();
    supabase
      .from("entries")
      .select("*, profiles(name)")
      .order("created_at", { ascending: false })
      .order("title", { ascending: true })
      .then(({ data, error: fetchError }) => {
        if (fetchError) {
          setError(fetchError);
        } else {
          setEntries((data ?? []).map(mapRow));
        }
        setIsLoading(false);
      });
  }, []);

  return { entries, isLoading, error };
}
