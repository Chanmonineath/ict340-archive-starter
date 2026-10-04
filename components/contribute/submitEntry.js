import { createClient } from "../../lib/supabase/client.js";
import { photoExtension } from "./contributeValidation.js";

// Uploads the photo to Storage, then inserts the entry row. Never trusts the
// original filename or its extension — the storage path extension comes
// from the validated MIME type only, and owner is always the session's own
// user id, never anything read from the form.
export async function submitEntry({ fields, photoFile, user }) {
  const supabase = createClient();
  let photoUrl = null;

  if (photoFile) {
    const extension = photoExtension(photoFile);
    const path = `${user.id}/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("photos")
      .upload(path, photoFile, { contentType: photoFile.type });

    if (uploadError) {
      console.error(uploadError);
      throw new Error("upload");
    }

    photoUrl = supabase.storage.from("photos").getPublicUrl(path).data.publicUrl;
  }

  const { data: inserted, error: insertError } = await supabase
    .from("entries")
    .insert({
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
      owner: user.id,
    })
    .select()
    .single();

  if (insertError) {
    console.error(insertError);
    throw new Error("insert");
  }

  return inserted;
}
