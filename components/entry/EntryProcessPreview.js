import { box } from "./entryStyles.js";

const stepLine = {
  margin: 0,
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  textOverflow: "ellipsis",
};

export default function EntryProcessPreview({ steps }) {
  const preview = steps.slice(0, 2);
  return (
    <div style={{ ...box, display: "flex", flexDirection: "column", gap: 6 }}>
      {preview.map((step, i) => (
        <p key={i} style={stepLine}>
          {String(i + 1).padStart(2, "0")} {step}
        </p>
      ))}
    </div>
  );
}
