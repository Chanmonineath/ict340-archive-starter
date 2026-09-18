import { colors } from "./entryStyles.js";

export default function EntryProcessList({ steps }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {steps.map((step, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            padding: "12px 14px",
            backgroundColor: colors.box,
            border: "1px solid " + colors.silk,
            borderRadius: 10,
          }}
        >
          <span
            style={{
              flexShrink: 0,
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: colors.silk,
              color: colors.teak,
              fontSize: 12,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {i + 1}
          </span>
          <p style={{ margin: 0, fontFamily: "var(--font-body), sans-serif", fontSize: 14, color: colors.teak + "CC", lineHeight: 1.5 }}>
            {step}
          </p>
        </div>
      ))}
    </div>
  );
}
