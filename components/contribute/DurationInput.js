"use client";

import useLanguage from "../../hooks/useLanguage.js";

const colors = { teak: "#2E3B2A", silk: "#E8DCC0" };

function parseDuration(value) {
  const match = /^(\d{0,2})h (\d{0,2})mn$/.exec(value || "");
  return match ? { hours: match[1], minutes: match[2] } : { hours: "", minutes: "" };
}

const KHMER_DIGITS = "០១២៣៤៥៦៧៨៩";

function toAsciiDigits(raw) {
  return raw.replace(/[០-៩]/g, (digit) => String(KHMER_DIGITS.indexOf(digit)));
}

function clampDigits(raw) {
  return toAsciiDigits(raw).replace(/\D/g, "").slice(0, 2);
}

export default function DurationInput({ value, onChange }) {
  const { t } = useLanguage();
  const { hours, minutes } = parseDuration(value);

  const updatePart = (part) => (e) => {
    const digits = clampDigits(e.target.value);
    const next = part === "hours" ? { hours: digits, minutes } : { hours, minutes: digits };
    onChange(`${next.hours}h ${next.minutes}mn`);
  };

  const fillHoursDefault = () => {
    if (!hours) onChange(`00h ${minutes}mn`);
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
        onBlur={fillHoursDefault}
        aria-label={t.contribute.hoursAria}
      />
      <span style={{ fontFamily: "var(--font-body), var(--font-khmer), sans-serif", color: colors.teak }}>{t.contribute.hoursUnit}</span>
      <input
        type="text"
        inputMode="numeric"
        className="auth-input"
        style={{ width: 64, textAlign: "center" }}
        placeholder="00"
        value={minutes}
        onChange={updatePart("minutes")}
        aria-label={t.contribute.minutesAria}
      />
      <span style={{ fontFamily: "var(--font-body), var(--font-khmer), sans-serif", color: colors.teak }}>{t.contribute.minutesUnit}</span>
    </div>
  );
}
