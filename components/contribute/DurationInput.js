"use client";

const colors = { teak: "#2E3B2A", silk: "#E8DCC0" };

function parseDuration(value) {
  const match = /^(\d{0,2})h (\d{0,2})mn$/.exec(value || "");
  return match ? { hours: match[1], minutes: match[2] } : { hours: "", minutes: "" };
}

function clampDigits(raw) {
  return raw.replace(/\D/g, "").slice(0, 2);
}

export default function DurationInput({ value, onChange }) {
  const { hours, minutes } = parseDuration(value);

  const updatePart = (part) => (e) => {
    const digits = clampDigits(e.target.value);
    const next = part === "hours" ? { hours: digits, minutes } : { hours, minutes: digits };
    onChange(`${next.hours}h ${next.minutes}mn`);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <input
        type="text"
        inputMode="numeric"
        className="auth-input"
        style={{ width: 64, textAlign: "center" }}
        placeholder="00"
        value={hours}
        onChange={updatePart("hours")}
        aria-label="Hours"
      />
      <span style={{ fontFamily: "var(--font-body), sans-serif", color: colors.teak }}>h</span>
      <input
        type="text"
        inputMode="numeric"
        className="auth-input"
        style={{ width: 64, textAlign: "center" }}
        placeholder="00"
        value={minutes}
        onChange={updatePart("minutes")}
        aria-label="Minutes"
      />
      <span style={{ fontFamily: "var(--font-body), sans-serif", color: colors.teak }}>mn</span>
    </div>
  );
}
