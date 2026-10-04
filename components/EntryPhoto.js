const colors = { gold: "#B8893A" };

export default function EntryPhoto({ src, label }) {
  if (!src) return null;

  return (
    <img
      src={src}
      alt={label || "Entry photo"}
      style={{
        aspectRatio: "4 / 3",
        width: "100%",
        objectFit: "cover",
        borderRadius: 12,
        border: "1px solid " + colors.gold + "40",
      }}
    />
  );
}
