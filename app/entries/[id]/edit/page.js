"use client";

import { useParams, useRouter } from "next/navigation";
import useSupabaseUser from "../../../../hooks/useSupabaseUser.js";
import useEntry from "../../../../hooks/useEntry.js";
import useLanguage from "../../../../hooks/useLanguage.js";
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
        fontFamily: "var(--font-body), var(--font-khmer), sans-serif",
        color: colors.teak + "99",
      }}
    >
      {children}
    </p>
  );
}

export default function EditEntryPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isLoading: isUserLoading } = useSupabaseUser();
  const { entry, isLoading: isEntryLoading, error } = useEntry(id);
  const { t } = useLanguage();

  const isLoading = isUserLoading || isEntryLoading;

  let content;
  if (isLoading) {
    content = <CenteredMessage>{t.common.loading}</CenteredMessage>;
  } else if (!user) {
    content = <ContributeLoginPrompt />;
  } else if (error || !entry) {
    content = (
      <CenteredMessage>
        {t.entryEdit.loadError}
      </CenteredMessage>
    );
  } else if (entry.owner !== user.id) {
    content = (
      <CenteredMessage>{t.entryEdit.notYours}</CenteredMessage>
    );
  } else {
    content = <ContributeForm user={user} editingEntry={entry} />;
  }

  return (
    <div style={styles.page}>
      <main style={styles.main} className="contribute-main">
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            display: "inline-block",
            marginTop: -48,
            marginBottom: 32,
            fontFamily: "var(--font-body), var(--font-khmer), sans-serif",
            fontSize: 18,
            fontWeight: 700,
            color: colors.button,
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          {t.entryEdit.back}
        </button>
        {content}
      </main>
    </div>
  );
}
