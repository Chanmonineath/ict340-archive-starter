"use client";

import Link from "next/link";
import useSupabaseUser from "../../hooks/useSupabaseUser.js";
import useMyEntries from "../../hooks/useMyEntries.js";
import useLanguage from "../../hooks/useLanguage.js";
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
  const { t } = useLanguage();

  let content;
  if (isUserLoading) {
    content = <CenteredMessage>{t.common.loading}</CenteredMessage>;
  } else if (!user) {
    content = (
      <CenteredMessage>
        <Link href="/login" style={{ color: colors.button, fontWeight: 600 }}>
          {t.myEntries.logIn}
        </Link>
        {t.myEntries.logInSuffix}
      </CenteredMessage>
    );
  } else if (isEntriesLoading) {
    content = <CenteredMessage>{t.common.loading}</CenteredMessage>;
  } else if (error) {
    content = <CenteredMessage>{t.myEntries.loadError}</CenteredMessage>;
  } else if (entries.length === 0) {
    content = <CenteredMessage>{t.myEntries.empty}</CenteredMessage>;
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
          {t.myEntries.heading}
        </h1>
        {content}
      </main>
    </div>
  );
}
