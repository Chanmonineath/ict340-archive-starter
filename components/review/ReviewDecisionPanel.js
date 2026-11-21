"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client.js";
import ReviewDecisionButtons from "./ReviewDecisionButtons.js";
import useLanguage from "../../hooks/useLanguage.js";

export default function ReviewDecisionPanel({ entryId }) {
  const router = useRouter();
  const { t } = useLanguage();
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  const decide = async (decision, note) => {
    setIsSaving(true);
    setError("");

    const supabase = createClient();
    const { data: succeeded, error: rpcError } = await supabase.rpc("review_entry", {
      entry_id: entryId,
      decision,
      note: note?.trim() || null,
    });

    if (rpcError || succeeded !== true) {
      setIsSaving(false);
      setError(t.review.notSaved);
      return;
    }

    router.push("/review");
    router.refresh();
  };

  return (
    <ReviewDecisionButtons
      isSaving={isSaving}
      onPublish={() => decide("published")}
      onReturn={(note) => decide("returned", note)}
      error={error}
    />
  );
}
