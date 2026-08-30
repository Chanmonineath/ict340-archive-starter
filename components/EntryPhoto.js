const colors = { silk: "#E8DCC0", teak: "#2E3B2A", gold: "#B8893A" };

export default function EntryPhoto({ label }) {
  const photo = {
    aspectRatio: "4 / 3",
    backgroundColor: colors.silk,
    backgroundImage:
      "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(184,137,58,0.08) 12px, rgba(184,137,58,0.08) 24px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.teak + "99",
    fontSize: 11,
    fontFamily: "var(--font-body), sans-serif",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    borderBottom: "1px solid " + colors.silk,
  };
  return (
    <div style={photo} role="img" aria-label={label || "Photo placeholder"}>
      {label || "Photo placeholder"}
    </div>
  );
}
