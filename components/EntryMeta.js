const colors = { gold: "#B8893A", teak: "#2E3B2A", silk: "#E8DCC0" };

export default function EntryMeta({ contributor, place, ingredients, process, benefit }) {
  const row = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 8,
    paddingTop: 12,
    borderTop: "1px solid " + colors.silk,
  };
  const block = { display: "flex", flexDirection: "column", gap: 4 };
  const label = {
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 10,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: colors.gold,
    margin: 0,
  };
  const value = {
    fontFamily: "var(--font-heading), serif",
    fontSize: 14,
    fontWeight: 600,
    color: colors.teak,
    margin: "2px 0 0",
  };
  const text = {
    fontFamily: "var(--font-body), var(--font-khmer), sans-serif",
    fontSize: 14,
    color: colors.teak + "CC",
    lineHeight: 1.55,
    margin: 0,
  };
  const steps = { display: "flex", flexDirection: "column", gap: 4 };
  return (
    <>
      <div style={row}>
        <div>
          <p style={label}>Contributor</p>
          <p style={value}>{contributor}</p>
        </div>
        <div>
          <p style={label}>Place</p>
          <p style={value}>{place}</p>
        </div>
      </div>
      {ingredients && (
        <div style={block}>
          <p style={label}>Ingredients</p>
          <p style={text}>{ingredients}</p>
        </div>
      )}
      <div style={block}>
        <p style={label}>Process</p>
        {Array.isArray(process) ? (
          <div style={steps}>
            {process.map((step, i) => (
              <p style={text} key={i}>{i + 1}. {step}</p>
            ))}
          </div>
        ) : (
          <p style={text}>{process}</p>
        )}
      </div>
      <div style={block}>
        <p style={label}>Benefit</p>
        <p style={text}>{benefit}</p>
      </div>
    </>
  );
}
