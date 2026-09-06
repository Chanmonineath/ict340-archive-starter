import NavBar from "../../components/NavBar.js";
import collection from "../../collection.config.js";

const colors = {
  gold: "#B8893A",
  crimson: "#6B2D1A",
  teak: "#2E3B2A",
  leaf: "#3F5B3A",
  sand: "#F5EFE2",
  silk: "#E8DCC0",
  paper: "#FAF6EC",
};

const styles = {
  page: { backgroundColor: colors.paper, minHeight: "100vh" },
  main: { maxWidth: 800, margin: "0 auto", padding: "64px 24px 80px" },
  label: {
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: colors.gold,
    margin: 0,
  },
  title: {
    fontFamily: "var(--font-heading), serif",
    fontSize: 40,
    fontWeight: 700,
    color: colors.teak,
    margin: "8px 0 20px",
    lineHeight: 1.2,
  },
  description: {
    fontFamily: "var(--font-body), var(--font-khmer), sans-serif",
    fontSize: 17,
    color: colors.teak + "CC",
    lineHeight: 1.7,
    margin: "0 0 48px",
    maxWidth: 620,
  },
  curatorRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 24,
  },
  curatorCard: {
    padding: 28,
    backgroundColor: colors.sand,
    border: "1px solid " + colors.silk,
    borderRadius: 8,
  },
  curatorCardLeaf: { borderTop: "3px solid " + colors.leaf },
  curatorCardGold: { borderTop: "3px solid " + colors.gold },
  curatorLabel: {
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: colors.gold,
    margin: 0,
  },
  curatorValue: {
    fontFamily: "var(--font-heading), serif",
    fontSize: 26,
    fontWeight: 700,
    color: colors.teak,
    margin: "6px 0 0",
  },
  curatorKhmer: {
    fontFamily: "var(--font-khmer), var(--font-body), sans-serif",
    fontSize: 15,
    color: colors.crimson,
    margin: "4px 0 0",
  },
};

export default function DiscoverPage() {
  return (
    <div style={styles.page}>
      <NavBar brand="Rooted Khmer" />
      <main style={styles.main}>
        <p style={styles.label}>Discover</p>
        <h1 style={styles.title}>Curated with care</h1>
        <p style={styles.description}>{collection.description}</p>

        <div style={styles.curatorRow}>
          <div style={{ ...styles.curatorCard, ...styles.curatorCardLeaf }}>
            <p style={styles.curatorLabel}>Curated by</p>
            <p style={styles.curatorValue}>{collection.curator}</p>
            {collection.curatorKhmer && (
              <p style={styles.curatorKhmer}>{collection.curatorKhmer}</p>
            )}
          </div>
          <div style={{ ...styles.curatorCard, ...styles.curatorCardGold }}>
            <p style={styles.curatorLabel}>Source &amp; Inspiration</p>
            <p style={styles.curatorValue}>{collection.source}</p>
            {collection.sourceKhmer && (
              <p style={styles.curatorKhmer}>{collection.sourceKhmer}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
