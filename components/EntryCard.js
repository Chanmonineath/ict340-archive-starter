const colors = {
  crimson: "#6B2D1A",
  teak: "#2E3B2A",
  sand: "#F5EFE2",
  silk: "#E8DCC0",
  leaf: "#3F5B3A",
};
import EntryPhoto from "./EntryPhoto.js";
import EntryMeta from "./EntryMeta.js";

export default function EntryCard({
  title, khmerName, category, contributor, place, ingredients, process, benefit, imageLabel,
}) {
  const card = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.sand,
    border: "1px solid " + colors.silk,
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(46,59,42,0.08)",
  };
  const body = { padding: 24, display: "flex", flexDirection: "column", gap: 12 };
  const categoryStyle = {
    fontFamily: "var(--font-body), sans-serif",
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: colors.leaf,
    margin: 0,
  };
  const titleStyle = {
    fontFamily: "var(--font-heading), serif",
    fontSize: 26,
    fontWeight: 700,
    color: colors.teak,
    margin: 0,
    lineHeight: 1.2,
  };
  const khmerStyle = {
    fontFamily: "var(--font-khmer), var(--font-body), sans-serif",
    fontSize: 16,
    color: colors.crimson,
    margin: 0,
  };
  return (
    <article style={card}>
      <EntryPhoto label={imageLabel} />
      <div style={body}>
        <p style={categoryStyle}>{category}</p>
        <h3 style={titleStyle}>{title}</h3>
        {khmerName && <p style={khmerStyle}>{khmerName}</p>}
        <EntryMeta
          contributor={contributor}
          place={place}
          ingredients={ingredients}
          process={process}
          benefit={benefit}
        />
      </div>
    </article>
  );
}
