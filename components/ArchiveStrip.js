const colors = { gold: "#B8893A", teak: "#2E3B2A", leaf: "#3F5B3A", silk: "#E8DCC0" };

export default function ArchiveStrip() {
  const strip = {
    marginTop: 64,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16,
  };
  const tile = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 16,
    backgroundColor: colors.silk,
    borderRadius: 6,
    borderLeft: "3px solid " + colors.gold,
  };
  const num = {
    fontFamily: "var(--font-heading), serif",
    fontSize: 24,
    fontWeight: 700,
    color: colors.teak,
    margin: 0,
  };
  const label = {
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 12,
    color: colors.teak + "99",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    margin: 0,
  };
  return (
    <section id="archive" style={strip} aria-label="Archive by category">
      <div style={tile}>
        <p style={num}>47</p>
        <p style={label}>Plant &amp; ingredients</p>
      </div>
      <div style={tile}>
        <p style={num}>32</p>
        <p style={label}>Home practices</p>
      </div>
      <div style={tile}>
        <p style={num}>18</p>
        <p style={label}>Personal care</p>
      </div>
      <div style={tile}>
        <p style={num}>9</p>
        <p style={label}>Contributors</p>
      </div>
    </section>
  );
}
