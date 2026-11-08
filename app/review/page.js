import { createClient } from "../../lib/supabase/server.js";
import ReviewQueue from "../../components/review/ReviewQueue.js";

const colors = { paper: "#FAF6EC", teak: "#2E3B2A" };

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

export default async function ReviewPage() {
  const supabase = await createClient();
  const { data: isReviewer } = await supabase.rpc("is_reviewer");

  let content;
  if (!isReviewer) {
    content = <CenteredMessage>You can&rsquo;t review entries.</CenteredMessage>;
  } else {
    const { data: entries } = await supabase
      .from("entries")
      .select("id, title, khmer_name, category, source, place, ingredients, process, benefit, duration, photo_url, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    content = <ReviewQueue entries={entries ?? []} />;
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
          Review Queue
        </h1>
        {content}
      </main>
    </div>
  );
}
