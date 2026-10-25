"use client";

import Link from "next/link";
import useSupabaseUser from "../../hooks/useSupabaseUser.js";
import useMyEntries from "../../hooks/useMyEntries.js";
import MyEntryRow from "../../components/my-entries/MyEntryRow.js";

const colors = { paper: "#FAF6EC", teak: "#2E3B2A", button: "#2E5B3A" };

const styles = {
  page: { backgroundColor: colors.paper, minHeight: "100vh" },
  main: { maxWidth: 700, margin: "0 auto" },
};

function CenteredMessage({ children }) {
  return (
    <p style={{ textAlign: "center", fontFamily: "var(--font-body), sans-serif", color: colors.teak + "99" }}>
      {children}
    </p>
  );
}

export default function MyEntriesPage() {
  const { user, isLoading: isUserLoading } = useSupabaseUser();
  const { entries, isLoading: isEntriesLoading, error, removeEntry } = useMyEntries(user?.id);

  let content;
  if (isUserLoading) {
    content = <CenteredMessage>Loading…</CenteredMessage>;
  } else if (!user) {
    content = (
      <CenteredMessage>
        <Link href="/login" style={{ color: colors.button, fontWeight: 600 }}>
          Log in
        </Link>{" "}
        to see your own entries.
      </CenteredMessage>
    );
  } else if (isEntriesLoading) {
    content = <CenteredMessage>Loading…</CenteredMessage>;
  } else if (error) {
    content = <CenteredMessage>Couldn&rsquo;t load your entries right now.</CenteredMessage>;
  } else if (entries.length === 0) {
    content = <CenteredMessage>You haven&rsquo;t submitted any entries yet.</CenteredMessage>;
  } else {
    content = (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {entries.map((entry) => (
          <MyEntryRow key={entry.id} {...entry} onDeleted={removeEntry} />
        ))}
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <main style={styles.main} className="contribute-main">
        <h1
          style={{
            margin: "0 0 24px",
            textAlign: "center",
            fontFamily: "var(--font-heading), serif",
            fontWeight: 700,
            color: colors.teak,
          }}
        >
          My Entries
        </h1>
        {content}
      </main>
    </div>
  );
}
