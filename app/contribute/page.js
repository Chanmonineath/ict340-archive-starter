import NavBar from "../../components/NavBar.js";
import ContributeBanner from "../../components/ContributeBanner.js";

const colors = { paper: "#FAF6EC" };

const styles = {
  page: { backgroundColor: colors.paper, minHeight: "100vh" },
  main: { maxWidth: 900, margin: "0 auto", padding: "64px 24px 80px" },
};

export default function ContributePage() {
  return (
    <div style={styles.page}>
      <NavBar brand="Rooted Khmer" />
      <main style={styles.main}>
        <ContributeBanner />
      </main>
    </div>
  );
}
