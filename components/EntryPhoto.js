const colors = { silk: "#E8DCC0", teak: "#2E3B2A", gold: "#B8893A" };

export default function EntryPhoto({ label }) {
  const photo = {
    aspectRatio: "4 / 3",
    backgroundColor: colors.silk,
    backgroundImage:
      "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(184,137,58,0.1) 12px, rgba(184,137,58,0.1) 24px)",
    border: "1px solid " + colors.gold + "40",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 16,
    color: colors.teak + "99",
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  };
  return (
    <div style={photo} role="img" aria-label={label || "Photo placeholder"}>
      {label || "Photo placeholder"}
    </div>
  );
}
