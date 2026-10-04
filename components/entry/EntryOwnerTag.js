import { colors } from "./entryStyles.js";

export default function EntryOwnerTag({ ownerName }) {
  if (!ownerName) return null;

  return (
    <span
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        padding: "4px 10px",
        backgroundColor: colors.box,
        border: "1px solid " + colors.silk,
        borderRadius: 9999,
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 11,
        fontWeight: 600,
        color: colors.gold,
      }}
    >
      {ownerName}
    </span>
  );
}
