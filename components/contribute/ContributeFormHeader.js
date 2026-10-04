const colors = { teak: "#2E3B2A" };

export default function ContributeFormHeader() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ margin: 0, fontFamily: "var(--font-heading), serif", fontWeight: 700, color: colors.teak }}>
        Share a Home Practice Recipe
      </h2>
    </div>
  );
}
