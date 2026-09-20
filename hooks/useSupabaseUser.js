"use client";

import React from "react";
import { createClient } from "../lib/supabase/client.js";

// Tracks the signed-in Supabase user (or null) client-side and stays in
// sync across login/logout/token refresh via onAuthStateChange.
export default function useSupabaseUser() {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setIsLoading(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  return { user, isLoading };
}
