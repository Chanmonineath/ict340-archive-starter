import Link from "next/link";
import { createClient } from "../../../lib/supabase/server.js";
import { colors, label, box } from "../../../components/entry/entryStyles.js";
import EntryMeta from "../../../components/entry/EntryMeta.js";
import EntryProcessList from "../../../components/entry/EntryProcessList.js";
import EntryPhoto from "../../../components/EntryPhoto.js";
import ReviewDecisionPanel from "../../../components/review/ReviewDecisionPanel.js";

const pageColors = { paper: "#FAF6EC", teak: "#2E3B2A", button: "#2E5B3A" };

const styles = {
  page: { backgroundColor: pageColors.paper, minHeight: "100vh" },
  main: { maxWidth: 700, margin: "0 auto" },
};

function CenteredMessage({ children }) {
  return (
    <p style={{ textAlign: "center", fontFamily: "var(--font-body), sans-serif", color: pageColors.teak + "99" }}>
      {children}
    </p>
  );
}

export default async function ReviewEntryPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: isReviewer } = await supabase.rpc("is_reviewer");

  let content;
  if (!isReviewer) {
    content = <CenteredMessage>You can&rsquo;t review entries.</CenteredMessage>;
  } else {
    const { data: entry } = await supabase
      .from("entries")
      .select("id, title, khmer_name, category, source, place, ingredients, process, benefit, duration, photo_url, status")
      .eq("id", id)
      .maybeSingle();

    if (!entry || entry.status !== "pending") {
      content = <CenteredMessage>This entry isn&rsquo;t waiting for review.</CenteredMessage>;
    } else {
      const steps = Array.isArray(entry.process) ? entry.process : [entry.process];

      content = (
        <div className="wrap-content" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <EntryPhoto src={entry.photo_url} label={entry.title} />

          {entry.khmer_name && (
            <p style={{ fontFamily: "var(--font-khmer), var(--font-body), sans-serif", fontSize: 13, color: colors.gold, margin: 0 }}>
              {entry.khmer_name}
            </p>
          )}
          <h1 style={{ fontFamily: "var(--font-body), sans-serif", fontWeight: 700, color: colors.teak, margin: 0 }}>
            {entry.title}
          </h1>

          <hr style={{ border: "none", borderTop: "1px solid " + colors.silk, margin: 0 }} />

          <EntryMeta contributor={entry.source} place={entry.place} ingredients={entry.ingredients} />

          <div>
            <p style={label}>Preparation Process</p>
            <EntryProcessList steps={steps} />
          </div>

          {entry.benefit && (
            <div>
              <p style={label}>Benefit &amp; Wellness Notes</p>
              <p style={box}>{entry.benefit}</p>
            </div>
          )}

          <hr style={{ border: "none", borderTop: "1px solid " + colors.silk, margin: 0 }} />

          <ReviewDecisionPanel entryId={entry.id} />
        </div>
      );
    }
  }

  return (
    <div style={styles.page}>
      <main style={styles.main} className="contribute-main">
        <Link
          href="/review"
          style={{
            display: "inline-block",
            marginBottom: 24,
            fontFamily: "var(--font-body), sans-serif",
            fontSize: 14,
            fontWeight: 700,
            color: pageColors.button,
            textDecoration: "none",
          }}
        >
          ← Back to Review Queue
        </Link>
        {content}
      </main>
    </div>
  );
}
