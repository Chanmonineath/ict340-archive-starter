const colors = { gold: "#B8893A", teak: "#2E3B2A", silk: "#E8DCC0", paper: "#FAF6EC" };

export default function NavBar({ brand }) {
  const wrap = {
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: colors.paper,
    borderBottom: "1px solid " + colors.silk,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 24px",
    gap: 24,
  };
  const brandStyle = {
    fontFamily: "var(--font-heading), serif",
    fontSize: 20,
    fontWeight: 700,
    color: colors.teak,
    margin: 0,
    letterSpacing: "-0.02em",
  };
  const nav = {
    display: "flex",
    gap: 28,
    alignItems: "center",
  };
  const linkStyle = {
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 13,
    fontWeight: 500,
    color: colors.teak + "CC",
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  };
  return (
    <nav style={wrap} aria-label="Primary">
      <p style={brandStyle}>{brand}</p>
      <div style={nav}>
        <a href="#discover" style={linkStyle}>Discover</a>
        <a href="#archive" style={linkStyle}>Archive</a>
        <a href="#contribute" style={linkStyle}>Contribute</a>
      </div>
    </nav>
  );
}