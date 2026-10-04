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
    owner: row.owner,
  };
}

// Fetches a single entry by id, for the edit page. Same column mapping as
// useEntries.js, kept separate since this only ever needs one row.
export default function useEntry(id) {
  const [entry, setEntry] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }
    const supabase = createClient();
    supabase
      .from("entries")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error: fetchError }) => {
        if (fetchError) {
          setError(fetchError);
        } else {
          setEntry(mapRow(data));
        }
        setIsLoading(false);
      });
  }, [id]);

  return { entry, isLoading, error };
}
