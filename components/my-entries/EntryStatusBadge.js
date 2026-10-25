const colors = { teak: "#1D3627" };

const STATUS_COPY = {
  pending: { label: "Pending review", background: "#E7DEC9" },
  published: { label: "Published", background: "#CFE3D4" },
  returned: { label: "Returned for changes", background: "#E9C8BE" },
};

export default function EntryStatusBadge({ status }) {
  const copy = STATUS_COPY[status];
  if (!copy) return null;

  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: 9999,
        backgroundColor: copy.background,
        color: colors.teak,
        fontFamily: "var(--font-body), sans-serif",
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {copy.label}
    </span>
  );
}
