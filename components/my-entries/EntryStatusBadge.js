import useLanguage from "../../hooks/useLanguage.js";

const colors = { teak: "#1D3627" };

const STATUS_BACKGROUNDS = {
  pending: "#E7DEC9",
  published: "#CFE3D4",
  returned: "#E9C8BE",
};

export default function EntryStatusBadge({ status }) {
  const { t } = useLanguage();
  const background = STATUS_BACKGROUNDS[status];
  const copyLabel = t.status[status];
  if (!background || !copyLabel) return null;

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: 9999,
        backgroundColor: background,
        border: "1px solid #C49746",
        color: colors.teak,
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {copyLabel}
    </span>
  );
}
