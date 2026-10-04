"use client";

import NavBar from "../../components/NavBar.js";
import Footer from "../../components/Footer.js";
import useSupabaseUser from "../../hooks/useSupabaseUser.js";
import ContributeForm from "../../components/contribute/ContributeForm.js";
import ContributeLoginPrompt from "../../components/contribute/ContributeLoginPrompt.js";

const colors = { paper: "#FAF6EC", teak: "#2E3B2A" };

const styles = {
  page: { backgroundColor: colors.paper, minHeight: "100vh" },
  main: { maxWidth: 900, margin: "0 auto" },
};

export default function ContributePage() {
  const { user, isLoading } = useSupabaseUser();

  return (
    <div style={styles.page}>
      <NavBar />
      <main style={styles.main} className="contribute-main">
        {isLoading ? (
          <p style={{ textAlign: "center", fontFamily: "var(--font-body), sans-serif", color: colors.teak + "99" }}>
            Loading…
          </p>
        ) : user ? (
          <ContributeForm user={user} />
        ) : (
          <ContributeLoginPrompt />
        )}
      </main>
      <Footer />
    </div>
  );
}
