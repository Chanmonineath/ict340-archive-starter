import { createClient } from "../../lib/supabase/client.js";

// Deletes one entry by id, then checks a row actually came back from the
// delete — if RLS silently blocked it, data comes back empty with no
// Postgres error, so that case is surfaced as its own failure.
export async function deleteEntry(id) {
  const supabase = createClient();
  const { data, error } = await supabase.from("entries").delete().eq("id", id).select();

  if (error) {
    console.error(error);
    throw new Error("delete");
  }
  if (!data || data.length === 0) {
    console.error("deleteEntry: no row returned for id", id);
    throw new Error("no-row");
  }
  return true;
}
