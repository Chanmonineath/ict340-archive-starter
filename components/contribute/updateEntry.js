import { createClient } from "../../lib/supabase/client.js";
import { photoExtension } from "./contributeValidation.js";

// Updates an existing entry. If a new photo was chosen, uploads it the same
// way submitEntry.js does (random path under the owner's id, extension from
// the validated MIME type, never the original filename) and swaps the URL;
// otherwise keeps the entry's current photo_url untouched. owner is never
// included in the update payload — it's immutable after creation. Checks a
// row actually came back so a silently-blocked write (e.g. RLS) surfaces as
// a real error instead of a false "saved" message.
export async function updateEntry({ id, ownerId, fields, photoFile, currentPhotoUrl }) {
  const supabase = createClient();
  let photoUrl = currentPhotoUrl;

  if (photoFile) {
    const extension = photoExtension(photoFile);
    const path = `${ownerId}/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("photos")
      .upload(path, photoFile, { contentType: photoFile.type });

    if (uploadError) {
      console.error(uploadError);
      throw new Error("upload");
    }

    photoUrl = supabase.storage.from("photos").getPublicUrl(path).data.publicUrl;
  }

  const { data, error } = await supabase
    .from("entries")
    .update({
      title: fields.title.trim(),
      khmer_name: fields.khmerName.trim(),
      category: fields.category.trim(),
      source: fields.source.trim(),
      place: fields.place.trim(),
      ingredients: fields.ingredients.trim(),
      process: fields.process.map((step) => step.trim()).filter(Boolean),
      benefit: fields.benefit.trim(),
      duration: fields.duration.trim(),
      photo_url: photoUrl,
    })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("update");
  }
  if (!data || data.length === 0) {
    console.error("updateEntry: no row returned for id", id);
    throw new Error("no-row");
  }

  return data[0];
}
