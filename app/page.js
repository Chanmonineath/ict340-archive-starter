import collection from "../collection.config.js";
import EntryCard from "../components/EntryCard.js";
import NavBar from "../components/NavBar.js";
import Hero from "../components/Hero.js";

const colors = {
  gold: "#B8893A",
  crimson: "#6B2D1A",
  teak: "#2E3B2A",
  leaf: "#3F5B3A",
  sand: "#F5EFE2",
  silk: "#E8DCC0",
  paper: "#FAF6EC",
};

const entries = [
  {
    title: "Coconut Oil",
    khmerName: "ប្រេងដូង",
    category: "Hair & Skin Care",
    contributor: "My grandmother",
    place: "Phnom Penh",
    ingredients: "Fresh mature coconuts and clean water",
    process: [
      "Grate the white flesh of mature coconuts.",
      "Add a small amount of clean water and squeeze it through a cloth or strainer to make thick coconut milk.",
      "Put the coconut milk in a clean pan over low to medium heat.",
      "Stir regularly while the water slowly evaporates.",
      "Continue heating until the coconut solids turn light golden brown and clear oil separates.",
      "Let it cool, strain out the browned solids using a clean cloth, and store the oil in a clean, dry container.",
    ],
    benefit:
      "Coconut oil may help skin and hair feel softer and smoother because it reduces moisture loss and acts as an oil-based moisturizer. It may also make hair look shinier and help reduce the feeling of dryness or frizz. It is not proven to remove stretch marks, although moisturizing may make dry skin feel more comfortable and may improve its temporary appearance.",
    imageLabel: "Photo placeholder — coconut oil jar",
  },
  {
    title: "Coffee and Ripe Tamarind Body Scrub",
    khmerName: "កាហ្វេ និងអំពិលទុំ",
    category: "Scrub",
    contributor: "My mother",
    place: "Phnom Penh",
    ingredients:
      "Finely ground coffee or used coffee grounds, ripe tamarind pulp, and a small amount of clean water if needed",
    process: [
      "Remove seeds and hard fibers from ripe tamarind pulp.",
      "Mash the pulp until smooth.",
      "Mix a small amount of finely ground coffee with the tamarind pulp to make a thick paste.",
    ],
    benefit:
      "The coffee grounds may provide physical exfoliation, which can remove loose surface dead skin cells and leave body skin feeling temporarily smoother. Tamarind contains natural fruit acids, so it may add mild exfoliation, but it can also irritate sensitive skin. This scrub does not permanently whiten skin, erase scars, cure acne, or remove stretch marks.",
    imageLabel: "Photo placeholder — coffee tamarind scrub",
  },
];

const styles = {
  page: { backgroundColor: colors.paper, minHeight: "100vh" },
  main: { maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px" },
  section: { marginTop: 96 },
  sectionHead: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    gap: 24,
    borderBottom: "1px solid " + colors.silk,
    paddingBottom: 16,
    marginBottom: 32,
  },
  sectionLabel: {
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.2em",
    color: colors.gold,
    margin: 0,
  },
  sectionTitle: {
    fontFamily: "var(--font-heading), serif",
    fontSize: 32,
    fontWeight: 700,
    color: colors.teak,
    margin: "8px 0 0",
    lineHeight: 1.2,
  },
  sectionMeta: {
    fontFamily: "var(--font-body), var(--font-khmer), sans-serif",
    fontSize: 13,
    color: colors.teak + "99",
    margin: 0,
  },
  stripRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 24,
  },
  curatorRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 24,
  },
  curatorCard: {
    padding: 28,
    backgroundColor: colors.sand,
    border: "1px solid " + colors.silk,
    borderRadius: 8,
  },
  curatorCardGold: { borderTop: "3px solid " + colors.gold },
  curatorCardLeaf: { borderTop: "3px solid " + colors.leaf },
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

export default function Home() {
  return (
    <div style={styles.page}>
      <NavBar brand="Rooted Khmer" />
      <Hero
        brand="Rooted Khmer"
        subtitle="Traditional Plant Knowledge & Home Practices"
        statement="Knowledge, rooted in home."
        supportCopy="Explore traditional Khmer plant knowledge, natural ingredients, and everyday practices passed down through generations."
        aboutCopy="Rooted Khmer is a living archive of traditional Khmer plant knowledge, natural ingredients, and everyday home practices passed down through families and generations."
      />

      <main style={styles.main}>
        <section style={styles.section} aria-labelledby="curated-heading">
          <div style={styles.sectionHead}>
            <div>
              <p style={styles.sectionLabel}>The archive</p>
              <h2 id="curated-heading" style={styles.sectionTitle}>
                Curated with care
              </h2>
            </div>
            <p style={styles.sectionMeta}>ICT 340 — Fall 2026</p>
          </div>
          <div style={styles.curatorRow}>
            <div style={{ ...styles.curatorCard, ...styles.curatorCardLeaf }}>
              <p style={styles.curatorLabel}>Curated by</p>
              <p style={styles.curatorValue}>{collection.curator}</p>
              {collection.curatorKhmer && (
                <p style={styles.curatorKhmer}>{collection.curatorKhmer}</p>
              )}
            </div>
            <div style={{ ...styles.curatorCard, ...styles.curatorCardGold }}>
              <p style={styles.curatorLabel}>Source & Inspiration</p>
              <p style={styles.curatorValue}>{collection.source}</p>
              {collection.sourceKhmer && (
                <p style={styles.curatorKhmer}>{collection.sourceKhmer}</p>
              )}
            </div>
          </div>
        </section>

        <section style={styles.section} aria-labelledby="preserved-heading">
          <div style={styles.sectionHead}>
            <div>
              <p style={styles.sectionLabel}>Recently preserved</p>
              <h2 id="preserved-heading" style={styles.sectionTitle}>
                Practices from family and home
              </h2>
            </div>
            <p style={styles.sectionMeta}>{entries.length} entries</p>
          </div>
          <div style={styles.stripRow}>
            {entries.map((entry) => (
              <EntryCard key={entry.title} {...entry} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
