import Link from "next/link";
import { colors } from "../entry/entryStyles.js";

export default function ReviewEntryRow({ id, title, khmer_name }) {
  return (
    <Link
      href={"/review/" + id}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "16px 20px",
        backgroundColor: "#FFFFFF",
        border: "1px solid #C49746",
        borderRadius: 12,
        textDecoration: "none",
      }}
    >
      <div>
        {khmer_name && (
          <p style={{ margin: "0 0 2px", fontFamily: "var(--font-khmer), var(--font-body), sans-serif", fontSize: 13, color: colors.gold }}>
            {khmer_name}
          </p>
        )}
        <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 16, fontWeight: 700, color: colors.teak }}>
          {title}
        </p>
      </div>

      <span
        style={{
          flexShrink: 0,
          fontFamily: "var(--font-body), sans-serif",
          fontSize: 13,
          fontWeight: 600,
          color: colors.cream,
          backgroundColor: colors.button,
          padding: "10px 18px",
          borderRadius: 9999,
        }}
      >
        View →
      </span>
    </Link>
  );
}
