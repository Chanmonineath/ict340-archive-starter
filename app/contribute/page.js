import NavBar from "../../components/NavBar.js";
import ContributeBanner from "../../components/ContributeBanner.js";
import Footer from "../../components/Footer.js";

const colors = { paper: "#FAF6EC" };

const styles = {
  page: { backgroundColor: colors.paper, minHeight: "100vh" },
  main: { maxWidth: 900, margin: "0 auto" },
};

export default function ContributePage() {
  return (
    <div style={styles.page}>
      <NavBar />
      <main style={styles.main} className="contribute-main">
        <ContributeBanner />
      </main>
      <Footer />
    </div>
  );
}
