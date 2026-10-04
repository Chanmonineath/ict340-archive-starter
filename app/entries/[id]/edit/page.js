"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import NavBar from "../../../../components/NavBar.js";
import Footer from "../../../../components/Footer.js";
import useSupabaseUser from "../../../../hooks/useSupabaseUser.js";
import useEntry from "../../../../hooks/useEntry.js";
import ContributeForm from "../../../../components/contribute/ContributeForm.js";
import ContributeLoginPrompt from "../../../../components/contribute/ContributeLoginPrompt.js";

const colors = { paper: "#FAF6EC", teak: "#2E3B2A", button: "#2E5B3A" };

const styles = {
  page: { backgroundColor: colors.paper, minHeight: "100vh" },
  main: { maxWidth: 900, margin: "0 auto" },
};

function CenteredMessage({ children }) {
  return (
    <p
      style={{
        textAlign: "center",
        fontFamily: "var(--font-body), sans-serif",
        color: colors.teak + "99",
      }}
    >
      {children}
    </p>
  );
}

export default function EditEntryPage() {
  const { id } = useParams();
  const { user, isLoading: isUserLoading } = useSupabaseUser();
  const { entry, isLoading: isEntryLoading, error } = useEntry(id);

  const isLoading = isUserLoading || isEntryLoading;

  let content;
  if (isLoading) {
    content = <CenteredMessage>Loading…</CenteredMessage>;
  } else if (!user) {
    content = <ContributeLoginPrompt />;
  } else if (error || !entry) {
    content = (
      <CenteredMessage>
        Couldn&rsquo;t load this entry right now.
      </CenteredMessage>
    );
  } else if (entry.owner !== user.id) {
    content = (
      <CenteredMessage>You can&rsquo;t edit this entry.</CenteredMessage>
    );
  } else {
    content = <ContributeForm user={user} editingEntry={entry} />;
  }

  return (
    <div style={styles.page}>
      <NavBar />
      <main style={styles.main} className="contribute-main">
        <Link
          href="/archive"
          style={{
            display: "inline-block",
            marginTop: -48,
            marginBottom: 32,
            fontFamily: "var(--font-body), sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: colors.button,
            textDecoration: "none",
          }}
        >
          ← Back to Archive
        </Link>
        {content}
      </main>
      <Footer />
    </div>
  );
}
