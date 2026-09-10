import Link from "next/link";

const colors = { gold: "#B8893A", teak: "#2E3B2A", leaf: "#3F5B3A", silk: "#E8DCC0", paper: "#FAF6EC" };

export default function Hero({
  brand, subtitle, statement, supportCopy, aboutCopy,
}) {
  const wrap = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: colors.paper,
    position: "relative",
  };
  const brandStyle = {
    fontFamily: "var(--font-heading), serif",
    fontWeight: 700,
    color: colors.teak,
    margin: 0,
    letterSpacing: "-0.03em",
    lineHeight: 1,
  };
  const subtitleStyle = {
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 18,
    fontWeight: 400,
    color: colors.leaf,
    margin: "16px 0 24px",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
  };
  const statementStyle = {
    fontFamily: "var(--font-heading), serif",
    fontWeight: 700,
    color: colors.teak,
    margin: "0 0 24px",
    lineHeight: 1.25,
    maxWidth: 720,
  };
  const supportStyle = {
    fontFamily: "var(--font-body), var(--font-khmer), sans-serif",
    fontSize: 18,
    color: colors.teak + "CC",
    margin: "0 0 40px",
    lineHeight: 1.6,
    maxWidth: 620,
  };
  const aboutStyle = {
    fontFamily: "var(--font-body), var(--font-khmer), sans-serif",
    fontSize: 15,
    color: colors.teak + "99",
    margin: "0 0 48px",
    lineHeight: 1.7,
    maxWidth: 660,
  };
  const buttonRow = {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    justifyContent: "center",
  };
  const primaryBtn = {
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 14,
    fontWeight: 600,
    color: colors.paper,
    backgroundColor: colors.leaf,
    border: "none",
    padding: "14px 32px",
    borderRadius: 6,
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  };
  const secondaryBtn = {
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 14,
    fontWeight: 600,
    color: colors.teak,
    backgroundColor: "transparent",
    border: "1px solid " + colors.silk,
    padding: "14px 32px",
    borderRadius: 6,
    cursor: "pointer",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  };
  return (
    <section style={wrap} className="hero-wrap" role="region" aria-label="Introduction">
      <h1 style={brandStyle} className="hero-title">{brand}</h1>
      <p style={subtitleStyle}>{subtitle}</p>
      <p style={statementStyle} className="hero-statement">{statement}</p>
      <p style={supportStyle}>{supportCopy}</p>
      <p style={aboutStyle}>{aboutCopy}</p>
      <div style={buttonRow}>
        <Link href="/archive" style={primaryBtn} aria-label="Explore the archive">
          Explore the Archive →
        </Link>
        <Link href="/contribute" style={secondaryBtn} aria-label="Share your knowledge">
          Share Knowledge
        </Link>
      </div>
    </section>
  );
}