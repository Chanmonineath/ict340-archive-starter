"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client.js";
import ReviewDecisionButtons from "./ReviewDecisionButtons.js";

export default function ReviewDecisionPanel({ entryId }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState("");

  const decide = async (decision) => {
    setIsSaving(true);
    setError("");

    const supabase = createClient();
    const { data: succeeded, error: rpcError } = await supabase.rpc("review_entry", {
      entry_id: entryId,
      decision,
    });

    if (rpcError || succeeded !== true) {
      setIsSaving(false);
      setError("That change wasn't saved. Please try again.");
      return;
    }

    router.push("/review");
    router.refresh();
  };

  return (
    <ReviewDecisionButtons
      isSaving={isSaving}
      onPublish={() => decide("published")}
      onReturn={() => decide("returned")}
      error={error}
    />
  );
}
